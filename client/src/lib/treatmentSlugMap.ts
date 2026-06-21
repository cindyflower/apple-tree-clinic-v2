/**
 * treatmentSlugMap — Maps treatment item names from constants.ts
 * to their detail page slugs in treatmentDetails.ts
 *
 * Only treatments with full detail pages are included.
 * Used by ServicesSection to generate proper links.
 */

// Name in constants.ts → slug in treatmentDetails.ts
const TREATMENT_SLUG_MAP: Record<string, string> = {
  // ── 雷射電音波 ──
  "PicoSure 755 皮秒蜂巢雷射": "picosure-755",
  "皮秒蜂巢雷射": "picosure-755",
  "海芙電波": "thermage-flx",
  "Z音波拉提": "z-wave-lifting",
  "美國極線音波2.0": "ulthera-2",
  "鳳凰電波": "thermage-phoenix",
  "克萊媞雷射2.0": "clarity-ii",
  "立特拉渦旋音波": "liftera-v",
  "海芙音波": "haifu-ultrasound",
  "索夫波": "sofwave",
  "清新微波": "microwave-sweat",

  // ── 微整注射（卡片順序見 images/services/02_微整注射/ 1–15 編號）──
  "喬雅露": "juvelook",
  "逆時針": "profhilo",
  "Sunmax 膠原蛋白（熊貓針）": "sunmax-panda",
  "VivaBella 薇貝拉": "vivabella",
  "AestheFill 艾麗斯": "aesthefill",
  "Ellanse 洢蓮絲": "ellanse",
  "Sculptra 舒顏萃": "sculptra",
  "肉毒桿菌": "botox",
  "保提拉肉毒": "letybo",
  "喬雅登玻尿酸": "juvederm",
  "緹奧希玻尿酸": "teoxane",
  "思妃公主玻尿酸": "saypha",
  "BELKYRA 倍克脂": "belkyra",
  "塑立愛立提線": "thread-lift",
  "腋下止汗": "underarm-botox",
  "音波拉提": "ultrasound-lifting",
  "電波緊緻": "thermage-flx",
  "玻尿酸填充": "hyaluronic-acid",
  "Volite 長效保濕針": "water-glow",
  "填平淚溝": "hyaluronic-acid",
  "豐提蘋果肌": "hyaluronic-acid",
  "豐夫妻宮": "hyaluronic-acid",
  "豐額": "hyaluronic-acid",

  // ── 整型外科（眼部） ──
  "雙眼皮手術": "double-eyelid",
  "開眼頭/開眼尾": "epicanthoplasty",
  "眼袋手術": "eyebag-surgery",
  // ── 整型外科（鼻部） ──
  "韓式隆鼻手術": "rhinoplasty",
  "卡麥拉隆鼻手術": "camay-rhinoplasty",
  "縮鼻翼手術": "alar-reduction",
  "縮鼻頭手術": "tip-plasty",
  // ── 整型外科（胸型與身形） ──
  "果凍矽膠隆乳": "breast-implant",
  "自體脂肪隆乳手術": "autologous-breast",
  "提胸手術": "breast-lift",
  "乳暈手術": "areola-surgery",
  "平胸手術": "flat-chest-surgery",
  // ── 整型外科（抽脂與脂肪移植） ──
  "抽脂手術": "liposuction",
  "自體脂肪移植手術": "fat-transfer",
  // ── 整型外科（拉皮與熟齡輪廓） ──
  "無痕拉皮手術": "facelift",

  // ── 減重與形體雕塑 ──
  "Wegovy 週纖達": "wegovy",
  "Mounjaro 猛健樂": "mounjaro",
  "消脂針/消脂點滴": "fat-dissolve",

  // ── 女性私密美學 ──
  "私密處雷射": "feminine-laser",
  "薇薇電波": "viveve",
  "陰道緊緻手術": "vaginal-tightening",
  "小陰唇美型手術": "labiaplasty",
  "陰蒂拉提手術": "clitoral-lift",
  "陰道洞口重建手術": "vaginal-opening-reconstruction",
  "G點注射": "g-spot-injection",
  "HPV子宮頸癌疫苗": "hpv-vaccine",

  // ── 型男醫美專區 ──
  "男性除毛": "men-hair-removal",
  "男性微整": "men-aesthetics",
  "男性痘疤": "men-acne-scar",
  "男性生髮": "men-hair-restoration",
  "男性體雕": "men-body-sculpting",

  // ── 肌膚管理（卡片順序見 images/services/13_肌膚管理/ 1–13 編號）──
  "AI 智慧皮膚檢測儀": "ai-skin-analysis",
  "水光注射": "water-glow",
  "水飛梭＋水光導入": "water-glow",
  "Rejuran 麗珠蘭": "rejuran",
  "無針水光": "needle-free-glow",
  "水飛梭": "hydrafacial",
  "O2 to Derm 氧氣面罩": "oxygen-mask",
  "AI 光譜治療": "ai-spectrum",
  "安瓶導入": "ampule-infusion",
  "手工清痘與清粉刺": "manual-acne-extraction",
  "法國多酚精萃晶膜": "french-polyphenol-mask",
  "高濃度杏仁酸": "mandelic-acid-peel",
  "超級玻尿酸鎖水保濕面膜": "super-hyaluronic-mask",
  "肌光潔顏蜜": "skin-glow-serum",
  "膠原膜（膠原蛋白面膜）": "collagen-mask",
  "ICOONE": "icoone",
  // ── 再生醫學 ──
  "增生療法": "prolotherapy",
  "IHT（PRP）注射療法": "iht-prp",

  // ── 生髮門診（卡片順序見 images/services/08_生髮門診/ 1–3 編號）──
  "頭皮檢測": "scalp-detection",
  "不動刀育髮": "non-surgical-hair",
  "毛髮護理": "scalp-care",

  // ── 輔助醫學療法 ──
  "氦氖雷射 ILIB": "ilib-laser",
  "點滴針劑": "nutrition-iv-drip",
  "音樂治療": "music-therapy",

  // ── 功能醫學與精準檢測（各項獨立詳情；總覽見 functional-medicine） ──
  "基因檢測": "gene-testing",
  "3DMRA 檢測": "3dmra-scan",
  "腦波檢測": "brainwave-detection",
  "腸道菌叢分析": "gut-microbiome",
  "HRV 自律神經分析": "hrv-analysis",
  "PTG 血管分析": "ptg-vascular",

  // ── 快樂門診 ──
  "快樂門診": "happy-clinic",
  "Talent-A 動磁波": "talent-a",

  // ── 自費疫苗 ──
  "自費疫苗接種": "self-pay-vaccine",

  // ── 痘痘管理 ──
  // (mapped via acne-treatment and acne-scar-laser)

  // ── 健保皮膚科 / 疼痛管理 ──
  "健保皮膚科": "nhi-dermatology",
  "疼痛管理": "pain-management",
};

export function getTreatmentSlug(itemName: string): string | null {
  return TREATMENT_SLUG_MAP[itemName] || null;
}
