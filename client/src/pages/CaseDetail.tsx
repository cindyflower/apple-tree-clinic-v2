/*
 * CaseDetail — 真實案例子頁面
 * Liquid Glass Design / Mobile-First
 * 
 * Shows full case story with images, article text, tags, and CTA
 * Content sourced from old website drappletree.com.tw
 */
import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "wouter";
import { InternalLink } from "@/components/InternalLink";
import { goBack } from "@/lib/scrollRestore";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { useSEO } from "@/hooks/useSEO";
import { ArticleSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import { motion } from "framer-motion";
import {
  ArrowLeft, MessageCircle, Phone, ChevronLeft, ChevronRight,
  Calendar, Tag, ExternalLink, Play
} from "lucide-react";
import { getCaseBySlug, CASE_DETAILS, type CaseDetail as CaseDetailType } from "@/lib/caseDetails";
import { getVideosByTreatmentSlug, getVideosByFrontendCategory, getCategoryLabel, type VideoItem } from "@/lib/videoData";
import { BRAND } from "@/lib/constants";

function CaseNotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="heading-editorial text-ink text-3xl mb-4">找不到此案例</h1>
        <p className="font-body text-ink/50 mb-8">此案例頁面不存在或已移除。</p>
        <button
          onClick={() => goBack(navigate, "/")}
          className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
        >
          <ArrowLeft size={16} />
          返回首頁
        </button>
      </div>
    </div>
  );
}

