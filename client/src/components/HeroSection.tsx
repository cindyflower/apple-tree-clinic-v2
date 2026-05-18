/*
 * HeroSection — Liquid Glass Design / Mobile-First
 * Full-viewport immersive hero with real brand imagery
 * Cinematic reveal + mobile-optimized layout
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Phone, MessageCircle } from "lucide-react";
import { BRAND, IMAGES } from "@/lib/constants";

const heroSlides = [
  {
    image: IMAGES.hero,
    alt: "蘋果樹 Dr. Appletree — 健康美麗管理品牌",
  },
  {
    image: IMAGES.heroBeauty,
    alt: "蘋果樹醫美 — 自然美學與健康生活",
  },
  {
    image: IMAGES.heroApple,
    alt: "蘋果樹醫美 — 再生醫學精準美學",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/50 to-forest-deep/20 md:from-forest-deep/75 md:via-forest-deep/40 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-forest-deep/20" />

      {/* Content */}
      <div className="relative z-10 h-full container flex flex-col justify-end pb-20 md:justify-center md:pb-0">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.65rem] md:text-[0.7rem] font-body font-medium tracking-[0.2em] uppercase text-gold-light/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              肌膚 × 輪廓 × 健康 的整體醫療管理
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="heading-display"
          >
            <span className="block text-[clamp(2.2rem,7vw,4.5rem)] text-white/95">美麗，</span>
            <span className="block text-[clamp(2.2rem,7vw,4.5rem)] text-gold-light">是一種管理</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 md:mt-6 text-[1rem] md:text-[1.05rem] font-body font-light text-white/60 leading-[1.9] max-w-lg"
          >
            醫療美學管理診所 | 結合整形外科 × 醫學美容 × 功能醫學，提供肌膚、輪廓與健康的整體醫療管理。
          </motion.p>

          {/* CTA buttons — Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-semibold text-white bg-[#06C755] rounded-full hover:bg-[#05b34d] transition-all duration-300 shadow-lg shadow-[#06C755]/25"
            >
              <MessageCircle size={18} />
              開始你的AI肌膚檢測 + 功能醫學評估
            </a>
            <button
              onClick={() => handleScroll("#about")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-medium text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              了解我們的醫療管理理念
            </button>
            <a
              href={BRAND.phoneLink}
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-medium text-white/70 sm:px-4 sm:py-2 hover:text-white transition-colors duration-300"
            >
              <Phone size={16} />
              <span className="sm:hidden">{BRAND.phone}</span>
            </a>
          </motion.div>

          {/* Stats — horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 md:mt-14 flex items-center gap-6 md:gap-10 overflow-x-auto pb-2 scrollbar-none"
          >
            {[
              { num: "15+", label: "年臨床經驗" },
              { num: "50,000+", label: "滿意客戶" },
              { num: "3", label: "專業據點" },
              { num: "98%", label: "好評推薦" },
            ].map((stat) => (
              <div key={stat.label} className="shrink-0">
                <div className="text-xl md:text-2xl font-heading font-light text-gold-light tracking-tight">
                  {stat.num}
                </div>
                <div className="text-[0.6rem] md:text-[0.65rem] font-body text-white/35 mt-1 tracking-wide whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === currentSlide ? "w-8 bg-gold-light" : "w-2 bg-white/30"
            }`}
            aria-label={`切換到第 ${i + 1} 張圖片`}
          />
        ))}
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-8 right-8 flex-col items-center gap-2 z-20"
      >
        <span className="text-[0.6rem] font-body text-white/30 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
