import { APP_NAME, WHATSAPP } from '@/constants/app-config';
import { BrandLogo } from '@/constants/asset';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Sidebar } from './sidebar';

export function Navbar() {
    const isMobile = useIsMobile();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleRedirectWhatsapp = () => {
        window.open(`https://wa.me/${WHATSAPP}`);
    };

    return (
        <React.Fragment>
            <nav className="bg-white shadow-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-3">
                        <img src={BrandLogo} alt="Logo" className="h-10" />
                        <span className="app-name text-sm font-bold text-blue-700 lg:text-lg">{APP_NAME}</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden space-x-6 font-medium text-gray-700 md:flex">
                        <Link href="/" className="text-sm hover:text-blue-600 lg:text-lg">
                            Beranda
                        </Link>
                        <Link href="/about-us" className="text-sm hover:text-blue-600 lg:text-lg">
                            Profil Usaha
                        </Link>
                        <Link href="/services" className="text-sm hover:text-blue-600 lg:text-lg">
                            Produk
                        </Link>
                        <Link href="/gallery" className="text-sm hover:text-blue-600 lg:text-lg">
                            Galeri
                        </Link>
                        <Link href="/testimonials" className="text-sm hover:text-blue-600 lg:text-lg">
                            Testimoni
                        </Link>

                        <button className="text-sm hover:text-blue-600 lg:text-lg" onClick={handleRedirectWhatsapp}>
                            Kontak
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <Link href="/orders" className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 lg:text-lg">
                            Order Sekarang
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    {isMobile && (
                        <div>
                            <button onClick={() => setSidebarOpen(true)} className="text-2xl text-blue-700">
                                &#9776;
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Sidebar Mobile Navigation */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </React.Fragment>
    );
}