export default function CaseDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const caseData = useMemo(() => getCaseBySlug(params.slug || ""), [params.slug]);
  const [activeImage, setActiveImage] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useScrollRestore({ resetKey: params.slug, hashFallback: false });

  useEffect(() => {
    setActiveImage(0);
    setImgError({});
  }, [params.slug]);

  // SEO: dynamic meta tags, OG, canonical
  useSEO({
    title: caseData ? `${caseData.title}｜${BRAND.name} 真實案例` : '真實案例｜蘋果樹醫美',
    description: caseData?.subtitle || `${caseData?.title || ''} 的真實療程記錄與效果分享`,
    ogImage: caseData?.mainImage,
    canonical: `/case/${params.slug}`,
  });

  if (!caseData) return <CaseNotFound />;

  // Get related cases (same category, exclude self)
  const relatedCases = CASE_DETAILS.filter(
    (c) => c.category === caseData.category && c.id !== caseData.id
  ).slice(0, 3);

  // Valid images (filter out errored ones)
  const validImages = caseData.images.filter((_, i) => !imgError[i]);
  const displayImages = validImages.length > 0 ? caseData.images : [caseData.mainImage];

  // Split article text into paragraphs
  const paragraphs = caseData.articleText
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="min-h-screen bg-cream">
      <ArticleSchema
        title={caseData.title}
        description={caseData.subtitle}
        image={caseData.mainImage}
        datePublished={caseData.date || '2024-01-01'}
        slug={params.slug || ''}
      />
      <BreadcrumbSchema items={[
        { name: '首頁', url: '/' },
        { name: '真實案例', url: '/#cases' },
        { name: caseData.title, url: `/case/${params.slug}` },
      ]} />
      {/* Sticky top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-cream/80 backdrop-blur-xl border-b border-botanical/8 shadow-sm shadow-botanical/3">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => goBack(navigate, "/")}
            className="flex items-center gap-2 text-[0.8rem] font-body font-medium text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">返回首頁</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">🍏</span>
            <span className="text-[0.85rem] font-heading font-semibold text-ink">{BRAND.name}</span>
          </div>
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 text-[0.9rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
          >
            <MessageCircle size={13} />
            預約諮詢
          </a>
        </div>
      </div>

      {/* Hero image with gallery */}
      <section className="relative pt-14">
        <div className="relative h-[55vh] min-h-[350px] max-h-[550px] bg-ink/5">
          <img
            src={displayImages[activeImage] || caseData.mainImage}
            alt={`${caseData.title} — ${BRAND.name}`}
            className="w-full h-full object-cover"
            onError={() => {
              setImgError((prev) => ({ ...prev, [activeImage]: true }));
              if (activeImage > 0) setActiveImage(0);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-forest-deep/10" />

          {/* Image navigation */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 transition-colors"
                aria-label="上一張"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % displayImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-full text-white/80 hover:bg-black/50 transition-colors"
                aria-label="下一張"
              >
                <ChevronRight size={18} />
              </button>
              {/* Dots */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5">
                {displayImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeImage ? "bg-white w-5" : "bg-white/40"
                    }`}
                    aria-label={`查看第 ${i + 1} 張圖片`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-10">
            <div className="container">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-[0.6rem] font-body font-semibold text-white bg-botanical/80 backdrop-blur-sm rounded-full">
                  真實案例
                </span>
                <span className="px-2.5 py-1 text-[0.6rem] font-body text-white/90 bg-black/30 backdrop-blur-sm rounded-full">
                  {caseData.category}
                </span>
                {caseData.hotTopic && (
                  <span className="hidden sm:inline-flex px-2.5 py-1 text-[0.6rem] font-body font-semibold text-gold-light bg-gold/20 backdrop-blur-sm rounded-full border border-gold/20">
                    {caseData.hotTopic}
                  </span>
                )}
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="heading-editorial text-white text-[clamp(1.3rem,4vw,2.2rem)] leading-tight mb-1"
              >
                {caseData.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[0.8rem] font-body font-light text-white/60"
              >
                {caseData.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section className="bg-white/60 backdrop-blur-sm border-b border-botanical/8">
        <div className="container py-3 flex items-center gap-4 text-[0.72rem] font-body text-ink/40 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            <Calendar size={13} />
            <span>{caseData.date}</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Tag size={13} />
            <span>{caseData.treatment}</span>
          </div>
          <a
            href={caseData.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 shrink-0 hover:text-botanical transition-colors ml-auto"
          >
            <ExternalLink size={12} />
            <span>原文出處</span>
          </a>
        </div>
      </section>

      {/* Article content */}
      <div className="container py-10 lg:py-14">
        <div className="max-w-3xl mx-auto">

          {caseData.youtubeVideoId && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-12"
            >
              <SectionLabel text="案例影片" />
              <h2 className="heading-editorial text-ink text-xl lg:text-2xl mb-5">
                案例<span className="text-gradient-forest"> 真實分享</span>
              </h2>
              <div className="relative mx-auto max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-ink/5 shadow-lg shadow-botanical/10">
                <iframe
                  src={`https://www.youtube.com/embed/${caseData.youtubeVideoId}?rel=0`}
                  title={`${caseData.title} — YouTube`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.section>
          )}

          {/* Article text */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[1rem] font-body font-light text-ink/65 leading-[2.1] mb-5"
              >
                {p}
              </p>
            ))}
          </motion.article>

          {/* Image gallery grid (if multiple images) */}
          {caseData.images.length > 1 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <SectionLabel text="療程紀錄" />
              <h2 className="heading-editorial text-ink text-xl lg:text-2xl mb-5">
                更多<span className="text-gradient-forest"> 紀錄照片</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {caseData.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setActiveImage(i)}
                  >
                    <img
                      src={img}
                      alt={`${caseData.title} 紀錄照片 ${i + 1}`}
                      className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2">
              {caseData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[0.72rem] font-body text-botanical/70 bg-botanical/5 rounded-full border border-botanical/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Videos */}
          <RelatedVideos caseSlug={caseData.slug} category={caseData.category} playingVideo={playingVideo} setPlayingVideo={setPlayingVideo} />

          {/* Related cases */}
          {relatedCases.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <SectionLabel text="相關案例" />
              <h2 className="heading-editorial text-ink text-xl lg:text-2xl mb-5">
                更多<span className="text-gradient-forest"> {caseData.category}案例</span>
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedCases.map((rc) => (
                  <InternalLink
                    key={rc.id}
                    href={`/case/${rc.slug}`}
                    className="glass rounded-xl overflow-hidden group hover:glow-sage transition-all duration-500"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={rc.cardImage}
                        alt={rc.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          const fallback = rc.mainImage;
                          if (fallback && img.src !== fallback) {
                            img.src = fallback;
                          }
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[0.55rem] font-body font-semibold text-white bg-botanical/80 backdrop-blur-sm rounded-full">
                        {rc.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-[0.9rem] font-heading font-medium text-ink mb-1 line-clamp-2 leading-tight">
                        {rc.title}
                      </h3>
                      <p className="text-[0.7rem] font-body text-ink/40">{rc.treatment}</p>
                    </div>
                  </InternalLink>
                ))}
              </div>
            </motion.section>
          )}

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="glass-dark rounded-2xl p-6 lg:p-10 text-center">
              <h2 className="heading-editorial text-white text-2xl lg:text-3xl mb-3">
                想要同樣的改變？
              </h2>
              <p className="text-[0.85rem] font-body font-light text-white/50 mb-6 max-w-md mx-auto leading-[1.9]">
                預約免費諮詢，由專業醫師為您量身評估最適合的{caseData.treatment}方案。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BRAND.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-semibold text-white bg-[#06C755] rounded-full hover:bg-[#05b34d] transition-all duration-300 shadow-lg shadow-[#06C755]/25 w-full sm:w-auto"
                >
                  <MessageCircle size={18} />
                  LINE 立即預約
                </a>
                <a
                  href={BRAND.phoneLink}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-medium text-white/80 bg-white/10 rounded-full border border-white/15 hover:bg-white/15 transition-all duration-300 w-full sm:w-auto"
                >
                  <Phone size={16} />
                  {BRAND.phone}
                </a>
              </div>
            </div>
          </motion.section>

          {/* Back to home */}
          <div className="text-center pb-8">
            <button
              onClick={() => goBack(navigate, "/")}
              className="inline-flex items-center gap-2 text-[0.8rem] font-body font-medium text-ink/40 hover:text-ink/60 transition-colors"
            >
              <ArrowLeft size={14} />
              返回首頁探索更多案例
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fixed CTA — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream/95 backdrop-blur-xl border-t border-botanical/10 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-2">
          <a
            href={BRAND.phoneLink}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 text-[0.85rem] font-body font-medium text-ink border border-botanical/20 rounded-full"
          >
            <Phone size={14} />
            電話諮詢
          </a>
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 flex-[2] py-2.5 text-[0.85rem] font-body font-semibold text-cream bg-[#06C755] rounded-full"
          >
            <MessageCircle size={14} />
            LINE 立即預約
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}

// ─── Sub-components ───

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="label-refined text-champagne inline-flex items-center gap-2 mb-3">
      <span className="w-5 h-[1px] bg-champagne/50" />
      {text}
      <span className="w-5 h-[1px] bg-champagne/50" />
    </span>
  );
}

function RelatedVideos({
  caseSlug,
  category,
  playingVideo,
  setPlayingVideo,
}: {
  caseSlug: string;
  category: string;
  playingVideo: string | null;
  setPlayingVideo: (id: string | null) => void;
}) {
  // First try videos directly related to this case, then fall back to same category
  // Map case categories to frontend video categories
  const catMap: Record<string, string> = {
    "肌膚管理": "skin-glow",
    "整型外科": "natural-beauty",
    "微整注射": "natural-beauty",
    "減重與形體雕塑": "body",
    "光電雷射": "contour",
  };
  const videoCatId = catMap[category] || "all";
  let videos = getVideosByFrontendCategory(videoCatId).slice(0, 4);
  if (videos.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <SectionLabel text="相關影片" />
      <h2 className="heading-editorial text-ink text-xl lg:text-2xl mb-5">
        療程<span className="text-gradient-forest"> 影音分享</span>
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {videos.slice(0, 4).map((video) => (
          <div key={video.id} className="glass rounded-xl overflow-hidden">
            {playingVideo === video.id ? (
              <div className="relative aspect-video">
                <iframe
                  src={`${video.embedUrl}?autoplay=1&rel=0`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setPlayingVideo(video.id)}
                className="relative w-full aspect-video group"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={20} className="text-botanical ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </button>
            )}
            <div className="p-3">
              <h3 className="text-[0.85rem] font-heading font-medium text-ink leading-tight line-clamp-2">
                {video.title}
              </h3>
              <p className="text-[0.65rem] font-body text-ink/35 mt-1">{video.frontendCategories.map(c => getCategoryLabel(c)).join(" / ")}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
