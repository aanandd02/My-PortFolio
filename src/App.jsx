import { Suspense, lazy, useEffect } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import BackToTop from "./components/BackToTop";
import PortfolioChatbot from "./components/PortfolioChatbot";

const Skills = lazy(() => import("./pages/Skills/Skills"));
const Experience = lazy(() => import("./pages/Experience/Experience"));
const Education = lazy(() => import("./pages/Education/Education"));
const Projects = lazy(() => import("./pages/Projects/Projects"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

export default function App() {
  useEffect(() => {
    // Always open at Home section on fresh load/reload.
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <div id="skills" className="scroll-mt-28 cv-auto">
        <Suspense fallback={<SectionFallback label="Loading skills..." />}>
          <Skills />
        </Suspense>
      </div>
      <div id="experience" className="scroll-mt-28 cv-auto">
        <Suspense fallback={<SectionFallback label="Loading experience..." />}>
          <Experience />
        </Suspense>
      </div>
      <div id="education" className="scroll-mt-28 cv-auto">
        <Suspense fallback={<SectionFallback label="Loading education..." />}>
          <Education />
        </Suspense>
      </div>
      <div id="projects" className="scroll-mt-28 cv-auto">
        <Suspense fallback={<SectionFallback label="Loading projects..." />}>
          <Projects />
        </Suspense>
      </div>
      <div id="contact" className="scroll-mt-28 cv-auto">
        <Suspense fallback={<SectionFallback label="Loading contact..." />}>
          <Contact />
        </Suspense>
      </div>
      <BackToTop />
      <PortfolioChatbot />
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
