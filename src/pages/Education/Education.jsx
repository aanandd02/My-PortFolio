import { Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

/* animations */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const EducationCard = ({ degree, school, year, description, mascot, wide }) => (
  <motion.div
    variants={item}
    whileHover={{ y: -6 }}
    className={`group relative ${wide ? "md:col-span-2" : ""}`}
  >
    {/* premium border glow */}
    <div className="absolute -inset-[1.5px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

    <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl p-8 h-full transition-all duration-300 group-hover:border-slate-350 shadow-md">
      <div className="space-y-4">
        {/* title */}
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-3xl"
          >
            {mascot}
          </motion.span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
            {degree}
          </h3>
        </div>

        <p className="text-slate-600 flex items-center gap-2 font-semibold">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          {school}
        </p>

        <p className="text-slate-500 flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-slate-400" />
          {year}
        </p>

        <p className="text-slate-600 text-sm border-l-2 border-indigo-500/40 pl-4 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

const EducationSection = () => {
  const educationData = [
    {
      degree: "B.Tech in Electronics and Communication Engineering",
      school: "Indian Institute of Information Technology, Nagpur",
      mascot: "🎓",
      year: "Nov 2022 – Jun 2026",
      description:
        "Relevant Coursework: Data Structures, Algorithms, Operating Systems, OOP, Computer Networks, Database Management Systems",
      wide: true,
    },
    {
      degree: "Secondary School Certificate (Class X)",
      school: "SMT D Singh, Doorwani Nagar, Naini, Prayagraj, Uttar Pradesh",
      mascot: "📘",
      year: "2020",
      description: "Completed Class 10th with strong academic foundation.",
    },
    {
      degree: "Senior School Certificate (Class XII)",
      school: "SMT D Singh, Doorwani Nagar, Naini, Prayagraj, Uttar Pradesh",
      mascot: "📗",
      year: "2022",
      description: "Completed Class 12th in Science Stream.",
    },
  ];

  return (
    <section
      className="bg-transparent py-14 md:py-24 relative overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-sky-400/[0.08] blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/[0.08] blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-3">Academic</p>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-semibold">
            Academic journey and foundations
          </p>
        </motion.div>

        {/* cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-6xl mx-auto"
        >
          {educationData.map((edu, i) => (
            <EducationCard key={i} {...edu} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
