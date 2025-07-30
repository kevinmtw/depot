import { APP_NAME, WHATSAPP } from '@/constants/app-config';
import { Link } from '@inertiajs/react';

export function Footer() {
    const handleRedirectWhatsapp = () => {
        window.open(`https://wa.me/${WHATSAPP}`);
    };

    return (
        <footer className="bg-blue-900 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
                {/* About */}
                <div>
                    <h4 className="mb-2 text-lg font-semibold">{APP_NAME}</h4>
                    <p className="text-sm">Menyediakan air minum isi ulang berkualitas tinggi untuk kesehatan keluarga Anda.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="mb-2 text-lg font-semibold">Navigasi</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/" className="hover:underline">
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us" className="hover:underline">
                                Profil Usaha
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className="hover:underline">
                                Produk
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className="hover:underline">
                                Galeri
                            </Link>
                        </li>
                        <li>
                            <Link href="/testimonials" className="hover:underline">
                                Testimoni
                            </Link>
                        </li>
                        <li>
                            <Link href="/orders" className="hover:underline">
                                Order
                            </Link>
                        </li>
                        <li>
                            <button className="hover:underline" onClick={handleRedirectWhatsapp}>
                                Kontak
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="mb-2 text-lg font-semibold">Kontak</h4>
                    <p className="text-sm">Bekasi</p>
                    <p className="text-sm">
                        WA:{' '}
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" className="underline" rel="noopener noreferrer">
                            {WHATSAPP}
                        </a>
                    </p>
                    <p className="text-sm">Email: info@depotairsehat.com</p>
                </div>
            </div>

            <div className="bg-blue-800 py-4 text-center text-sm">
                © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </div>
        </footer>
    );
}
