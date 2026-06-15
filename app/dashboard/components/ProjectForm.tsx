"use client";

import { useState, useEffect } from "react";

interface Skill {
    _id: string;
    name: string;
    image: string;
}

interface ProjectImage {
    name: string;
    path: string;
}

interface ProjectFormProps {
    onProjectAdded: () => void;
    skills: Skill[];
}

export default function ProjectForm({ onProjectAdded, skills }: ProjectFormProps) {
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
            const res = await fetch("/api/projects", {
                method: "POST",
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
                throw new Error(data.error || "Failed to add project");
            }

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
            setSuccess(true);
            onProjectAdded();
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add project");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <h2 className="text-xl font-bold text-white mb-1">Add New Project</h2>
            <p className="text-sm text-slate-400 mb-6">
                Enter project details and select tech stack + showcase image
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
                        ✓ Project added successfully!
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={
                        loading ||
                        !projectNumber.trim() ||
                        !projectName.trim() ||
                        !selectedImage
                    }
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-sky-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 cursor-pointer"
                >
                    {loading ? "Adding..." : "Add Project"}
                </button>
            </form>
        </div>
    );
}
