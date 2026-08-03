import { useLocation } from "wouter";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { isHomePath, toRouterPath, withBase } from "@/lib/basePath";
import { saveScrollBeforeLeave } from "@/lib/scrollRestore";
import { navigateToHomeSection, scrollToHashWithRetry } from "@/lib/scrollToHash";

type InternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/** Internal site link with GitHub Pages base path and client-side navigation. */
export function InternalLink({ href, onClick, ...props }: InternalLinkProps) {
  const [, navigate] = useLocation();
  const to = withBase(href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      e.preventDefault();
      if (isHomePath()) {
        navigateToHomeSection(sectionId);
        return;
      }
      navigate("/");
      window.history.replaceState(null, "", withBase(`/#${sectionId}`));
      window.setTimeout(() => scrollToHashWithRetry(`#${sectionId}`), 150);
      return;
    }

    if (href.startsWith("#")) return;

    const hashIdx = href.indexOf("#");
    if (hashIdx > 0) {
      e.preventDefault();
      const pathPart = href.slice(0, hashIdx);
      const hashPart = href.slice(hashIdx);
      saveScrollBeforeLeave();
      navigate(toRouterPath(pathPart));
      window.setTimeout(() => {
        window.history.replaceState(null, "", withBase(pathPart) + hashPart);
        scrollToHashWithRetry(hashPart);
      }, 50);
      return;
    }

    e.preventDefault();
    saveScrollBeforeLeave();
    navigate(toRouterPath(href));
  };

  return <a href={to} onClick={handleClick} {...props} />;
}
