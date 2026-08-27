<?php

declare(strict_types=1);

use App\Http\Controllers\Api\ContactInquiryController;
use App\Http\Controllers\Api\ReadinessAssessmentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public form endpoints
|--------------------------------------------------------------------------
| Called only by the Next.js server, which holds the API key. Both are rate
| limited per IP address using the address the frontend forwards, so one
| source cannot flood the inbox.
*/

Route::prefix('v1')
    ->middleware(['api.key', 'throttle:submissions'])
    ->group(function () {
        Route::post('/contact-inquiries', [ContactInquiryController::class, 'store'])
            ->name('api.contact-inquiries.store');

        Route::post('/assessments', [ReadinessAssessmentController::class, 'store'])
            ->name('api.assessments.store');
    });

/** Unauthenticated liveness probe for deployment checks. */
Route::get('/up', fn () => response()->json(['status' => 'ok']))->name('api.up');
