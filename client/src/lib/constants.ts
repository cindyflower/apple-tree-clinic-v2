// ─── 蘋果樹 Dr. Appletree ─── Liquid Luxe Design System
// Brand: 內在健康、外在美麗

export const BRAND = {
  name: "蘋果樹 Dr. Appletree",
  nameEn: "Dr. Appletree",
  legalName: "蘋果樹醫美診所", // 正式登記名稱，用於 Schema/頁尾/地址
  tagline: "美麗，是一種管理",
  subtitle: "健康美麗管理品牌",
  phone: "(02) 2716-3535",
  phoneLink: "tel:+886227163535",
  lineId: "@drappletree",
  lineUrl: "https://line.me/R/ti/p/@drappletree",
  address: "台北市松山區南京東路三段309號3樓",
  email: "info@drappletree.com.tw",
  website: "https://www.drappletree.com.tw",
  hours: "週一至週六 10:00-21:00｜週日 10:00-18:00",
};

export const LOCATIONS = [
  {
    name: "南京旗艦院所",
    type: "醫美診所",
    address: "台北市松山區南京東路三段309號3樓",
    phone: "(02) 2716-3535",
    phoneLink: "tel:+886227163535",
    coords: { lat: 25.0519, lng: 121.5467 },
  },
  {
    name: "北大診所",
    type: "健保皮膚科",
    address: "新北市三峽區大德路127號",
    phone: "(02) 8672-0222",
    phoneLink: "tel:+886286720222",
    coords: { lat: 24.9341, lng: 121.3686 },
  },
  {
    name: "北大醫美",
    type: "醫美診所",
    address: "新北市三峽區大德路127號2樓",
    phone: "(02) 8672-0608",
    phoneLink: "tel:+886286720608",
    coords: { lat: 24.9341, lng: 121.3686 },
  },
];

// ─── 照片資源（本地 images/ 分類資料夾，見 imageAssets.ts） ───
export {
  IMAGES,
  img,
  F,
  treatmentImg,
  TREATMENT_IMG,
  doctorImg,
  NANJING_CLINIC_PHOTOS,
  BEIDA_CLINIC_PHOTOS,
} from "./imageAssets";
import { IMAGES, treatmentImg, doctorImg } from "./imageAssets";

// ─── 真實案例數據 ───
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  treatment: string;
  image: string;
  description: string;
  tags: string[];
  highlight?: boolean;
  hotTopic?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "eyebag-male",
    title: "男仕眼袋外開手術",
    category: "整型外科",
    treatment: "眼袋外開手術",
    image: IMAGES.caseEyebag,
    description: "男神養成計畫！透過眼袋外開手術，精準移除眼袋脂肪，同時改善淚溝凹陷，術後雙眼更有神采，整個人精神度大幅提升。",
    tags: ["眼袋移除", "淚溝改善", "男性醫美"],
    hotTopic: "PTT 熱議：男生做眼袋手術值得嗎？",
    highlight: true,
  },
  {
    id: "double-eyelid",
    title: "單眼皮→自然雙眼皮",
    category: "整型外科",
    treatment: "雙眼皮手術",
    image: IMAGES.caseDoubleEyelid,
    description: "母女一起變美！從單眼皮到自然雙眼皮的蛻變，術後眼型自然不假，自然展現個人特色。",
    tags: ["雙眼皮", "自然眼型", "母女同行"],
    hotTopic: "Dcard 討論度最高：自然派雙眼皮怎麼做？",
    highlight: true,
  },
  {
    id: "hydrafacial-waterlight",
    title: "水飛梭＋水光・韓妞水光肌",
    category: "肌膚管理",
    treatment: "水飛梭＋水光療程",
    image: IMAGES.caseHydrafacialWaterlight,
    description: "追求韓妞般的透亮水光肌！水飛梭深層清潔搭配水光注射，一次療程即可感受肌膚明顯提亮、毛孔縮小、保濕度大幅提升。",
    tags: ["水光肌", "深層清潔", "韓式美肌"],
    hotTopic: "小紅書爆紅：水光肌養成術",
    highlight: true,
  },
  {
    id: "hydrafacial-male",
    title: "男生也要保養！水飛梭體驗",
    category: "型男醫美",
    treatment: "水飛梭＋水光療程",
    image: IMAGES.caseHydrafacialMaleBA,
    description: "改善暗沉的關鍵流程，讓肌膚更乾淨、更有亮度。以清潔搭配保濕導入，從底層開始調整膚況，專為男性打造的簡單有效保養體驗。",
    tags: ["男性保養", "深層清潔", "控油保濕"],
    highlight: true,
  },
  {
    id: "aesthefill",
    title: "AestheFill 艾麗斯・蘋果肌回春",
    category: "微整注射",
    treatment: "聚雙旋乳酸注射",
    image: IMAGES.caseAesthefill,
    description: "透過 AestheFill 艾麗斯聚雙旋乳酸注射，自然填充流失的蘋果肌，刺激自體膠原蛋白增生，效果漸進自然，維持時間長。",
    tags: ["蘋果肌", "膠原增生", "自然填充"],
    hotTopic: "2026 趨勢：膠原蛋白增生劑取代傳統填充",
  },
  {
    id: "talent-a-abs",
    title: "Talent-A 動磁波・科技新貴腹肌鍛鍊",
    category: "形體雕塑",
    treatment: "Talent-A 動磁波",
    image: IMAGES.caseTalentAbs,
    description: "科技新貴的腹肌養成計畫！Talent-A 動磁波 30 分鐘等於數萬次肌肉收縮，躺著就能鍛鍊出馬甲線，輕鬆打造精實體態。",
    tags: ["腹肌鍛鍊", "馬甲線", "30分鐘"],
  },
  {
    id: "talent-a-hip",
    title: "Talent-A 動磁波・陽光女孩翹臀練成",
    category: "形體雕塑",
    treatment: "Talent-A 動磁波",
    image: IMAGES.caseTalentHip,
    description: "陽光女孩的翹臀練成記！Talent-A 動磁波精準刺激臀部肌群，不需要大量運動就能提臀塑形，穿什麼都好看。",
    tags: ["翹臀塑形", "提臀", "體態雕塑"],
  },
];

