'use client';

import React, { useState } from "react";
import { ArrowUp, Mail, Copy, Check } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

export default function Footer() {
    const [copied, setCopied] = useState(false);
    const emailAddress = "vipulsuthar9351@gmail.com";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(emailAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                {/* Brand Column */}
                <div className="space-y-4 max-w-sm">
                    <div className="text-2xl font-bold font-mono text-[#adc6ff]">~/Vipul.Dev</div>
                    <p className="text-[#c2c6d6] text-sm leading-relaxed">
                        Building high-performance digital experiences with code, precision, and passion.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="https://github.com/VIPULSUTHAR14"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card rounded-xl border border-white/10 hover:border-[#adc6ff]/40 text-[#c2c6d6] hover:text-[#adc6ff] transition-colors"
                            aria-label="GitHub Profile"
                        >
                            <GithubIcon />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vipul-suthar-172028333/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 glass-card rounded-xl border border-white/10 hover:border-[#ddb7ff]/40 text-[#c2c6d6] hover:text-[#ddb7ff] transition-colors"
                            aria-label="LinkedIn Profile"
                        >
                            <LinkedinIcon />
                        </a>
                        <button
                            onClick={copyToClipboard}
                            className="p-3 glass-card rounded-xl border border-white/10 hover:border-emerald-400/40 text-[#c2c6d6] hover:text-emerald-400 transition-colors relative cursor-pointer"
                            aria-label="Copy Email"
                        >
                            <Mail className="w-5 h-5" />
                            {copied && (
                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-[#10131a] font-mono text-xs font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                    Copied!
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-16 font-mono text-sm">
                    <div className="space-y-3">
                        <h5 className="font-bold text-white uppercase tracking-wider text-xs">Navigation</h5>
                        <ul className="space-y-2 text-[#c2c6d6]">
                            <li><a href="#home" className="hover:text-[#adc6ff] transition-colors">Home</a></li>
                            <li><a href="#expertise" className="hover:text-[#adc6ff] transition-colors">Expertise</a></li>
                            <li><a href="#projects" className="hover:text-[#adc6ff] transition-colors">Projects</a></li>
                            <li><a href="#contact" className="hover:text-[#adc6ff] transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h5 className="font-bold text-white uppercase tracking-wider text-xs">Quick Copy</h5>
                        <div
                            onClick={copyToClipboard}
                            className="p-3 glass-card rounded-xl border border-white/10 flex items-center gap-2 cursor-pointer hover:border-[#adc6ff]/30 transition-colors"
                        >
                            <span className="text-xs text-[#c2c6d6] truncate max-w-[180px]">{emailAddress}</span>
                            {copied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 text-[#adc6ff] shrink-0" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs font-mono text-[#c2c6d6]">
                <div>© {new Date().getFullYear()} Vipul Suthar. Built with precision.</div>
                <button
                    onClick={scrollToTop}
                    className="flex items-center gap-2 hover:text-[#adc6ff] transition-colors mt-4 md:mt-0 cursor-pointer"
                >
                    <span>Back to top</span>
                    <ArrowUp className="w-4 h-4" />
                </button>
            </div>
        </footer>
    );
}
