import { useState, useEffect } from "react";
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const NAV_LINKS = [
  { id: "home", icon: FaHome, text: "Home", href: "#home" },
  { id: "skills", icon: FaCode, text: "Skills", href: "#skills" },
  { id: "experience", icon: FaBriefcase, text: "Experience", href: "#experience" },
  { id: "education", icon: FaGraduationCap, text: "Education", href: "#education" },
  { id: "projects", icon: FaLaptopCode, text: "Projects", href: "#projects" },
  { id: "contact", icon: FaEnvelope, text: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setActiveLink("home");
    const sections = NAV_LINKS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveLink(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e, id, href) => {
    e.preventDefault();
    setActiveLink(id);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/65 backdrop-blur-md py-2.5">
      <div className="flex justify-center px-2 md:px-4 lg:px-6">
        <div className="w-full max-w-[1040px] rounded-2xl lg:rounded-full p-[1px] bg-gradient-to-r from-cyan-400/45 via-blue-500/40 to-emerald-400/45 lg:from-emerald-400/95 lg:via-cyan-500/95 lg:to-indigo-500/95 lg:animate-gradient-x">
          <nav className="bg-slate-900/95 backdrop-blur-md rounded-2xl lg:rounded-full px-3 md:px-4 lg:px-5 py-1.5 md:py-2 border border-cyan-300/20 shadow-[0_8px_24px_rgba(3,105,161,0.22)]">
            <div className="lg:hidden flex items-center justify-between w-full">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home", "#home")}
                className="text-sm font-semibold text-white tracking-wide"
              >
                Anand Portfolio
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 grid place-items-center"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-1.5 w-full">
              {NAV_LINKS.map(({ id, icon: Icon, text, href }) => (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id, href)}
                  className={`shrink-0 flex items-center gap-2 px-3 xl:px-4 py-1.5 rounded-full
                    font-medium
                    transition-all duration-300
                    hover:bg-white/10
                    ${
                      activeLink === id
                        ? "bg-white/18 text-white"
                        : "text-gray-300 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    className={`text-base sm:text-lg ${
                      activeLink === id ? "scale-110" : ""
                    }`}
                  />
                  {/* Responsive & scalable text */}
                  <span className="inline whitespace-nowrap text-[0.92rem]">
                    {text}
                  </span>
                </a>
              ))}
            </div>

            <div
              className={`lg:hidden overflow-hidden transition-all duration-300 ${
                isMobileMenuOpen ? "max-h-[520px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-1">
                {NAV_LINKS.map(({ id, icon: Icon, text, href }) => (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => handleNavClick(e, id, href)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-300 ${
                      activeLink === id
                        ? "bg-cyan-300/20 text-cyan-100 border border-cyan-300/30"
                        : "bg-white/5 text-gray-300 border border-white/5"
                    }`}
                  >
                    <Icon className="text-sm" />
                    <span>{text}</span>
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
          background-size: 200% 200%;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
}
