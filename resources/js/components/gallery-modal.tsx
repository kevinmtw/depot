import { GalleryModalProps } from '@/types/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export function GalleryModal({ isOpen, onClose, onSave }: GalleryModalProps) {
    const [image, setImage] = useState<string | null>(null);
    const [caption, setCaption] = useState('');

    const handleSubmit = () => {
        if (!image || !caption) return alert('Semua bidang wajib diisi');
        onSave({ image, caption });
        setImage('');
        setCaption('');
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
                                <Dialog.Title className="text-lg font-bold text-blue-700">Tambah Foto Galeri</Dialog.Title>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Pilih Gambar</label>
                                        <input
                                            type="file"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            onChange={(e) => setImage((e.target.files as any)[0])}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            placeholder="Deskripsi gambar"
                                        />
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
