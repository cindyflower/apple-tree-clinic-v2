/*
 * TwoApplesSection — V4: 蘋果樹的兩顆蘋果
 * 
 * 升級重點：
 * - 每張卡片含電話 (tel:)、導航 (Google Maps)、LINE 預約 — 皆可點擊
 * - 卡片含完整地址、營業時間
 * - 手機版單欄、桌面雙欄
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Leaf, Crown, Phone, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { LINE_BY_APPLE } from "@/lib/constants";

const LOCATIONS = [
  {
    name: "綠蘋果北大",
    environmentId: "beida" as const,
    subtitle: "日常健康的安心基地",
    icon: Leaf,
    iconBg: "bg-emerald-100/70",
    iconColor: "text-emerald-600",
    gradient: "from-emerald-50/80 to-white",
    border: "border-emerald-100",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50",
    tags: "社區醫療 × 健康照護 × 醫美保養 × 長期管理",
    description: "陪伴社區家庭與日常健康需求，把健康、美麗與預防醫學放進生活裡。提供看診、慢籤開立、醫美保養、營養諮詢等服務。",
    address: "新北市三峽區大德路127號",
    phone: "(02) 8672-0222",
    phoneLink: "tel:+886286720222",
    hours: `週二：14:30–17:00、18:00–21:00
週三：08:30–12:00、13:30–17:00
週四：08:30–13:00、14:30–21:00
週五：14:30–21:00
週六：08:30–12:00
週日、週一公休`,
    lineUrl: LINE_BY_APPLE.beida.lineUrl,
    lineId: LINE_BY_APPLE.beida.lineId,
    branches: [
      { name: "北大診所（疾病健保看診）", phone: "(02) 8672-0222", phoneLink: "tel:+886286720222" },
      { name: "北大醫美（醫美保養）", phone: "(02) 8672-0608", phoneLink: "tel:+886286720608" },
    ],
  },
  {
    name: "金蘋果南京",
    environmentId: "nanjing" as const,
    subtitle: "精準美麗管理中心",
    icon: Crown,
    iconBg: "bg-amber-100/70",
    iconColor: "text-amber-600",
    gradient: "from-amber-50/80 to-white",
    border: "border-amber-100",
    accentColor: "text-amber-600",
    accentBg: "bg-amber-50",
    tags: "醫美諮詢 × 整形外科 × AI 檢測 × 自費健康管理",
    description: "位於南京東路小巨蛋商圈，從完整諮詢、檢測到療程節奏，協助你建立更適合自己的美麗管理計畫。",
    address: "台北市松山區南京東路三段309號3樓",
    phone: "(02) 2716-3535",
    phoneLink: "tel:+886227163535",
    hours: `週一至週五：12:00–21:00
週六：10:00–19:00
週日公休`,
    lineUrl: LINE_BY_APPLE.nanjing.lineUrl,
    lineId: LINE_BY_APPLE.nanjing.lineId,
    branches: [],
  },
];

type ClinicId = "nanjing" | "beida";

interface TwoApplesSectionProps {
  onNavigateToEnvironment?: (clinicId: ClinicId) => void;
}

export default function TwoApplesSection({ onNavigateToEnvironment }: TwoApplesSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="locations" className="py-20 md:py-28 bg-cream relative overflow-hidden" ref={ref}>
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Locations
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] mb-3">
            蘋果樹的<span className="text-gradient-forest">兩顆蘋果</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/50 leading-[1.9]">
            一顆照顧日常健康，一顆管理精準美麗。蘋果樹用不同型態的醫療場域，陪你管理人生不同階段的健康與美麗。
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {LOCATIONS.map((loc, i) => (
            <motion.button
              key={loc.name}
              type="button"
              onClick={() => onNavigateToEnvironment?.(loc.environmentId)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              aria-label={`${loc.name} — 查看院所環境`}
              className={`text-left w-full rounded-3xl border ${loc.border} bg-gradient-to-br ${loc.gradient} p-7 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-botanical/40`}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${loc.iconBg}`}>
                  <loc.icon size={22} className={loc.iconColor} />
                </div>
                <div>
                  <h3 className="text-[1.1rem] font-heading font-semibold text-ink">{loc.name}</h3>
                  <span className={`text-[0.72rem] font-body ${loc.accentColor}/80`}>{loc.subtitle}</span>
                </div>
              </div>

              {/* Tags */}
              <p className="text-[0.85rem] font-body font-medium text-ink/55 mb-3 tracking-wide">
                {loc.tags}
              </p>

              {/* Description */}
              <p className="text-[0.95rem] font-body font-light text-ink/55 leading-[1.9] mb-5">
                {loc.description}
              </p>

              {/* Info rows */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-ink/30 mt-0.5 shrink-0" />
                  <span className="text-[0.85rem] font-body text-ink/60">{loc.address}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-ink/30 mt-0.5 shrink-0" />
                  <span className="text-[0.85rem] font-body text-ink/60 whitespace-pre-line leading-relaxed">
                    {loc.hours}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-ink/30 shrink-0" />
                  <a
                    href={loc.phoneLink}
                    onClick={(e) => e.stopPropagation()}
                    className={`text-[0.85rem] font-body font-medium ${loc.accentColor} hover:underline`}
                  >
                    {loc.phone}
                  </a>
                </div>
                {/* Sub-branches */}
                {loc.branches.length > 0 && (
                  <div className="ml-6 space-y-1.5 pt-1">
                    {loc.branches.map((b) => (
                      <div key={b.name} className="flex items-center gap-2">
                        <span className="text-[0.7rem] font-body text-ink/40">{b.name}</span>
                        <a
                          href={b.phoneLink}
                          onClick={(e) => e.stopPropagation()}
                          className={`text-[0.7rem] font-body font-medium ${loc.accentColor} hover:underline`}
                        >
                          {b.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA buttons — all actionable */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={loc.phoneLink}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl ${loc.accentBg} border border-transparent hover:border-current/10 transition-all duration-200`}
                >
                  <Phone size={16} className={loc.accentColor} />
                  <span className={`text-[0.65rem] font-body font-medium ${loc.accentColor}`}>
                    撥打電話
                  </span>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl ${loc.accentBg} border border-transparent hover:border-current/10 transition-all duration-200`}
                >
                  <Navigation size={16} className={loc.accentColor} />
                  <span className={`text-[0.65rem] font-body font-medium ${loc.accentColor}`}>
                    導航前往
                  </span>
                </a>
                <a
                  href={loc.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${loc.name} LINE 預約 ${loc.lineId}`}
                  onClick={(e) => e.stopPropagation()}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl ${loc.accentBg} border border-transparent hover:border-current/10 transition-all duration-200`}
                >
                  <MessageCircle size={16} className={loc.accentColor} />
                  <span className={`text-[0.65rem] font-body font-medium ${loc.accentColor}`}>
                    LINE 預約
                  </span>
                </a>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
