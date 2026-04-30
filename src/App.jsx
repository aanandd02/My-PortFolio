import { Suspense, lazy, useEffect, useState } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import PortfolioChatbot from "./components/PortfolioChatbot";
import Meteors from "./components/ui/meteors";

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
      <GlobalBackground />
      <GlobalMeteors />
      <div className="relative z-20">
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
        <PortfolioChatbot />
      </div>
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

function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-40 animate-gridPulse"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}

function GlobalMeteors() {
  const [meteorCount, setMeteorCount] = useState(10);

  useEffect(() => {
    const mediaMobile = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reducedMotion.matches) {
        setMeteorCount(0);
      } else if (mediaMobile.matches) {
        setMeteorCount(6);
      } else {
        setMeteorCount(10);
      }
    };

    update();
    mediaMobile.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      mediaMobile.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
      <Meteors number={meteorCount} />
    </div>
  );
}
