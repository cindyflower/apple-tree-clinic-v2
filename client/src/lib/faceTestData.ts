/*
 * 臉部老化測驗 — 資料結構、題目、可複選計分邏輯、混合型結果映射
 * 4 types: 鬆弛型(sagging), 膠原流失型(collagen), 膚況拖累型(skin), 綜合疲勞型(fatigue)
 * + 混合型(mixed) when top scores tie
 */

import { IMAGES } from "./imageAssets";

// ─── 臉型測驗結果影片（本地 _root）───
const VIDEO_URLS = {
  sagging: IMAGES.videoFaceSagging,
  collagen: IMAGES.videoFaceCollagen,
  skin: IMAGES.videoFaceSkin,
  fatigue: IMAGES.videoFaceFatigue,
} as const;

// ─── Types ───
export type AgingType = "sagging" | "collagen" | "skin" | "fatigue";

export interface QuizOption {
  text: string;
  type: AgingType;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface AgingResult {
  type: AgingType;
  title: string;
  emoji: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  recommendations: string[];
}

// Mixed result info (when two types tie)
export interface MixedResultInfo {
  isMixed: boolean;
  primaryType: AgingType;
  secondaryType?: AgingType;
  mixedTitle?: string; // e.g. "鬆弛型 × 膠原流失型"
}

// ─── 6 道題目 ───
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "最近照鏡子，哪個瞬間最有感？",
    options: [
      { text: "笑的時候臉頰往下掉、笑紋超明顯", type: "sagging" },
      { text: "側臉看起來有點「平」、下巴線條變模糊", type: "collagen" },
      { text: "皮膚怎麼擦保養品都覺得暗沉、沒光", type: "skin" },
      { text: "自拍總覺得整張臉看起來很累、沒精神", type: "fatigue" },
    ],
  },
  {
    id: 2,
    question: "你最討厭被朋友偷拍哪個角度？",
    options: [
      { text: "正面近距離（笑紋、眼下紋路超明顯）", type: "sagging" },
      { text: "側臉（下顎線條不夠俐落）", type: "collagen" },
      { text: "自然光打下來（膚色看起來灰灰的）", type: "skin" },
      { text: "任何角度都覺得臉好像「腫腫的」或「塌塌的」", type: "fatigue" },
    ],
  },
  {
    id: 3,
    question: "如果朋友傳來一張你沒準備的照片，你最可能心裡想什麼？",
    options: [
      { text: "「我怎麼看起來這麼老氣…」", type: "sagging" },
      { text: "「我的輪廓好像慢慢往下走了」", type: "collagen" },
      { text: "「皮膚狀態拖累我整個顏值」", type: "skin" },
      { text: "「這張臉怎麼這麼沒精神，像沒睡飽」", type: "fatigue" },
    ],
  },
  {
    id: 4,
    question: "以下哪句話最像你最近的心聲？",
    options: [
      { text: "「我好像沒明顯變老，但就是覺得不對勁」", type: "sagging" },
      { text: "「我感覺臉在慢慢往下掉」", type: "collagen" },
      { text: "「皮膚再保養也救不了整體」", type: "skin" },
      { text: "「明明沒老，但照片裡總是看起來好疲倦」", type: "fatigue" },
    ],
  },
  {
    id: 5,
    question: "最近自拍最常修哪裡？",
    options: [
      { text: "笑紋跟法令紋", type: "sagging" },
      { text: "下巴跟臉頰輪廓", type: "collagen" },
      { text: "膚色跟斑點", type: "skin" },
      { text: "黑眼圈跟氣色", type: "fatigue" },
    ],
  },
  {
    id: 6,
    question: "你最擔心自己哪個部位會先「認輸」老化？",
    options: [
      { text: "臉頰和法令紋往下掉", type: "sagging" },
      { text: "下巴線條和側臉輪廓", type: "collagen" },
      { text: "整體膚色和光澤", type: "skin" },
      { text: "眼睛周圍（黑眼圈、眼袋、細紋）", type: "fatigue" },
    ],
  },
];

// ─── Type display names ───
export const TYPE_NAMES: Record<AgingType, string> = {
  sagging: "鬆弛型",
  collagen: "膠原流失型",
  skin: "膚況拖累型",
  fatigue: "綜合疲勞型",
};

