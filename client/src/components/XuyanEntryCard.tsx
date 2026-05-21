/*
 * XuyanEntryCard — V5: 序顏 IP 品牌區塊（全寬沉浸式設計）
 *
 * 設計哲學：
 *   - 外層 section 100vw 全寬，背景無限延伸至螢幕邊緣
 *   - 無外層 border / border-radius / box-shadow（不是卡片，是原生區塊）
 *   - 人物圖片以 mask-image 漸層融入背景，營造「站在網頁裡」的空間感
 *   - 內容安全區 max-w-7xl 置中
 *
 * CTA 1 → /face-test
 * CTA 2 → /xuyan-ai
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "wouter";
import { Sparkles, ChevronRight } from "lucide-react";
import { IMAGES } from "@/lib/imageAssets";

const STEPS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 24c0-4 3-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    title: "理解你的狀態",
    desc: "AI 多維度分析膚況與結構變化",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M14 4v10l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
    title: "判斷美學方向",
    desc: "找出影響比例與質感的關鍵因素",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 22c0-3 2.5-5.5 5.5-5.5h5c3 0 5.5 2.5 5.5 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    title: "銜接專人評估",
    desc: "由專業團隊為你規劃最適合的下一步",
  },
];

export default function XuyanEntryCard() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    /* ── Full-width section: NO border, NO border-radius, NO box-shadow ── */
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(165deg, #1a3a2a 0%, #2d4a3e 40%, #1e4030 100%)",
      }}
    >
      {/* ─── Decorative glow orbs (full-bleed) ─── */}
      <div className="absolute top-[-120px] left-[-80px] w-[500px] h-[500px] rounded-full bg-[#c5a572]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[400px] h-[400px] rounded-full bg-emerald-400/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full bg-emerald-300/5 blur-[80px] pointer-events-none" />
      {/* Rose-gold / pearl shimmer across full width */}
      <div className="absolute top-[60%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#dcc9a8]/6 blur-[100px] pointer-events-none" />

      {/* ─── Subtle wave decoration (full-width) ─── */}
      <div className="absolute top-[30%] left-0 right-0 h-[120px] opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60"
            fill="none"
            stroke="rgba(197,165,114,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ─── Inner content container (safe area) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-0"
        >
          {/* ── Left content — 3 cols ── */}
          <div className="lg:col-span-3 py-14 md:py-20 lg:py-24 px-6 sm:px-8 md:px-10 lg:px-14 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-6">
              <img loading="lazy" src={IMAGES.logoGreen}
                alt="蘋果樹 Dr. Appletree"
                className="w-12 h-12 object-contain opacity-80"
              />
            </div>

            {/* Tag badge */}
            <div className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-[0.7rem] font-body font-semibold tracking-[0.12em] text-[#c5a572] border border-[#c5a572]/30 bg-[#c5a572]/5">
                <Sparkles size={10} className="text-[#c5a572]" />
                30 秒看懂你的隱形老化方向
                <Sparkles size={10} className="text-[#c5a572]" />
              </span>
            </div>

            {/* Main headline */}
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-heading font-bold text-white/95 leading-[1.4] mb-3">
              你好，我是序顏。
              <br />
              <span className="text-[#c5a572]">你的 AI 美學管理師。</span>
            </h2>

            {/* Subtitle */}
            <p className="text-[1rem] font-body font-light text-white/55 leading-[1.9] mb-10 max-w-md">
              不是要你做更多，
              <br className="sm:hidden" />
              而是先幫你看懂現在最適合的下一步。
            </p>

            {/* ─── 3 Step cards ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/8 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-[#c5a572]/80">
                      {step.icon}
                    </div>
                    <h4 className="text-[0.8rem] font-body font-semibold text-white/90 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[0.65rem] font-body text-white/40 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {/* Connector sparkle between cards */}
                  {i < 2 && (
                    <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#c5a572]/50">
                      <Sparkles size={10} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Compliance text */}
            <p className="text-[0.65rem] font-body text-white/25 mb-6 leading-relaxed flex items-start gap-1.5">
              <span className="shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-white/30">i</span>
              AI 檢測結果僅作為初步參考，實際療程仍需由醫師與專業團隊評估。
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/face-test"
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-[1rem] font-body font-bold text-white rounded-xl transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #2d4a3e 0%, #3a5e4f 100%)",
                  border: "1px solid rgba(197,165,114,0.3)",
                }}
              >
                <Sparkles size={15} className="text-[#c5a572]" />
                開始序顏 AI 檢測
              </Link>
              <Link
                href="/xuyan-ai"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.9rem] font-body font-medium text-white/70 rounded-xl border border-white/15 hover:bg-white/5 hover:text-white/90 transition-all duration-300"
              >
                了解序顏怎麼幫你
                <ChevronRight size={14} className="text-white/40" />
              </Link>
            </div>
          </div>

          {/* ── Right — Hero image (desktop) with mask-image for seamless blending ── */}
          <div className="hidden lg:block lg:col-span-2 relative min-h-[540px]">
            {/* Left-edge gradient blend into the dark green background */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, #1e4030 0%, transparent 35%)",
              }}
            />
            <img loading="lazy" src={IMAGES.xuyanHero}
              alt="序顏 AI 美學管理師"
              className="w-full h-full object-cover object-[center_15%]"
             
              style={{
                /* Bottom edge fades into the section background — she "stands in" the page */
                maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
              }}
            />
            {/* Subtle gold sparkle decorations */}
            <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#c5a572]/30 animate-pulse z-20" />
            <div className="absolute top-[35%] right-[20%] w-1 h-1 rounded-full bg-[#c5a572]/25 animate-pulse z-20" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-[30%] left-[25%] w-1 h-1 rounded-full bg-[#c5a572]/35 animate-pulse z-20" style={{ animationDelay: "0.5s" }} />
          </div>
        </motion.div>
      </div>

      {/* ── Mobile hero image — below content, with mask-image blending ── */}
      <div className="lg:hidden relative h-[340px] sm:h-[400px] overflow-hidden -mt-4">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #1e4030 0%, transparent 20%, transparent 70%, #1e4030 100%)",
          }}
        />
        <img loading="lazy" src={IMAGES.xuyanHero}
          alt="序顏 AI 美學管理師"
          className="w-full h-full object-cover object-[center_15%]"
         
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
