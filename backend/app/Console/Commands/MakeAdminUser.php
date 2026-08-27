<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;

/**
 * Creates or promotes an admin panel user.
 *
 * `is_admin` is not mass-assignable, so this command is the intended way to
 * grant panel access.
 */
class MakeAdminUser extends Command
{
    protected $signature = 'legacy:admin
                            {--name= : Full name}
                            {--email= : Email address}';

    protected $description = 'Create or promote a LegacyByConsumer admin user';

    public function handle(): int
    {
        $name = $this->option('name') ?: $this->ask('Full name');
        $email = $this->option('email') ?: $this->ask('Email address');
        $password = $this->secret('Password (min 12 characters)');

        $validator = Validator::make(
            compact('name', 'email', 'password'),
            [
                'name' => ['required', 'string', 'max:120'],
                'email' => ['required', 'email', 'max:190'],
                'password' => ['required', Password::min(12)->letters()->numbers()],
            ],
        );

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $user = User::firstOrNew(['email' => $email]);
        $existed = $user->exists;

        $user->forceFill([
            'name' => $name,
            'password' => Hash::make($password),
            'is_admin' => true,
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $this->info($existed
            ? "Updated {$email} and granted admin access."
            : "Created admin user {$email}.");

        $this->line('Sign in at '.rtrim((string) config('app.url'), '/').'/admin');

        return self::SUCCESS;
    }
}
