<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default admin or test user
        User::create([
            'name' => 'admin',
            'email' => 'admin@tirtabarokah.com',
            'password' => bcrypt('Test123!'), // Or use Hash::make()
        ]);

        // Generate 10 fake users
        User::factory()->count(10)->create();
    }
}
