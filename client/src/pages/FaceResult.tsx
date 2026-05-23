/*
 * FaceResult — 臉部老化測驗結果頁 (v4)
 * /face-result?primary=sagging&secondary=collagen&mixed=1
 *
 * v4 changes:
 * - Premium share card template (珍珠白底、玫瑰金光暈)
 * - Share link uses current site origin + /face-test
 * - Dynamic copy per aging type
 * - Mobile Web Share API + download support
 * - Share card preview before download
 */
import { useState, useEffect, useRef, useCallback } from "react";
import VideoSoundToggle from "@/components/VideoSoundToggle";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Download,
  Copy,
  MessageCircle,
  Phone,
  RotateCcw,
  Layers,
  Hexagon,
  Gem,
} from "lucide-react";
import { Link, useSearch } from "wouter";

import {
  AGING_RESULTS,
  MIXED_TYPE_COPY,
  TYPE_NAMES,
  type AgingType,
} from "@/lib/faceTestData";
import { BRAND } from "@/lib/constants";
import { runtimeSiteUrl } from "@/lib/siteUrl";
import { IMAGES } from "@/lib/imageAssets";
import {
  trackViewResult,
  trackClickReservation,
  trackClickShare,
  trackClickLineConsult,
  trackDownloadShareCard,
  trackCopyLink,
  trackCompleteFaceTestPixel,
} from "@/lib/tracking";

// ─── 4R Mapping: AgingType → 4R Strategy ───
const FOUR_R_MAP: Record<
  AgingType,
  {
    tag: string;
    title: string;
    description: string;
    icon: typeof RotateCcw;
    accent: string;
    iconColor: string;
    tagColor: string;
  }
> = {
  sagging: {
    tag: "Reshape",
    title: "重塑輪廓",
    description:
      "你的困擾主要是下顎線模糊與臉型鬆散。現在該優先處理的是輪廓線條，讓臉型更俐落、更乾淨，之後再做其他保養才會有感。",
    icon: Hexagon,
    accent: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
    tagColor: "text-sky-700 bg-sky-100",
  },
  collagen: {
    tag: "Rebuild",
    title: "重建支撐",
    description:
      "你的臉開始出現凹陷與蘋果肌下垂。現在更需要先把支撐感建立起來，讓臉看起來更飽滿、更有精神，解決疲憊感。",
    icon: Layers,
    accent: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    tagColor: "text-amber-700 bg-amber-100",
  },
  skin: {
    tag: "Reset",
    title: "重啟膚況",
    description:
      "你的臉看起來暗沉、疲憊、膚色不均。現在最需要的是先把膚況整理乾淨，讓肌膚回到穩定、明亮、清爽的狀態。",
    icon: RotateCcw,
    accent: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    tagColor: "text-emerald-700 bg-emerald-100",
  },
  fatigue: {
    tag: "Renew",
    title: "更新質感",
    description:
      "你的肌膚開始出現細紋、毛孔與整體質感下降。現在更需要的是整體質感升級，提升整張臉的精緻度與年輕感。",
    icon: Gem,
    accent: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-500",
    tagColor: "text-rose-700 bg-rose-100",
  },
};

// ─── Static Share Card Images (pre-designed, no dynamic generation) ───
const SHARE_CARD_IMAGES: Record<AgingType, string> = {
  sagging: IMAGES.faceSagging,
  collagen: IMAGES.faceCollagen,
  skin: IMAGES.faceSkin,
  fatigue: IMAGES.faceFatigue,
};

// Detect mobile
const isMobile = () =>
  typeof navigator !== "undefined" &&
  /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

function getFaceTestShareUrl(): string {
  return runtimeSiteUrl("/face-test");
}

