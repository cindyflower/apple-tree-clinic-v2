/**
 * Load Umami only when VITE_ANALYTICS_* env vars are set.
 * Keeps local dev quiet; enable in .env or CI secrets for production.
 */
export function initUmami(): void {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT?.trim();
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID?.trim();
  if (!endpoint || !websiteId) return;

  const src = `${endpoint.replace(/\/$/, "")}/umami`;
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = src;
  script.dataset.websiteId = websiteId;
  document.body.appendChild(script);
}
