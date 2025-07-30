<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gallery::insert([
            [
                'caption' => 'Tempat penyimpanan galon bersih',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'caption' => 'Tempat penyimpanan galon bersih',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'caption' => 'Tempat penyimpanan galon bersih',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'caption' => 'Tempat penyimpanan galon bersih',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
