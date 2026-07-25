import { Database } from "@/lib/database";
import Skill from "@/lib/models/Skill";

export default async function Skills() {
    await Database();
    const dbSkills = await Skill.find().sort({ skill_number: 1 }).lean();

    const data = dbSkills.map((skill) => ({
        id: skill._id.toString(),
        name: skill.name,
        Image_add: skill.image ? (skill.image.startsWith('/') ? skill.image : `/${skill.image}`) : '/Logo/react.png',
    }));

    return (
        <section id="expertise" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
            {/* Section Heading */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#adc6ff]/10 border border-[#adc6ff]/20 text-[#adc6ff] font-mono text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#adc6ff]"></span>
                    Tech Architecture
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    Technical Mastery
                </h2>
                <p className="text-[#c2c6d6] text-lg max-w-2xl mx-auto leading-relaxed">
                    A multi-layered stack focused on performance, scalability, and user-centric architecture.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[260px] gap-6">
                {/* Large Feature (8 cols, 2 rows) - Fixed Hover Brightness */}
                <div className="md:col-span-8 md:row-span-2 glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-end relative overflow-hidden group border border-white/10 hover:border-[#adc6ff]/40 shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                        <span className="material-symbols-outlined !text-9xl text-[#adc6ff]">terminal</span>
                    </div>
                    <div className="space-y-4 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[#adc6ff]/15 border border-[#adc6ff]/30 flex items-center justify-center text-[#adc6ff] mb-4">
                            <span className="material-symbols-outlined text-3xl">developer_mode_tv</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-[#adc6ff] transition-colors">
                            Full Stack Development
                        </h3>
                        <p className="text-[#c2c6d6] max-w-md text-sm md:text-base leading-relaxed">
                            End-to-end engineering from robust backends in Node.js to pixel-perfect frontends in React and Next.js. Expertise in state management, database schema design, and cloud deployments.
                        </p>
                        <div className="flex gap-4 items-center pt-4">
                            <span className="text-[#adc6ff] font-mono font-bold text-sm">Lvl 99</span>
                            <div className="h-1.5 flex-1 bg-[#1d2027] rounded-full overflow-hidden border border-white/5">
                                <div className="h-full bg-gradient-to-r from-[#adc6ff] to-[#4d8eff] w-[95%]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cloud Architect (4 cols) */}
                <div className="md:col-span-4 md:row-span-1 glass-card rounded-3xl p-6 flex flex-col justify-between group border border-white/10 hover:border-[#ddb7ff]/40 transition-all duration-300">
                    <span className="material-symbols-outlined text-[#ddb7ff] text-4xl">cloud_queue</span>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#ddb7ff] transition-colors">Cloud Architect</h3>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                            Deploying serverless functions and managing AWS, Vercel, and Docker infrastructure.
                        </p>
                    </div>
                </div>

                {/* Data Logic (4 cols) */}
                <div className="md:col-span-4 md:row-span-1 glass-card rounded-3xl p-6 flex flex-col justify-between group border border-white/10 hover:border-[#adc6ff]/40 transition-all duration-300">
                    <span className="material-symbols-outlined text-[#adc6ff] text-4xl">database</span>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#adc6ff] transition-colors">Data Logic</h3>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                            MongoDB, PostgreSQL, and Redis caching optimized for high read/write throughput.
                        </p>
                    </div>
                </div>

                {/* UI/UX Motion (4 cols) */}
                <div className="md:col-span-4 md:row-span-1 glass-card rounded-3xl p-6 flex flex-col justify-between group border border-white/10 hover:border-[#ddb7ff]/40 transition-all duration-300">
                    <span className="material-symbols-outlined text-[#ddb7ff] text-4xl">animation</span>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#ddb7ff] transition-colors">UI/UX Motion</h3>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                            Framer Motion and Tailwind CSS for fluid, accessible user interfaces.
                        </p>
                    </div>
                </div>

                {/* Problem Solving & Skills Overview (8 cols) */}
                <div className="md:col-span-8 md:row-span-1 glass-card rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 group border border-white/10 hover:border-[#adc6ff]/40 transition-all duration-300">
                    <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#adc6ff] transition-colors">Problem Solving</h3>
                        <p className="text-[#c2c6d6] text-sm leading-relaxed">
                            Algorithmic efficiency is at the core of every line of code I write. 1000+ DSA challenges conquered.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 max-w-xs justify-end">
                        {data.slice(0, 5).map((skill) => (
                            <div
                                key={skill.id}
                                className="px-3 py-1.5 rounded-lg bg-[#191b23] border border-white/10 flex items-center gap-2 font-mono text-xs text-[#c2c6d6]"
                            >
                                {skill.Image_add && (
                                    <img src={skill.Image_add} alt={skill.name} className="w-4 h-4 object-contain" />
                                )}
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* All Skills Grid Fetched From Database */}
            {data.length > 0 && (
                <div className="space-y-8 pt-6">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-[#adc6ff] rounded-full inline-block"></span>
                        <h3 className="text-2xl font-bold text-white font-mono">
                            All Skills & Technologies ({data.length})
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {data.map((skill) => (
                            <div
                                key={skill.id}
                                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center gap-4 group hover:border-[#adc6ff]/40 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-16 h-16 flex items-center justify-center p-2 rounded-xl bg-[#191b23] border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={skill.Image_add}
                                        alt={skill.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-white font-mono text-sm font-semibold text-center group-hover:text-[#adc6ff] transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