export interface DoctorProfile {
  name: string;
  alias?: string;
  title: string;
  subtitle?: string;
  credentials: string[];
  image: string;
  /** 有內頁時提供 slug，對應 /doctor/:slug */
  slug?: string;
}

/** 順序對應 images/15_醫師照片/ 1～9 */
export const DOCTORS: DoctorProfile[] = [
  {
    name: "孟祥越 院長",
    title: "蘋果樹醫學總院總院長",
    credentials: [
      "國防醫學院醫學系畢業",
      "美國杜蘭大學醫管碩士",
      "前國軍805總醫院院長",
      "前國防部軍醫局副局長",
    ],
    image: doctorImg("孟祥越 院長", ""),
    slug: "meng-xiangyue",
  },
  {
    name: "江得信 醫師",
    title: "北大診所院長",
    credentials: ["台大醫學系", "長庚醫院", "耳鼻喉科專科"],
    image: doctorImg("江得信 醫師", ""),
  },
  {
    name: "林錦生 醫師",
    title: "主治醫師",
    credentials: ["金線獎百大線雕名醫", "海芙音波原廠認證", "鳳凰電波原廠認證"],
    image: doctorImg("林錦生 醫師", ""),
  },
  {
    name: "李俊豪 醫師",
    alias: "馬克醫師",
    title: "南京旗艦主治醫師",
    credentials: ["台大醫學系", "Picosure 755 蜂巢皮秒認證", "玻尿酸・肉毒原廠認證"],
    image: doctorImg("李俊豪 醫師", ""),
  },
  {
    name: "吳其穎 醫師",
    alias: "蒼藍鴿",
    title: "北大分院主治醫師",
    credentials: ["台大醫學系", "醫療暢銷書作家", "美國醫師認證 ECFMG"],
    image: doctorImg("吳其穎 醫師", ""),
  },
  {
    name: "劉佳政 醫師",
    title: "南京旗艦主治醫師",
    credentials: ["陽明大學醫學系", "台北榮總外科", "整外手術專長"],
    image: doctorImg("劉佳政 醫師", ""),
  },
  {
    name: "陳韜名 醫師",
    title: "南京旗艦主治醫師",
    subtitle: "台灣輔助醫學會理事長",
    credentials: ["中西醫雙執照", "快樂門診", "情緒切片分析"],
    image: doctorImg("陳韜名 醫師", ""),
  },
  {
    name: "林漢文 醫師",
    title: "南京旗艦主治醫師",
    credentials: ["婦產科專科", "微整型美容專長", "雷射醫學會會員"],
    image: doctorImg("林漢文 醫師", ""),
  },
  {
    name: "陳君琳 醫師",
    title: "南京旗艦主治醫師",
    credentials: ["馬偕醫院", "薇薇電波認證醫師", "女性私密治療專長"],
    image: doctorImg("陳君琳 醫師", ""),
  },
];

export const NAV_ITEMS = [
  { label: "療程", href: "#services" },
  { label: "實境室", href: "#videos" },
  { label: "案例", href: "#cases" },
  { label: "關於", href: "#about" },
  { label: "團隊", href: "#doctors" },
  { label: "環境", href: "#environment" },
  { label: "FAQ", href: "#faq" },
  { label: "聯絡", href: "#contact" },
];

// ─── 精選療程（按 2026 熱搜趨勢排序） ───
// #1 皮秒蜂巢 #2 玻尿酸 #3 音波拉提 #4 水光針 #5 肉毒 #6 膠原再生

export const FEATURED_SERVICES = [
  {
    id: "picosure",
    slug: "picosure-755",
    category: "光電雷射",
    title: "PicoSure 755\n皮秒蜂巢雷射",
    shortTitle: "皮秒蜂巢雷射",
    description: "2026 最熱搜醫美療程！755nm 蜂巢透鏡技術，24小時即可感受膚色提亮，持續刺激膠原蛋白新生。比傳統雷射快 1000 倍的皮秒脈衝，精準擊碎色素顆粒，恢復期僅 1-3 天。",
    features: ["24h 亮白有感", "膠原蛋白新生", "改善痘疤凹洞", "縮小毛孔"],
    icon: "Sparkles",
    image: IMAGES.treatmentPicosure,
    hotLabel: "🔥 2026 熱搜 #1",
  },
  {
    id: "ha-injection",
    slug: "hyaluronic-acid",
    category: "微整注射",
    title: "玻尿酸\n微整注射",
    shortTitle: "玻尿酸微整",
    description: "即時填充淚溝、法令紋、蘋果肌，自然柔軟安全可逆。多品牌原廠玻尿酸選擇，由專業醫師精準注射，午休 30 分鐘完成，93% 客戶滿意自然度。",
    features: ["即時見效", "安全可逆", "自然柔軟", "午休微整"],
    icon: "Droplets",
    image: IMAGES.caseAesthefill,
    hotLabel: "🔥 2026 熱搜 #2",
  },
  {
    id: "ultrasound",
    slug: "ultrasound-lifting",
    category: "緊緻拉提",
    title: "音波拉提\nHIFU 緊緻",
    shortTitle: "音波拉提",
    description: "聚焦超音波精準作用於 SMAS 筋膜層，從深層提拉鬆弛輪廓。新一代 Z 音波與索夫波技術，舒適度大幅提升，單次療程即可感受下顎線條緊實。",
    features: ["SMAS筋膜層拉提", "非侵入式", "維持度佳", "舒適升級"],
    icon: "Zap",
    image: IMAGES.treatmentHaifu,
    hotLabel: "🔥 2026 熱搜 #3",
  },
  {
    id: "water-glow",
    slug: "water-glow",
    category: "肌膚管理",
    title: "水光針\n水飛梭水光",
    shortTitle: "水光針",
    description: "韓國最夯的水光肌養成術！水飛梭深層清潔毛孔後，以水光槍注入玻尿酸與營養精華，一次療程即見透亮水潤肌。97% 客戶表示膚質明顯提亮。",
    features: ["深層清潔毛孔", "補水保濕", "提亮膚色", "韓式水光肌"],
    icon: "Droplet",
    image: IMAGES.caseHydrafacialWaterlight,
    hotLabel: "🔥 2026 熱搜 #4",
  },
  {
    id: "botox",
    slug: "botox",
    category: "微整注射",
    title: "肉毒桿菌\n除皺瘦臉",
    shortTitle: "肉毒桿菌",
    description: "精準注射放鬆過度收縮的肌肉，改善抬頭紋、魚尾紋、皺眉紋。同時可瘦臉、瘦小腿。5 分鐘完成，自然不僵硬，96% 客戶滿意。",
    features: ["5分鐘完成", "自然不僵硬", "除皺瘦臉", "效果可逆"],
    icon: "Droplets",
    image: treatmentImg("肉毒桿菌"),
    hotLabel: "🔥 2026 熱搜 #5",
  },
  {
    id: "collagen",
    slug: "collagen-regeneration",
    category: "膠原再生",
    title: "膠原蛋白\n再生療程",
    shortTitle: "膠原再生",
    description: "薇貝拉・艾麗斯新一代膠原蛋白增生劑，刺激自體膠原蛋白新生。效果漸進自然，維持 18-24 個月，94% 客戶表示膚質與緊緻度明顯改善。",
    features: ["自體膠原新生", "漸進自然", "維持18-24月", "抗老回春"],
    icon: "Leaf",
    image: IMAGES.bannerCollagen,
    hotLabel: "🔥 2026 熱搜 #6",
  },
];

