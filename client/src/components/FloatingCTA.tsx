/*
 * FloatingCTA — Liquid Glass Design / Mobile-First
 * Mobile: Fixed bottom action bar (phone + LINE)
 * Desktop: Side floating buttons with tooltips
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { BRAND, LINE_BY_APPLE } from "@/lib/constants";

const BEIDA_LINE_LABEL = "北大Line 諮詢";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ─── Mobile: Fixed bottom action bar ─── */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-xl border-t border-botanical/10 px-4 py-3"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center gap-2">
              <a
                href={BRAND.phoneLink}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.8rem] font-body font-medium text-ink border border-botanical/20 rounded-full hover:bg-botanical/5 transition-colors"
              >
                <Phone size={15} />
                電話預約
              </a>
              <a
                href={LINE_BY_APPLE.beida.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-[0.8rem] font-body font-medium text-cream bg-[#06C755] rounded-full hover:bg-[#05b34d] transition-colors"
                aria-label={BEIDA_LINE_LABEL}
                data-track-clinic="北大"
                data-track-section="FloatingCTA"
                data-track-button="北大｜LINE 諮詢｜FloatingCTA手機"
              >
                <MessageCircle size={15} />
                {BEIDA_LINE_LABEL}
              </a>
            </div>
          </motion.div>

          {/* ─── Desktop: Side floating buttons ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:flex fixed bottom-8 right-8 z-40 flex-col gap-3"
          >
            <a
              href={LINE_BY_APPLE.beida.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-[#06C755] text-white shadow-lg shadow-[#06C755]/20 hover:scale-110 transition-transform duration-300"
              aria-label={BEIDA_LINE_LABEL}
              data-track-clinic="北大"
              data-track-section="FloatingCTA"
              data-track-button="北大｜LINE 諮詢｜FloatingCTA桌面"
            >
              <MessageCircle size={20} />
              <span className="absolute right-full mr-3 px-3 py-1.5 text-[0.7rem] font-body font-medium text-ink bg-cream rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {BEIDA_LINE_LABEL}
              </span>
            </a>
            <a
              href={BRAND.phoneLink}
              className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-botanical text-cream shadow-lg shadow-botanical/20 hover:scale-110 transition-transform duration-300"
              aria-label="電話預約"
            >
              <Phone size={20} />
              <span className="absolute right-full mr-3 px-3 py-1.5 text-[0.7rem] font-body font-medium text-ink bg-cream rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {BRAND.phone}
              </span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative w-12 h-12 flex items-center justify-center rounded-full glass-strong text-ink/50 hover:text-ink hover:scale-110 transition-all duration-300"
              aria-label="回到頂部"
            >
              <ArrowUp size={18} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
