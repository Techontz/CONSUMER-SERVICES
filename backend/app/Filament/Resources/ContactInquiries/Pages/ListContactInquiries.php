<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactInquiries\Pages;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ContactInquiries\ContactInquiryResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListContactInquiries extends ListRecords
{
    protected static string $resource = ContactInquiryResource::class;

    /** Triage tabs, ordered the way the team works through the queue. */
    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All'),
            'new' => Tab::make('New')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('status', SubmissionStatus::New))
                ->badge(fn () => ContactInquiryResource::getModel()::where('status', SubmissionStatus::New)->count()),
            'in_review' => Tab::make('In Review')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('status', SubmissionStatus::InReview)),
            'contacted' => Tab::make('Contacted')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('status', SubmissionStatus::Contacted)),
            'qualified' => Tab::make('Qualified')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('status', SubmissionStatus::Qualified)),
            'closed' => Tab::make('Closed')
                ->modifyQueryUsing(fn (Builder $q) => $q->whereIn('status', [
                    SubmissionStatus::Closed,
                    SubmissionStatus::Spam,
                ])),
        ];
    }
}
