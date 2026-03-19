import { useEffect, useRef, useState } from "react";
import { getPublicResumeUrl, resolvePublicResumeUrl } from "@/lib/resume";
import { fetchPortfolioAssistantReply, getFallbackReply } from "@/lib/portfolioAssistant";

const STARTER_QUESTIONS = [
  "Give me a short summary about Anand",
  "What did Anand do at Synup?",
  "Which projects best show Anand's backend skills?",
];

const WELCOME_MESSAGE =
  "Hello, I am Anand's portfolio assistant. I can answer recruiter-focused questions on impact, projects, skills, and fit.";

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export default function PortfolioChatbot() {
  const [resumeUrl, setResumeUrl] = useState(() => getPublicResumeUrl());
  const listRef = useRef(null);
  const replyTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      ts: Date.now(),
      text: WELCOME_MESSAGE,
    },
  ]);

  useEffect(() => {
    let active = true;
    resolvePublicResumeUrl().then((url) => {
      if (active) {
        setResumeUrl(url);
      }
    });

    return () => {
      active = false;
    };
  }, []);

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

  const resetChat = () => {
    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
    setInput("");
    setIsThinking(false);
    setMessages([
      {
        role: "bot",
        ts: Date.now(),
        text: WELCOME_MESSAGE,
      },
    ]);
  };

  const ask = async (question) => {
    const clean = question.trim();
    if (!clean || isThinking) return;

    const userMsg = { role: "user", text: clean, ts: Date.now() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);

    const delay = 450 + Math.floor(Math.random() * 350);
    replyTimerRef.current = window.setTimeout(async () => {
      try {
        const reply = await fetchPortfolioAssistantReply({
          question: clean,
          messages: nextMessages,
          resumeUrl,
        });

        const botMsg = {
          role: "bot",
          text: reply,
          ts: Date.now() + 1,
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        const botMsg = {
          role: "bot",
          text: getFallbackReply(clean, resumeUrl),
          ts: Date.now() + 1,
        };
        setMessages((prev) => [...prev, botMsg]);
        console.error("Portfolio assistant failed:", error);
      } finally {
        setIsThinking(false);
        replyTimerRef.current = null;
      }
    }, delay);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            resetChat();
            return;
          }
          setIsOpen(true);
        }}
        className="fixed bottom-4 left-4 right-4 z-[70] flex items-center justify-center gap-3 rounded-full border border-cyan-300/35 bg-slate-950/90 px-3 py-2 text-left text-cyan-100 shadow-[0_14px_40px_rgba(8,145,178,0.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-slate-900 sm:bottom-6 sm:left-5 sm:right-auto sm:justify-start"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-emerald-300 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
          AI
        </span>
        <span className="min-w-0 pr-1">
          <span className="block text-sm font-semibold">
            {isOpen ? "Close Assistant" : "Ask Assistant"}
          </span>
          <span className="hidden text-[11px] text-cyan-200/70 sm:block">
            Candidate profile assistant
          </span>
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-x-3 bottom-[5.25rem] z-[70] flex max-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden rounded-[24px] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_42%),linear-gradient(180deg,rgba(2,6,23,0.98),rgba(2,6,23,0.95))] shadow-[0_0_3rem_-0.5rem_rgba(6,182,212,0.65)] transition-all duration-300 ease-out sm:bottom-20 sm:left-5 sm:right-auto sm:w-[min(460px,calc(100vw-2.5rem))] sm:max-h-[min(44rem,calc(100dvh-7rem))] sm:rounded-[28px] ${
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
        }`}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="border-b border-white/10 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-emerald-300 font-bold text-slate-950 sm:h-11 sm:w-11">
                AI
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white sm:text-base">Anand AI Assistant</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-cyan-100/75">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                  <span>Profile assistant</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={resetChat}
              className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              New chat
            </button>
          </div>

          <div className="mt-3 rounded-2xl border border-cyan-300/15 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-slate-300">
            Ask about Anand&apos;s resume, projects, skills, internships, or contact details. If the question is outside his profile, the assistant will not answer it.
          </div>
        </div>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-4"
        >
          {messages.map((msg, index) => (
            <div
              key={`${msg.ts || index}-${index}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] break-words rounded-2xl px-3.5 py-3 text-sm transition-all duration-200 sm:max-w-[85%] ${
                  msg.role === "user"
                    ? "border border-cyan-400/25 bg-gradient-to-br from-cyan-400/20 to-sky-500/10 text-cyan-50 shadow-[0_10px_30px_rgba(34,211,238,0.14)]"
                    : "border border-white/10 bg-white/[0.045] text-slate-200"
                }`}
              >
                <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  <span>{msg.role === "user" ? "You" : "Assistant"}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-500" />
                  <span>{formatTime(msg.ts)}</span>
                </div>
                <div className="leading-6">{msg.text}</div>
              </div>
            </div>
          ))}
          {isThinking ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2.5 text-sm text-gray-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
                <span className="ml-1 text-xs text-gray-400">Thinking...</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 bg-slate-950/70 p-3">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => ask(question)}
                  className="max-w-full rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-left text-[11px] leading-4 text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isThinking}
                >
                  {question}
                </button>
              ))}
            </div>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-cyan-200 transition hover:text-cyan-100 sm:text-right"
              >
                Open Resume
              </a>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Anand's projects, skills, experience..."
                className="w-full rounded-xl border border-white/15 bg-white/[0.045] px-3 py-3 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                Enter
              </span>
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-300 to-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              disabled={isThinking || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
