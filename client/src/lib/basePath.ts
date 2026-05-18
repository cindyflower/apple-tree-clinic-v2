/** GitHub Pages base path (e.g. /apple-tree-clinic-v2/). "/" for local dev. */
export const BASE_URL = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  if (path.startsWith("/#")) return `${base}${path.slice(2)}`;
  if (path.startsWith("#")) return `${base}${path}`;
  if (path.startsWith("/")) return `${base}${path.slice(1)}`;
  return `${base}${path}`;
}

export function isHomePath(): boolean {
  const base = BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.replace(/\/$/, "") || "";
  return path === base || path === "";
}
