<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactInquiryRequest extends FormRequest
{
    /** Authorisation is handled by the API-key middleware on the route. */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * The interest list mirrors the approved select on the Contact page.
     * Anything outside it is rejected rather than stored, so the admin
     * filters stay meaningful.
     */
    public const INTERESTS = [
        'Business Development',
        'Business Planning',
        'Business Formation',
        'SAM.gov & Government Readiness',
        'Healthcare & Residential Care',
        'Digital Business Development',
        'Funding & Growth Preparation',
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
            'company' => ['nullable', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:40'],
            'interest' => ['required', 'string', Rule::in(self::INTERESTS)],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'message.min' => 'Please add a little more detail — 20 characters or more.',
            'interest.in' => 'Choose the area closest to your objective.',
            'email.email' => 'Enter a valid email address.',
        ];
    }

    protected function prepareForValidation(): void
    {
        // Trim before validating so " " does not pass a `required` check, and
        // strip control characters that only ever arrive from scripts.
        $this->merge(
            collect($this->only(['name', 'email', 'company', 'phone', 'interest', 'message']))
                ->map(fn ($value) => is_string($value)
                    ? preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', trim($value))
                    : $value)
                ->all()
        );
    }
}
