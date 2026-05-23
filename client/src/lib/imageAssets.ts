/**
 * Local images: /images/{00_…15_…}/ + /images/_root/ (loose files).
 * Synced to client/public/images on dev/build (vitePluginSyncTreatmentImages).
 */
import { withBase } from "./basePath";

export const F = {
  brand: "00_品牌與環境",
  banner: "01_橫幅Banner",
  laser: "02_雷射電音波",
  injection: "03_微整注射",
  surgery: "04_整型外科",
  body: "05_形體雕塑",
  men: "06_型男醫美",
  skin: "07_肌膚管理",
  cases: "08_案例Banner",
  regen: "09_再生醫學",
  hair: "10_生髮門診",
  nutrition: "11_營養醫學",
  functional: "12_功能醫學檢測",
  happy: "13_快樂門診",
  vaccine: "14_預防保健",
  doctors: "15_醫師照片",
} as const;

export function img(folder: string, filename: string): string {
  const dir = folder.split("/").map((s) => encodeURIComponent(s)).join("/");
  return withBase(`/images/${dir}/${encodeURIComponent(filename)}`);
}

/** Loose files at /images/*.jpg (doctors, clinic DSC, etc.) */
export function imgRoot(filename: string): string {
  return withBase(`/images/_root/${encodeURIComponent(filename)}`);
}

export const IMAGES = {
  hero: img(F.brand, "hero-wellness-beauty-1.jpg"),
  heroBeauty: img(F.brand, "hero-wellness-beauty-2.jpg"),
  heroApple: img(F.brand, "hero-wellness-beauty-3.jpg"),
  abstract: img(F.brand, "luxury-abstract.webp"),
  clinicReception: img(F.brand, "clinic-reception-luxury.jpg"),
  clinicTreatmentRoom: img(F.brand, "clinic-treatment-room.jpg"),
  clinicConsultation: img(F.brand, "clinic-consultation.jpg"),
  teamBanner: img(F.brand, "team-banner.png"),
  bannerCollagen: img(F.banner, "banner-collagen.jpeg"),
  bannerMounjaro: img(F.banner, "banner-mounjaro.jpeg"),
  treatmentAmpule: img(F.injection, "treatment-ampule.jpeg"),
  treatmentLed: img(F.laser, "treatment-led.jpeg"),
  treatmentZwave: img(F.laser, "treatment-zwave-new.jpeg"),
  treatmentPicosure: img(F.laser, "755蜂巢2.jpg"),
  treatmentHaifu: img(F.laser, "海芙音波2.jpg"),
  caseEyebag: img(F.surgery, "case-eyebag-male-ba.jpeg"),
  caseDoubleEyelid: img(F.surgery, "case-double-eyelid-ba.jpeg"),
  caseHydrafacialWaterlight: img(F.skin, "case-hydrafacial-waterlight.jpeg"),
  caseHydrafacialMale: img(F.men, "case-hydrafacial-male.jpeg"),
  caseHydrafacialMaleBA: img(F.men, "case-hydrafacial-male.jpeg"),
  caseAesthefill: img(F.injection, "case-aesthefill.jpeg"),
  caseTalentAbs: img(F.body, "case-talent-a-abs.jpeg"),
  caseTalentHip: img(F.body, "case-talent-a-hip.jpeg"),
  caseBannerBeauty: img(F.cases, "case-banner-beauty.jpeg"),
  xuyanHero: imgRoot("xuyan-hero-woman-W5xxi3ZwZHPDzSisn66nV4.webp"),
  logoGreen: imgRoot("logo-green-270_1d09d370.png"),
  heroVisual: imgRoot("hero-visual_0e1c21df.jpg"),
  meetXuyan: imgRoot("認識序顏_7d037d9e.png"),
  faceSagging: imgRoot("sagging_3891c1e1.png"),
  faceCollagen: imgRoot("hollow-alt_33d0a0ce.png"),
  faceSkin: imgRoot("hollow_3c4d191f.png"),
  faceFatigue: imgRoot("fatigue_c71f0311.png"),
  videoAiDetection: imgRoot("序顏Ai檢測_a9a7e486.mp4"),
  videoProcessFlow: imgRoot("介紹序顏如何幫助你的流程影片_f3b7f377.mp4"),
  videoFaceSagging: imgRoot("CHRONICSAGGINGTYPE_df4163a2.mp4"),
  videoFaceCollagen: imgRoot("COLLAGENLOSSTYPE_2dc5a8bd.mp4"),
  videoFaceSkin: imgRoot("SKINCONDITIONDRAGGINGTYPE_06486c7d.mp4"),
  videoFaceFatigue: imgRoot("OVERALLFATIGUETYPE_8a51858b.mp4"),
};

