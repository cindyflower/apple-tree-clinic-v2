/**
 * Local images: /images/{00_…17_…}/ + /images/_root/ (loose files).
 * Synced to client/public/images on dev/build (vitePluginSyncTreatmentImages).
 */
import { withBase } from "./basePath";

export const F = {
  brand: "00_品牌與環境",
  banner: "01_橫幅Banner",
  laser: "services/01_雷射電音波",
  injection: "services/02_微整注射",
  surgery: "services/03_整型外科",
  body: "services/04_減重與形體雕塑",
  men: "services/06_型男醫美",
  skin: "services/13_肌膚管理",
  regen: "services/07_再生醫學",
  hair: "services/08_生髮門診",
  nutrition: "services/09_輔助醫學療法",
  functional: "services/10_功能醫學與精準檢測",
  happy: "services/11_快樂門診",
  vaccine: "services/12_自費疫苗",
  feminine: "services/05_女性私密美學",
  nhiSkin: "services/14_健保皮膚科",
  nhiPain: "services/15_疼痛科",
  cases: "案例Banner",
  doctors: "醫師照片",
  beidaEnv: "北大院區照片",
  nanjingEnv: "南京院區照片",
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
  hero: img(F.brand, "hero-wellness-beauty.jpg"),
  heroBeauty: img(F.brand, "hero-wellness-beauty-2.jpg"),
  heroApple: img(F.brand, "hero-wellness-beauty-3.jpg"),
  abstract: img(F.brand, "luxury-abstract.webp"),
  clinicReception: img(F.brand, "clinic-reception-luxury.jpg"),
  clinicTreatmentRoom: img(F.brand, "clinic-treatment-room.jpg"),
  clinicConsultation: img(F.brand, "clinic-consultation.jpg"),
  teamBanner: img(F.brand, "team-banner.png"),
  bannerCollagen: img(F.banner, "banner-collagen.jpeg"),
  bannerMounjaro: img(F.banner, "banner-mounjaro.jpeg"),
  bannerCta: img(F.banner, "cta-banner.png"),
  nhiDermatologyHero: img(F.nhiSkin, "nhi-dermatology-hero-v2.png"),
  painManagementHero: img(F.nhiPain, "pain-management-hero.png"),
  /** 詳情頁通用 Hero 佔位（尚無專屬橫幅的療程） */
  heroBanner: img("services", "HeroBanner.jpg"),
  threadLiftHero: img(F.injection, "14.塑立愛立提線.jpg"),
  treatmentZwave: img(F.laser, "Z音波拉提_cover.jpg"),
  zwaveHero: img(F.laser, "Z音波拉提.jpg"),
  treatmentPicosure: img(F.laser, "755皮秒蜂巢雷射_cover.jpg"),
  treatmentHaifu: img(F.laser, "海芙電波_cover.jpg"),
  caseEyebag: img(`${F.surgery}/1_眼部`, "眼袋手術_cover.jpg"),
  caseDoubleEyelid: img(`${F.surgery}/1_眼部`, "雙眼皮手術_cover.jpg"),
  caseHydrafacialMale: img(F.men, "case-hydrafacial-male.jpeg"),
  caseHydrafacialMaleBA: img(F.men, "case-hydrafacial-male.jpeg"),
  caseTalentAbs: img("cases", "case-talent-a-abs.jpeg"),
  caseTalentHip: img("cases", "case-talent-a-hip.jpeg"),
  caseBannerBeauty: img(F.cases, "case-banner-beauty.jpeg"),
  vaccineHero: img(F.vaccine, "自費疫苗接種.jpg"),
  icooneHero: img(F.body, "icoone.jpg"),
  xuyanHero: imgRoot("xuyan-hero-woman-W5xxi3ZwZHPDzSisn66nV4.webp"),
  logoGreen: imgRoot("logo-green-270_1d09d370.png"),
  heroVisual: imgRoot("hero_visual.jpg"),
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

/** 醫師照片檔名（images/醫師照片/，順序 1～9） */
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

function clinicPhotos(
  folder: string,
  clinicName: string,
  filenames: readonly string[],
  labels: readonly string[],
): ClinicPhoto[] {
  return filenames.map((file, i) => ({
    src: img(folder, file),
    alt: `${clinicName} — ${labels[i] ?? `環境 ${i + 1}`}`,
    label: labels[i] ?? `環境 ${i + 1}`,
  }));
}

/** 北大診所環境照 — images/北大院區照片/01~07.jpg */
const BEIDA_ENV_LABELS = [
  "候診區",
  "接待櫃檯",
  "院所空間",
  "療程室",
  "診間環境",
  "休息空間",
  "走廊通道",
] as const;

const BEIDA_ENV_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
] as const;

