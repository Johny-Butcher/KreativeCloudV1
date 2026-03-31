'use client';

import { useState } from 'react';
import { AwebsiteDel } from '@/services/actions/Actions';

export default function WebsitesShow({ website }: any) {
    const url = process.env.NEXT_PUBLIC_SITEURL;
    const [dis, setDis] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [subdomainToDelete, setSubdomainToDelete] = useState('');

    const handleSubmit = async () => {
        setDis(true);
        try {
            await AwebsiteDel(subdomainToDelete);
        } catch (error) {
            console.error('Error deleting site:', error);
        } finally {
            setDis(false);
            setShowModal(false);
            window.location.reload();
        }
    };

    const handleDeleteClick = (subdomain: string) => {
        setSubdomainToDelete(subdomain);
        setShowModal(true);
    };

    if (!website?.length) {
        return <p className="text-sm text-gray-500">No sites yet. Create one above.</p>;
    }

    return (
        <>
            <div className="space-y-3">
                {website.map((item: any) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100"
                    >
                        <span className="text-sm font-medium text-gray-800">{item.subdomain.split('/')[1]}</span>
                        <div className="flex items-center gap-2">
                            <a
                                href={`${url}/projects/${item.subdomain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                            >
                                Open
                            </a>
                            <a
                                href={`ftp://${item.subdomain.replace(/\//g, '')}:${item.pass}@127.0.0.1:2121`}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                FTP
                            </a>
                            <button
                                onClick={() => handleDeleteClick(item.subdomain)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete Site?</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            This will permanently delete{' '}
                            <span className="font-medium text-gray-700">{subdomainToDelete.split('/')[1]}</span>.
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
                                disabled={dis}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition-colors"
                            >
                                {dis ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
