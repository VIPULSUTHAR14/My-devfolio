"use client";

import { useState } from "react";

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
                    No projects yet
                </h3>
                <p className="text-sm text-slate-500">
                    Add your first project using the form on the left
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-white">Current Projects</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {projects.length} project{projects.length !== 1 ? "s" : ""}{" "}
                        added
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="group relative flex flex-col md:flex-row gap-4 p-4 bg-slate-800/30 border border-slate-700/30 rounded-xl hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-200"
                    >
                        {/* Project Showcase Image */}
                        <div className="w-full md:w-36 aspect-video md:aspect-[4/3] rounded-lg bg-slate-800 border border-slate-700/30 overflow-hidden flex-shrink-0">
                            <img
                                src={`/${project.img1}`}
                                alt={project.project_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Project Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/50 text-cyan-400 rounded-md">
                                    {project.Project_number}
                                </span>
                                <h3 className="text-base font-bold text-white truncate">
                                    {project.project_name}
                                </h3>
                                <span className="text-[10px] text-slate-500 font-mono">
                                    {project.Project_type}
                                </span>
                                <span
                                    className={`ml-auto px-2 py-0.5 text-[10px] rounded-full font-medium ${
                                        project.Project_status === "Completed"
                                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                    }`}
                                >
                                    {project.Project_status}
                                </span>
                            </div>

                            <p className="text-xs text-slate-400 line-clamp-2">
                                {project.project_description}
                            </p>

                            {/* Tech Stack List */}
                            {project.Tech_stack && project.Tech_stack.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-1.5">
                                    {project.Tech_stack.map((tech) => (
                                        <span
                                            key={tech._id}
                                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-750 text-[10px] text-slate-300"
                                        >
                                            <img
                                                src={`/${tech.image}`}
                                                alt={tech.name}
                                                className="w-3 h-3 object-contain"
                                            />
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Links display */}
                            {(project.link_To_Live || project.Link_To_Repo) && (
                                <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
                                    {project.link_To_Live && (
                                        <a
                                            href={project.link_To_Live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-cyan-400 hover:underline transition-colors"
                                        >
                                            Live Preview
                                        </a>
                                    )}
                                    {project.Link_To_Repo && (
                                        <a
                                            href={project.Link_To_Repo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-cyan-400 hover:underline transition-colors"
                                        >
                                            GitHub Repo
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute top-2 right-2 md:relative md:top-auto md:right-auto flex items-start gap-1 flex-shrink-0 z-10">
                            <button
                                onClick={() => onEditProject(project)}
                                className="md:opacity-0 md:group-hover:opacity-100 p-2 rounded-lg hover:bg-cyan-500/10 text-slate-550 hover:text-cyan-400 transition-all duration-200 cursor-pointer"
                                title="Edit project"
                            >
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(project._id)}
                                disabled={deletingId === project._id}
                                className="md:opacity-0 md:group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 text-slate-550 hover:text-red-400 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                                title="Delete project"
                            >
                                {deletingId === project._id ? (
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
                ))}
            </div>
        </div>
    );
}
