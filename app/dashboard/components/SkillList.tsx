"use client";

import { useState } from "react";
import { Edit2, Trash2, Code2 } from "lucide-react";

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
            <div className="glass-card rounded-3xl p-12 text-center border border-white/10 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#191b23] border border-white/5 flex items-center justify-center text-[#c2c6d6]">
                    <Code2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-mono">No skills found</h4>
                <p className="text-xs text-[#c2c6d6] font-mono">Add your first skill using the form</p>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white font-mono">Active Skills</h3>
                    <p className="text-xs text-[#c2c6d6] font-mono mt-1">
                        Total {skills.length} skill{skills.length !== 1 ? "s" : ""} registered
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills.map((skill) => {
                    const logoPath = skill.image.startsWith("/") ? skill.image : `/${skill.image}`;
                    return (
                        <div
                            key={skill._id}
                            className="relative glass-card rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-center gap-3 group hover:border-[#adc6ff]/40 transition-all"
                        >
                            {/* Sequence Number Badge */}
                            <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono border border-[#adc6ff]/30 text-[#adc6ff] rounded-md bg-[#10131a]/80">
                                #{skill.skill_number ?? 0}
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => onEditSkill(skill)}
                                    className="p-1.5 rounded-lg bg-[#191b23] hover:bg-[#adc6ff]/20 text-[#c2c6d6] hover:text-[#adc6ff] transition-colors cursor-pointer"
                                    title="Edit skill"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(skill._id)}
                                    disabled={deletingId === skill._id}
                                    className="p-1.5 rounded-lg bg-[#191b23] hover:bg-red-500/20 text-[#c2c6d6] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                    title="Delete skill"
                                >
                                    {deletingId === skill._id ? (
                                        <svg
                                            className="w-3.5 h-3.5 animate-spin"
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
                                        <Trash2 className="w-3.5 h-3.5" />
                                    )}
                                </button>
                            </div>

                            {/* Logo */}
                            <div className="w-14 h-14 flex items-center justify-center p-2 rounded-xl bg-[#191b23] border border-white/5 group-hover:scale-110 transition-transform mt-2">
                                <img
                                    src={logoPath}
                                    alt={skill.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Skill Name */}
                            <span className="text-white font-mono text-xs font-semibold text-center group-hover:text-[#adc6ff] transition-colors truncate max-w-full">
                                {skill.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
