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
  return path === base || path === "";
}

/** wouter navigate() paths must not lead with "/" when Router has a base URL. */
export function toRouterPath(path: string): string {
  if (path === "/" || path === "") return "/";
  return path.startsWith("/") ? path.slice(1) : path;
}

/**
 * wouter strips the GitHub Pages base and returns paths like `xuyan-ai` (no leading slash).
 * Route patterns are defined as `/xuyan-ai`, so normalize before matching.
 */
export function normalizeRouterPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}
