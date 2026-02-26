import { Suspense, lazy } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import LazySection from "./components/LazySection";
import BackToTop from "./components/BackToTop";

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
      <div id="skills" className="section-transition scroll-mt-28 content-shell">
        <LazySection minHeight="100vh">
          <Suspense fallback={<SectionFallback label="Loading skills..." />}>
            <Skills />
          </Suspense>
        </LazySection>
      </div>
      <div id="experience" className="section-transition scroll-mt-28 content-shell">
        <LazySection minHeight="100vh">
          <Suspense fallback={<SectionFallback label="Loading experience..." />}>
            <Experience />
          </Suspense>
        </LazySection>
      </div>
      <div id="education" className="section-transition scroll-mt-28 content-shell">
        <LazySection minHeight="100vh">
          <Suspense fallback={<SectionFallback label="Loading education..." />}>
            <Education />
          </Suspense>
        </LazySection>
      </div>
      <div id="projects" className="section-transition scroll-mt-28 content-shell">
        <LazySection minHeight="100vh">
          <Suspense fallback={<SectionFallback label="Loading projects..." />}>
            <Projects />
          </Suspense>
        </LazySection>
      </div>
      <div id="contact" className="section-transition scroll-mt-28 content-shell">
        <LazySection minHeight="90vh">
          <Suspense fallback={<SectionFallback label="Loading contact..." />}>
            <Contact />
          </Suspense>
        </LazySection>
      </div>
      <BackToTop />
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
