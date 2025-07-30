import { LoadingScreen } from '@/components/loader/loading-screen';
import { OrdersModal } from '@/components/orders-modal';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Order } from '@/types/react';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Orders() {
    const [fetching, setFetching] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        try {
            setFetching(true);
            const response = await apiCall('/api/orders');
            setOrders(response.data);
        } catch (error) {
            notification.error((error as Error).message);
        } finally {
            setFetching(false);
        }
    };

    const typeLabel = {
        refill: 'Isi Ulang',
        new_purchase: 'Beli Baru',
        pickup_return: 'Ambil/Kembali Galon',
    };

    const statusLabel = {
        on_process: 'Sedang Diproses',
        on_delivery: 'Dalam Pengantaran',
    };

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updated: Order) => {
        const form = new FormData();
        form.append('_method', 'PATCH');
        for (const key in updated) {
            form.append(key, (updated as any)[key]);
        }

        try {
            const response = await apiCall(`/api/orders/${updated.id}`, 'POST', form);
            notification.success(response.message);
        } catch (error) {
            notification.error((error as Error).message);
        } finally {
            getAllOrders();
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Hapus pesanan ini?')) {
            try {
                const response = await apiCall(`/api/orders/${id}`, 'DELETE');
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllOrders();
            }
        }
    };

    if (fetching) {
        return <LoadingScreen />;
    }

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-blue-700">Pesanan Masuk</h1>
                <p className="mt-1 text-gray-600">Lihat dan kelola daftar pesanan pelanggan.</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50 text-left text-sm font-semibold text-blue-700">
                        <tr>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Alamat</th>
                            <th className="px-6 py-3">Jumlah Galon</th>
                            <th className="px-6 py-3">Tipe</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {Array.from(orders ?? []).map((order) => (
                            <tr key={order.id} className="hover:bg-blue-50/50">
                                <td className="px-6 py-4 font-medium">{order.name}</td>
                                <td className="px-6 py-4">{order.address}</td>
                                <td className="px-6 py-4">{order.quantity}</td>
                                <td className="px-6 py-4">{typeLabel[order.type]}</td>
                                <td className="px-6 py-4">{statusLabel[order.status]}</td>
                                <td className="flex justify-end gap-3 px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(order)} className="text-blue-600 hover:text-blue-800">
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(order.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <OrdersModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleUpdate}
                initialData={selectedOrder || undefined}
            />
        </DashboardLayout>
    );
}
