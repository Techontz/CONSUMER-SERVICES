<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SubmissionStatus;
use App\Support\Reference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * An inquiry submitted through the Contact page.
 */
class ContactInquiry extends Model
{
    use HasFactory;

    /**
     * Only these may be mass-assigned. Status, notes and handling fields are
     * set explicitly by the admin panel — a public payload must never be able
     * to mark itself qualified or reassign itself.
     */
    protected $fillable = [
        'name',
        'email',
        'company',
        'phone',
        'interest',
        'message',
    ];

    protected function casts(): array
    {
        return [
            'status' => SubmissionStatus::class,
            'handled_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $inquiry): void {
            $inquiry->reference ??= Reference::uniqueFor(self::class, 'CSI');
        });
    }

    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
