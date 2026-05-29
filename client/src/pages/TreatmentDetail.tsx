/*
 * TreatmentDetail — 療程子頁面
 * Liquid Glass Design / Mobile-First
 * 
 * Sections: Hero → Pain Point → Solution → Process Steps → Before/After → Specs → Aftercare → FAQ → CTA
 * Each treatment has 800-word professional copy with SEO optimization
 */
import { useEffect, useMemo, useState as useStateHook } from "react";
import { useParams, useLocation } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { TreatmentSchema, BreadcrumbSchema } from "@/components/SchemaOrg";
import { motion } from "framer-motion";
import {
  ArrowLeft, Clock, Calendar, DollarSign, Star, Check, ChevronRight,
  MessageCircle, Phone, Shield, Award, Sparkles, Play
} from "lucide-react";
import { getTreatmentBySlug, type TreatmentDetail as TreatmentDetailType } from "@/lib/treatmentDetails";
import { getVideosByTreatmentSlug, getCategoryLabel, type VideoItem } from "@/lib/videoData";
import { BRAND, CASE_STUDIES } from "@/lib/constants";

function TreatmentNotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="heading-editorial text-ink text-3xl mb-4">找不到此療程</h1>
        <p className="font-body text-ink/50 mb-8">此療程頁面不存在或已移除。</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
        >
          <ArrowLeft size={16} />
          返回首頁
        </button>
      </div>
    </div>
  );
}

