import { LoadingScreen } from '@/components/loader/loading-screen';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Service } from '@/types/react';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { parseRupiah } from '@/utils/parse-rupiah';
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ServicesModal } from '../../components/services-modal';

export default function Services() {
    const [fetching, setFetching] = useState<boolean>(false);
    const [services, setServices] = useState<Service[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<Service | null>(null);

    useEffect(() => {
        getAllServices();
    }, []);

    const getAllServices = async () => {
        try {
            setFetching(true);
            const response = await apiCall('/api/services');
            setServices(response.data);
        } catch (error) {
            notification.error((error as Error).message);
        } finally {
            setFetching(false);
        }
    };

    const handleAdd = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditData(service);
        setIsModalOpen(true);
    };

    const handleSubmit = (data: { name: string; price_per_gallon: number; image: string }) => {
        if (editData) {
            async function updateApi() {
                const form = new FormData();
                form.append('_method', 'PATCH');
                for (const key in data) {
                    (data as any)[key] && form.append(key, (data as any)[key]);
                }

                try {
                    const response = await apiCall(`/api/services/${editData?.id}`, 'POST', form);
                    notification.success(response.message);
                } catch (error) {
                    notification.error((error as Error).message);
                } finally {
                    getAllServices();
                }
            }
            updateApi();
        } else {
            const form = new FormData();
            for (const key in data) {
                form.append(key, (data as any)[key]);
            }
            async function createApi() {
                try {
                    const response = await apiCall('/api/services', 'POST', form);
                    notification.success(response.message);
                } catch (error) {
                    notification.error((error as Error).message);
                } finally {
                    getAllServices();
                }
            }
            createApi();
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus layanan ini?')) {
            try {
                const response = await apiCall(`/api/services/${id}`, 'DELETE');
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllServices();
            }
        }
    };

    if (fetching) {
        return <LoadingScreen />;
    }

    return (
        <DashboardLayout>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-700">Produk</h1>
                <button onClick={handleAdd} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <PlusCircle className="h-5 w-5" />
                    Tambah Produk
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50 text-left text-sm font-semibold text-blue-700">
                        <tr>
                            <th className="px-6 py-3">Nama Produk</th>
                            <th className="px-6 py-3">Harga / Galon</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-blue-50/50">
                                <td className="px-6 py-4 font-medium">{service.name}</td>
                                <td className="px-6 py-4">Rp {parseRupiah(service.price_per_gallon)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(service)} className="mr-3 text-blue-600 transition hover:text-blue-800">
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-500 transition hover:text-red-700">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ServicesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editData ?? undefined}
                isEdit={!!editData}
            />
        </DashboardLayout>
    );
}
