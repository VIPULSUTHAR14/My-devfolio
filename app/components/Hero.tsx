import GitHubTerminal from "./github"

export default function Hero() {
    return (
        <div id="home" className="  w-full h-screen  drop-shadow-2xl flex items-center justify-center">
            <div className="max-w-4xl space-y-10 " >
                <h1 className="inline-block bg-gradient-to-r from-blue-900 to-blue-200 bg-clip-text text-transparent text-7xl font-extrabold" >Vipul Suthar</h1>
                <p className="text-7xl font-extrabold" >
                    Building Scalable Digital Experiences
                </p>
                <p className="text-4xl text-blue-100 font-bold max-w-2xl " >
                    Fresher Full-Stack Engineer specializing in React, Node.js, and Cloud Architecture
                </p>
                <div className="flex space-x-10" >
                    <button className="bg-blue-900 text-xl font-mono rounded-xl py-3 px-4 border-1 border-white/30 drop-shadow-xl hover:drop-shadow-blue-400 hover:animate-pulse  " >View Work</button>
                    <button className=" text-xl font-mono rounded-xl py-3 px-4 border-1 border-white/30 " >Contect</button>
                </div>
            </div>
            <div>
                <GitHubTerminal />
            </div>
        </div>
    )
}       