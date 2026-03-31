import { auth } from "@/auth";
import Image from "next/image";

export default async function GetUser() {
    const session = await auth();
    return (
        <>
            {session?.user?.image && (
                <Image
                    className="rounded-full flex-shrink-0"
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                />
            )}
            <span className="text-sm font-medium text-gray-700 truncate">{session?.user?.name}</span>
        </>
    );
}