/** 南京旗艦環境照 — images/南京院區照片/01~08.jpg */
const NANJING_ENV_LABELS = [
  "候診休憩區",
  "接待空間",
  "諮詢室",
  "療程空間",
  "候診環境",
  "院所走廊",
  "品牌形象牆",
  "休憩區域",
] as const;

const NANJING_ENV_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
] as const;

export const NANJING_CLINIC_PHOTOS = clinicPhotos(
  F.nanjingEnv,
  "南京旗艦院所",
  NANJING_ENV_FILES,
  NANJING_ENV_LABELS,
);

export const BEIDA_CLINIC_PHOTOS = clinicPhotos(
  F.beidaEnv,
  "北大診所",
  BEIDA_ENV_FILES,
  BEIDA_ENV_LABELS,
);

export const TREATMENT_IMG = {
  "喬雅露": img(F.injection, "1.逆時針_cover.jpg"),
  "逆時針": img(F.injection, "2.璞菲洛_cover.jpg"),
  "Sunmax 膠原蛋白（熊貓針）": img(F.injection, "3.Sunmax膠原蛋白-熊貓針_cover.jpg"),
  "VivaBella 薇貝拉": img(F.injection, "4.VivaBella薇貝拉_cover.jpg"),
  "AestheFill 艾麗斯": img(F.injection, "5.AestheFill艾麗斯_cover.jpg"),
  "Ellanse 洢蓮絲": img(F.injection, "6.Ellanse洢蓮絲_cover.jpg"),
  "Sculptra 舒顏萃": img(F.injection, "7.Sculptra舒顏萃_cover.jpg"),
  "肉毒桿菌": img(F.injection, "8.肉毒桿菌_cover.jpg"),
  "保提拉肉毒": img(F.injection, "9.保提拉肉毒_cover.jpg"),
  "喬雅登玻尿酸": img(F.injection, "10.喬雅登玻尿酸_cover.jpg"),
  "緹奧希玻尿酸": img(F.injection, "11.緹奧希玻尿酸_cover.jpg"),
  "思妃公主玻尿酸": img(F.injection, "12.思妃公主玻尿酸_cover.jpg"),
  "BELKYRA 倍克脂": img(F.injection, "13.BELKYRA倍克脂_cover.jpg"),
  "塑立愛立提線": img(F.injection, "14.塑立愛立提線_cover.jpg"),
  "腋下止汗": img(F.injection, "15.腋下止汗_cover.jpg"),
  "玻尿酸填充": img(F.injection, "10.喬雅登玻尿酸_cover.jpg"),
  "雙眼皮手術": img(`${F.surgery}/1_眼部`, "雙眼皮手術_cover.jpg"),
  "開眼頭/開眼尾": img(`${F.surgery}/1_眼部`, "開眼頭開眼尾_cover.jpg"),
  "韓式隆鼻手術": img(`${F.surgery}/2_鼻部`, "韓式隆鼻手術_cover.jpg"),
  "卡麥拉隆鼻手術": img(`${F.surgery}/2_鼻部`, "卡麥拉隆鼻手術_cover.jpg"),
  "縮鼻翼手術": img(`${F.surgery}/2_鼻部`, "縮鼻翼手術_cover.jpg"),
  "縮鼻頭手術": img(`${F.surgery}/2_鼻部`, "縮鼻頭手術_cover.jpg"),
  "果凍矽膠隆乳": img(`${F.surgery}/3_胸型身形`, "果凍矽膠隆乳_cover.jpg"),
  "眼袋手術": img(`${F.surgery}/1_眼部`, "眼袋手術_cover.jpg"),
  "提胸手術": img(`${F.surgery}/3_胸型身形`, "提胸手術_cover.jpg"),
  "自體脂肪隆乳手術": img(`${F.surgery}/3_胸型身形`, "自體脂肪隆乳手術_cover.jpg"),
  "自體脂肪移植手術": img(`${F.surgery}/4_抽脂與拉皮`, "自體脂肪移植手術_cover.jpg"),
  "無痕拉皮手術": img(`${F.surgery}/4_抽脂與拉皮`, "無痕拉皮手術_cover.jpg"),
  "Wegovy 週纖達": img(F.body, "Wegovy週纖達_cover.jpg"),
  "Mounjaro 猛健樂": img(F.body, "Mounjaro猛健樂_cover.jpg"),
  "Talent-A 動磁波": img(F.body, "Talent-A動磁波_cover.jpg"),
  "ICOONE": img(F.body, "icoone_cover.jpg"),
  "消脂針/消脂點滴": img(F.body, "消脂針消脂點滴_cover.jpg"),
  "瑞倍適": img(F.body, "瑞倍適_cover.jpg"),
  "男性除毛": img(F.men, "男性除毛_cover.jpg"),
  "男性微整": img(F.men, "男性微整_cover.jpg"),
  "男性痘疤": img(F.men, "男性痘疤_cover.jpg"),
  "男性生髮": img(F.men, "男性生髮_cover.jpg"),
  "男性體雕": img(F.men, "男性體雕_cover.jpg"),
  "增生療法": img(F.regen, "增生療法_cover.jpg"),
  "IHT（PRP）注射療法": img(F.regen, "IHT（PRP）注射療法_cover.jpg"),
  "頭皮檢測": img(F.hair, "1.頭皮檢測_cover.jpg"),
  "不動刀育髮": img(F.hair, "2.不動刀育髮_cover.jpg"),
  "毛髮護理": img(F.hair, "3.毛髮護理_cover.jpg"),
  "氦氖雷射 ILIB": img(F.nutrition, "氦氖雷射ILIB_cover.jpg"),
  "點滴針劑": img(F.nutrition, "點滴針劑_cover.jpg"),
  "音樂治療": img(F.nutrition, "音樂治療.jpg"),
  "基因檢測": img(F.functional, "基因檢測_cover.jpg"),
  "3DMRA 檢測": img(F.functional, "3DMRA檢測_cover.jpg"),
  "腦波檢測": img(F.functional, "腦波檢測_cover.jpg"),
  "腸道菌叢分析": img(F.functional, "腸道菌叢分析_cover.jpg"),
  "HRV 自律神經分析": img(F.functional, "HRV自律神經分析_cover.jpg"),
  "PTG 血管分析": img(F.functional, "PTG血管分析_cover.jpg"),
  "快樂門診": img(F.happy, "快樂門診.jpg"),
  "自費疫苗接種": img(F.vaccine, "自費疫苗接種_cover.jpg"),
  "AI 智慧皮膚檢測儀": img(F.skin, "1.AI智慧皮膚檢測儀_cover.jpg"),
  "水光注射": img(F.skin, "2.水光注射_cover.jpg"),
  "Rejuran 麗珠蘭": img(F.skin, "3.麗珠蘭_cover.jpg"),
  "無針水光": img(F.skin, "4.無針水光_cover.jpg"),
  "水飛梭": img(F.skin, "5.水飛梭_cover.jpg"),
  "O2 to Derm 氧氣面罩": img(F.skin, "6.氧氣面罩_cover.jpg"),
  "AI 光譜治療": img(F.skin, "7.AI光譜治療_cover.jpg"),
  "安瓶導入": img(F.skin, "8.安瓶導入_cover.jpg"),
  "手工清痘與清粉刺": img(F.skin, "9.手工清痘與清粉刺_cover.jpg"),
  "法國多酚精萃晶膜": img(F.skin, "10.法國多酚精萃晶膜_cover.jpg"),
  "高濃度杏仁酸": img(F.skin, "11.高濃度杏仁酸亮膚療程_cover.jpg"),
  "超級玻尿酸鎖水保濕面膜": img(F.skin, "12.超級玻尿酸鎖水保濕面膜_cover.jpg"),
  "肌光潔顏蜜": img(F.skin, "13.肌光潔顏蜜_cover.jpg"),
  "膠原膜（膠原蛋白面膜）": img(F.skin, "膠原膜.jpg"),
  "索夫波": img(F.laser, "索夫波_cover.jpg"),
  "美國極線音波2.0": img(F.laser, "美國極線音波2.0_cover.jpg"),
  "鳳凰電波": img(F.laser, "鳳凰電波_cover.jpg"),
  "克萊媞雷射2.0": img(F.laser, "克萊媞雷射2.0_cover.jpg"),
  "立特拉渦旋音波": img(F.laser, "立特拉渦旋音波_cover.jpg"),
  "海芙電波": img(F.laser, "海芙電波_cover.jpg"),
  "海芙音波": img(F.laser, "海芙音波_cover.jpg"),
  "清新微波": img(F.laser, "清新微波(腋下止汗)_cover.jpg"),
  "乳暈手術": img(`${F.surgery}/3_胸型身形`, "乳暈手術_cover.jpg"),
  "抽脂手術": img(`${F.surgery}/4_抽脂與拉皮`, "抽脂手術_cover.jpg"),
  "平胸手術": img(`${F.surgery}/3_胸型身形`, "平胸手術_cover.jpg"),
  "私密處雷射": img(F.feminine, "1.私密處雷射_cover.jpg"),
  "薇薇電波": img(F.feminine, "2.薇薇電波_cover.jpg"),
  "陰道緊緻手術": img(F.feminine, "3.陰道緊緻手術_cover.jpg"),
  "小陰唇美型手術": img(F.feminine, "4.小陰唇美型手術_cover.jpg"),
  "陰蒂拉提手術": img(F.feminine, "5.陰蒂拉提手術_cover.jpg"),
  "G點注射": img(F.feminine, "6.G點注射_cover.jpg"),
  "陰道洞口重建手術": img(F.feminine, "7.陰道洞口重建手術_cover.jpg"),
  "HPV子宮頸癌疫苗": img(F.feminine, "8.HPV子宮頸癌疫苗_cover.jpg"),
  "疼痛管理": img(F.nhiPain, "疼痛科_cover.jpg"),
  "疼痛科": img(F.nhiPain, "疼痛科_cover.jpg"),
} as const satisfies Record<string, string>;

