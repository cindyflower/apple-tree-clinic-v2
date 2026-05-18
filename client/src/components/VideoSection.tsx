/*
 * VideoSection — 美麗實境室 Beauty Reality Lab
 * Full redesign: new category system, featured logic, card with description & CTA
 * Mobile-first with horizontal scroll categories
 */
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Play, X, ChevronLeft, ChevronRight, Film, ExternalLink, MessageCircle } from "lucide-react";
import {
  UNIQUE_VIDEOS,
  getFeaturedVideos,
  getVideosByFrontendCategory,
  getFrontendCategoriesWithCounts,
  getCategoryDescription,
  type VideoItem,
} from "@/lib/videoData";
import { trackClickVideo } from "@/lib/analytics";

const LINE_URL = "https://lin.ee/Jgfv5Hl";

export default function VideoSection() {
  const { ref, inView } = useInView({ threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const catScrollRef = useRef<HTMLDivElement>(null);

  const categoriesWithCounts = getFrontendCategoriesWithCounts();

  // Homepage: show featured only; after "show all" or filter change: show filtered
  const isHomepageDefault = activeFilter === "all" && !showAll;
  const displayVideos = isHomepageDefault
    ? getFeaturedVideos()
    : getVideosByFrontendCategory(activeFilter);

  const categoryDescription = getCategoryDescription(activeFilter);

  const openVideo = useCallback((video: VideoItem) => {
    trackClickVideo({ button_text: video.title, section_name: '美麗實境室', treatment_name: video.frontendCategories?.[0] || '' });
    setActiveVideo(video);
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    setActiveVideo(null);
    document.body.style.overflow = "";
  }, []);

  const handleFilterChange = (catId: string) => {
    setActiveFilter(catId);
    if (catId !== "all") setShowAll(true);
  };

  const scrollCat = (dir: "left" | "right") => {
    if (!catScrollRef.current) return;
    const w = catScrollRef.current.offsetWidth;
    catScrollRef.current.scrollBy({ left: dir === "left" ? -w * 0.6 : w * 0.6, behavior: "smooth" });
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w * 0.8 : w * 0.8, behavior: "smooth" });
  };

  return (
    <>
      <section id="videos" className="py-24 lg:py-32 relative overflow-hidden bg-forest-deep/[0.02]" ref={ref}>
        {/* Background accents */}
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-botanical/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-champagne/4 rounded-full blur-[100px]" />

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 lg:mb-14"
          >
            <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-champagne/50" />
              Beauty Reality Lab
              <span className="w-6 h-[1px] bg-champagne/50" />
            </span>
            <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
              美麗
              <span className="text-gradient-forest">實境室</span>
            </h2>
            <p className="text-[1rem] font-body font-light text-ink/45 max-w-xl mx-auto leading-[1.9]">
              在預約以前，先看看真實的人如何理解自己的臉、膚況、輪廓與身體狀態。
              <br className="hidden sm:block" />
              這裡不是單純推薦療程，而是幫你找到更適合自己的美麗管理方式。
            </p>
          </motion.div>

          {/* Category filter — horizontal scroll on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mb-8"
          >
            {/* Desktop scroll arrows for categories */}
            <button
              onClick={() => scrollCat("left")}
              className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-ink/40 hover:text-ink shadow-sm transition-colors"
              aria-label="向左滾動分類"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scrollCat("right")}
              className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-ink/40 hover:text-ink shadow-sm transition-colors"
              aria-label="向右滾動分類"
            >
              <ChevronRight size={14} />
            </button>

            <div
              ref={catScrollRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0"
            >
              {categoriesWithCounts.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange(cat.id)}
                  className={`shrink-0 px-4 py-2 text-[0.72rem] font-body font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeFilter === cat.id
                      ? "bg-botanical text-cream shadow-sm"
                      : "bg-leaf-pale text-ink/50 hover:bg-sage-mist/20 hover:text-ink/70"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1 opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category description */}
          <AnimatePresence mode="wait">
            {categoryDescription && (
              <motion.p
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center text-[0.8rem] font-body font-light text-ink/40 mb-8 max-w-lg mx-auto"
              >
                {categoryDescription}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Video grid */}
          <div className="relative">
            {/* Desktop scroll arrows */}
            <button
              onClick={() => scroll("left")}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center glass-strong rounded-full text-ink/50 hover:text-ink transition-colors"
              aria-label="向左滾動"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center glass-strong rounded-full text-ink/50 hover:text-ink transition-colors"
              aria-label="向右滾動"
            >
              <ChevronRight size={18} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:overflow-visible"
            >
              {displayVideos.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }}
                  className="shrink-0 w-[80vw] sm:w-[320px] lg:w-auto snap-start"
                >
                  <div className="block w-full glass rounded-[1rem] overflow-hidden group card-hover hover:glow-sage transition-all duration-500">
                    {/* Thumbnail — clickable to play */}
                    <button
                      onClick={() => openVideo(video)}
                      className="w-full text-left"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img loading="lazy" src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                         
                        />
                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play size={22} className="text-botanical ml-1" fill="currentColor" />
                          </div>
                        </div>
                        {/* Category badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                          {video.frontendCategories.slice(0, 2).map((catId) => {
                            const catObj = categoriesWithCounts.find((c) => c.id === catId);
                            return catObj ? (
                              <span
                                key={catId}
                                className="px-2 py-0.5 text-[0.58rem] font-body font-semibold text-white bg-botanical/80 backdrop-blur-sm rounded-full"
                              >
                                {catObj.label}
                              </span>
                            ) : null;
                          })}
                        </div>
                        {video.isFeaturedHomepage && (
                          <span className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[0.6rem] font-body font-semibold text-gold-light bg-gold/20 backdrop-blur-sm rounded-full border border-gold/20">
                            精選
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="text-[0.9rem] font-heading font-medium text-ink mb-1.5 leading-tight line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-[0.7rem] font-body font-light text-ink/40 line-clamp-2 leading-[1.6] mb-3">
                        {video.description}
                      </p>
                      {/* CTA buttons */}
                      <div className="flex gap-2">
                        {video.relatedTreatments.length > 0 && (
                          <a
                            href={`/treatment/${video.relatedTreatments[0]}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.65rem] font-body font-medium text-botanical bg-botanical/8 rounded-full hover:bg-botanical/15 transition-colors"
                          >
                            了解適合我的療程
                          </a>
                        )}
                        <a
                          href={LINE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-[0.65rem] font-body font-medium text-champagne-dark bg-champagne/10 rounded-full hover:bg-champagne/20 transition-colors"
                        >
                          <MessageCircle size={11} />
                          預約諮詢
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Swipe hint on mobile */}
          <div className="flex items-center justify-center gap-1 mt-4 lg:hidden text-[0.7rem] font-body text-ink/30">
            <ChevronLeft size={12} />
            <span>左右滑動查看更多影片</span>
            <ChevronRight size={12} />
          </div>

          {/* Show all / Show less toggle */}
          {activeFilter === "all" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 text-[0.8rem] font-body font-medium text-ink/60 bg-white/60 backdrop-blur-sm rounded-full border border-botanical/10 hover:bg-botanical/5 hover:text-botanical transition-all duration-300"
              >
                <Film size={16} />
                {showAll ? `收起影片（顯示精選 ${getFeaturedVideos().length} 支）` : `查看全部 ${UNIQUE_VIDEOS.length} 支影片`}
              </button>
            </motion.div>
          )}

          {/* YouTube channel CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6"
          >
            <a
              href="https://www.youtube.com/channel/UCAWWtXWgdE9ltkJH_cPWvow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-body font-medium text-ink/40 hover:text-ink/60 transition-colors"
            >
              前往 YouTube 頻道
              <ExternalLink size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="關閉影片"
              >
                <X size={24} />
              </button>

              {/* Video embed */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  src={`${activeVideo.embedUrl}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video info below player */}
              <div className="mt-4 text-center">
                <h3 className="text-[0.95rem] font-heading font-medium text-white mb-1">
                  {activeVideo.title}
                </h3>
                <p className="text-[0.9rem] font-body text-white/50">
                  蘋果樹 Dr. Appletree
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
