/** Shared site URL resolution for build scripts and Vite plugins. */

export const PRODUCTION_ORIGIN = "https://www.drappletree.com.tw";
export const GITHUB_PAGES_ORIGIN = "https://cindyflower.github.io";
export const GITHUB_PAGES_BASE = "/apple-tree-clinic-v2";

function normalizeOrigin(url) {
  return url.replace(/\/$/, "");
}

/** @param {NodeJS.ProcessEnv} [env] */
export function resolveSiteConfig(env = process.env) {
  const isPages = env.GITHUB_PAGES === "true";
  const origin = normalizeOrigin(
    env.VITE_SITE_URL ||
      env.SITE_URL ||
      (isPages ? GITHUB_PAGES_ORIGIN : PRODUCTION_ORIGIN)
  );
  const basePath = isPages
    ? GITHUB_PAGES_BASE
    : (env.BASE_PATH || "").replace(/\/$/, "");
  const siteBase = `${origin}${basePath}`;

  return { origin, basePath, siteBase, isPages };
}

/** @param {string} route @param {ReturnType<typeof resolveSiteConfig>} config */
export function absoluteUrl(route, config) {
  const { siteBase } = config;
  if (route === "/" || route === "") return `${siteBase}/`;
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return `${siteBase}${normalized}`;
}
