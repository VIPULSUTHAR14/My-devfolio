import { Database } from "@/lib/database";
import ProjectModel from "@/lib/models/Project";
import "@/lib/models/Skill"; // Ensure Skill schema is registered for populate

interface PopulatedSkill {
    name: string;
    image: string;
}

interface LeanProject {
    _id: { toString(): string };
    Project_number: string;
    project_name: string;
    Project_status: string;
    Project_type: string;
    project_description: string;
    Tech_stack?: PopulatedSkill[];
    img1: string;
    link_To_Live?: string;
    Link_To_Repo?: string;
}

export default async function Project() {
    await Database();
    const dbProjects = await ProjectModel.find()
        .populate("Tech_stack")
        .sort({ Project_number: 1 })
        .lean();

    const projects = (dbProjects as unknown as LeanProject[]).map((proj) => ({
        id: proj._id.toString(),
        Project_number: proj.Project_number,
        project_name: proj.project_name,
        Project_status: proj.Project_status,
        Project_type: proj.Project_type,
        project_description: proj.project_description,
        Tech_stack: (proj.Tech_stack || []).map((tech, idx) => ({
            index: idx + 1,
            tech_name: tech.name,
            imgadd: `/${tech.image}`,
        })),
        img1: proj.img1.startsWith("/") ? proj.img1 : `/${proj.img1}`,
        link_To_Live: proj.link_To_Live,
        Link_To_Repo: proj.Link_To_Repo,
    }));

    if (projects.length === 0) {
        return null;
    }

    const featuredProject = projects[0];
    const secondaryProjects = projects.slice(1);

    return (
        <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#adc6ff] font-mono text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#adc6ff]"></span>
                        Portfolio Showcase
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Selected Works
                    </h2>
                    <p className="text-[#c2c6d6] text-lg max-w-xl leading-relaxed">
                        A curation of projects representing my journey in software craftsmanship.
                    </p>
                </div>
            </div>

            {/* Featured Project Card */}
            {featuredProject && (
                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-white/10 group hover:shadow-[0px_20px_50px_rgba(59,130,246,0.15)] transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Image Column */}
                        <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-[#1d2027] relative group-hover:shadow-2xl transition-all">
                            <img
                                src={featuredProject.img1}
                                alt={featuredProject.project_name}
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#10131a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                {featuredProject.link_To_Live && (
                                    <a
                                        href={featuredProject.link_To_Live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-full bg-white text-[#10131a] flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                        aria-label="Live Demo"
                                    >
                                        <span className="material-symbols-outlined text-2xl">visibility</span>
                                    </a>
                                )}
                                {featuredProject.Link_To_Repo && (
                                    <a
                                        href={featuredProject.Link_To_Repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-full bg-[#adc6ff] text-[#00285d] flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                                        aria-label="GitHub Repository"
                                    >
                                        <span className="material-symbols-outlined text-2xl">code</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Details Column */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center gap-2 text-[#adc6ff] font-mono text-xs tracking-widest uppercase font-semibold">
                                <span className="material-symbols-outlined !text-sm">star</span>
                                FEATURED PROJECT
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                                {featuredProject.project_name}
                            </h3>
                            <p className="text-[#c2c6d6] text-base leading-relaxed">
                                {featuredProject.project_description}
                            </p>

                            {/* Tech Stack Pills */}
                            {featuredProject.Tech_stack && featuredProject.Tech_stack.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {featuredProject.Tech_stack.map((tech) => (
                                        <span
                                            key={tech.index}
                                            className="px-3 py-1 bg-[#191b23] border border-white/10 rounded-lg text-xs text-[#c2c6d6] font-mono"
                                        >
                                            {tech.tech_name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {featuredProject.link_To_Live && (
                                    <a
                                        href={featuredProject.link_To_Live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-[#adc6ff] text-[#00285d] font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-[#adc6ff]/20"
                                    >
                                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {featuredProject.Link_To_Repo && (
                                    <a
                                        href={featuredProject.Link_To_Repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Secondary Projects Grid */}
            {secondaryProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {secondaryProjects.map((proj) => (
                        <div
                            key={proj.id}
                            className="glass-card rounded-3xl p-6 group border border-white/10 hover:border-[#adc6ff]/30 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                {/* Image Preview */}
                                <div className="overflow-hidden rounded-2xl aspect-video bg-[#1d2027] relative">
                                    <img
                                        src={proj.img1}
                                        alt={proj.project_name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {proj.Project_status && (
                                        <span className="absolute top-3 right-3 px-3 py-1 bg-[#10131a]/80 backdrop-blur-md text-[#adc6ff] border border-[#adc6ff]/20 rounded-full text-xs font-mono font-bold">
                                            {proj.Project_status}
                                        </span>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="space-y-3">
                                    <h4 className="text-2xl font-bold text-white group-hover:text-[#adc6ff] transition-colors">
                                        {proj.project_name}
                                    </h4>
                                    <p className="text-[#c2c6d6] text-sm leading-relaxed line-clamp-3">
                                        {proj.project_description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {proj.Tech_stack?.map((tech) => (
                                            <span key={tech.index} className="text-xs text-[#adc6ff] font-mono">
                                                #{tech.tech_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-6 border-t border-white/5 mt-6">
                                {proj.link_To_Live && (
                                    <a
                                        href={proj.link_To_Live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 px-4 bg-[#adc6ff] text-[#00285d] font-bold text-xs rounded-xl text-center hover:scale-[1.02] transition-transform"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {proj.Link_To_Repo && (
                                    <a
                                        href={proj.Link_To_Repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2.5 px-4 border border-white/20 text-white font-bold text-xs rounded-xl text-center hover:bg-white/5 transition-colors"
                                    >
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}