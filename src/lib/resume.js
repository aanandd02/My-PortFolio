const RESUME_PATH = "latest-resume.pdf";
const RESUME_VERSION_KEY = "resume_version";
const FALLBACK_RESUME_URL =
  "https://drive.google.com/file/d/1dqHj0e59CKZQNcpaXIuTdIxhZNoeIa7M/view?usp=sharing";

function cleanUrl(url) {
  return url ? url.replace(/\/+$/, "") : "";
}

export function getResumeConfig() {
  const supabaseUrl = cleanUrl(import.meta.env.VITE_SUPABASE_URL);
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
  const bucket = import.meta.env.VITE_SUPABASE_BUCKET || "resumes";

  return {
    supabaseUrl,
    anonKey,
    bucket,
    resumePath: RESUME_PATH,
    isReady: Boolean(supabaseUrl && anonKey),
  };
}

export function getResumeVersion() {
  return localStorage.getItem(RESUME_VERSION_KEY) || "";
}

export function markResumeUpdated() {
  const version = `${Date.now()}`;
  localStorage.setItem(RESUME_VERSION_KEY, version);
  window.dispatchEvent(new Event("resume-updated"));
}

export function getPublicResumeUrl() {
  const config = getResumeConfig();
  if (!config.isReady) {
    return FALLBACK_RESUME_URL;
  }

  const version = getResumeVersion();
  const baseUrl = `${config.supabaseUrl}/storage/v1/object/public/${config.bucket}/${config.resumePath}`;
  return version ? `${baseUrl}?v=${version}` : baseUrl;
}
