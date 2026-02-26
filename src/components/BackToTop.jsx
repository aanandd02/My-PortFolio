import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-[70] h-11 w-11 rounded-full border border-cyan-300/40 bg-slate-900/85 text-cyan-300 shadow-[0_8px_30px_rgba(8,145,178,0.35)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      ↑
    </button>
  );
}
