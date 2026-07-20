/*
 * ProcessFlowSection — Section 3: 運作流程展示
 * Shows 介紹序顏如何幫助你的流程影片.mp4 + sound toggle
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import VideoSoundToggle from "@/components/VideoSoundToggle";

import { IMAGES } from "@/lib/imageAssets";

export default function ProcessFlowSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            How It Works
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-2xl sm:text-3xl lg:text-[2.4rem] mb-4">
            序顏 AI 如何幫你
            <br className="hidden sm:block" />
            <span className="text-gradient-forest">看懂目前的老化傾向？</span>
          </h2>
          <p className="text-[1rem] md:text-[0.95rem] font-body font-light text-ink/50 leading-[1.9]">
            從初步整理臉部狀態，到找到更適合自己的美學管理方向，序顏會先幫你看懂傾向，再由蘋果樹團隊協助規劃下一步。
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
            style={{ maxWidth: "1200px", objectFit: "contain" }}
          >
            <source src={IMAGES.videoProcessFlow} type="video/mp4" />
          </video>
          <VideoSoundToggle videoRef={videoRef} />
        </motion.div>
      </div>
    </section>
  );
}
