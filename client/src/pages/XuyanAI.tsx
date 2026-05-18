/*
 * XuyanAI Page — /xuyan-ai
 * 獨立序顏頁面：完整介紹 + AI 檢測影片 + 流程影片 + 認識序顏圖 + CTA
 * 搬移自舊首頁的序顏完整內容
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "wouter";
import { Sparkles, MessageCircle, Brain, Target, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import VideoSoundToggle from "@/components/VideoSoundToggle";
import { BRAND } from "@/lib/constants";

const VIDEO_AI_DETECTION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/序顏Ai檢測_a9a7e486.mp4";
const VIDEO_PROCESS_FLOW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/介紹序顏如何幫助你的流程影片_f3b7f377.mp4";
const MEET_XUYAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/認識序顏_7d037d9e.png";

// ─── Section 1: 序顏是誰 ───
function WhoIsXuyan() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="py-20 md:py-28 bg-cream" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <Sparkles size={12} className="text-gold" />
            Meet 序顏
          </span>
          <h1 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.6rem] mb-6 leading-tight">
            你好，我是序顏。<br />
            <span className="text-gradient-forest">你的 AI 美學管理師。</span>
          </h1>
          <p className="text-[0.95rem] md:text-[1.05rem] font-body font-light text-ink/60 leading-[2] mb-6 max-w-2xl mx-auto">
            序顏，是蘋果樹專屬 AI 美學管理師。她會先理解你的狀態，再協助你判斷、規劃與追蹤，找到現在更適合的變美方向。
          </p>

          {/* 核心句 */}
          <blockquote className="inline-block px-6 py-3 bg-botanical/5 border-l-3 border-botanical/40 rounded-r-xl">
            <p className="text-[0.95rem] font-heading font-medium text-ink/75 italic">
              「不是讓你做更多，而是幫你做對下一步。」
            </p>
          </blockquote>

          {/* 三個重點 */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Brain, label: "理解你的狀態" },
              { icon: Target, label: "判斷美學方向" },
              { icon: Users, label: "銜接專人評估" },
            ].map((h) => (
              <div key={h.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-sage-mist/20 shadow-sm">
                <h.icon size={16} className="text-botanical" />
                <span className="text-[0.9rem] font-body font-medium text-ink/70">{h.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 2: 看序顏 AI 檢測怎麼運作 ───
function AIDetectionDemo() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-mist/6 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            AI Detection
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            看序顏 AI 檢測<span className="text-gradient-forest">怎麼運作</span>
          </h2>
          <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/50 leading-[1.9]">
            透過簡單互動與初步分析，序顏幫你更快整理目前的老化傾向與美學方向。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[1200px] mx-auto relative"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block rounded-3xl shadow-2xl shadow-botanical/8"
          >
            <source src={VIDEO_AI_DETECTION} type="video/mp4" />
          </video>
          <VideoSoundToggle videoRef={videoRef} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 3: 序顏 AI 如何幫你看懂老化傾向 ───
function ProcessFlow() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            How It Works
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            序顏 AI 如何幫你<br className="hidden sm:block" />
            <span className="text-gradient-forest">看懂目前的老化傾向？</span>
          </h2>
          <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/50 leading-[1.9]">
            從初步整理臉部狀態，到找到更適合自己的美學管理方向，序顏會先幫你看懂傾向，再由蘋果樹團隊協助規劃下一步。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[1200px] mx-auto relative"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block rounded-3xl shadow-2xl shadow-botanical/8"
            style={{ objectFit: "contain" }}
          >
            <source src={VIDEO_PROCESS_FLOW} type="video/mp4" />
          </video>
          <VideoSoundToggle videoRef={videoRef} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 4: 認識序顏三種型態 (靜態圖) ───
function MeetXuyanImage() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] mb-3">
            認識序顏的<span className="text-gradient-forest">三種互動型態</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/50 leading-[1.9]">
            當你有不同需求時，序顏會切換最適合的模式，陪你找到更適合自己的變美方向。
          </p>
        </motion.div>

        {/* Image container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            lineHeight: 0,
            fontSize: 0,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src={MEET_XUYAN_IMG}
            alt="認識序顏｜三種互動型態介紹"
            style={{ width: "100%", height: "auto", display: "block" }}
            loading="lazy"
            draggable={false}
          />

          {/* Hotspot A: 開始測驗 */}
          <Link
            href="/face-test"
            aria-label="開始 30 秒測驗"
            style={{
              position: "absolute",
              left: "48.9%",
              top: "89.1%",
              width: "22.6%",
              height: "6.6%",
              borderRadius: 12,
              cursor: "pointer",
              zIndex: 10,
            }}
          />

          {/* Hotspot B: 探索 4R */}
          <Link
            href="/#section-4r"
            aria-label="認識 4R 美學管理系統"
            style={{
              position: "absolute",
              left: "72.7%",
              top: "89.1%",
              width: "21.9%",
              height: "6.6%",
              borderRadius: 12,
              cursor: "pointer",
              zIndex: 10,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: 銜接蘋果樹專業團隊 + CTA ───
function TeamHandoff() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-forest-deep relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-botanical/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="heading-editorial text-white text-2xl sm:text-3xl lg:text-[2.2rem] mb-4">
            銜接蘋果樹<span className="text-gold-light">專業團隊</span>
          </h2>
          <p className="text-[1rem] md:text-[1rem] font-body font-light text-white/60 leading-[1.9] mb-10 max-w-xl mx-auto">
            序顏會先幫你做第一層美學整理，接下來由蘋果樹專業團隊協助你確認更適合的療程規劃。
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link
              href="/face-test"
              className="flex items-center justify-center gap-2 px-8 py-4 text-[0.95rem] font-body font-bold text-forest-deep bg-gold-light rounded-full hover:bg-gold transition-all duration-300 shadow-lg shadow-gold/25"
            >
              <Sparkles size={18} />
              開始序顏 AI 檢測
            </Link>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[1rem] font-body font-medium text-white/90 bg-transparent rounded-full border border-white/25 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <MessageCircle size={16} />
              預約專人分析
            </a>
          </div>

          {/* 合規小字 */}
          <p className="mt-8 text-[0.7rem] font-body text-white/30 leading-relaxed">
            AI 檢測結果僅作為初步參考，實際療程仍需由醫師與專業團隊依照個人狀況評估。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main Page ───
export default function XuyanAI() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main>
        <WhoIsXuyan />
        <AIDetectionDemo />
        <ProcessFlow />
        <MeetXuyanImage />
        <TeamHandoff />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
