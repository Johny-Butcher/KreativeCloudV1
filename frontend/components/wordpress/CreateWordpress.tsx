'use client';

import { useState } from 'react';
import { AcreateWordpress } from '@/services/actions/Actions';

export default function CreateWordpress() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);

        try {
            await AcreateWordpress(event);
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
                <h1 className="text-xl font-bold">Wordpress Name:</h1>
                <input
                    className="border-4 border-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    name="subdomain"
                />
                <button
                    type="submit"
                    disabled={submitted}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {submitted ? "Creating..." : "Create Wordpress"}
                </button>
            </form>
        </div>
    );
}