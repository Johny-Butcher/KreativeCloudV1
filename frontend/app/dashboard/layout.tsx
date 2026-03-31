import GetUser from "@/components/auth/GetUser";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/ui/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:flex md:flex-shrink-0 md:w-64 flex-col bg-white border-r border-gray-200">
                <div className="flex flex-col h-full">
                    <div className="flex items-center h-16 px-6 border-b border-gray-200 flex-shrink-0">
                        <span className="text-xl font-bold text-gray-900">KreativeCloud</span>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <Nav />
                    </nav>
                    <div className="border-t border-gray-200 px-4 py-4 flex-shrink-0">
                        <div className="flex items-center gap-3 px-2">
                            <GetUser />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Mobile top bar */}
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
                    <span className="text-lg font-bold text-gray-900">KreativeCloud</span>
                    <nav className="flex gap-1 mt-2 overflow-x-auto pb-1">
                        <Nav />
                    </nav>
                </div>
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
