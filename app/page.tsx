import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Message from "./components/Message";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-[#10131a] min-h-screen text-[#e1e2ec] flex flex-col selection:bg-[#adc6ff]/30 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Skills />
        <Project />
        <Message />
      </main>
      <Footer />
    </div>
  );
}
