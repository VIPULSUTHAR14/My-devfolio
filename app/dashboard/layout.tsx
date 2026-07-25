import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ExternalLink, LogOut } from "lucide-react";

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
        <div className="min-h-screen bg-[#10131a] text-[#e1e2ec] font-sans selection:bg-[#adc6ff]/30">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#adc6ff]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ddb7ff]/5 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#10131a]/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] text-[#00285d] flex items-center justify-center shadow-lg shadow-[#adc6ff]/20">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-extrabold text-white font-mono tracking-tight">
                                ~/Vipul.Dev
                            </h1>
                            <p className="text-xs text-[#c2c6d6] font-mono">
                                Admin Dashboard
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#191b23] border border-white/10 text-xs font-mono text-[#c2c6d6]">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{session.user?.email}</span>
                        </div>

                        <Link
                            href="/"
                            target="_blank"
                            className="text-xs font-mono text-[#c2c6d6] hover:text-[#adc6ff] flex items-center gap-1.5 transition-colors"
                        >
                            <span>View Site</span>
                            <ExternalLink className="w-3.5 h-3.5" />
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
                                className="px-4 py-2 text-xs font-mono font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Sign Out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative max-w-7xl mx-auto px-6 py-10">
                {children}
            </main>
        </div>
    );
}
