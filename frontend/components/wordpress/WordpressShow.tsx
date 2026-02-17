'use client';

import { useState } from 'react';
import { AdeleteDB, AwordpressDel } from '@/services/actions/Actions';

export default function WordpressShow({ wordpress }: any) {
    const url = process.env.NEXT_PUBLIC_SITEURL;
    const [dis, setDis] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [subdomainToDelete, setSubdomainToDelete] = useState('');

    const handleSubmit = async () => {
        setDis(true);
        try {
            await AwordpressDel(subdomainToDelete);
        } catch (error) {
            console.error('Error deleting wordpress:', error);
        } finally {
            setDis(false);
            setShowModal(false);
            window.location.reload();
        }
    };

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleDeleteClick = (subdomain: string) => {
        setSubdomainToDelete(subdomain);
        setShowModal(true);
    };

    return (
        <div className="flex flex-col justify-center gap-4">
            {wordpress.map((item: any) => (
                <div
                    key={item._id}
                    className="bg-gray-100 m-2 rounded-md p-4 shadow-md flex items-center justify-between"
                >
                    <span className="font-medium">{item.subdomain.split("/")[1]}</span>
                    <div className="flex gap-4">
                        <button
                            onClick={() => openInNewTab(`${url}/projects/${item.subdomain}`)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
                        >
                            Open
                        </button>
                        <button
                            onClick={() => handleDeleteClick(item.subdomain)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete {subdomainToDelete}?</p>
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