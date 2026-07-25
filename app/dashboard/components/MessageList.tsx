"use client";

import { useState } from "react";
import { Mail, Trash2, Search, Calendar, User, Reply } from "lucide-react";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

interface MessageListProps {
    messages: Message[];
    onMessageDeleted: () => void;
}

export default function MessageList({ messages, onMessageDeleted }: MessageListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this message?")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete message");
            }

            onMessageDeleted();
        } catch (error) {
            console.error("Failed to delete message:", error);
        } finally {
            setDeletingId(null);
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const filteredMessages = messages.filter((msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (messages.length === 0) {
        return (
            <div className="glass-card rounded-3xl p-12 text-center max-w-3xl mx-auto border border-white/10 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#191b23] border border-white/5 flex items-center justify-center text-[#c2c6d6]">
                    <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-mono">No messages yet</h4>
                <p className="text-xs text-[#c2c6d6] font-mono">Messages sent via the portfolio contact form will appear here</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header & Search */}
            <div className="glass-card rounded-3xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white font-mono">Inbox Messages</h3>
                    <p className="text-xs text-[#c2c6d6] font-mono mt-1">
                        Total {messages.length} message{messages.length !== 1 ? "s" : ""} received
                    </p>
                </div>

                <div className="relative">
                    <Search className="w-4 h-4 text-[#c2c6d6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2.5 text-xs font-mono w-full sm:w-64 bg-[#191b23] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#adc6ff] transition-colors"
                    />
                </div>
            </div>

            {/* Message List Cards */}
            {filteredMessages.length === 0 ? (
                <div className="glass-card rounded-3xl p-8 text-center text-xs font-mono text-[#c2c6d6] border border-white/10">
                    No messages match your search filter.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                        <div
                            key={msg._id}
                            className="glass-card rounded-3xl p-6 border border-white/10 hover:border-[#adc6ff]/30 transition-all space-y-4 group relative"
                        >
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#adc6ff] flex items-center justify-center font-bold font-mono text-sm shrink-0">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white font-mono text-base">
                                            {msg.name}
                                        </h4>
                                        <a
                                            href={`mailto:${msg.email}`}
                                            className="text-xs font-mono text-[#adc6ff] hover:underline transition-colors flex items-center gap-1 mt-0.5"
                                        >
                                            <span>{msg.email}</span>
                                            <Reply className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#c2c6d6]">
                                        <Calendar className="w-3.5 h-3.5 text-[#c2c6d6]" />
                                        <span>{formatDate(msg.createdAt)}</span>
                                    </div>

                                    {/* Delete Action */}
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        disabled={deletingId === msg._id}
                                        className="p-2 rounded-xl bg-[#191b23] hover:bg-red-500/20 text-[#c2c6d6] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                        title="Delete message"
                                    >
                                        {deletingId === msg._id ? (
                                            <svg
                                                className="w-4 h-4 animate-spin"
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
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Message Body */}
                            <p className="text-sm text-[#e1e2ec] leading-relaxed whitespace-pre-wrap font-sans">
                                {msg.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
