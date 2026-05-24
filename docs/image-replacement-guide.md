# 蘋果樹官網 — 客戶換圖交付範本

本文件說明網站素材存放位置、交付規格，以及各區塊對應的**資料夾與檔名**。  
開發端以 `images/` 為唯一素材庫；`pnpm dev` 或建置時會自動同步到網站。

---

## 一、素材範圍說明

| 類型 | 存放位置 | 是否在本 repo |
|------|----------|---------------|
| 首頁 Hero、Logo、院所、療程縮圖、醫師照 | `images/00_*` ~ `images/15_*` | ✅ |
| 案例詳情相簿 | `images/cases/{slug}/` | ✅ |
| 序顏測驗、院所 DSC、短影片 | `images/` 根目錄（同步為 `_root/`） | ✅ |
| YouTube 影片與縮圖 | `client/src/lib/videoData.ts` | ❌ 不在 `images/` |
| 社群分享 OG 圖 | 目前用 `00_品牌與環境/hero-wellness-beauty-1.jpg` | ✅ |

**不在 `images/` 的內容**：美麗實境室 YouTube 影片需另提供影片連結，無法只換圖片資料夾完成。

---

## 二、交付規格（請客戶遵守）

### 檔案格式

- 照片：JPG 或 WebP（建議品質 80–90）
- Logo／透明底：PNG
- 短影片：MP4（序顏測驗區，若需更換）

### 尺寸建議

| 用途 | 建議 |
|------|------|
| 首頁 Hero | 寬 ≥ 1920px，橫式 16:9 或 3:2 |
| 療程卡片縮圖 | 4:3 或 16:9，寬 ≥ 800px |
| 醫師照 | 直式 **3:4**，**600 × 800 px**（詳見下方「醫師照細規」） |
| 院所環境 | 橫式 4:3 或 16:9 |
| 案例 cover | 與內頁相簿比例一致；首張為列表封面 |
| 案例相簿 | before/after 成對時請成組交付 |

### 檔名規則

1. **優先沿用原檔名覆蓋**（最省事，網站無需改程式）
2. 新檔請用**英文＋數字**（例：`cover.jpg`、`02.jpg`），避免中文檔名
3. 若改檔名，請附「舊檔名 → 新檔名」對照表

### 交付方式

- 依下方 **P0 / P1 / P2** 分批壓縮上傳
- 每批附簡短說明：「哪張圖換哪個位置、是否可公開、需不需馬賽克」
- 案例照請確認**患者授權**與**個資遮罩**

---

## 三、驗收批次

### P0 — 品牌第一印象（優先）

| 網站位置 | 資料夾 | 檔名 |
|----------|--------|------|
| 首頁 Hero 主圖 | `00_品牌與環境/` | `hero-wellness-beauty-1.jpg` |
| Hero 輪播 2 | `00_品牌與環境/` | `hero-wellness-beauty-2.jpg` |
| Hero 輪播 3 | `00_品牌與環境/` | `hero-wellness-beauty-3.jpg` |
| 醫師團隊橫幅 | `00_品牌與環境/` | `team-banner.png` |
| 社群分享 OG 圖 | `00_品牌與環境/` | `hero-wellness-beauty-1.jpg`（同上） |
| Logo（綠） | `images/` 根目錄 | `logo-green-270_1d09d370.png` |
| 序顏 Hero | `images/` 根目錄 | `xuyan-hero-woman-W5xxi3ZwZHPDzSisn66nV4.webp` |
| 認識序顏區塊 | `images/` 根目錄 | `認識序顏_7d037d9e.png` |

**醫師照（9 位）** — `15_醫師照片/`

建議統一規格（與網站 Manus 版型一致）：

| 項目 | 規格 |
|------|------|
| 尺寸 | **600 × 800 px** |
| 比例 | **3:4**（直式） |
| 格式 | JPEG，品質約 **80%** |
| 檔案大小 | 約 **80–150 KB** |
| 構圖 | 人物**居中**；頭頂留約 **10%** 空白；下緣裁至**胸口** |

**為什麼是 3:4？** 首頁醫師卡片顯示區約 **170×208**（手機）至 **220×256**（桌面），比例接近 3:4。用 3:4 原圖搭配 `object-cover` 裁切時，臉部較不易被切到。

**為什麼是 600×800？** 桌面卡片最大寬 **220px**；Retina 2x 需 **440px** 寬。600px 有安全餘裕，檔案仍適合網頁載入。

