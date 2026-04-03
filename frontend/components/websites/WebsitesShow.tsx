'use client';

import { useState } from 'react';
import { AwebsiteDel } from '@/services/actions/Actions';

export default function WebsitesShow({ website }: any) {
    const url = process.env.NEXT_PUBLIC_SITEURL;
    const [dis, setDis] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [subdomainToDelete, setSubdomainToDelete] = useState('');
    const [expandedFtp, setExpandedFtp] = useState<string | null>(null);

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
                {website.map((item: any) => {
                    const name = item.subdomain.split('/')[1];
                    const ftpOpen = expandedFtp === item._id;
                    return (
                        <div key={item._id} className="rounded-lg border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                                <span className="text-sm font-medium text-gray-800">{name}</span>
                                <div className="flex items-center gap-2">
                                    <a
                                        href={`${url}/projects/${item.subdomain}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                                    >
                                        Open
                                    </a>
                                    <button
                                        onClick={() => setExpandedFtp(ftpOpen ? null : item._id)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        FTP
                                        <svg
                                            className={`w-3 h-3 transition-transform ${ftpOpen ? 'rotate-180' : ''}`}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(item.subdomain)}
                                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {ftpOpen && (
                                <div className="border-t border-gray-100 bg-white px-4 py-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">FTP Connection Details</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-400 mb-1">Host</p>
                                            <p className="font-mono text-xs font-medium text-gray-800 break-all">ftpcloudv1.johny.codes</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-400 mb-1">Port</p>
                                            <p className="font-mono text-xs font-medium text-gray-800">2121</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-400 mb-1">Username</p>
                                            <p className="font-mono text-xs font-medium text-gray-800 break-all">{item.subdomain.replace(/\//g, '')}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-400 mb-1">Password</p>
                                            <p className="font-mono text-xs font-medium text-gray-800 break-all">{item.pass}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`ftp://${item.subdomain.replace(/\//g, '')}:${item.pass}@ftpcloudv1.johny.codes:2121`}
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:underline"
                                    >
                                        Open in FTP client
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })}
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
