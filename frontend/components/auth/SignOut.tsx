import { signOut } from "@/auth";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut();
            }}
        >
            <button type="submit" className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                Sign out
            </button>
        </form>
    );
}