// ─── 4 種結果 (updated copy per spec) ───
export const AGING_RESULTS: Record<AgingType, AgingResult> = {
  sagging: {
    type: "sagging",
    title: "慢性鬆弛型",
    emoji: "😮‍💨",
    subtitle: "你不是突然變老，而是臉部支撐力正在慢慢下降。",
    description:
      "最常見的感覺是：法令紋變明顯、嘴邊肉出現、下半臉看起來比較沉。這種狀態通常不是單靠保養品可以改善，而是需要先看懂鬆弛發生在哪一層，再決定要先處理緊緻、支撐，還是輪廓。",
    videoUrl: VIDEO_URLS.sagging,
    recommendations: [
      "音波拉提（SMAS筋膜層緊緻）",
      "海芙電波（深層膠原重組）",
      "埋線拉提（即時拉提效果）",
    ],
  },
  collagen: {
    type: "collagen",
    title: "膠原流失型",
    emoji: "📉",
    subtitle: "你看起來不是老，而是臉開始有一點「空」。",
    description:
      "常見表現是：蘋果肌變平、淚溝變明顯、側臉支撐感下降。這類狀態最容易讓人覺得疲憊、沒精神，但只做表層保養通常不夠，關鍵是找出哪裡開始流失支撐。",
    videoUrl: VIDEO_URLS.collagen,
    recommendations: [
      "玻尿酸填充（輪廓重建）",
      "聚雙旋乳酸（膠原增生）",
      "電波拉提（緊緻輪廓線）",
    ],
  },
  skin: {
    type: "skin",
    title: "膚況拖累型",
    emoji: "🌫️",
    subtitle: "你的輪廓不一定差，但膚色、毛孔、暗沉或細紋正在拖累整體年輕感。",
    description:
      "很多人明明五官條件不錯，卻因為膚況讓照片看起來沒精神。這類型通常需要先改善皮膚質感與透亮度，讓整張臉先恢復乾淨、細緻、有光。",
    videoUrl: VIDEO_URLS.skin,
    recommendations: [
      "皮秒蜂巢雷射（淡斑亮白）",
      "水光針（深層保濕透亮）",
      "功能醫學檢測（從內調理膚況）",
    ],
  },
  fatigue: {
    type: "fatigue",
    title: "綜合疲勞型",
    emoji: "😴",
    subtitle: "你的問題不是單一部位，而是整張臉看起來比較累。",
    description:
      "可能同時有一點鬆、一點凹、一點暗沉，讓人覺得氣色不好、精神下降。這類型最適合做完整評估，因為順序很重要：先處理錯地方，效果會不明顯，也容易花錯預算。",
    videoUrl: VIDEO_URLS.fatigue,
    recommendations: [
      "功能醫學評估（找出疲勞根源）",
      "眼周電波（改善眼袋黑眼圈）",
      "肉毒桿菌（提升眼神精神度）",
    ],
  },
};

// ─── 混合型專用文案 ───
export const MIXED_TYPE_COPY = {
  subtitle: "你的老化訊號不只一種。",
  description:
    "這代表你的臉不是只有一個地方需要調整，而是需要先判斷「哪個問題最優先」。",
};

// ─── 計分函數 (支援可複選 — 每題可選多個) ───
export type QuestionAnswers = AgingType[][]; // answers[questionIndex] = [selected types]

export function calculateMultiSelectResult(allAnswers: QuestionAnswers): MixedResultInfo {
  const scores: Record<AgingType, number> = {
    sagging: 0,
    collagen: 0,
    skin: 0,
    fatigue: 0,
  };

  // Each selected option adds +1 to its type
  allAnswers.forEach((questionSelections) => {
    questionSelections.forEach((type) => {
      scores[type] += 1;
    });
  });

  // Sort types by score descending
  const sorted = (Object.keys(scores) as AgingType[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const topScore = scores[sorted[0]];

  // Find all types that share the top score
  const topTypes = sorted.filter((t) => scores[t] === topScore);

  if (topTypes.length === 1) {
    // Single winner
    return {
      isMixed: false,
      primaryType: topTypes[0],
    };
  } else {
    // Mixed: take top 2 only
    return {
      isMixed: true,
      primaryType: topTypes[0],
      secondaryType: topTypes[1],
      mixedTitle: `${TYPE_NAMES[topTypes[0]]} × ${TYPE_NAMES[topTypes[1]]}`,
    };
  }
}
