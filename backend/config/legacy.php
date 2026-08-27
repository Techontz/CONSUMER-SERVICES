<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | API key
    |--------------------------------------------------------------------------
    | Shared secret the Next.js server sends on every form submission. It must
    | match API_KEY in the frontend environment. Generate one with:
    |
    |     php artisan legacy:api-key
    */

    'api_key' => env('LEGACY_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    | Where new submissions are announced. Comma-separate for several
    | recipients.
    */

    'notify_email' => env('LEGACY_NOTIFY_EMAIL', 'info@legacybyconsumer.com'),

    /*
    |--------------------------------------------------------------------------
    | Rate limiting
    |--------------------------------------------------------------------------
    | Submissions allowed per IP address per hour, across both forms.
    */

    'submissions_per_hour' => (int) env('LEGACY_SUBMISSIONS_PER_HOUR', 8),

];
