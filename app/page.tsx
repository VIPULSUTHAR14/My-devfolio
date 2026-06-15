
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Message from "./components/Message";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center align-middle" >
      <Navbar />
      <Hero />
      <Skills />
      <Project />
      <Message />
      <Footer />
    </div>
  );
}
