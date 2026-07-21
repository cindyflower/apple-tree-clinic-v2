import { toRouterPath } from "./basePath";

const STORAGE_PREFIX = "scroll-restore:";

export interface ScrollRestorePayload {
  scrollY: number;
  extra?: Record<string, unknown>;
}

let pendingRestoreKey: string | null = null;
const extraStateByKey = new Map<string, Record<string, unknown>>();

/** Stable key for the current URL (path + query + hash). */
export function getScrollRestoreKey(): string {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    pendingRestoreKey = getScrollRestoreKey();
  });
}

/** Pages call this to persist extra state (filters, tabs, etc.) before leaving. */
export function updateScrollRestoreState(extra: Record<string, unknown>) {
  extraStateByKey.set(getScrollRestoreKey(), extra);
}

export function saveScrollBeforeLeave() {
  const key = getScrollRestoreKey();
  sessionStorage.setItem(
    STORAGE_PREFIX + key,
    JSON.stringify({
      scrollY: window.scrollY,
      extra: extraStateByKey.get(key),
    } satisfies ScrollRestorePayload),
  );
}

export function consumeScrollRestore(): ScrollRestorePayload | null {
  const key = getScrollRestoreKey();
  if (pendingRestoreKey !== key) {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
    return null;
  }
  pendingRestoreKey = null;

  const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
  sessionStorage.removeItem(STORAGE_PREFIX + key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ScrollRestorePayload;
  } catch {
    return null;
  }
}

export function restoreScrollPosition(scrollY: number) {
  const apply = () => window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });

  apply();
  requestAnimationFrame(() => {
    apply();
    window.setTimeout(apply, 100);
    window.setTimeout(apply, 300);
  });
}

/** Prefer browser back (restores scroll); fall back to client navigation. */
export function goBack(navigate: (to: string) => void, fallback = "/") {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  navigate(toRouterPath(fallback));
}
