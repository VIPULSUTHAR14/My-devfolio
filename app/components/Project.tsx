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

    // Transform database projects into format expected by the frontend
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

    return (
        <div id="projects" className="py-5 px-5" >
            {/* //Heading */}
            <p className="text-4xl font-extrabold underline underline-offset-8 decoration-cyan-300 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-500 pl-40 pb-10" >Projects</p>
            {/* //secodary heading */}
            <div className="flex flex-col justify-center items-center align-middle" >
                <p className="text-xl font-mono text-slate-400 py-10" >{`< My Work />`}</p>
            </div>
            <div className="rounded-2xl" >
                {/* //main div */}
                <div className="flex flex-col justify-center align-middle items-center gap-10 " >
                    {/* //project mapping */}
                    {projects.map((data) => (
                        <div key={data.id} className=" group grid grid-cols-5 w-[80vw]  bg-slate-800 backdrop-blur-3xl p-10 space-x-2 rounded-sm " >

                            <div className="col-span-3 h-full border border-white/30 rounded-2xl flex flex-col " >
                                {/* //header of component */}
                                <div className="flex items-center align-middle justify-between py-7 px-7" >
                                    <div className="flex space-x-30">
                                        {/* //project Project_number */}
                                        <p className="flex justify-center items-center border size-10 rounded-2xl border-sky-500 text-sky-500 font-mono" >{data.Project_number}</p>
                                        {/* //project Name */}
                                        <p className="flex justify-center items-center font-mono text-2xl text-cyan-400 underline underline-offset-2" >{data.project_name}</p>
                                    </div>
                                    {/* //Current Status of Project */}
                                    <p className="flex justify-center items-center font-mono border-green-400 border p-2 rounded-2xl text-green-400 group-hover:animate-pulse " >{data.Project_status}</p>
                                </div>
                                <div className="flex flex-col justify-start pl-10 space-y-3" >
                                    <p className=" font-mono text-cyan-500 text-lg " >{data.Project_type}</p>
                                    <p className="w-[40vw] font-mono max-w-[30vw] " >{data.project_description}</p>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-x-5 space-y-2 " >
                                        {/* tech Stack Div */}
                                        {data.Tech_stack.map((e: { index: number; tech_name: string; imgadd: string }) => (
                                            <div key={e.index} className=" bg-slate-900 flex justify-center items-center align-middle border-b-4 border-blue-900/50 rounded-2xl space-x-2 group-hover:drop-shadow-cyan-900 shadow w-32 h-14 drop-shadow-sm hover:drop-shadow-blue-700 hover:scale-110 transition-transform duration-700 ease-in-out" >
                                                <img src={e.imgadd} alt="Logo" className="hover:scale-150 hover:drop-shadow-slate-500 drop-shadow-sm h-4" />
                                                <p className="font-mono sm:text-sm " >{e.tech_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className=" flex gap-10 justify-start align-middle items-center pb-4 " >
                                        {data.link_To_Live && (
                                            <a href={data.link_To_Live} target="_blank" rel="noopener noreferrer" className="bg-blue-900 px-10 py-2 font-mono rounded-2xl border-white border-2 hover:drop-shadow-blue-400 drop-shadow-xl backdrop-blur-3xl hover:scale-110 transition-all duration-200 ease-in-out" >To Live Preview</a>
                                        )}
                                        {data.Link_To_Repo && (
                                            <div className=" flex justify-center items-center align-middle rounded-2xl px-3 border-2 border-white hover:drop-shadow-purple-600 drop-shadow-xl backdrop-blur-3xl hover:scale-110 transition-all duration-200 ease-in-out bg-slate-400" >
                                                <a href={data.Link_To_Repo} target="_blank" rel="noopener noreferrer" className="font-mono text-slate-900" >View On GitHub</a>
                                                <img src="/Logo/github.png" alt="" className="size-10 hover:shadow-white drop-shadow-2xl " />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* //showcase Image div */}
                            <div className="col-span-2 h-full border border-white/30 rounded-2xl" >
                                <img src={data.img1} alt="img1 " className="object-cover h-full w-full p-5 rounded-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}