<?php

declare(strict_types=1);

namespace App\Filament\Resources\ReadinessAssessments;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ReadinessAssessments\Pages\EditReadinessAssessment;
use App\Filament\Resources\ReadinessAssessments\Pages\ListReadinessAssessments;
use App\Filament\Resources\ReadinessAssessments\Pages\ViewReadinessAssessment;
use App\Http\Requests\StoreReadinessAssessmentRequest;
use App\Models\ReadinessAssessment;
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
 * Business Readiness Assessments submitted through the assessment page.
 */
class ReadinessAssessmentResource extends Resource
{
    protected static ?string $model = ReadinessAssessment::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-clipboard-document-check';

    protected static ?string $navigationLabel = 'Readiness Assessments';

    protected static ?string $modelLabel = 'readiness assessment';

    protected static ?string $recordTitleAttribute = 'reference';

    protected static ?int $navigationSort = 2;

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
                    TextInput::make('phone')->disabled(),
                    TextInput::make('timeline')->label('Hoping to move forward')->disabled(),
                    TextInput::make('stage')->label('Stage of business')->disabled(),
                    TextInput::make('objective')->label('Next objective')->disabled(),
                    Textarea::make('building')
                        ->label('What they are building')
                        ->rows(6)
                        ->disabled()
                        ->columnSpanFull(),
                    Textarea::make('challenge')
                        ->label('Greatest challenge')
                        ->rows(5)
                        ->disabled()
                        ->columnSpanFull(),
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
                TextColumn::make('reference')->searchable()->copyable()->weight('medium'),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->copyable()->toggleable(),
                TextColumn::make('stage')->badge()->color('gray')->sortable(),
                TextColumn::make('objective')->badge()->color('info')->sortable(),
                TextColumn::make('timeline')->toggleable()->placeholder('—'),
                TextColumn::make('status')->badge()->sortable(),
                TextColumn::make('handler.name')->label('Owner')->toggleable()->placeholder('—'),
                TextColumn::make('created_at')
                    ->label('Received')
                    ->dateTime('j M Y, H:i')
                    ->sortable()
                    ->description(fn (ReadinessAssessment $r) => $r->created_at?->diffForHumans()),
            ])
            ->filters([
                SelectFilter::make('status')->options(SubmissionStatus::class)->multiple(),
                SelectFilter::make('stage')
                    ->options(array_combine(
                        StoreReadinessAssessmentRequest::STAGES,
                        StoreReadinessAssessmentRequest::STAGES,
                    ))
                    ->multiple(),
                SelectFilter::make('objective')
                    ->options(array_combine(
                        StoreReadinessAssessmentRequest::OBJECTIVES,
                        StoreReadinessAssessmentRequest::OBJECTIVES,
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
            ->emptyStateHeading('No assessments yet')
            ->emptyStateDescription('Submissions from the Business Readiness Assessment appear here.');
    }

    public static function getPages(): array
    {
        return [
            'index' => ListReadinessAssessments::route('/'),
            'view' => ViewReadinessAssessment::route('/{record}'),
            'edit' => EditReadinessAssessment::route('/{record}/edit'),
        ];
    }
}
