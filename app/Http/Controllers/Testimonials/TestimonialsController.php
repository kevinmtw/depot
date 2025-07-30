<?php

namespace App\Http\Controllers\Testimonials;

use App\Http\Controllers\Controller;
use App\Models\Testimonials;
use Illuminate\Http\Request;

class TestimonialsController extends Controller
{
    public function index()
    {
        $testimonials = Testimonials::all();
        return response()->json([
            'success' => true,
            'message' => 'Testimoni ditemukan.',
            'data' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $testimonial = Testimonials::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimoni berhasil ditambahkan.',
            'data' => $testimonial,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
        ]);

        $testimonial = Testimonials::findOrFail($id);
        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimoni berhasil diperbarui.',
            'data' => $testimonial,
        ]);
    }

    public function count()
    {
        $totalTestimonials = Testimonials::distinct()->count('name');

        return response()->json([
            'success' => true,
            'message' => 'Total testimoni.',
            'data' => $totalTestimonials
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonials::findOrFail($id);
        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimoni berhasil dihapus.',
        ]);
    }
}
