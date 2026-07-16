/*
 * FinalCTASection — Section 7: 信任與轉換 — 最終 CTA 區塊
 * Title: 從今天開始，管理你的健康與美麗
 * 3 buttons: AI 檢測、LINE 預約、查看據點
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { InternalLink } from "@/components/InternalLink";
import { Sparkles, MessageCircle, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function FinalCTASection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-20 md:py-28 bg-forest-deep relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-botanical/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="heading-editorial text-white text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            從今天開始，管理你的<span className="text-gold-light">健康與美麗</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-white/50 leading-[1.9] mb-10">
            找到更適合你的管理方向，讓變美不再只是憑感覺。
          </p>

          {/* 3 CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            {/* Primary — AI 檢測 */}
            <InternalLink
              href="/face-test"
              className="flex items-center justify-center gap-2 px-8 py-4 text-[0.95rem] font-body font-bold text-forest-deep bg-gold-light rounded-full hover:bg-gold transition-all duration-300 shadow-lg shadow-gold/25"
            >
              <Sparkles size={18} />
              開始 AI 肌膚檢測
            </InternalLink>

            {/* Secondary — LINE */}
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[1rem] font-body font-medium text-white/90 bg-transparent rounded-full border border-white/25 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <MessageCircle size={16} />
              LINE 預約健康美麗諮詢
            </a>

            {/* Tertiary — 據點 */}
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 px-6 py-3.5 text-[1rem] font-body font-medium text-white/70 bg-transparent rounded-full border border-white/15 hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              <MapPin size={16} />
              查看服務據點
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
