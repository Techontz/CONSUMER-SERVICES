<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\ReadinessAssessment;
use App\Notifications\SubmissionReceived;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class ReadinessAssessmentTest extends TestCase
{
    use RefreshDatabase;

    private const KEY = 'test-api-key';

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'Marcus Bell',
            'email' => 'marcus@example.com',
            'phone' => '770-555-0188',
            'stage' => 'Forming',
            'building' => 'A residential care home for six seniors, currently reviewing property options.',
            'objective' => 'Licensing',
            'challenge' => 'Understanding which licences apply before we commit to a property.',
            'timeline' => 'Within nine months',
        ], $overrides);
    }

    private function submit(array $payload, ?string $key = self::KEY)
    {
        return $this->withHeaders($key === null ? [] : ['X-Api-Key' => $key])
            ->postJson('/api/v1/assessments', $payload);
    }

    public function test_it_stores_a_valid_assessment_and_returns_a_reference(): void
    {
        Notification::fake();

        $response = $this->submit($this->payload());

        $response->assertCreated()->assertJsonStructure(['message', 'reference']);

        $assessment = ReadinessAssessment::firstOrFail();
        $this->assertMatchesRegularExpression('/^BRA-\d{4}-[A-Z0-9]{4}$/', $assessment->reference);
        $this->assertSame('Forming', $assessment->stage);
        $this->assertSame('new', $assessment->status->value);

        Notification::assertSentOnDemand(SubmissionReceived::class);
    }

    public function test_optional_fields_may_be_omitted(): void
    {
        Notification::fake();

        $payload = $this->payload();
        unset($payload['phone'], $payload['challenge'], $payload['timeline']);

        $this->submit($payload)->assertCreated();
    }

    public function test_it_rejects_a_request_without_the_api_key(): void
    {
        $this->submit($this->payload(), null)->assertUnauthorized();
        $this->assertDatabaseCount('readiness_assessments', 0);
    }

    public function test_it_validates_required_fields(): void
    {
        $this->submit([])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'stage', 'building', 'objective']);
    }

    public function test_it_rejects_a_stage_outside_the_approved_list(): void
    {
        $this->submit($this->payload(['stage' => 'Thriving']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['stage']);
    }

    public function test_it_rejects_an_objective_outside_the_approved_list(): void
    {
        $this->submit($this->payload(['objective' => 'World Domination']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['objective']);
    }

    public function test_a_payload_cannot_set_its_own_status(): void
    {
        Notification::fake();

        $this->submit($this->payload(['status' => 'qualified', 'handled_by' => 42]))
            ->assertCreated();

        $assessment = ReadinessAssessment::firstOrFail();
        $this->assertSame('new', $assessment->status->value);
        $this->assertNull($assessment->handled_by);
    }
}
