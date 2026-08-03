import { NAV_SCROLL_OFFSET } from "./sectionDeepLinks";

/** Scroll to a document fragment, accounting for the fixed navbar. */
export function scrollToHashTarget(
  hash: string = window.location.hash,
  behavior: ScrollBehavior = "smooth",
  offset: number = NAV_SCROLL_OFFSET,
): boolean {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior });
  return true;
}

export function scrollToHashWithRetry(
  hash: string = window.location.hash,
  maxAttempts = 12,
  intervalMs = 100,
): () => void {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return () => {};

  let attempts = 0;
  let timer: number | undefined;

  const tryScroll = () => {
    if (scrollToHashTarget(`#${id}`, attempts === 0 ? "smooth" : "auto")) return;
    attempts += 1;
    if (attempts < maxAttempts) {
      timer = window.setTimeout(tryScroll, intervalMs);
    }
  };

  tryScroll();
  return () => {
    if (timer !== undefined) window.clearTimeout(timer);
  };
}

/** Update the URL hash without adding a history entry, then scroll. */
export function navigateToHomeSection(sectionId: string, replace = true): void {
  const hash = sectionId.startsWith("#") ? sectionId : `#${sectionId}`;
  const url = `${window.location.pathname}${window.location.search}${hash}`;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
  scrollToHashWithRetry(hash);
}
