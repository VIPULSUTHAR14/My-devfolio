import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Background glow effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
                <div className="max-w-[90vw] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">
                                Dashboard
                            </h1>
                            <p className="text-xs text-slate-400">
                                Portfolio Manager
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                            {session.user?.name || session.user?.email}
                        </span>
                        <Link
                            href="/"
                            className="text-xs text-slate-500 hover:text-cyan-400 transition-colors duration-200"
                        >
                            View Site →
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                const { signOut } = await import(
                                    "@/lib/auth"
                                );
                                await signOut({ redirectTo: "/login" });
                            }}
                        >
                            <button
                                type="submit"
                                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/30 rounded-lg transition-all duration-200 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-[90vw] mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
