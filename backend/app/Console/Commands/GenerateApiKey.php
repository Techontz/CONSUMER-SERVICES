<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

/**
 * Prints a fresh shared secret for the frontend to send with submissions.
 *
 * Deliberately does not write to .env — the same value has to be set in two
 * places, and it is safer for a person to copy it into both than for a
 * command to edit one and silently leave the other behind.
 */
class GenerateApiKey extends Command
{
    protected $signature = 'legacy:api-key';

    protected $description = 'Generate a shared API key for the LegacyByConsumer frontend';

    public function handle(): int
    {
        $key = 'lbc_'.Str::random(48);

        $this->newLine();
        $this->line('  Generated API key:');
        $this->newLine();
        $this->line("  <fg=yellow>{$key}</>");
        $this->newLine();
        $this->line('  Set it in BOTH places, then restart both servers:');
        $this->line('    backend/.env       LEGACY_API_KEY='.$key);
        $this->line('    legacy_web/.env.local  API_KEY='.$key);
        $this->newLine();

        return self::SUCCESS;
    }
}
