/** GitHub Pages base path (e.g. /apple-tree-clinic-v2/). "/" for local dev. */
export const BASE_URL = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  if (path.startsWith("/#")) return `${base}${path.slice(1)}`;
  if (path.startsWith("#")) return `${base}${path}`;
  if (path.startsWith("/")) return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

export function isHomePath(): boolean {
  const base = BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.replace(/\/$/, "") || "";
  const relative = base && path.startsWith(base) ? path.slice(base.length) || "/" : path || "/";
  const normalized = relative.startsWith("/") ? relative : `/${relative}`;
  if (normalized === "/" || normalized === "") return true;
  // Ad path aliases (/contact, /services, ...) also render the homepage
  return [
    "/services",
    "/videos",
    "/cases",
    "/about",
    "/doctors",
    "/environment",
    "/faq",
    "/contact",
    "/4r",
  ].includes(normalized);
}

export function normalizeSlug(slug: string): string {
  return slug.replace(/\/+$/, "").trim();
}

/**
 * Path for wouter navigate().
 * - GitHub Pages (subpath base): relative segment, e.g. `case/foo` → `{base}case/foo`
 * - Root deploy: `~/case/foo` so History API resolves from site root, not the current
 *   URL segment (avoids `/case/x` + `case/y` → `/case/case/y`).
 */
export function toRouterPath(path: string): string {
  if (path === "/" || path === "") return "/";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  const trimmed = normalized.replace(/\/+$/, "");
  if (!trimmed) return "/";

  const base = BASE_URL.replace(/\/$/, "");
  if (base) return trimmed;
  return `~/${trimmed}`;
}

/**
 * wouter strips the GitHub Pages base and returns paths like `xuyan-ai` (no leading slash).
 * Route patterns are defined as `/xuyan-ai`, so normalize before matching.
 * Cloudflare Pages may redirect to trailing-slash URLs (`/face-test/`); strip them for matching.
 */
export function normalizeRouterPath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const trimmed = withLeading.replace(/\/+$/, "");
  return trimmed || "/";
}
