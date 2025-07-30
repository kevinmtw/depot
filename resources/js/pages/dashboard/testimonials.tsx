import { LoadingScreen } from '@/components/loader/loading-screen';
import { TestimonialsModal } from '@/components/testimonials-modal';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Testimonial } from '@/types/react';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { Pencil, PlusCircle, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Testimonials() {
    const [fetching, setFetching] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState<Testimonial | null>(null);

    useEffect(() => {
        getAllTestimonials();
    }, []);

    const getAllTestimonials = async () => {
        try {
            setFetching(true);
            const response = await apiCall('/api/testimonials');
            setTestimonials(response.data);
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

    const handleEdit = (testimonial: Testimonial) => {
        setEditData(testimonial);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: { name: string; message: string }) => {
        const form = new FormData();

        for (const key in data) {
            form.append(key, (data as any)[key]);
        }

        if (editData) {
            form.append('_method', 'PATCH');
            try {
                const response = await apiCall(`/api/testimonials/${editData.id}`, 'POST', form);
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllTestimonials();
            }
        } else {
            try {
                const response = await apiCall('/api/testimonials', 'POST', form);
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllTestimonials();
            }
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Yakin ingin menghapus testimoni ini?')) {
            try {
                const response = await apiCall(`/api/testimonials/${id}`, 'DELETE');
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllTestimonials();
            }
        }
    };

    if (fetching) return <LoadingScreen />;

    return (
        <DashboardLayout>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-700">Testimoni</h1>
                {/* <button onClick={handleAdd} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <PlusCircle className="h-5 w-5" />
                    Tambah Testimoni
                </button> */}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-50 text-left text-sm font-semibold text-blue-700">
                        <tr>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Lokasi</th>
                            <th className="px-6 py-3">Pesan</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial.id} className="hover:bg-blue-50/50">
                                <td className="px-6 py-4 font-medium">{testimonial.name}</td>
                                <td className="px-6 py-4">{testimonial.location}</td>
                                <td className="px-6 py-4">{testimonial.message}</td>
                                <td className="px-6 py-4 text-right">
                                    {/* <button onClick={() => handleEdit(testimonial)} className="mr-3 text-blue-600 hover:text-blue-800">
                                        <Pencil className="h-5 w-5" />
                                    </button> */}
                                    <button onClick={() => handleDelete(testimonial.id)} className="text-red-500 hover:text-red-700">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <TestimonialsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editData ?? undefined}
                isEdit={!!editData}
            />
        </DashboardLayout>
    );
}
