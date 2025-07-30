<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::insert([
            [
                'name' => 'RO Water',
                'price_per_gallon' => 7000,
                // 'image' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'UV Water',
                'price_per_gallon' => 6000,
                // 'image' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mineral Water',
                'price_per_gallon' => 5000,
                // 'image' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alkaline Water',
                'price_per_gallon' => 10000,
                // 'image' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
