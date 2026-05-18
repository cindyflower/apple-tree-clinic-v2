/*
 * DoctorsSection — Liquid Glass Design / Mobile-First
 * Real doctor photos with swipeable cards on mobile
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import { DOCTORS, IMAGES } from "@/lib/constants";

export default function DoctorsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({ left: dir === "left" ? -w * 0.7 : w * 0.7, behavior: "smooth" });
  };

  return (
    <section id="doctors" className="py-24 lg:py-36 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-leaf-pale/30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Our Team
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            專業
            <span className="text-gradient-forest"> 醫療團隊</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            由各領域專科醫師組成的堅強團隊，以豐富臨床經驗與專業認證，為您的美麗與健康把關。
          </p>
        </motion.div>

        {/* Team banner — real photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 lg:mb-14 rounded-[1.2rem] overflow-hidden"
        >
          <div className="relative h-48 sm:h-56 lg:h-72">
            <img
              src={IMAGES.teamBanner}
              alt="蘋果樹 Dr. Appletree 醫療團隊合照"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-[0.9rem] font-body font-medium text-white bg-botanical/70 backdrop-blur-sm rounded-full">
                <Award size={14} />
                蘋果樹醫療團隊
              </span>
            </div>
          </div>
        </motion.div>

        {/* Doctor cards — swipeable on mobile, grid on desktop */}
        <div className="relative">
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
            className="flex flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            {DOCTORS.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
                className="shrink-0 w-[170px] sm:w-[200px] lg:w-[220px] snap-start"
              >
                <div className="glass rounded-[1.2rem] overflow-hidden group hover:glow-sage transition-all duration-500">
                  {/* Doctor photo */}
                  <div className="relative h-52 sm:h-60 lg:h-64 overflow-hidden bg-leaf-pale/20">
                    <img
                      src={doc.image}
                      alt={`${doc.name} — 蘋果樹 Dr. Appletree ${doc.title}`}
                      className="block w-full h-full max-h-52 sm:max-h-60 lg:max-h-64 object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={220}
                      height={256}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent" />
                    {doc.alias && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 text-[0.55rem] font-body font-medium text-white bg-champagne/70 backdrop-blur-sm rounded-full">
                          {doc.alias}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Doctor info */}
                  <div className="p-3.5">
                    <h3 className="text-[1rem] font-heading font-medium text-ink mb-0.5">
                      {doc.name}
                    </h3>
                    <p className="text-[0.62rem] font-body text-botanical/60 mb-2">{doc.title}</p>
                    <div className="space-y-0.5">
                      {doc.credentials.slice(0, 3).map((c) => (
                        <div key={c} className="flex items-start gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-sage-mist/50 shrink-0 mt-1.5" />
                          <span className="text-[0.6rem] font-body text-ink/35 leading-tight">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Swipe hint on mobile */}
        <div className="flex items-center justify-center gap-1 mt-3 lg:hidden text-[0.7rem] font-body text-ink/30">
          <ChevronLeft size={12} />
          <span>左右滑動查看更多醫師</span>
          <ChevronRight size={12} />
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 glass-strong rounded-[1.2rem] p-5 lg:p-7"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { num: "8+", label: "專科醫師" },
              { num: "15+", label: "年平均經驗" },
              { num: "50,000+", label: "服務案例" },
              { num: "3", label: "服務據點" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl lg:text-2xl font-heading font-light text-botanical">{s.num}</div>
                <div className="text-[0.65rem] font-body text-ink/35 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
