# Services 詳情頁對應 — 待處理清單

> 盤點日期：2026-05-30
> 對應鏈：卡片名稱（`constants.ts`）→ slug 對照（`treatmentSlugMap.ts`）→ 詳情頁（`treatmentDetails.ts`）
> 卡片有 slug 才顯示「了解更多」連到詳情頁；沒有則顯示「預約諮詢」走 LINE。

圖例：✅ 專屬頁　🔁 共用同分類頁　⚠️ 借用其他分類頁（內容易誤導）　❌ 無頁面

---

## P1 — 內容明顯不符，優先修正（點進去會誤導）

| 卡片（分類） | 現在指向 | 問題 | 建議 |
|---|---|---|---|
| 功能醫學檢測 — 6 項全部（基因檢測、3DMRA、腦波、腸道菌叢、HRV、PTG） | `nad-plus-drip`（點滴養生） | 檢測項目卻連到點滴頁 | 補 1 個「功能醫學檢測」總覽詳情頁，6 項共用 |
| ~~快樂門診（卡片本體）~~ | ~~`nad-plus-drip`~~ → **`happy-clinic`** | ✅ 已修正 | 檢測類 4 項仍指各檢測 stub 頁 |
| AI 光譜治療（肌膚管理） | `nad-plus-drip`（點滴養生） | 光療卻連到點滴頁 | 改指肌膚相關頁，或補專屬 |
| ~~VivaBella 薇貝拉（微整注射）~~ | ~~`feminine-laser`~~ → **`collagen-regeneration`** | ✅ 已修正 | — |

## P2 — 健保頁接線（頁面已存在，補對照表即可，快速）

| 卡片 | 已存在的詳情頁 | 動作 |
|---|---|---|
| 健保皮膚科 | `nhi-dermatology` | 在 slug 對照表加 `"健保皮膚科": "nhi-dermatology"` |
| 疼痛科 | `pain-management` | 在 slug 對照表加 `"疼痛科": "pain-management"` |

> 註：NHI 卡片的 `item.name` 是「健保皮膚科 / 疼痛科」，目前對照表沒這兩個 key，所以走 LINE。

## P3 — 主題相近的借用（可接受，或日後補專屬）

| 卡片（分類） | 現在指向（分類） | 主題相近度 |
|---|---|---|
| Rejuran 麗珠蘭（肌膚管理） | `hyaluronic-acid`（微整注射） | 中 |
| 膠原膜（肌膚管理） | `collagen-regeneration`（微整注射） | 中 |
| 安瓶導入 / O2 to Derm（肌膚管理） | `hydrafacial`（肌膚管理） | 高（同分類）🔁 |
| ICOONE（形體雕塑） | `hydrafacial`（肌膚管理） | 低 |
| 男性痘疤（型男） | `acne-scar-laser`（痘痘管理） | 高 |
| 男性生髮（型男） | `prp-hair`（頭皮養護） | 高 |
| 男性體雕（型男） | `wegovy`（形體雕塑） | 中 |
| BELKYRA 倍克脂（微整） | `wegovy`（形體雕塑） | 中（消脂） |
| Volite 長效保濕針（微整） | `water-glow`（肌膚管理） | 高（保濕） |
| 腋下止汗（微整） | `diode-laser-hair`（除毛美白） | 低 |
| 氦氖雷射 ILIB / 營養配方（營養醫學） | `immunity-drip`（點滴養生） | 中 |
| 點滴針劑（營養醫學） | `nad-plus-drip`（點滴養生） | 中 |

## P4 — 無詳情頁（目前走 LINE）

| 卡片 | 動作建議 |
|---|---|
| 索夫波（雷射電音波） | 補專屬頁，或維持走 LINE |

## P5 — 孤兒詳情頁（已寫好但無卡片連入，多為舊官網遺留）

`ultrasound-lifting`、`whitening-drip`、`teeth-whitening`、`porcelain-veneer`、`exosome`、`acne-treatment`、`anti-aging-combo`

> 動作：確認是否還要保留；可作為上述待補項目的內容素材，或清理。

---

## 可立即執行 vs 需客戶內容

- **可立即做（不需新內容）**：P2 健保接線、P1 的「改指向」修正（把錯誤對應改到較合適的現有頁）。
- **需客戶／文案內容**：P1 補「功能醫學檢測」「快樂門診」總覽頁、P4 索夫波、各項專屬頁。
