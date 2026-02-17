import CreateWebsites from "@/components/websites/CreateWebsites";
import WebsitesShow from "@/components/websites/WebsitesShow";
import CreateWordpress from "@/components/wordpress/CreateWordpress";
import WordpressShow from "@/components/wordpress/WordpressShow";
import { AshowWeb, AshowWordpress } from "@/services/actions/Actions"


export default async function Wordpress() {
    const wordpress = await AshowWeb();
    const press = wordpress?.data

    console.log(wordpress)
    return (
        <div>
            <CreateWebsites />
            <WebsitesShow website={press} />
        </div>
    )
}