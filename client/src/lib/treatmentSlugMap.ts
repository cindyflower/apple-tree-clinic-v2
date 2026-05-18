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

  // ── 微整注射（含原精雕微整項目） ──
  "Sculptra 舒顏萃": "collagen-regeneration",
  "Ellanse 洢蓮絲": "ellanse",
  "AestheFill 艾麗斯": "aesthefill",
  "音波拉提": "ultrasound-lifting",
  "電波緊緻": "thermage-flx",
  "塑立愛 少女立提線": "thread-lift",

  // ── 微整注射 ──
  "肉毒桿菌": "botox",
  "玻尿酸填充": "hyaluronic-acid",
  "Sunmax 膠原蛋白（熊貓針）": "sunmax-panda",
  "Rejuran 麗珠蘭": "hyaluronic-acid",
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

  // ── 形體雕塑 ──
  "Wegovy 週纖達": "wegovy",
  "Mounjaro 猛健樂": "mounjaro",
  "BELKYRA 倍克脂": "wegovy",
  "消脂針/消脂點滴": "wegovy",
  "減肥筆": "wegovy",

  // ── 女性私密美學 ──
  "私密處雷射": "feminine-laser",
  "VivaBella 薇貝拉": "feminine-laser",

  // ── 型男醫美專區 ──
  "男性除毛": "men-hair-removal",
  "男性微整": "men-aesthetics",
  "男性痘疤": "acne-scar-laser",
  "男性體雕": "wegovy",
  "男性生髮": "prp-hair",

  // ── 肌膚管理 ──
  "水飛梭＋水光導入": "water-glow",
  "超級玻尿酸鎖水保濕面膜": "water-glow",
  "膠原膜（膠原蛋白面膜）": "collagen-regeneration",
  "O2 to Derm 氧氣面罩": "hydrafacial",
  "安瓶導入": "hydrafacial",
  "ICOONE": "hydrafacial",

  // ── 醫SPA ──
  "醫學美容SPA": "hydrafacial",

  // ── 再生醫學 ──
  "增生療法": "prp-face",
  "IHT（PRP）注射療法": "prp-face",

  // ── 生髮門診 ──
  "不動刀育髮": "prp-hair",
  "頭皮檢測": "scalp-care",
  "毛髮護理": "scalp-care",

  // ── 營養醫學 ──
  "氦氖雷射 ILIB": "immunity-drip",
  "點滴針劑": "nad-plus-drip",
  "營養配方": "immunity-drip",

  // ── 功能醫學檢測 ──
  "基因檢測": "nad-plus-drip",
  "3DMRA 檢測": "nad-plus-drip",
  "HRV 自律神經分析": "nad-plus-drip",
  "PTG 血管分析": "nad-plus-drip",
  "腦波檢測": "nad-plus-drip",
  "腸道菌叢分析": "nad-plus-drip",

  // ── 快樂門診 ──
  "快樂門診": "nad-plus-drip",
  "AI 光譜治療": "nad-plus-drip",
  "音樂治療": "nad-plus-drip",
  "Talent-A 動磁波": "talent-a",

  // ── 自費疫苗 ──
  "自費疫苗接種": "immunity-drip",

  // ── 除毛美白 ──
  "腋下止汗": "diode-laser-hair",

  // ── 痘痘管理 ──
  // (mapped via acne-treatment and acne-scar-laser)

  // ── 健保皮膚科 / 疼痛管理 ──
  // (mapped via nhi-dermatology and pain-management)
};

export function getTreatmentSlug(itemName: string): string | null {
  return TREATMENT_SLUG_MAP[itemName] || null;
}
