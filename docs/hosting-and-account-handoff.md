# 網站託管與帳號分工說明

本文件說明 **蘋果樹官網（apple-tree-clinic-v2）** 在 AB 測試、正式上線與長期維護階段，**貴公司（客戶）** 與 **維護顧問（CindyFlower）** 各自的責任。  
貴公司**不需要使用 GitHub**；改版與上線由顧問代為處理，主機與網域帳單在貴公司 Cloudflare 帳號。

---

## 一、給客戶：一頁摘要（可轉交內部或非技術同仁）

### 我們怎麼分工？

| 項目 | 貴公司 | 維護顧問 |
|------|--------|----------|
| 網站主機與帳單 | **Cloudflare**（貴公司帳號付費） | — |
| 正式網域 `www.drappletree.com.tw` | 貴公司擁有，在 Cloudflare 管理 DNS | 協助設定（AB 通過後） |
| 訪客數據（Cloudflare 後台） | 貴公司登入查看 | 協助開啟 Web Analytics |
| 網站內容改版、程式、上線 | — | 顧問代為處理 |
| 原始碼存放 | — | 顧問 GitHub（貴公司無需操作） |

一句話：**網站在顧問這邊改版與發布，對外網站與帳單在貴公司 Cloudflare。**

### 貴公司需要會做的事（很少）

1. **登入 Cloudflare**  
   - 網址：https://dash.cloudflare.com/  
   - 可查看：網站是否上線、部署紀錄、之後的 **Web Analytics（訪客數）**、帳單。

2. **提供或保留 API 連線（僅設定一次，由顧問代填技術端）**  
   - 在 Cloudflare 建立 **API Token**（僅允許網站部署，非整組帳號密碼）。  
   - 提供 **Account ID** 給顧問，用於自動上線。  
   - 詳細按鈕位置見本文件「附錄 A」或交給 IT 同仁一次設定即可。

3. **AB 測試階段**  
   - 預覽網址為 `*.pages.dev`（例如 `apple-tree-clinic-v2.pages.dev`）。  
   - **此時請勿**把 `www.drappletree.com.tw` 改指向新站，避免影響現有官網流量。

4. **AB 通過、決定正式上線時**  
   - 由貴公司在 Cloudflare 授權綁定正式網域（或授權顧問代設）。  
   - 之後訪客以 `https://www.drappletree.com.tw` 為準。

### 貴公司不需要做的事

- 不需要 GitHub 帳號、不需要看程式碼。  
- 不需要自行按「部署」；改版完成後由顧問發布。  
- 不需要使用 Cloudflare 的「Global API Key」或已淘汰的 Origin CA Key。

### 常見問題

**Q：帳單誰付？**  
A：Cloudflare 訂閱與流量相關費用由**貴公司帳號**支付。

**Q：訪客數在哪裡看？**  
A：Cloudflare 後台 → **Analytics & logs** → **Web Analytics**（需先由顧問或 IT 在網站加上追蹤碼並發布一次）。

**Q：若不再續約維護，網站會怎樣？**  
A：依合約約定（見下方「合約與退場」）。至少貴公司仍保有 Cloudflare 上的網站與網域；顧問端可停止自動更新，並移交說明文件或原始碼。

**Q：資料與程式碼算誰的？**  
A：對外服務與網域屬貴公司；原始碼著作權／買斷以**雙方合約**為準（建議書面約定）。

---

## 二、給顧問：三階段操作清單

### 階段 1 — AB 預覽（現在）

**目標：** 客戶付費的 Cloudflare 上跑預覽站，不動正式 DNS。

| # | 動作 | 負責 | 狀態欄 |
|---|------|------|--------|
| 1 | 客戶 Cloudflare 建立 Pages 專案（建議名 `apple-tree-clinic-v2`） | 客戶／顧問代設 | ☐ |
| 2 | 客戶帳號建立 API Token（Pages Edit + Account Settings Read） | 客戶／顧問代設 | ☐ |
| 3 | 顧問 GitHub repo `cindyflower/apple-tree-clinic-v2` 設定 Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID` | 顧問 | ☐ |
| 4 | **勿**在 Pages 使用「Connect Git」；只用 **Actions → Deploy Cloudflare Pages** | 顧問 | ☐ |
| 5 | 確認預覽 URL（`*.pages.dev`），必要時設 Variable `CLOUDFLARE_SITE_URL` | 顧問 | ☐ |
| 6 | 交付客戶：預覽連結 + 本文件「一、給客戶」章節 | 顧問 | ☐ |
| 7 | 正式網域 **不綁定**、DNS **不變** | 雙方 | ☐ |

技術細節：[cloudflare-pages.md](./cloudflare-pages.md)

### 階段 2 — 正式上線（AB 通過後）

| # | 動作 | 負責 |
|---|------|------|
| 1 | 客戶 Cloudflare Pages → Custom domains → `www.drappletree.com.tw` | 客戶授權／顧問代設 |
| 2 | DNS 指向 Cloudflare Pages（依 Cloudflare 指示） | 客戶 DNS／顧問協助 |
| 3 | GitHub Variable `CLOUDFLARE_SITE_URL` → `https://www.drappletree.com.tw` | 顧問 |
| 4 | 執行 **Deploy Cloudflare Pages**，檢查 sitemap／canonical | 顧問 |
| 5 | 客戶 Cloudflare 開啟 **Web Analytics**，顧問將 beacon 加入網站後再 deploy | 顧問 |
| 6 | 書面通知客戶：正式網址已切換、後台可看流量 | 顧問 |

