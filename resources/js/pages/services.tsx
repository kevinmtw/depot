import { LoadingScreen } from '@/components/loader/loading-screen';
import { Gallon } from '@/constants/asset';
import { Layout } from '@/layouts/layout';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import { parseRupiah } from '@/utils/parse-rupiah';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function renderImagePrefix(filePath: string) {
    return filePath ? `storage/${filePath}` : undefined;
}

export default function Services() {
    const [services, setServices] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
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
        getAllServices();
    }, []);

    if (fetching) {
        return <LoadingScreen />;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-white">
                {/* Water Types Section */}
                <section className="bg-blue-100 px-6 py-16">
                    <div className="mx-auto max-w-6xl text-center">
                        <h1 className="mb-10 text-4xl font-bold text-gray-900">Produk</h1>
                        <p className="mb-12 text-lg text-gray-800">Pilih jenis air yang Anda butuhkan dan pesan langsung melalui aplikasi.</p>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {Array.from(services ?? []).map((item, index) => (
                                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-4 shadow transition hover:shadow-lg">
                                    <img
                                        src={renderImagePrefix(item.image) || Gallon}
                                        alt={item.name}
                                        className="mb-4 h-40 w-full rounded-xl object-cover"
                                    />
                                    <h2 className="mb-1 text-xl font-semibold text-gray-900">{item.name}</h2>
                                    <p className="mb-4 text-gray-700">Rp. {parseRupiah(item.price_per_gallon)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Delivery Info Section */}
                <section className="bg-white px-6 py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Layanan Pengantaran</h2>
                        <div className="space-y-6 text-lg text-gray-700">
                            <p>
                                <strong>Area Pengantaran:</strong> Bekasi, dan sekitarnya.
                            </p>
                            <p>
                                <strong>Jadwal Pengantaran:</strong> Setiap hari dari pukul 08.00 - 20.00 WIB.
                            </p>
                            <p>
                                <strong>Minimum Pemesanan:</strong> 2 galon per pengantaran.
                            </p>
                            <p>Memastikan air dikirim tepat waktu dan dalam kondisi higienis langsung ke rumah Anda.</p>
                            <Link
                                href="/orders"
                                className="mt-4 inline-block rounded-full bg-green-500 px-6 py-3 font-medium text-white transition hover:bg-green-600"
                            >
                                Jadwalkan Pengantaran
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
