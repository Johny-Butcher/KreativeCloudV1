import GetSession from "@/components/auth/GetSession";
import { SignOut } from "@/components/auth/SignOut";

export default function Dashboard() {
    return (
        <div>
            <GetSession />
            <SignOut />
        </div>
    )
}