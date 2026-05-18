/*
 * Navbar — Liquid Glass Design / Mobile-First
 * Frosted glass nav with slide-out drawer for mobile
 * One-tap LINE booking + phone call
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { withBase } from "@/lib/basePath";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location === "/" || location === "";
  const onHero = !scrolled && isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      // If element not found (user is on another page), navigate to homepage with hash
      window.location.href = withBase(`/${href}`);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 bg-cream/95 backdrop-blur-xl border-b border-botanical/10 shadow-md shadow-botanical/5"
            : "py-3 lg:py-4 bg-gradient-to-b from-forest-deep/85 via-forest-deep/50 to-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                onHero
                  ? "bg-white/15 group-hover:bg-white/25"
                  : "bg-botanical/10 group-hover:bg-botanical/15"
              }`}
            >
              <span className="text-sm">🍏</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[0.85rem] font-heading font-semibold leading-none transition-colors ${
                  onHero ? "text-white drop-shadow-sm" : "text-ink"
                }`}
              >
                {BRAND.name}
              </span>
              <span
                className={`text-[0.5rem] font-body tracking-[0.15em] uppercase leading-none mt-0.5 transition-colors ${
                  onHero ? "text-white/75" : "text-ink/45"
                }`}
              >
                {BRAND.nameEn}
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-3 py-1.5 text-[0.85rem] font-body font-medium rounded-full transition-all duration-300 group ${
                  onHero
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-ink/70 hover:text-ink hover:bg-botanical/5"
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] group-hover:w-5 transition-all duration-300 ${
                    onHero ? "bg-white/90" : "bg-botanical"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={BRAND.phoneLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[0.9rem] font-body transition-colors ${
                onHero ? "text-white/90 hover:text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <Phone size={13} />
              <span className="hidden xl:inline">{BRAND.phone}</span>
            </a>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-5 py-2 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-all duration-300 shadow-sm"
            >
              <MessageCircle size={14} />
              LINE 預約
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              onHero
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-botanical/5 text-ink/70 hover:text-ink"
            }`}
            aria-label="開啟選單"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-forest-deep/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-cream/95 backdrop-blur-2xl shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer header */}
                <div className="flex items-center justify-between p-5 border-b border-botanical/8">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🍏</span>
                    <span className="text-[0.85rem] font-heading font-semibold text-ink">{BRAND.name}</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-botanical/5 text-ink/50"
                    aria-label="關閉選單"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex-1 py-4 px-5 space-y-1 overflow-y-auto">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      onClick={() => handleNavClick(item.href)}
                      className="w-full text-left px-4 py-3 text-[1rem] font-body font-medium text-ink/70 hover:text-ink hover:bg-botanical/5 rounded-xl transition-all"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* Drawer CTA */}
                <div className="p-5 border-t border-botanical/8 space-y-3">
                  <a
                    href={BRAND.phoneLink}
                    className="flex items-center justify-center gap-2 w-full py-3 text-[0.85rem] font-body font-medium text-ink border border-botanical/20 rounded-full hover:bg-botanical/5 transition-colors"
                  >
                    <Phone size={16} />
                    {BRAND.phone}
                  </a>
                  <a
                    href={BRAND.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
                  >
                    <MessageCircle size={16} />
                    LINE 立即預約
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
