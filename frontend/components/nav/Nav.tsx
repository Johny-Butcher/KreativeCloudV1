'use client';
import { usePathname } from "next/navigation"

const navItems = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: (
            <svg className="flex-shrink-0 w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        href: "/dashboard/ftp",
        label: "FTP Sites",
        icon: (
            <svg className="flex-shrink-0 w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
    },
    {
        href: "/dashboard/databases",
        label: "Databases",
        icon: (
            <svg className="flex-shrink-0 w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
    },
    {
        href: "/dashboard/wordpress",
        label: "WordPress",
        icon: (
            <svg className="flex-shrink-0 w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
    },
];

export default function Nav() {
    const currentPath = usePathname();

    return (
        <>
            {navItems.map(({ href, label, icon }) => (
                <a
                    key={href}
                    href={href}
                    className={
                        currentPath === href
                            ? "flex items-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                            : "flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-white hover:bg-indigo-600 rounded-lg transition-colors"
                    }
                >
                    {icon}
                    {label}
                </a>
            ))}
        </>
    );
}
