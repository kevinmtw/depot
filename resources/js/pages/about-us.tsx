import { Layout } from '@/layouts/layout';

export default function AboutUs() {
    return (
        <Layout>
            <div className="h-full bg-white">
                <section className="bg-blue-100 px-6 py-16">
                    <div className="mx-auto max-w-5xl text-center">
                        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Profil Usaha</h1>
                        <p className="mb-10 text-lg text-gray-800 md:text-xl">
                            Penyedia layanan air minum isi ulang yang berkomitmen untuk menyediakan air bersih, sehat, dan berkualitas tinggi langsung
                            ke rumah Anda.
                        </p>
                        <div className="space-y-6 text-left text-gray-700">
                            <div>
                                <h2 className="mb-2 text-2xl font-semibold">Visi</h2>
                                <p>Menjadi pilihan utama masyarakat dalam memenuhi kebutuhan air minum yang aman dan berkualitas.</p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-2xl font-semibold">Misi</h2>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Menyediakan air minum isi ulang yang higienis dan terjangkau.</li>
                                    <li>Mengutamakan pelayanan pelanggan dengan cepat dan ramah.</li>
                                    <li>Menjaga standar kualitas dan kebersihan depot setiap saat.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-2 text-2xl font-semibold">Kenapa Memilih Depot Air Tirta Barokah?</h2>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Air disaring melalui proses berkualitas tinggi.</li>
                                    <li>Pengantaran cepat dan tepat waktu.</li>
                                    <li>Layanan pelanggan yang mudah dihubungi dan responsif.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
