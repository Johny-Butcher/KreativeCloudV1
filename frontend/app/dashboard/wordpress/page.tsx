import CreateWordpress from "@/components/wordpress/CreateWordpress";
import WordpressShow from "@/components/wordpress/WordpressShow";
import { AshowWordpress } from "@/services/actions/Actions";

export default async function Wordpress() {
    const wordpress = await AshowWordpress();
    const press = wordpress?.data;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">WordPress Sites</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your WordPress installations</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-700">New WordPress Site</h2>
                    <span className="text-sm font-medium text-gray-400">{press?.length ?? 0}<span className="text-gray-300">/5</span></span>
                </div>
                <CreateWordpress />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Sites</h2>
                <WordpressShow wordpress={press} />
            </div>
        </div>
    );
}