export const SERVICES = FEATURED_SERVICES;

// ─── 完整療程分類（15大自費 + 健保） ───
// V3: 整合舊官網爬取資料，每個分類包含真實療程項目與圖片

export interface ServiceCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  suitableFor?: string;
  focusArea?: string;
  highlight?: string;
  image?: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  name: string;
  subtitle?: string;
  description: string;
  features: string[];
  image?: string;
  detailUrl?: string;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "laser",
    name: "雷射電音波",
    nameEn: "Laser & Energy",
    icon: "Zap",
    image: IMAGES.treatmentPicosure,
    description: "以先進光電科技精準治療，改善膚質、淡化色素、緊緻拉提。蘋果樹配備多款原廠認證儀器，由經驗豐富的醫師依膚況選擇最適合的能量參數。",
    suitableFor: "斑點、痘疤、毛孔粗大、膚色暗沉、輪廓鬆弛者",
    focusArea: "色素改善、膠原新生、緊緻拉提、膚質升級",
    highlight: "蘋果樹引進多款原廠認證雷射與音波設備，涵蓋皮秒、電波、音波等主流技術",
    items: [
      { name: "PicoSure 755 皮秒蜂巢雷射", subtitle: "24h亮白・膠原新生", description: "755nm 蜂巢透鏡技術，比傳統雷射快 1000 倍，精準擊碎色素顆粒，有效改善斑點、痘疤與毛孔粗大。恢復期僅 1-3 天。", features: ["24h亮白有感", "改善痘疤凹洞", "縮小毛孔", "膠原蛋白新生"], image: IMAGES.treatmentPicosure },
      { name: "海芙電波", subtitle: "深層緊緻・膠原重組", description: "革命性單極電波技術，深層加熱刺激膠原蛋白增生重組，達到緊緻拉提效果。", features: ["深層緊緻拉提", "膠原增生重組", "改善法令紋", "V臉塑形"], image: IMAGES.treatmentHaifu },
      { name: "Z音波拉提", subtitle: "SMAS筋膜層拉提", description: "新一代聚焦式超音波技術，精準作用於 SMAS 筋膜層。", features: ["SMAS筋膜層作用", "非侵入式拉提", "維持度佳", "舒適度提升"], image: IMAGES.treatmentZwave },
      { name: "索夫波", description: "新一代柱狀聚焦超音波，3D 立體加熱技術，舒適度更高。", features: ["3D立體加熱", "舒適度高", "緊緻拉提", "無恢復期"], image: treatmentImg("索夫波") },
    ],
  },
  {
    id: "injection",
    name: "微整注射",
    nameEn: "Injection",
    icon: "Droplets",
    description: "以精準注射技術，快速改善面部輪廓與紋路。蘋果樹使用多品牌原廠認證材料，由醫師依個人需求選擇最適合的注射方案。",
    suitableFor: "希望快速改善紋路、填充凹陷、調整輪廓比例者",
    focusArea: "填充塑形、除皺撫紋、輪廓調整、保濕注射",
    highlight: "涵蓋玻尿酸、肉毒、膠原增生劑、溶脂針等多種注射選擇",
    items: [
      { name: "Sunmax 膠原蛋白（熊貓針）", description: "以膠原蛋白直接注入眼周，改善黑眼圈與淚溝問題。", features: ["改善黑眼圈", "淚溝填補", "膠原蛋白", "眼周回春"], image: treatmentImg("Sunmax 膠原蛋白（熊貓針）") },
      { name: "VivaBella 薇貝拉", subtitle: "新一代膠原增生劑", description: "新一代膠原蛋白增生劑，聚雙旋乳酸與玻尿酸複合配方，兼具即時填充與長效膠原增生。", features: ["膠原蛋白增生", "自然填充", "持久效果", "漸進式改善"], image: treatmentImg("VivaBella 薇貝拉") },
      { name: "肉毒桿菌", description: "精準注射放鬆過度收縮的肌肉，改善動態紋路，同時可瘦臉、瘦小腿。", features: ["改善動態紋", "瘦臉塑形", "瘦小腿", "除皺撫紋"], image: treatmentImg("肉毒桿菌") },
      { name: "玻尿酸填充", description: "以不同分子量的玻尿酸針對淚溝、法令紋、蘋果肌等部位進行精準填充。", features: ["精準填充", "即時效果", "自然柔軟", "安全可逆"], image: treatmentImg("玻尿酸填充") },
      { name: "Volite 長效保濕針", description: "以微量玻尿酸均勻注入真皮層，從內而外提升肌膚保水度與彈性。", features: ["深層保濕", "提升彈性", "改善膚質", "持久效果"], image: treatmentImg("Volite 長效保濕針") },
      { name: "Sculptra 舒顏萃", subtitle: "聚左旋乳酸", description: "刺激自體膠原蛋白增生，漸進式改善臉部凹陷與鬆弛。", features: ["膠原增生", "漸進改善", "自然持久", "全臉回春"], image: treatmentImg("Sculptra 舒顏萃") },
      { name: "Ellanse 洢蓮絲", description: "兼具即時填充與長效膠原蛋白增生效果。", features: ["即時填充", "膠原增生", "維持度佳", "自然立體"], image: treatmentImg("Ellanse 洢蓮絲") },
      { name: "AestheFill 艾麗斯", subtitle: "聚雙旋乳酸", description: "刺激自體膠原蛋白增生，自然填充流失的蘋果肌與法令紋。", features: ["蘋果肌回春", "膠原增生", "自然持久", "漸進改善"], image: treatmentImg("AestheFill 艾麗斯") },
      { name: "塑立愛 少女立提線", subtitle: "埋線拉提", description: "以可吸收線材埋入皮下，提供即時拉提與長效膠原增生效果。", features: ["即時拉提", "膠原增生", "可吸收線材", "輪廓提升"], image: treatmentImg("塑立愛 少女立提線") },
      { name: "BELKYRA 倍克脂", subtitle: "消脂注射", description: "針對雙下巴等局部脂肪堆積問題，以注射方式溶解脂肪細胞。", features: ["消除雙下巴", "溶脂注射", "非手術", "輪廓改善"], image: treatmentImg("BELKYRA 倍克脂") },
      { name: "腋下止汗", description: "以注射方式減少腋下汗腺分泌，改善多汗與異味問題。", features: ["減少出汗", "改善異味", "注射治療", "維持度佳"], image: treatmentImg("腋下止汗") },
    ],
  },
  // ── 整型外科：4 大子分類 ──
  {
    id: "surgery-eye",
    name: "整型外科｜眼部",
    nameEn: "Eye Surgery",
    icon: "Scissors",
    image: IMAGES.caseEyebag,
    description: "眼神是靈魂之窗。蘋果樹眼部整型由整外專科醫師執刀，提供雙眼皮、開眼頭/開眼尾、眼袋手術等方案，術前精準模擬，術後完整追蹤。",
    suitableFor: "希望改善眼型、消除眼袋、讓雙眼更有神者",
    focusArea: "雙眼皮、開眼頭/尾、眼袋移除",
    highlight: "整外專科醫師執刀，術前眼神定位模擬",
    items: [
      { name: "雙眼皮手術", description: "依個人眼型與需求，打造自然有神的雙眼皮。提供縫合式與切開式兩種方案。", features: ["自然眼型", "個人化設計", "縫合/切開式", "恢復期短"], image: treatmentImg("雙眼皮手術") },
      { name: "開眼頭/開眼尾", description: "調整眼睛開口大小與形狀，讓眼型更加明亮開闊。", features: ["眼型放大", "改善比例", "自然開闊", "精準設計"], image: treatmentImg("開眼頭/開眼尾") },
      { name: "眼袋手術", description: "精準移除眼袋脂肪，同時改善淚溝凹陷，讓雙眼更有神采。", features: ["眼袋移除", "淚溝改善", "精神提升", "年輕化"], image: treatmentImg("眼袋手術") },
    ],
  },
  {
    id: "surgery-nose",
    name: "整型外科｜鼻部",
    nameEn: "Nose Surgery",
    icon: "Scissors",
    description: "鼻型決定臉部立體度。蘋果樹提供韓式隆鼻、卡麥拉隆鼻、縮鼻翼、縮鼻頭等手術方案，由整外專科醫師依個人臉部比例精準規劃。",
    suitableFor: "希望改善鼻型、提升臉部立體度者",
    focusArea: "隆鼻、縮鼻翼、縮鼻頭、鼻型雕塑",
    highlight: "韓式鼻整形技術，兼顧正面與側面比例",
    items: [
      { name: "韓式隆鼻手術", description: "以韓式鼻整形技術，打造自然立體的鼻型，兼顧正面與側面比例。", features: ["韓式技術", "自然立體", "正側面兼顧", "個人化設計"], image: treatmentImg("韓式隆鼻手術") },
      { name: "卡麥拉隆鼻手術", description: "使用卡麥拉材質進行隆鼻，材質穩定不易位移，觸感自然。", features: ["材質穩定", "不易位移", "自然觸感", "長效維持"], image: treatmentImg("卡麥拉隆鼻手術") },
      { name: "縮鼻翼手術", description: "縮小過寬的鼻翼，讓鼻型更加精緻和諧。", features: ["鼻翼縮小", "精緻鼻型", "和諧比例", "微創手術"], image: treatmentImg("縮鼻翼手術") },
      { name: "縮鼻頭手術", description: "針對鼻頭過大或圓鈍問題，精準雕塑鼻頭形狀，讓鼻型更加精緻。", features: ["鼻頭精緻化", "改善圓鈍", "精準雕塑", "和諧比例"], image: treatmentImg("縮鼻頭手術") },
    ],
  },
  {
    id: "surgery-breast",
    name: "整型外科｜胸型身形",
    nameEn: "Breast & Body Surgery",
    icon: "Scissors",
    description: "蘋果樹提供果凍矽膠隆乳、自體脂肪隆乳、提胸、乳暈手術、平胸手術等完整胸型與身形手術方案，由整外專科醫師安全執刀。",
    suitableFor: "希望改善胸型、調整身形比例者",
    focusArea: "隆乳、提胸、乳暈、平胸手術",
    highlight: "多種隆乳方式可選，術前詳細評估",
    items: [
      { name: "果凍矽膠隆乳", description: "使用新一代果凍矽膠義乳，觸感柔軟自然，安全性高。", features: ["觸感自然", "安全性高", "形狀穩定", "多種尺寸"], image: treatmentImg("果凍矽膠隆乳") },
      { name: "自體脂肪隆乳手術", description: "抽取自身多餘脂肪移植至胸部，一舉兩得，觸感真實。", features: ["自體脂肪", "觸感真實", "同時雕塑", "自然外觀"], image: treatmentImg("自體脂肪隆乳手術") },
      { name: "提胸手術", description: "改善胸部下垂問題，重新塑造堅挺飽滿的胸型。", features: ["改善下垂", "重塑胸型", "堅挺飽滿", "自然曲線"], image: treatmentImg("提胸手術") },
      { name: "乳暈手術", description: "調整乳暈大小與顏色，讓胸部外觀更加美觀和諧。", features: ["調整大小", "改善顏色", "美觀和諧", "微創手術"], image: treatmentImg("乳暈手術") },
      { name: "平胸手術", description: "針對男性女乳症或跨性別需求，提供安全的平胸手術方案。", features: ["改善女乳症", "安全手術", "自然胸型", "恢復自信"], image: treatmentImg("平胸手術") },
    ],
  },
  {
    id: "surgery-lipo",
    name: "整型外科｜抽脂與拉皮",
    nameEn: "Liposuction & Facelift",
    icon: "Scissors",
    description: "蘋果樹提供抽脂手術與自體脂肪移植，精準雕塑身體曲線。抽出的脂肪可移植至臉部或胸部，一舉兩得。另提供無痕拉皮手術改善熟齡輪廓。",
    suitableFor: "希望雕塑體態曲線、改善局部脂肪堆積、或需要拉皮回春者",
    focusArea: "抽脂雕塑、脂肪移植、無痕拉皮",
    highlight: "超音波抽脂技術，脂肪存活率高",
    items: [
      { name: "抽脂手術", description: "針對腰腹、大腿、手臂等局部脂肪堆積，以抽脂技術精準雕塑身體曲線。", features: ["局部雕塑", "精準抽脂", "曲線塑形", "恢復期短"], image: treatmentImg("抽脂手術") },
      { name: "自體脂肪移植手術", description: "將抽出的自體脂肪經純化後移植至臉部凹陷處，自然填補豐潤。", features: ["自體脂肪", "自然豐潤", "一舉兩得", "持久效果"], image: treatmentImg("自體脂肪移植手術") },
      { name: "無痕拉皮手術", description: "針對臉部鬆弛與下垂問題，以微創技術進行拉皮，恢復緊緻輪廓。", features: ["微創技術", "恢復緊緻", "改善鬆弛", "自然年輕"], image: treatmentImg("無痕拉皮手術") },
    ],
  },
  {
    id: "body",
    name: "形體雕塑",
    nameEn: "Body Sculpting",
    icon: "Activity",
    image: IMAGES.bannerMounjaro,
    description: "科學化體態管理，結合藥物與儀器，協助體重控制與身形雕塑。蘋果樹提供多種經臨床實證的體態管理方案，由醫師依個人狀況規劃。",
    suitableFor: "希望管理體重、改善體態曲線、局部雕塑者",
    focusArea: "體重管理、局部雕塑、肌肉鍛鍊、代謝調節",
    highlight: "涵蓋 GLP-1 藥物、動磁波、消脂針等多元體態管理方案",
    items: [
      { name: "Wegovy 週纖達", subtitle: "GLP-1 受體促效劑", description: "經臨床實證可有效降低體重，上市時間較長，臨床數據豐富。", features: ["臨床實證", "體重管理", "代謝改善", "長效作用"], image: treatmentImg("Wegovy 週纖達") },
      { name: "Mounjaro 猛健樂", subtitle: "GIP/GLP-1 雙重受體促效劑", description: "新一代雙重受體促效劑，透過調節食慾與代謝，幫助有效管理體重。", features: ["雙重受體", "食慾調節", "代謝提升", "科學減重"], image: treatmentImg("Mounjaro 猛健樂") },
      { name: "Talent-A 動磁波", subtitle: "30分鐘高效鍛鍊", description: "高強度聚焦電磁波刺激肌肉收縮，30分鐘等於數萬次肌肉鍛鍊，輕鬆打造馬甲線、翹臀。", features: ["腹肌鍛鍊", "翹臀塑形", "非侵入式", "30分鐘見效"], image: treatmentImg("Talent-A 動磁波") },
      { name: "減肥筆", description: "以注射方式調節食慾與代謝，協助體重管理。需由醫師評估後處方使用。", features: ["食慾調節", "醫師處方", "便利使用", "體重管理"], image: treatmentImg("減肥筆") },
      { name: "ICOONE", description: "結合微振動與負壓技術的體雕儀器，改善橘皮組織與局部曲線。", features: ["改善橘皮", "曲線雕塑", "非侵入式", "舒適體驗"], image: treatmentImg("ICOONE") },
      { name: "消脂針/消脂點滴", description: "以注射方式針對局部脂肪堆積進行溶解，適合小範圍局部雕塑。", features: ["局部溶脂", "非手術", "小範圍雕塑", "改善曲線"], image: treatmentImg("消脂針/消脂點滴") },
    ],
  },
  {
    id: "feminine",
    name: "女性私密美學",
    nameEn: "Feminine Aesthetics",
    icon: "Heart",
    description: "以專業與隱私兼顧的態度，提供女性私密處的美學與健康療程。蘋果樹由女醫師主導，在完全隱私的環境中進行評估與治療。",
    suitableFor: "關注私密處健康與美學的女性",
    focusArea: "私密處美學、緊緻回春、色素改善",
    highlight: "女醫師主導，完全隱私環境",
    items: [
      { name: "私密處雷射", description: "採用專業雷射技術改善私密處色素沉澱、鬆弛等問題，提升自信與生活品質。", features: ["改善色素", "緊緻回春", "安全溫和", "隱私保護"], image: treatmentImg("私密處雷射") },
    ],
  },
  {
    id: "men",
    name: "型男醫美專區",
    nameEn: "Men's Aesthetics",
    icon: "Shield",
    image: IMAGES.caseHydrafacialMale,
    description: "專為男性設計的醫美療程，從膚質管理到體態雕塑，打造精神俐落的型男形象。蘋果樹理解男性對效率與自然感的需求，提供快速有效的方案。",
    suitableFor: "希望改善膚質、體態或落髮問題的男性",
    focusArea: "男性膚質管理、除毛、痘疤改善、生髮、體雕",
    highlight: "專為男性設計的療程流程，注重效率與自然感",
    items: [
      { name: "男性除毛", description: "針對男性常見的鬍鬚、胸毛、腿毛等部位，以雷射技術進行永久性除毛。", features: ["雷射除毛", "多部位適用", "維持度佳", "舒適度高"], image: treatmentImg("男性除毛") },
      { name: "男性微整", description: "針對男性臉部輪廓進行微整注射，改善紋路、調整比例，維持自然俐落感。", features: ["自然俐落", "改善紋路", "輪廓調整", "快速恢復"], image: treatmentImg("男性微整") },
      { name: "男性痘疤", description: "以雷射與複合療程改善男性常見的痘疤、凹洞問題，提升膚質平滑度。", features: ["痘疤改善", "凹洞修復", "膚質提升", "複合療程"], image: treatmentImg("男性痘疤") },
      { name: "男性生髮", description: "針對男性雄性禿等落髮問題，提供口服藥物、外用藥物與雷射生髮等多元方案。", features: ["雄性禿治療", "多元方案", "生髮促進", "頭皮管理"], image: treatmentImg("男性生髮") },
      { name: "男性體雕", description: "以動磁波等儀器協助男性鍛鍊腹肌、改善體態，打造精實身形。", features: ["腹肌鍛鍊", "體態改善", "非侵入式", "精實身形"], image: treatmentImg("男性體雕") },
    ],
  },
  {
    id: "regen",
    name: "再生醫學",
    nameEn: "Regenerative Medicine",
    icon: "Leaf",
    image: IMAGES.abstract,
    description: "以再生醫學為核心，啟動身體自癒能力，從根本改善健康與美麗。蘋果樹運用增生療法與自體血小板技術，促進組織修復與再生。",
    suitableFor: "希望以自體修復方式改善肌膚老化、關節疼痛者",
    focusArea: "組織修復、膠原再生、自癒能力啟動",
    highlight: "運用自體血液萃取技術，安全天然",
    items: [
      { name: "增生療法", description: "以注射方式刺激身體自然修復機制，促進受損組織再生與修復。", features: ["促進修復", "自然再生", "改善疼痛", "組織重建"], image: treatmentImg("增生療法") },
      { name: "IHT（PRP）注射療法", subtitle: "自體血小板血漿", description: "萃取自體血液中的高濃度血小板生長因子，注入目標部位促進組織修復與膠原蛋白再生。", features: ["自體萃取", "促進修復", "膠原再生", "安全天然"], image: treatmentImg("IHT（PRP）注射療法") },
    ],
  },
  {
    id: "hair",
    name: "生髮門診",
    nameEn: "Hair Restoration",
    icon: "Sprout",
    description: "專業生髮評估與治療，從根本改善落髮問題，重建豐盈髮量。蘋果樹提供頭皮檢測、口服藥物、外用藥物與雷射生髮等完整方案。",
    suitableFor: "有落髮、髮量稀疏、頭皮健康問題者",
    focusArea: "落髮治療、頭皮健康、毛髮養護、生髮促進",
    highlight: "從頭皮檢測開始，制定個人化生髮方案",
    items: [
      { name: "不動刀育髮", description: "結合口服藥物、外用藥物與雷射生髮帽等多元治療方案，不需手術即可改善落髮。", features: ["非手術", "多元方案", "改善落髮", "促進生長"], image: treatmentImg("不動刀育髮") },
      { name: "毛髮護理", description: "以專業頭皮護理療程，改善頭皮環境，為毛髮生長創造良好條件。", features: ["頭皮護理", "改善環境", "促進生長", "專業療程"], image: treatmentImg("毛髮護理") },
      { name: "頭皮檢測", description: "以專業儀器進行頭皮與毛囊健康檢測，作為生髮治療的評估基礎。", features: ["精密檢測", "毛囊評估", "治療依據", "個人化分析"], image: treatmentImg("頭皮檢測") },
    ],
  },
  {
    id: "nutrition",
    name: "營養醫學",
    nameEn: "Nutritional Medicine",
    icon: "Apple",
    description: "以科學化營養補充方案，從內在調理身體機能。蘋果樹提供客製化點滴療程與營養配方，由醫師依個人檢測結果規劃補充方案。",
    suitableFor: "疲勞、免疫力低下、膚色暗沉、營養不均衡者",
    focusArea: "營養補充、代謝提升、免疫強化、由內而外調理",
    highlight: "依個人檢測結果客製化營養補充方案",
    items: [
      { name: "氦氖雷射 ILIB", subtitle: "靜脈雷射", description: "以低能量雷射照射血液，促進血液循環與細胞代謝，改善疲勞與免疫力。", features: ["促進循環", "改善疲勞", "提升免疫", "細胞活化"], image: treatmentImg("氦氖雷射 ILIB") },
      { name: "點滴針劑", description: "依個人需求調配高濃度維生素、礦物質與胺基酸點滴，快速補充身體所需營養。", features: ["客製化配方", "快速補充", "提升代謝", "增強免疫"], image: treatmentImg("點滴針劑") },
      { name: "營養配方", description: "由醫師依個人檢測結果，規劃專屬的營養補充配方。", features: ["個人化配方", "醫師規劃", "精準補充", "長期調理"], image: treatmentImg("營養配方") },
    ],
  },
  {
    id: "functional",
    name: "功能醫學檢測",
    nameEn: "Functional Medicine",
    icon: "Search",
    description: "透過精密檢測了解身體功能狀態，找出健康問題的根本原因。蘋果樹提供多項功能醫學檢測，協助建立個人化的健康管理計畫。",
    suitableFor: "希望深入了解身體狀態、預防疾病、找出亞健康原因者",
    focusArea: "精密檢測、根因分析、預防醫學、健康追蹤",
    highlight: "涵蓋基因、腸道菌叢、腦波、自律神經等多項精密檢測",
    items: [
      { name: "基因檢測", description: "透過基因分析了解個人體質特性、疾病風險與營養代謝傾向，作為健康管理的長期依據。", features: ["體質分析", "風險評估", "營養建議", "長期依據"], image: treatmentImg("基因檢測") },
      { name: "3DMRA 檢測", description: "以非侵入式方式掃描全身器官功能狀態，快速了解身體整體健康狀況。", features: ["全身掃描", "非侵入式", "快速了解", "整體評估"], image: treatmentImg("3DMRA 檢測") },
      { name: "腦波檢測", description: "以腦波儀器分析大腦活動狀態，評估壓力、注意力與睡眠品質。", features: ["壓力評估", "注意力分析", "睡眠品質", "大腦健康"], image: treatmentImg("腦波檢測") },
      { name: "腸道菌叢分析", description: "分析腸道菌群組成與多樣性，了解腸道健康狀態與免疫功能。", features: ["菌群分析", "腸道健康", "免疫評估", "營養建議"], image: treatmentImg("腸道菌叢分析") },
      { name: "HRV 自律神經分析", description: "以心率變異分析評估自律神經平衡狀態，了解壓力與恢復能力。", features: ["自律神經", "壓力評估", "恢復能力", "平衡分析"], image: treatmentImg("HRV 自律神經分析") },
      { name: "PTG 血管分析", description: "以光體積變化描記法分析血管彈性與循環狀態。", features: ["血管彈性", "循環評估", "非侵入式", "心血管健康"], image: treatmentImg("PTG 血管分析") },
    ],
  },
  {
    id: "happy",
    name: "快樂門診",
    nameEn: "Wellness Clinic",
    icon: "Smile",
    description: "身心健康是美麗的基礎。蘋果樹快樂門診由中西醫雙執照醫師主持，結合情緒醫學、音樂治療與功能醫學檢測，提供整合性身心調理方案。",
    suitableFor: "壓力大、失眠、焦慮、情緒低落、身心疲憊者",
    focusArea: "情緒調理、壓力管理、睡眠改善、身心平衡",
    highlight: "中西醫雙執照醫師主持，結合音樂治療與功能醫學檢測",
    items: [
      { name: "快樂門診", description: "由中西醫雙執照醫師提供整合性身心調理方案，針對壓力、失眠、焦慮等現代文明病。", features: ["中西醫整合", "壓力管理", "改善睡眠", "情緒調理"], image: treatmentImg("快樂門診") },
      { name: "音樂治療", description: "以音樂作為治療媒介，透過聆聽、演奏與互動，促進身心放鬆與情緒調節。", features: ["音樂療癒", "身心放鬆", "情緒調節", "壓力釋放"], image: treatmentImg("音樂治療") },
      { name: "3DMRA 檢測", description: "以非侵入式方式掃描全身器官功能狀態，作為身心調理的評估基礎。", features: ["全身掃描", "非侵入式", "整體評估", "治療依據"], image: treatmentImg("3DMRA 檢測") },
      { name: "腦波檢測", description: "分析大腦活動狀態，評估壓力指數與睡眠品質，作為治療方案的參考依據。", features: ["壓力評估", "睡眠分析", "大腦健康", "治療參考"], image: treatmentImg("腦波檢測") },
      { name: "HRV 自律神經分析", description: "評估自律神經平衡狀態，了解身體的壓力反應與恢復能力。", features: ["自律神經", "壓力反應", "恢復能力", "平衡評估"], image: treatmentImg("HRV 自律神經分析") },
      { name: "PTG 血管分析", description: "分析血管彈性與循環狀態，作為整體健康評估的一環。", features: ["血管健康", "循環評估", "整體健康", "非侵入式"], image: treatmentImg("PTG 血管分析") },
    ],
  },
  {
    id: "vaccine",
    name: "自費疫苗",
    nameEn: "Vaccination",
    icon: "ShieldCheck",
    description: "提供多種自費疫苗接種服務，為您的健康多一層保護。蘋果樹由專業醫師評估接種需求，確保安全施打。",
    suitableFor: "希望透過疫苗預防疾病、提升保護力者",
    focusArea: "疫苗接種、疾病預防、健康保護",
    highlight: "專業醫師評估，安全施打環境",
    items: [
      { name: "自費疫苗接種", description: "提供流感疫苗、HPV疫苗、帶狀疱疹疫苗等多種自費疫苗，由醫師評估後安全施打。", features: ["多種疫苗", "專業施打", "安全保障", "預防保健"], image: treatmentImg("自費疫苗接種") },
    ],
  },
  {
    id: "skin",
    name: "肌膚管理",
    nameEn: "Skin Care",
    icon: "Sparkles",
    image: IMAGES.treatmentAmpule,
    description: "以醫學級肌膚管理療程，從清潔、修護到煥膚，全方位提升膚質。蘋果樹肌膚管理結合專業儀器與醫學級保養品，為肌膚建立健康基礎。",
    suitableFor: "膚質暗沉、乾燥缺水、毛孔粗大、敏感泛紅者",
    focusArea: "深層清潔、保濕修護、膚質提升、煥膚亮白",
    highlight: "結合專業儀器與醫學級保養品，建立肌膚健康基礎",
    items: [
      { name: "Rejuran 麗珠蘭", subtitle: "鮭魚針", description: "以鮭魚DNA多核苷酸注入肌膚，促進細胞修復與膠原蛋白再生，改善膚質與彈性。", features: ["細胞修復", "膠原再生", "改善膚質", "提升彈性"], image: treatmentImg("Rejuran 麗珠蘭") },
      { name: "超級玻尿酸鎖水保濕面膜", description: "以高濃度玻尿酸面膜深層補水，為肌膚建立保濕屏障。", features: ["深層補水", "保濕屏障", "即時水潤", "舒緩修護"], image: treatmentImg("超級玻尿酸鎖水保濕面膜") },
      { name: "膠原膜（膠原蛋白面膜）", description: "以膠原蛋白面膜為肌膚補充膠原蛋白，提升彈性與緊緻度。", features: ["膠原補充", "提升彈性", "緊緻肌膚", "修護保養"], image: treatmentImg("膠原膜（膠原蛋白面膜）") },
      { name: "安瓶導入", subtitle: "醫美前導升級", description: "以專業導入儀器將高濃度精華安瓶深層導入肌膚，提升吸收效率。", features: ["深層導入", "高濃度精華", "提升吸收", "即時亮澤"], image: treatmentImg("安瓶導入") },
      { name: "AI 光譜治療", description: "運用不同波長的光能，針對痘痘、泛紅、暗沉等不同肌膚問題進行精準治療。", features: ["抗痘消炎", "舒緩泛紅", "促進修復", "恢復期短"], image: treatmentImg("AI 光譜治療") },
      { name: "O2 to Derm 氧氣面罩", description: "以高壓氧氣技術促進肌膚吸收營養成分，提升膚質與光澤。", features: ["高壓氧氣", "促進吸收", "膚質提升", "光澤感"], image: treatmentImg("O2 to Derm 氧氣面罩") },
    ],
  },
  {
    id: "spa",
    name: "醫SPA",
    nameEn: "Medical SPA",
    icon: "Flower2",
    description: "結合醫學專業與SPA舒壓體驗，在放鬆中完成肌膚保養與身心療癒。蘋果樹醫SPA由專業美容師操作，使用醫學級保養品。",
    suitableFor: "希望在放鬆中完成保養、舒緩壓力者",
    focusArea: "深層放鬆、肌膚修護、身心療癒",
    highlight: "醫學級保養品搭配專業手技",
    items: [
      { name: "醫學美容SPA", description: "由專業美容師操作的醫學級SPA療程，結合高效能保養品與專業手技，在放鬆中完成深層保養。", features: ["深層放鬆", "肌膚修護", "專業手技", "醫學級保養"], image: treatmentImg("醫學美容SPA") },
    ],
  },
];