**注意：** 同一張照亦用於**醫師內頁全寬橫幅**（會裁左右兩側），請確認臉部與胸口在畫面**正中央**。

| 醫師 | 檔名 |
|------|------|
| 孟祥越 院長 | `1.醫師_孟祥越.jpg` |
| 江得信 醫師 | `2.醫師_江得信.jpg` |
| 林錦生 醫師 | `3.醫師_林錦生.jpg` |
| 李俊豪 醫師 | `4.醫師_李俊豪.jpg` |
| 吳其穎 醫師 | `5.醫師_吳其穎.jpg` |
| 劉佳政 醫師 | `6.醫師_劉佳政.jpg` |
| 陳韜名 醫師 | `7.醫師_陳韜名.jpg` |
| 林漢文 醫師 | `8.醫師_林漢文.jpg` |
| 陳君琳 醫師 | `9.醫師_陳君琳.jpg` |

**院所環境** — `images/` 根目錄（南京）

`DSC00038_7ee1265c.jpg`、`DSC00039_f2040faf.jpg`、`DSC00041_f6d1125f.jpg`、`DSC00050_b560d97e.jpg`、`DSC00057_c86cc3b2.jpg`、`DSC00064_57c149a2.jpg`、`IMG_3818_1799747f.jpg`

**院所環境** — `images/` 根目錄（北大）

`北大環境照-1_a633ce7a.jpg`、`北大環境照-2_6a5082db.jpg`、`S__146128939_0_910da6cb.jpg`、`北大環境照-4_beaf658a.jpg`、`北大環境照-5_ca96d86d.jpg`、`北大環境照-6_cff0468b.jpg`、`北大環境照-7_f0797dd9.jpg`

---

### P1 — 首頁精選與案例封面

| 網站位置 | 資料夾 | 檔名 |
|----------|--------|------|
| 膠原 Banner | `01_橫幅Banner/` | `banner-collagen.jpeg` |
| 猛健樂 Banner | `01_橫幅Banner/` | `banner-mounjaro.jpeg` |
| 皮秒精選 | `02_雷射電音波/` | `755蜂巢2.jpg` |
| 海芙精選 | `02_雷射電音波/` | `海芙音波2.jpg` |
| 案例區 Banner | `08_案例Banner/` | `case-banner-beauty.jpeg` |

首頁案例卡片縮圖（若只換封面、不改詳情相簿）：

| 案例 | 資料夾 | 檔名 |
|------|--------|------|
| 男生水飛梭 | `06_型男醫美/` | `case-hydrafacial-male.jpeg` |
| 男仕眼袋 | `04_整型外科/` | `case-eyebag-male-ba.jpeg` |
| 雙眼皮 | `04_整型外科/` | `case-double-eyelid-ba.jpeg` |
| 艾麗斯 | `03_微整注射/` | `case-aesthefill.jpeg` |
| Talent-A 腹肌 | `05_形體雕塑/` | `case-talent-a-abs.jpeg` |
| Talent-A 翹臀 | `05_形體雕塑/` | `case-talent-a-hip.jpeg` |

---

### P2 — 其餘療程縮圖

療程列表共 **60+ 項**，完整「療程名稱 → 資料夾 → 檔名」對照見：

- **`treatment-image-audit.csv`**（專案根目錄）
- 或依分類資料夾直接對檔名（檔名通常與療程名相同或簡化）

| 資料夾 | 內容 |
|--------|------|
| `02_雷射電音波/` | 索夫波、Z 音波、LED 等 |
| `03_微整注射/` | 肉毒、玻尿酸、艾麗斯、洢蓮絲… |
| `04_整型外科/` | 雙眼皮、隆鼻、隆乳、抽脂… |
| `05_形體雕塑/` | 週纖達、猛健樂、Talent-A、ICOONE… |
| `06_型男醫美/` | 男性除毛、微整、痘疤、生髮… |
| `07_肌膚管理/` | 麗珠蘭、水飛梭、醫學 SPA… |
| `09_再生醫學/` ~ `14_預防保健/` | 各子類療程縮圖 |

**覆蓋原檔名即可**，無需逐項改程式。

---

## 四、案例詳情相簿（15 則）

每則案例一個資料夾：`images/cases/{slug}/`  
**第一張為封面**（多數為 `cover.jpg` 或 `cover.png`），其餘為相簿。

