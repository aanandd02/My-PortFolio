import React from "react";
import { Layers, Network, Code2, Server } from "lucide-react";

const ExperienceCard = ({ title, company, period, description, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    {/* Glass effect */}
    <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-lg pointer-events-none" />
    {/* Gradient border */}
    <div className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-gradient-xy transition-all duration-500 pointer-events-none" />

    <div className="relative bg-gray-900/90 rounded-lg p-8 h-full border border-gray-800/50 shadow-xl backdrop-blur-xl">
      <div className="relative mb-6">
        {/* Floating icon with pulse */}
        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30 rounded-full blur-xl group-hover:opacity-75 animate-pulse transition-all duration-500 pointer-events-none" />
        <Icon className="w-12 h-12 text-cyan-400 relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
      </div>

      <div className="space-y-3 relative z-10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <div className="flex justify-between items-center text-gray-300">
          <span className="font-semibold text-blue-400">{company}</span>
          <span className="text-sm font-mono bg-blue-500/10 px-3 py-1 rounded-full">
            {period}
          </span>
        </div>
        <p className="text-gray-300 border-l-4 border-blue-500/50 pl-4 mt-4 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      icon: Server,
      title: "Backend Intern",
      company: "Synup",
      period: "Jan 2026 – Present",
      description:
        "Working on backend development using Node.js and databases, building scalable APIs, improving system reliability, and collaborating with frontend and product teams to deliver production-ready features.",
    },
    {
      icon: Code2,
      title: "Full Stack Developer Intern",
      company: "BrandX",
      period: "Oct 2024 - Jan 2025, Noida, India",
      description:
        "Architected a full-stack MERN application using React.js, Node.js, and MongoDB, boosting scalability by 200% and reducing load times by 30%. Engineered RESTful APIs improving data retrieval efficiency by 25% and reduced response times by 40%. Conducted performance tuning improving uptime to 99.9% and reduced errors by 20%.",
    },
    {
      icon: Layers,
      title: "Decor Team Member",
      company: "Tantrafiesta Tech Fest",
      period: "Oct 2023 — Nagpur, India",
      description:
        "Coordinated decor setup for an event attended by over 300 participants, enhancing visual appeal and contributing to a 15% increase in attendee satisfaction.",
    },
    {
      icon: Network,
      title: "Hospitality Team Member",
      company: "3rd Convocation 2023",
      period: "Oct 2023 — Nagpur, India",
      description:
        "Assisted in managing hospitality operations for over 500 attendees, leading to a 10% improvement in overall event coordination.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#04081A] relative overflow-hidden pt-32 pb-20">
      {/* Container */}
      <div className="relative container mx-auto px-6 mt-10">
        {/* Header */}
        <div className="flex flex-col items-center space-y-8 mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-center">
            Experience & Involvement
          </h2>
          <p className="text-lg md:text-xl text-gray-400 font-medium tracking-wide text-center max-w-2xl">
            Showcasing internships, backend experience, and professional involvement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000 pointer-events-none" />
    </div>
  );
};

export default ExperienceSection;
