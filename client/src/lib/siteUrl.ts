import { BASE_URL } from "./basePath";

const PRODUCTION_ORIGIN = "https://www.drappletree.com.tw";
const GITHUB_PAGES_ORIGIN = "https://cindyflower.github.io";

function normalizeOrigin(url: string): string {
  return url.replace(/\/$/, "");
}

/** Site origin from env, runtime location, or build target default. */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return normalizeOrigin(fromEnv);
  if (typeof window !== "undefined") return window.location.origin;
  const isPages = BASE_URL !== "/";
  return isPages ? GITHUB_PAGES_ORIGIN : PRODUCTION_ORIGIN;
}

/** Origin + Vite base path (no trailing slash). */
export function getSiteBase(): string {
  const basePath = BASE_URL.replace(/\/$/, "");
  if (!basePath || basePath === "/") return getSiteOrigin();
  return `${getSiteOrigin()}${basePath}`;
}

/** Absolute public URL for a site route, e.g. `/face-test`. */
export function absoluteSiteUrl(route: string): string {
  const siteBase = getSiteBase();
  if (route === "/" || route === "") return `${siteBase}/`;
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `${siteBase}${normalized}`;
}

/** Strip Vite base prefix from pathname for canonical route segment. */
export function pathnameToRoute(pathname?: string): string {
  const path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  const base = BASE_URL.replace(/\/$/, "");
  if (base && base !== "/" && path.startsWith(base)) {
    const rest = path.slice(base.length);
    return rest || "/";
  }
  return path || "/";
}

/** Absolute URL for a public asset path (handles withBase paths and plain /images/ paths). */
export function absoluteAssetUrl(assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const basePath = BASE_URL.replace(/\/$/, "");
  if (basePath && basePath !== "/" && path.startsWith(basePath)) {
    return `${getSiteOrigin()}${path}`;
  }
  return `${getSiteBase()}${path}`;
}

/** Share/copy URL — prefers env-pinned origin, otherwise current browser origin. */
export function runtimeSiteUrl(route: string): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim();
  if (fromEnv) return absoluteSiteUrl(route);
  if (typeof window === "undefined") return absoluteSiteUrl(route);

  const path = route.startsWith("/") ? route.slice(1) : route;
  const base = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  return new URL(`${base}${path}`, window.location.origin).href;
}