/** 醫師照片檔名（images/15_醫師照片/，順序 1～9） */
export const DOCTOR_FILES = {
  "孟祥越 院長": "1.醫師_孟祥越.jpg",
  "江得信 醫師": "2.醫師_江得信.jpg",
  "林錦生 醫師": "3.醫師_林錦生.jpg",
  "李俊豪 醫師": "4.醫師_李俊豪.jpg",
  "吳其穎 醫師": "5.醫師_吳其穎.jpg",
  "劉佳政 醫師": "6.醫師_劉佳政.jpg",
  "陳韜名 醫師": "7.醫師_陳韜名.jpg",
  "林漢文 醫師": "8.醫師_林漢文.jpg",
  "陳君琳 醫師": "9.醫師_陳君琳.jpg",
} as const satisfies Record<string, string>;

export const DOCTOR_IMG: Record<string, string> = Object.fromEntries(
  Object.entries(DOCTOR_FILES).map(([name, file]) => [name, img(F.doctors, file)])
);

export function doctorImg(name: string, fallback: string): string {
  return DOCTOR_IMG[name] ?? fallback;
}

export type ClinicPhoto = { src: string; alt: string; label: string };

export const NANJING_CLINIC_PHOTOS: ClinicPhoto[] = [
  { src: imgRoot("DSC00038_7ee1265c.jpg"), alt: "南京旗艦院所 — 寬敞舒適的候診休憩區", label: "候診休憩區" },
  { src: imgRoot("DSC00039_f2040faf.jpg"), alt: "南京旗艦院所 — 明亮現代的接待空間", label: "接待空間" },
  { src: imgRoot("DSC00041_f6d1125f.jpg"), alt: "南京旗艦院所 — 專業諮詢室", label: "諮詢室" },
  { src: imgRoot("DSC00050_b560d97e.jpg"), alt: "南京旗艦院所 — 精緻療程空間", label: "療程空間" },
  { src: imgRoot("DSC00057_c86cc3b2.jpg"), alt: "南京旗艦院所 — 溫馨候診環境", label: "候診環境" },
  { src: imgRoot("DSC00064_57c149a2.jpg"), alt: "南京旗艦院所 — 院所走廊", label: "院所走廊" },
  { src: imgRoot("IMG_3818_1799747f.jpg"), alt: "南京旗艦院所 — 品牌形象牆", label: "品牌形象牆" },
];

export const BEIDA_CLINIC_PHOTOS: ClinicPhoto[] = [
  { src: imgRoot("北大環境照-1_a633ce7a.jpg"), alt: "北大診所 — 現代簡約候診區", label: "候診區" },
  { src: imgRoot("北大環境照-2_6a5082db.jpg"), alt: "北大診所 — 接待櫃檯", label: "接待櫃檯" },
  { src: imgRoot("S__146128939_0_910da6cb.jpg"), alt: "北大診所 — 院所空間", label: "院所空間" },
  { src: imgRoot("北大環境照-4_beaf658a.jpg"), alt: "北大診所 — 療程室", label: "療程室" },
  { src: imgRoot("北大環境照-5_ca96d86d.jpg"), alt: "北大診所 — 診間環境", label: "診間環境" },
  { src: imgRoot("北大環境照-6_cff0468b.jpg"), alt: "北大診所 — 休息空間", label: "休息空間" },
  { src: imgRoot("北大環境照-7_f0797dd9.jpg"), alt: "北大診所 — 走廊通道", label: "走廊通道" },
];