/**
 * 療程卡片圖解析（一致規則）：
 * 1. 若 TREATMENT_IMG 有明確對應 → 用它
 * 2. 否則若有給分類資料夾 → 自動找 {名稱}_cover.jpg（與健保科同一套規則）
 * 3. 都沒有 → 通用佔位圖
 */
export function treatmentImg(name: string, folder?: string): string {
  const explicit = (TREATMENT_IMG as Record<string, string>)[name];
  if (explicit) return explicit;
  if (folder) return img(folder, `${name}_cover.jpg`);
  return IMAGES.heroBanner;
}

/** 各服務分類 → 對應圖片資料夾（供 treatmentImg fallback 用，規則：folder/{名稱}_cover.jpg） */
export const CATEGORY_FOLDER = {
  laser: F.laser,
  injection: F.injection,
  "surgery-eye": `${F.surgery}/1_眼部`,
  "surgery-nose": `${F.surgery}/2_鼻部`,
  "surgery-breast": `${F.surgery}/3_胸型身形`,
  "surgery-lipo": `${F.surgery}/4_抽脂與拉皮`,
  body: F.body,
  feminine: F.feminine,
  men: F.men,
  regen: F.regen,
  hair: F.hair,
  nutrition: F.nutrition,
  functional: F.functional,
  happy: F.happy,
  vaccine: F.vaccine,
  skin: F.skin,
  "nhi-skin": F.nhiSkin,
  "nhi-pain": F.nhiPain,
} as const satisfies Record<string, string>;

