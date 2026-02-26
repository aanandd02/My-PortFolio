import { useEffect, useMemo, useRef, useState } from "react";
import { getPublicResumeUrl } from "@/lib/resume";

const QUICK_QUESTIONS = [
  "Give me a 30-second profile summary",
  "What impact did he deliver at Synup?",
  "Which projects best prove backend ownership?",
  "How strong is he in system design and scale?",
  "How does he handle reliability and debugging?",
  "What makes him internship-ready from day one?",
  "How does he use AI in real products?",
  "How can I contact him for an interview?",
];

function getBotReply(input, resumeUrl = "") {
  const text = input.toLowerCase();

  if (text.includes("30-second") || text.includes("summary") || text.includes("profile")) {
    return "Anand is a backend-focused engineer with strong execution in APIs, distributed systems, and data-intensive workflows. He combines practical cloud experience with product thinking and has delivered measurable impact in internship environments under real traffic and concurrency constraints.";
  }

  if (text.includes("synup") || text.includes("intern") || text.includes("impact")) {
    return "At Synup, Anand contributed to event-driven backend workflows built on AWS Lambda. He fixed a race-condition issue in a critical data pipeline by improving transactional consistency and also developed an ingestion flow that improved downstream search/profile reliability. This reflects production-grade debugging and ownership.";
  }

  if (text.includes("project") || text.includes("ownership") || text.includes("prove")) {
    return "Strong backend proof comes from AI Email Automation, ReserveMate, MealStack, and Hotel Booking API. Across these, he has worked on auth, API design, workflow orchestration, and data modeling. The pattern is consistent: clear backend boundaries, stable request handling, and practical delivery speed.";
  }

  if (text.includes("system design") || text.includes("scale") || text.includes("architecture")) {
    return "He is comfortable with core system-design concepts: service separation, async/event-driven pipelines, idempotency, and latency-aware query paths. His work indicates a strong foundation for scaling backend systems without compromising maintainability.";
  }

  if (text.includes("reliability") || text.includes("debug") || text.includes("issue")) {
    return "His troubleshooting style is structured: identify bottlenecks, isolate failure points, and apply data-backed fixes. Internship work shows he can diagnose concurrency failures and stabilize behavior in production-like systems.";
  }

  if (text.includes("day one") || text.includes("ready") || text.includes("hire")) {
    return "He is internship-ready because he can start contributing quickly in API and backend modules, communicate clearly with teams, and work with practical tooling (Git, Docker, Postman, cloud services) without handholding.";
  }

  if (text.includes("ai") || text.includes("llm") || text.includes("automation")) {
    return "He uses AI pragmatically, not as a gimmick. In projects like AI Email Automation and CodeSavant-AI, he integrates model workflows into usable product flows with clear outcomes such as automation efficiency and improved review workflows.";
  }

  if (text.includes("skill") || text.includes("backend") || text.includes("tech stack")) {
    return "Primary strengths include Node.js, Express, REST APIs, authentication, database design (MySQL/MongoDB), Elasticsearch, and AWS serverless patterns. He can deliver both feature velocity and backend correctness.";
  }

  if (text.includes("resume") || text.includes("cv")) {
    return resumeUrl
      ? `I can share his latest resume directly here: ${resumeUrl}`
      : "Resume is available on request along with project walkthrough highlights.";
  }

  if (text.includes("contact") || text.includes("interview") || text.includes("reach")) {
    return "Best contact channels: aanandd9076@gmail.com, +91-9076823328, LinkedIn (linkedin.com/in/aanandd02), and GitHub (github.com/aanandd02). For faster response, email + LinkedIn message works best.";
  }

  if (text.includes("about") || text.includes("anand")) {
    return "Anand is a backend-first engineer with strong practical delivery in internship and project settings. He is especially effective where APIs, data pipelines, and reliability matter.";
  }

  return "You can ask about profile summary, internship impact, backend ownership, architecture readiness, debugging approach, AI projects, resume, or interview contact.";
}

export default function PortfolioChatbot() {
  const resumeUrl = useMemo(() => getPublicResumeUrl(), []);
  const listRef = useRef(null);
  const replyTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello, I am Anand's portfolio assistant. I can answer recruiter-focused questions on impact, projects, skills, and fit.",
    },
  ]);
  const initialMessages = useMemo(
    () => [
      {
        role: "bot",
        text: "Hello, I am Anand's portfolio assistant. I can answer recruiter-focused questions on impact, projects, skills, and fit.",
      },
    ],
    []
  );

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  const ask = (question) => {
    const clean = question.trim();
    if (!clean) return;

    const userMsg = { role: "user", text: clean, ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    const delay = 700 + Math.floor(Math.random() * 700);
    replyTimerRef.current = window.setTimeout(() => {
      const botMsg = {
        role: "bot",
        text: getBotReply(clean, resumeUrl),
        ts: Date.now() + 1,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
    }, delay);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            if (replyTimerRef.current) {
              window.clearTimeout(replyTimerRef.current);
              replyTimerRef.current = null;
            }
            setIsOpen(false);
            setInput("");
            setIsThinking(false);
            setMessages(initialMessages);
            return;
          }
          setIsOpen(true);
        }}
        className="fixed bottom-6 left-5 z-[70] rounded-full border border-cyan-300/40 bg-slate-900/85 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_8px_28px_rgba(8,145,178,0.35)] backdrop-blur-md transition hover:bg-slate-800"
      >
        {isOpen ? "Close Assistant" : "Ask Assistant"}
      </button>

      <div
        aria-hidden={!isOpen}
        className={`fixed bottom-20 left-5 z-[70] w-[94vw] max-w-[430px] rounded-2xl border border-cyan-300/25 bg-slate-950/95 shadow-[0_0_2.5rem_-0.6rem_#06b6d4] transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
        }`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-white">Anand AI Assistant</p>
          <p className="text-xs text-gray-400">Professional candidate briefing</p>
        </div>

        <div
          ref={listRef}
          className="max-h-80 space-y-2 overflow-y-auto overscroll-contain px-3 py-3"
        >
          {messages.map((msg, index) => (
            <div
              key={`${msg.ts || index}-${index}`}
              className={`rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                msg.role === "user"
                  ? "ml-8 border border-cyan-400/30 bg-cyan-500/15 text-cyan-100"
                  : "mr-5 border border-white/10 bg-white/5 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isThinking ? (
            <div className="mr-5 inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
              <span className="ml-1 text-xs text-gray-400">Thinking...</span>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex max-h-24 flex-wrap gap-2 overflow-y-auto pr-1 overscroll-contain">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => ask(q)}
                className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] text-cyan-100 transition hover:bg-cyan-300/20"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about impact, projects, fit, skills..."
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isThinking}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
