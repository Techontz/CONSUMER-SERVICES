<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Only the site's own server may post to the public form endpoints.
 *
 * The key is compared with hash_equals so the check does not leak the key
 * one byte at a time through response timing.
 */
class VerifyApiKey
{
    public function handle(Request $request, Closure $next): Response
    {
        $expected = (string) config('legacy.api_key');
        $provided = (string) $request->header('X-Api-Key', '');

        if ($expected === '' || ! hash_equals($expected, $provided)) {
            return response()->json(
                ['message' => 'Unauthenticated.'],
                Response::HTTP_UNAUTHORIZED,
            );
        }

        return $next($request);
    }
}
