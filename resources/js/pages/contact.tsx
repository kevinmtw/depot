import { APP_NAME, WHATSAPP } from '@/constants/app-config';
import { Layout } from '@/layouts/layout';

export default function Contact() {
    const openWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP}`, '_blank');
    };

    const openEmail = () => {
        window.open('mailto:info@depotairsehat.com', '_blank');
    };

    return (
        <Layout>
            <div className="mx-auto max-w-3xl px-4 py-10">
                <div className="mx-auto mb-12 max-w-6xl text-center">
                    <h1 className="mb-10 text-4xl font-bold text-gray-900">Hubungi</h1>
                </div>

                <div className="space-y-4 text-sm text-gray-700 md:text-base">
                    <div>
                        <strong className="text-gray-900">Nama Usaha:</strong> {APP_NAME}
                    </div>
                    <div>
                        <strong className="text-gray-900">Alamat:</strong> Bekasi
                    </div>
                    <div>
                        <strong className="text-gray-900">No. Telepon / WhatsApp:</strong>{' '}
                        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {WHATSAPP}
                        </a>
                    </div>
                    <div>
                        <strong className="text-gray-900">Email:</strong>{' '}
                        <a href="mailto:info@depotairsehat.com" className="hover:underline">
                            info@depotairsehat.com
                        </a>
                    </div>
                    <div>
                        <strong className="text-gray-900">Jam Operasional:</strong> 08.00 - 20.00 WIB
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center">
                    <button
                        onClick={openWhatsApp}
                        className="w-full max-w-xs rounded bg-green-600 px-6 py-2 text-nowrap text-white hover:bg-green-700"
                    >
                        Hubungi via WhatsApp
                    </button>
                    <button onClick={openEmail} className="w-full max-w-xs rounded border border-blue-600 px-6 py-2 text-blue-600 hover:bg-blue-50">
                        Kirim Email
                    </button>
                </div>
            </div>
        </Layout>
    );
}
