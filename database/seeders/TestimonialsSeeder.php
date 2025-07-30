<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonials;

class TestimonialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Budi Santoso',
                'location' => 'Bekasi',
                'message' => 'Pengiriman cepat dan airnya bersih. Layanan yang luar biasa!',
            ],
            [
                'name' => 'Siti Aisyah',
                'location' => 'Jakarta',
                'message' => 'Air galon selalu segar dan pengantar sangat ramah.',
            ],
            [
                'name' => 'Rizky Pratama',
                'location' => 'Depok',
                'message' => 'Respon cepat saat pemesanan dan air berkualitas.',
            ],
            [
                'name' => 'Dewi Lestari',
                'location' => 'Tangerang',
                'message' => 'Sangat puas dengan layanan refill air galon ini!',
            ],
            [
                'name' => 'Andi Wijaya',
                'location' => 'Bekasi',
                'message' => 'Selalu tepat waktu dan air terasa segar.',
            ],
            [
                'name' => 'Lina Marlina',
                'location' => 'Bogor',
                'message' => 'Praktis, cepat, dan higienis. Sangat direkomendasikan.',
            ],
            [
                'name' => 'Fajar Nugroho',
                'location' => 'Jakarta',
                'message' => 'Kualitas air bagus dan layanan konsisten.',
            ],
            [
                'name' => 'Mega Sari',
                'location' => 'Bekasi',
                'message' => 'Terbaik! Tidak pernah mengecewakan.',
            ],
            [
                'name' => 'Ahmad Fauzi',
                'location' => 'Depok',
                'message' => 'Sangat membantu di saat darurat kehabisan air galon.',
            ],
            [
                'name' => 'Yuni Kartika',
                'location' => 'Tangerang Selatan',
                'message' => 'Pelayanan cepat dan mudah melalui WhatsApp.',
            ],
        ];

        foreach ($data as $testimonial) {
            Testimonials::create($testimonial);
        }
    }
}
