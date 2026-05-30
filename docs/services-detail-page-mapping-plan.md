# Services 詳情頁對應 — 狀態總覽

> **最後更新：** 2026-05-30  
> **對應鏈：** 卡片名稱（`constants.ts`）→ slug（`treatmentSlugMap.ts`）→ 詳情頁（`treatmentDetails.ts`）  
> **按鈕規則：** 有 slug 對照 →「了解更多」；無對照 →「預約諮詢」（LINE）

圖例：✅ 已完成　🔁 多卡共用同一詳情　📝 有頁但內容 stub　❌ 無詳情頁（走 LINE）　👻 孤兒頁（無服務卡片）

---

## 總覽（2026-05-30 掃描）

| 項目 | 數量 |
|------|------|
| 服務卡片（含健保 2） | 90 |
| 有「了解更多」連結 | **90** |
| 走 LINE（無 slug） | **0** |
| 多張卡片共用同一 slug | 7 組 |
| 孤兒詳情頁（無服務卡片） | 14 |
| 有連結但詳情為 stub（內容待補） | 29 |

---

## 已結案項目

### 接線誤導（原 P1）— 皆已修正

| 項目 | 現況 |
|------|------|
| 功能醫學 6 項檢測 | 各指向獨立頁 `gene-testing` 等；總覽 `functional-medicine` 保留、無卡片 |
| 快樂門診 | `happy-clinic`（完整內容） |
| AI 光譜治療 | `ai-spectrum`（📝 stub） |
| VivaBella 薇貝拉 | `collagen-regeneration`（與 Sculptra 共用） |

### 健保接線（原 P2）— ✅

| 卡片 | slug | 路徑 |
|------|------|------|
| 健保皮膚科 | `nhi-dermatology` | `/treatment/nhi-dermatology` |
| 疼痛科 | `pain-management` | `/treatment/pain-management` |

### 無詳情頁（原 P4）— ✅

| 卡片 | slug |
|------|------|
| 索夫波 | `sofwave` |

---

## P3 — 多卡共用同一詳情（🔁）

| slug | 中文標題 | 共用卡片 |
|------|----------|----------|
| `collagen-regeneration` | 膠原蛋白再生療程 | VivaBella 薇貝拉、Sculptra 舒顏萃 |
| `water-glow` | 水光注射 | Volite 長效保濕針、水光注射 |
| `wegovy` | Wegovy 週纖達 | BELKYRA 倍克脂、Wegovy 週纖達、減肥筆、消脂針/消脂點滴 |
| `thermage-flx` | 海芙電波 | 海芙電波、電波緊緻（對照表遺留 key） |
| `hyaluronic-acid` | 玻尿酸微整注射 | 玻尿酸填充、填平淚溝、豐提蘋果肌、豐夫妻宮、豐額（無對應卡片者為舊 key） |
| `3dmra-scan` | 3DMRA 檢測 | 功能醫學・3DMRA、快樂門診・3DMRA（同名卡片） |
| `brainwave-detection` | 腦波檢測 | 功能醫學・腦波、快樂門診・腦波 |
| `hrv-analysis` | HRV 自律神經分析 | 功能醫學・HRV、快樂門診・HRV |
| `ptg-vascular` | PTG 血管分析 | 功能醫學・PTG、快樂門診・PTG |

### 跨類／主題借用（可接受或日後拆專屬頁）

| 卡片 | 指向 slug | 備註 |
|------|-----------|------|
| 腋下止汗（微整） | `diode-laser-hair` | 除毛類頁面，主題略遠 |

> **已不再是 P3 狀況（勿再寫舊表）：** Rejuran→`rejuran`、膠原膜→`collagen-mask`、ICOONE→`icoone`、男性痘疤→`men-acne-scar`、男性生髮→`men-hair-restoration`、男性體雕→`men-body-sculpting`、點滴針劑→`nutrition-iv-drip`（皆非借用他類舊頁）。

---

## P5 — 孤兒詳情頁（👻 無服務卡片連入）

**定義：** 服務列表沒有任何卡片名稱對到該 slug。頁面仍可經 Footer、書籤、SEO 直接開啟。

