import { WHATSAPP } from '@/constants/app-config';
import { Layout } from '@/layouts/layout';
import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import React from 'react';

type Service = 'refill' | 'new_purchase' | 'pickup_return';

function parseWhatsappService(service: Service) {
    switch (service) {
        case 'refill':
            return 'Refill';
        case 'new_purchase':
            return 'Beli Galon';
        case 'pickup_return':
            return 'Penjemputan / Pengembalian Galon';
        default:
            const _exhaustiveCheck: never = service;
            return _exhaustiveCheck;
    }
}

export default function Order() {
    const generateWhatsAppLink = async (data: any) => {
        const { name, address, quantity, type } = data;
        const message = `Halo, saya ingin memesan air:\n\nNama: ${name}\nAlamat: ${address}\nJumlah Galon: ${quantity}\nLayanan: ${parseWhatsappService(type)}`;
        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`);
    };

    const handleCreateOrders = async (event: React.FormEvent) => {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const form = new FormData(formElement);

        try {
            const response = await apiCall('/api/orders', 'POST', form);
            const parseForm = Object.fromEntries(form.entries());
            generateWhatsAppLink(parseForm);
            formElement.reset();
            notification.success(response.message);
        } catch (error) {
            notification.error((error as Error).message);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-blue-100 px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-md">
                    <h1 className="mb-8 text-center text-3xl font-bold text-blue-700">Formulir Pemesanan</h1>

                    <form onSubmit={handleCreateOrders}>
                        <div className="space-y-6">
                            <div>
                                <label className="mb-2 block text-gray-700">Nama</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Masukkan nama Anda"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-gray-700">Alamat</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Alamat lengkap"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-gray-700">Jumlah Galon</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Contoh: 3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-gray-700">Pilih Layanan</label>
                                <select
                                    name="type"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                >
                                    <option value="">-- Pilih Layanan --</option>
                                    <option value="refill">Refill Saja</option>
                                    <option value="new_purchase">Beli Galon Baru</option>
                                    <option value="pickup_return">Penjemputan / Pengembalian Galon</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="block w-full rounded-full bg-green-500 py-3 text-center font-semibold text-white transition hover:bg-green-600"
                            >
                                Kirim via WhatsApp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
