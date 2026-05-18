/*
 * FourRSection — Section 4: 4R 美學管理系統
 * Updated copy per V1 spec
 * CSS Grid: 4 columns on desktop, 1-2 on mobile
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Link } from "wouter";
import { Sparkles, MessageCircle, RotateCcw, Layers, Hexagon, Gem } from "lucide-react";
import { BRAND } from "@/lib/constants";

const cards = [
  {
    icon: RotateCcw,
    tag: "Reset",
    title: "重整狀態",
    trigger: "當你的臉看起來暗沉、疲憊、粗糙、膚色不均時，代表現在最需要的是先把膚況整理乾淨。",
    focus: "讓肌膚回到穩定、明亮、清爽的狀態。",
    accent: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    tagColor: "text-emerald-700 bg-emerald-100",
  },
  {
    icon: Layers,
    tag: "Rebuild",
    title: "重建基礎",
    trigger: "當你的臉開始出現凹陷、膠原流失、法令紋加深、蘋果肌下垂時，代表現在更需要先把支撐感建立起來。",
    focus: "讓臉看起來更飽滿、更有精神。",
    accent: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    tagColor: "text-amber-700 bg-amber-100",
  },
  {
    icon: Hexagon,
    tag: "Reshape",
    title: "重塑輪廓",
    trigger: "當你的困擾是嘴邊肉、下顎線模糊、輪廓不清楚、臉型鬆散時，代表現在該優先處理的是輪廓線條。",
    focus: "讓臉型更俐落、更乾淨。",
    accent: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    tagColor: "text-sky-700 bg-sky-100",
  },
  {
    icon: Gem,
    tag: "Renew",
    title: "長期維持",
    trigger: "當你的肌膚開始出現細紋、毛孔、鬆弛、質感下降時，代表現在更需要的是整體質感升級。",
    focus: "提升精緻度與年輕感。",
    accent: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-500",
    tagColor: "text-rose-700 bg-rose-100",
  },
];

export default function FourRSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="section-4r" className="py-20 md:py-28 bg-cream relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sage-mist/6 rounded-full blur-[130px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            4R System
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            4R <span className="text-gradient-forest">美學管理系統</span>
          </h2>
          <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/50 leading-[1.9]">
            蘋果樹不是只看單一療程，而是先理解你的狀態，再依照肌膚、輪廓、體態與健康條件，規劃適合你的管理方向。
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-[1200px] mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.tag}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className={`rounded-2xl border p-6 md:p-7 ${card.accent} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon + Tag */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/70 shadow-sm">
                  <card.icon size={20} className={card.iconColor} />
                </div>
                <span className={`text-[0.65rem] font-body font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${card.tagColor}`}>
                  {card.tag}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[1.1rem] font-heading font-semibold text-ink mb-3">
                {card.title}
              </h3>

              {/* Trigger description */}
              <p className="text-[0.8rem] font-body font-light text-ink/55 leading-[1.9] mb-4">
                {card.trigger}
              </p>

              {/* Focus point */}
              <div className="pt-3 border-t border-black/5">
                <p className="text-[0.85rem] font-body font-medium text-ink/70 leading-relaxed">
                  <span className="text-botanical">重點：</span>{card.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12"
        >
          <Link
            href="/face-test"
            className="flex items-center justify-center gap-2 px-8 py-3.5 text-[1rem] font-body font-bold text-cream bg-botanical rounded-full hover:bg-botanical-light transition-all duration-300 shadow-md"
          >
            <Sparkles size={16} />
            測出我的 4R 方向
          </Link>
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 text-[0.85rem] font-body font-medium text-botanical bg-transparent rounded-full border border-botanical/30 hover:bg-botanical/5 transition-all duration-300"
          >
            <MessageCircle size={16} />
            LINE 預約專人分析
          </a>
        </motion.div>
      </div>
    </section>
  );
}
