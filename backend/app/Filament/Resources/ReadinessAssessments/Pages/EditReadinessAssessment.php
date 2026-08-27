<?php

declare(strict_types=1);

namespace App\Filament\Resources\ReadinessAssessments\Pages;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ReadinessAssessments\ReadinessAssessmentResource;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditReadinessAssessment extends EditRecord
{
    protected static string $resource = ReadinessAssessmentResource::class;

    protected function getHeaderActions(): array
    {
        return [ViewAction::make()];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $movedOn = ($data['status'] ?? null) !== SubmissionStatus::New->value;

        if ($movedOn && $this->record->handled_at === null) {
            $data['handled_at'] = now();
            $data['handled_by'] ??= auth()->id();
        }

        return $data;
    }
}
