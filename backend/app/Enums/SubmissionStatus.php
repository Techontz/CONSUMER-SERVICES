<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

/**
 * Where a submission sits in the team's handling workflow.
 */
enum SubmissionStatus: string implements HasColor, HasLabel
{
    case New = 'new';
    case InReview = 'in_review';
    case Contacted = 'contacted';
    case Qualified = 'qualified';
    case Closed = 'closed';
    case Spam = 'spam';

    public function getLabel(): string
    {
        return match ($this) {
            self::New => 'New',
            self::InReview => 'In Review',
            self::Contacted => 'Contacted',
            self::Qualified => 'Qualified',
            self::Closed => 'Closed',
            self::Spam => 'Spam',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::New => 'warning',
            self::InReview => 'info',
            self::Contacted => 'primary',
            self::Qualified => 'success',
            self::Closed => 'gray',
            self::Spam => 'danger',
        };
    }
}
