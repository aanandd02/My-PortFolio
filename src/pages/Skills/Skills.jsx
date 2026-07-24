import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Database,
  Layout,
  Cloud,
  Brain,
  Terminal,
  ShieldCheck,
  Boxes,
  Workflow,
  Search,
  ServerCog,
  Activity,
  Network,
  Binary,
} from "lucide-react";
import {
  FaJava,
  FaNodeJs,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiJavascript,
  SiExpress,
  SiPostman,
  SiGithub,
  SiLangchain,
  SiHuggingface,
  SiC,
  SiPython,
  SiMysql,
  SiMongodb,
} from "react-icons/si";
import LazySection from "@/components/LazySection";

const IconCloudDemo = lazy(() => import("@/components/globe"));

/* ---------- animations ---------- */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SkillCard = ({ icon: Icon, title, skills, color }) => (
  <motion.div variants={item} whileHover={{ y: -6 }}>
    <div className="group relative rounded-xl">
      {/* premium border glow */}
      <div className="absolute -inset-[1.5px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

      <Card className="relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl transition-all duration-300 group-hover:border-slate-300 shadow-md">
        <CardContent className="p-4 sm:p-5 md:p-6">
          {/* header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`p-3 rounded-xl bg-slate-50 border border-slate-200/50 ${color}`}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-wide">
              {title}
            </h3>
          </div>

          {/* badges */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 transition-all duration-300 hover:scale-105 hover:border-slate-300"
              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Programming Languages",
      color: "text-sky-600",
      skills: [
        { name: "C", icon: <SiC className="w-4 h-4 text-[#A8B9CC]" /> },
        { name: "Java", icon: <FaJava className="w-4 h-4 text-[#E11F21]" /> },
        { name: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
        { name: "Python", icon: <SiPython className="w-4 h-4 text-[#3776AB]" /> },
        { name: "SQL", icon: <SiMysql className="w-4 h-4 text-[#00618A]" /> },
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-emerald-600",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="w-4 h-4 text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="w-4 h-4 text-slate-800" /> },
        { name: "REST APIs", icon: <ServerCog className="w-4 h-4 text-orange-500" /> },
        { name: "JWT Auth", icon: <ShieldCheck className="w-4 h-4 text-yellow-600" /> },
        { name: "Microservices", icon: <Boxes className="w-4 h-4 text-sky-600" /> },
        { name: "System Design", icon: <Binary className="w-4 h-4 text-indigo-600" /> },
      ],
    },
    {
      icon: Database,
      title: "Databases & Search",
      color: "text-indigo-600",
      skills: [
        { name: "MySQL", icon: <SiMysql className="w-4 h-4 text-[#00618A]" /> },
        { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 text-[#47A248]" /> },
        { name: "Elasticsearch", icon: <Search className="w-4 h-4 text-yellow-600" /> },
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & Distributed",
      color: "text-sky-500",
      skills: [
        { name: "AWS", icon: <Cloud className="w-4 h-4 text-[#FF9900]" /> },
        { name: "Lambda", icon: <Activity className="w-4 h-4 text-orange-500" /> },
        { name: "EC2 / S3", icon: <Database className="w-4 h-4 text-amber-500" /> },
        { name: "API Gateway", icon: <Network className="w-4 h-4 text-sky-500" /> },
        { name: "SQS / SNS", icon: <Workflow className="w-4 h-4 text-lime-500" /> },
        { name: "CloudWatch", icon: <Search className="w-4 h-4 text-sky-500" /> },
        { name: "Serverless", icon: <Cloud className="w-4 h-4 text-emerald-500" /> },
        { name: "Event-Driven", icon: <Workflow className="w-4 h-4 text-sky-500" /> },
      ],
    },
    {
      icon: Brain,
      title: "AI & LLM Tools",
      color: "text-violet-600",
      skills: [
        { name: "LangChain", icon: <SiLangchain className="w-4 h-4 text-purple-600" /> },
        { name: "Hugging Face", icon: <SiHuggingface className="w-4 h-4 text-orange-500" /> },
        { name: "Prompt Engineering", icon: <Terminal className="w-4 h-4 text-emerald-600" /> },
      ],
    },
    {
      icon: Layout,
      title: "Frontend (Familiar)",
      color: "text-amber-650",
      skills: [
        { name: "React", icon: <FaReact className="w-4 h-4 text-[#61DAFB]" /> },
        { name: "HTML", icon: <FaHtml5 className="w-4 h-4 text-[#E34F26]" /> },
        { name: "CSS", icon: <FaCss3Alt className="w-4 h-4 text-[#1572B6]" /> },
        { name: "Bootstrap", icon: <FaBootstrap className="w-4 h-4 text-[#7952B3]" /> },
      ],
    },
    {
      icon: Cloud,
      title: "DevOps & Tools",
      color: "text-orange-500",
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "GitHub", icon: <SiGithub className="w-4 h-4 text-slate-800" /> },
        { name: "Docker", icon: <FaDocker className="w-4 h-4 text-[#2496ED]" /> },
        { name: "Postman", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      ],
    },
  ];

  return (
    <section className="bg-transparent relative overflow-hidden pt-8 md:pt-12 pb-0">
      {/* background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-sky-400/[0.08] blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/[0.08] blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-5 md:gap-8 mb-5 md:mb-8">
          <div>
            <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-3">Technical</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Skills Stack
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl text-sm sm:text-base font-semibold">
              Backend-focused toolkit with practical frontend and AI integration
              skills. Built for shipping reliable products fast.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs border border-sky-200 bg-sky-50 text-sky-700 font-bold">
                API Development
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold">
                Full-Stack Builds
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold">
                AI Integrations
              </span>
              <span className="px-3 py-1 rounded-full text-xs border border-violet-200 bg-violet-50 text-violet-700 font-bold">
                400+ LeetCode
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LazySection minHeight="220px" rootMargin="120px 0px">
              <Suspense fallback={<div className="text-indigo-600/70 text-sm font-bold">Loading tech cloud...</div>}>
                <IconCloudDemo />
              </Suspense>
            </LazySection>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {skillCategories.map((category, i) => (
            <SkillCard key={i} {...category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
