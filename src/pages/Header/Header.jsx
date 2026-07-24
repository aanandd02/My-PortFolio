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
  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3 ${
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="flex justify-center px-3 md:px-4 lg:px-6">
        <div className={`w-full max-w-[1040px] rounded-2xl lg:rounded-full p-[1px] transition-all duration-500 ${
          scrolled 
            ? "bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-sky-500/20" 
            : "bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/10"
        }`}>
          <nav className="bg-white/90 backdrop-blur-xl rounded-2xl lg:rounded-full px-3 md:px-4 lg:px-6 py-2 border border-slate-200/50 shadow-md">
            <div className="lg:hidden flex items-center justify-between w-full">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home", "#home")}
                className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 tracking-wide"
              >
                Anand
              </a>
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 grid place-items-center transition-all hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-1 w-full">
              {NAV_LINKS.map(({ id, icon: Icon, text, href }) => (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id, href)}
                  className={`shrink-0 flex items-center gap-2 px-4 xl:px-5 py-2 rounded-full
                    font-semibold text-[0.9rem]
                    transition-all duration-300
                    ${
                      activeLink === id
                        ? "bg-indigo-50 text-indigo-600 shadow-[inset_0_0_20px_rgba(99,102,241,0.05)] border border-indigo-100/50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }
                  `}
                >
                  <Icon
                    className={`text-base transition-all duration-300 ${
                      activeLink === id ? "text-indigo-600 scale-110" : "text-slate-400"
                    }`}
                  />
                  {/* Responsive & scalable text */}
                  <span className="inline whitespace-nowrap">
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-2">
                {NAV_LINKS.map(({ id, icon: Icon, text, href }) => (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => handleNavClick(e, id, href)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                      activeLink === id
                        ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100/80"
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
    </header>
  );
}
