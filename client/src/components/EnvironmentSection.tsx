/*
 * EnvironmentSection — Dual-Clinic Gallery with Real Photos
 * Tab-based layout: 南京旗艦院所 / 北大診所
 * All photos from actual clinic photography, strictly separated by location.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { BEIDA_CLINIC_PHOTOS, NANJING_CLINIC_PHOTOS } from "@/lib/imageAssets";

const clinics = [
  { id: "nanjing" as const, name: "南京旗艦院所", photos: NANJING_CLINIC_PHOTOS },
  { id: "beida" as const, name: "北大診所", photos: BEIDA_CLINIC_PHOTOS },
];

export default function EnvironmentSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [activeClinic, setActiveClinic] = useState<"nanjing" | "beida">("nanjing");
  const active = clinics.find((c) => c.id === activeClinic)!;

  return (
    <section id="environment" className="py-24 lg:py-36 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-leaf-pale/20 to-cream" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Healing Space
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            療癒
            <span className="text-gradient-forest"> 空間</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            南京旗艦與北大診所，以溫潤舒適的環境，讓每一次到訪都是放鬆的體驗。
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {clinics.map((clinic) => (
            <button
              key={clinic.id}
              onClick={() => setActiveClinic(clinic.id)}
              className={`px-5 py-2 rounded-full text-[0.85rem] font-body transition-all duration-300 ${
                activeClinic === clinic.id
                  ? "bg-botanical text-white shadow-md"
                  : "glass text-ink/50 hover:text-ink"
              }`}
            >
              {clinic.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeClinic}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
          >
            {active.photos.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative overflow-hidden rounded-[1rem] group ${
                  i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-square"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 left-3 text-[0.75rem] font-body text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
