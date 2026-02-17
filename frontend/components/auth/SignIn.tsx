import { signIn } from "@/auth";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google").then(() => {
                    console.log("dsa")
                })
            }}
        >
            <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
                Log in
            </button>
        </form>
    )
} 