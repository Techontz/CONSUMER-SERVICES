<?php

declare(strict_types=1);

namespace App\Support;

use Illuminate\Support\Str;

/**
 * Generates the short reference quoted back to a sender on success.
 *
 * Format: PREFIX-YYMM-XXXX, e.g. CSI-2608-4KQ2. Deliberately not sequential
 * so the code does not disclose how many submissions have been received.
 */
final class Reference
{
    /** Excludes characters that are easy to misread aloud or in a mail client. */
    private const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    public static function generate(string $prefix): string
    {
        $suffix = '';
        for ($i = 0; $i < 4; $i++) {
            $suffix .= self::ALPHABET[random_int(0, strlen(self::ALPHABET) - 1)];
        }

        return sprintf('%s-%s-%s', $prefix, now()->format('ym'), $suffix);
    }

    /**
     * Generates a reference that is not already taken on the given model.
     *
     * @param  class-string<\Illuminate\Database\Eloquent\Model>  $model
     */
    public static function uniqueFor(string $model, string $prefix): string
    {
        do {
            $reference = self::generate($prefix);
        } while ($model::where('reference', $reference)->exists());

        return $reference;
    }
}
