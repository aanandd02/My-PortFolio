import { Suspense, lazy } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import BackToTop from "./components/BackToTop";
import ResumeAdmin from "./components/ResumeAdmin";

const Skills = lazy(() => import("./pages/Skills/Skills"));
const Experience = lazy(() => import("./pages/Experience/Experience"));
const Education = lazy(() => import("./pages/Education/Education"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <div id="skills" className="scroll-mt-28">
        <Suspense fallback={<SectionFallback label="Loading skills..." />}>
          <Skills />
        </Suspense>
      </div>
      <div id="experience" className="scroll-mt-28">
        <Suspense fallback={<SectionFallback label="Loading experience..." />}>
          <Experience />
        </Suspense>
      </div>
      <div id="education" className="scroll-mt-28">
        <Suspense fallback={<SectionFallback label="Loading education..." />}>
          <Education />
        </Suspense>
      </div>
      <div id="projects" className="scroll-mt-28">
        <Suspense fallback={<SectionFallback label="Loading projects..." />}>
          <Projects />
        </Suspense>
      </div>
      <div id="contact" className="scroll-mt-28">
        <Suspense fallback={<SectionFallback label="Loading contact..." />}>
          <Contact />
        </Suspense>
      </div>
      <BackToTop />
      <ResumeAdmin />
    </>
  );
}

function SectionFallback({ label }) {
  return (
    <div className="min-h-[55vh] grid place-items-center text-cyan-300/80 text-sm tracking-wide">
      {label}
    </div>
  );
}