網址與 SEO：[site-urls.md](./site-urls.md)

### 階段 3 — 長期維護

| # | 約定內容 |
|---|----------|
| 1 | 改版流程：客戶提出需求 → 顧問修改 GitHub → push `main` → Actions 自動部署至**客戶** Cloudflare |
| 2 | Token 存放在**顧問 GitHub Secrets**；Token 必須在**客戶 Cloudflare** 建立 |
| 3 | 建議客戶將顧問加為 Cloudflare Member（有限權限），避免共用帳密 |
| 4 | 每季或合約到期前：確認 Token 仍有效、帳單正常、Analytics 有資料 |
| 5 | 合約終止時：客戶 **Roll／刪除** API Token；顧問移除 Secrets |

---

## 三、合約與退場（建議寫進報價或維護約）

可擇一或合併約定，避免日後爭議：

| 方案 | 說明 |
|------|------|
| **A. 持續代維** | 顧問保留 GitHub；客戶保留 Cloudflare；按月／按次改版 |
| **B. 買斷原始碼** | 顧問 transfer GitHub repo 或提供完整原始碼 zip + 建置說明；客戶另聘工程師接手 |
| **C. 只留靜態站** | 顧問停止維護；客戶 Cloudflare Pages 維持最後一版；Token 撤銷 |

無論哪種方案，建議明訂：

- 客戶擁有 **Cloudflare 帳號、網域、對外正式網址**。  
- 顧問在合約期間擁有 **改版與部署操作權**（透過 API Token，非帳號密碼）。  
- 合約結束後 **Token 由客戶撤銷**，顧問無法再部署。

---

## 附錄 A — 客戶 Cloudflare：API Token（給 IT 或顧問代設）

1. 登入 https://dash.cloudflare.com/profile/api-tokens  
2. **Create Token** → **Create Custom Token**  
3. **Permissions** 建議兩行：  
   - Account → **Cloudflare Pages** → **Edit**  
   - Account → **Account Settings** → **Read**  
4. **Account Resources**：Include → 貴公司帳號  
5. 建立後複製 Token（只顯示一次）→ 安全傳給顧問（勿貼在 LINE 公開群組）  
6. **Account ID**：Dashboard 右側欄或網址中可見 → 一併提供給顧問  

顧問將 Token 與 Account ID 存入 **顧問 GitHub** 的 Secrets（客戶無需使用 GitHub）。

**驗證 Token 是否有效（選用）：** Cloudflare 建立 Token 頁面提供的 CURL 測試；出現 `This API Token is valid and active` 即表示 Token 本身有效，仍須確認 GitHub 已設定 `CLOUDFLARE_ACCOUNT_ID`。

---

## 附錄 B — 顧問 GitHub Secrets（技術）

Repository：`cindyflower/apple-tree-clinic-v2`  
路徑：**Settings → Secrets and variables → Actions → Repository secrets**

| Secret 名稱 | 內容 |
|-------------|------|
| `CLOUDFLARE_API_TOKEN` | 客戶 Cloudflare 建立的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | 客戶 Account ID |

部署：Actions → **Deploy Cloudflare Pages** → Run workflow。

常見錯誤排除：[cloudflare-pages.md](./cloudflare-pages.md) 第六節。

---

## 附錄 C — 目前環境對照（2026-05 更新）

| 項目 | 值 |
|------|-----|
| 顧問 GitHub | `cindyflower/apple-tree-clinic-v2` |
| 客戶 Cloudflare Pages 專案 | `apple-tree-clinic-v2`（建議） |
| AB 預覽網址 | `https://apple-tree-clinic-v2.pages.dev` |
| 正式網域（尚未切換） | `https://www.drappletree.com.tw` |
| 備用預覽（GitHub Pages） | `https://cindyflower.github.io/apple-tree-clinic-v2/`（已改為僅手動部署，見下方） |

### AB／預覽結束後可關閉的項目

| 項目 | 作法 |
|------|------|
| 本機 `pnpm dev` | 終端機 Ctrl+C 或關閉 dev 程序 |
| GitHub Pages 自動部署 | 已關閉 push 觸發；僅 **Actions → Deploy GitHub Pages** 手動 |
| Cloudflare「Connect Git」 | 客戶後台 → Pages 專案 → 若有 Git 整合請 **Disconnect**（與 GitHub Actions 二選一） |
| **保留** | **Deploy Cloudflare Pages**（push `main` 自動）、客戶 `*.pages.dev` 預覽／正式網域 |

---

## 文件索引

| 文件 | 對象 |
|------|------|
| 本文件 | 客戶＋顧問（分工與流程） |
| [cloudflare-pages.md](./cloudflare-pages.md) | 顧問（部署與除錯） |
| [site-urls.md](./site-urls.md) | 顧問（網址與 SEO） |

若客戶名稱、repo 或專案名稱變更，請更新「附錄 C」與合約附件。
