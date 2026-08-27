<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactInquiries;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ContactInquiries\Pages\EditContactInquiry;
use App\Filament\Resources\ContactInquiries\Pages\ListContactInquiries;
use App\Filament\Resources\ContactInquiries\Pages\ViewContactInquiry;
use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

/**
 * Inquiries submitted through the Contact page.
 *
 * Records arrive from the public site and are never created here — the
 * panel exists to read, triage and annotate them.
 */
class ContactInquiryResource extends Resource
{
    protected static ?string $model = ContactInquiry::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationLabel = 'Contact Inquiries';

    protected static ?string $modelLabel = 'contact inquiry';

    protected static ?string $recordTitleAttribute = 'reference';

    protected static ?int $navigationSort = 1;

    /** New inquiries are surfaced as a badge in the sidebar. */
    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', SubmissionStatus::New)->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Submission')
                ->description('Sent from the website. These fields are read-only.')
                ->columns(2)
                ->schema([
                    TextInput::make('reference')->disabled(),
                    TextInput::make('created_at')
                        ->label('Received')
                        ->formatStateUsing(fn ($state) => $state?->format('j M Y, H:i'))
                        ->disabled(),
                    TextInput::make('name')->disabled(),
                    TextInput::make('email')->disabled(),
                    TextInput::make('company')->label('Company / Organization')->disabled(),
                    TextInput::make('phone')->disabled(),
                    TextInput::make('interest')->label('Interested in')->disabled()->columnSpanFull(),
                    Textarea::make('message')->rows(8)->disabled()->columnSpanFull(),
                ]),

            Section::make('Handling')
                ->description('Internal only — never shown to the sender.')
                ->columns(2)
                ->schema([
                    Select::make('status')
                        ->options(SubmissionStatus::class)
                        ->default(SubmissionStatus::New)
                        ->required()
                        ->native(false),
                    Select::make('handled_by')
                        ->label('Owner')
                        ->relationship('handler', 'name')
                        ->searchable()
                        ->preload()
                        ->native(false),
                    Textarea::make('internal_notes')
                        ->rows(5)
                        ->columnSpanFull()
                        ->helperText('Notes for the team.'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('reference')
                    ->searchable()
                    ->copyable()
                    ->weight('medium'),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->copyable()->toggleable(),
                TextColumn::make('company')->searchable()->toggleable(),
                TextColumn::make('interest')->badge()->color('gray')->wrap(),
                TextColumn::make('status')->badge()->sortable(),
                TextColumn::make('handler.name')->label('Owner')->toggleable()->placeholder('—'),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('j M Y, H:i')
                    ->sortable()
                    ->description(fn (ContactInquiry $r) => $r->created_at?->diffForHumans()),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(SubmissionStatus::class)
                    ->multiple(),
                SelectFilter::make('interest')
                    ->options(array_combine(
                        StoreContactInquiryRequest::INTERESTS,
                        StoreContactInquiryRequest::INTERESTS,
                    ))
                    ->multiple(),
                Filter::make('unhandled')
                    ->label('Awaiting a response')
                    ->query(fn (Builder $q) => $q->whereIn('status', [
                        SubmissionStatus::New->value,
                        SubmissionStatus::InReview->value,
                    ])),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('No inquiries yet')
            ->emptyStateDescription('Submissions from the Contact page appear here.');
    }

    public static function getPages(): array
    {
        return [
            'index' => ListContactInquiries::route('/'),
            'view' => ViewContactInquiry::route('/{record}'),
            'edit' => EditContactInquiry::route('/{record}/edit'),
        ];
    }
}
