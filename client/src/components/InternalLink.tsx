import { useLocation } from "wouter";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { isHomePath, withBase } from "@/lib/basePath";

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
      const anchor = href.slice(1);
      if (isHomePath()) {
        e.preventDefault();
        const el = document.querySelector(anchor);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        return;
      }
      e.preventDefault();
      window.location.href = to;
      return;
    }

    if (href.startsWith("#")) return;

    e.preventDefault();
    navigate(href);
  };

  return <a href={to} onClick={handleClick} {...props} />;
}
