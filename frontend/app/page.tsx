import { SignIn } from "@/components/auth/SignIn";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 lg:grid lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">KreativeCloud</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Your all-in-one<br />hosting platform.
          </h1>
          <p className="mt-4 text-indigo-200 leading-relaxed max-w-sm">
            Deploy static sites via FTP, spin up WordPress installations, and manage MySQL databases — all from one place.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {[
              { label: "Static HTML & PHP site hosting", icon: "M5 12h14M12 5l7 7-7 7" },
              { label: "WordPress one-click installs", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
              { label: "MySQL database management", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <span className="text-indigo-100 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-indigo-400 text-xs">© {new Date().getFullYear()} KreativeCloud. All rights reserved.</p>
      </div>

      {/* Right panel – sign-in form */}
      <div className="flex items-center justify-center px-6 py-12 bg-white lg:rounded-l-3xl">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className="text-gray-900 font-semibold text-lg">KreativeCloud</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-1 text-sm text-gray-500 mb-8">Sign in to access your hosting dashboard.</p>

          <SignIn />

          <p className="mt-6 text-xs text-center text-gray-400">
            By signing in, you agree to our{' '}
            <a href="/Terms" className="text-indigo-600 hover:underline">Terms &amp; Conditions</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
