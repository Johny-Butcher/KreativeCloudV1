import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "@/components/auth/SignOut";

export default async function GetSession() {
    const session = await auth();

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            {session?.user ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {session.user.image && (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width={56}
                                height={56}
                                className="rounded-full"
                            />
                        )}
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">{session.user.name}</h1>
                            <p className="text-sm text-gray-500">{session.user.email}</p>
                        </div>
                    </div>
                    <SignOut />
                </div>
            ) : (
                <p className="text-sm text-gray-500">Loading session...</p>
            )}
        </div>
    );
}