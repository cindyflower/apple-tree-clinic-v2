/*
 * videoData.ts — 美麗實境室 Beauty Reality Lab
 * 完整影片資料庫：舊站 drappletree.com.tw/media/ 全量搬遷 + 新站獨有影片
 * 前台分類系統：11 大分類（品牌感命名）
 * 後台分類：療程屬性分類（用於療程頁串接）
 */

// ─── Frontend Category Definitions ───
export interface FrontendCategory {
  id: string;
  label: string;
  englishLabel?: string;
  description: string;
}

export const FRONTEND_CATEGORIES: FrontendCategory[] = [
  { id: "all", label: "全部實境", description: "從臉、膚質、輪廓到體態管理，一次看見蘋果樹的真實體驗與專業解說。" },
  { id: "celebrity", label: "明星的安心選擇", description: "看見藝人與名人如何選擇安心、自然、有質感的醫美管理。" },
  { id: "contour", label: "輪廓回到剛剛好", description: "不是追求誇張改變，而是讓臉部線條更乾淨、輪廓更有精神。" },
  { id: "natural-beauty", label: "自然變好看的秘密", description: "微整不是變成另一個人，而是讓比例更順、表情更自然、狀態更精緻。" },
  { id: "skin-glow", label: "讓膚況重新亮起來", description: "從暗沉、斑點、毛孔到膚質檢測，先看懂肌膚狀態，再規劃適合的管理方式。" },
  { id: "body", label: "身形管理，不只變瘦", description: "從線條、肌力、代謝到減重門診，把體態變成可以被追蹤與管理的計畫。" },
  { id: "men", label: "男生也該有狀態感", description: "不是變得很醫美，而是看起來更乾淨、更有精神、更像狀態好的自己。" },
  { id: "fresh", label: "清爽感，也是一種精緻", description: "從除毛、止汗到私密照護，讓日常更自在，也讓身體管理更細緻。" },
  { id: "doctor", label: "醫師說給你聽", description: "把複雜的療程、風險與適合族群，用更好理解的方式說清楚。" },
  { id: "health", label: "健康，也是一種管理", description: "從疫苗、兒童照護、代謝管理到日常健康問題，把健康照顧變得更清楚、更有方向。" },
  { id: "brand", label: "我們為什麼做這件事", description: "關於蘋果樹的理念、醫師團隊、媒體紀錄與品牌走到今天的原因。" },
];

// ─── Backend Category (for treatment page matching) ───
export type BackendCategory =
  | "名人實測與品牌信任"
  | "緊緻拉提實測"
  | "自然微整"
  | "肌膚管理"
  | "體態管理"
  | "型男醫美"
  | "女性私密與除毛"
  | "醫師專業解說"
  | "健康管理"
  | "品牌故事";

// ─── Video Type Tags ───
export type VideoTypeTag = "celebrity" | "kol" | "doctor" | "brand" | "treatment" | "case";

// ─── Video Card Description Templates ───
const DESC = {
  contour: "看她如何透過緊緻管理，讓輪廓線條更有精神。",
  injection: "不是變成另一個人，而是讓五官比例更自然協調。",
  skin: "從膚況檢測開始，找到暗沉與斑點管理的下一步。",
  body: "不只看體重，更看線條、肌力與代謝狀態。",
  men: "男生的醫美重點，是乾淨、精神與自然狀態感。",
  doctor: "由醫師說明療程原理、適合族群與注意事項。",
  health: "把健康問題說清楚，讓照顧自己變得更有方向。",
  brand: "看見蘋果樹如何把美麗與健康，變成一套可以被管理的長期計畫。",
  fresh: "讓日常更自在，也讓身體管理更細緻。",
};

// ─── Video Item Interface ───
export interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
  /** Frontend categories (multiple allowed) */
  frontendCategories: string[];
  /** Backend categories for treatment matching */
  backendCategories: BackendCategory[];
  thumbnail: string;
  embedUrl: string;
  /** Related treatment page slugs */
  relatedTreatments: string[];
  /** Whether this is a homepage featured video */
  isFeaturedHomepage: boolean;
  /** Video type tags */
  typeTags: VideoTypeTag[];
  /** Original sort order from old site */
  originalSortOrder: number;
  /** Source page */
  sourcePage: string;
}