export const NHI_SERVICES = [
  { id: "nhi-skin", name: "健保皮膚科", description: "提供各類皮膚疾病的健保診療服務。", location: "北大診所" },
  { id: "nhi-pain", name: "疼痛科", description: "針對慢性疼痛、肌肉骨骼疼痛等問題提供健保診療服務。", location: "北大診所" },
];

export const FAQ_ITEMS = [
  { question: "蘋果樹為什麼叫「蘋果樹」？", answer: "創辦人曾在科技業，看見 Apple 與 Nokia 代表兩種不同的時代選擇。那次經驗讓我們記住：不要只跟著現在的市場走，要有能力看見下一個未來。所以第二次創業時，我們把診所命名為『蘋果樹』。蘋果，代表科技、創新與未來。樹，代表根基、成長與持續結果。蘋果樹希望把科技思維種進醫療現場，讓健康與美麗成為可以被檢測、規劃、追蹤與調整的長期管理。" },
  { question: "什麼是『美麗是一種管理』？", answer: "蘋果樹相信，美麗不是一次性的療程結果，而是一段持續的管理過程。從看懂自己的狀態開始，透過 AI 檢測整理方向、由醫師評估規劃，再搭配專屬追蹤持續調整，讓健康與美麗成為可以被管理的長期狀態。" },
  { question: "AI 檢測結果可以直接決定療程嗎？", answer: "不可以。AI 檢測結果只作為初步參考，實際療程仍需由醫師與專業團隊依照個人狀況評估。序顏 AI 的角色是幫你先整理狀態與方向，最終決策一定是由專業醫療團隊把關。" },
  { question: "蘋果樹 Dr. Appletree 提供哪些療程？", answer: "蘋果樹提供多元專業療程，涵蓋雷射電音波（皮秒雷射、海芙電波、Z音波、索夫波等）、微整注射（薇貝拉魔法針、玻尿酸、肉毒桿菌）、整型外科、形體雕塑（猛健樂、週纖達、Talent-A動磁波）、女性私密美學、型男醫美專區、再生醫學、生髮門診、營養醫學、功能醫學檢測、快樂門診、自費疫苗、肌膚管理（水飛梭、安瓶導入、LED光療）、醫SPA。北大診所另提供健保皮膚科服務。" },
  { question: "第一次到蘋果樹醫美需要準備什麼？", answer: "首次來診建議攜帶身分證件，提前 10 分鐘到達填寫基本資料。我們會安排專業諮詢師為您進行一對一的膚質分析與療程建議，整個諮詢過程約 30-60 分鐘，完全免費且無任何消費壓力。" },
  { question: "皮秒雷射和傳統雷射有什麼差別？為什麼 2026 年皮秒蜂巢是熱搜第一？", answer: "皮秒雷射以皮秒（10⁻¹²秒）為單位，比傳統奈秒雷射快 1000 倍，能更精準地擊碎色素顆粒，對周圍組織傷害更小。蜂巢透鏡技術更能聚焦能量，刺激膠原蛋白新生。恢復期通常 1-3 天，24小時即可感受膚色提亮。2026 年成為熱搜第一是因為新一代蜂巢透鏡效果更好、舒適度更高。" },
  { question: "海芙電波和音波拉提該怎麼選？", answer: "海芙電波透過單極電波加熱真皮層，效果偏向「緊緻」；音波拉提聚焦超音波作用於 SMAS 筋膜層，效果偏向「拉提」。想要皮膚緊緻選海芙電波，想要輪廓拉提選音波。兩者也可搭配使用，建議預約諮詢由醫師評估最適合的方案。" },
  { question: "Mounjaro 猛健樂和 Wegovy 週纖達有什麼不同？", answer: "Mounjaro（猛健樂）是 GIP/GLP-1 雙重受體促效劑，同時作用於兩個受體，臨床研究顯示平均減重 15-20%。Wegovy（週纖達）是 GLP-1 單一受體促效劑，上市時間較長，臨床數據豐富。兩者都需要醫師處方，建議由醫師根據您的身體狀況與需求推薦最適合的方案。" },
  { question: "Talent-A 動磁波真的有效嗎？", answer: "Talent-A 動磁波利用高強度聚焦電磁波（HIFEM）技術，30分鐘內可引發數萬次肌肉收縮，等同於高強度運動鍛鍊。臨床研究顯示可有效增加肌肉量、減少脂肪厚度。適用於腹部、臀部、手臂等部位，是非侵入式體態雕塑的熱門選擇。" },
  { question: "療程的價格大約是多少？", answer: "每位客人的膚況與需求不同，療程方案也會因此調整。建議您先預約免費諮詢，由醫師評估後提供最適合的方案與報價。我們提供現金、信用卡、以及分期零利率方案。" },
  { question: "蘋果樹有幾個據點？", answer: "蘋果樹目前有三個據點：南京旗艦院所位於台北市松山區南京東路三段309號3樓，電話 (02) 2716-3535；北大診所位於新北市三峽區大德路127號，電話 (02) 8672-0222，提供健保皮膚科服務；北大醫美位於新北市三峽區大德路127號2樓，電話 (02) 8672-0608。" },
];
