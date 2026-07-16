import { useEffect, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { InternalLink } from "@/components/InternalLink";
import { goBack } from "@/lib/scrollRestore";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { useSEO } from "@/hooks/useSEO";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Award, Stethoscope } from "lucide-react";
import { getDoctorBySlug } from "@/lib/doctorDetails";
import { BRAND } from "@/lib/constants";

function DoctorNotFound() {
  const [, navigate] = useLocation();
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="heading-editorial text-ink text-3xl mb-4">找不到此醫師</h1>
        <p className="font-body text-ink/50 mb-8">此醫師頁面不存在或已移除。</p>
        <button
          onClick={() => goBack(navigate, "/")}
          className="inline-flex items-center gap-2 px-6 py-3 font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
        >
          <ArrowLeft size={16} />
          返回首頁
        </button>
      </div>
    </div>
  );
}

export default function DoctorDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const doctor = useMemo(() => getDoctorBySlug(params.slug || ""), [params.slug]);

  useScrollRestore({ resetKey: params.slug, hashFallback: false });

  useSEO({
    title: doctor?.metaTitle || "醫師介紹｜蘋果樹醫美",
    description: doctor?.metaDescription || "",
    ogImage: doctor?.image,
    canonical: `/doctor/${params.slug}`,
  });

  if (!doctor) return <DoctorNotFound />;

  const paragraphs = doctor.articleText
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="min-h-screen bg-cream">
      <BreadcrumbSchema
        items={[
          { name: "首頁", url: "/" },
          { name: "醫療團隊", url: "/#doctors" },
          { name: doctor.name, url: `/doctor/${params.slug}` },
        ]}
      />

      <div className="fixed top-0 left-0 right-0 z-50 py-2 bg-cream/80 backdrop-blur-xl border-b border-botanical/8 shadow-sm shadow-botanical/3">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => goBack(navigate, "/#doctors")}
            className="flex items-center gap-2 text-[0.8rem] font-body font-medium text-ink/60 hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">返回團隊</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm">🍏</span>
            <span className="text-[0.85rem] font-heading font-semibold text-ink">{BRAND.name}</span>
          </div>
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

      <section className="relative pt-14">
        <div className="relative h-[22rem] sm:h-[28rem] lg:h-[32rem] overflow-hidden bg-leaf-pale/20">
          <img
            src={doctor.image}
            alt={`${doctor.name} — ${doctor.subtitle}`}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[0.65rem] font-body font-semibold text-white bg-champagne/80 backdrop-blur-sm rounded-full mb-3">
                <Award size={12} />
                {doctor.title}
              </span>
              <h1 className="heading-editorial text-white text-3xl sm:text-4xl lg:text-[2.6rem] mb-2">
                {doctor.name}
              </h1>
              <p className="text-[0.95rem] font-body text-white/75">{doctor.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="glass rounded-[1.2rem] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope size={16} className="text-botanical" />
                <h2 className="text-[0.9rem] font-body font-semibold text-ink">專業經歷</h2>
              </div>
              <ul className="space-y-2">
                {doctor.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[0.85rem] font-body text-ink/60 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-sage-mist shrink-0 mt-2" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-[1.2rem] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-champagne" />
                <h2 className="text-[0.9rem] font-body font-semibold text-ink">主治項目</h2>
              </div>
              <ul className="space-y-2">
                {doctor.specialties.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-[0.85rem] font-body text-ink/60 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-champagne/60 shrink-0 mt-2" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <article className="prose-editorial space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-[1rem] font-body font-light text-ink/65 leading-[1.95]"
              >
                {p}
              </motion.p>
            ))}
          </article>

          <div className="mt-12 glass-strong rounded-[1.2rem] p-6 lg:p-8 text-center">
            <h3 className="heading-editorial text-ink text-xl mb-2">預約 {doctor.name} 諮詢</h3>
            <p className="text-[0.9rem] font-body text-ink/45 mb-6">
              歡迎透過 LINE 官方帳號預約，由專人為您安排合適的諮詢時段。
            </p>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[0.95rem] font-body font-medium text-cream bg-botanical rounded-full hover:bg-botanical-light transition-colors"
            >
              <MessageCircle size={18} />
              LINE 預約諮詢
            </a>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => goBack(navigate, "/#doctors")}
              className="inline-flex items-center gap-2 text-[0.85rem] font-body text-botanical hover:text-botanical-light transition-colors"
            >
              <ArrowLeft size={14} />
              返回醫療團隊
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