// ─── Complete Video Database (55 old site + 3 new site exclusive) ───
export const VIDEOS: VideoItem[] = [
  // ═══ 1. 劉道玄 Z音波真人實測 ═══
  {
    id: "v01",
    videoId: "gR1yrdIRhaM",
    title: "藝人劉道玄 Z音波真人實測分享",
    description: DESC.contour,
    frontendCategories: ["celebrity", "contour", "men"],
    backendCategories: ["名人實測與品牌信任", "緊緻拉提實測", "型男醫美"],
    thumbnail: "https://img.youtube.com/vi/gR1yrdIRhaM/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/gR1yrdIRhaM",
    relatedTreatments: ["ultrasound-lifting", "men-aesthetics"],
    isFeaturedHomepage: true,
    typeTags: ["celebrity", "kol"],
    originalSortOrder: 1,
    sourcePage: "old_media",
  },
  // ═══ 2. Jennifer送媽咪海芙電波 ═══
  {
    id: "v02",
    videoId: "5QJS5enJOdo",
    title: "「怕痛的媽媽也說讚」Jennifer 送媽咪海芙電波",
    description: DESC.contour,
    frontendCategories: ["contour", "celebrity"],
    backendCategories: ["緊緻拉提實測", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/5QJS5enJOdo/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/5QJS5enJOdo",
    relatedTreatments: ["ultrasound-lifting", "thermage-flx"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 2,
    sourcePage: "old_media",
  },
  // ═══ 3. 海芙電波五大優勢 ═══
  {
    id: "v03",
    videoId: "Dh4vojddMkQ",
    title: "海芙電波跟鳳凰哪個好？海芙電波五大優勢",
    description: DESC.contour,
    frontendCategories: ["contour", "doctor"],
    backendCategories: ["緊緻拉提實測", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/Dh4vojddMkQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/Dh4vojddMkQ",
    relatedTreatments: ["ultrasound-lifting", "thermage-flx"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 3,
    sourcePage: "old_media",
  },
  // ═══ 4. Sasha 母親節 ═══
  {
    id: "v04",
    videoId: "IG4UAUCWUnc",
    title: "「這次母親節，我選擇送自己一份剛剛好的照顧」Sasha",
    description: DESC.contour,
    frontendCategories: ["contour", "celebrity"],
    backendCategories: ["緊緻拉提實測", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/IG4UAUCWUnc/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/IG4UAUCWUnc",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 4,
    sourcePage: "old_media",
  },
  // ═══ 5. G.O.F Dolly 謝之絃 海芙電波 ═══
  {
    id: "v05",
    videoId: "fsSJFzCo2BQ",
    title: "G.O.F Dolly 謝之絃來蘋果樹體驗海芙電波",
    description: DESC.contour,
    frontendCategories: ["celebrity", "contour"],
    backendCategories: ["名人實測與品牌信任", "緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/fsSJFzCo2BQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/fsSJFzCo2BQ",
    relatedTreatments: ["ultrasound-lifting", "thermage-flx"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity", "kol"],
    originalSortOrder: 5,
    sourcePage: "old_media",
  },
  // ═══ 6. 演藝圈流行的清爽秘密 道玄 ═══
  {
    id: "v06",
    videoId: "eh32-zSbcUI",
    title: "演藝圈流行的清爽秘密｜道玄",
    description: DESC.fresh,
    frontendCategories: ["fresh", "men", "celebrity"],
    backendCategories: ["女性私密與除毛", "型男醫美", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/eh32-zSbcUI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/eh32-zSbcUI",
    relatedTreatments: ["men-hair-removal", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 6,
    sourcePage: "old_media",
  },
  // ═══ 7. 蔡淑臻 海芙音波 快問快答 ═══
  {
    id: "v07",
    videoId: "ZNiS8rD_Ju0",
    title: "第三代海芙音波 蔡淑臻肌膚緊緻的秘密 — 快問快答篇",
    description: DESC.contour,
    frontendCategories: ["celebrity", "contour"],
    backendCategories: ["名人實測與品牌信任", "緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/ZNiS8rD_Ju0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ZNiS8rD_Ju0",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: true,
    typeTags: ["celebrity"],
    originalSortOrder: 7,
    sourcePage: "old_media",
  },
  // ═══ 8. 海芙糾察隊 瑜珈老師 ═══
  {
    id: "v08",
    videoId: "ykD87PdZ6k8",
    title: "海芙糾察隊 — 瑜珈老師也有身材問題？！",
    description: DESC.body,
    frontendCategories: ["body", "contour"],
    backendCategories: ["體態管理", "緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/ykD87PdZ6k8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/ykD87PdZ6k8",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 8,
    sourcePage: "old_media",
  },
  // ═══ 9. Talent-A 陽光女孩翹臀 ═══
  {
    id: "v09",
    videoId: "w-MjKEltQKY",
    title: "Talent-A 動磁波｜陽光女孩的翹臀練成術",
    description: DESC.body,
    frontendCategories: ["body"],
    backendCategories: ["體態管理"],
    thumbnail: "https://img.youtube.com/vi/w-MjKEltQKY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/w-MjKEltQKY",
    relatedTreatments: ["talent-a"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 9,
    sourcePage: "old_media",
  },
  // ═══ 10. Talent-A 全職媽媽手臂 ═══
  {
    id: "v10",
    videoId: "bwLwpLpQe3w",
    title: "Talent-A 動磁波｜全職媽媽輕鬆練「纖」女級手臂",
    description: DESC.body,
    frontendCategories: ["body"],
    backendCategories: ["體態管理"],
    thumbnail: "https://img.youtube.com/vi/bwLwpLpQe3w/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/bwLwpLpQe3w",
    relatedTreatments: ["talent-a"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 10,
    sourcePage: "old_media",
  },
  // ═══ 11. Talent-A 科技新貴腹肌 ═══
  {
    id: "v11",
    videoId: "uKxn2K_5690",
    title: "Talent-A 動磁波｜科技新貴腹肌鍛鍊秘辛大公開",
    description: DESC.body,
    frontendCategories: ["body", "men"],
    backendCategories: ["體態管理", "型男醫美"],
    thumbnail: "https://img.youtube.com/vi/uKxn2K_5690/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/uKxn2K_5690",
    relatedTreatments: ["talent-a", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 11,
    sourcePage: "old_media",
  },
  // ═══ 12. Talent-A 樂天女孩陳伊 ═══
  {
    id: "v12",
    videoId: "TwIeHTMbQxE",
    title: "Talent-A 動磁波 15 分鐘舒緩疼痛｜樂天女孩陳伊熱力推薦",
    description: DESC.body,
    frontendCategories: ["body", "celebrity"],
    backendCategories: ["體態管理", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/TwIeHTMbQxE/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/TwIeHTMbQxE",
    relatedTreatments: ["talent-a"],
    isFeaturedHomepage: true,
    typeTags: ["celebrity"],
    originalSortOrder: 12,
    sourcePage: "old_media",
  },
  // ═══ 13. BOTOX 腋下止汗 ═══
  {
    id: "v13",
    videoId: "MuaAknEJxOU",
    title: "BOTOX 美國肉毒桿菌腋下止汗，美麗不留憾",
    description: DESC.fresh,
    frontendCategories: ["fresh", "natural-beauty"],
    backendCategories: ["女性私密與除毛", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/MuaAknEJxOU/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/MuaAknEJxOU",
    relatedTreatments: ["botox", "diode-laser-hair"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 13,
    sourcePage: "old_media",
  },
  // ═══ 14. BOTOX 保妥適自然表情 ═══
  {
    id: "v14",
    videoId: "n5aBvsGEoT0",
    title: "BOTOX 保妥適美國精準肉毒，百變表情自然展現不僵硬",
    description: DESC.injection,
    frontendCategories: ["natural-beauty"],
    backendCategories: ["自然微整"],
    thumbnail: "https://img.youtube.com/vi/n5aBvsGEoT0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/n5aBvsGEoT0",
    relatedTreatments: ["botox"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 14,
    sourcePage: "old_media",
  },
  // ═══ 15. 蔡淑臻 海芙音波 防偽認證 ═══
  {
    id: "v15",
    videoId: "6TQLmBHCcGg",
    title: "第三代海芙音波 蔡淑臻肌膚緊緻的秘密 — 防偽認證分享",
    description: DESC.contour,
    frontendCategories: ["celebrity", "contour"],
    backendCategories: ["名人實測與品牌信任", "緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/6TQLmBHCcGg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/6TQLmBHCcGg",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 15,
    sourcePage: "old_media",
  },
  // ═══ 16. 海芙糾察隊 發糕女孩 ═══
  {
    id: "v16",
    videoId: "bE6L0Robp1E",
    title: "海芙糾察隊 — 別再叫我肉肉臉，發糕女孩的煩惱",
    description: DESC.contour,
    frontendCategories: ["contour"],
    backendCategories: ["緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/bE6L0Robp1E/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/bE6L0Robp1E",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 16,
    sourcePage: "old_media",
  },
  // ═══ 17. 修杰楷 保柔緹玻尿酸 ═══
  {
    id: "v17",
    videoId: "5bHqmB-1z4o",
    title: "修杰楷 — 讓我照顧妳的美麗，BELOTERO 保柔緹水無痕玻尿酸",
    description: DESC.injection,
    frontendCategories: ["celebrity", "natural-beauty"],
    backendCategories: ["名人實測與品牌信任", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/5bHqmB-1z4o/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/5bHqmB-1z4o",
    relatedTreatments: ["hyaluronic-acid"],
    isFeaturedHomepage: true,
    typeTags: ["celebrity"],
    originalSortOrder: 17,
    sourcePage: "old_media",
  },
  // ═══ 18. 暖男修杰楷 保柔緹 ═══
  {
    id: "v18",
    videoId: "Fjj9Ve-Njuc",
    title: "暖男修杰楷愛用，BELOTERO 保柔緹水無痕玻尿酸，美得自然簡單",
    description: DESC.injection,
    frontendCategories: ["celebrity", "natural-beauty"],
    backendCategories: ["名人實測與品牌信任", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/Fjj9Ve-Njuc/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/Fjj9Ve-Njuc",
    relatedTreatments: ["hyaluronic-acid"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 18,
    sourcePage: "old_media",
  },
  // ═══ 19. 關韶文 x 馬克醫師 除毛 ═══
  {
    id: "v19",
    videoId: "FpE68klWTd0",
    title: "醫美醫師祕辛！「除毛遇到勃起、改變客人自信」關韶文 Ft. 馬克醫師",
    description: DESC.fresh,
    frontendCategories: ["fresh", "men", "celebrity"],
    backendCategories: ["女性私密與除毛", "型男醫美", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/FpE68klWTd0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/FpE68klWTd0",
    relatedTreatments: ["men-hair-removal", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 19,
    sourcePage: "old_media",
  },
  // ═══ 20. 蒼藍鴿 Talent-A 動磁波30 ═══
  {
    id: "v20",
    videoId: "65i-zwmNVrI",
    title: "Talent-A 動磁波 30，隔空訓練肌肉強化！｜蒼藍鴿吳其穎醫師",
    description: DESC.body,
    frontendCategories: ["body", "doctor"],
    backendCategories: ["體態管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/65i-zwmNVrI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/65i-zwmNVrI",
    relatedTreatments: ["talent-a"],
    isFeaturedHomepage: true,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 20,
    sourcePage: "old_media",
  },
  // ═══ 21. 詹惟中 開運密碼 ═══
  {
    id: "v21",
    videoId: "oVtL0ITgtRY",
    title: "2022 虎年四大開運密碼大揭露！醫美與面相學完美結合 Ft. 詹惟中",
    description: DESC.brand,
    frontendCategories: ["brand", "natural-beauty"],
    backendCategories: ["品牌故事", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/oVtL0ITgtRY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/oVtL0ITgtRY",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["celebrity", "brand"],
    originalSortOrder: 21,
    sourcePage: "old_media",
  },
  // ═══ 22. 劉道玄 私密除毛 ═══
  {
    id: "v22",
    videoId: "W7jaTnqWAkg",
    title: "劉道玄 — 私密除毛！全身雷射除毛全記錄",
    description: DESC.fresh,
    frontendCategories: ["fresh", "men", "celebrity"],
    backendCategories: ["女性私密與除毛", "型男醫美", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/W7jaTnqWAkg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/W7jaTnqWAkg",
    relatedTreatments: ["men-hair-removal", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 22,
    sourcePage: "old_media",
  },
  // ═══ 23. 楊謹華 安心醫美大使 ═══
  {
    id: "v23",
    videoId: "lu9CwprvriU",
    title: "華燈初上安心醫美大使楊謹華，一起拿回美麗主導權",
    description: DESC.brand,
    frontendCategories: ["celebrity", "brand"],
    backendCategories: ["名人實測與品牌信任", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/lu9CwprvriU/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lu9CwprvriU",
    relatedTreatments: [],
    isFeaturedHomepage: true,
    typeTags: ["celebrity", "brand"],
    originalSortOrder: 23,
    sourcePage: "old_media",
  },
  // ═══ 24. 楊謹華 愛力根安心醫美 ═══
  {
    id: "v24",
    videoId: "rQFAz9aHm80",
    title: "楊謹華 — 愛力根安心醫美，美麗不用冒險",
    description: DESC.brand,
    frontendCategories: ["celebrity", "brand"],
    backendCategories: ["名人實測與品牌信任", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/rQFAz9aHm80/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/rQFAz9aHm80",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["celebrity", "brand"],
    originalSortOrder: 24,
    sourcePage: "old_media",
  },
  // ═══ 25. 蒼藍鴿 加入Line ═══
  {
    id: "v25",
    videoId: "6_iS2bZ1jHM",
    title: "如何輕鬆加入 Line@？讓蒼藍鴿教會你！",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/6_iS2bZ1jHM/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/6_iS2bZ1jHM",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["kol", "brand"],
    originalSortOrder: 25,
    sourcePage: "old_media",
  },
  // ═══ 26. 馬克醫師 AZ疫苗 vlog ═══
  {
    id: "v26",
    videoId: "KkuDq05xRec",
    title: "完成接種第二劑新冠疫苗 AZ — 打好、打滿、打快 by 馬克醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/KkuDq05xRec/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/KkuDq05xRec",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 26,
    sourcePage: "old_media",
  },
  // ═══ 27. 蒼藍鴿 疫苗前必看 ═══
  {
    id: "v27",
    videoId: "D2o4IMZB5ig",
    title: "施打疫苗前必看！蒼藍鴿報你知！",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/D2o4IMZB5ig/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/D2o4IMZB5ig",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 27,
    sourcePage: "old_media",
  },
  // ═══ 28. 蒼藍鴿 疫苗後注意 ═══
  {
    id: "v28",
    videoId: "nMDXmhdui1w",
    title: "打疫苗後要注意！蒼藍鴿貼心提醒",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/nMDXmhdui1w/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/nMDXmhdui1w",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 28,
    sourcePage: "old_media",
  },
  // ═══ 29. AZ疫苗癱瘓 ═══
  {
    id: "v29",
    videoId: "9nYMwzV0FvY",
    title: "打完 AZ 疫苗後癱瘓兩天...該等莫德納嗎？",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/9nYMwzV0FvY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/9nYMwzV0FvY",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 29,
    sourcePage: "old_media",
  },
  // ═══ 30. AZ第二劑副作用 ═══
  {
    id: "v30",
    videoId: "pqHI0gjY8G0",
    title: "第二劑 AZ 副作用有多猛？間隔多久施打保護力最高？",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/pqHI0gjY8G0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/pqHI0gjY8G0",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 30,
    sourcePage: "old_media",
  },
  // ═══ 31. AZ血栓 吳蕎臻 ═══
  {
    id: "v31",
    videoId: "hUjz5G9SN50",
    title: "AZ 疫苗的憂慮！血栓是什麼呢？｜吳蕎臻醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/hUjz5G9SN50/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/hUjz5G9SN50",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 31,
    sourcePage: "old_media",
  },
  // ═══ 32. AZ施打對象 吳蕎臻 ═══
  {
    id: "v32",
    videoId: "G301j2pBFRI",
    title: "AZ 疫苗施打對象！哪些人需要注意？｜吳蕎臻醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/G301j2pBFRI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/G301j2pBFRI",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 32,
    sourcePage: "old_media",
  },
  // ═══ 33. 茜珊媽 皮秒蜂巢+微整 ═══
  {
    id: "v33",
    videoId: "sW58AGCLqiQ",
    title: "超感動！花了八萬送媽媽 — 茜珊媽皮秒蜂巢 + 微整",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "natural-beauty", "celebrity"],
    backendCategories: ["肌膚管理", "自然微整", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/sW58AGCLqiQ/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/sW58AGCLqiQ",
    relatedTreatments: ["picosure-755", "hyaluronic-acid"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 33,
    sourcePage: "old_media",
  },
  // ═══ 34. 劉道玄媽媽 海芙音波 ═══
  {
    id: "v34",
    videoId: "x8bsdMJSyZ8",
    title: "送母親節大禮，竟然要全裸？— 劉道玄媽媽海芙音波",
    description: DESC.contour,
    frontendCategories: ["contour", "celebrity"],
    backendCategories: ["緊緻拉提實測", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/x8bsdMJSyZ8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/x8bsdMJSyZ8",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 34,
    sourcePage: "old_media",
  },
  // ═══ 35. 吳蕎臻 節食瘦身 ═══
  {
    id: "v35",
    videoId: "nRp9KBsL6Kk",
    title: "節食瘦身有用嗎？還是治標不治本｜吳蕎臻醫師",
    description: DESC.body,
    frontendCategories: ["body", "doctor", "health"],
    backendCategories: ["體態管理", "醫師專業解說", "健康管理"],
    thumbnail: "https://img.youtube.com/vi/nRp9KBsL6Kk/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/nRp9KBsL6Kk",
    relatedTreatments: ["wegovy", "talent-a"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 35,
    sourcePage: "old_media",
  },
  // ═══ 36. 吳蕎臻 普拿疼 ═══
  {
    id: "v36",
    videoId: "J3kaEUdoTi8",
    title: "如何正確使用普拿疼？緩解疫苗副作用！｜吳蕎臻醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/J3kaEUdoTi8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/J3kaEUdoTi8",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 36,
    sourcePage: "old_media",
  },
  // ═══ 37. 泰辣 海芙音波 ═══
  {
    id: "v37",
    videoId: "rXI_SiSVec8",
    title: "終於做了這個決定！不管再痛都要撐過去 — 泰辣海芙音波",
    description: DESC.contour,
    frontendCategories: ["celebrity", "contour"],
    backendCategories: ["名人實測與品牌信任", "緊緻拉提實測"],
    thumbnail: "https://img.youtube.com/vi/rXI_SiSVec8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/rXI_SiSVec8",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 37,
    sourcePage: "old_media",
  },
  // ═══ 38. 劉道玄 男生打音波 ═══
  {
    id: "v38",
    videoId: "da80Lip72e0",
    title: "男生也可以打音波 — 劉道玄海芙音波",
    description: DESC.men,
    frontendCategories: ["men", "contour", "celebrity"],
    backendCategories: ["型男醫美", "緊緻拉提實測", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/da80Lip72e0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/da80Lip72e0",
    relatedTreatments: ["ultrasound-lifting", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity"],
    originalSortOrder: 38,
    sourcePage: "old_media",
  },
  // ═══ 39. 蒼藍鴿 肺炎鏈球菌疫苗 ═══
  {
    id: "v39",
    videoId: "lpOTKqndmQ8",
    title: "為何老人小孩必須打「肺炎鏈球菌疫苗」！｜吳其穎醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/lpOTKqndmQ8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/lpOTKqndmQ8",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 39,
    sourcePage: "old_media",
  },
  // ═══ 40. 李俊豪 後疫情時代微整 ═══
  {
    id: "v40",
    videoId: "4OGK7UPa_bA",
    title: "後疫情時代醫美！戴口罩適合的微整！｜李俊豪醫師",
    description: DESC.injection,
    frontendCategories: ["natural-beauty", "doctor"],
    backendCategories: ["自然微整", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/4OGK7UPa_bA/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/4OGK7UPa_bA",
    relatedTreatments: ["hyaluronic-acid", "botox"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 40,
    sourcePage: "old_media",
  },
  // ═══ 41. 丹尼爾 皮秒雷射 ═══
  {
    id: "v41",
    videoId: "n0C7EG1CgU4",
    title: "OMG!! 我去打皮秒雷射!! — 丹尼爾皮秒雷射",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "men"],
    backendCategories: ["肌膚管理", "型男醫美"],
    thumbnail: "https://img.youtube.com/vi/n0C7EG1CgU4/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/n0C7EG1CgU4",
    relatedTreatments: ["picosure-755", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 41,
    sourcePage: "old_media",
  },
  // ═══ 42. 吃貨們 除毛雷射 ═══
  {
    id: "v42",
    videoId: "CD3DUX5wGT0",
    title: "私密處除毛會很痛嗎？— 吃貨們除毛雷射",
    description: DESC.fresh,
    frontendCategories: ["fresh"],
    backendCategories: ["女性私密與除毛"],
    thumbnail: "https://img.youtube.com/vi/CD3DUX5wGT0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/CD3DUX5wGT0",
    relatedTreatments: ["diode-laser-hair"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 42,
    sourcePage: "old_media",
  },
  // ═══ 43. 蒼藍鴿 兒童異位性皮膚炎 ═══
  {
    id: "v43",
    videoId: "XPLaRhCEmgw",
    title: "醫生教你如何舒緩！兒童異位性皮膚炎！｜吳其穎醫師",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/XPLaRhCEmgw/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/XPLaRhCEmgw",
    relatedTreatments: ["nhi-dermatology"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 43,
    sourcePage: "old_media",
  },
  // ═══ 44. 蒼藍鴿 兒童止瀉藥 ═══
  {
    id: "v44",
    videoId: "XdPbor4ioXg",
    title: "兒童適合吃止瀉藥嗎？蒼藍鴿分析給你聽！",
    description: DESC.health,
    frontendCategories: ["health", "doctor"],
    backendCategories: ["健康管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/XdPbor4ioXg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/XdPbor4ioXg",
    relatedTreatments: ["self-pay-vaccine"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 44,
    sourcePage: "old_media",
  },
  // ═══ 45. 馬克醫師 x 小賴 (1) ═══
  {
    id: "v45",
    videoId: "bcbRjeUs-SI",
    title: "馬克醫師 x 小賴",
    description: DESC.men,
    frontendCategories: ["men", "brand"],
    backendCategories: ["型男醫美", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/bcbRjeUs-SI/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/bcbRjeUs-SI",
    relatedTreatments: ["men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 45,
    sourcePage: "old_media",
  },
  // ═══ 46. 馬克醫師 x 小戴 ═══
  {
    id: "v46",
    videoId: "mG4DVSV1hns",
    title: "馬克醫師 x 小戴",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/mG4DVSV1hns/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/mG4DVSV1hns",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 46,
    sourcePage: "old_media",
  },
  // ═══ 47. 馬克醫師 x 云 皮秒雷射 ═══
  {
    id: "v47",
    videoId: "aEa_-m2zJrE",
    title: "馬克醫師 x 云 — 皮秒雷射",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "men"],
    backendCategories: ["肌膚管理", "型男醫美"],
    thumbnail: "https://img.youtube.com/vi/aEa_-m2zJrE/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/aEa_-m2zJrE",
    relatedTreatments: ["picosure-755", "men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 47,
    sourcePage: "old_media",
  },
  // ═══ 48. 馬克醫師 日語小教室 ═══
  {
    id: "v48",
    videoId: "J6ibUMudqAM",
    title: "馬克醫師日語小教室",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/J6ibUMudqAM/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/J6ibUMudqAM",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "brand"],
    originalSortOrder: 48,
    sourcePage: "old_media",
  },
  // ═══ 49. 馬克醫師 x 云 ═══
  {
    id: "v49",
    videoId: "iEhwp9j7oyY",
    title: "馬克醫師 x 云",
    description: DESC.men,
    frontendCategories: ["men", "brand"],
    backendCategories: ["型男醫美", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/iEhwp9j7oyY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/iEhwp9j7oyY",
    relatedTreatments: ["men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 49,
    sourcePage: "old_media",
  },
  // ═══ 50. 馬克醫師 韓語小教室 ═══
  {
    id: "v50",
    videoId: "boeSPERfBpU",
    title: "馬克醫師韓語小教室",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/boeSPERfBpU/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/boeSPERfBpU",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "brand"],
    originalSortOrder: 50,
    sourcePage: "old_media",
  },
  // ═══ 51. 馬克醫師 x 小賴 (2) ═══
  {
    id: "v51",
    videoId: "79lozAgkoXo",
    title: "馬克醫師 x 小賴（二）",
    description: DESC.men,
    frontendCategories: ["men", "brand"],
    backendCategories: ["型男醫美", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/79lozAgkoXo/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/79lozAgkoXo",
    relatedTreatments: ["men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 51,
    sourcePage: "old_media",
  },
  // ═══ 52. Merry Xmas ═══
  {
    id: "v52",
    videoId: "I-qMGqdIewg",
    title: "Merry Xmas — 蘋果樹聖誕特輯",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/I-qMGqdIewg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/I-qMGqdIewg",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["brand"],
    originalSortOrder: 52,
    sourcePage: "old_media",
  },
  // ═══ 53. 馬克醫師 x 家慶 ═══
  {
    id: "v53",
    videoId: "PMyafBN4o4A",
    title: "馬克醫師 x 家慶",
    description: DESC.men,
    frontendCategories: ["men", "brand"],
    backendCategories: ["型男醫美", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/PMyafBN4o4A/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/PMyafBN4o4A",
    relatedTreatments: ["men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["kol", "doctor"],
    originalSortOrder: 53,
    sourcePage: "old_media",
  },
  // ═══ 54. 馬克醫師 KOL 2020抖音精選 ═══
  {
    id: "v54",
    videoId: "B8p4zmOjGrg",
    title: "馬克醫師 x KOL 2020 抖音精選",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/B8p4zmOjGrg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/B8p4zmOjGrg",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["kol", "brand"],
    originalSortOrder: 54,
    sourcePage: "old_media",
  },
  // ═══ 55. 蘋果樹不一樣的醫美 ═══
  {
    id: "v55",
    videoId: "eHe1rdvNBqw",
    title: "蘋果樹不一樣的醫美 — 醫術加藝術",
    description: DESC.brand,
    frontendCategories: ["brand"],
    backendCategories: ["品牌故事"],
    thumbnail: "https://img.youtube.com/vi/eHe1rdvNBqw/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/eHe1rdvNBqw",
    relatedTreatments: [],
    isFeaturedHomepage: false,
    typeTags: ["brand"],
    originalSortOrder: 55,
    sourcePage: "old_media",
  },
  // ═══ 56. Lamigirls 琳妲 皮秒雷射全紀錄 ═══
  {
    id: "v56",
    videoId: "aEa_-m2zJrE",
    // Note: This uses the same embed as v47 (馬克醫師 x 云 皮秒雷射) based on old site data
    // The actual Lamigirls video may have a different ID; keeping the scraped mapping
    title: "小明星大跟班｜直擊 Lamigirls 琳妲皮秒雷射全紀錄",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "celebrity", "brand"],
    backendCategories: ["肌膚管理", "名人實測與品牌信任", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/aEa_-m2zJrE/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/aEa_-m2zJrE",
    relatedTreatments: ["picosure-755"],
    isFeaturedHomepage: false,
    typeTags: ["celebrity", "brand"],
    originalSortOrder: 56,
    sourcePage: "old_media",
  },
  // ═══ 57. 一日浪漫約會 馬克醫師 ═══
  {
    id: "v57",
    videoId: "J6ibUMudqAM",
    title: "一日浪漫約會 — 陽光型男和高貴紳士怎麼選？馬克醫師",
    description: DESC.men,
    frontendCategories: ["men", "brand"],
    backendCategories: ["型男醫美", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/J6ibUMudqAM/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/J6ibUMudqAM",
    relatedTreatments: ["men-aesthetics"],
    isFeaturedHomepage: false,
    typeTags: ["doctor", "kol"],
    originalSortOrder: 57,
    sourcePage: "old_media",
  },
  // ═══ 58. 李俊豪 皮秒快問快答 ═══
  {
    id: "v58",
    videoId: "iEhwp9j7oyY",
    title: "755 皮秒蜂巢雷射｜李俊豪醫師 — 皮秒快問快答",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "doctor"],
    backendCategories: ["肌膚管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/iEhwp9j7oyY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/iEhwp9j7oyY",
    relatedTreatments: ["picosure-755"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 58,
    sourcePage: "old_media",
  },
  // ═══ 59. 755皮秒 短時間高效率 ═══
  {
    id: "v59",
    videoId: "boeSPERfBpU",
    title: "755 皮秒蜂巢雷射｜短時間、高效率治療斑點問題",
    description: DESC.skin,
    frontendCategories: ["skin-glow"],
    backendCategories: ["肌膚管理"],
    thumbnail: "https://img.youtube.com/vi/boeSPERfBpU/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/boeSPERfBpU",
    relatedTreatments: ["picosure-755"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 59,
    sourcePage: "old_media",
  },
  // ═══ 60. 蘋果樹精選案例 腳上胎記 ═══
  {
    id: "v60",
    videoId: "79lozAgkoXo",
    title: "蘋果樹精選案例｜治療腳上胎記感想",
    description: DESC.skin,
    frontendCategories: ["skin-glow"],
    backendCategories: ["肌膚管理"],
    thumbnail: "https://img.youtube.com/vi/79lozAgkoXo/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/79lozAgkoXo",
    relatedTreatments: ["picosure-755"],
    isFeaturedHomepage: false,
    typeTags: ["case"],
    originalSortOrder: 60,
    sourcePage: "old_media",
  },
  // ═══ 61. OBSERV 520 肌膚檢測儀 ═══
  {
    id: "v61",
    videoId: "I-qMGqdIewg",
    title: "OBSERV 520｜蘋果樹醫學診所肌膚檢測儀",
    description: DESC.skin,
    frontendCategories: ["skin-glow"],
    backendCategories: ["肌膚管理"],
    thumbnail: "https://img.youtube.com/vi/I-qMGqdIewg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/I-qMGqdIewg",
    relatedTreatments: ["picosure-755", "water-glow"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 61,
    sourcePage: "old_media",
  },
  // ═══ 62. 提美拉黃金埋線拉提 ═══
  {
    id: "v62",
    videoId: "PMyafBN4o4A",
    title: "提美拉黃金埋線拉提",
    description: DESC.contour,
    frontendCategories: ["contour", "natural-beauty"],
    backendCategories: ["緊緻拉提實測", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/PMyafBN4o4A/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/PMyafBN4o4A",
    relatedTreatments: ["thread-lift", "hyaluronic-acid"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 62,
    sourcePage: "old_media",
  },
  // ═══ 63. 金牌大健諜 冬季皮膚癢 ═══
  {
    id: "v63",
    videoId: "B8p4zmOjGrg",
    title: "金牌大健諜｜冬季皮膚癢不停，小心你的內臟在求救！",
    description: DESC.health,
    frontendCategories: ["health", "brand"],
    backendCategories: ["健康管理", "品牌故事"],
    thumbnail: "https://img.youtube.com/vi/B8p4zmOjGrg/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/B8p4zmOjGrg",
    relatedTreatments: ["nhi-dermatology"],
    isFeaturedHomepage: false,
    typeTags: ["brand"],
    originalSortOrder: 63,
    sourcePage: "old_media",
  },
  // ═══ 64. 755皮秒 專家怎麼說 ═══
  {
    id: "v64",
    videoId: "eHe1rdvNBqw",
    title: "755 皮秒蜂巢雷射｜皮秒蜂巢雷射專家怎麼說？",
    description: DESC.skin,
    frontendCategories: ["skin-glow", "doctor"],
    backendCategories: ["肌膚管理", "醫師專業解說"],
    thumbnail: "https://img.youtube.com/vi/eHe1rdvNBqw/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/eHe1rdvNBqw",
    relatedTreatments: ["picosure-755"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 64,
    sourcePage: "old_media",
  },
  // ═══ NEW SITE EXCLUSIVE: 宋米秦 Aesthefill ═══
  {
    id: "v65",
    videoId: "M4b_8e9cdmE",
    title: "百變精靈宋米秦，持續兩年自然澎潤的秘密｜Aesthefill 聚雙旋乳酸",
    description: DESC.injection,
    frontendCategories: ["celebrity", "natural-beauty"],
    backendCategories: ["名人實測與品牌信任", "自然微整"],
    thumbnail: "https://img.youtube.com/vi/M4b_8e9cdmE/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/M4b_8e9cdmE",
    relatedTreatments: ["hyaluronic-acid", "vivabella"],
    isFeaturedHomepage: true,
    typeTags: ["celebrity"],
    originalSortOrder: 100,
    sourcePage: "new_site",
  },
  // ═══ NEW SITE EXCLUSIVE: 渦旋音波 魏檸 ═══
  {
    id: "v66",
    videoId: "c_0-EkAt5do",
    title: "挑戰最低痛感無恢復期！LifteraV 立特拉渦旋音波｜Ft. 魏檸 Gracie",
    description: DESC.contour,
    frontendCategories: ["contour", "celebrity"],
    backendCategories: ["緊緻拉提實測", "名人實測與品牌信任"],
    thumbnail: "https://img.youtube.com/vi/c_0-EkAt5do/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/c_0-EkAt5do",
    relatedTreatments: ["ultrasound-lifting"],
    isFeaturedHomepage: false,
    typeTags: ["kol"],
    originalSortOrder: 101,
    sourcePage: "new_site",
  },
  // ═══ NEW SITE EXCLUSIVE: 吳蕎臻 客製化減重 ═══
  {
    id: "v67",
    videoId: "L-w--VmS9-A",
    title: "客製化減重門診，健康踏實輕鬆瘦！｜吳蕎臻醫師",
    description: DESC.body,
    frontendCategories: ["body", "doctor", "health"],
    backendCategories: ["體態管理", "醫師專業解說", "健康管理"],
    thumbnail: "https://img.youtube.com/vi/L-w--VmS9-A/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/L-w--VmS9-A",
    relatedTreatments: ["wegovy", "talent-a"],
    isFeaturedHomepage: false,
    typeTags: ["doctor"],
    originalSortOrder: 102,
    sourcePage: "new_site",
  },
  // ═══ NEW SITE EXCLUSIVE: Talent-A 躺著享瘦 ═══
  {
    id: "v68",
    videoId: "5zMtyw7Zu14",
    title: "Talent-A 動磁波躺著享瘦，30 分鐘約 30000 次肌肉收縮！",
    description: DESC.body,
    frontendCategories: ["body"],
    backendCategories: ["體態管理"],
    thumbnail: "https://img.youtube.com/vi/5zMtyw7Zu14/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/5zMtyw7Zu14",
    relatedTreatments: ["talent-a"],
    isFeaturedHomepage: false,
    typeTags: ["treatment"],
    originalSortOrder: 103,
    sourcePage: "new_site",
  },
];

// ─── Deduplicated videos (remove entries with duplicate videoId, keep first occurrence) ───
const seenIds = new Set<string>();
export const UNIQUE_VIDEOS: VideoItem[] = VIDEOS.filter((v) => {
  if (seenIds.has(v.videoId)) return false;
  seenIds.add(v.videoId);
  return true;
});

// ─── Query Helpers ───

/** Get videos by frontend category */
export function getVideosByFrontendCategory(categoryId: string): VideoItem[] {
  if (categoryId === "all") return UNIQUE_VIDEOS;
  return UNIQUE_VIDEOS.filter((v) => v.frontendCategories.includes(categoryId));
}

/** Get homepage featured videos (max 8) */
export function getFeaturedVideos(): VideoItem[] {
  return UNIQUE_VIDEOS.filter((v) => v.isFeaturedHomepage).slice(0, 8);
}

/** Get videos related to a specific treatment slug */
export function getVideosByTreatmentSlug(slug: string): VideoItem[] {
  return UNIQUE_VIDEOS.filter((v) => v.relatedTreatments.includes(slug));
}

/** Get unique frontend categories with counts */
export function getFrontendCategoriesWithCounts(): Array<FrontendCategory & { count: number }> {
  return FRONTEND_CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.id === "all" ? UNIQUE_VIDEOS.length : UNIQUE_VIDEOS.filter((v) => v.frontendCategories.includes(cat.id)).length,
  }));
}

/** Get category label by id */
export function getCategoryLabel(id: string): string {
  return FRONTEND_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

/** Get category description by id */
export function getCategoryDescription(id: string): string {
  return FRONTEND_CATEGORIES.find((c) => c.id === id)?.description ?? "";
}