export default function TreatmentDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const treatment = useMemo(() => getTreatmentBySlug(params.slug || ""), [params.slug]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  // SEO: dynamic meta tags, OG, canonical
  useSEO({
    title: treatment?.metaTitle || '療程資訊｜蘋果樹醫美',
    description: treatment?.metaDescription || '',
    ogImage: treatment?.heroImage,
    canonical: `/treatment/${params.slug}`,
    keywords: treatment?.keywords?.join(','),
  });

  if (!treatment) return <TreatmentNotFound />;

  // Schema.org structured data
  const isSurgical = treatment.category === '整型外科';

  // Find related cases
  const relatedCases = CASE_STUDIES.filter((c) =>
    treatment.relatedCases.includes(c.id)
  );

  return (
    <div className="min-h-screen bg-cream">
      <TreatmentSchema
        name={treatment.title}
        description={treatment.metaDescription}
        image={treatment.heroImage}
        procedureType={isSurgical ? 'Surgical' : 'NonInvasive'}
        duration={treatment.duration}
        slug={params.slug || ''}
      />
      <BreadcrumbSchema items={[
        { name: '首頁', url: '/' },
        { name: treatment.category, url: '/#services' },
        { name: treatment.title, url: `/treatment/${params.slug}` },
      ]} />
      {/* Sticky top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-cream/80 backdrop-blur-xl border-b border-botanical/8 shadow-sm shadow-botanical/3">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 1) window.history.back();
              else navigate("/");
            }}
            className="flex items-center gap-2 text-[0.8rem] font-body font-medium text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">返回</span>
          </button>
          <button
            onClick={() => navigate("/")}
            aria-label="回首頁"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <span className="text-sm">🍏</span>
            <span className="text-[0.85rem] font-heading font-semibold text-ink">{BRAND.name}</span>
          </button>
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 text-[0.9rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
          >
            <MessageCircle size={13} />
            預約諮詢
          </a>
        </div>
      </div>

      {/* Hero section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="relative h-[50vh] min-h-[350px] max-h-[500px]">
          <img
            src={treatment.heroImage}
            alt={`${treatment.title} — ${BRAND.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-forest-deep/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-10">
            <div className="container">
              {treatment.hotLabel && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[0.65rem] font-body font-semibold text-gold-light bg-gold/20 backdrop-blur-sm rounded-full border border-gold/20 mb-3"
                >
                  <Sparkles size={11} />
                  {treatment.hotLabel}
                </motion.span>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-[0.65rem] font-body font-medium text-sage-light/70 tracking-wider uppercase block mb-1">
                  {treatment.category}
                </span>
                <h1 className="heading-display text-white text-[clamp(1.6rem,5vw,3rem)] mb-2">
                  {treatment.title}
                </h1>
                <p className="text-[1rem] font-body font-light text-white/60 max-w-lg">
                  {treatment.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick specs bar */}
      <section className="bg-white/60 backdrop-blur-sm border-b border-botanical/8">
        <div className="container py-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-4 lg:gap-8 min-w-max lg:justify-center">
            <SpecBadge icon={<Clock size={14} />} label="療程時間" value={treatment.duration} />
            <SpecBadge icon={<Calendar size={14} />} label="建議次數" value={treatment.sessions.split("，")[0]} />
            <SpecBadge icon={<Shield size={14} />} label="恢復期" value={treatment.recovery.split("，")[0]} />
            <SpecBadge icon={<Star size={14} />} label="滿意度" value={treatment.satisfaction.split("表示")[0].replace("客戶", "").trim()} />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-10 lg:py-16">
        <div className="max-w-3xl mx-auto">

          {/* Pain point section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="您的困擾" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-4">
              為什麼需要<span className="text-gradient-forest"> {treatment.title.split("・")[0].split("\n")[0]}</span>？
            </h2>
            <p className="text-[1rem] font-body font-light text-ink/60 leading-[2] whitespace-pre-line">
              {treatment.painPoint}
            </p>
          </motion.section>

          {/* Solution section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="解決方案" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-4">
              療程<span className="text-gradient-forest"> 原理與優勢</span>
            </h2>
            <p className="text-[1rem] font-body font-light text-ink/60 leading-[2] mb-6 whitespace-pre-line">
              {treatment.solution}
            </p>

            {/* Mechanism callout */}
            <div className="glass rounded-xl p-5 lg:p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-botanical/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Award size={16} className="text-botanical" />
                </div>
                <div>
                  <h3 className="text-[1rem] font-heading font-medium text-ink mb-2">作用機制</h3>
                  <p className="text-[0.8rem] font-body font-light text-ink/50 leading-[1.9]">
                    {treatment.mechanism}
                  </p>
                </div>
              </div>
            </div>

            {/* Advantages grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {treatment.advantages.map((adv, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-botanical/3 border border-botanical/8">
                  <Check size={14} className="text-botanical mt-0.5 shrink-0" />
                  <span className="text-[0.8rem] font-body text-ink/60 leading-[1.6]">{adv}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Process steps */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="療程流程" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-6">
              完整<span className="text-gradient-forest"> 療程步驟</span>
            </h2>

            <div className="space-y-3">
              {treatment.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 lg:p-5 flex gap-4"
                >
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-botanical/10 flex items-center justify-center">
                      <span className="text-[0.85rem] font-heading font-semibold text-botanical">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-[1rem] font-body font-semibold text-ink">{step.title}</h3>
                      {step.duration && (
                        <span className="text-[0.6rem] font-body text-champagne bg-champagne/10 px-2 py-0.5 rounded-full">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-[0.85rem] font-body font-light text-ink/50 leading-[1.7]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Related Before/After cases */}
          {relatedCases.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <SectionLabel text="真實案例" />
              <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-6">
                Before &<span className="text-gradient-forest"> After</span>
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {relatedCases.map((cs) => (
                  <div key={cs.id} className="glass rounded-xl overflow-hidden">
                    <img
                      src={cs.image}
                      alt={`${cs.title} — ${BRAND.name} 真實案例`}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    <div className="p-4 lg:p-5">
                      <h3 className="text-[0.95rem] font-heading font-medium text-ink mb-1">{cs.title}</h3>
                      <p className="text-[0.85rem] font-body font-light text-ink/50 leading-[1.7] mb-3">
                        {cs.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cs.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-0.5 text-[0.6rem] font-body text-botanical/70 bg-botanical/5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Specs & Pricing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="療程資訊" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-6">
              時間・次數・<span className="text-gradient-forest">費用</span>
            </h2>

            <div className="glass rounded-xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  <SpecRow icon={<Clock size={15} />} label="單次療程時間" value={treatment.duration} />
                  <SpecRow icon={<Calendar size={15} />} label="建議療程次數" value={treatment.sessions} />
                  <SpecRow icon={<Shield size={15} />} label="恢復期" value={treatment.recovery} />
                  <SpecRow icon={<DollarSign size={15} />} label="費用區間" value={treatment.priceRange} highlight />
                  <SpecRow icon={<Star size={15} />} label="客戶滿意度" value={treatment.satisfaction} />
                </tbody>
              </table>
            </div>

            <p className="text-[0.7rem] font-body text-ink/30 mt-3 text-center">
              ＊實際費用依個人膚況與治療方案而定，歡迎預約免費諮詢評估
            </p>
          </motion.section>

          {/* Aftercare */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="術後保養" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-6">
              術後<span className="text-gradient-forest"> 注意事項</span>
            </h2>

            <div className="glass rounded-xl p-5 lg:p-6 space-y-3">
              {treatment.aftercare.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-champagne/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[0.6rem] font-body font-semibold text-champagne">{i + 1}</span>
                  </div>
                  <p className="text-[0.8rem] font-body font-light text-ink/55 leading-[1.7]">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Related Videos */}
          <TreatmentVideos slug={params.slug || ""} />

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel text="常見問答" />
            <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-6">
              關於 {treatment.title.split("・")[0].split("\n")[0]} 的<span className="text-gradient-forest"> 常見問題</span>
            </h2>

            <div className="space-y-3">
              {treatment.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            {/* FAQ Schema.org structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: treatment.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="glass-dark rounded-2xl p-6 lg:p-10 text-center">
              <h2 className="heading-editorial text-white text-2xl lg:text-3xl mb-3">
                準備好開始了嗎？
              </h2>
              <p className="text-[0.85rem] font-body font-light text-white/50 mb-6 max-w-md mx-auto leading-[1.9]">
                預約免費諮詢，由專業醫師為您量身評估最適合的{treatment.title.split("・")[0].split("\n")[0]}方案。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BRAND.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-semibold text-white bg-[#06C755] rounded-full hover:bg-[#05b34d] transition-all duration-300 shadow-lg shadow-[#06C755]/25 w-full sm:w-auto"
                >
                  <MessageCircle size={18} />
                  LINE 立即預約
                </a>
                <a
                  href={BRAND.phoneLink}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 text-[0.85rem] font-body font-medium text-white/80 bg-white/10 rounded-full border border-white/15 hover:bg-white/15 transition-all duration-300 w-full sm:w-auto"
                >
                  <Phone size={16} />
                  {BRAND.phone}
                </a>
              </div>
            </div>
          </motion.section>

          {/* Back to home */}
          <div className="text-center pb-8">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-[0.8rem] font-body font-medium text-ink/40 hover:text-ink/60 transition-colors"
            >
              <ArrowLeft size={14} />
              返回首頁探索更多療程
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fixed CTA — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream/95 backdrop-blur-xl border-t border-botanical/10 px-4 py-3 safe-area-bottom">
        <div className="flex items-center gap-2">
          <a
            href={BRAND.phoneLink}
            className="flex items-center justify-center gap-1.5 flex-1 py-2.5 text-[0.85rem] font-body font-medium text-ink border border-botanical/20 rounded-full"
          >
            <Phone size={14} />
            電話諮詢
          </a>
          <a
            href={BRAND.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 flex-[2] py-2.5 text-[0.85rem] font-body font-semibold text-cream bg-[#06C755] rounded-full"
          >
            <MessageCircle size={14} />
            LINE 立即預約
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile CTA */}
      <div className="h-16 lg:hidden" />

      {/* Breadcrumb Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "首頁", item: BRAND.website },
              { "@type": "ListItem", position: 2, name: "療程項目", item: `${BRAND.website}/#services` },
              { "@type": "ListItem", position: 3, name: treatment.title, item: `${BRAND.website}/treatment/${treatment.slug}` },
            ],
          }),
        }}
      />

      {/* MedicalProcedure Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: treatment.title,
            description: treatment.metaDescription,
            procedureType: "NoninvasiveProcedure",
            howPerformed: treatment.steps.map((s) => s.description).join(" "),
            preparation: treatment.aftercare.join(" "),
            followup: treatment.aftercare.join(" "),
          }),
        }}
      />
    </div>
  );
}

// ─── Sub-components ───

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="label-refined text-champagne inline-flex items-center gap-2 mb-3">
      <span className="w-5 h-[1px] bg-champagne/50" />
      {text}
      <span className="w-5 h-[1px] bg-champagne/50" />
    </span>
  );
}

function SpecBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <div className="w-8 h-8 rounded-lg bg-botanical/8 flex items-center justify-center text-botanical">
        {icon}
      </div>
      <div>
        <div className="text-[0.6rem] font-body text-ink/30">{label}</div>
        <div className="text-[0.9rem] font-body font-medium text-ink/70">{value}</div>
      </div>
    </div>
  );
}

function SpecRow({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <tr className="border-b border-botanical/5 last:border-0">
      <td className="py-3.5 px-4 lg:px-6">
        <div className="flex items-center gap-2.5">
          <span className="text-botanical/50">{icon}</span>
          <span className="text-[0.8rem] font-body text-ink/50">{label}</span>
        </div>
      </td>
      <td className={`py-3.5 px-4 lg:px-6 text-right text-[0.8rem] font-body font-medium ${highlight ? "text-champagne" : "text-ink/70"}`}>
        {value}
      </td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="glass rounded-xl group">
      <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
        <span className="text-[0.85rem] font-body font-medium text-ink pr-4">{question}</span>
        <ChevronRight size={16} className="text-ink/30 shrink-0 transition-transform duration-300 group-open:rotate-90" />
      </summary>
      <div className="px-4 pb-4 pt-0">
        <div className="divider-glow mb-3" />
        <p className="text-[0.8rem] font-body font-light text-ink/50 leading-[1.9]">{answer}</p>
      </div>
    </details>
  );
}

function TreatmentVideos({ slug }: { slug: string }) {
  const [playingId, setPlayingId] = useStateHook<string | null>(null);
  const videos = getVideosByTreatmentSlug(slug);
  if (videos.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <SectionLabel text="先看懂，再決定" />
      <h2 className="heading-editorial text-ink text-2xl lg:text-3xl mb-2">
        真人實境<span className="text-gradient-forest">影片</span>
      </h2>
      <p className="text-[0.8rem] font-body font-light text-ink/40 mb-6 leading-[1.7]">
        在預約以前，先看看真實的人如何理解這項療程。不是推銷，而是幫你判斷適不適合自己。
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {videos.slice(0, 4).map((video) => (
          <div key={video.id} className="glass rounded-xl overflow-hidden group">
            {playingId === video.id ? (
              <div className="relative aspect-video">
                <iframe
                  src={`${video.embedUrl}?autoplay=1&rel=0`}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setPlayingId(video.id)}
                className="relative w-full aspect-video"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play size={20} className="text-botanical ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </button>
            )}
            <div className="p-3">
              <h3 className="text-[0.85rem] font-heading font-medium text-ink leading-tight line-clamp-2 mb-1">
                {video.title}
              </h3>
              <p className="text-[0.62rem] font-body text-ink/30 mb-2">
                {video.frontendCategories.slice(0, 2).map(c => getCategoryLabel(c)).join(" / ")}
              </p>
              <p className="text-[0.68rem] font-body font-light text-ink/40 line-clamp-2 leading-[1.6]">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* CTA after videos */}
      <div className="mt-6 text-center">
        <a
          href={BRAND.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-[0.8rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-dark transition-colors shadow-sm"
        >
          <MessageCircle size={16} />
          看完影片，想進一步了解？
        </a>
      </div>
    </motion.section>
  );
}
