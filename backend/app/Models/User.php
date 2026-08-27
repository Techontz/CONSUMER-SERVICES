<?php

declare(strict_types=1);

namespace App\Models;

use Filament\Auth\MultiFactor\App\Contracts\HasAppAuthentication;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * A freshly built user is never an administrator. Without this the
     * attribute reads as null until the row is reloaded, which is an easy
     * thing to get wrong at a permission check.
     */
    protected $attributes = [
        'is_admin' => false,
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
        ];
    }

    /**
     * Gates the admin panel.
     *
     * `is_admin` is deliberately not fillable, so it can only be set from a
     * console command or a direct database change — registering a user, or a
     * mass-assignment slip elsewhere, can never grant panel access.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return (bool) $this->is_admin;
    }
}
