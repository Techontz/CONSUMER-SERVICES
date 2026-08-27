<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\ContactInquiry;
use App\Models\ReadinessAssessment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

/**
 * Tells the team a submission has arrived.
 *
 * Queued, so a slow or unreachable mail server never delays the response to
 * the person who filled in the form — the record is already saved by then.
 */
class SubmissionReceived extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private readonly ContactInquiry|ReadinessAssessment $submission,
    ) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $isAssessment = $this->submission instanceof ReadinessAssessment;

        $kind = $isAssessment ? 'Business Readiness Assessment' : 'Contact Inquiry';
        $panel = rtrim((string) config('app.url'), '/').'/admin';

        $mail = (new MailMessage)
            ->subject("New {$kind} · {$this->submission->reference}")
            ->greeting("New {$kind}")
            ->line("Reference: {$this->submission->reference}")
            ->line("From: {$this->submission->name} <{$this->submission->email}>");

        if ($isAssessment) {
            $mail->line("Stage: {$this->submission->stage}")
                ->line("Objective: {$this->submission->objective}")
                ->line('Building: '.$this->excerpt($this->submission->building));
        } else {
            $mail->line("Interest: {$this->submission->interest}")
                ->line('Message: '.$this->excerpt($this->submission->message));
        }

        return $mail
            ->action('Open in the admin panel', $panel)
            ->line('Reply directly to the sender at the address above.');
    }

    private function excerpt(string $text): string
    {
        return str($text)->squish()->limit(280)->toString();
    }
}
