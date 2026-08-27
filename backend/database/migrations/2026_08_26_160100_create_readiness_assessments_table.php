<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('readiness_assessments', function (Blueprint $table) {
            $table->id();

            $table->string('reference', 20)->unique();

            $table->string('name');
            $table->string('email');
            $table->string('phone', 40)->nullable();

            $table->string('stage');
            $table->text('building');
            $table->string('objective');
            $table->text('challenge')->nullable();
            $table->string('timeline')->nullable();

            $table->string('status', 20)->default('new');
            $table->text('internal_notes')->nullable();
            $table->timestamp('handled_at')->nullable();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();

            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent', 512)->nullable();

            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('readiness_assessments');
    }
};
