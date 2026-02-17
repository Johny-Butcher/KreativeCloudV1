import CreateWordpress from "@/components/wordpress/CreateWordpress";
import WordpressShow from "@/components/wordpress/WordpressShow";
import { AshowWordpress } from "@/services/actions/Actions";


export default async function Wordpress() {
    const wordpress = await AshowWordpress();
    const press = wordpress?.data

    console.log(wordpress)
    return (
        <div>
            <CreateWordpress />
            <WordpressShow wordpress={press} />
        </div>
    )
}