/*
 * CTABanner — Liquid Glass Design
 * Cinematic full-width CTA with real banner photo
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND, IMAGES } from "@/lib/constants";

export default function CTABanner() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background — real banner image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.bannerCollagen}
          alt="蘋果樹 Dr. Appletree 膠原蛋白療程"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-forest-deep/75 backdrop-blur-sm" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sage-mist/10 rounded-full blur-[80px] float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-champagne/8 rounded-full blur-[60px] float-slower" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="label-refined text-sage-light/50 inline-flex items-center justify-center gap-2 mb-6">
            <span className="w-6 h-[1px] bg-sage-light/30" />
            Start Your Journey
            <span className="w-6 h-[1px] bg-sage-light/30" />
          </span>

          <h2 className="heading-editorial text-white/95 text-3xl sm:text-4xl lg:text-[3rem] mb-5 leading-tight">
            從現在開始，
            <br />
            <span className="text-gold-light">找到最適合你的變美方向。</span>
          </h2>

          <p className="text-[0.95rem] font-body font-light text-white/55 max-w-xl mx-auto mb-4 leading-[1.9]">
            先讓序顏™ AI美學管理師幫你看懂狀態，
            <br />
            再由 Dr. Appletree 團隊協助你做對下一步。
          </p>
          <p className="text-[0.8rem] font-body font-light text-white/35 max-w-lg mx-auto mb-10 leading-[1.9]">
            讓每一次美麗改變，都被專業醫療團隊與科技系統安全且科學地管理。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-medium text-forest-deep bg-cream rounded-full hover:bg-white transition-all duration-400 shadow-xl"
            >
              立即預約序顏™ AI
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href={BRAND.phoneLink}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-medium text-white/70 border border-white/15 rounded-full hover:bg-white/5 transition-all duration-400"
            >
              <Phone size={14} />
              {BRAND.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
