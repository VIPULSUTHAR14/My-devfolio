"use client";

import { useState, useEffect, useCallback } from "react";
import SkillForm from "./components/SkillForm";
import SkillList from "./components/SkillList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import MessageList from "./components/MessageList";
import { Wrench, FolderKanban, Inbox } from "lucide-react";

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
        fetchSkills();
        fetchProjects();
        fetchMessages();
    }, [fetchSkills, fetchProjects, fetchMessages]);

    return (
        <div className="space-y-10">
            {/* Tab Navigation Bar */}
            <div className="inline-flex p-1.5 glass-card rounded-2xl border border-white/10 gap-2">
                <button
                    onClick={() => setActiveTab("skills")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === "skills"
                            ? "bg-[#adc6ff] text-[#00285d] shadow-lg shadow-[#adc6ff]/20"
                            : "text-[#c2c6d6] hover:text-white"
                    }`}
                >
                    <Wrench className="w-4 h-4" />
                    <span>Skills ({skills.length})</span>
                </button>
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === "projects"
                            ? "bg-[#adc6ff] text-[#00285d] shadow-lg shadow-[#adc6ff]/20"
                            : "text-[#c2c6d6] hover:text-white"
                    }`}
                >
                    <FolderKanban className="w-4 h-4" />
                    <span>Projects ({projects.length})</span>
                </button>
                <button
                    onClick={() => setActiveTab("messages")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-sm font-semibold transition-all cursor-pointer ${
                        activeTab === "messages"
                            ? "bg-[#adc6ff] text-[#00285d] shadow-lg shadow-[#adc6ff]/20"
                            : "text-[#c2c6d6] hover:text-white"
                    }`}
                >
                    <Inbox className="w-4 h-4" />
                    <span>Messages ({messages.length})</span>
                </button>
            </div>

            {/* Tab Header Title */}
            <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    {activeTab === "skills"
                        ? "Skill Management"
                        : activeTab === "projects"
                            ? "Project Management"
                            : "Inbox Messages"}
                </h2>
                <p className="text-[#c2c6d6] text-sm">
                    {activeTab === "skills"
                        ? "Add, edit, or remove technical skills displayed on your portfolio."
                        : activeTab === "projects"
                            ? "Manage your portfolio projects, tech stacks, and live demo links."
                            : "Read and manage incoming user messages submitted through your website."}
                </p>
            </div>

            {/* Skills Tab Content */}
            {activeTab === "skills" && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Skill List */}
                        <div className="lg:col-span-7">
                            {skillsLoading ? (
                                <div className="glass-card rounded-2xl p-12 flex items-center justify-center border border-white/10">
                                    <svg
                                        className="animate-spin w-8 h-8 text-[#adc6ff]"
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

                        {/* Skill Form */}
                        <div className="lg:col-span-5">
                            <SkillForm
                                onSkillAdded={handleSkillAddedOrUpdated}
                                editSkill={editingSkill}
                                onCancelEdit={() => setEditingSkill(null)}
                                nextSkillNumber={nextSkillNumber}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Projects Tab Content */}
            {activeTab === "projects" && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Project Form */}
                        <div className="lg:col-span-5">
                            <ProjectForm
                                onProjectAdded={handleProjectAddedOrUpdated}
                                skills={skills}
                                editProject={editingProject}
                                onCancelEdit={() => setEditingProject(null)}
                            />
                        </div>

                        {/* Project List */}
                        <div className="lg:col-span-7">
                            {projectsLoading ? (
                                <div className="glass-card rounded-2xl p-12 flex items-center justify-center border border-white/10">
                                    <svg
                                        className="animate-spin w-8 h-8 text-[#adc6ff]"
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
                </div>
            )}

            {/* Messages Tab Content */}
            {activeTab === "messages" && (
                <div>
                    {messagesLoading ? (
                        <div className="glass-card rounded-2xl p-12 flex items-center justify-center max-w-3xl mx-auto border border-white/10">
                            <svg
                                className="animate-spin w-8 h-8 text-[#adc6ff]"
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
