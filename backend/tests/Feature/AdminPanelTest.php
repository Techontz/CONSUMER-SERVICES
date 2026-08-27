<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_panel_requires_authentication(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_a_signed_in_user_without_admin_rights_is_refused(): void
    {
        $user = User::factory()->create();

        $this->assertFalse((bool) $user->fresh()->is_admin);
        $this->actingAs($user)->get('/admin')->assertForbidden();
    }

    public function test_an_admin_reaches_the_panel(): void
    {
        $admin = User::factory()->create();
        $admin->forceFill(['is_admin' => true])->save();

        $this->actingAs($admin)->get('/admin')->assertSuccessful();
    }

    public function test_admin_rights_cannot_be_mass_assigned(): void
    {
        // `is_admin` is outside $fillable, so an attempt to set it through
        // mass assignment is refused outright rather than quietly dropped.
        $this->expectException(MassAssignmentException::class);

        User::create([
            'name' => 'Escalation Attempt',
            'email' => 'attempt@example.com',
            'password' => 'password-that-is-long',
            'is_admin' => true,
        ]);
    }

    public function test_a_user_created_normally_is_not_an_admin(): void
    {
        $user = User::create([
            'name' => 'Ordinary User',
            'email' => 'ordinary@example.com',
            'password' => 'password-that-is-long',
        ]);

        $this->assertFalse((bool) $user->fresh()->is_admin);
    }
}
