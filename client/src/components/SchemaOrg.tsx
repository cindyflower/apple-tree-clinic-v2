/*
 * SchemaOrg — 結構化資料 (JSON-LD)
 * Outputs Schema.org markup for:
 * - MedicalBusiness (clinic info)
 * - LocalBusiness (3 locations)
 * - FAQPage (homepage FAQ)
 * - MedicalProcedure (per treatment page)
 * - Article (per case page)
 */

import { BRAND } from "@/lib/constants";
import { absoluteSiteUrl } from "@/lib/siteUrl";

interface ClinicLocation {
  name: string;
  address: string;
  phone: string;
  geo: { lat: number; lng: number };
}

const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    name: "蘋果樹醫美 南京旗艦院所",
    address: "台北市松山區南京東路三段309號3樓",
    phone: "+886-2-2716-3535",
    geo: { lat: 25.0519, lng: 121.5467 },
  },
  {
    name: "蘋果樹醫美 北大診所",
    address: "新北市三峽區大德路127號2樓",
    phone: "+886-2-2674-1272",
    geo: { lat: 24.9472, lng: 121.3725 },
  },
  {
    name: "蘋果樹醫美 桃園藝文院所",
    address: "桃園市桃園區中正路1473號2樓",
    phone: "+886-3-325-6555",
    geo: { lat: 24.9967, lng: 121.3087 },
  },
];

// Homepage schema: MedicalBusiness + LocalBusiness + FAQPage
export function HomepageSchema() {
  const medicalBusiness = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "蘋果樹醫美診所 Dr. Appletree",
    alternateName: "Dr. Appletree Medical Aesthetics",
    url: absoluteSiteUrl("/"),
    logo: absoluteSiteUrl("/logo.png"),
    image: absoluteSiteUrl("/og-image.jpg"),
    description:
      "蘋果樹醫美診所提供皮秒雷射、音波拉提、電波拉提、玻尿酸微整、肉毒桿菌、膠原再生、整型外科等專業醫美療程。以醫療專業與科技檢測，陪你建立更自然、更長期的美麗管理方式。",
    telephone: "+886-2-2716-3535",
    priceRange: "$$",
    currenciesAccepted: "TWD",
    paymentAccepted: "Cash, Credit Card",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "南京東路三段309號3樓",
      addressLocality: "松山區",
      addressRegion: "台北市",
      postalCode: "105",
      addressCountry: "TW",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.0519,
      longitude: 121.5467,
    },
    sameAs: [
      "https://www.facebook.com/drappletree",
      "https://www.instagram.com/drappletree",
      "https://www.youtube.com/channel/UCAWWtXWgdE9ltkJH_cPWvow",
      BRAND.lineUrl,
    ],
    medicalSpecialty: [
      "Dermatology",
      "PlasticSurgery",
    ],
    availableService: [
      { "@type": "MedicalProcedure", name: "皮秒蜂巢雷射", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "音波拉提", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "電波拉提 Thermage FLX", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "玻尿酸微整注射", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "肉毒桿菌素注射", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "膠原蛋白再生", procedureType: "NonInvasive" },
      { "@type": "MedicalProcedure", name: "雙眼皮手術", procedureType: "Surgical" },
      { "@type": "MedicalProcedure", name: "隆鼻手術", procedureType: "Surgical" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "326",
      bestRating: "5",
    },
  };

  const localBusinesses = CLINIC_LOCATIONS.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: loc.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.replace(/.*市|.*區/, ""),
      addressLocality: loc.address.match(/.*?區/)?.[0] || "",
      addressRegion: loc.address.match(/.*?市/)?.[0] || "",
      addressCountry: "TW",
    },
    telephone: loc.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    parentOrganization: {
      "@type": "MedicalBusiness",
      name: "蘋果樹醫美診所 Dr. Appletree",
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusiness) }}
      />
      {localBusinesses.map((lb, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}
        />
      ))}
    </>
  );
}

// FAQ schema for homepage FAQ section
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Treatment page schema: MedicalProcedure
interface TreatmentSchemaProps {
  name: string;
  description: string;
  image: string;
  procedureType: "NonInvasive" | "Surgical" | "Percutaneous";
  bodyLocation?: string;
  duration?: string;
  slug: string;
}

export function TreatmentSchema({
  name,
  description,
  image,
  procedureType,
  bodyLocation,
  duration,
  slug,
}: TreatmentSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    image,
    procedureType,
    bodyLocation: bodyLocation || "Face",
    howPerformed: "由專業醫師操作",
    preparation: "術前諮詢評估",
    url: absoluteSiteUrl(`/treatment/${slug}`),
    ...(duration && { duration: `PT${duration.replace(/[^0-9]/g, "")}M` }),
    provider: {
      "@type": "MedicalBusiness",
      name: "蘋果樹醫美診所 Dr. Appletree",
      url: absoluteSiteUrl("/"),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Case/Article schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  slug: string;
}

export function ArticleSchema({
  title,
  description,
  image,
  datePublished,
  slug,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished,
    dateModified: datePublished,
    url: absoluteSiteUrl(`/case/${slug}`),
    author: {
      "@type": "Organization",
      name: "蘋果樹醫美診所",
      url: absoluteSiteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "蘋果樹醫美診所 Dr. Appletree",
      logo: {
        "@type": "ImageObject",
        url: absoluteSiteUrl("/logo.png"),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteSiteUrl(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
