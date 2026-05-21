import { img, F } from "./imageAssets";

export interface DoctorDetail {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  specialty: string;
  image: string;
  credentials: string[];
  specialties: string[];
  articleText: string;
  metaTitle: string;
  metaDescription: string;
}

const DOCTOR_DETAILS: DoctorDetail[] = [
  {
    slug: "meng-xiangyue",
    name: "孟祥越 院長",
    title: "總院長",
    subtitle: "蘋果樹醫學總院總院長",
    specialty: "生髮醫學",
    image: img(F.doctors, "1.醫師_孟祥越.jpg"),
    credentials: [
      "國防醫學院醫學系畢業",
      "南非開普敦大學醫學院研究員",
      "美國杜蘭大學醫管碩士",
      "前國軍805總醫院院長",
      "前國軍高雄總醫院院長",
      "前國防部軍醫局副局長",
    ],
    specialties: ["生髮醫學", "整體醫學規劃", "醫療管理"],
    articleText: `孟祥越院長為蘋果樹醫學總院總院長，擁有深厚的臨床與醫療行政管理經驗。從國防醫學院醫學系畢業後，曾赴南非開普敦大學醫學院擔任研究員，並取得美國杜蘭大學醫管碩士，將國際視野與實務管理結合。

歷任國軍805總醫院院長、國軍高雄總醫院院長，以及國防部軍醫局副局長，在大型醫療體系的運營、品質與團隊治理上累積豐富實戰。轉入醫美生醫領域後，他帶領蘋果樹團隊推動「醫療 × 人文 × 醫術藝術」的品牌理念，強調以醫師判斷為核心、以安全與自然美感為依歸。

在蘋果樹，孟祥越院長專注於生髮醫學與整體健康美學的規劃，協助患者從根本理解落髮與頭皮健康，並搭配科學化的治療路徑。他相信，好的醫療不只是技術的堆疊，而是能聽懂患者需求、給出負責任建議的長期陪伴。`,
    metaTitle: "孟祥越 院長｜蘋果樹醫學總院總院長｜蘋果樹醫美",
    metaDescription:
      "孟祥越院長 — 蘋果樹醫學總院總院長。國防醫學院醫學系、杜蘭大學醫管碩士，曾任國軍總醫院院長與軍醫局副局長，專長生髮醫學與整體醫學規劃。",
  },
];

export function getDoctorBySlug(slug: string): DoctorDetail | undefined {
  return DOCTOR_DETAILS.find((d) => d.slug === slug);
}
