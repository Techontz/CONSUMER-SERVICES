<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\ContactInquiry;
use App\Notifications\SubmissionReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ContactInquiryTest extends TestCase
{
    use RefreshDatabase;

    private const KEY = 'test-api-key';

    /** @return array<string, string> */
    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Dana Okoro',
            'email' => 'dana@example.com',
            'company' => 'Okoro Freight LLC',
            'phone' => '404-555-0142',
            'interest' => 'Funding & Growth Preparation',
            'message' => 'We run a small regional freight operation and want to prepare for equipment financing.',
        ], $overrides);
    }

    private function submit(array $payload, ?string $key = self::KEY)
    {
        return $this->withHeaders($key === null ? [] : ['X-Api-Key' => $key])
            ->postJson('/api/v1/contact-inquiries', $payload);
    }

    public function test_it_stores_a_valid_inquiry_and_returns_a_reference(): void
    {
        Notification::fake();

        $response = $this->submit($this->payload());

        $response->assertCreated()
            ->assertJsonStructure(['message', 'reference']);

        $this->assertDatabaseHas('contact_inquiries', [
            'email' => 'dana@example.com',
            'interest' => 'Funding & Growth Preparation',
            'status' => 'new',
        ]);

        $inquiry = ContactInquiry::firstOrFail();
        $this->assertMatchesRegularExpression('/^CSI-\d{4}-[A-Z0-9]{4}$/', $inquiry->reference);
        $this->assertSame($inquiry->reference, $response->json('reference'));
    }

    public function test_it_notifies_the_team(): void
    {
        Notification::fake();

        $this->submit($this->payload())->assertCreated();

        Notification::assertSentOnDemand(SubmissionReceived::class);
    }

    public function test_it_rejects_a_request_without_the_api_key(): void
    {
        $this->submit($this->payload(), null)->assertUnauthorized();
        $this->assertDatabaseCount('contact_inquiries', 0);
    }

    public function test_it_rejects_a_request_with_the_wrong_api_key(): void
    {
        $this->submit($this->payload(), 'not-the-key')->assertUnauthorized();
        $this->assertDatabaseCount('contact_inquiries', 0);
    }

    public function test_it_validates_required_fields(): void
    {
        $this->submit([])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'interest', 'message']);
    }

    public function test_it_rejects_an_interest_outside_the_approved_list(): void
    {
        $this->submit($this->payload(['interest' => 'Something Invented']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['interest']);
    }

    public function test_it_rejects_a_message_that_is_too_short(): void
    {
        $this->submit($this->payload(['message' => 'hello']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    public function test_it_trims_whitespace_before_validating(): void
    {
        $this->submit($this->payload(['name' => '   ']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }

    public function test_a_payload_cannot_set_its_own_status_or_ownership(): void
    {
        Notification::fake();

        $this->submit($this->payload([
            'status' => 'qualified',
            'handled_by' => 99,
            'reference' => 'CSI-0000-AAAA',
            'internal_notes' => 'injected',
        ]))->assertCreated();

        $inquiry = ContactInquiry::firstOrFail();

        $this->assertSame('new', $inquiry->status->value);
        $this->assertNull($inquiry->handled_by);
        $this->assertNull($inquiry->internal_notes);
        $this->assertNotSame('CSI-0000-AAAA', $inquiry->reference);
    }

    public function test_it_records_the_submitting_address(): void
    {
        Notification::fake();

        $this->submit($this->payload())->assertCreated();

        $this->assertNotNull(ContactInquiry::firstOrFail()->ip_address);
    }

    public function test_it_throttles_repeated_submissions_from_one_address(): void
    {
        Notification::fake();

        for ($i = 0; $i < 8; $i++) {
            $this->submit($this->payload(['email' => "person{$i}@example.com"]))
                ->assertCreated();
        }

        $this->submit($this->payload(['email' => 'ninth@example.com']))
            ->assertStatus(429);

        $this->assertDatabaseCount('contact_inquiries', 8);
    }
}
