/*
 * BrandStorySection — Section 5: 誰是蘋果樹？(品牌故事)
 * 創辦人故事 + 金句
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { TreePine } from "lucide-react";

export default function BrandStorySection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-botanical/3 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-champagne/50" />
              <TreePine size={12} className="text-botanical" />
              Brand Story
              <span className="w-6 h-[1px] bg-champagne/50" />
            </span>
            <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.2rem] mb-3">
              誰是<span className="text-gradient-forest">蘋果樹</span>？
            </h2>
            <p className="text-[0.95rem] font-body font-light text-ink/50 leading-relaxed">
              從科技業的一次提醒，長出健康美麗管理品牌。
            </p>
          </motion.div>

          {/* Story content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/65 leading-[2]">
              創辦人曾在科技業，看見 Apple 與 Nokia 代表兩種不同的時代選擇。那次經驗讓我們記住：不要只跟著現在的市場走，要有能力看見下一個未來。
            </p>
            <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/65 leading-[2]">
              所以第二次創業時，我們把診所命名為「蘋果樹」。蘋果，代表科技、創新與未來。樹，代表根基、成長與持續結果。蘋果樹希望把科技思維種進醫療現場，讓健康與美麗成為可以被檢測、規劃、追蹤與調整的長期管理。
            </p>
          </motion.div>

          {/* 金句 */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 pl-5 border-l-3 border-botanical/40"
          >
            <p className="text-[1rem] md:text-[1.1rem] font-heading font-medium text-ink/80 leading-[1.9] italic">
              「不是只做一次療程，而是陪你把健康與美麗，長成可以持續維持的狀態。」
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
