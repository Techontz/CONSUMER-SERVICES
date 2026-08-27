<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactInquiryRequest;
use App\Models\ContactInquiry;
use App\Notifications\SubmissionReceived;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;

class ContactInquiryController extends Controller
{
    public function store(StoreContactInquiryRequest $request): JsonResponse
    {
        $inquiry = ContactInquiry::create($request->validated());

        // Recorded outside the fillable set so a payload can never spoof them.
        $inquiry->forceFill([
            'ip_address' => $request->ip(),
            'user_agent' => str($request->userAgent() ?? '')->limit(500)->toString(),
        ])->save();

        $this->notifyTeam($inquiry);

        return response()->json([
            'message' => 'Received.',
            'reference' => $inquiry->reference,
        ], Response::HTTP_CREATED);
    }

    private function notifyTeam(ContactInquiry $inquiry): void
    {
        $recipients = collect(explode(',', (string) config('legacy.notify_email')))
            ->map(fn (string $address) => trim($address))
            ->filter()
            ->all();

        if ($recipients === []) {
            return;
        }

        // A mail failure must not lose a submission that is already stored.
        try {
            Notification::route('mail', $recipients)
                ->notify(new SubmissionReceived($inquiry));
        } catch (\Throwable $e) {
            report($e);
        }
    }
}
