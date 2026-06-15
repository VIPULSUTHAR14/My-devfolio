export default function Navbar() {
    return (
        <div className=" sticky top-0 z-30 w-full flex items-center justify-center  " >
            <div className=" w-full flex items-center justify-between py-5 backdrop-blur-2xl  border-1 border-white/30 ">
                <div>
                    <p className="text-3xl font-extrabold ml-20" >~/Vipul.Dev</p>
                </div>
                <ul className="flex space-x-10 "  >
                    <li><a href="#home" className="text-slate-50 hover:underline underline-offset-8 font-mono text-xl cursor-pointer" >Home</a></li>
                    <li><a href="#skills" className="text-slate-50 hover:underline underline-offset-8 font-mono text-xl cursor-pointer" >Skill</a></li>
                    <li><a href="#projects" className="text-slate-50 hover:underline underline-offset-8 font-mono text-xl cursor-pointer" >Project</a></li>
                    <li><a href="#contact" className="text-slate-50 hover:underline underline-offset-8 font-mono text-xl cursor-pointer" >Contect</a></li>
                </ul>
                <div className="mr-20">
                    <p className="text-3xl font-extrabold active:text-amber-600 " >Resume</p>
                </div>
            </div>
        </div>
    )
}
// 