"use client";

import { useState } from "react";

interface Skill {
    _id: string;
    name: string;
    image: string;
    skill_number?: number;
    createdAt?: string;
}

export default function SkillList({
    skills,
    onSkillDeleted,
    onEditSkill,
}: {
    skills: Skill[];
    onSkillDeleted: () => void;
    onEditSkill: (skill: Skill) => void;
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
                        className="relative bg-slate-800 group flex flex-col w-48 pb-10 justify-center items-center align-top border-b-2 rounded-2xl"
                    >
                        {/* Number Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono border border-cyan-500/30 text-cyan-400 rounded-md bg-slate-950/40">
                            #{skill.skill_number ?? 0}
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            <button
                                onClick={() => onEditSkill(skill)}
                                className="p-1 rounded-lg hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                                title="Edit skill"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(skill._id)}
                                disabled={deletingId === skill._id}
                                className="p-1 rounded-lg hover:bg-red-500/10 text-slate-450 hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                title="Delete skill"
                            >
                                {deletingId === skill._id ? (
                                    <svg
                                        className="w-5 h-5 animate-spin"
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
                                        className="w-5 h-5"
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
