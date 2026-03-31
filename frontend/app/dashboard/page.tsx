import GetSession from "@/components/auth/GetSession";

const features = [
    {
        title: "FTP Sites",
        description: "Host static HTML & PHP websites with FTP access.",
        href: "/dashboard/ftp",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
        color: "bg-blue-50 text-blue-600",
    },
    {
        title: "Databases",
        description: "Manage MySQL databases with phpMyAdmin access.",
        href: "/dashboard/databases",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
        color: "bg-indigo-50 text-indigo-600",
    },
    {
        title: "WordPress",
        description: "Create and manage WordPress installations.",
        href: "/dashboard/wordpress",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        color: "bg-purple-50 text-purple-600",
    },
];

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <GetSession />

            <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map(({ title, description, href, icon, color }) => (
                        <a
                            key={href}
                            href={href}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
                        >
                            <div className={`inline-flex p-2.5 rounded-lg mb-4 ${color}`}>
                                {icon}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{description}</p>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}