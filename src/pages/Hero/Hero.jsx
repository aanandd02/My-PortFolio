import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import PortfolioPage from "@/pages/About/About";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";
import { getPublicResumeUrl, resolvePublicResumeUrl } from "@/lib/resume";
import { playHoverSound } from "@/lib/sounds";

export default function Hero() {
  const words = ["Learner", "Engineer", "Developer", "Problem-Solver"];
  const [resumeUrl, setResumeUrl] = useState(() => getPublicResumeUrl());

  // Code block with Anand
  const [code] = useState(`const profile = {
    name: 'Anand',
    skills: [
        'Java', 'JavaScript', 'Python', 'Node.js', 'Express.js',
        'MySQL', 'MongoDB', 'Elasticsearch',
        'AWS', 'Microservices', 'System Design'
    ],
    dsaProblemsSolved: 400,
    currentRole: 'Backend Engineer @ Node.js',
    hardWorker: true,
    scalableThinking: true,
    problemSolver: true,
    hireable: function() {
        return (
            this.hardWorker &&
            this.problemSolver &&
            this.scalableThinking &&
            this.skills.length >= 10
        );
    }
};`);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  useEffect(() => {
    let active = true;
    const syncResumeUrl = async () => {
      const nextUrl = await resolvePublicResumeUrl();
      if (active) {
        setResumeUrl(nextUrl);
      }
    };

    const handleResumeUpdate = () => {
      setResumeUrl(getPublicResumeUrl());
      syncResumeUrl();
    };

    syncResumeUrl();
    window.addEventListener("resume-updated", handleResumeUpdate);
    return () => {
      active = false;
      window.removeEventListener("resume-updated", handleResumeUpdate);
    };
  }, []);

  return (
    <>
      <main className="pt-20 md:pt-20 bg-[#f8fafc] text-[#1e293b] min-h-screen">
        <section
          id="home"
          className="hero min-h-[calc(100vh-5rem)] scroll-mt-28 flex items-center relative px-4 sm:px-6 lg:px-8"
        >
          {/* Ambient background glows - light cool colors */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-sky-400/[0.12] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-indigo-400/[0.12] rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/[0.08] rounded-full blur-[150px]"></div>
          </div>

          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-12 lg:py-0">
            {/* Left column - Text content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 animate__animated animate__fadeInLeft relative">

              {/* Status badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-8 animate__animated animate__fadeInDown animate__delay-1s">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                </div>
                <span className="text-slate-600 text-xs sm:text-sm font-semibold tracking-wide">
                  Available for opportunities
                </span>
              </div>

              {/* Main heading */}
              <div className="relative mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  <SparklesText text="Hello" />
                  <span className="relative block mt-2">
                    <span className="text-slate-800">I'm </span>
                    <span className="gradient-text font-extrabold">Anand</span>
                  </span>
                </h1>
              </div>

              {/* Role badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-8 animate__animated animate__fadeInUp animate__delay-1s">
                <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-sky-500 to-indigo-600"></div>
                <span>
                  <FlipWords
                    className={"text-lg sm:text-xl text-indigo-600 font-bold tracking-wide"}
                    words={words}
                  />
                </span>
              </div>

              {/* Subtitle */}
              <div className="relative mb-10 max-w-xl">
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                  Building scalable backend systems & shipping products that solve real problems.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp animate__delay-2s">
                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/aanandd02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="group relative inline-flex items-center justify-center gap-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]"
                >
                  <span className="block w-full px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 group-hover:from-sky-400 group-hover:to-indigo-500">
                    <span className="relative flex items-center justify-center gap-2.5 text-white font-bold tracking-wide">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                      <i className="fas fa-arrow-right transform transition-all duration-300 group-hover:translate-x-1 text-sm"></i>
                    </span>
                  </span>
                </a>

                {/* Resume Button */}
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  className="group relative inline-flex items-center justify-center gap-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_25px_rgba(148,163,184,0.15)]"
                >
                  <span className="block w-full px-7 py-3.5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 group-hover:bg-slate-50 group-hover:border-slate-300">
                    <span className="relative flex items-center justify-center gap-2.5 text-slate-700 font-bold tracking-wide group-hover:text-slate-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 group-hover:text-slate-700">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>Resume</span>
                    </span>
                  </span>
                </a>
              </div>

              {/* Floating badges */}
              <div className="hidden lg:block absolute left-[6rem] top-[2.3rem] animate-float-slow">
                <div className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-indigo-600 text-sm font-semibold shadow-md shadow-indigo-500/5">
                  <i className="fas fa-wand-magic-sparkles text-xs"></i>
                  &nbsp;&nbsp;Precision
                </div>
              </div>
              <div className="hidden lg:block absolute right-10 top-20 animate-float">
                <div className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-sky-600 text-sm font-semibold shadow-md shadow-sky-500/5">
                  <i className="fas fa-code text-xs"></i>&nbsp;&nbsp;Simplicity
                </div>
              </div>
              <div className="hidden lg:block absolute top-[17rem] left-[70%] transform -translate-x-1/2 animate-float">
                <div className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-amber-600 text-sm font-semibold shadow-md shadow-amber-500/5">
                  <i className="fas fa-lightbulb text-xs"></i>&nbsp;&nbsp;Innovation
                </div>
              </div>
            </div>

            {/* Right column - Code window */}
            <div className="w-full lg:w-1/2 animate__animated animate__fadeInDown animate__delay-0.1s">
              <div className="w-full">
                <div className="gradient-border shadow-2xl shadow-indigo-500/10">
                  <div className="code-window bg-[#0f172a]">
                    <div className="window-header">
                      <div className="window-dot bg-red-500/80"></div>
                      <div className="window-dot bg-yellow-500/80"></div>
                      <div className="window-dot bg-green-500/80"></div>
                      <span className="ml-3 text-xs text-slate-400 flex items-center gap-2 font-mono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500/60">
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        about.js
                      </span>
                    </div>
                    <pre className="language-javascript">
                      <code className="language-javascript">{code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-slate-400 text-xs flex items-center gap-2 tracking-widest uppercase font-semibold">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-indigo-500/60 animate-bounce"></div>
          </div>
        </div>
        <PortfolioPage />
      </main>
    </>
  );
}
