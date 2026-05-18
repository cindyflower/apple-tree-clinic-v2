/*
 * AboutSection — Liquid Glass Design
 * Editorial layout with asymmetric composition
 * Uses real team banner photo
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Leaf, Heart, Shield } from "lucide-react";
import { IMAGES } from "@/lib/constants";

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15 });

  const values = [
    { icon: Leaf, title: "肌膚管理", desc: "AI檢測 + 專業醫療調整，讓肌膚由內而外健康發光" },
    { icon: Heart, title: "輪廓雕塑", desc: "藝術整形 + 長期維持計畫，雕塑自然持久的輪廓" },
    { icon: Shield, title: "健康由內而外", desc: "結合功能醫學優化荷爾蒙、腸道與營養，讓美麗從根源綻放" },
  ];

  return (
    <section id="about" className="py-28 lg:py-40 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-mist/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-champagne/6 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image composition with real team photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative">
              {/* Main image — real team banner */}
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-botanical/8">
                <img
                  src={IMAGES.teamBanner}
                  alt="蘋果樹 Dr. Appletree 專業醫療團隊合照"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating glass card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 lg:-right-10 glass-strong rounded-2xl p-5 shadow-xl max-w-[200px]"
              >
                <div className="text-3xl font-heading font-light text-botanical mb-1">8+</div>
                <div className="text-[0.7rem] font-body text-ink/50 leading-relaxed">專科醫師團隊</div>
              </motion.div>
              {/* Secondary floating card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -left-4 lg:-left-8 glass-strong rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-heading font-light text-champagne mb-0.5">3</div>
                <div className="text-[0.65rem] font-body text-ink/45">服務據點</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-champagne/50" />
              About Us
            </span>

            <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-6">
              讓美麗回到
              <br />
              <span className="text-gradient-forest">醫療管理</span>
            </h2>

            <div className="w-12 h-[1px] bg-botanical/30 mb-8" />

            <p className="text-[0.95rem] font-body font-light text-ink/55 leading-[2] mb-4">
              美麗不只是一次療程，而是一套長期的醫療管理。蘋果樹醫美診所成立14年，結合整形外科 × 醫學美容 × 功能醫學，從肌膚、輪廓到整體健康提供完整的醫療級美學管理。同時也是台灣輔助醫學會旗艦示範醫美診所。
            </p>
            <p className="text-[0.95rem] font-body font-light text-ink/55 leading-[2] mb-10">
              以醫療專業與科技系統管理肌膚、輪廓與健康，透過專業醫療團隊、AI肌膚檢測與數位醫療管理，讓每一位顧客的美麗改變都能被安全且科學地管理。
            </p>

            {/* Values */}
            <div className="space-y-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 group-hover:glow-sage transition-all duration-500">
                    <v.icon size={18} className="text-botanical" />
                  </div>
                  <div>
                    <h3 className="text-[1rem] font-body font-semibold text-ink mb-1">{v.title}</h3>
                    <p className="text-[0.8rem] font-body font-light text-ink/45 leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Brand tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 pt-6 border-t border-botanical/10"
            >
              <p className="text-[1.1rem] font-heading font-medium text-gradient-forest tracking-wide">
                美麗，是一種管理
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
