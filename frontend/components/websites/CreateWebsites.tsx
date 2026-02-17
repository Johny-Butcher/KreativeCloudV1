'use client';

import { useState } from 'react';
import { AcreateWeb } from '@/services/actions/Actions';

export default function CreateWebsites() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);

        try {
            await AcreateWeb(event);
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setSubmitted(false);
            window.location.reload();
        }
    };

    return (
        <div>
            <form className="flex items-center gap-4" action={handleSubmit}>
                <h1 className="text-xl font-bold">Website Name:</h1>
                <input
                    className="border-4 border-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    name="subdomain"
                />
                <h1 className="text-xl font-bold">Password:</h1>
                <input
                    className="border-4 border-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    name="pass"
                />
                <button
                    type="submit"
                    disabled={submitted}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {submitted ? "Creating..." : "Create Website"}
                </button>
            </form>
        </div>
    );
}