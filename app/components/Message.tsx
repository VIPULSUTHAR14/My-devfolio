'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Clock, Check, AlertCircle } from "lucide-react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Message() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    message: formData.message.trim(),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send message");
            }

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                message: "",
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Contact Details */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#adc6ff] font-mono text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-[#adc6ff]"></span>
                            Get In Touch
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                            Let&apos;s Build Something Great
                        </h2>
                        <p className="text-[#c2c6d6] text-lg leading-relaxed max-w-md">
                            I&apos;m currently open for new opportunities and collaborations. Whether you have a question or just want to discuss a project, I&apos;ll try my best to get back to you!
                        </p>
                    </div>

                    {/* Quick Info Badges */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full glass-card border border-[#adc6ff]/20 flex items-center justify-center text-[#adc6ff] shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs text-[#c2c6d6] uppercase font-mono tracking-wider">Email Me</div>
                                <div className="text-white font-bold font-mono">vipulsuthar9351@gmail.com</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full glass-card border border-[#ddb7ff]/20 flex items-center justify-center text-[#ddb7ff] shrink-0">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs text-[#c2c6d6] uppercase font-mono tracking-wider">Response Time</div>
                                <div className="text-white font-bold font-mono">&lt; 24 Hours</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="glass-card rounded-[2rem] p-8 md:p-12 border border-white/10 relative">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name Field */}
                        <div className="relative floating-label-input group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder=" "
                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-[#adc6ff] pt-4 pb-2 text-white font-sans text-base transition-all peer outline-none disabled:opacity-60"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-0 top-4 text-[#c2c6d6] transition-all cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs"
                            >
                                Full Name
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className="relative floating-label-input group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                placeholder=" "
                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-[#adc6ff] pt-4 pb-2 text-white font-sans text-base transition-all peer outline-none disabled:opacity-60"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-0 top-4 text-[#c2c6d6] transition-all cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Message Field */}
                        <div className="relative floating-label-input group">
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                rows={4}
                                placeholder=" "
                                className="w-full bg-transparent border-0 border-b border-white/20 focus:ring-0 focus:border-[#adc6ff] pt-4 pb-2 text-white font-sans text-base transition-all peer resize-none outline-none disabled:opacity-60"
                            />
                            <label
                                htmlFor="message"
                                className="absolute left-0 top-4 text-[#c2c6d6] transition-all cursor-text peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs"
                            >
                                Your Message
                            </label>
                        </div>

                        {/* Error Feedback */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Success Feedback */}
                        {success && (
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                                <Check className="w-4 h-4 shrink-0" />
                                <span>✓ Message sent successfully! I will reply shortly.</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-[#adc6ff] to-[#ddb7ff] text-[#00285d] font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-[#adc6ff]/20 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Sending Message..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}