import { motion } from "framer-motion";
import { Layers, Code2, Server } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  icon: Icon,
  index,
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={index}
    whileHover={{ y: -8 }}
    className="group relative rounded-xl"
  >
    {/* Premium gradient border */}
    <div className="absolute -inset-[1.5px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />

    {/* Card */}
    <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl p-7 h-full transition-all duration-300 group-hover:border-slate-300 shadow-md hover:shadow-lg">
      {/* Icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-5"
      >
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-slate-800 tracking-wide">
          {title}
        </h3>

        <div className="flex justify-between items-center text-sm">
          <span className="text-indigo-600 font-bold">{company}</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 text-xs font-semibold">
            {period}
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed text-[15px] pt-2 font-medium">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const ExperienceSection = () => {
  const experiences = [
    {
      icon: Server,
      title: "Backend Engineer Intern",
      company: "Synup",
      period: "Jan 2026 – Mar 2026",
      description:
        "Worked on serverless microservices using AWS Lambda, MySQL, Elasticsearch, and S3 in an event-driven fan-out system. Resolved a critical race condition in Prospect-Up pipeline with consistent MySQL transactional updates across concurrent services, and built a quarterly Outscraper-powered ingestion pipeline for optimized search and reliable profile generation.",
    },
    {
      icon: Code2,
      title: "Backend Developer Intern",
      company: "BrandX",
      period: "Oct 2024 – Jan 2025",
      description:
        "Developed scalable backend APIs for booking, authentication, and admin dashboards in the Kumbh Mela 2024 Cottage Booking System (50K+ users). Optimized MongoDB queries, payment workflows, and API response performance, reducing latency by 40% under 10K+ concurrent requests.",
    },
    {
      icon: Layers,
      title: "Decor Team Member",
      company: "Tantrafiesta Tech Fest",
      period: "Oct 2023",
      description:
        "Handled decor execution for a technical fest with 300+ participants, enhancing overall event experience.",
    },
  ];

  return (
    <section
      className="bg-transparent pt-6 md:pt-8 pb-12 md:pb-16 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-sky-400/[0.08] blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/[0.08] blur-[120px] rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-3">Career</p>
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 bg-clip-text">
            Experience
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-semibold">
            Professional work and technical involvement
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
