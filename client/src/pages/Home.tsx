/*
 * Home Page — 蘋果樹 Dr. Appletree
 * V3 信任漏斗順序（12 步）:
 * 1. Hero (品牌定位 + AI 檢測 CTA)
 * 2. 需求快速入口 (4大管理 + 6熱門 + Chips) → 觸發 #services 篩選
 * 3. 序顏出場入口卡
 * 4. 4R 美學管理系統
 * 5. 療程列表 (ServicesSection — 動態篩選)
 * 6. 美麗實境室 (VideoSection — 影音先於案例)
 * 7. 精選案例 (CasesSection — 作為成果佐證，緊接影音之後)
 * 8. 品牌故事 / 兩顆蘋果 / 據點
 * 9. 醫師團隊
 * 10. 院所環境
 * 11. FAQ
 * 12. Footer (含 CTA + Contact)
 */
import { useState, useCallback } from "react";
import { useSEO } from "@/hooks/useSEO";
import { IMAGES } from "@/lib/imageAssets";
import { HomepageSchema } from "@/components/SchemaOrg";
import Navbar from "@/components/Navbar";
import QuizHeroSection from "@/components/QuizHeroSection";
import ServiceEntrySection from "@/components/ServiceEntrySection";
import XuyanEntryCard from "@/components/XuyanEntryCard";
import FourRSection from "@/components/FourRSection";
import ServicesSection from "@/components/ServicesSection";
import VideoSection from "@/components/VideoSection";
import CasesSection from "@/components/CasesSection";
import BrandStorySection from "@/components/BrandStorySection";
import TwoApplesSection from "@/components/TwoApplesSection";
import DoctorsSection from "@/components/DoctorsSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import FixedQuizCTA from "@/components/FixedQuizCTA";
import { type CategoryId } from "@/lib/serviceMapping";

export default function Home() {
  // Homepage SEO
  useSEO({
    title: '蘋果樹醫美 Dr. Appletree｜台北醫美推薦｜皇秒雷射・音波拉提・電波拉提・立體雕塑・再生醫學',
    description: '蘋果樹醫美診所｜台北松山・三峽北大・桃園藝文三院。提供皇秒雷射、音波拉提、電波拉提、立體雕塑、再生醫學、整型外科等專業醫美療程。以醫療專業與科技檢測，陪你建立更自然、更長期的美麗管理方式。',
    ogImage: IMAGES.hero,
    canonical: '/',
    keywords: '蘋果樹醫美,台北醫美推薦,皇秒雷射,音波拉提,電波拉提,立體雕塑,再生醫學,整型外科,美麗管理',
  });

  // Shared state: active filter for ServicesSection
  const [serviceFilter, setServiceFilter] = useState<CategoryId[] | null>(null);
  const [filterLabel, setFilterLabel] = useState<string | null>(null);

  const handleFilterChange = useCallback((filter: CategoryId[], label: string) => {
    setServiceFilter(filter);
    setFilterLabel(label);
  }, []);

  const handleFilterClear = useCallback(() => {
    setServiceFilter(null);
    setFilterLabel(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <HomepageSchema />
      <Navbar />
      <main>
        {/* ── 1. Hero ── */}
        <QuizHeroSection />

        {/* ── 2. 需求快速入口 ── */}
        <ServiceEntrySection onFilterChange={handleFilterChange} />

        {/* ── 3. 序顏入口卡 ── */}
        <XuyanEntryCard />

        {/* ── 4. 4R 美學管理系統 ── */}
        <FourRSection />

        {/* ── 5. 療程列表 ── */}
        <ServicesSection activeFilter={serviceFilter} filterLabel={filterLabel} onFilterClear={handleFilterClear} />

        {/* ── 6. 美麗實境室（影音） ── */}
        <VideoSection />

        {/* ── 7. 精選案例 ── */}
        <CasesSection />

        {/* ── 8. 品牌故事 / 兩顆蘋果 / 據點 ── */}
        <BrandStorySection />
        <TwoApplesSection />

        {/* ── 9. 醫師團隊 ── */}
        <DoctorsSection />

        {/* ── 10. 院所環境 ── */}
        <EnvironmentSection />

        {/* ── 11. FAQ ── */}
        <FAQSection />

        {/* ── CTA + 聯絡 ── */}
        <CTABanner />
        <ContactSection />
      </main>

      {/* ── 12. Footer ── */}
      <Footer />
      <FloatingCTA />
      <FixedQuizCTA />
    </div>
  );
}
