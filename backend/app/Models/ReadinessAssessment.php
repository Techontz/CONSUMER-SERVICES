<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SubmissionStatus;
use App\Support\Reference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * A Business Readiness Assessment submitted through the assessment page.
 */
class ReadinessAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'stage',
        'building',
        'objective',
        'challenge',
        'timeline',
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
        static::creating(function (self $assessment): void {
            $assessment->reference ??= Reference::uniqueFor(self::class, 'BRA');
        });
    }

    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
