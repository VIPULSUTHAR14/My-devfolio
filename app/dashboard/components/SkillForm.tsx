"use client";

import { useState, useEffect } from "react";
import { Check, Plus, Save, X, AlertCircle } from "lucide-react";

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
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white font-mono">
                    {editSkill ? "Edit Skill" : "Add New Skill"}
                </h3>
                <p className="text-xs text-[#c2c6d6] font-mono mt-1">
                    {editSkill ? "Modify skill details and order position" : "Select an icon and enter the skill details"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Skill Name & Order Number */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="skill-name"
                            className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider"
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
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="skill-number"
                            className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider"
                        >
                            Order #
                        </label>
                        <input
                            id="skill-number"
                            type="number"
                            value={skillNumber}
                            onChange={(e) => setSkillNumber(e.target.value)}
                            placeholder="1"
                            required
                            min="1"
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                </div>

                {/* Logo Picker */}
                <div className="space-y-3">
                    <label className="block text-xs font-mono text-[#c2c6d6] uppercase tracking-wider">
                        Select Icon Logo
                    </label>
                    {logos.length === 0 ? (
                        <p className="text-[#c2c6d6] text-xs font-mono">
                            Loading available logos...
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-56 overflow-y-auto pr-1">
                            {logos.map((logo) => (
                                <button
                                    key={logo.path}
                                    type="button"
                                    onClick={() => setSelectedLogo(logo.path)}
                                    className={`relative aspect-square rounded-xl border flex flex-col items-center justify-center p-2.5 transition-all cursor-pointer ${
                                        selectedLogo === logo.path
                                            ? "border-[#adc6ff] bg-[#adc6ff]/10 shadow-md shadow-[#adc6ff]/10 scale-105"
                                            : "border-white/10 bg-[#191b23] hover:border-white/20 hover:bg-[#1d2027]"
                                    }`}
                                >
                                    <img
                                        src={`/${logo.path}`}
                                        alt={logo.name}
                                        className="w-8 h-8 object-contain"
                                    />
                                    <span className="text-[10px] font-mono text-[#c2c6d6] mt-1.5 truncate w-full text-center">
                                        {logo.name}
                                    </span>
                                    {selectedLogo === logo.path && (
                                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#adc6ff] text-[#00285d] rounded-full flex items-center justify-center shadow-lg">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Feedback Banners */}
                {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>✓ Skill {editSkill ? "updated" : "added"} successfully!</span>
                    </div>
                )}

                {/* Submit & Cancel */}
                <div className="flex gap-3 pt-2">
                    <button
                        id="add-skill-submit"
                        type="submit"
                        disabled={loading || !name.trim() || !selectedLogo || !skillNumber}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-[#adc6ff] to-[#ddb7ff] text-[#00285d] font-bold text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#adc6ff]/20 flex items-center justify-center gap-2"
                    >
                        {editSkill ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        <span>{loading ? "Saving..." : editSkill ? "Update Skill" : "Add Skill"}</span>
                    </button>
                    {editSkill && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="py-3 px-5 bg-[#191b23] hover:bg-[#1d2027] text-white font-mono text-xs rounded-xl border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
