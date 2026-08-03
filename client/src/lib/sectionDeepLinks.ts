/**
 * Homepage section deep-links for ads / campaigns / shared URLs.
 *
 * Supported formats:
 * - Hash:   https://site/#contact
 * - Path:   https://site/contact  → scrolls to #contact
 * - Query:  https://site/?section=contact  → scrolls to #contact
 */

export const NAV_SCROLL_OFFSET = 80;

/** Canonical homepage section IDs (must match section `id` attributes). */
export const HOME_SECTION_IDS = [
  "services",
  "videos",
  "cases",
  "about",
  "doctors",
  "environment",
  "faq",
  "contact",
  "section-4r",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

/** Clean path aliases for ads (no hash) → section id */
export const SECTION_PATH_ALIASES: Record<string, HomeSectionId> = {
  "/services": "services",
  "/videos": "videos",
  "/cases": "cases",
  "/about": "about",
  "/doctors": "doctors",
  "/environment": "environment",
  "/faq": "faq",
  "/contact": "contact",
  "/4r": "section-4r",
};

export function isHomeSectionId(id: string): id is HomeSectionId {
  return (HOME_SECTION_IDS as readonly string[]).includes(id);
}

export function sectionIdFromPath(path: string): HomeSectionId | null {
  const normalized = path.replace(/\/$/, "") || "/";
  return SECTION_PATH_ALIASES[normalized] ?? null;
}

/** Resolve target section from URL hash, ?section=, or path alias. */
export function resolveHomeSectionTarget(
  pathname = window.location.pathname,
  search = window.location.search,
  hash = window.location.hash,
): HomeSectionId | null {
  const fromHash = hash.startsWith("#") ? hash.slice(1) : hash;
  if (fromHash && isHomeSectionId(fromHash)) return fromHash;

  const params = new URLSearchParams(search);
  const fromQuery = params.get("section")?.trim() ?? "";
  if (fromQuery && isHomeSectionId(fromQuery)) return fromQuery;

  // Strip GitHub Pages base if present
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  let path = pathname.replace(/\/$/, "") || "/";
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;

  return sectionIdFromPath(path);
}
