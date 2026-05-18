/*
 * AIDetectionSection — Section 2: AI 檢測展示
 * Shows 序顏Ai檢測.mp4 with autoplay muted loop + sound toggle
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import VideoSoundToggle from "@/components/VideoSoundToggle";

const VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/序顏Ai檢測_a9a7e486.mp4";

export default function AIDetectionSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden" ref={ref}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-mist/6 rounded-full blur-[150px]" />

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
            AI Detection
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            看序顏 AI 檢測
            <span className="text-gradient-forest">怎麼運作</span>
          </h2>
          <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/50 leading-[1.9]">
            透過簡單互動與初步分析，序顏幫你更快整理目前的老化傾向與美學方向。
          </p>
        </motion.div>

        {/* Video with sound toggle */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[1200px] mx-auto relative"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block rounded-3xl shadow-2xl shadow-botanical/8"
            style={{ maxWidth: "1200px" }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
          <VideoSoundToggle videoRef={videoRef} />
        </motion.div>
      </div>
    </section>
  );
}
