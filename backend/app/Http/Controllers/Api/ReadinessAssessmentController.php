<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReadinessAssessmentRequest;
use App\Models\ReadinessAssessment;
use App\Notifications\SubmissionReceived;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ReadinessAssessmentController extends Controller
{
    public function store(StoreReadinessAssessmentRequest $request): JsonResponse
    {
        $assessment = ReadinessAssessment::create($request->validated());

        $assessment->forceFill([
            'ip_address' => $request->ip(),
            'user_agent' => str($request->userAgent() ?? '')->limit(500)->toString(),
        ])->save();

        $this->notifyTeam($assessment);

        return response()->json([
            'message' => 'Received.',
            'reference' => $assessment->reference,
        ], Response::HTTP_CREATED);
    }

    private function notifyTeam(ReadinessAssessment $assessment): void
    {
        $recipients = collect(explode(',', (string) config('legacy.notify_email')))
            ->map(fn (string $address) => trim($address))
            ->filter()
            ->all();

        if ($recipients === []) {
            return;
        }

        try {
            Notification::route('mail', $recipients)
                ->notify(new SubmissionReceived($assessment));
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
