import { auth } from "@/auth";
import Image from "next/image";

export default async function GetUser() {
    const session = await auth();
    return (
        <>
            {session?.user && <Image className=" rounded-full" src={`${session?.user?.image}`} alt="ProfilePicture" width={35} height={35} />}
            <h1>{session?.user?.name}</h1>

        </>
    )
}