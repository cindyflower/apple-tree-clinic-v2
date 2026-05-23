/*
 * ServicesSection — V3: 品牌品質動態篩選版
 * 設計哲學：Liquid Luxe — 以品牌語言呈現療程內容
 *
 * 接收外部 activeFilter (分類 ID 陣列) 來篩選顯示的分類
 * 完整包含 15 自費 + 2 健保 = 17 項分類
 * CSS Grid 療程卡片，含圖片、描述、特色標籤
 * 品牌文案取代工程師語言
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  Zap, Gem, Droplets, Scissors, Activity, Heart, Shield, Leaf,
  Sprout, Apple, Search, Smile, ShieldCheck, Sparkles, Flower2,
  ChevronRight, Check, Stethoscope, Brain, ArrowRight
} from "lucide-react";
import { SERVICE_CATEGORIES, NHI_SERVICES, BRAND } from "@/lib/constants";
import { type CategoryId, MANAGEMENT_MAPPING, MANAGEMENT_DESCRIPTIONS, CATEGORY_DESCRIPTIONS } from "@/lib/serviceMapping";
import { getTreatmentSlug } from "@/lib/treatmentSlugMap";
import { InternalLink } from "@/components/InternalLink";

const iconMap: Record<string, React.ElementType> = {
  Zap, Gem, Droplets, Scissors, Activity, Heart, Shield, Leaf,
  Sprout, Apple, Search, Smile, ShieldCheck, Sparkles, Flower2,
  Stethoscope, Brain,
};

// Merge SERVICE_CATEGORIES + NHI_SERVICES into unified array
const ALL_CATEGORIES = [
  ...SERVICE_CATEGORIES,
  ...NHI_SERVICES.map((nhi) => ({
    id: nhi.id,
    name: nhi.name,
    nameEn: nhi.id === "nhi-skin" ? "NHI Dermatology" : "Pain Management",
    icon: nhi.id === "nhi-skin" ? "Stethoscope" : "Brain",
    description: `${nhi.description}（${nhi.location}提供）`,
    items: [
      {
        name: nhi.name,
        description: `${nhi.description}（${nhi.location}提供）`,
        features: ["健保給付", nhi.location, "專業診療", "預約制"],
      },
    ],
  })),
];

interface ServicesSectionProps {
  activeFilter?: CategoryId[] | null;
  filterLabel?: string | null;
  onFilterClear?: () => void;
}

export default function ServicesSection({ activeFilter, filterLabel, onFilterClear }: ServicesSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.05 });
  const [activeCat, setActiveCat] = useState<string>(ALL_CATEGORIES[0].id);

  // When external filter changes, update display
  useEffect(() => {
    if (activeFilter && activeFilter.length > 0) {
      setActiveCat(activeFilter[0]);
    }
  }, [activeFilter]);

  // Determine which categories to show in tabs
  const visibleCategories = activeFilter && activeFilter.length > 0
    ? ALL_CATEGORIES.filter((c) => activeFilter.includes(c.id as CategoryId))
    : ALL_CATEGORIES;

  const activeCatData = ALL_CATEGORIES.find((c) => c.id === activeCat);

  // Determine if filterLabel matches a management direction or a single category
  const isManagementFilter = filterLabel ? Object.keys(MANAGEMENT_MAPPING).includes(filterLabel) : false;

  // V4 Dynamic Two-Layer Title Logic
  const getDynamicTitle = () => {
    // Default state (no filter)
    if (!activeFilter || activeFilter.length === 0) {
      return (
        <>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.6rem] leading-snug mb-4">
            從膚況、輪廓到健康狀態，
            <br className="hidden sm:block" />
            找到你的<span className="text-gradient-forest">管理方向</span>。
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-xl mx-auto leading-[1.85]">
            蘋果樹將服務整理為四大管理方向，讓你不用先懂療程名稱，也能從自己的需求開始理解適合的選擇。
          </p>
        </>
      );
    }

    // Scenario A: Management direction clicked
    if (isManagementFilter && filterLabel) {
      const desc = MANAGEMENT_DESCRIPTIONS[filterLabel] || "";
      return (
        <>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] leading-snug mb-3">
            目前管理方向：<span className="text-gradient-forest">{filterLabel}</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-xl mx-auto leading-[1.85]">
            {desc}
          </p>
        </>
      );
    }

    // Scenario B: Single category or hot service clicked
    if (filterLabel && activeCatData) {
      const catName = activeCatData.name;
      const desc = CATEGORY_DESCRIPTIONS[activeCat] || `你目前看到的是${catName}相關內容。`;
      return (
        <>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] leading-snug mb-3">
            目前服務分類：<span className="text-gradient-forest">{catName}</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-xl mx-auto leading-[1.85]">
            {desc}
          </p>
        </>
      );
    }

    // Fallback
    return (
      <>
        <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.6rem] leading-snug mb-4">
          從膚況、輪廓到健康狀態，
          <br className="hidden sm:block" />
          找到你的<span className="text-gradient-forest">管理方向</span>。
        </h2>
        <p className="text-[1rem] font-body font-light text-ink/45 max-w-xl mx-auto leading-[1.85]">
          蘋果樹將服務整理為四大管理方向，讓你不用先懂療程名稱，也能從自己的需求開始理解適合的選擇。
        </p>
      </>
    );
  };

  return (
    <section id="services" className="py-24 lg:py-36 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-leaf-pale/30 to-cream" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-sage-mist/8 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        {/* Header — V4 Dynamic Two-Layer Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          {/* 上層小標（固定概念） */}
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            SERVICES 健康美麗管理入口
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>

          {/* 下層主標與說明（隨點選動態更新） */}
          {getDynamicTitle()}
        </motion.div>

        {/* Filter status — clear button */}
        {activeFilter && activeFilter.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <button
              onClick={() => onFilterClear?.()}
              className="text-[0.76rem] font-body text-ink/40 hover:text-ink/60 bg-botanical/5 px-4 py-2 rounded-full border border-botanical/12 hover:border-botanical/20 transition-all"
            >
              ← 顯示全部服務
            </button>
          </motion.div>
        )}

        {/* Category tabs — horizontal scroll on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:justify-center mb-8">
            {visibleCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-[0.74rem] font-body font-medium rounded-full transition-all duration-300 ${
                    activeCat === cat.id
                      ? "bg-botanical text-cream shadow-sm shadow-botanical/20"
                      : "bg-white/80 text-ink/50 hover:bg-white hover:text-ink/70 border border-border/40"
                  }`}
                >
                  <Icon size={13} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Active category content — V3 redesign */}
          <AnimatePresence mode="wait">
            {activeCatData && (
              <motion.div
                key={activeCatData.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {/* Category header card */}
                <div className="glass rounded-2xl p-6 lg:p-8 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-botanical/8 flex items-center justify-center shrink-0">
                      {(() => {
                        const CatIcon = iconMap[activeCatData.icon] || Sparkles;
                        return <CatIcon size={20} className="text-botanical" />;
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <h3 className="text-[1.2rem] font-heading font-medium text-ink">
                          {activeCatData.name}
                        </h3>
                        <span className="text-[0.7rem] font-body font-normal text-ink/25">
                          {activeCatData.nameEn}
                        </span>
                      </div>
                      <p className="text-[0.95rem] font-body font-light text-ink/50 leading-[1.9] mb-3">
                        {activeCatData.description}
                      </p>

                      {/* Category meta — suitableFor, focusArea, highlight */}
                      {(activeCatData as any).suitableFor && (
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] font-body text-ink/40">
                          <span><span className="text-botanical/60 font-medium">適合對象：</span>{(activeCatData as any).suitableFor}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Treatment cards — CSS Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeCatData.items.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * idx }}
                      className="group rounded-xl border border-border/30 bg-white/70 backdrop-blur-sm overflow-hidden hover:border-botanical/20 card-hover transition-all duration-300"
                    >
                      {/* Image area */}
                      {(item as any).image ? (
                        <div className="relative h-40 sm:h-44 overflow-hidden bg-sage-mist/10">
                          <img loading="lazy" src={(item as any).image}
                            alt={`${item.name} — 蘋果樹 Dr. Appletree`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                           
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      ) : (
                        <div className="h-24 sm:h-28 bg-gradient-to-br from-sage-mist/10 to-botanical/5 flex items-center justify-center">
                          {(() => {
                            const ItemIcon = iconMap[activeCatData.icon] || Sparkles;
                            return <ItemIcon size={28} className="text-botanical/20" />;
                          })()}
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-4 lg:p-5">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h4 className="text-[1rem] font-body font-medium text-ink leading-tight">
                            {item.name}
                          </h4>
                          {(item as any).subtitle && (
                            <span className="text-[0.62rem] font-body text-botanical/60 bg-botanical/5 px-2 py-0.5 rounded-full">
                              {(item as any).subtitle}
                            </span>
                          )}
                        </div>

                        <p className="text-[0.85rem] font-body font-light text-ink/45 leading-[1.85] mb-3 line-clamp-3">
                          {item.description}
                        </p>

                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.features.slice(0, 4).map((f) => (
                            <span key={f} className="flex items-center gap-0.5 px-2 py-0.5 text-[0.62rem] font-body text-botanical/60 bg-botanical/5 rounded-full">
                              <Check size={9} className="text-botanical/50" />
                              {f}
                            </span>
                          ))}
                        </div>

                        {/* CTA — link to detail page if available, otherwise LINE */}
                        {(() => {
                          const slug = getTreatmentSlug(item.name);
                          return slug ? (
                            <InternalLink
                              href={`/treatment/${slug}`}
                              className="inline-flex items-center gap-1 text-[0.73rem] font-body font-medium text-botanical/70 hover:text-botanical transition-colors group/cta"
                            >
                              了解更多
                              <ChevronRight size={13} className="group-hover/cta:translate-x-0.5 transition-transform" />
                            </InternalLink>
                          ) : (
                            <a
                              href={BRAND.lineUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[0.73rem] font-body font-medium text-botanical/70 hover:text-botanical transition-colors group/cta"
                            >
                              預約諮詢
                              <ChevronRight size={13} className="group-hover/cta:translate-x-0.5 transition-transform" />
                            </a>
                          );
                        })()}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Category-level CTA */}
                <div className="mt-8 text-center">
                  <a
                    href={BRAND.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-[0.9rem] font-body font-medium text-botanical border border-botanical/20 rounded-full hover:bg-botanical/5 transition-all duration-200"
                  >
                    預約{activeCatData.name}諮詢
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
