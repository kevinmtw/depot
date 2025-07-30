<?php

namespace App\Http\Controllers\Gallery;

use App\Models\Gallery;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $gallery = Gallery::all();

        return response()->json([
            'success' => true,
            'message' => 'Galeri ditemukan.',
            'data' => $gallery
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'caption' => 'required|string|max:255',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gambar diperlukan.',
                'errors' => $e->errors()
            ], 422);
        }

        $imagePath = $request->file('image')->store('gallery', 'public');

        $gallery = Gallery::create([
            'image' => $imagePath,
            'caption' => $validated['caption'],
        ]);

        return response()->json([
            'success' => true, 
            'message' => 'Galeri berhasil dibuat.', 
            'data' => $gallery
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'image' => 'sometimes|required|file|mimes:jpeg,png,jpg,gif|max:2048',
            'caption' => 'sometimes|required|string|max:255'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = $path;
        }

        $gallery = Gallery::findOrFail($id);
        $gallery->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Galeri berhasil diperbarui.',
            'data' => $gallery,
        ]);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();

        return response()->json([
            'success' => true,
            'message' => 'Galeri berhasil dihapus.',
        ]);
    }
}
