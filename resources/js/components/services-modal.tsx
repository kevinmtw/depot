import { ServiceModalProps } from '@/types/react';
import { parseRupiah } from '@/utils/parse-rupiah';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export function ServicesModal({ isOpen, onClose, onSubmit, initialData, isEdit = false }: ServiceModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(initialData?.name || '');
            setPrice(initialData?.price_per_gallon || 0);
        }
    }, [isOpen, initialData]);

    const handleSubmit = () => {
        if (!name || !price) return alert('Semua bidang wajib diisi');
        onSubmit({ name, price_per_gallon: Number(price), image });
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
                                <Dialog.Title className="text-lg font-bold text-blue-700">{isEdit ? 'Edit Produk' : 'Tambah Produk'}</Dialog.Title>

                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Contoh: Air RO"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Harga per Galon</label>
                                        <input
                                            type="string"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            value={parseRupiah(price)}
                                            onChange={(e) => {
                                                const amount = String(e.target.value).replace(/\D/g, '');
                                                setPrice(Number(amount) ?? '');
                                            }}
                                            placeholder="Contoh: 5000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Pilih Gambar</label>
                                        <input
                                            type="file"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            onChange={(e) => {
                                                setImage((e.target.files as any)[0]);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={onClose}
                                        className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>
                                    <button onClick={handleSubmit} className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
                                        Simpan
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
