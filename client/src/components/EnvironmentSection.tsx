/*
 * EnvironmentSection — Dual-Clinic Gallery with Real Photos
 * Tab-based layout: 南京旗艦院所 / 北大診所
 * All photos from actual clinic photography, strictly separated by location.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

type ClinicPhoto = {
  src: string;
  alt: string;
  label: string;
};

const nanjingPhotos: ClinicPhoto[] = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00038_7ee1265c.jpg",
    alt: "南京旗艦院所 — 寬敞舒適的候診休憩區",
    label: "候診休憩區",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00039_f2040faf.jpg",
    alt: "南京旗艦院所 — 明亮現代的接待空間",
    label: "接待空間",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00041_f6d1125f.jpg",
    alt: "南京旗艦院所 — 專業諮詢室",
    label: "諮詢室",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00050_b560d97e.jpg",
    alt: "南京旗艦院所 — 精緻療程空間",
    label: "療程空間",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00057_c86cc3b2.jpg",
    alt: "南京旗艦院所 — 溫馨候診環境",
    label: "候診環境",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/DSC00064_57c149a2.jpg",
    alt: "南京旗艦院所 — 院所走廊",
    label: "院所走廊",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/IMG_3818_1799747f.jpg",
    alt: "南京旗艦院所 — 品牌形象牆",
    label: "品牌形象牆",
  },
];

const beidaPhotos: ClinicPhoto[] = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-1_a633ce7a.jpg",
    alt: "北大診所 — 現代簡約候診區",
    label: "候診區",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-2_6a5082db.jpg",
    alt: "北大診所 — 接待櫃檯",
    label: "接待櫃檯",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/S__146128939_0_910da6cb.jpg",
    alt: "北大診所 — 院所空間",
    label: "院所空間",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-4_beaf658a.jpg",
    alt: "北大診所 — 療程室",
    label: "療程室",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-5_ca96d86d.jpg",
    alt: "北大診所 — 診間環境",
    label: "診間環境",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-6_cff0468b.jpg",
    alt: "北大診所 — 休息空間",
    label: "休息空間",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343349747/NiMiPR2Gq7yAMFRDKJg9Wa/北大環境照-7_f0797dd9.jpg",
    alt: "北大診所 — 走廊通道",
    label: "走廊通道",
  },
];

const clinics = [
  { id: "nanjing" as const, name: "南京旗艦院所", photos: nanjingPhotos },
  { id: "beida" as const, name: "北大診所", photos: beidaPhotos },
];

export default function EnvironmentSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [activeClinic, setActiveClinic] = useState<"nanjing" | "beida">("nanjing");
  const currentClinic = clinics.find((c) => c.id === activeClinic)!;

  return (
    <section id="environment" className="py-28 lg:py-40 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-leaf-pale/30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Environment
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            療癒空間
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            每一處細節都經過精心設計，營造讓您放鬆身心的療癒氛圍。
          </p>
        </motion.div>

        {/* Clinic Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-3 mb-10"
        >
          {clinics.map((clinic) => (
            <button
              key={clinic.id}
              onClick={() => setActiveClinic(clinic.id)}
              className={`px-6 py-2.5 rounded-full text-[0.85rem] font-body font-medium transition-all duration-300 ${
                activeClinic === clinic.id
                  ? "bg-forest-deep text-white shadow-lg shadow-forest-deep/20"
                  : "bg-white/60 text-ink/60 hover:bg-white hover:text-ink border border-ink/10"
              }`}
            >
              {clinic.name}
            </button>
          ))}
        </motion.div>

        {/* Photo Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeClinic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
          >
            {currentClinic.photos.map((item, i) => (
              <div
                key={item.label}
                className={`group relative rounded-[1rem] overflow-hidden card-hover ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
              >
                <img
                  loading="lazy"
                  src={item.src}
                  alt={item.alt}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                    i === 0 ? "h-64 sm:h-80 lg:h-full" : "h-40 sm:h-48 lg:h-56"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[0.9rem] font-body font-medium text-white/90">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
