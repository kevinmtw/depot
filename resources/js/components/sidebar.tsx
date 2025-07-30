import { WHATSAPP } from '@/constants/app-config';
import { SidebarProps } from '@/types/react';
import { Link } from '@inertiajs/react';

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const handleRedirectWhatsapp = () => {
        window.open(`https://wa.me/${WHATSAPP}`);
    };

    return (
        <div
            className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-blue-100 shadow-lg transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden`}
        >
            <div className="flex items-center justify-between border-b border-blue-200 bg-white px-4 py-4">
                <span className="text-xl font-bold text-blue-700">Menu</span>
                <button onClick={onClose} className="text-2xl text-gray-700">
                    &times;
                </button>
            </div>
            <nav className="flex flex-col space-y-4 px-6 py-6 font-medium text-gray-800">
                <Link href="/" className="hover:text-blue-600" onClick={onClose}>
                    Beranda
                </Link>
                <Link href="/about-us" className="hover:text-blue-600" onClick={onClose}>
                    Tentang
                </Link>
                <Link href="/services" className="hover:text-blue-600" onClick={onClose}>
                    Layanan
                </Link>
                <Link href="/gallery" className="hover:text-blue-600" onClick={onClose}>
                    Galeri
                </Link>
                <Link href="/testimonials" className="hover:text-blue-600" onClick={onClose}>
                    Testimoni
                </Link>

                <button className="w-fit hover:text-blue-600" onClick={handleRedirectWhatsapp}>
                    Kontak
                </button>
                <Link href="/orders" className="mt-4 rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700" onClick={onClose}>
                    Order Sekarang
                </Link>
            </nav>
        </div>
    );
}