/** 整型外科各療程詳情頁 Hero 橫幅（1920×540），檔名與療程一致 */
export const SURGERY_HERO = {
  "double-eyelid": img(`${F.surgery}/1_眼部`, "雙眼皮手術.jpg"),
  "epicanthoplasty": img(`${F.surgery}/1_眼部`, "開眼頭開眼尾.jpg"),
  "eyebag-surgery": img(`${F.surgery}/1_眼部`, "眼袋手術.jpg"),
  "rhinoplasty": img(`${F.surgery}/2_鼻部`, "韓式隆鼻手術.jpg"),
  "camay-rhinoplasty": img(`${F.surgery}/2_鼻部`, "卡麥拉隆鼻手術.jpg"),
  "alar-reduction": img(`${F.surgery}/2_鼻部`, "縮鼻翼手術.jpg"),
  "tip-plasty": img(`${F.surgery}/2_鼻部`, "縮鼻頭手術.jpg"),
  "breast-implant": img(`${F.surgery}/3_胸型身形`, "果凍矽膠隆乳.jpg"),
  "autologous-breast": img(`${F.surgery}/3_胸型身形`, "自體脂肪隆乳手術.jpg"),
  "breast-lift": img(`${F.surgery}/3_胸型身形`, "提胸手術.jpg"),
  "areola-surgery": img(`${F.surgery}/3_胸型身形`, "乳暈手術.jpg"),
  "flat-chest-surgery": img(`${F.surgery}/3_胸型身形`, "平胸手術.jpg"),
  "liposuction": img(`${F.surgery}/4_抽脂與拉皮`, "抽脂手術.jpg"),
  "fat-transfer": img(`${F.surgery}/4_抽脂與拉皮`, "自體脂肪移植手術.jpg"),
  "facelift": img(`${F.surgery}/4_抽脂與拉皮`, "無痕拉皮手術.jpg"),
} as const satisfies Record<string, string>;