export const TREATMENT_IMG = {
  "Sunmax 膠原蛋白（熊貓針）": img(F.injection, "Sunmax膠原蛋白-熊貓針.jpg"),
  "VivaBella 薇貝拉": img(F.injection, "VivaBella薇貝拉.jpg"),
  "肉毒桿菌": img(F.injection, "肉毒桿菌.jpg"),
  "BELKYRA 倍克脂": img(F.injection, "BELKYRA倍克脂.jpg"),
  "玻尿酸填充": img(F.injection, "玻尿酸填充.jpg"),
  "Volite 長效保濕針": img(F.injection, "Volite長效保濕針.jpg"),
  "Sculptra 舒顏萃": img(F.injection, "Sculptra舒顏萃.jpg"),
  "Ellanse 洢蓮絲": img(F.injection, "Ellanse洢蓮絲.jpg"),
  "AestheFill 艾麗斯": img(F.injection, "AestheFill艾麗斯.jpg"),
  "塑立愛 少女立提線": img(F.injection, "塑立愛少女立提線.jpg"),
  "腋下止汗": img(F.injection, "腋下止汗.jpg"),
  "雙眼皮手術": img(F.surgery, "case-double-eyelid-ba.jpeg"),
  "開眼頭/開眼尾": img(F.surgery, "開眼頭開眼尾.jpg"),
  "韓式隆鼻手術": img(F.surgery, "韓式隆鼻手術.jpg"),
  "卡麥拉隆鼻手術": img(F.surgery, "卡麥拉隆鼻手術.jpg"),
  "縮鼻翼手術": img(F.surgery, "縮鼻翼手術.jpg"),
  "縮鼻頭手術": img(F.surgery, "縮鼻頭手術.jpg"),
  "果凍矽膠隆乳": img(F.surgery, "果凍矽膠隆乳.jpg"),
  "眼袋手術": img(F.surgery, "case-eyebag-male-ba.jpeg"),
  "提胸手術": img(F.surgery, "提胸手術.jpg"),
  "自體脂肪隆乳手術": img(F.surgery, "自體脂肪隆乳手術.jpg"),
  "自體脂肪移植手術": img(F.surgery, "自體脂肪移植手術.jpg"),
  "無痕拉皮手術": img(F.surgery, "無痕拉皮手術.jpg"),
  "Wegovy 週纖達": img(F.body, "Wegovy週纖達.jpg"),
  "Mounjaro 猛健樂": img(F.body, "Mounjaro猛健樂.jpg"),
  "Talent-A 動磁波": img(F.body, "Talent-A動磁波.jpg"),
  "減肥筆": img(F.body, "減肥筆.jpg"),
  "ICOONE": img(F.body, "ICOONE.jpg"),
  "消脂針/消脂點滴": img(F.body, "消脂針消脂點滴.jpg"),
  "男性除毛": img(F.men, "男性除毛.jpeg"),
  "男性微整": img(F.men, "男性微整.jpg"),
  "男性痘疤": img(F.men, "男性痘疤.jpg"),
  "男性生髮": img(F.men, "男性生髮.jpg"),
  "男性體雕": img(F.men, "男性體雕.jpg"),
  "增生療法": img(F.regen, "增生療法.png"),
  "IHT（PRP）注射療法": img(F.regen, "IHT-PRP注射療法.jpg"),
  "不動刀育髮": img(F.hair, "不動刀育髮.jpg"),
  "毛髮護理": img(F.hair, "毛髮護理.jpg"),
  "頭皮檢測": img(F.hair, "頭皮檢測.jpg"),
  "氦氖雷射 ILIB": img(F.nutrition, "氦氖雷射ILIB.jpg"),
  "點滴針劑": img(F.nutrition, "點滴針劑.jpg"),
  "營養配方": img(F.nutrition, "營養配方.jpeg"),
  "基因檢測": img(F.functional, "基因檢測.jpg"),
  "3DMRA 檢測": img(F.functional, "3DMRA檢測.jpg"),
  "腦波檢測": img(F.functional, "腦波檢測.jpg"),
  "腸道菌叢分析": img(F.functional, "腸道菌叢分析.jpg"),
  "HRV 自律神經分析": img(F.functional, "HRV自律神經分析.jpg"),
  "PTG 血管分析": img(F.functional, "PTG血管分析.jpg"),
  "快樂門診": img(F.happy, "快樂門診.jpg"),
  "音樂治療": img(F.happy, "音樂治療.jpg"),
  "自費疫苗接種": img(F.vaccine, "自費疫苗接種.jpg"),
  "Rejuran 麗珠蘭": img(F.skin, "Rejuran麗珠蘭.jpg"),
  "超級玻尿酸鎖水保濕面膜": img(F.skin, "超級玻尿酸鎖水保濕面膜.jpg"),
  "膠原膜（膠原蛋白面膜）": img(F.skin, "膠原膜.jpg"),
  "安瓶導入": img(F.skin, "安瓶導入.jpg"),
  "AI 光譜治療": img(F.skin, "AI光譜治療.jpg"),
  "O2 to Derm 氧氣面罩": img(F.skin, "O2toDerm氧氣面罩.jpg"),
  "索夫波": img(F.laser, "索夫波.jpg"),
  "乳暈手術": img(F.surgery, "乳暈手術.jpg"),
  "抽脂手術": img(F.surgery, "抽脂手術.jpg"),
  "平胸手術": img(F.surgery, "平胸手術.jpg"),
  "私密處雷射": img(F.surgery, "私密處雷射.jpg"),
  "醫學美容SPA": img(F.skin, "醫學美容SPA.jpg"),
} as const satisfies Record<string, string>;

export function treatmentImg(name: string): string {
  return (TREATMENT_IMG as Record<string, string>)[name] ?? IMAGES.treatmentAmpule;
}
