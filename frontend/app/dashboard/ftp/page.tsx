import CreateWebsites from "@/components/websites/CreateWebsites";
import WebsitesShow from "@/components/websites/WebsitesShow";
import { AshowWeb } from "@/services/actions/Actions";

export default async function FTPSites() {
    const websites = await AshowWeb();
    const sites = websites?.data;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">FTP Sites</h1>
                <p className="text-sm text-gray-500 mt-1">Host static HTML &amp; PHP sites with FTP access</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">New FTP Site</h2>
                <CreateWebsites />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Sites</h2>
                <WebsitesShow website={sites} />
            </div>
        </div>
    );
}