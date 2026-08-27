<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Enums\SubmissionStatus;
use App\Models\ContactInquiry;
use App\Models\ReadinessAssessment;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

/**
 * What the team needs to see on opening the panel: what is waiting, and
 * whether anything is going unanswered.
 */
class SubmissionsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = -2;

    protected function getStats(): array
    {
        $awaiting = ContactInquiry::where('status', SubmissionStatus::New)->count()
            + ReadinessAssessment::where('status', SubmissionStatus::New)->count();

        $thisWeek = ContactInquiry::where('created_at', '>=', now()->subWeek())->count()
            + ReadinessAssessment::where('created_at', '>=', now()->subWeek())->count();

        // Anything still untouched after two days is the thing to act on.
        $stale = ContactInquiry::where('status', SubmissionStatus::New)
            ->where('created_at', '<', now()->subDays(2))
            ->count()
            + ReadinessAssessment::where('status', SubmissionStatus::New)
                ->where('created_at', '<', now()->subDays(2))
                ->count();

        return [
            Stat::make('Awaiting a first response', (string) $awaiting)
                ->description('New across both forms')
                ->color($awaiting > 0 ? 'warning' : 'success'),

            Stat::make('Received this week', (string) $thisWeek)
                ->description('Last seven days')
                ->color('primary'),

            Stat::make('Older than two days', (string) $stale)
                ->description($stale > 0 ? 'Still unopened' : 'Nothing overdue')
                ->color($stale > 0 ? 'danger' : 'success'),
        ];
    }
}
