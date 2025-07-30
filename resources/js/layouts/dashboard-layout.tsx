import { apiCall } from '@/utils/api-call';
import { Link } from '@inertiajs/react';
import { ClipboardList, Image, LayoutDashboard, LogOut, MessageSquareText, Settings } from 'lucide-react';
import React from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const handleLogout = async () => {
        await apiCall('/api/logout', 'POST');
        window.location.assign('/login');
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-800">
            {/* Sidebar */}
            <aside className="flex w-72 flex-col justify-between border-r border-gray-100 bg-white shadow-lg">
                <div>
                    <div className="flex h-20 items-center border-b border-gray-100 px-6">
                        <h1 className="text-xl font-bold tracking-tight text-blue-700">Admin Panel</h1>
                    </div>

                    <nav className="space-y-2 px-6 pt-6">
                        <SidebarLink href="/dashboard" label="Dashboard" icon={<LayoutDashboard />} />
                        <SidebarLink href="/dashboard/orders" label="Pesanan Masuk" icon={<ClipboardList />} />
                        <SidebarLink href="/dashboard/services" label="Produk" icon={<Settings />} />
                        <SidebarLink href="/dashboard/gallery" label="Galeri" icon={<Image />} />
                        <SidebarLink href="/dashboard/testimonials" label="Testimoni" icon={<MessageSquareText />} />
                    </nav>
                </div>

                <div className="border-t border-gray-100 p-4">
                    <button
                        className="flex w-full items-center justify-start gap-3 rounded-lg px-4 py-2 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
    );
}

function SidebarLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center gap-3 rounded-lg py-2 text-base font-medium transition hover:bg-blue-100 hover:text-blue-700">
            <span className="text-blue-500">{icon}</span>
            {label}
        </Link>
    );
}
