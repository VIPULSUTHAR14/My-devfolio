import { Database } from "@/lib/database";
import Skill from "@/lib/models/Skill";

export default async function Skills() {
    await Database();
    const skills = await Skill.find().sort({ skill_number: 1 }).lean();

    // Convert mongoose documents to plain objects
    const data = skills.map((skill) => ({
        id: skill._id.toString(),
        name: skill.name,
        Image_add: skill.image,
    }));

    if (data.length === 0) {
        return null;
    }

    return (
        <div id="skills" className="flex flex-col" >
            <div className="flex justify-start space-x-44 pb-10 " >
                <h1></h1>
                <h1 className="text-4xl font-extrabold underline underline-offset-8 decoration-cyan-300 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-500 "  >Experties</h1>
            </div>
            <div className="w-full h-screen flex items-center justify-center flex-col ">
                <div className="grid grid-cols-7 space-x-10 space-y-10 " >
                    {data.map((e) => (
                        <div key={e.id} className=" group w-48 h-48 bg-slate-900 border-b-8 border-slate-500 rounded-2xl flex flex-col justify-center align-middle items-center drop-shadow-2xl hover:drop-shadow-cyan-900  transition-transform duration-1000 ease-in-out  " >
                            <img src={e.Image_add} alt={e.name} className={`w-28 pb-0 group-hover:scale-110  transition-transform duration-1000 ease-in-out `} />
                            <div className="flex  items-center justify-center align-middle pt-3 " >
                                <p className="text-slate-400 text-xl font-mono  transition-all duration-1000 ease-in-out group-hover:underline " >{e.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
