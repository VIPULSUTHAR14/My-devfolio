"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                email: email.trim().toLowerCase(),
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#10131a] text-[#e1e2ec] flex items-center justify-center px-4 relative overflow-hidden font-sans">
            {/* Background Ambient Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#adc6ff]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#ddb7ff]/10 rounded-full blur-[150px]" />
            </div>

            <div className="relative w-full max-w-md space-y-6">
                {/* Glass Card Container */}
                <div className="glass-card rounded-[2rem] p-8 md:p-10 border border-white/10 shadow-2xl relative">
                    {/* Header Icon & Title */}
                    <div className="text-center mb-8 space-y-3">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] text-[#00285d] mb-2 shadow-lg shadow-[#adc6ff]/20">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">
                            Admin Access
                        </h1>
                        <p className="text-[#c2c6d6] text-sm font-mono">
                            Sign in to manage your portfolio
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Floating Email Field */}
                        <div className="relative floating-label-input group">
                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                                disabled={loading}
                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-[#adc6ff] pt-4 pb-2 text-white font-sans text-base transition-all peer outline-none disabled:opacity-60"
                            />
                            <label
                                htmlFor="login-email"
                                className="absolute left-0 top-4 text-[#c2c6d6] transition-all cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs flex items-center gap-1.5"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                Email Address
                            </label>
                        </div>

                        {/* Floating Password Field */}
                        <div className="relative floating-label-input group">
                            <input
                                id="login-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                                disabled={loading}
                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-[#adc6ff] pt-4 pb-2 text-white font-sans text-base transition-all peer outline-none disabled:opacity-60"
                            />
                            <label
                                htmlFor="login-password"
                                className="absolute left-0 top-4 text-[#c2c6d6] transition-all cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs flex items-center gap-1.5"
                            >
                                <KeyRound className="w-3.5 h-3.5" />
                                Password
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#adc6ff] to-[#ddb7ff] text-[#00285d] font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-[#adc6ff]/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2 font-mono text-sm">
                                    <svg
                                        className="animate-spin w-4 h-4 text-[#00285d]"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            className="opacity-25"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            className="opacity-75"
                                        />
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                {/* Back to portfolio */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#c2c6d6] hover:text-[#adc6ff] transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to portfolio</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
