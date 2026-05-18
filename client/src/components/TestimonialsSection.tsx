/*
 * TestimonialsSection — Liquid Glass Design
 * Combines real case photos with testimonial cards
 */
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Star, Quote } from "lucide-react";
import { IMAGES } from "@/lib/constants";

const testimonials = [
  {
    name: "陳小姐",
    age: "32歲",
    treatment: "皮秒蜂巢雷射",
    content: "做完皮秒雷射後，困擾我多年的斑點明顯淡化了。整個過程比想像中舒適，恢復期也很短，隔天就正常上班了。非常推薦！",
    rating: 5,
  },
  {
    name: "林小姐",
    age: "45歲",
    treatment: "海芙電波＋音波拉提",
    content: "組合療程的效果真的很驚艷！做完一個月後法令紋明顯變淺，整個臉型都提升了。朋友都問我是不是去度假回來，氣色變好了。",
    rating: 5,
  },
  {
    name: "王先生",
    age: "38歲",
    treatment: "水飛梭＋水光療程",
    content: "第一次嘗試醫美，蘋果樹的團隊讓我很安心。諮詢過程很仔細，完全沒有推銷壓力。水飛梭做完皮膚真的變得很透亮。",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="label-refined text-champagne inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-champagne/50" />
            Real Results
            <span className="w-6 h-[1px] bg-champagne/50" />
          </span>
          <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.8rem] mb-4">
            真實案例
            <span className="text-gradient-forest"> 與好評</span>
          </h2>
          <p className="text-[1rem] font-body font-light text-ink/45 max-w-lg mx-auto leading-[1.9]">
            每一則好評與每一張對比照，都是我們持續精進的動力。
          </p>
        </motion.div>

        {/* Before/After Case — Real photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-12"
        >
          <div className="glass-strong rounded-[1.5rem] overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Case image */}
              <div className="lg:col-span-3 relative">
                <img loading="lazy" src={IMAGES.caseHydrafacialWaterlight}
                  alt="水飛梭＋水光療程 Before After 真實案例"
                  className="w-full h-64 lg:h-80 object-cover"
                 
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 text-[0.65rem] font-body font-medium text-white bg-botanical/80 backdrop-blur-sm rounded-full">
                  真實案例
                </div>
              </div>
              {/* Case description */}
              <div className="lg:col-span-2 p-8 lg:p-10 flex flex-col justify-center">
                <span className="label-refined text-botanical/60 mb-3">水飛梭＋水光療程</span>
                <h3 className="text-xl font-heading font-medium text-ink mb-3">
                  男生也要保養！
                </h3>
                <p className="text-[0.85rem] font-body font-light text-ink/50 leading-[1.9] mb-4">
                  改善暗沉的關鍵流程，讓肌膚更乾淨、更有亮度。
                  以清潔搭配保濕導入，從底層開始調整膚況。
                  專為男性打造的簡單有效保養體驗。
                </p>
                <div className="flex flex-wrap gap-2">
                  {["深層清潔", "補水保濕", "提亮膚色", "改善暗沉"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[0.6rem] font-body text-botanical/60 bg-botanical/5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass rounded-[1.5rem] p-8 group hover:glow-sage transition-all duration-500"
            >
              <Quote size={24} className="text-botanical/15 mb-4" />

              <p className="text-[0.85rem] font-body font-light text-ink/55 leading-[1.9] mb-6">
                「{t.content}」
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="text-champagne fill-champagne" />
                ))}
              </div>

              <div className="divider-glow mb-4" />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.85rem] font-body font-medium text-ink">{t.name}</div>
                  <div className="text-[0.7rem] font-body text-ink/35">{t.age}</div>
                </div>
                <span className="px-3 py-1 text-[0.6rem] font-body text-botanical/60 bg-botanical/5 rounded-full">
                  {t.treatment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
