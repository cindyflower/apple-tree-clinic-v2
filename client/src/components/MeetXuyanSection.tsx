/**
 * Section 5: Meet 序顏 — Pure fullwidth static image with transparent hotspots
 *
 * Image: 1672 × 941 px
 * Green button (開始30秒序顏美學測驗): x≈817..1195, y≈838..900
 *   → left: 48.9%, top: 89.1%, width: 22.6%, height: 6.6%
 * Outline button (探索4R美學決策系統): x≈1215..1582, y≈838..900
 *   → left: 72.7%, top: 89.1%, width: 21.9%, height: 6.6%
 *
 * Hotspots use rgba(255,0,0,0.3) for QA verification.
 */
import { useInView } from "@/hooks/useInView";
import { IMAGES } from "@/lib/imageAssets";

export default function MeetXuyanSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="meet-xuyan"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-cream/30"
      ref={ref}
    >
      {/* Section label */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="w-8 h-px bg-sage-dark/30" />
        <span className="text-xs tracking-[0.25em] text-sage-dark/60 uppercase font-medium">
          Meet 序顏
        </span>
        <span className="w-8 h-px bg-sage-dark/30" />
      </div>

      {/* Image container — locked ratio, no ghost whitespace */}
      <div
        className={`
          transition-all duration-700
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          lineHeight: 0,
          fontSize: 0,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        {/* High-res static image */}
        <img src={IMAGES.meetXuyan}
          alt="認識序顏｜你的專屬 AI 美學顧問 — 三種互動型態介紹"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          loading="eager"
          draggable={false}
        />

        {/* ── Hotspot A: Green button (開始 30 秒序顏美學測驗) → /face-test ── */}
        <a
          href="/face-test"
          aria-label="開始 30 秒測驗"
          style={{
            position: "absolute",
            left: "48.9%",
            top: "89.1%",
            width: "22.6%",
            height: "6.6%",
            backgroundColor: "rgba(255, 0, 0, 0.3)", /* QA debug */
            borderRadius: 12,
            cursor: "pointer",
            zIndex: 10,
          }}
        />

        {/* ── Hotspot B: Outline button (探索 4R 美學決策系統) → #section-4r ── */}
        <a
          href="#section-4r"
          aria-label="認識 4R 美學決策系統"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector("#section-4r");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            position: "absolute",
            left: "72.7%",
            top: "89.1%",
            width: "21.9%",
            height: "6.6%",
            backgroundColor: "rgba(255, 0, 0, 0.3)", /* QA debug */
            borderRadius: 12,
            cursor: "pointer",
            zIndex: 10,
          }}
        />
      </div>
    </section>
  );
}
