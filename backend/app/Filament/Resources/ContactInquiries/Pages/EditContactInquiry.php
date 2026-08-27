<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactInquiries\Pages;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\ContactInquiries\ContactInquiryResource;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditContactInquiry extends EditRecord
{
    protected static string $resource = ContactInquiryResource::class;

    protected function getHeaderActions(): array
    {
        return [ViewAction::make()];
    }

    /**
     * Stamps who dealt with the inquiry and when, the first time it moves
     * out of the New state.
     */
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
