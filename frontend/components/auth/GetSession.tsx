import { auth } from "@/auth";
import Image from "next/image";

export default async function GetSession() {
    const session = await auth();
    //console.log(session);

    return (
        <div className="flex flex-col items-center justify-center m-16 bg-gray-100 rounded-md p-10 shadow-md">
            {session?.user ? (
                <>
                    <h1 className="text-3xl font-bold text-blue-600">
                        {session?.user?.name}
                    </h1>
                    <div className="mt-4">
                        <Image
                            src={`${session?.user?.image}`}
                            alt="ProfilePicture"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-blue-600 mt-4">
                        {session?.user?.email}
                    </h2>
                </>
            ) : (
                <p>Loading session...</p>
            )}
        </div>
    );
}