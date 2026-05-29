# 療程圖片資料夾重構規劃（審核用）

> **狀態：僅規劃，尚未執行。**  
> 審核通過後再執行搬檔 + 改程式 + 更新文件。

---

## 一、目標結構

在 `images/services/` 下依「健保 / 自費」分層，**每個 Services Tab 一個獨立資料夾**（與 `constants.ts` 的 `id` 一致）。

```
images/services/
├── zifei/                          # 自費（17 類）
│   ├── laser/                      # 雷射電音波
│   ├── injection/                  # 微整注射
│   ├── surgery-eye/                # 整型外科｜眼部
│   ├── surgery-nose/               # 整型外科｜鼻部
│   ├── surgery-breast/             # 整型外科｜胸型身形
│   ├── surgery-lipo/               # 整型外科｜抽脂與拉皮
│   ├── body/                       # 形體雕塑
│   ├── feminine/                   # 女性私密美學
│   ├── men/                        # 型男醫美專區
│   ├── regen/                      # 再生醫學
│   ├── hair/                       # 生髮門診
│   ├── nutrition/                  # 營養醫學
│   ├── functional/                 # 功能醫學檢測
│   ├── happy/                      # 快樂門診
│   ├── vaccine/                    # 自費疫苗
│   ├── skin/                       # 肌膚管理
│   └── spa/                        # 醫SPA
└── jianbao/                        # 健保（2 類）
    ├── nhi-skin/                   # 健保皮膚科（新建，待補圖）
    └── nhi-pain/                   # 疼痛科（新建，待補圖）
```

### 資料夾命名說明

| 路徑段 | 說明 |
|--------|------|
| `services/` | 僅放「健康美麗管理入口」療程列表用圖 |
| `zifei/` | 自費（拼音，避免中文路徑在部分環境出問題） |
| `jianbao/` | 健保 |
| 子資料夾名 | 與程式 `SERVICE_CATEGORIES[].id` / `NHI_SERVICES[].id` **完全相同** |

每個分類資料夾內建議檔案：

| 檔名 | 用途 | 必填 |
|------|------|------|
| `cover.jpg`（或 `.jpeg`） | 分類代表圖（未來可顯示在分類標題） | 選填 |
| `{療程檔名}.jpg` | 各療程卡片主圖 | 依療程數量 |
| `README.txt` | 給客戶/內部備註此類有哪些療程 | 選填 |

---

## 二、與現況對照（19 Tab → 新資料夾）

| # | Tab 名稱 | `id` | 新資料夾 | 現有來源資料夾 |
|---|----------|------|----------|----------------|
| 1 | 雷射電音波 | `laser` | `zifei/laser/` | `02_雷射電音波/`（整包移入） |
| 2 | 微整注射 | `injection` | `zifei/injection/` | `03_微整注射/`（整包移入） |
| 3 | 整型外科｜眼部 | `surgery-eye` | `zifei/surgery-eye/` | 自 `04_整型外科/` **拆出** 3 個檔 |
| 4 | 整型外科｜鼻部 | `surgery-nose` | `zifei/surgery-nose/` | 自 `04_` 拆出 4 個檔 |
| 5 | 整型外科｜胸型身形 | `surgery-breast` | `zifei/surgery-breast/` | 自 `04_` 拆出 5 個檔 |
| 6 | 整型外科｜抽脂與拉皮 | `surgery-lipo` | `zifei/surgery-lipo/` | 自 `04_` 拆出 3 個檔 |
| 7 | 形體雕塑 | `body` | `zifei/body/` | `05_形體雕塑/` + 分類 cover 來自 `01_橫幅Banner/banner-mounjaro.jpeg` |
| 8 | 女性私密美學 | `feminine` | `zifei/feminine/` | 自 `04_` 拆出 `私密處雷射.jpg` |
| 9 | 型男醫美專區 | `men` | `zifei/men/` | `06_型男醫美/`（整包移入） |
| 10 | 再生醫學 | `regen` | `zifei/regen/` | `09_再生醫學/` |
| 11 | 生髮門診 | `hair` | `zifei/hair/` | `10_生髮門診/` |
| 12 | 營養醫學 | `nutrition` | `zifei/nutrition/` | `11_營養醫學/` |
| 13 | 功能醫學檢測 | `functional` | `zifei/functional/` | `12_功能醫學檢測/` |
| 14 | 快樂門診 | `happy` | `zifei/happy/` | `13_快樂門診/` + **自 `12_` 複製** 4 個檢測圖 |
| 15 | 自費疫苗 | `vaccine` | `zifei/vaccine/` | `14_預防保健/` |
| 16 | 肌膚管理 | `skin` | `zifei/skin/` | 自 `07_肌膚管理/` 拆出 7 個檔（不含 SPA） |
| 17 | 醫SPA | `spa` | `zifei/spa/` | 自 `07_` 拆出 `醫學美容SPA.jpg` |
| 18 | 健保皮膚科 | `nhi-skin` | `jianbao/nhi-skin/` | **新建**（目前無圖） |
| 19 | 疼痛科 | `nhi-pain` | `jianbao/nhi-pain/` | **新建**（目前無圖） |

