'use client';

import { useState } from 'react';
import { AdeleteDB } from '@/services/actions/Actions';

interface Database {
    databaseName: string;
    _id: string;
}

export default function ShowDatabases({ databases }: any) {
    const [submitted, setSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [databaseToDelete, setDatabaseToDelete] = useState('');

    const handleSubmit = async () => {
        setSubmitted(true);
        try {
            await AdeleteDB(databaseToDelete);
        } catch (error) {
            console.error('Error deleting database:', error);
        } finally {
            setSubmitted(false);
            setShowModal(false);
            window.location.reload();
        }
    };

    const handleDeleteClick = (databaseName: string) => {
        setDatabaseToDelete(databaseName);
        setShowModal(true);
    };

    if (!databases?.length) {
        return <p className="text-sm text-gray-500">No databases yet. Create one above.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {databases.map((item: Database) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                    >
                        <span className="text-sm font-medium text-gray-800">{item.databaseName}</span>
                        <button
                            onClick={() => handleDeleteClick(item.databaseName)}
                            className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors ml-3"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete Database?</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            This will permanently delete{' '}
                            <span className="font-medium text-gray-700">{databaseToDelete}</span>.
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitted}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition-colors"
                            >
                                {submitted ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}