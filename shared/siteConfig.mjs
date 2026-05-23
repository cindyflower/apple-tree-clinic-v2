/** Shared site URL resolution for build scripts and Vite plugins. */

export const PRODUCTION_ORIGIN = "https://www.drappletree.com.tw";
export const GITHUB_PAGES_ORIGIN = "https://cindyflower.github.io";
export const GITHUB_PAGES_BASE = "/apple-tree-clinic-v2";

/** Default OG image path (no base prefix). Matches IMAGES.hero in imageAssets.ts. */
export const DEFAULT_OG_IMAGE_PATH =
  "/images/00_%E5%93%81%E7%89%8C%E8%88%87%E7%92%B0%E5%A2%83/hero-wellness-beauty-1.jpg";

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

/** @param {string} assetPath @param {ReturnType<typeof resolveSiteConfig>} config */
export function absoluteAssetUrl(assetPath, config) {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  if (config.basePath && path.startsWith(config.basePath)) {
    return `${config.origin}${path}`;
  }
  return `${config.siteBase}${path}`;
}