export default function FaceResult() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const VALID_TYPES: AgingType[] = ["sagging", "collagen", "skin", "fatigue"];
  const rawPrimary = params.get("primary") || params.get("type") || "sagging";
  const primaryType: AgingType = VALID_TYPES.includes(rawPrimary as AgingType) ? (rawPrimary as AgingType) : "sagging";
  const rawSecondary = params.get("secondary");
  const secondaryType: AgingType | null = rawSecondary && VALID_TYPES.includes(rawSecondary as AgingType) ? (rawSecondary as AgingType) : null;
  const isMixed = params.get("mixed") === "1" && secondaryType;

  const primaryResult = AGING_RESULTS[primaryType] || AGING_RESULTS.sagging;
  const secondaryResult = secondaryType ? AGING_RESULTS[secondaryType] : null;
  const fourR = FOUR_R_MAP[primaryType] || FOUR_R_MAP.sagging;

  // Static share card — always available, no generation needed
  const shareCardUrl = SHARE_CARD_IMAGES[primaryType] || SHARE_CARD_IMAGES.sagging;
  const [copied, setCopied] = useState(false);
  const [mobile] = useState(isMobile);
  const resultVideoRef = useRef<HTMLVideoElement>(null);

  // Track on mount
  useEffect(() => {
    trackViewResult(primaryType);
    trackCompleteFaceTestPixel();
  }, [primaryType]);



  // Download share card — open image in new tab for save
  // CDN does not support CORS, so we open the image directly
  const downloadCard = useCallback(() => {
    if (!shareCardUrl) return;
    trackDownloadShareCard(primaryType);
    // Create a temporary link pointing directly to the CDN image
    const link = document.createElement("a");
    link.href = shareCardUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    // On mobile, long-press to save; on desktop, right-click to save
    link.click();
  }, [shareCardUrl, primaryType]);

  // Copy link
  const handleCopyLink = useCallback(() => {
    trackCopyLink(primaryType);
    navigator.clipboard.writeText(getFaceTestShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [primaryType]);

  // Native share (mobile) — share image if possible, fallback to link
  const handleNativeShare = useCallback(async () => {
    trackClickShare(primaryType);
    const resultName = isMixed
      ? `${TYPE_NAMES[primaryType]} × ${TYPE_NAMES[secondaryType!]}`
      : primaryResult.title;

    // Try sharing the image file
    if (shareCardUrl && navigator.canShare) {
      try {
        const response = await fetch(shareCardUrl);
        const blob = await response.blob();
        const file = new File([blob], `序顏AI測驗-${resultName}.png`, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `我測出來是「${resultName}」`,
            text: `我測完直接傻眼…原來我是【${resultName}】😱 你也測看看👇`,
            files: [file],
          });
          return;
        }
      } catch {
        // Fall through to link share
      }
    }

    // Fallback: share link
    if (navigator.share) {
      try {
        await navigator.share({
          title: `我測出來是「${resultName}」`,
          text: `我測完直接傻眼…原來我是【${resultName}】😱 你也測看看👇`,
          url: getFaceTestShareUrl(),
        });
      } catch {
        // cancelled
      }
    }
  }, [primaryType, isMixed, secondaryType, primaryResult.title, shareCardUrl]);

  // Display title
  const displayTitle = isMixed
    ? `${TYPE_NAMES[primaryType]} × ${TYPE_NAMES[secondaryType!]}`
    : primaryResult.title;

  const displaySubtitle = isMixed
    ? MIXED_TYPE_COPY.subtitle
    : primaryResult.subtitle;

  const displayDescription = isMixed
    ? MIXED_TYPE_COPY.description
    : primaryResult.description;

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur-xl border-b border-botanical/8">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-botanical/5 text-ink/50 hover:text-ink hover:bg-botanical/10 transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm">🍏</span>
              <span className="text-[0.8rem] font-heading font-semibold text-ink">
                {BRAND.name}
              </span>
            </div>
          </div>
          <span className="text-[0.9rem] font-body font-medium text-botanical">
            測驗結果
          </span>
        </div>
      </header>

      {/* ─── Result Content ─── */}
      <main className="container max-w-xl mx-auto py-8 md:py-12">
        {/* ① Result type badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-[0.7rem] font-body font-semibold tracking-[0.1em] text-botanical bg-botanical/8 rounded-full">
            {isMixed ? "你的老化訊號屬於混合型" : "你的老化類型"}
          </span>
        </motion.div>

        {/* ② Result title + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="text-4xl mb-3">{primaryResult.emoji}</div>
          <h1 className="text-[clamp(1.4rem,5vw,2.2rem)] heading-display text-ink">
            {displayTitle}
          </h1>
          <p className="mt-3 text-[0.95rem] font-body text-botanical font-medium leading-relaxed max-w-md mx-auto">
            {displaySubtitle}
          </p>
        </motion.div>

        {/* ③ Video — autoplay muted loop + sound toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-2"
        >
          <div className="w-full max-w-[1080px] mx-auto aspect-[9/16] md:aspect-video overflow-hidden rounded-3xl bg-forest-deep/5 relative">
            <video
              ref={resultVideoRef}
              src={primaryResult.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
            <VideoSoundToggle videoRef={resultVideoRef} />
          </div>
        </motion.div>

        {/* Video disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[0.65rem] font-body text-ink/25 text-center mb-8"
        >
          此為老化型態示意，非實際診斷結果。
        </motion.p>

        {/* ④ Description card (狀態說明) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 p-5 md:p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-botanical/8"
        >
          <p className="text-[1rem] font-body text-ink/70 leading-[1.9]">
            {displayDescription}
          </p>
        </motion.div>

        {/* Mixed type: show both type details */}
        {isMixed && secondaryResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8 space-y-4"
          >
            {[primaryResult, secondaryResult].map((r) => (
              <div
                key={r.type}
                className="p-4 md:p-5 rounded-2xl bg-white/40 border border-botanical/8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{r.emoji}</span>
                  <h4 className="text-[1rem] font-heading font-semibold text-ink">
                    {r.title}
                  </h4>
                </div>
                <p className="text-[0.8rem] font-body text-ink/50 leading-relaxed">
                  {r.subtitle}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* ⑤ 4R Priority Strategy Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mb-10"
        >
          <h3 className="text-[0.8rem] font-body font-semibold text-ink/40 tracking-[0.15em] uppercase mb-4">
            序顏的 4R 建議
          </h3>

          <div
            className={`rounded-2xl border-2 p-6 md:p-7 ${fourR.accent} transition-all duration-300`}
          >
            {/* Icon + Tag row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/80 shadow-sm">
                <fourR.icon size={22} className={fourR.iconColor} />
              </div>
              <span
                className={`text-[0.65rem] font-body font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full ${fourR.tagColor}`}
              >
                {fourR.tag}
              </span>
            </div>

            {/* 4R Title */}
            <h4 className="text-[1rem] md:text-[1.1rem] font-heading font-semibold text-ink leading-snug mb-1">
              序顏建議你的優先管理方向：
            </h4>
            <p className="text-[1.15rem] md:text-[1.25rem] font-heading font-bold text-ink mb-4">
              【{fourR.tag} {fourR.title}】
            </p>

            {/* Divider */}
            <div className="w-full h-[1px] bg-black/5 mb-4" />

            {/* 4R Description */}
            <p className="text-[1rem] font-body text-ink/65 leading-[1.9]">
              {fourR.description}
            </p>
          </div>
        </motion.div>

        {/* ⑥ Recommendations (推薦療程方向) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-10"
        >
          <h3 className="text-[0.8rem] font-body font-semibold text-ink/40 tracking-[0.15em] uppercase mb-4">
            推薦療程方向
          </h3>
          <div className="space-y-3">
            {primaryResult.recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-botanical/8"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-botanical/10 flex items-center justify-center">
                  <span className="text-[0.9rem] font-body font-bold text-botanical">
                    {i + 1}
                  </span>
                </div>
                <span className="text-[0.85rem] font-body text-ink/70">{rec}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Share Section (V4 Premium) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-[0.8rem] font-body font-semibold text-ink/40 tracking-[0.15em] uppercase mb-4">
            分享你的結果
          </h3>

          {/* Static share card preview — always visible */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-botanical/10">
            <img src={shareCardUrl} alt={`${primaryResult.title} 分享圖卡`} className="w-full" />
          </div>

          <p className="text-[0.8rem] font-body text-ink/40 text-center mb-4">
            下載你的專屬分享圖，讓朋友也來測測看
          </p>

          {/* Share buttons — device-aware */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-3">
              {mobile ? (
                <>
                  <button
                    onClick={handleNativeShare}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
                  >
                    <Share2 size={15} />
                    立即分享
                  </button>
                  <button
                    onClick={downloadCard}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.85rem] font-body font-medium text-botanical bg-botanical/10 rounded-full hover:bg-botanical/20 transition-colors"
                  >
                    <Download size={15} />
                    儲存圖片
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={downloadCard}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
                  >
                    <Download size={15} />
                    儲存圖片
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.85rem] font-body font-medium text-botanical bg-botanical/10 rounded-full hover:bg-botanical/20 transition-colors"
                  >
                    <Copy size={15} />
                    {copied ? "已複製！" : "複製連結"}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ⑦ CTA Section (最終轉單) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-forest-deep to-botanical"
        >
          <h3 className="text-[1.15rem] md:text-[1.3rem] heading-editorial text-cream/95 leading-snug">
            你的臉不是不能救，<br />是需要先看懂問題出在哪裡
          </h3>
          <p className="mt-3 text-[0.85rem] font-body text-cream/60 leading-[1.9]">
            這份測驗只是初步判斷。真正影響臉部年輕感的，還包括比例、鬆弛位置、凹陷層次、膚質狀態與醫師判斷。
          </p>
          <p className="mt-3 text-[0.9rem] font-body text-cream/50 leading-[1.9]">
            到診後，我們會用完整臉部評估，幫你看出：為什麼看起來累、鬆、平、老，以及你應該先處理哪一個問題，才不會花錯錢。
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[1rem] font-body font-bold text-white bg-[#06C755] rounded-xl hover:bg-[#05b34d] transition-colors shadow-lg"
              onClick={() => {
                trackClickReservation(primaryType, "reservation");
                trackClickLineConsult(primaryType);
              }}
            >
              <MessageCircle size={18} />
              預約完整臉部評估
            </a>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[1rem] font-body font-medium text-cream/90 border border-cream/20 rounded-xl hover:bg-cream/10 transition-colors"
              onClick={() => trackClickLineConsult(primaryType)}
            >
              <Phone size={16} />
              加入 LINE 詢問我的結果
            </a>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-[0.65rem] font-body text-cream/30 text-center leading-relaxed">
            初步測驗結果僅供參考，完整建議需由現場專業人員與醫師評估後確認。
          </p>
        </motion.div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-[0.8rem] font-body text-ink/30 hover:text-ink/50 transition-colors"
          >
            ← 回到首頁
          </Link>
        </div>
      </main>
    </div>
  );
}
