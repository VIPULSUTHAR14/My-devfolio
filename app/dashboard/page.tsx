"use client";

import { useState, useEffect, useCallback } from "react";
import SkillForm from "./components/SkillForm";
import SkillList from "./components/SkillList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import MessageList from "./components/MessageList";

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

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<"skills" | "projects" | "messages">("skills");
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [skillsLoading, setSkillsLoading] = useState(true);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(true);

    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleSkillAddedOrUpdated = () => {
        fetchSkills();
        setEditingSkill(null);
    };

    const handleProjectAddedOrUpdated = () => {
        fetchProjects();
        setEditingProject(null);
    };

    const nextSkillNumber = skills.length > 0
        ? Math.max(...skills.map(s => s.skill_number || 0)) + 1
        : 1;

    const fetchSkills = useCallback(async () => {
        try {
            const res = await fetch("/api/skills");
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        } finally {
            setSkillsLoading(false);
        }
    }, []);

    const fetchProjects = useCallback(async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setProjectsLoading(false);
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        } finally {
            setMessagesLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSkills();
        fetchProjects();
        fetchMessages();
    }, [fetchSkills, fetchProjects, fetchMessages]);

    return (
        <div className="space-y-6 ">
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-800/80 mb-6">
                <button
                    onClick={() => setActiveTab("skills")}
                    className={`px-6 py-3 font-semibold text-sm transition-all duration-200 border-b-2 cursor-pointer ${activeTab === "skills"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                >
                    Skills
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`px-6 py-3 font-semibold text-sm transition-all duration-200 border-b-2 cursor-pointer ${activeTab === "projects"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                >
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`px-6 py-3 font-semibold text-sm transition-all duration-200 border-b-2 cursor-pointer ${activeTab === "messages"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                >
                    Messages
                </button>
            </div>

            {/* Tab Content Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">
                    {activeTab === "skills"
                        ? "Skill Management"
                        : activeTab === "projects"
                            ? "Project Management"
                            : "Inbox Messages"}
                </h1>
                <p className="text-slate-400 mt-1">
                    {activeTab === "skills"
                        ? "Add and manage the skills displayed on your portfolio"
                        : activeTab === "projects"
                            ? "Add and manage the projects displayed on your portfolio"
                            : "View and manage user messages sent from your portfolio website"}
                </p>
            </div>

            {/* Tab Content Components */}
            {activeTab === "skills" && (
                <div className="flex flex-col gap-8">
                    {/* Form — takes 2 cols */}
                    {/* <div className="lg:col-span-2">
                        <SkillForm onSkillAdded={fetchSkills} />
                    </div> */}

                    {/* List — takes 3 cols */}
                    <div className="lg:col-span-3">
                        {skillsLoading ? (
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 flex items-center justify-center">
                                <svg
                                    className="animate-spin w-8 h-8 text-cyan-500"
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
                            </div>
                        ) : (
                            <SkillList
                                skills={skills}
                                onSkillDeleted={fetchSkills}
                                onEditSkill={setEditingSkill}
                            />
                        )}
                    </div>
                    <div className="lg:col-span-2">
                        <SkillForm
                            onSkillAdded={handleSkillAddedOrUpdated}
                            editSkill={editingSkill}
                            onCancelEdit={() => setEditingSkill(null)}
                            nextSkillNumber={nextSkillNumber}
                        />
                    </div>
                </div>
            )}

            {activeTab === "projects" && (
                <div className="flex flex-col gap-8">
                    {/* Form — takes 2 cols */}
                    <div className="lg:col-span-2">
                        <ProjectForm
                            onProjectAdded={handleProjectAddedOrUpdated}
                            skills={skills}
                            editProject={editingProject}
                            onCancelEdit={() => setEditingProject(null)}
                        />
                    </div>

                    {/* List — takes 3 cols */}
                    <div className="lg:col-span-3">
                        {projectsLoading ? (
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 flex items-center justify-center">
                                <svg
                                    className="animate-spin w-8 h-8 text-cyan-500"
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
                            </div>
                        ) : (
                            <ProjectList
                                projects={projects}
                                onProjectDeleted={fetchProjects}
                                onEditProject={setEditingProject}
                            />
                        )}
                    </div>
                </div>
            )}

            {activeTab === "messages" && (
                <div>
                    {messagesLoading ? (
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 rounded-2xl p-8 flex items-center justify-center max-w-3xl mx-auto">
                            <svg
                                className="animate-spin w-8 h-8 text-cyan-500"
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
                        </div>
                    ) : (
                        <MessageList
                            messages={messages}
                            onMessageDeleted={fetchMessages}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