---

## 三、檔案搬移明細（自費）

### 3.1 整包搬移（7 類）

| 新資料夾 | 來源 | 檔案數 |
|----------|------|--------|
| `zifei/laser/` | `02_雷射電音波/*` | 7 |
| `zifei/injection/` | `03_微整注射/*` | 13 |
| `zifei/men/` | `06_型男醫美/*` | 6 |
| `zifei/body/` | `05_形體雕塑/*` | 8 |
| `zifei/regen/` | `09_再生醫學/*` | 2 |
| `zifei/hair/` | `10_生髮門診/*` | 3 |
| `zifei/nutrition/` | `11_營養醫學/*` | 3 |
| `zifei/functional/` | `12_功能醫學檢測/*` | 6 |
| `zifei/vaccine/` | `14_預防保健/*` | 1 |

### 3.2 自 `04_整型外科/` 拆到 5 類

| 新資料夾 | 檔案 |
|----------|------|
| `surgery-eye/` | `case-double-eyelid-ba.jpeg`（雙眼皮）, `開眼頭開眼尾.jpg`, `case-eyebag-male-ba.jpeg`（眼袋） |
| `surgery-nose/` | `韓式隆鼻手術.jpg`, `卡麥拉隆鼻手術.jpg`, `縮鼻翼手術.jpg`, `縮鼻頭手術.jpg` |
| `surgery-breast/` | `果凍矽膠隆乳.jpg`, `自體脂肪隆乳手術.jpg`, `提胸手術.jpg`, `乳暈手術.jpg`, `平胸手術.jpg` |
| `surgery-lipo/` | `抽脂手術.jpg`, `自體脂肪移植手術.jpg`, `無痕拉皮手術.jpg` |
| `feminine/` | `私密處雷射.jpg` |

> `04_` 搬完後若為空可刪除；**首頁案例圖**若仍引用 `04_` 的 `case-*.jpeg`，需保留或改指向（見第五節）。

### 3.3 自 `07_肌膚管理/` 拆到 2 類

| 新資料夾 | 檔案 |
|----------|------|
| `skin/` | `Rejuran麗珠蘭.jpg`, `超級玻尿酸鎖水保濕面膜.jpg`, `膠原膜.jpg`, `安瓶導入.jpg`, `AI光譜治療.jpg`, `O2toDerm氧氣面罩.jpg`, `case-hydrafacial-waterlight.jpeg`（水光案例圖，療程卡也用） |
| `spa/` | `醫學美容SPA.jpg` |

### 3.4 `happy/` 需複製 functional 檢測圖

`快樂門診` 在程式中有 6 個療程，其中 4 個與 `functional` 共用同一檔案：

| 療程名稱 | 檔案（複製到 `happy/`） |
|----------|-------------------------|
| 快樂門診 | `快樂門診.jpg`（來自 `13_`） |
| 音樂治療 | `音樂治療.jpg`（來自 `13_`） |
| 3DMRA 檢測 | 自 `12_` → `3DMRA檢測.jpg` |
| 腦波檢測 | 自 `12_` → `腦波檢測.jpg` |
| HRV 自律神經分析 | 自 `12_` → `HRV自律神經分析.jpg` |
| PTG 血管分析 | 自 `12_` → `PTG血管分析.jpg` |

### 3.5 建議的分類代表圖 `cover.*`（選填）

| 資料夾 | 建議 cover 來源 |
|--------|-----------------|
| `laser/` | `755蜂巢2.jpg` |
| `surgery-eye/` | `case-eyebag-male-ba.jpeg` |
| `body/` | 自 `01_橫幅Banner/banner-mounjaro.jpeg` 複製為 `cover.jpeg` |
| `men/` | `case-hydrafacial-male.jpeg` |
| `regen/` | 可自 `00_品牌與環境/luxury-abstract.webp` 複製（或暫不設） |
| `skin/` | `treatment-ampule.jpeg` 自 `03_` 複製作預設圖 |

---

## 四、健保（2 類）— 新建空資料夾

目前網站**沒有**健保療程卡片圖，執行後：

```
jianbao/nhi-skin/
  └── .gitkeep          # 或 README：待補「健保皮膚科」代表圖
jianbao/nhi-pain/
  └── .gitkeep
```

審核時可決定是否一併提供 1～2 張示意圖；程式可預留 `cover.jpg` 與未來 `items[].image`。

---

## 五、**不搬**進 `services/` 的資產（維持原 `00_`～`17_`）

以下仍使用現有編號資料夾，**本次不重構**（避免影響首頁 Hero、案例、醫師、環境）：

| 用途 | 維持路徑 |
|------|----------|
| 首頁 Hero / 品牌 | `00_品牌與環境/` |
| Banner | `01_橫幅Banner/` |
| 首頁案例區（部分） | `04_`、`06_`、`07_` 的 `case-*.jpeg` |
| 案例 Banner | `08_案例Banner/` |
| 醫師照 | `15_醫師照片/` |
| 院所環境 | `16_`、`17_/` |
| 序顏 / Logo 等 | `images/` 根目錄 → `_root/` |

