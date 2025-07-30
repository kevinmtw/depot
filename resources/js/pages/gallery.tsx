import { LoadingScreen } from '@/components/loader/loading-screen';
import { Warehouse } from '@/constants/asset';
import { Layout } from '@/layouts/layout';
import { GalleryImage } from '@/types/react';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { useEffect, useState } from 'react';

function renderImagePrefix(filePath: string) {
    return filePath ? `storage/${filePath}` : undefined;
}

export default function Gallery() {
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
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
        getAllGallery();
    }, []);

    if (fetching) {
        return <LoadingScreen />;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-blue-100 px-4 py-16">
                <div className="mx-auto mb-12 max-w-6xl text-center">
                    <h1 className="mb-10 text-4xl font-bold text-gray-900">Galeri</h1>
                    <p className="text-lg text-gray-700">Lihat proses dan fasilitas dalam menyediakan air bersih berkualitas.</p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from(gallery ?? []).map((gallery, idx) => (
                        <div key={idx} className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg">
                            <img src={renderImagePrefix(gallery.image) || Warehouse} alt="Gallery" className="h-60 w-full object-cover" />
                            <div className="p-4">
                                <p className="font-medium text-gray-800">{gallery.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
