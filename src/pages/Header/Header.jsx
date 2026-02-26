import React, { useState, useEffect } from "react";
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

export default function Header() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { id: "home", icon: FaHome, text: "Home", href: "#home" },
    { id: "skills", icon: FaCode, text: "Skills", href: "#skills" },
    { id: "experience", icon: FaBriefcase, text: "Experience", href: "#experience" },
    { id: "education", icon: FaGraduationCap, text: "Education", href: "#education" },
    { id: "projects", icon: FaLaptopCode, text: "Projects", href: "#projects" },
    { id: "contact", icon: FaEnvelope, text: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (hash) {
      setActiveLink(hash);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveLink(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-120px 0px -45% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalScrollableHeight > 0
          ? (window.scrollY / totalScrollableHeight) * 100
          : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      if (window.innerWidth >= 640) {
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
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 backdrop-blur-md py-3">
      <div className="flex justify-center px-2 sm:px-6">
        <div className="p-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 animate-gradient-x w-full max-w-[900px]">
          <nav className="bg-gray-900/90 backdrop-blur-md rounded-2xl sm:rounded-full px-3 sm:px-6 py-2 sm:py-2.5">
            <div className="sm:hidden flex items-center justify-between w-full">
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
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white grid place-items-center"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            <div className="hidden sm:flex items-center justify-between gap-2 w-full">
              {navLinks.map(({ id, icon: Icon, text, href }) => (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleNavClick(e, id, href)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full
                    font-medium
                    transition-all duration-300
                    hover:bg-white/10
                    ${
                      activeLink === id
                        ? "bg-white/15 text-white"
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
                  <span
                    className={`${
                      activeLink === id ? "inline" : "hidden sm:inline"
                    }`}
                    style={{
                      fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)", // small on mobile, normal on larger
                      whiteSpace: "nowrap",
                    }}
                  >
                    {text}
                  </span>
                </a>
              ))}
            </div>

            <div
              className={`sm:hidden overflow-hidden transition-all duration-300 ${
                isMobileMenuOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-2 pb-1">
                {navLinks.map(({ id, icon: Icon, text, href }) => (
                  <a
                    key={id}
                    href={href}
                    onClick={(e) => handleNavClick(e, id, href)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all duration-300 ${
                      activeLink === id
                        ? "bg-white/15 text-white"
                        : "bg-white/5 text-gray-300"
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
      <div className="mt-3 h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-indigo-500 transition-[width] duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
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