| slug | 中文標題 | 詳情分類 | 其他入口 |
|------|----------|----------|----------|
| `anti-aging-combo` | 全方位抗老回春方案 | 抗老回春 | — |
| `acne-treatment` | 專業痘痘治療 | 痘痘管理 | — |
| `acne-scar-laser` | 痘疤雷射治療 | 痘痘管理 | 可考慮接「痘痘管理」分類卡片 |
| `exosome` | 外泌體療程 | 再生醫學 | — |
| `prp-face` | PRP 自體血小板面部回春 | 再生醫學 | — |
| `functional-medicine` | 功能醫學與精準檢測 | 功能醫學與精準檢測 | 總覽頁；6 項檢測已有獨立卡片 |
| `immunity-drip` | 免疫力提升點滴 | 點滴養生 | — |
| `nad-plus-drip` | NAD+ 抗老回春點滴 | 點滴養生 | — |
| `whitening-drip` | 美白點滴 | 除毛美白 | — |
| `prp-hair` | PRP 生髮療程 | 頭皮養護 | 可考慮接生髮相關卡片 |
| `scalp-care` | 頭皮深層養護 | 頭皮養護 | — |
| `teeth-whitening` | 冷光美白 | 牙齒美學 | — |
| `porcelain-veneer` | 陶瓷貼片 | 牙齒美學 | — |
| `ultrasound-lifting` | 音波拉提 | 微整注射 | **Footer**；對照表有 `"音波拉提"` 但服務區無此卡片名 |

**建議：** 接線到相近卡片、新增卡片、或確認無流量後 301／下架。

---

## P6 — 有連結但內容 stub（📝 待補文案）

卡片已顯示「了解更多」，點進去主體為「（內容待補）」。

### 雷射電音波（1）

| 卡片 | slug |
|------|------|
| 清新微波 | `microwave-sweat` |

### 女性私密美學（8）

薇薇電波、陰道緊緻手術、小陰唇美型手術、陰蒂拉提手術、陰道洞口重建手術、G點注射、女性除毛、HPV子宮頸癌疫苗 → 對應 `viveve`、`vaginal-tightening`、`labiaplasty`、`clitoral-lift`、`vaginal-opening-reconstruction`、`g-spot-injection`、`feminine-hair-removal`、`hpv-vaccine`

### 型男醫美（3）

男性痘疤、男性生髮、男性體雕 → `men-acne-scar`、`men-hair-restoration`、`men-body-sculpting`

### 肌膚管理（11）

Rejuran 麗珠蘭、超級玻尿酸鎖水保濕面膜、膠原膜、法國多酚精萃晶膜、安瓶導入、AI 光譜治療、AI 智慧皮膚檢測儀、O2 to Derm 氧氣面罩、無針水光、肌光潔顏蜜、高濃度杏仁酸 → 各同名 slug（`rejuran`、`ai-spectrum` 等）

### 再生醫學（2）

增生療法、IHT（PRP）注射療法 → `prolotherapy`、`iht-prp`

### 生髮門診（2）

不動刀育髮、頭皮檢測 → `non-surgical-hair`、`scalp-detection`

### 輔助醫學療法（3）

氦氖雷射 ILIB、點滴針劑、音樂治療 → `ilib-laser`、`nutrition-iv-drip`、`music-therapy`

> **功能醫學 6 項、快樂門診本體：** 已有完整內容頁（非 stub）。

---

## 待辦優先級（建議）

| 優先 | 項目 |
|------|------|
| P6 | 29 個 stub 頁補客戶／舊官網文案 |
| P5 | 14 個孤兒頁：接線、併入或下架 |
| P3 | 評估 `wegovy` 四卡共用、`腋下止汗` 是否拆專屬頁 |
| 低 | `functional-medicine` 是否在服務區加「總覽」入口 |

---

## 維護說明

重新掃描（孤兒／stub／共用）可於專案根目錄執行：

```bash
# 需依 treatmentSlugMap + constants + treatmentDetails 比對；或請 agent 更新本文件
```

相關程式路徑：`client/src/lib/constants.ts`、`treatmentSlugMap.ts`、`treatmentDetails.ts`、`ServicesSection.tsx`。
