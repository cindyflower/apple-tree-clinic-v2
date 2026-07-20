import { ComponentType, lazy, LazyExoticComponent } from "react";

const RELOAD_KEY = "chunk-load-reload";

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message || "";
  return (
    message.includes("Failed to fetch dynamically imported module") ||
    message.includes("Importing a module script failed") ||
    message.includes("Loading chunk") ||
    message.includes("Loading CSS chunk") ||
    error.name === "ChunkLoadError"
  );
}

/**
 * Like React.lazy, but on stale-chunk failures after a deploy,
 * reload once so the browser picks up the new HTML/asset map.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      const mod = await factory();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (error) {
      if (isChunkLoadError(error) && !sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, "1");
        window.location.reload();
        // Keep Suspense pending until reload completes.
        return new Promise(() => {});
      }
      throw error;
    }
  });
}

export function reloadOnceOnChunkError(error: unknown): boolean {
  if (!isChunkLoadError(error) || sessionStorage.getItem(RELOAD_KEY)) {
    return false;
  }
  sessionStorage.setItem(RELOAD_KEY, "1");
  window.location.reload();
  return true;
}
