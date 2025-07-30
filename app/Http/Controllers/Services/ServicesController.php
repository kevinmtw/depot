<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServicesController extends Controller
{
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'success' => true,
            'message' => 'Service ditemukan.',
            'data' => $services
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price_per_gallon' => 'required|numeric',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gambar diperlukan.',
                'errors' => $e->errors()]
            , 422);
        }

        $imagePath = $request->file('image')->store('services', 'public');

        $service = Service::create([
            'name' => $validated['name'],
            'price_per_gallon' => $validated['price_per_gallon'],
            'image' => $imagePath,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil dibuat.', 
            'data' => $service
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price_per_gallon' => 'sometimes|required|integer|min:1',
            'image' => 'sometimes|required|file|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = $path;
        }

        $service = Service::findOrFail($id);
        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil diperbarui.',
            'data' => $service,
        ]);
    }

    public function count()
    {
        $totalServices = Service::count();

        return response()->json([
            'success' => true,
            'message' => 'Total layanan.',
            'data' => $totalServices
        ]);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Layanan berhasil dihapus.',
        ]);
    }
}
