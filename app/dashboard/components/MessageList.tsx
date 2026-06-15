"use client";

import { useState } from "react";

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

    // Format date string beautifully
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

    // Filter messages based on search query
    const filteredMessages = messages.filter((msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (messages.length === 0) {
        return (
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-slate-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-1">
                    No messages yet
                </h3>
                <p className="text-sm text-slate-500">
                    Messages submitted from the website&apos;s contact form will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* List Header and Search */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Inbox Messages</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {messages.length} message{messages.length !== 1 ? "s" : ""} received
                    </p>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Search inbox..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 text-sm w-full sm:w-64 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Messages Cards */}
            {filteredMessages.length === 0 ? (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 text-center text-slate-500">
                    No messages match your search criteria.
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                        <div
                            key={msg._id}
                            className="group relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 hover:bg-slate-900/80 hover:border-slate-600/50 transition-all duration-200 shadow-md"
                        >
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                                <div>
                                    <h3 className="font-bold text-white text-base">
                                        {msg.name}
                                    </h3>
                                    <a
                                        href={`mailto:${msg.email}`}
                                        className="text-xs text-cyan-400 hover:underline transition-colors block sm:inline"
                                    >
                                        {msg.email}
                                    </a>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                    <span className="text-xs text-slate-500 font-mono">
                                        {formatDate(msg.createdAt)}
                                    </span>
                                    
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(msg._id)}
                                        disabled={deletingId === msg._id}
                                        className="sm:opacity-0 sm:group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all duration-200 disabled:opacity-50 cursor-pointer"
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
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="text-slate-300 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
