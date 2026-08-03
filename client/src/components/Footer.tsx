/*
 * Footer — Brand Closure Section
 * Full-width brand summary, navigation, popular treatments, clinic locations
 */
import { LINE_BY_APPLE } from "@/lib/constants";
import { isHomePath, withBase } from "@/lib/basePath";
import { navigateToHomeSection, scrollToHashWithRetry } from "@/lib/scrollToHash";
import { InternalLink } from "@/components/InternalLink";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

/* ── Footer navigation items with correct anchors ── */
const FOOTER_NAV = [
  { label: "關於蘋果樹", href: "/#about" },
  { label: "美麗管理療程", href: "/#services" },
  { label: "真實案例", href: "/#cases" },
  { label: "美麗實境室", href: "/#videos" },
  { label: "醫師團隊", href: "/#doctors" },
  { label: "院所環境", href: "/#environment" },
  { label: "常見問題", href: "/#faq" },
  { label: "聯絡預約", href: "/#contact" },
];

/* ── Popular treatments with correct detail page routes ── */
const POPULAR_TREATMENTS = [
  { name: "皮秒蜂巢雷射", href: "/treatment/picosure-755" },
  { name: "音波拉提", href: "/treatment/ultrasound-lifting" },
  { name: "電波拉提", href: "/treatment/thermage-flx" },
  { name: "玻尿酸微整", href: "/treatment/hyaluronic-acid" },
  { name: "肉毒桿菌", href: "/treatment/botox" },
  { name: "膠原再生", href: "/treatment/aesthefill" },
  { name: "水光與膚質管理", href: "/treatment/water-glow" },
];

/* ── Clinic locations ── */
const FOOTER_LOCATIONS = [
  {
    name: "南京旗艦院所",
    address: "台北市松山區南京東路三段309號3樓",
    phone: "(02) 2716-3535",
    phoneLink: "tel:+886227163535",
    lineId: LINE_BY_APPLE.nanjing.lineId,
    lineUrl: LINE_BY_APPLE.nanjing.lineUrl,
  },
  {
    name: "北大診所",
    address: "新北市三峽區大德路127號",
    phone: "(02) 8672-0222",
    phoneLink: "tel:+886286720222",
    lineId: LINE_BY_APPLE.beida.lineId,
    lineUrl: LINE_BY_APPLE.beida.lineUrl,
  },
  {
    name: "北大醫美",
    address: "新北市三峽區大德路127號2樓",
    phone: "(02) 8672-0608",
    phoneLink: "tel:+886286720608",
    lineId: LINE_BY_APPLE.beida.lineId,
    lineUrl: LINE_BY_APPLE.beida.lineUrl,
  },
];

