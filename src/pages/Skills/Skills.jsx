import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IconCloudDemo from "@/components/globe";
import {
  Code2,
  Database,
  Layout,
  Cpu,
  Cloud,
  Brain,
  Terminal,
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
  SiMongodb,
  SiExpress,
  SiPostman,
  SiGithub,
  SiLangchain,
  SiHuggingface,
  SiC,
  SiMysql,
  SiPython,
  SiFastapi,
} from "react-icons/si";

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
      <div className="absolute -inset-[1.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

      <Card className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-xl">
        <CardContent className="p-6">
          {/* header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`p-3 rounded-xl bg-gray-800/60 ${color}`}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white tracking-wide">
              {title}
            </h3>
          </div>

          {/* badges */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 transition-all duration-300 hover:scale-105"
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
      color: "text-blue-400",
      skills: [
        { name: "C", icon: <SiC className="w-4 h-4 text-[#A8B9CC]" /> },
        { name: "Java", icon: <FaJava className="w-4 h-4 text-[#E11F21]" /> },
        { name: "Python", icon: <SiPython className="w-4 h-4 text-[#3776AB]" /> },
        { name: "JavaScript", icon: <SiJavascript className="w-4 h-4 text-[#F7DF1E]" /> },
        { name: "SQL", icon: <SiMysql className="w-4 h-4 text-[#00618A]" /> },
      ],
    },
    {
      icon: Database,
      title: "Backend Development",
      color: "text-green-400",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="w-4 h-4 text-[#339933]" /> },
        { name: "Express.js", icon: <SiExpress className="w-4 h-4 text-white" /> },
        { name: "FastAPI", icon: <SiFastapi className="w-4 h-4 text-[#009688]" /> },
        { name: "REST APIs", icon: <Terminal className="w-4 h-4 text-orange-400" /> },
        { name: "JWT Auth", icon: <Terminal className="w-4 h-4 text-yellow-400" /> },
      ],
    },
    {
      icon: Brain,
      title: "AI & LLM Tools",
      color: "text-pink-400",
      skills: [
        { name: "LangChain", icon: <SiLangchain className="w-4 h-4 text-purple-400" /> },
        { name: "Hugging Face", icon: <SiHuggingface className="w-4 h-4 text-orange-400" /> },
        { name: "Prompt Engineering", icon: <Terminal className="w-4 h-4 text-green-400" /> },
      ],
    },
    {
      icon: Layout,
      title: "Frontend (Familiar)",
      color: "text-yellow-400",
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
      color: "text-orange-400",
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-4 h-4 text-[#F05032]" /> },
        { name: "GitHub", icon: <SiGithub className="w-4 h-4 text-white" /> },
        { name: "Docker", icon: <FaDocker className="w-4 h-4 text-[#2496ED]" /> },
        { name: "Postman", icon: <SiPostman className="w-4 h-4 text-[#FF6C37]" /> },
      ],
    },
  ];

  return (
    <section className="min-h-screen bg-[#04081A] relative overflow-hidden py-28">
      {/* background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-center mb-20">
          <IconCloudDemo />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