| slug（資料夾名） | 案例標題 | 相簿檔名 |
|------------------|----------|----------|
| `hydrafacial-male` | 男生水飛梭＋水光 | `cover.jpg` |
| `eyebag-male` | 男仕眼袋外開 | `cover.jpg` |
| `double-eyelid` | 單眼皮→自然雙眼皮 | `cover.jpg` |
| `aesthefill` | AestheFill 艾麗斯 | `cover.jpg` ~ `11.jpg` |
| `talent-a-abs` | Talent-A 腹肌 | `cover.jpg` ~ `07.jpg` |
| `talent-a-hip` | Talent-A 翹臀 | `cover.jpg` ~ `08.jpg` |
| `talent-a-arm` | Talent-A 手臂 | `cover.jpg` ~ `06.jpg` |
| `talent-a-abs-kol` | Talent-A 馬甲肌 KOL | `cover.jpg` ~ `10.jpg` |
| `talent-a-belly` | Talent-A 小腹 | `cover.jpg` ~ `08.jpg` |
| `v-face-queen` | 安室 V 臉女王 | `cover.jpg` |
| `picosure-case` | 755 皮秒案例 | `cover.jpg` ~ `08.jpg`（含 `06.png`） |
| `ha-tear-trough` | 玻尿酸淚溝 | `cover.jpg` ~ `11.jpg`（含 `02.png`） |
| `rosacea-gut` | 玫瑰痘與腸道 | `cover.png`, `02.png`, `03.jpg` |
| `sensitive-skin-inflammation` | 敏感肌慢性發炎 | `cover.jpg` ~ `04.jpg` |
| `menopause-hormone` | 更年期暗沈鬆弛 | `cover.jpg` ~ `03.jpg` |
| `fatigue-face-stress` | 疲勞臉與壓力下垂 | `cover.jpg` ~ `03.jpg` |

換案例相簿時：**維持檔名與張數**最省事。若增刪照片，需同步更新 `client/src/lib/caseImageAssets.ts`。

---

## 五、序顏測驗區（選填）

檔案在 `images/` 根目錄，網站路徑為 `/images/_root/…`

| 用途 | 檔名 |
|------|------|
| 4 種臉型示意 | `sagging_3891c1e1.png`、`hollow-alt_33d0a0ce.png`、`hollow_3c4d191f.png`、`fatigue_c71f0311.png` |
| 流程短影片 | `序顏Ai檢測_a9a7e486.mp4`、`介紹序顏如何幫助你的流程影片_f3b7f377.mp4` |
| 臉型說明影片 | `CHRONICSAGGINGTYPE_df4163a2.mp4`、`COLLAGENLOSSTYPE_2dc5a8bd.mp4`、`SKINCONDITIONDRAGGINGTYPE_06486c7d.mp4`、`OVERALLFATIGUETYPE_8a51858b.mp4` |

---

## 六、換圖流程

### 客戶端

1. 依 P0 → P1 → P2 準備檔案  
2. 確認檔名與授權  
3. 交付壓縮包＋變更說明  

### 開發端

1. 將檔案放入對應 `images/` 路徑（**覆蓋原檔**或依對照表改名）  
2. 執行 `pnpm dev`，檢查首頁、療程列表、案例詳情  
3. 若改檔名或增刪案例相簿 → 更新 `imageAssets.ts` / `caseImageAssets.ts`  
4. `git commit` → push → GitHub Pages 自動更新  

---

## 七、客戶簽核表（可複製使用）

```
批次：□ P0  □ P1  □ P2  □ 案例相簿  □ 其他：________

已交付檔案數：____
沿用原檔名覆蓋：□ 是  □ 否（附對照表）

患者／肖像授權已確認：□ 是
需馬賽克處已標註：□ 是  □ 不適用

客戶確認人：________  日期：________
```

---

## 八、相關檔案

| 檔案 | 用途 |
|------|------|
| `treatment-image-audit.csv` | 76 項療程圖片對照 |
| `case-missing-images.csv` | 案例補圖紀錄 |
| `treatment-missing-images.csv` | 曾用替代圖的療程 |
| `image_urls_reference.txt` | 舊 CDN 對照（歷史參考） |
| `client/src/lib/imageAssets.ts` | 程式中的圖片映射 |
| `client/src/lib/caseImageAssets.ts` | 案例相簿映射 |
