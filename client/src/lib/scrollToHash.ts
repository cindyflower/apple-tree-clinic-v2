/** Scroll to a document fragment, retrying until the target element exists. */
export function scrollToHashTarget(
  hash: string = window.location.hash,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function scrollToHashWithRetry(
  hash: string = window.location.hash,
  maxAttempts = 10,
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
