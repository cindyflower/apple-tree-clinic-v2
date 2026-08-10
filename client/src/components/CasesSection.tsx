/*
 * CasesSection — Liquid Glass Design / Mobile-First
 * Real case studies with clickable cards linking to detail sub-pages
 * Data sourced from old website drappletree.com.tw
 */
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { InternalLink } from "@/components/InternalLink";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight, Star, Quote, ArrowRight } from "lucide-react";
import { CASE_DETAILS } from "@/lib/caseDetails";
import { BRAND } from "@/lib/constants";

const testimonials = [
  {
    name: "陳小姐",
    age: "32歲",
    treatment: "皮秒蜂巢雷射",
    content: "做完皮秒雷射後，困擾我多年的斑點明顯淡化了。整個過程比想像中舒適，恢復期也很短，隔天就正常上班了。非常推薦！",
    rating: 5,
  },
  {
    name: "林小姐",
    age: "45歲",
    treatment: "海芙電波＋音波拉提",
    content: "組合療程的效果真的很驚艷！做完一個月後法令紋明顯變淺，整個臉型都提升了。朋友都問我是不是去度假回來，氣色變好了。",
    rating: 5,
  },
  {
    name: "王先生",
    age: "38歲",
    treatment: "水飛梭＋水光療程",
    content: "第一次嘗試醫美，蘋果樹的團隊讓我很安心。諮詢過程很仔細，完全沒有推銷壓力。水飛梭做完皮膚真的變得很透亮。",
    rating: 5,
  },
  {
    name: "張小姐",
    age: "28歲",
    treatment: "Talent-A 動磁波",
    content: "一直想要馬甲線但懶得運動，Talent-A 真的太神奇了！躺著 30 分鐘就像做了幾千次仰臥起坐，做完三次就看到線條了。",
    rating: 5,
  },
];

export default function CasesSection() {
  const { ref, inView } = useInView({ threshold: 0.05 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Extract unique categories from CASE_DETAILS
  const categories = ["all", ...Array.from(new Set(CASE_DETAILS.map((c) => c.category)))];

  const filteredCases = activeFilter === "all"
    ? CASE_DETAILS
    : CASE_DETAILS.filter((c) => c.category === activeFilter);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w * 0.8 : w * 0.8, behavior: "smooth" });
  };

  return (
    <section id="cases" className="py-24 lg:py-36 relative overflow-hidden" ref={ref}>
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-mist/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-champagne/5 rounded-full blur-[100px]" />

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
            Real Results
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            真實案例
            <span className="text-gradient-forest"> 見證蛻變</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            每一個故事都是真實客戶的蛻變紀錄，點擊查看完整案例故事。
          </p>
        </motion.div>

        {/* Category filter — horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`shrink-0 px-4 py-2 text-[0.9rem] font-body font-medium rounded-full transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-botanical text-cream shadow-sm"
                  : "bg-leaf-pale text-ink/50 hover:bg-sage-mist/20 hover:text-ink/70"
              }`}
            >
              {cat === "all" ? `全部案例 (${CASE_DETAILS.length})` : cat}
            </button>
          ))}
        </motion.div>

        {/* Cases grid — swipeable on mobile */}
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
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0"
          >
            {filteredCases.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06 }}
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[360px] snap-start"
              >
                <InternalLink
                  href={`/case/${c.slug}`}
                  className="block glass rounded-[1.2rem] overflow-hidden group card-hover hover:glow-sage transition-all duration-500 h-full"
                >
                  <div className="flex flex-col h-full">
                    {/* Case image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={c.cardImage}
                        alt={`${c.title} — 蘋果樹醫美真實案例`}
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to first image in array
                          if (c.images[0] && (e.target as HTMLImageElement).src !== c.images[0]) {
                            (e.target as HTMLImageElement).src = c.images[0];
                          }
                        }}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 text-[0.6rem] font-body font-semibold text-white bg-botanical/85 backdrop-blur-sm rounded-full">
                          真實案例
                        </span>
                        {c.highlight && (
                          <span className="px-2.5 py-1 text-[0.6rem] font-body font-semibold text-white bg-champagne/85 backdrop-blur-sm rounded-full">
                            熱門
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 text-[0.6rem] font-body text-white/90 bg-black/40 backdrop-blur-sm rounded-full">
                          {c.category}
                        </span>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-botanical/0 group-hover:bg-botanical/10 transition-colors duration-500 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 text-[0.9rem] font-body font-medium text-white bg-black/40 backdrop-blur-sm rounded-full">
                          查看完整故事 →
                        </span>
                      </div>
                    </div>

                    {/* Case info */}
                    <div className="p-5 flex-1 flex flex-col">
                      <span className="text-[0.65rem] font-body font-medium text-botanical/60 tracking-wider uppercase mb-1">
                        {c.treatment}
                      </span>
                      <h3 className="text-[1rem] font-heading font-medium text-ink mb-2 leading-tight line-clamp-2">
                        {c.title}
                      </h3>
                      <p className="text-[0.85rem] font-body font-light text-ink/50 leading-[1.7] mb-3 flex-1 line-clamp-3">
                        {c.articleText.split("\n").find((p) => p.trim().length > 30) || c.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {c.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-[0.6rem] font-body text-botanical/60 bg-botanical/5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-[0.65rem] font-body text-ink/30">{c.date}</span>
                      </div>
                    </div>
                  </div>
                </InternalLink>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Swipe hint on mobile */}
        <div className="flex items-center justify-center gap-1 mt-4 lg:hidden text-[0.7rem] font-body text-ink/30">
          <ChevronLeft size={12} />
          <span>左右滑動查看更多案例</span>
          <ChevronRight size={12} />
        </div>

        {/* Testimonials section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 lg:mt-20"
        >
          <h3 className="heading-editorial text-ink text-2xl sm:text-3xl text-center mb-10">
            客戶<span className="text-gradient-forest">真實好評</span>
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="glass rounded-[1.2rem] p-5 lg:p-6 group hover:glow-sage transition-all duration-500"
              >
                <Quote size={18} className="text-botanical/12 mb-3" />
                <p className="text-[0.8rem] font-body font-light text-ink/55 leading-[1.9] mb-4">
                  「{t.content}」
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={10} className="text-champagne fill-champagne" />
                  ))}
                </div>
                <div className="divider-glow mb-3" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[0.8rem] font-body font-medium text-ink">{t.name}</div>
                    <div className="text-[0.65rem] font-body text-ink/30">{t.age}</div>
                  </div>
                  <span className="px-2.5 py-1 text-[0.55rem] font-body text-botanical/60 bg-botanical/5 rounded-full">
                    {t.treatment}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-all duration-400 shadow-sm hover:shadow-lg hover:shadow-botanical/20"
          >
            預約免費諮詢，了解適合您的療程
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
