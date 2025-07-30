<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Carbon\Carbon;

class OrdersController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json([
            'success' => true,
            'message' => 'Order ditemukan.',
            'data' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'type' => 'required|in:refill,new_purchase,pickup_return',
            'status' => 'nullable|in:on_process,on_delivery',
        ]);

        $order = Order::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'quantity' => $validated['quantity'],
            'type' => $validated['type'],
            'status' => $validated['status'] ?? 'on_process',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dibuat.',
            'data' => $order,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string',
            'quantity' => 'sometimes|required|integer|min:1',
            'type' => 'sometimes|required|in:refill,new_purchase,pickup_return',
            'status' => 'sometimes|required|in:on_process,on_delivery',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil diperbarui.',
            'data' => $order,
        ]);
    }

    public function count()
    {
        $today = Carbon::today();
        $now = Carbon::now();

        $totalDaily = Order::whereDate('created_at', $today)->count();
        $totalMonthly = Order::whereYear('created_at', $now->year)
                    ->whereMonth('created_at', $now->month)
                    ->count();

        return response()->json([
            'success' => true,
            'message' => 'Total pesanan.',
            'data' => ['totalDaily' => $totalDaily, 'totalMonthly' => $totalMonthly],
        ]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil dihapus.',
        ]);
    }
}
