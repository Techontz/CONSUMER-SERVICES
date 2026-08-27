<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReadinessAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** Both lists mirror the approved selects on the assessment page. */
    public const STAGES = ['Idea', 'Forming', 'Operating', 'Reorganizing', 'Expanding'];

    public const OBJECTIVES = [
        'Launch',
        'Licensing',
        'Funding',
        'Contracting',
        'Digital Presence',
        'Operations',
        'Expansion',
        'Other',
    ];

    /**
     * Note on `email:rfc` rather than `email:rfc,dns`: the DNS variant does a
     * live MX lookup on every submission. It rejects perfectly valid
     * addresses on domains without MX records and fails closed when DNS is
     * slow — losing real inquiries. A mistyped address only costs us a reply.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'string', 'email:rfc', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'stage' => ['required', 'string', Rule::in(self::STAGES)],
            'building' => ['required', 'string', 'min:20', 'max:5000'],
            'objective' => ['required', 'string', Rule::in(self::OBJECTIVES)],
            'challenge' => ['nullable', 'string', 'max:5000'],
            'timeline' => ['nullable', 'string', 'max:190'],
        ];
    }

    public function messages(): array
    {
        return [
            'building.min' => 'Please describe the business or project in a little more detail.',
            'stage.in' => 'Select where the business is today.',
            'objective.in' => 'Select your next objective.',
            'email.email' => 'Enter a valid email address.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(
            collect($this->only([
                'name', 'email', 'phone', 'stage', 'building', 'objective', 'challenge', 'timeline',
            ]))
                ->map(fn ($value) => is_string($value)
                    ? preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', trim($value))
                    : $value)
                ->all()
        );
    }
}
