'use client';

import { useState } from 'react';
import { AcreateDBUser } from '@/services/actions/Actions';

export default function CreateUserUI() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);
        try {
            await AcreateDBUser(event);
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setSubmitted(false);
            window.location.reload();
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Set Up Database Access</h2>
            <p className="text-sm text-gray-500 mb-6">Create a password to activate your MySQL account.</p>
            <form className="space-y-4" action={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        type="password"
                        name="pass"
                        placeholder="Enter a strong password"
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitted}
                    className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors"
                >
                    {submitted ? 'Creating...' : 'Activate Database Access'}
                </button>
            </form>
        </div>
    );
}