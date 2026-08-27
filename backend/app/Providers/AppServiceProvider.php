<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Fail loudly in development if a relationship is used without being
        // loaded, or a non-fillable attribute is mass-assigned.
        Model::shouldBeStrict(! $this->app->isProduction());

        // Admin sessions and password resets must never be issued over http.
        if ($this->app->isProduction()) {
            URL::forceScheme('https');
        }

        $this->configureRateLimiting();
    }

    /**
     * Caps form submissions per source address.
     *
     * Keyed on the forwarded client IP rather than the frontend server's,
     * which would otherwise share one bucket across every visitor.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('submissions', function (Request $request) {
            return Limit::perHour((int) config('legacy.submissions_per_hour'))
                ->by($request->ip() ?: 'unknown')
                ->response(fn () => response()->json([
                    'message' => 'That’s several submissions in a short time. Please wait a moment and try again.',
                ], 429));
        });
    }
}
