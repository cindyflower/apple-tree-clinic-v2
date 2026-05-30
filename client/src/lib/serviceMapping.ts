/*
 * serviceMapping.ts — V3 服務分類映射矩陣
 * 定義 4 大管理入口與 6 大熱門入口對應的分類 ID 群組
 * 所有 ID 必須對應 constants.ts 中的 SERVICE_CATEGORIES[].id 或 NHI_SERVICES[].id
 * V3: 移除精雕微整(sculpt)，整型外科拆為 4 子分類
 */

// 18 項完整分類 ID（16 自費 + 2 健保）— sculpt 已移除，surgery 拆為 4 子分類，spa 已移除
export const ALL_CATEGORY_IDS = [
  "laser", "injection",
  "surgery-eye", "surgery-nose", "surgery-breast", "surgery-lipo",
  "body", "feminine", "men", "regen", "hair", "nutrition",
  "functional", "happy", "vaccine", "skin",
  "nhi-skin", "nhi-pain",
] as const;

export type CategoryId = typeof ALL_CATEGORY_IDS[number];

// 4 大管理方向 → 對應分類群組
export const MANAGEMENT_MAPPING: Record<string, CategoryId[]> = {
  "肌膚管理": ["laser", "skin", "nhi-skin"],
  "輪廓管理": ["injection", "surgery-eye", "surgery-nose", "surgery-lipo", "regen"],
  "體態代謝管理": ["body", "surgery-breast", "nutrition", "functional"],
  "長期健康管理": ["nutrition", "functional", "vaccine", "happy", "nhi-pain"],
};

// 4 大管理方向 → 動態說明文字
export const MANAGEMENT_DESCRIPTIONS: Record<string, string> = {
  "肌膚管理": "你目前看到的是肌膚管理相關內容，包含雷射光電、肌膚保養、健保皮膚科等方向。",
  "輪廓管理": "你目前看到的是輪廓管理相關內容，包含微整注射、整形外科（眼部/鼻部/抽脂拉皮）、再生醫學等方向。",
  "體態代謝管理": "你目前看到的是體態代謝管理相關內容，包含減重與形體雕塑、胸型身形手術、輔助醫學療法、功能醫學與精準檢測等方向。",
  "長期健康管理": "你目前看到的是長期健康管理相關內容，包含輔助醫學療法、功能醫學與精準檢測、自費疫苗、快樂門診等方向。",
};

// 單一分類 → 動態說明文字
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  laser: "你目前看到的是雷射電音波相關內容，重點聚焦於光電治療、緊緻拉提與膚質改善。",
  injection: "你目前看到的是微整注射相關內容，重點聚焦於填充支撐、除皺與肌膚年輕化。",
  "surgery-eye": "你目前看到的是整型外科眼部相關內容，重點聚焦於雙眼皮、開眼頭/尾、眼袋手術。",
  "surgery-nose": "你目前看到的是整型外科鼻部相關內容，重點聚焦於隆鼻、縮鼻翼、縮鼻頭等鼻型雕塑。",
  "surgery-breast": "你目前看到的是整型外科胸部相關內容，重點聚焦於隆乳、提胸、乳暈與平胸手術。",
  "surgery-lipo": "你目前看到的是整型外科抽脂與拉皮相關內容，重點聚焦於抽脂雕塑、脂肪移植與無痕拉皮。",
  body: "你目前看到的是減重與形體雕塑相關內容，重點聚焦於體態曲線、局部雕塑與非侵入式塑身。",
  feminine: "你目前看到的是女性私密美學相關內容，重點聚焦於私密保養、舒適感與女性健康照護。",
  men: "你目前看到的是型男醫美專區相關內容，重點聚焦於男性面部輪廓與體態管理。",
  regen: "你目前看到的是再生醫學相關內容，重點聚焦於細胞修復、組織再生與抗衰老。",
  hair: "你目前看到的是生髮門診相關內容，重點聚焦於落髮評估、頭皮養護與生髮治療。",
  nutrition: "你目前看到的是輔助醫學療法相關內容，重點聚焦於靜脈雷射、點滴療程、音樂治療與代謝調理。",
  functional: "你目前看到的是功能醫學與精準檢測相關內容，重點聚焦於精準健康檢測與個人化調理方案。",
  happy: "你目前看到的是快樂門診相關內容，重點聚焦於身心壓力管理與情緒健康照護。",
  vaccine: "你目前看到的是自費疫苗相關內容，重點聚焦於預防接種與健康防護。",
  skin: "你目前看到的是肌膚管理相關內容，重點聚焦於日常膚質維護與深層保養。",
  "nhi-skin": "你目前看到的是健保皮膚科相關內容，重點聚焦於常見皮膚疾病的健保診療。",
  "nhi-pain": "你目前看到的是疼痛科相關內容，重點聚焦於慢性疼痛管理與復健治療。",
};

// 6 大熱門入口 → 對應分類群組
export const HOT_SERVICE_MAPPING: Record<string, CategoryId[]> = {
  "醫學除毛": ["laser"],
  "雷射光電": ["laser"],
  "微整注射": ["injection"],
  "整形外科": ["surgery-eye", "surgery-nose", "surgery-breast", "surgery-lipo"],
  "隆乳體雕": ["surgery-breast", "body"],
  "減重管理": ["nutrition", "functional", "body"],
};
