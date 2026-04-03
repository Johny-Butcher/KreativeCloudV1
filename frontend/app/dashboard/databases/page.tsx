import { auth } from "@/auth";
import ChangePass from "@/components/mysql/ChangePass";
import CreateDatabase from "@/components/mysql/CreateDatabase";
import CreateUserUI from "@/components/mysql/CreateUserUI";
import ShowDatabases from "@/components/mysql/ShowDatabases";
import { dbUserExist, ShowPass } from "@/lib/mysql/api";

async function getData() {
    const session = await auth();
    return await dbUserExist(session);
}

async function getUser() {
    const session = await auth();
    return await ShowPass(session);
}

export default async function Databases() {
    const url = process.env.NEXT_PUBLIC_SITEURL;
    const data = await getData();
    const user = await getUser();
    const databases = user?.data.databases;
    const username = user?.data.username;
    const pass = user?.data.pass;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Databases</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your MySQL databases</p>
                </div>
                <a
                    href={`${url}/pma/`}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                    phpMyAdmin
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            {data?.data?.data ? (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Connection Details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Host</p>
                                <p className="font-mono text-sm font-medium text-gray-900">dbcloudv1.johny.codes</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Username</p>
                                <p className="font-mono text-sm font-medium text-gray-900">{username}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-500 mb-1">Password</p>
                                <p className="font-mono text-sm font-medium text-gray-900">{pass}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-gray-700">Create Database</h2>
                                <span className="text-sm font-medium text-gray-400">{databases?.length ?? 0}<span className="text-gray-300">/5</span></span>
                            </div>
                            <CreateDatabase />
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4">Change Password</h2>
                            <ChangePass />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Databases</h2>
                        <ShowDatabases databases={databases} />
                    </div>
                </div>
            ) : (
                <CreateUserUI />
            )}
        </div>
    );
}