import { BrandLogo, HeroBanner } from '@/constants/asset';
import { useIsMobile } from '@/hooks/use-mobile';
import { Layout } from '@/layouts/layout';

export default function HomePage() {
    const isMobile = useIsMobile();
    return (
        <Layout>
            <section className="relative bg-blue-100">
                <img src={HeroBanner} alt="Depot Air Minum" className="inset-0 h-auto w-full object-cover opacity-50" fetchPriority="high" />

                {!isMobile && (
                    <div className="absolute right-5 bottom-5 m-auto flex h-fit max-w-6xl flex-col items-end p-20 text-right text-gray-900">
                        <div className="mb-6 flex justify-end">
                            <img src={BrandLogo} alt="Logo Depot" className="h-32" />
                        </div>

                        <h1 className="lg: mb-4 text-xl font-bold lg:text-4xl">Air Bersih & Sehat untuk Keluarga Anda</h1>

                        <p className="mb-6 w-50 text-lg lg:w-full lg:text-xl">Pesan air isi ulang berkualitas langsung dari depot terpercaya Anda.</p>

                        {/* <div className="flex justify-end gap-4">
                            <Link href="/orders" className="rounded-full bg-blue-600 px-6 py-3 text-lg text-white transition hover:bg-blue-700">
                                Order Sekarang
                            </Link>
                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                className="rounded-full bg-green-500 px-6 py-3 text-lg text-white transition hover:bg-green-600"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hubungi
                            </a>
                        </div> */}
                    </div>
                )}
            </section>
        </Layout>
    );
}
