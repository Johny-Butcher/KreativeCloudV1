'use client';

import { useState } from 'react';
import { AcreateWordpress } from '@/services/actions/Actions';

export default function CreateWordpress() {
    const [submitted, setSubmitted] = useState(false);
    const [limitError, setLimitError] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);
        setLimitError(false);
        let isLimitReached = false;
        try {
            const result = await AcreateWordpress(event);
            if (result?.data?.limitReached) {
                isLimitReached = true;
                setLimitError(true);
            }
        } catch (error) {
            console.error('Error creating WordPress site:', error);
        } finally {
            setSubmitted(false);
            if (!isLimitReached) window.location.reload();
        }
    };

    return (
        <div className="space-y-2">
            {limitError && (
                <p className="text-sm text-red-600">Limit reached: you can only have 5 WordPress sites.</p>
            )}
            <form className="flex flex-col sm:flex-row gap-3" action={handleSubmit}>
                <input
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    type="text"
                    name="subdomain"
                    placeholder="Site name (e.g. myblog)"
                />
                <button
                    type="submit"
                    disabled={submitted}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
                >
                    {submitted ? 'Creating...' : 'Create Site'}
                </button>
            </form>
        </div>
    );
}