import { useEffect, useRef, useState } from "react";
import { getPublicResumeUrl, resolvePublicResumeUrl } from "@/lib/resume";
import { fetchPortfolioAssistantReply, getFallbackReply } from "@/lib/portfolioAssistant";
import { playOpenSound, playCloseSound, playHoverSound } from "@/lib/sounds";

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

  const toggleChat = () => {
    if (!isOpen) playOpenSound();
    else playCloseSound();
    setIsOpen(!isOpen);
    if (isOpen) resetChat();
  };

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
      {/* Background overlay for mobile */}
      <div 
        className={`fixed inset-0 z-[65] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => { playCloseSound(); setIsOpen(false); }}
      />

      {/* Floating Button */}
      <button
        type="button"
        onMouseEnter={playHoverSound}
        onClick={toggleChat}
        className={`fixed z-[70] flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-slate-950/80 p-1.5 pr-5 text-left shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl transition-all duration-300 ease-out hover:border-cyan-400/50 hover:bg-slate-900 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
          bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0
          ${isOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}
        `}
      >
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
          <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400 opacity-20"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
        </div>
        <span className="min-w-0 flex items-center gap-2">
          <span className="block text-[15px] font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">Anand AI</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        aria-hidden={!isOpen}
        className={`fixed z-[70] flex flex-col overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          
          inset-x-0 bottom-0 rounded-t-[32px] border-t border-cyan-400/20 h-[85dvh] sm:h-auto
          
          sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px] sm:rounded-[28px] sm:border sm:max-h-[min(44rem,calc(100dvh-5rem))]
          
          ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-full sm:translate-y-8 sm:scale-[0.95] opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="relative border-b border-white/5 bg-white/[0.02] px-4 pb-4 pt-5 backdrop-blur-md sm:px-5 sm:pb-5 sm:pt-5">
          <div className="absolute left-1/2 top-2.5 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/20 sm:hidden" />
          
          <div className="flex flex-wrap items-start justify-between gap-3 mt-1 sm:mt-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Anand AI</h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={resetChat}
                onMouseEnter={playHoverSound}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                title="New Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              </button>
              <button
                type="button"
                onClick={() => { playCloseSound(); setIsOpen(false); }}
                onMouseEnter={playHoverSound}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                title="Close Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5"
        >
          {messages.map((msg, index) => (
            <div
              key={`${msg.ts || index}-${index}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] break-words rounded-[20px] px-4 py-3 text-[13px] leading-relaxed transition-all duration-200 sm:text-sm ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md"
                    : "rounded-bl-sm border border-white/5 bg-white/[0.04] text-slate-200"
                }`}
              >
                <div>{msg.text}</div>
                <div className={`mt-1.5 text-[10px] ${msg.role === "user" ? "text-cyan-100/70" : "text-slate-500"}`}>
                  {formatTime(msg.ts)}
                </div>
              </div>
            </div>
          ))}
          {isThinking ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1.5 rounded-[20px] rounded-bl-sm border border-white/5 bg-white/[0.04] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-white/10 bg-slate-950/80 p-4 backdrop-blur-md sm:p-5">
          {messages.length <= 1 && (
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {STARTER_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => ask(question)}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-left text-[11px] text-cyan-100 transition-colors hover:bg-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isThinking}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] p-1.5 pr-2 transition-colors focus-within:border-cyan-400/50 focus-within:bg-white/[0.05]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-white outline-none placeholder:text-slate-500 sm:text-sm"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isThinking || !input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </form>
          
          {resumeUrl ? (
            <div className="mt-3 text-center sm:text-right">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium text-slate-400 transition hover:text-cyan-300"
              >
                Open Resume →
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
