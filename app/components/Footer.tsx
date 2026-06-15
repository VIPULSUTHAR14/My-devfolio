'use client';

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUp } from "lucide-react";

// Custom SVG components for GitHub and LinkedIn to bypass missing export issue in lucide-react v1.17.0
const GithubIcon = ({ className = "size-5" }: { className?: string }) => (
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

const LinkedinIcon = ({ className = "size-5" }: { className?: string }) => (
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
    const emailAddress = "vipulsuthar@example.com"; // Placeholder email - user can update later

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
        <footer className="w-full bg-slate-950 border-t border-white/10 text-slate-300 py-16 px-6 md:px-20 lg:px-32" >
            <div className="max-w-7xl mx-auto flex flex-col space-y-12">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Left Column: Brand & Socials */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-3xl font-extrabold text-white tracking-tight" >
                                ~/Vipul.Dev
                            </p>
                            <p className="text-slate-400 mt-3 font-mono text-sm leading-relaxed max-w-sm">
                                Fresher Full-Stack Engineer crafting scalable digital experiences, high-performance web applications, and elegant user interfaces.
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/VIPULSUTHAR14"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-900 border border-white/10 rounded-full hover:bg-slate-800 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 ease-in-out group"
                                aria-label="GitHub Profile"
                            >
                                <GithubIcon className="size-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/vipul-suthar-172028333/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-900 border border-white/10 rounded-full hover:bg-slate-800 hover:text-blue-400 hover:border-blue-400/40 transition-all duration-300 ease-in-out group"
                                aria-label="LinkedIn Profile"
                            >
                                <LinkedinIcon className="size-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <button
                                onClick={copyToClipboard}
                                className="p-3 bg-slate-900 border border-white/10 rounded-full hover:bg-slate-800 hover:text-emerald-400 hover:border-emerald-400/40 transition-all duration-300 ease-in-out group relative cursor-pointer"
                                aria-label="Copy Email"
                            >
                                <Mail className="size-5 group-hover:scale-110 transition-transform" />
                                {copied && (
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-mono text-xs font-bold py-1 px-2.5 rounded shadow-lg animate-bounce whitespace-nowrap">
                                        Copied!
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Middle Column: Section Links */}
                    <div className="space-y-4">
                        <p className="text-lg font-mono font-bold text-white tracking-wider uppercase">
                            Navigation
                        </p>
                        <ul className="space-y-3 font-mono text-sm">
                            <li>
                                <a
                                    href="#home"
                                    className="text-slate-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 ease-in-out block"
                                >
                                    &gt; Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#skills"
                                    className="text-slate-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 ease-in-out block"
                                >
                                    &gt; Skill
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    className="text-slate-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 ease-in-out block"
                                >
                                    &gt; Project
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-slate-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 ease-in-out block"
                                >
                                    &gt; Contect
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: Click to Copy Box */}
                    <div className="space-y-4">
                        <p className="text-lg font-mono font-bold text-white tracking-wider uppercase">
                            Copy Email
                        </p>
                        <p className="text-slate-400 font-mono text-sm">
                            Click below to copy the developer email address directly to your clipboard.
                        </p>
                        <div
                            onClick={copyToClipboard}
                            className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/10 rounded-xl cursor-pointer hover:bg-slate-800 hover:border-cyan-500/30 group transition-all duration-300"
                        >
                            <span className="font-mono text-sm text-slate-300 group-hover:text-white truncate pr-2">
                                {emailAddress}
                            </span>
                            <div className="flex items-center justify-center size-8 rounded-lg bg-slate-800 border border-white/5 group-hover:border-cyan-500/30 text-slate-400 group-hover:text-cyan-400 transition-all duration-300 shrink-0">
                                {copied ? (
                                    <Check className="size-4 text-emerald-400" />
                                ) : (
                                    <Copy className="size-4" />
                                )}
                            </div>
                        </div>
                        {copied && (
                            <p className="text-xs font-mono text-emerald-400 animate-pulse">
                                ✓ Email successfully copied to clipboard!
                            </p>
                        )}
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-mono text-slate-500">
                    <p>© {new Date().getFullYear()} Vipul Suthar. All rights reserved.</p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-white/5 rounded-lg text-slate-400 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
                    >
                        <span>Back to Top</span>
                        <ArrowUp className="size-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

            </div>
        </footer>
    );
}
