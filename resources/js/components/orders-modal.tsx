import { Order, OrdersModalProps } from '@/types/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export function OrdersModal({ isOpen, onClose, onSubmit, initialData }: OrdersModalProps) {
    const [form, setForm] = useState<Order>(
        initialData ?? {
            id: Date.now(),
            name: '',
            address: '',
            quantity: 1,
            type: 'refill',
            status: 'on_process',
        },
    );

    useEffect(() => {
        if (isOpen && initialData) {
            setForm(initialData);
        }
    }, [isOpen, initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name == 'quantity') {
            const amount = value.replace(/\D/g, '');
            setForm((prev) => ({ ...prev, [name]: Number(amount) ?? '' }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        if (!form.name || !form.address || !form.quantity) {
            return alert('Semua bidang wajib diisi');
        }

        onSubmit(form);
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-bold text-blue-700">
                                    {initialData ? 'Edit Pesanan' : 'Tambah Pesanan'}
                                </Dialog.Title>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Nama pelanggan"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Alamat</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            placeholder="Alamat pengantaran"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Jumlah Galon</label>
                                        <input
                                            type="text"
                                            name="quantity"
                                            value={form.quantity}
                                            onChange={handleChange}
                                            placeholder="Jumlah galon"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tipe Pesanan</label>
                                        <select
                                            name="type"
                                            value={form.type}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="refill">Isi Ulang</option>
                                            <option value="new_purchase">Beli Baru</option>
                                            <option value="pickup_return">Ambil/Kembali Galon</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="on_process">Sedang Diproses</option>
                                            <option value="on_delivery">Dalam Pengantaran</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button onClick={handleSubmit} className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
