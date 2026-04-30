import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import codeSavantImg from "../../assets/images/CodeSavant-AI.png";
import reserveMateImg from "../../assets/images/Reservemate.png";
import mealStackImg from "../../assets/images/MealStack.png";
import hotelApiImg from "../../assets/images/Hotel Booking API.png";
import svrImg from "../../assets/images/SVR.png";
import mailautoImg from "../../assets/images/ai-email-automation-banner.png";
import anubhavMedicalImg from "../../assets/images/AnubhavMedical.png";
import sikhoFlowImg from "../../assets/images/sikhoflow.png";

const projects = [
  {
    title: "SikhoFlow",
    description:
      "AI-powered infrastructure for modern educational institutions. Features personalized tutoring, automated assessments, and administrative excellence all integrated into one seamless ecosystem.",
    src: sikhoFlowImg,
    color: "#4f46e5",
    githubLink: "",
    liveLink: "https://d2qgmxan2aspm7.cloudfront.net/",
    tech: "AI/LLMs, Modern Frontend, Cloud Infrastructure",
    date: "2026",
  },
  {
    title: "AI HR Email Automation",
    description:
      "Automates personalized HR outreach emails using Google Sheets contacts, Groq-based subject/body generation, Gmail delivery, and local JSON duplicate prevention.",
    src: mailautoImg,
    color: "#8a2be2",
    githubLink: "https://github.com/aanandd02/Ai-emails-automation",
    liveLink: "",
    tech: "Node.js (ESM), Groq SDK, Google Sheets API, Nodemailer, dotenv",
    date: "Nov 2025",
  },
  {
    title: "Shree Vishwanath Roadways (SVR)",
    description:
      "Official single-page logistics marketing website for SVR with hero video, fleet gallery lightbox, testimonial carousel, contact + maps, WhatsApp/Get Quote actions, and PWA caching.",
    src: svrImg,
    color: "#ffcc00",
    githubLink: "https://github.com/aanandd02/SVR",
    liveLink: "https://svr-1skj.onrender.com",
    tech: "React 19, Vite 7, Framer Motion, React Icons, react-tsparticles, CSS",
    date: "Oct 2025",
  },
  {
    title: "CodeSavant-AI",
    description:
      "AI-powered code review app where users submit code by language and get structured feedback sections for mistakes, improvements, and corrected code via Groq-backed review API.",
    src: codeSavantImg,
    color: "#f58b57",
    githubLink: "https://github.com/aanandd02/CodeSavant-AI",
    liveLink: "https://codesavant-ai.onrender.com",
    tech: "React 19, Vite, Auth0, Node.js, Express, Groq API, Serverless",
    date: "Jan 2025 - Feb 2025",
  },
  {
    title: "ReserveMate",
    description:
      "Full-stack restaurant reservation app with React frontend and Express API, featuring validated booking flow, success feedback UX, and DynamoDB-based reservation storage.",
    src: reserveMateImg,
    color: "#50bfa0",
    githubLink: "https://github.com/aanandd02/ReserveMate",
    liveLink: "https://reservemate-frontend.onrender.com",
    tech: "React 18, Vite 5, Node.js, Express, AWS DynamoDB, AWS Lambda",
    date: "Nov 2024 - Jan 2025",
  },
  {
    title: "Anubhav Billing",
    description:
      "Billing and pharmacy management project focused on streamlined invoice handling and day-to-day medical store operations.",
    src: anubhavMedicalImg,
    color: "#ff6b6b",
    githubLink: "https://github.com/aanandd02/Anubhav-Billing",
    liveLink: "https://anubhav-billing.onrender.com/",
    tech: "React.js, Node.js, Express.js, MongoDB",
    date: "2025",
  },
  {
    title: "MealStack",
    description:
      "Secure backend with JWT auth and role-based access for food ordering operations.",
    src: mealStackImg,
    color: "#5196fd",
    githubLink: "https://github.com/Aanandshukla02/MealStack",
    liveLink: "",
    tech: "Node.js, Express.js, MongoDB, JWT",
    date: "Mar 2025 - Apr 2025",
  },
  {
    title: "Hotel Booking API",
    description:
      "REST API backend for hotel management with schema validation and role-based filtering.",
    src: hotelApiImg,
    color: "#e67e22",
    githubLink: "https://github.com/Aanandshukla02/Node_Hotels",
    liveLink: "",
    tech: "Node.js, Express.js, MongoDB, Mongoose",
    date: "May 2025 - Jun 2025",
  },
];

export default function Projects() {
  const container = useRef(null);
  const indicatorVisibleRef = useRef(true);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [showIndicator, setShowIndicator] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const next = latest < 0.95;
      if (indicatorVisibleRef.current !== next) {
        indicatorVisibleRef.current = next;
        setShowIndicator(next);
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <main className="relative" ref={container}>
      <section className="text-white w-full pb-10 md:pb-16">
        <div className="pt-10 md:pt-14 pb-4 text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        {isMobile ? (
          <div className="px-4">
            <div className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {projects.map((project, i) => (
                <div key={`mobile_${i}`} className="snap-center shrink-0 w-[88vw] max-w-[380px] flex">
                  <ProjectCardContent project={project} compact />
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">Swipe left/right to view projects</p>
          </div>
        ) : (
          projects.map((project, i) => {
            const targetScale = 1 - (projects.length - 1 - i) * 0.05;
            return (
              <DesktopCard
                key={`desktop_${i}`}
                i={i}
                project={project}
                progress={scrollYProgress}
                range={[i * (1 / projects.length), 1]}
                targetScale={targetScale}
              />
            );
          })
        )}
      </section>

      {!isMobile && showIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="fixed bottom-5 inset-x-0 flex flex-col items-center justify-center text-white text-sm z-[9999] pointer-events-none select-none"
        >
          <span className="mb-1 text-xs sm:text-sm opacity-80">Scroll Down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19,12 12,19 5,12" />
          </svg>
        </motion.div>
      )}
    </main>
  );
}

function DesktopCard({ project, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-[86vh] sticky top-20 flex items-center justify-center">
      <motion.div
        style={{ scale }}
        className="w-[88%] lg:w-[75%] xl:w-[65%] h-[420px] md:h-[400px] lg:h-[460px]"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <ProjectCardContent project={project} />
      </motion.div>
    </div>
  );
}

function ProjectCardContent({ project, compact = false }) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl border border-white/10">
      <div className={`w-full shrink-0 md:w-[50%] ${compact ? "h-[190px]" : "h-[220px] md:h-full"} relative overflow-hidden bg-gray-800`}>
        {project.src ? (
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <span>Project Preview</span>
        )}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: project.color, mixBlendMode: "overlay", opacity: 0.25 }}
        />
      </div>

      <div className={`w-full flex-1 md:w-[50%] min-h-0 ${compact ? "p-4" : "p-6 md:p-8 lg:p-10"} flex flex-col justify-between overflow-hidden`}>
        <div>
          <h3 className={`${compact ? "text-lg" : "text-xl md:text-2xl lg:text-3xl"} font-bold mb-2`}>
            {project.title}
          </h3>
          <p className={`${compact ? "text-sm" : "text-sm md:text-base"} text-gray-300 leading-relaxed mb-2`}>
            {project.description}
          </p>
          <p className="text-xs md:text-sm text-gray-400 italic mb-1">{project.tech}</p>
          <p className="text-xs text-gray-500">{project.date}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700 flex gap-4">
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs sm:text-sm">
              <GitHubIcon color={project.color} />
              <span>Code</span>
            </a>
          )}

          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs sm:text-sm">
              <LiveIcon color={project.color} />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function GitHubIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LiveIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
