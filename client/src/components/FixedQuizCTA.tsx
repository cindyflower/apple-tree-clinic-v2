/*
 * FixedQuizCTA — Fixed bottom CTA bar for quiz
 * Only appears when user scrolls down past the hero
 * Routes to /face-test
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function FixedQuizCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed left-0 right-0 z-50 lg:hidden"
          style={{
            bottom: "calc(4.5rem + max(0.75rem, env(safe-area-inset-bottom, 0px)))",
          }}
        >
          <div className="mx-3">
            <Link
              href="/face-test"
              className="flex items-center justify-center gap-2 w-full py-3.5 text-[1rem] font-body font-bold text-forest-deep bg-gold-light rounded-2xl shadow-xl shadow-gold/30 hover:bg-gold transition-all duration-300"
            >
              <Sparkles size={17} />
              回到測驗 →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
