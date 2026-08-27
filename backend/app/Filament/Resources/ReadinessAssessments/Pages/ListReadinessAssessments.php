<?php

declare(strict_types=1);

namespace App\Filament\Resources\ReadinessAssessments\Pages;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ReadinessAssessments\ReadinessAssessmentResource;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListReadinessAssessments extends ListRecords
{
    protected static string $resource = ReadinessAssessmentResource::class;

    public function getTabs(): array
    {
        return [
            'all' => Tab::make('All'),
            'new' => Tab::make('New')
                ->modifyQueryUsing(fn (Builder $q) => $q->where('status', SubmissionStatus::New))
                ->badge(fn () => ReadinessAssessmentResource::getModel()::where('status', SubmissionStatus::New)->count()),
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
