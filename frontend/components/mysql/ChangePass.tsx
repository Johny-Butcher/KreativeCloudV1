'use client';

import { useState } from 'react';
import { AchangePass } from '@/services/actions/Actions';

export default function ChangePass() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);
        try {
            await AchangePass(event);
        } catch (error) {
            console.error('Error changing password:', error);
        } finally {
            setSubmitted(false);
            window.location.reload();
        }
    };

    return (
        <form className="flex gap-3" action={handleSubmit}>
            <input
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                type="password"
                name="newPass"
                placeholder="New password"
            />
            <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
            >
                {submitted ? 'Updating...' : 'Update'}
            </button>
        </form>
    );
}