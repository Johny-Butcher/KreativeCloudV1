import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }

    const { pathname } = req.nextUrl;
    const session = await auth();

    // Protected routes example (modify as needed)
    const protectedRoutes = ['/dashboard', '/dashboard/databases', '/dashboard/websites', '/dashboard/wordpress', "/dashboard/ftp"];
    const neutral = ['/Terms']

    if (protectedRoutes.includes(pathname) && !session?.user) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!protectedRoutes.includes(pathname) && session?.user && !neutral.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }


    return NextResponse.next();
}
