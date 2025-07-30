import { apiCall } from '@/utils/api-call';
import { notification } from '@/utils/notification';
import React from 'react';

export default function Login() {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = new FormData(event.target as unknown as HTMLFormElement);
        try {
            await apiCall('/api/login', 'POST', form);
            notification.success('Success');
            window.location.assign('/dashboard');
        } catch (error) {
            notification.error((error as Error).message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-blue-700">Admin Login</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="mb-2 block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="admin@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="********"
                        />
                    </div>

                    <button type="submit" className="w-full rounded-full bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700">
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}
