<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_inquiries', function (Blueprint $table) {
            $table->id();

            // Human-facing identifier quoted back to the sender on success.
            $table->string('reference', 20)->unique();

            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('phone', 40)->nullable();
            $table->string('interest');
            $table->text('message');

            $table->string('status', 20)->default('new');
            $table->text('internal_notes')->nullable();
            $table->timestamp('handled_at')->nullable();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();

            // Retained for abuse investigation only.
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 512)->nullable();

            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_inquiries');
    }
};
