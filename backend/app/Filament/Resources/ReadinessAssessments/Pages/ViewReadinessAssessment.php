<?php

declare(strict_types=1);

namespace App\Filament\Resources\ReadinessAssessments\Pages;

use App\Filament\Resources\ReadinessAssessments\ReadinessAssessmentResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewReadinessAssessment extends ViewRecord
{
    protected static string $resource = ReadinessAssessmentResource::class;

    protected function getHeaderActions(): array
    {
        return [EditAction::make()];
    }
}
