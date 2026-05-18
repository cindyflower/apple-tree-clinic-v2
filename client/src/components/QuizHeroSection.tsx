/*
 * QuizHeroSection — Section 1: Hero 首屏
 * 鎖定 hero-visual.jpg 背景，僅替換文字與 CTA
 * 品牌定位：蘋果樹 Dr. Appletree — 健康美麗管理品牌
 */
import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { BRAND } from "@/lib/constants";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/hero-visual_0e1c21df.jpg";

export default function QuizHeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Background image — full bleed, object-fit: cover */}
      <img
        src={HERO_IMG}
        alt="蘋果樹 Dr. Appletree"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Overlays — ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/55 to-forest-deep/15 md:from-forest-deep/78 md:via-forest-deep/45 md:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-forest-deep/20" />
      {/* Subtle warm overlay for text area */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full container flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* 小標 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.65rem] md:text-[0.7rem] font-body font-medium tracking-[0.15em] text-gold-light/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <Sparkles size={12} className="text-gold" />
              AI 檢測 × 醫師評估 × 專屬追蹤
            </span>
          </motion.div>

          {/* 主標 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="heading-display"
          >
            <span className="block text-[clamp(1.8rem,6vw,3.8rem)] text-white/95 leading-tight">美麗是一種管理，</span>
            <span className="block text-[clamp(1.8rem,6vw,3.8rem)] text-gold-light leading-tight">健康，也是一種管理</span>
          </motion.h1>

          {/* 副標 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 md:mt-6 text-[1.05rem] md:text-[1.25rem] font-body font-normal text-white/80 leading-[1.9] max-w-xl"
          >
            從肌膚、輪廓、體態到代謝狀態，蘋果樹以醫師評估為核心，結合 AI 檢測與專屬追蹤，陪你看懂狀態、規劃方向，並持續調整。
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            {/* Primary — 開始 AI 肌膚檢測 */}
            <Link
              href="/face-test"
              className="flex items-center justify-center gap-2 px-8 py-4 text-[0.95rem] font-body font-bold text-forest-deep bg-gold-light rounded-full hover:bg-gold transition-all duration-300 shadow-lg shadow-gold/25 pulse-cta"
            >
              <Sparkles size={18} />
              開始 AI 肌膚檢測
            </Link>

            {/* Secondary — 預約健康美麗諮詢 */}
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-medium text-white/90 bg-transparent rounded-full border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <MessageCircle size={16} />
              預約健康美麗諮詢
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-8 md:mt-14 flex items-center gap-6 md:gap-10 overflow-x-auto pb-2 scrollbar-none"
          >
            {[
              { num: "15+", label: "年臨床經驗" },
              { num: "50,000+", label: "滿意客戶" },
              { num: "3", label: "專業據點" },
              { num: "98%", label: "好評推薦" },
            ].map((stat) => (
              <div key={stat.label} className="shrink-0">
                <div className="trust-number text-gold-light tracking-tight">
                  {stat.num}
                </div>
                <div className="trust-label text-white/45 mt-1 tracking-wide whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
