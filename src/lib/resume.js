const RESUME_PATH = import.meta.env.VITE_SUPABASE_RESUME_PATH || "latest-resume.pdf";
const RESUME_VERSION_KEY = "resume_version";
const DIRECT_RESUME_URL = (import.meta.env.VITE_RESUME_PUBLIC_URL || "").trim();
export const FALLBACK_RESUME_URL =
  "https://drive.google.com/file/d/1tppKMCDPsWeHdtFIaMD-jWEUdVSz9hW-/view?usp=sharing";

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
  if (DIRECT_RESUME_URL) {
    return DIRECT_RESUME_URL;
  }

  const config = getResumeConfig();
  if (!config.isReady) {
    return FALLBACK_RESUME_URL;
  }

  const version = getResumeVersion();
  const baseUrl = `${config.supabaseUrl}/storage/v1/object/public/${config.bucket}/${config.resumePath}`;
  return version ? `${baseUrl}?v=${version}` : baseUrl;
}

export async function resolvePublicResumeUrl() {
  const publicUrl = getPublicResumeUrl();
  if (!publicUrl.includes("/storage/v1/object/public/")) {
    return publicUrl;
  }

  try {
    const headResponse = await fetch(publicUrl, {
      method: "HEAD",
      cache: "no-store",
    });

    if (headResponse.ok) {
      return publicUrl;
    }

    if (headResponse.status === 404) {
      return FALLBACK_RESUME_URL;
    }

    // Some backends can reject HEAD while still serving GET correctly.
    if (headResponse.status === 405) {
      const getResponse = await fetch(publicUrl, { method: "GET", cache: "no-store" });
      return getResponse.ok ? publicUrl : FALLBACK_RESUME_URL;
    }

    return publicUrl;
  } catch {
    return FALLBACK_RESUME_URL;
  }
}
