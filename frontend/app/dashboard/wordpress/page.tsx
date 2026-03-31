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
                <h2 className="text-sm font-semibold text-gray-700 mb-4">New WordPress Site</h2>
                <CreateWordpress />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Sites</h2>
                <WordpressShow wordpress={press} />
            </div>
        </div>
    );
}