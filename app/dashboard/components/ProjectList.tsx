"use client";

import { useState } from "react";
import { Edit2, Trash2, FolderKanban, ExternalLink, Code } from "lucide-react";

interface Skill {
    _id: string;
    name: string;
    image: string;
    skill_number?: number;
    createdAt?: string;
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

interface ProjectListProps {
    projects: Project[];
    onProjectDeleted: () => void;
    onEditProject: (project: Project) => void;
}

export default function ProjectList({ projects, onProjectDeleted, onEditProject }: ProjectListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this project?")) return;

        setDeletingId(id);
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete project");
            }

            onProjectDeleted();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null);
        }
    }

    if (projects.length === 0) {
        return (
            <div className="glass-card rounded-3xl p-12 text-center border border-white/10 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#191b23] border border-white/5 flex items-center justify-center text-[#c2c6d6]">
                    <FolderKanban className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-mono">No projects found</h4>
                <p className="text-xs text-[#c2c6d6] font-mono">Add your first project using the form on the left</p>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-xl space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-white font-mono">Project Catalog</h3>
                    <p className="text-xs text-[#c2c6d6] font-mono mt-1">
                        Total {projects.length} project{projects.length !== 1 ? "s" : ""} active
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {projects.map((project) => {
                    const imgPath = project.img1.startsWith("/") ? project.img1 : `/${project.img1}`;
                    return (
                        <div
                            key={project._id}
                            className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row gap-5 items-start group hover:border-[#adc6ff]/30 transition-all relative"
                        >
                            {/* Image Preview */}
                            <div className="w-full md:w-44 aspect-video rounded-xl overflow-hidden bg-[#191b23] border border-white/5 shrink-0">
                                <img
                                    src={imgPath}
                                    alt={project.project_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-2 w-full">
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 text-[10px] font-mono border border-[#adc6ff]/30 text-[#adc6ff] rounded-md bg-[#10131a]">
                                            #{project.Project_number}
                                        </span>
                                        <h4 className="text-lg font-bold text-white font-mono">
                                            {project.project_name}
                                        </h4>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-full bg-[#191b23] text-[#c2c6d6] border border-white/10">
                                            {project.Project_status}
                                        </span>
                                        <button
                                            onClick={() => onEditProject(project)}
                                            className="p-1.5 rounded-lg bg-[#191b23] hover:bg-[#adc6ff]/20 text-[#c2c6d6] hover:text-[#adc6ff] transition-colors cursor-pointer"
                                            title="Edit project"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project._id)}
                                            disabled={deletingId === project._id}
                                            className="p-1.5 rounded-lg bg-[#191b23] hover:bg-red-500/20 text-[#c2c6d6] hover:text-red-400 transition-colors disabled:opacity-50 cursor-pointer"
                                            title="Delete project"
                                        >
                                            {deletingId === project._id ? (
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
                                </div>

                                <p className="text-xs text-[#c2c6d6] line-clamp-2 leading-relaxed font-sans">
                                    {project.project_description}
                                </p>

                                {/* Tech Stack Tags */}
                                {project.Tech_stack && project.Tech_stack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {project.Tech_stack.map((tech) => (
                                            <span
                                                key={tech._id}
                                                className="px-2 py-0.5 bg-[#191b23] border border-white/5 rounded text-[10px] font-mono text-[#adc6ff]"
                                            >
                                                #{tech.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Links */}
                                <div className="flex gap-4 pt-2 text-xs font-mono">
                                    {project.link_To_Live && (
                                        <a
                                            href={project.link_To_Live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#adc6ff] hover:underline flex items-center gap-1"
                                        >
                                            <span>Live Preview</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                    {project.Link_To_Repo && (
                                        <a
                                            href={project.Link_To_Repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#c2c6d6] hover:text-white flex items-center gap-1"
                                        >
                                            <span>Repository</span>
                                            <Code className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
