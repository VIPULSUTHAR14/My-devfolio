"use client";

import { useState, useEffect } from "react";

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
            setError("Please fill in all required fields and select an image.");
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
                // Reset form
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
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-white mb-1">
                {editProject ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
                {editProject ? "Modify project details and update its content" : "Enter project details and select tech stack + showcase image"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Number & Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Number
                        </label>
                        <input
                            type="text"
                            value={projectNumber}
                            onChange={(e) => setProjectNumber(e.target.value)}
                            placeholder="e.g. 01"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Project Name
                        </label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. Care Connect"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Status & Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Status
                        </label>
                        <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Project Type
                        </label>
                        <input
                            type="text"
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            placeholder="e.g. Full Stack Project"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description
                    </label>
                    <textarea
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Explain what problem this project solved..."
                        required
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 resize-none"
                    />
                </div>

                {/* Live Link & Repo Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Live Preview URL
                        </label>
                        <input
                            type="url"
                            value={linkToLive}
                            onChange={(e) => setLinkToLive(e.target.value)}
                            placeholder="https://live-app.com"
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            GitHub Repo URL
                        </label>
                        <input
                            type="url"
                            value={linkToRepo}
                            onChange={(e) => setLinkToRepo(e.target.value)}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Tech Stack Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                        Select Tech Stack (from Skills)
                    </label>
                    {skills.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">
                            No skills created yet. Please create skills first to add them here.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 bg-slate-800/20 rounded-xl border border-slate-800">
                            {skills.map((skill) => (
                                <button
                                    key={skill._id}
                                    type="button"
                                    onClick={() => toggleSkill(skill._id)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer ${
                                        selectedSkills.includes(skill._id)
                                            ? "border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-md shadow-cyan-500/5"
                                            : "border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-750 hover:bg-slate-800/80"
                                    }`}
                                >
                                    <img
                                        src={`/${skill.image}`}
                                        alt={skill.name}
                                        className="w-4 h-4 object-contain"
                                    />
                                    {skill.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Project Showcase Image Picker */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                        Select Showcase Image
                    </label>
                    {projectImages.length === 0 ? (
                        <p className="text-slate-500 text-sm italic">
                            No project images found in public/Project_Images/
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1 bg-slate-800/20 rounded-xl border border-slate-800">
                            {projectImages.map((img) => (
                                <button
                                    key={img.path}
                                    type="button"
                                    onClick={() => setSelectedImage(img.path)}
                                    className={`group relative rounded-lg border overflow-hidden transition-all duration-250 aspect-video cursor-pointer ${
                                        selectedImage === img.path
                                            ? "border-cyan-400 ring-2 ring-cyan-400/30 scale-[1.02] shadow-lg shadow-cyan-500/10"
                                            : "border-slate-800 bg-slate-800/10 hover:border-slate-600"
                                    }`}
                                >
                                    <img
                                        src={`/${img.path}`}
                                        alt={img.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 px-2 py-1 text-center">
                                        <span className="text-[9px] text-slate-300 truncate block">
                                            {img.name}
                                        </span>
                                    </div>
                                    {selectedImage === img.path && (
                                        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
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
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                        ✓ Project {editProject ? "updated" : "added"} successfully!
                    </div>
                )}

                {/* Submit & Cancel Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !projectNumber.trim() ||
                            !projectName.trim() ||
                            !selectedImage
                        }
                        className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 cursor-pointer"
                    >
                        {loading ? (editProject ? "Updating..." : "Adding...") : (editProject ? "Update Project" : "Add Project")}
                    </button>
                    {editProject && (
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
