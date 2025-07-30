import { LoadingScreen } from '@/components/loader/loading-screen';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { apiCall } from '@/utils/api-call';
import { Link } from '@inertiajs/react';
import { ClipboardList, Image as ImageIcon, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Dashboard() {
    const [fetching, setFetching] = useState(false);
    const [serviceCount, setServiceCount] = useState(0);
    const [testimonialCount, setTestimonialCount] = useState(0);
    const [orderCount, setOrderCount] = useState({ totalDaily: 0, totalMonthly: 0 });

    useEffect(() => {
        const getOrderCount = async () => {
            try {
                setFetching(true);
                const responseOrderCount = await apiCall('/api/orders/count');
                const responseServiceCount = await apiCall('/api/services/count');
                const responseTestimonialCount = await apiCall('/api/testimonials/count');
                setOrderCount(responseOrderCount.data);
                setServiceCount(responseServiceCount.data);
                setTestimonialCount(responseTestimonialCount.data);
            } catch (error) {
                console.error((error as Error).message);
            } finally {
                setFetching(false);
            }
        };
        getOrderCount();
    }, []);

    if (fetching) return <LoadingScreen />;

    const revenueSection = [
        { name: 'Pesanan Harian', count: orderCount.totalDaily },
        { name: 'Pesanan Bulanan', count: orderCount.totalMonthly },
    ];

    const activityAndCatalogSection = [
        { name: 'Jumlah Produk', count: serviceCount },
        { name: 'Jumlah Pelanggan', count: testimonialCount },
    ];

    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-blue-700 md:text-4xl">👋 Selamat Datang, Admin</h1>
                <p className="mt-2 text-lg text-gray-600">Kelola pesanan, layanan, galeri, dan informasi pelanggan melalui dasbor ini.</p>
            </div>

            <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/dashboard/orders">
                    {/* Orders */}
                    <div className="group rounded-2xl border border-transparent bg-white p-6 shadow-md transition-all duration-200 hover:border-blue-100 hover:shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-blue-600">Pesanan Masuk</h2>
                            <ClipboardList className="h-6 w-6 text-blue-400 transition group-hover:scale-110" />
                        </div>
                        <p className="text-gray-600">Kelola dan proses permintaan pelanggan dengan cepat dan efisien.</p>
                    </div>
                </Link>

                {/* Services */}
                <Link href="/dashboard/services">
                    <div className="group rounded-2xl border border-transparent bg-white p-6 shadow-md transition-all duration-200 hover:border-blue-100 hover:shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-blue-600">Produk</h2>
                            <Settings className="h-6 w-6 text-blue-400 transition group-hover:rotate-12" />
                        </div>
                        <p className="text-gray-600">Perbarui daftar layanan, jenis air, dan tarif isi ulang sesuai kebutuhan.</p>
                    </div>
                </Link>

                <Link href="/dashboard/gallery">
                    {/* Gallery */}
                    <div className="group rounded-2xl border border-transparent bg-white p-6 shadow-md transition-all duration-200 hover:border-blue-100 hover:shadow-lg">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-blue-600">Galeri</h2>
                            <ImageIcon className="h-6 w-6 text-blue-400 transition group-hover:scale-110" />
                        </div>
                        <p className="text-gray-600">Tambahkan atau hapus foto peralatan dan proses isi ulang air.</p>
                    </div>
                </Link>

                <Link href="/dashboard/testimonials">
                    {/* Testimonials */}
                    <div className="group rounded-2xl border border-transparent bg-white p-6 shadow-md transition-all duration-200 hover:border-blue-100 hover:shadow-lg">
                        <div className="items-csenter mb-3 flex justify-between">
                            <h2 className="text-xl font-semibold text-blue-600">Testimoni</h2>
                            <ImageIcon className="h-6 w-6 text-blue-400 transition group-hover:scale-110" />
                        </div>
                        <p className="text-gray-600">Kelola testimoni dari pelanggan.</p>
                    </div>
                </Link>
            </div>

            {/* Revenue Chart Section */}
            <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-3 text-xl font-semibold text-blue-600">Ringkasan Penjualan</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueSection}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded bg-white p-2 text-sm text-gray-700 shadow">
                                                <p>{label}</p>
                                                <p>
                                                    <strong>Jumlah</strong>: {payload[0].value}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Activity And Catalog Chart Section */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-3 text-xl font-semibold text-blue-600">Jumlah Produk dan Pelanggan</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityAndCatalogSection}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded bg-white p-2 text-sm text-gray-700 shadow">
                                                <p>{label}</p>
                                                <p>
                                                    <strong>Jumlah</strong>: {payload[0].value}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Rating Chart Section  */}
            <div className="mt-6 rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-3 text-xl font-semibold text-yellow-600">Rata-Rata Rating Testimoni</h2>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[{ name: 'Rating Testimoni', rating: 4.8 }]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded bg-white p-2 text-sm text-gray-700 shadow">
                                                <p>{label}</p>
                                                <p>
                                                    <strong>Nilai Rating</strong>: {payload[0].value}
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="rating" fill="#facc15" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </DashboardLayout>
    );
}
