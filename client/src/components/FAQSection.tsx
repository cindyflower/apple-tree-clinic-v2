/*
 * FAQSection — Liquid Glass Design
 * Elegant accordion with glass cards
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { FAQSchema } from "@/components/SchemaOrg";

function FAQItem({ item, isOpen, onToggle }: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`glass rounded-[1rem] overflow-hidden transition-all duration-500 ${isOpen ? "glow-sage" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 lg:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[1rem] font-body font-medium text-ink pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-7 h-7 rounded-full bg-botanical/8 flex items-center justify-center"
        >
          <ChevronDown size={14} className="text-botanical" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 lg:px-6 pb-5 lg:pb-6">
              <div className="divider-glow mb-4" />
              <p className="text-[0.9rem] font-body font-light text-ink/50 leading-[1.9]">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
    <FAQSchema items={FAQ_ITEMS} />
    <section id="faq" className="py-28 lg:py-40 relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sage-mist/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <span className="label-refined text-champagne inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-champagne/50" />
              FAQ
              <span className="w-6 h-[1px] bg-champagne/50" />
            </span>
            <h2 className="heading-editorial text-ink text-3xl sm:text-4xl lg:text-[2.5rem] mb-6">
              常見
              <span className="text-gradient-forest"> 問題</span>
            </h2>
            <p className="text-[1rem] font-body font-light text-ink/45 leading-[1.9] mb-6">
              我們整理了客人最常詢問的問題，希望能幫助您更了解我們的服務。
            </p>
            <div className="w-12 h-[1px] bg-botanical/30" />
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-3 space-y-3"
          >
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
