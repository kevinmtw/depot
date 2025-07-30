import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Link } from '@inertiajs/react';
import { ClipboardList, Image as ImageIcon, Settings } from 'lucide-react'; // using lucide-react icons (can be replaced with others)

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-blue-700 md:text-4xl">👋 Selamat Datang, Admin</h1>
                <p className="mt-2 text-lg text-gray-600">Kelola pesanan, layanan, galeri, dan informasi pelanggan melalui dasbor ini.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                        <div className="mb-3 flex items-csenter justify-between">
                            <h2 className="text-xl font-semibold text-blue-600">Testimoni</h2>
                            <ImageIcon className="h-6 w-6 text-blue-400 transition group-hover:scale-110" />
                        </div>
                        <p className="text-gray-600">Kelola testimoni dari pelanggan.</p>
                    </div>
                </Link>
            </div>
        </DashboardLayout>
    );
}