/** 雷射電音波各療程詳情頁 Hero 橫幅，檔名與療程一致（非 _cover 版） */
export const LASER_HERO = {
  "thermage-flx": img(F.laser, "海芙電波.jpg"),
  "ulthera-2": img(F.laser, "美國極線音波2.0.jpg"),
  "thermage-phoenix": img(F.laser, "鳳凰電波.jpg"),
  "clarity-ii": img(F.laser, "克萊媞雷射2.0.jpg"),
  "liftera-v": img(F.laser, "立特拉渦旋音波.jpg"),
  "haifu-ultrasound": img(F.laser, "海芙音波.jpg"),
  sofwave: img(F.laser, "索夫波.jpg"),
  "microwave-sweat": img(F.laser, "清新微波(腋下止汗).jpg"),
} as const satisfies Record<string, string>;

/** 減重與形體雕塑各療程詳情頁 Hero 橫幅（1920×540），檔名與療程一致（非 _cover 版） */
export const BODY_HERO = {
  wegovy: img(F.body, "Wegovy週纖達.jpg"),
  mounjaro: img(F.body, "Mounjaro猛健樂.jpg"),
  "talent-a": img(F.body, "Talent-A動磁波.jpg"),
  icoone: img(F.body, "icoone.jpg"),
  "fat-dissolve": img(F.body, "消脂針消脂點滴.jpg"),
} as const satisfies Record<string, string>;

/** 女性私密美學各療程詳情頁 Hero 橫幅 */
export const FEMININE_HERO = {
  "feminine-laser": img(F.feminine, "1.私密處雷射.jpg"),
  viveve: img(F.feminine, "2.薇薇電波.jpg"),
  "vaginal-tightening": img(F.feminine, "3.陰道緊緻手術.jpg"),
  labiaplasty: img(F.feminine, "4.小陰唇美型手術.jpg"),
  "clitoral-lift": img(F.feminine, "5.陰蒂拉提手術.jpg"),
  "g-spot-injection": img(F.feminine, "6.G點注射.jpg"),
  "vaginal-opening-reconstruction": img(F.feminine, "7.陰道洞口重建手術.jpg"),
  "hpv-vaccine": img(F.feminine, "8.HPV子宮頸癌疫苗.jpg"),
} as const satisfies Record<string, string>;

/** 型男醫美各療程詳情頁 Hero 橫幅 */
export const MEN_HERO = {
  "men-hair-removal": img(F.men, "男性除毛.jpg"),
  "men-aesthetics": img(F.men, "男性微整.jpg"),
  "men-acne-scar": img(F.men, "男性痘疤.jpg"),
  "men-hair-restoration": img(F.men, "男性生髮.jpg"),
  "men-body-sculpting": img(F.men, "男性體雕.jpg"),
} as const satisfies Record<string, string>;

/** 再生醫學各療程詳情頁 Hero 橫幅 */
export const REGEN_HERO = {
  prolotherapy: img(F.regen, "增生療法.jpg"),
  "iht-prp": img(F.regen, "IHT（PRP）注射療法.jpg"),
} as const satisfies Record<string, string>;

