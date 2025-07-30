import { LoadingScreen } from '@/components/loader/loading-screen';
import { TestimonialsModal } from '@/components/testimonials-modal';
import { Layout } from '@/layouts/layout';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Testimonials() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
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
        getAllTestimonials();
    }, []);

    const handleSubmit = async (data: { name: string; message: string }) => {
        const form = new FormData();

        for (const key in data) {
            form.append(key, (data as any)[key]);
        }

        try {
            const response = await apiCall('/api/testimonials', 'POST', form);
            notification.success(response.message);
        } catch (error) {
            notification.error((error as Error).message);
        }
    };

    if (fetching) {
        return <LoadingScreen />;
    }
    return (
        <Layout>
            <section className="bg-white px-6 py-16">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-10 text-4xl font-bold text-gray-900">Apa Kata Pelanggan</h1>
                    <p className="mb-12 text-lg text-gray-700">Testimoni dari pelanggan yang puas dengan layanan.</p>
                    <div className="grid gap-6 md:grid-cols-2">
                        {testimonials.map((testimonial, index) => (
                            <blockquote key={index} className="rounded-xl bg-gray-50 p-6 text-left shadow transition hover:shadow-md">
                                <p className="mb-4 text-gray-800 italic">“{testimonial.message}”</p>
                                <footer className="text-sm font-semibold text-blue-700">
                                    — {testimonial.name}, {testimonial.location}
                                </footer>
                            </blockquote>
                        ))}
                        <blockquote
                            className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 p-6 shadow transition hover:shadow-md"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PlusIcon />
                            <p className="text-gray-800">Buat Testimoni</p>
                        </blockquote>
                    </div>
                </div>
            </section>
            <TestimonialsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={undefined}
                isEdit={false}
            />
        </Layout>
    );
}
