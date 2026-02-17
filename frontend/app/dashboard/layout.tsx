import GetUser from "@/components/auth/GetUser";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/ui/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex flex-1 bg-gray-50">
                <div className="hidden md:flex md:w-64 md:flex-col h-screen">
                    <div className="flex flex-col  flex-grow pt-5 overflow-y-auto bg-white">
                        <div className="flex justify-center items-center flex-shrink-0 px-4">
                            <h1 className=" text-2xl"><b>KreativeCloudV1</b></h1>
                        </div>

                        <div className="px-4 mt-3">
                            <hr className="border-gray-200" />
                        </div>

                        <div className="flex flex-col flex-1 px-3 mt-6">
                            <div className="space-y-4">
                                <nav className="flex-1 space-y-2">
                                    <Nav />
                                </nav>

                                <hr className="border-gray-200" />

                                {/* <nav className="flex-1 space-y-2">
                                    <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                        </svg>
                                        Products
                                    </a>

                                    <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        Orders
                                    </a>

                                    <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        Analytics
                                        <svg className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </a>
                                </nav>

                                <hr className="border-gray-200" />

                                <nav className="flex-1 space-y-2">
                                    <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-white rounded-lg hover:bg-indigo-600 group">
                                        <svg className="flex-shrink-0 w-5 h-5 mr-4 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </a>
                                </nav> */}
                            </div>

                            <div className="pb-4 mt-20">
                                <button type="button" className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100">
                                    <GetUser />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <main>
                        <div className="md:py-6 w-full ">
                            <div className=" md:hidden m-4">
                                <Nav />
                            </div>
                            <div className="px-4 flex flex-col justify-between mx-auto max-w-7xl sm:px-6 md:px-8">
                                {children}
                                <Footer />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}