/** 生髮門診各療程詳情頁 Hero 橫幅 */
export const HAIR_HERO = {
  "scalp-detection": img(F.hair, "1.頭皮檢測.jpg"),
  "non-surgical-hair": img(F.hair, "2.不動刀育髮.jpg"),
  "scalp-care": img(F.hair, "3.毛髮護理.jpg"),
} as const satisfies Record<string, string>;

/** 輔助醫學療法各療程詳情頁 Hero 橫幅 */
export const NUTRITION_HERO = {
  "ilib-laser": img(F.nutrition, "氦氖雷射ILIB.jpg"),
  "nutrition-iv-drip": img(F.nutrition, "點滴針劑.jpg"),
  "music-therapy": img(F.nutrition, "音樂治療.jpg"),
} as const satisfies Record<string, string>;

/** 功能醫學與精準檢測各療程詳情頁 Hero 橫幅 */
/** 微整注射各療程詳情頁 Hero 橫幅 */
export const INJECTION_HERO = {
  juvelook: img(F.injection, "1.逆時針.jpg"),
  profhilo: img(F.injection, "2.璞菲洛.jpg"),
  "sunmax-panda": img(F.injection, "3.Sunmax膠原蛋白-熊貓針.jpg"),
  vivabella: img(F.injection, "4.VivaBella薇貝拉.jpg"),
  "collagen-regeneration": img(F.banner, "banner-collagen.jpeg"),
  aesthefill: img(F.injection, "5.AestheFill艾麗斯.jpg"),
  ellanse: img(F.injection, "6.Ellanse洢蓮絲.jpg"),
  sculptra: img(F.injection, "7.Sculptra舒顏萃.jpg"),
  botox: img(F.injection, "8.肉毒桿菌.jpg"),
  letybo: img(F.injection, "9.保提拉肉毒.jpg"),
  juvederm: img(F.injection, "10.喬雅登玻尿酸.jpg"),
  teoxane: img(F.injection, "11.緹奧希玻尿酸.jpg"),
  saypha: img(F.injection, "12.思妃公主玻尿酸.jpg"),
  belkyra: img(F.injection, "13.BELKYRA倍克脂.jpg"),
  "thread-lift": img(F.injection, "14.塑立愛立提線.jpg"),
  "underarm-botox": img(F.injection, "15.腋下止汗.jpg"),
} as const satisfies Record<string, string>;

export const FUNCTIONAL_HERO = {
  "functional-medicine": img(F.functional, "3DMRA檢測.jpg"),
  "gene-testing": img(F.functional, "基因檢測.jpg"),
  "3dmra-scan": img(F.functional, "3DMRA檢測.jpg"),
  "brainwave-detection": img(F.functional, "腦波檢測.jpg"),
  "gut-microbiome": img(F.functional, "腸道菌叢分析.jpg"),
  "hrv-analysis": img(F.functional, "HRV自律神經分析.jpg"),
  "ptg-vascular": img(F.functional, "PTG血管分析.jpg"),
} as const satisfies Record<string, string>;

/** 肌膚管理各療程詳情頁 Hero 橫幅 */
export const SKIN_HERO = {
  "ai-skin-analysis": img(F.skin, "1.AI智慧皮膚檢測儀.jpg"),
  "water-glow": img(F.skin, "2.水光注射.jpg"),
  rejuran: img(F.skin, "3.麗珠蘭.jpg"),
  "needle-free-glow": img(F.skin, "4.無針水光.jpg"),
  hydrafacial: img(F.skin, "5.水飛梭.jpg"),
  "oxygen-mask": img(F.skin, "6.氧氣面罩.jpg"),
  "ai-spectrum": img(F.skin, "7.AI光譜治療.jpg"),
  "ampule-infusion": img(F.skin, "8.安瓶導入.jpg"),
  "manual-acne-extraction": img(F.skin, "9.手工清痘與清粉刺.jpg"),
  "french-polyphenol-mask": img(F.skin, "10.法國多酚精萃晶膜.jpg"),
  "mandelic-acid-peel": img(F.skin, "11.高濃度杏仁酸亮膚療程.jpg"),
  "super-hyaluronic-mask": img(F.skin, "12.超級玻尿酸鎖水保濕面膜.jpg"),
  "skin-glow-serum": img(F.skin, "13.肌光潔顏蜜.jpg"),
  "collagen-mask": img(F.skin, "膠原膜.jpg"),
} as const satisfies Record<string, string>;
