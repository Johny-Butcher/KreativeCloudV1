'use client';

import { useState } from 'react';
import { AcreateDB } from '@/services/actions/Actions';

export default function CreateDatabase() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event: FormData) => {
        setSubmitted(true);

        try {
            await AcreateDB(event);
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setSubmitted(false);
            window.location.reload();
        }
    };

    return (
        <div className="flex items-center m-4 justify-center gap-4">
            <form className="flex items-center gap-4" action={handleSubmit}>
                <h1 className="text-xl font-bold">Database Name</h1>
                <input
                    className="border-4 border-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    name="databaseName"
                />
                <button
                    type="submit"
                    disabled={submitted}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-300"
                >
                    {submitted ? 'Creating...' : 'Create Database'}
                </button>
            </form>
        </div>
    );
}