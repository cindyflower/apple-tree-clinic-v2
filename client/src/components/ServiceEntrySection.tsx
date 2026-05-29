/*
 * ServiceEntrySection — V3: 品牌品質入口
 * 設計哲學：Liquid Luxe — 以品牌語言引導用戶找到管理方向
 *
 * Layer 1: 4 大管理方向 — 主要入口卡片（含描述文案）
 * Layer 2: 6 張熱門療程小卡 — 快速入口
 * Layer 3: 17 項完整服務 Chips — 次要篩選（預設展開，標註「或直接查看服務分類」）
 * 所有點擊觸發篩選 + 平滑捲動到 #services
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronDown, ChevronUp, Sparkles, Zap, Activity, Heart, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, NHI_SERVICES } from "@/lib/constants";
import { MANAGEMENT_MAPPING, HOT_SERVICE_MAPPING, type CategoryId } from "@/lib/serviceMapping";

// Layer 1: 4 大管理方向 — V3 品牌品質卡片
const MANAGEMENT_AREAS = [
  {
    title: "肌膚管理",
    icon: Sparkles,
    description: "從清潔、修護到煥膚，全方位提升膚質。",
    gradient: "from-emerald-50 to-teal-50/50",
    border: "border-emerald-100/60",
    hoverBorder: "hover:border-emerald-200",
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    accentLine: "bg-emerald-400",
  },
  {
    title: "輪廓管理",
    icon: Zap,
    description: "從五官比例、線條支撐到輪廓精修，建立更自然的臉部結構。",
    gradient: "from-amber-50 to-orange-50/40",
    border: "border-amber-100/60",
    hoverBorder: "hover:border-amber-200",
    iconBg: "bg-amber-100/80",
    iconColor: "text-amber-600",
    accentLine: "bg-amber-400",
  },
  {
    title: "體態代謝管理",
    icon: Activity,
    description: "從體態曲線、代謝狀態到營養支持，協助身形與健康同步管理。",
    gradient: "from-sky-50 to-blue-50/40",
    border: "border-sky-100/60",
    hoverBorder: "hover:border-sky-200",
    iconBg: "bg-sky-100/80",
    iconColor: "text-sky-600",
    accentLine: "bg-sky-400",
  },
  {
    title: "長期健康管理",
    icon: Heart,
    description: "從疲勞、氣色到日常健康狀態，建立更穩定的整體管理節奏。",
    gradient: "from-rose-50 to-pink-50/40",
    border: "border-rose-100/60",
    hoverBorder: "hover:border-rose-200",
    iconBg: "bg-rose-100/80",
    iconColor: "text-rose-600",
    accentLine: "bg-rose-400",
  },
];

// Layer 2: 6 張熱門療程小卡
const HOT_SERVICES = [
  { title: "醫學除毛" },
  { title: "雷射光電" },
  { title: "微整注射" },
  { title: "整形外科" },
  { title: "隆乳體雕" },
  { title: "減重管理" },
];

// Layer 3: 17 項完整分類 (15 自費 + 2 健保)
const ALL_CHIPS = [
  ...SERVICE_CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
  ...NHI_SERVICES.map((c) => ({ id: c.id, name: c.name })),
];

interface ServiceEntrySectionProps {
  onFilterChange: (filter: CategoryId[], label: string) => void;
}

export default function ServiceEntrySection({ onFilterChange }: ServiceEntrySectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showChips, setShowChips] = useState(false);

  const scrollToServices = () => {
    setTimeout(() => {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleManagementClick = (title: string) => {
    const mapping = MANAGEMENT_MAPPING[title];
    if (mapping) {
      onFilterChange(mapping, title);
      scrollToServices();
    }
  };

  const handleHotClick = (title: string) => {
    const mapping = HOT_SERVICE_MAPPING[title];
    if (mapping) {
      onFilterChange(mapping, title);
      scrollToServices();
    }
  };

  const handleChipClick = (id: string) => {
    onFilterChange([id as CategoryId], id);
    scrollToServices();
  };

  return (
    <section className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container">
        {/* Section Header — V3 brand copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto mb-12 md:mb-16 text-center"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Services
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] leading-snug mb-4">
            從膚況、輪廓到健康狀態，
            <br className="hidden sm:block" />
            找到你的<span className="text-gradient-forest">管理方向</span>。
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/50 leading-[1.85] max-w-lg mx-auto">
            蘋果樹將服務整理為四大管理方向，讓你不用先懂療程名稱，也能從自己的需求開始理解適合的選擇。
          </p>
        </motion.div>

        {/* Layer 1: 4 大管理方向 — V3 premium cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12">
          {MANAGEMENT_AREAS.map((area, i) => (
            <motion.button
              key={area.title}
              onClick={() => handleManagementClick(area.title)}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className={`group relative block rounded-2xl border ${area.border} ${area.hoverBorder} bg-gradient-to-br ${area.gradient} p-6 md:p-7 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.04] hover:-translate-y-1 text-left cursor-pointer overflow-hidden`}
            >
              {/* Accent line top */}
              <div className={`absolute top-0 left-6 right-6 h-[2px] ${area.accentLine} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full`} />

              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${area.iconBg} shadow-sm shrink-0`}>
                  <area.icon size={20} className={area.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[1.05rem] font-heading font-semibold text-ink mb-1.5 flex items-center gap-2">
                    {area.title}
                    <ArrowRight size={14} className="text-ink/20 group-hover:text-ink/40 group-hover:translate-x-0.5 transition-all duration-300" />
                  </h3>
                  <p className="text-[0.9rem] font-body font-light text-ink/50 leading-[1.85]">
                    {area.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Layer 2: 6 張熱門療程小卡 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-8"
        >
          <h3 className="text-[0.85rem] font-body font-medium text-ink/35 tracking-wider uppercase mb-4 text-center">
            熱門療程快速入口
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-[680px] mx-auto">
            {HOT_SERVICES.map((svc) => (
              <button
                key={svc.title}
                onClick={() => handleHotClick(svc.title)}
                className="block text-center h-[56px] px-5 rounded-xl bg-cream/80 border border-sage-mist/20 text-[1.1rem] font-body font-medium text-ink/65 hover:bg-botanical/8 hover:border-botanical/25 hover:text-botanical hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {svc.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Layer 3: 17 項完整服務 Chips — 次要篩選 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => setShowChips(!showChips)}
            className="inline-flex items-center gap-1.5 text-[0.85rem] font-body font-medium text-ink/35 hover:text-ink/55 transition-colors mb-4"
          >
            {showChips ? "收合分類列表" : "或直接查看服務分類"}
            {showChips ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showChips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap justify-center gap-2 mt-1"
            >
              {ALL_CHIPS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleChipClick(cat.id)}
                  className="inline-block px-3.5 py-1.5 rounded-full text-[0.74rem] font-body text-ink/55 bg-sage-mist/8 border border-sage-mist/12 hover:bg-botanical/5 hover:border-botanical/20 hover:text-botanical transition-all duration-200 cursor-pointer"
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
