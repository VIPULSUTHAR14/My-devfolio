"use client";

import { useState } from "react";

interface Skill {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
}

export default function SkillList({
    skills,
    onSkillDeleted,
}: {
    skills: Skill[];
    onSkillDeleted: () => void;
}) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setDeletingId(id);
        try {
            const res = await fetch(`/api/skills/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete");
            }

            onSkillDeleted();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null);
        }
    }

    if (skills.length === 0) {
        return (
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 text-center">
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
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-1">
                    No skills yet
                </h3>
                <p className="text-sm text-slate-500">
                    Add your first skill using the form above
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 w-full">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-2xl font-bold text-white font-mono">
                        Skills
                    </h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {skills.length} skill{skills.length !== 1 ? "s" : ""}{" "}
                        added
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {skills.map((skill) => (

                    <div
                        key={skill._id}
                        className=" bg-slate-800 group flex flex-col w-48  pb-10 justify-center items-center align-top border-b-2 rounded-2xl"
                    >

                        <button
                            onClick={() => handleDelete(skill._id)}
                            disabled={deletingId === skill._id}
                            className="   opacity-0 relative left-20 bottom-[-10px] group-hover:opacity-100  rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all duration-200 flex-shrink-0 disabled:opacity-50 cursor-pointer"
                            title="Delete skill"
                        >
                            {deletingId === skill._id ? (
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
                                    className="size-6"
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
                        {/* Logo */}
                        <div className="flex flex-col justify-between items-center align-middle space-y-3" >
                            <div className=" rounded-lg   flex items-center justify-center flex-shrink-0">
                                <img
                                    src={`/${skill.image}`}
                                    alt={skill.name}
                                    className="w-30 "
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-lg font-mono font-bold text-white truncate">
                                    {skill.name}
                                </p>
                                {/* <p className="text-xs text-slate-500 truncate">
                                {skill.image}
                            </p> */}
                            </div>
                        </div>

                        {/* Delete */}

                    </div>
                ))}
            </div>
        </div>
    );
}
