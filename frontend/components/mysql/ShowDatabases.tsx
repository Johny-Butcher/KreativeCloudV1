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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {databases.map((item: Database) => (
                <div
                    key={item._id}
                    className="bg-gray-100 rounded-md p-4 shadow-md flex items-center justify-between"
                >
                    <span className="font-medium mr-1">{item.databaseName}</span>
                    <button
                        onClick={() => handleDeleteClick(item.databaseName)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            ))}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete {databaseToDelete}?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}