> **注意：** 若 `04_整型外科/` 整包刪除，需確認 `IMAGES.caseEyebag`、`caseDoubleEyelid` 等仍指向有效路徑（可改為 `services/zifei/surgery-eye/...` 或保留 `04_` 僅留案例用檔）。

---

## 六、程式修改範圍（執行階段）

### 6.1 必改

| 檔案 | 變更 |
|------|------|
| `client/src/lib/imageAssets.ts` | 新增 `services/zifei/{id}` 路徑；`TREATMENT_IMG` 改為依分類 id 組路徑；保留舊 `F` 給非 services 資產 |
| `vite.config.ts` | `vitePluginSyncTreatmentImages` 增加同步 `images/services/` |
| `client/src/lib/constants.ts` | 自費/健保 `items[].image` 改指向新路徑（或透過 `treatmentImg` 自動解析） |
| `docs/image-replacement-guide.md` | P2 療程區改寫為 `services/zifei|jianbao/{id}/` |

### 6.2 建議一併改

| 檔案 | 變更 |
|------|------|
| `scripts/download-all-treatment-images.mjs` | 下載目標改 `services/...` |
| `scripts/download-treatment-fallbacks.mjs` | 同上 |
| `scripts/cleanup-images-root.mjs` | 排除 `services/` |
| `treatment-image-audit-unique.csv` | 更新「資料夾」欄位（或產生新 CSV） |

### 6.3 可選（健保有圖後）

| 檔案 | 變更 |
|------|------|
| `client/src/lib/constants.ts` | `NHI_SERVICES` 改為真實 `items` + `image` |
| `client/src/components/ServicesSection.tsx` | 健保卡片顯示圖片 |

### 6.4 建議的程式 API（草案）

```typescript
// imageAssets.ts（執行時實作）
export const SERVICE_ROOT = {
  zifei: "services/zifei",
  jianbao: "services/jianbao",
} as const;

export type ServiceCategoryId = typeof ALL_CATEGORY_IDS[number];

export function serviceCategoryFolder(id: ServiceCategoryId): string {
  return id.startsWith("nhi-")
    ? `${SERVICE_ROOT.jianbao}/${id}`
    : `${SERVICE_ROOT.zifei}/${id}`;
}

export function serviceImg(categoryId: ServiceCategoryId, filename: string): string {
  return img(serviceCategoryFolder(categoryId), filename);
}

// TREATMENT_IMG 每筆改為：serviceImg("laser", "索夫波.jpg") 等
```

並提供 `TREATMENT_CATEGORY: Record<string, ServiceCategoryId>` 對應療程名 → 分類 id，避免重複寫 id。

---

## 七、執行步驟（審核通過後）

1. **建立** `images/services/zifei/{17個id}/` 與 `images/services/jianbao/{2個id}/`
2. **搬檔 / 複製**（依第三節表格；建議用腳本 `scripts/migrate-services-images.mjs` 可重複執行）
3. **改程式**（第六節）
4. **`pnpm dev` 驗證** 首頁 → SERVICES → 逐類點開，確認圖片不 404
5. **更新** `docs/image-replacement-guide.md`
6. **舊資料夾處理**（二選一，需你決定）：
   - **A. 保守：** 保留 `02_`～`14_` 僅給案例/IMAGES 用，services 用新路徑（短期雙份佔空間）
   - **B. 精簡：** 案例圖改指向 `services/` 或 `08_`/`cases/` 後，**刪除**空的 `02_`～`14_`

---

## 八、搬移後檔案數量核對

| 區塊 | 資料夾數 | 預估檔案數（含重複複製） |
|------|----------|-------------------------|
| 自費 | 17 | 約 65～70（happy 含 4 個自 functional 複製） |
| 健保 | 2 | 0（待補） |
| **合計** | **19** | 與 19 個 Tab 一一對應 |

---

## 九、審核 checklist（請勾選）

- [ ] 同意路徑使用 `services/zifei/`、`services/jianbao/`（而非中文資料夾名）
- [ ] 同意子資料夾用程式 `id`（如 `surgery-eye`，非中文名）
- [ ] 同意 `04_整型外科` 拆成 5 個自費子資料夾
- [ ] 同意 `07_肌膚管理` 拆成 `skin` + `spa`
- [ ] 同意 `happy/` 自 `12_` 複製 4 張檢測圖（與 functional 各有一份）
- [ ] 健保兩類先建空資料夾，圖片稍後補
- [ ] 舊 `02_`～`14_` 採用 **A 保留** 或 **B 刪除**（請註明）
- [ ] 審核通過，可請工程執行搬檔與改程式

---

## 十、審核後回覆範例

可直接回覆：

> 通過。舊資料夾選 A / 選 B。健保暫不補圖。

或提出調整（例如資料夾要中文名、id 要改名等）。
