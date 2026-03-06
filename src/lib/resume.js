const DIRECT_RESUME_URL = (import.meta.env.VITE_RESUME_PUBLIC_URL || "").trim();
export const FALLBACK_RESUME_URL =
  "https://drive.google.com/file/d/1tppKMCDPsWeHdtFIaMD-jWEUdVSz9hW-/view?usp=sharing";

export function markResumeUpdated() {
  // Kept for API compatibility with existing listeners in UI.
  window.dispatchEvent(new Event("resume-updated"));
}

export function getPublicResumeUrl() {
  return DIRECT_RESUME_URL || FALLBACK_RESUME_URL;
}

export async function resolvePublicResumeUrl() {
  return getPublicResumeUrl();
}