export default function Footer() {
  const [, navigate] = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.slice(2);
      if (isHomePath()) {
        navigateToHomeSection(sectionId);
        return;
      }
      navigate("/");
      window.history.replaceState(null, "", withBase(`/#${sectionId}`));
      window.setTimeout(() => scrollToHashWithRetry(`#${sectionId}`), 150);
      return;
    }
    window.location.href = withBase(href);
  };

  return (
    <footer className="bg-forest-deep text-white/80 pt-20 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">

          {/* ── 1. Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <div className="text-lg font-heading font-light text-white/90 tracking-wide">
                蘋果樹醫美 Dr. Appletree
              </div>
              <div className="text-[0.6rem] tracking-[0.35em] uppercase font-body text-white/25 mt-1">
                DR. APPLETREE
              </div>
            </div>
            <p className="text-[0.9rem] font-body font-light text-white/45 leading-[1.9] mb-1">
              美麗，是一種管理。
            </p>
            <p className="text-[0.9rem] font-body font-light text-white/45 leading-[1.9] mb-4">
              健康，也是一種管理。
            </p>
            <p className="text-[0.9rem] font-body font-light text-white/30 leading-[1.9] mb-5">
              從膚況、輪廓、體態到健康狀態，
              <br />
              蘋果樹以醫療專業與科技檢測，
              <br />
              陪你建立更清楚、更自然、更長期的美麗管理方式。
            </p>
            <div className="space-y-2">
              <a
                href={LINE_BY_APPLE.nanjing.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.9rem] font-body font-light text-white/35 hover:text-sage-light transition-colors duration-300"
              >
                <MessageCircle size={13} />
                LINE（南京）: {LINE_BY_APPLE.nanjing.lineId}
              </a>
              <a
                href={LINE_BY_APPLE.beida.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.9rem] font-body font-light text-white/35 hover:text-sage-light transition-colors duration-300"
              >
                <MessageCircle size={13} />
                LINE（北大）: {LINE_BY_APPLE.beida.lineId}
              </a>
            </div>
          </div>

          {/* ── 2. Navigation ── */}
          <div>
            <h4 className="text-[0.7rem] font-body font-medium text-white/50 tracking-[0.2em] uppercase mb-5">
              網站導覽
            </h4>
            <nav className="space-y-3">
              {FOOTER_NAV.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="block text-[0.8rem] font-body font-light text-white/35 hover:text-sage-light transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── 3. Popular Treatments ── */}
          <div>
            <h4 className="text-[0.7rem] font-body font-medium text-white/50 tracking-[0.2em] uppercase mb-5">
              熱門療程
            </h4>
            <nav className="space-y-3">
              {POPULAR_TREATMENTS.map((item) => (
                <InternalLink
                  key={item.name}
                  href={item.href}
                  className="block text-[0.8rem] font-body font-light text-white/35 hover:text-sage-light transition-colors duration-300"
                >
                  {item.name}
                </InternalLink>
              ))}
            </nav>
          </div>

          {/* ── 4. Clinic Locations ── */}
          <div>
            <h4 className="text-[0.7rem] font-body font-medium text-white/50 tracking-[0.2em] uppercase mb-5">
              院所據點
            </h4>
            <div className="space-y-6">
              {FOOTER_LOCATIONS.map((loc) => (
                <div key={loc.name}>
                  <div className="text-[0.85rem] font-body font-medium text-white/55 mb-2">
                    {loc.name}
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-[0.72rem] font-body font-light text-white/28 hover:text-sage-light transition-colors duration-300 mb-1.5"
                  >
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    {loc.address}
                  </a>
                  <a
                    href={loc.phoneLink}
                    className="flex items-center gap-2 text-[0.72rem] font-body font-light text-white/28 hover:text-sage-light transition-colors duration-300 mb-1.5"
                  >
                    <Phone size={11} />
                    電話｜{loc.phone}
                  </a>
                  <a
                    href={loc.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[0.72rem] font-body font-light text-white/28 hover:text-sage-light transition-colors duration-300"
                  >
                    <MessageCircle size={11} />
                    LINE｜{loc.lineId}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* ── Bottom copyright ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <p className="text-[0.65rem] font-body font-light text-white/20">
            &copy; {new Date().getFullYear()} 蘋果樹醫美 Dr. Appletree. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] font-body font-light text-white/20 hover:text-white/40 cursor-pointer transition-colors duration-300">
              隱私權政策
            </span>
            <span className="text-[0.65rem] font-body font-light text-white/20 hover:text-white/40 cursor-pointer transition-colors duration-300">
              服務條款
            </span>
          </div>
        </div>

        {/* ── Medical disclaimer ── */}
        <div className="p-4 rounded-xl bg-white/3">
          <p className="text-[0.6rem] font-body font-light text-white/15 leading-[1.9] text-center">
            本網站內容僅供參考，不構成醫療建議。任何療程效果因個人體質而異，實際效果需經醫師評估後確認。
            療程前請務必與醫師充分溝通，了解可能的風險與副作用。蘋果樹醫學總院保留最終解釋權。
          </p>
        </div>
      </div>
    </footer>
  );
}
