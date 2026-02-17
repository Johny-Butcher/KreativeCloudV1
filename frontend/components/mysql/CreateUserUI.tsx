'use client';

import { useState, FormEvent } from 'react';
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
        <div className="flex flex-col justify-center items-center m-16 bg-gray-100 rounded-md p-10 shadow-md">
            <form className="flex flex-col gap-4" action={handleSubmit}>
                <h1 className="text-3xl font-bold text-blue-600">Password</h1>
                <input
                    className="border-4 border-blue-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    name="pass"
                />
                <button
                    type="submit"
                    disabled={submitted}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-300"
                >
                    {submitted ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}