"use client";

import { useState, useEffect } from "react";
import { Plus, Save, X, Check, AlertCircle } from "lucide-react";

interface Skill {
    _id: string;
    name: string;
    image: string;
    skill_number?: number;
    createdAt?: string;
}

interface ProjectImage {
    name: string;
    path: string;
}

interface Project {
    _id: string;
    Project_number: string;
    project_name: string;
    Project_status: string;
    Project_type: string;
    project_description: string;
    Tech_stack: Skill[];
    img1: string;
    link_To_Live?: string;
    Link_To_Repo?: string;
}

interface ProjectFormProps {
    onProjectAdded: () => void;
    skills: Skill[];
    editProject: Project | null;
    onCancelEdit: () => void;
}

export default function ProjectForm({ onProjectAdded, skills, editProject, onCancelEdit }: ProjectFormProps) {
    const [projectNumber, setProjectNumber] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectStatus, setProjectStatus] = useState("Completed");
    const [projectType, setProjectType] = useState("Full Stack Project");
    const [projectDescription, setProjectDescription] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [linkToLive, setLinkToLive] = useState("");
    const [linkToRepo, setLinkToRepo] = useState("");

    const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch("/api/project-images")
            .then((res) => res.json())
            .then((data) => setProjectImages(data))
            .catch(() => setError("Failed to load project images"));
    }, []);

    useEffect(() => {
        if (editProject) {
            setProjectNumber(editProject.Project_number);
            setProjectName(editProject.project_name);
            setProjectStatus(editProject.Project_status);
            setProjectType(editProject.Project_type);
            setProjectDescription(editProject.project_description);
            setSelectedSkills(editProject.Tech_stack.map((s) => s._id));
            setSelectedImage(editProject.img1);
            setLinkToLive(editProject.link_To_Live || "");
            setLinkToRepo(editProject.Link_To_Repo || "");
        } else {
            setProjectNumber("");
            setProjectName("");
            setProjectStatus("Completed");
            setProjectType("Full Stack Project");
            setProjectDescription("");
            setSelectedSkills([]);
            setSelectedImage("");
            setLinkToLive("");
            setLinkToRepo("");
        }
    }, [editProject]);

    const toggleSkill = (skillId: string) => {
        setSelectedSkills((prev) =>
            prev.includes(skillId)
                ? prev.filter((id) => id !== skillId)
                : [...prev, skillId]
        );
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (
            !projectNumber.trim() ||
            !projectName.trim() ||
            !projectStatus.trim() ||
            !projectType.trim() ||
            !projectDescription.trim() ||
            !selectedImage
        ) {
            setError("Please fill in all required fields and select a showcase image.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const url = editProject ? `/api/projects/${editProject._id}` : "/api/projects";
            const method = editProject ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Project_number: projectNumber.trim(),
                    project_name: projectName.trim(),
                    Project_status: projectStatus.trim(),
                    Project_type: projectType.trim(),
                    project_description: projectDescription.trim(),
                    Tech_stack: selectedSkills,
                    img1: selectedImage,
                    link_To_Live: linkToLive.trim(),
                    Link_To_Repo: linkToRepo.trim(),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to ${editProject ? "update" : "add"} project`);
            }

            if (!editProject) {
                setProjectNumber("");
                setProjectName("");
                setProjectStatus("Completed");
                setProjectType("Full Stack Project");
                setProjectDescription("");
                setSelectedSkills([]);
                setSelectedImage("");
                setLinkToLive("");
                setLinkToRepo("");
            }
            setSuccess(true);
            onProjectAdded();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : `Failed to ${editProject ? "update" : "add"} project`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
                <h3 className="text-xl font-bold text-white font-mono">
                    {editProject ? "Edit Project" : "Add New Project"}
                </h3>
                <p className="text-xs text-[#c2c6d6] font-mono mt-1">
                    {editProject ? "Modify project details and live links" : "Enter project details, select tech stack and preview image"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Number & Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            Number
                        </label>
                        <input
                            type="text"
                            value={projectNumber}
                            onChange={(e) => setProjectNumber(e.target.value)}
                            placeholder="e.g. 01"
                            required
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            Project Name
                        </label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. MasterFlow AI"
                            required
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                </div>

                {/* Status & Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            Status
                        </label>
                        <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Beta">Beta</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            Project Type
                        </label>
                        <input
                            type="text"
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            placeholder="Full Stack Project"
                            required
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                        Description
                    </label>
                    <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Explain project architecture and features..."
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors resize-none"
                    />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            Live Demo URL
                        </label>
                        <input
                            type="url"
                            value={linkToLive}
                            onChange={(e) => setLinkToLive(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-[#c2c6d6] mb-2 uppercase tracking-wider">
                            GitHub Repo URL
                        </label>
                        <input
                            type="url"
                            value={linkToRepo}
                            onChange={(e) => setLinkToRepo(e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-3 bg-[#191b23] border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#adc6ff] transition-colors"
                        />
                    </div>
                </div>

                {/* Tech Stack Selector */}
                <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#c2c6d6] uppercase tracking-wider">
                        Select Tech Stack
                    </label>
                    <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-3 bg-[#191b23] rounded-xl border border-white/10">
                        {skills.map((skill) => {
                            const isSelected = selectedSkills.includes(skill._id);
                            return (
                                <button
                                    key={skill._id}
                                    type="button"
                                    onClick={() => toggleSkill(skill._id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                                        isSelected
                                            ? "bg-[#adc6ff] text-[#00285d] border-[#adc6ff]"
                                            : "bg-[#10131a] text-[#c2c6d6] border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {isSelected ? "✓ " : "+ "}
                                    {skill.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Showcase Image Selector */}
                <div className="space-y-2">
                    <label className="block text-xs font-mono text-[#c2c6d6] uppercase tracking-wider">
                        Select Showcase Image
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                        {projectImages.map((img) => {
                            const imagePath = img.path.startsWith("/") ? img.path : `/${img.path}`;
                            const isSelected = selectedImage === imagePath;
                            return (
                                <button
                                    key={img.path}
                                    type="button"
                                    onClick={() => setSelectedImage(imagePath)}
                                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                        isSelected
                                            ? "border-[#adc6ff] shadow-md shadow-[#adc6ff]/20 scale-105"
                                            : "border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    <img
                                        src={imagePath}
                                        alt={img.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {isSelected && (
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#adc6ff] text-[#00285d] rounded-full flex items-center justify-center shadow-lg">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Feedback */}
                {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
                {success && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" />
                        <span>✓ Project {editProject ? "updated" : "added"} successfully!</span>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-[#adc6ff] to-[#ddb7ff] text-[#00285d] font-bold text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#adc6ff]/20 flex items-center justify-center gap-2"
                    >
                        {editProject ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        <span>{loading ? "Saving..." : editProject ? "Update Project" : "Add Project"}</span>
                    </button>
                    {editProject && (
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
