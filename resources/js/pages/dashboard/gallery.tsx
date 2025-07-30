import { GalleryModal } from '@/components/gallery-modal';
import { LoadingScreen } from '@/components/loader/loading-screen';
import { Warehouse } from '@/constants/asset';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { GalleryImage } from '@/types/react';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

function renderImagePrefix(filePath: string) {
    return filePath ? `../storage/${filePath}` : undefined;
}

export default function Gallery() {
    const [fetching, setFetching] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gallery, setGallery] = useState<GalleryImage[]>([]);

    useEffect(() => {
        getAllGallery();
    }, []);

    const getAllGallery = async () => {
        try {
            setFetching(true);
            const response = await apiCall('/api/gallery');
            setGallery(response.data);
        } catch (error) {
            notification.error((error as Error).message);
        } finally {
            setFetching(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Hapus foto ini dari galeri?')) {
            try {
                const response = await apiCall(`/api/gallery/${id}`, 'DELETE');
                notification.success(response.message);
            } catch (error) {
                notification.error((error as Error).message);
            } finally {
                getAllGallery();
            }
        }
    };

    const handleAddImage = async (data: { image: string; caption: string }) => {
        const newImage = {
            caption: data.caption,
            image: data.image,
        };

        const form = new FormData();
        for (const key in newImage) {
            form.append(key, (newImage as any)[key]);
        }

        try {
            const response = await apiCall('/api/gallery', 'POST', form);
            notification.success(response.message);
        } catch (error) {
            notification.error((error as Error).message);
        } finally {
            getAllGallery();
        }
    };

    if (fetching) {
        return <LoadingScreen />;
    }

    return (
        <DashboardLayout>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-700">Galeri</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <PlusCircle className="h-5 w-5" />
                    Tambah Foto
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from(gallery ?? []).map((gallery) => (
                    <div key={gallery.id} className="relative overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-md">
                        <img src={renderImagePrefix(gallery.image) || Warehouse} alt="Gallery" className="h-56 w-full object-cover" />
                        <div className="p-4">
                            <p className="text-gray-700">{gallery.caption}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(gallery.id)}
                            className="absolute top-3 right-3 rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>

            <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddImage} />
        </DashboardLayout>
    );
}
