import { useEffect, useMemo, useState } from "react";
import { getResumeConfig, markResumeUpdated } from "@/lib/resume";

export default function ResumeAdmin() {
  const config = useMemo(() => getResumeConfig(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(token);

  useEffect(() => {
    const openPanel = () => setIsOpen(true);
    window.addEventListener("open-resume-admin", openPanel);
    return () => window.removeEventListener("open-resume-admin", openPanel);
  }, []);

  const login = async (e) => {
    e.preventDefault();
    if (!config.isReady) {
      setStatus("Supabase env config missing. Add env vars first.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(
        `${config.supabaseUrl}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            apikey: config.anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.access_token) {
        setStatus(data.error_description || "Login failed.");
      } else {
        setToken(data.access_token);
        setStatus("Logged in. Upload latest resume PDF.");
      }
    } catch {
      setStatus("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setStatus("Only PDF file allowed.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setStatus("File too large. Keep it under 8MB.");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(
        `${config.supabaseUrl}/storage/v1/object/${config.bucket}/${config.resumePath}`,
        {
          method: "PUT",
          headers: {
            apikey: config.anonKey,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/pdf",
            "x-upsert": "true",
          },
          body: file,
        }
      );

      if (!res.ok) {
        const error = await res.text();
        setStatus(`Upload failed: ${error}`);
      } else {
        markResumeUpdated();
        setFile(null);
        setStatus(
          "Resume updated successfully. Old resume replaced automatically."
        );
      }
    } catch {
      setStatus("Upload error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm p-4 grid place-items-center">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Resume Admin Panel</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {!isLoggedIn ? (
              <form onSubmit={login} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-cyan-500 px-3 py-2 font-medium text-slate-950 disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            ) : (
              <form onSubmit={uploadResume} className="space-y-3">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-emerald-400 px-3 py-2 font-medium text-slate-950 disabled:opacity-60"
                >
                  {loading ? "Uploading..." : "Upload Latest Resume"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToken("");
                    setPassword("");
                  }}
                  className="w-full rounded-lg border border-white/10 px-3 py-2 text-gray-300"
                >
                  Sign out
                </button>
              </form>
            )}

            {status ? (
              <p className="mt-3 text-sm text-cyan-300/90 break-words">{status}</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
