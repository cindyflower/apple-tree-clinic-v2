import { useEffect, useRef } from "react";
import { consumeScrollRestore, restoreScrollPosition } from "@/lib/scrollRestore";
import { scrollToHashWithRetry } from "@/lib/scrollToHash";

interface UseScrollRestoreOptions {
  onRestore?: (extra?: Record<string, unknown>) => void;
  hashFallback?: boolean;
  /** When this value changes, scroll to top unless the user pressed back. */
  resetKey?: unknown;
}

/** Restore scroll (and optional page state) when user returns via browser back. */
export function useScrollRestore(options: UseScrollRestoreOptions = {}) {
  const { hashFallback = true, resetKey } = options;
  const onRestoreRef = useRef(options.onRestore);
  onRestoreRef.current = options.onRestore;

  useEffect(() => {
    const saved = consumeScrollRestore();
    if (saved) {
      onRestoreRef.current?.(saved.extra);
      restoreScrollPosition(saved.scrollY);
      return;
    }

    if (resetKey !== undefined) {
      window.scrollTo(0, 0);
    }

    if (hashFallback && window.location.hash) {
      const timer = window.setTimeout(() => scrollToHashWithRetry(), 150);
      return () => window.clearTimeout(timer);
    }
  }, [hashFallback, resetKey]);
}
