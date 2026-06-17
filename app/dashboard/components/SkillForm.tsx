"use client";

import { useState, useEffect } from "react";

interface Logo {
    name: string;
    path: string;
}

interface Skill {
    _id: string;
    name: string;
    image: string;
    skill_number?: number;
    createdAt?: string;
}

interface SkillFormProps {
    onSkillAdded: () => void;
    editSkill: Skill | null;
    onCancelEdit: () => void;
    nextSkillNumber: number;
}

export default function SkillForm({
    onSkillAdded,
    editSkill,
    onCancelEdit,
    nextSkillNumber,
}: SkillFormProps) {
    const [name, setName] = useState("");
    const [selectedLogo, setSelectedLogo] = useState("");
    const [skillNumber, setSkillNumber] = useState("");
    const [logos, setLogos] = useState<Logo[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/logos")
            .then((res) => res.json())
            .then((data) => setLogos(data))
            .catch(() => setError("Failed to load logos"));
    }, []);

    useEffect(() => {
        if (editSkill) {
            setName(editSkill.name);
            setSelectedLogo(editSkill.image);
            setSkillNumber(editSkill.skill_number !== undefined ? editSkill.skill_number.toString() : "");
        } else {
            setName("");
            setSelectedLogo("");
            setSkillNumber(nextSkillNumber.toString());
        }
    }, [editSkill, nextSkillNumber]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || !selectedLogo || !skillNumber) return;

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const url = editSkill ? `/api/skills/${editSkill._id}` : "/api/skills";
            const method = editSkill ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    image: selectedLogo,
                    skill_number: Number(skillNumber),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to ${editSkill ? "update" : "add"} skill`);
            }

            if (!editSkill) {
                setName("");
                setSelectedLogo("");
                setSkillNumber("");
            }
            setSuccess(true);
            onSkillAdded();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to ${editSkill ? "update" : "add"} skill`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 w-full">
            <h2 className="text-xl font-bold text-white mb-1">
                {editSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
                {editSkill ? "Modify skill details and order position" : "Select a logo and enter the skill name"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Skill Name & Order Number */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="skill-name"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Skill Name
                        </label>
                        <input
                            id="skill-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. React, Node.js"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="skill-number"
                            className="block text-sm font-medium text-slate-300 mb-2"
                        >
                            Order Number
                        </label>
                        <input
                            id="skill-number"
                            type="number"
                            value={skillNumber}
                            onChange={(e) => setSkillNumber(e.target.value)}
                            placeholder="e.g. 1"
                            required
                            min="1"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Logo Picker */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                        Select Logo
                    </label>
                    {logos.length === 0 ? (
                        <p className="text-slate-500 text-sm">
                            Loading logos...
                        </p>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                            {logos.map((logo) => (
                                <button
                                    key={logo.path}
                                    type="button"
                                    onClick={() => setSelectedLogo(logo.path)}
                                    className={`group relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-3 transition-all duration-200 cursor-pointer ${selectedLogo === logo.path
                                        ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 scale-105"
                                        : "border-slate-700/50 bg-slate-800/30 hover:border-slate-500/50 hover:bg-slate-800/50"
                                        }`}
                                >
                                    <img
                                        src={`/${logo.path}`}
                                        alt={logo.name}
                                        className="size-20 object-contain"
                                    />
                                    <span className="text-lg font-mono  text-white mt-1.5 truncate w-full text-center group-hover:text-slate-300 transition-colors">
                                        {logo.name}
                                    </span>
                                    {selectedLogo === logo.path && (
                                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-[fadeIn_0.15s_ease-out]">
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Feedback */}
                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm animate-[fadeIn_0.2s_ease-out]">
                        ✓ Skill {editSkill ? "updated" : "added"} successfully!
                    </div>
                )}

                {/* Submit & Cancel */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        id="add-skill-submit"
                        type="submit"
                        disabled={loading || !name.trim() || !selectedLogo || !skillNumber}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 cursor-pointer"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin w-5 h-5"
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
                                {editSkill ? "Updating..." : "Adding..."}
                            </span>
                        ) : (
                            editSkill ? "Update Skill" : "Add Skill"
                        )}
                    </button>
                    {editSkill && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-slate-500/50 transition-all duration-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
