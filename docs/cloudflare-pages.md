# Cloudflare Pages 部署指南（AB Test 預覽）

目前階段：**只部署到 Cloudflare Pages 預覽網址**，供 AB Test 使用。

- 預覽網址（預設）：**https://apple-tree-clinic-v2.pages.dev**
- 正式網域 `https://www.drappletree.com.tw`：**先不要綁定、不要改 DNS**，通過 AB Test 後再切換（見下方「正式上線」）

GitHub Pages 預覽仍維持：`https://cindyflower.github.io/apple-tree-clinic-v2/`

## 一、Cloudflare 後台（首次）

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages**
2. 可建立空專案或稍後由 Actions 自動建立；專案名稱建議：`apple-tree-clinic-v2`
3. **此階段不要**在 Pages 專案加 Custom domain（不要加 `drappletree.com.tw`）

### 不要用 Cloudflare「連接 GitHub」自動建置

若 Pages 專案已 **Connect to Git**（日誌出現 `Cloning repository`、`No build command specified`），會直接上傳整個 repo（含 `images/`），**不會**跑 `pnpm run build:production`，也容易踩到單檔 **25 MiB** 上限。

請改為其一：

- **建議**：刪除或暫停 Pages 的 Git 整合，只用本 repo 的 **GitHub Actions → Deploy Cloudflare Pages**（上傳 `dist/public`）。
- 若堅持用 Cloudflare Git：Build command 設 `pnpm install && pnpm run build:production`，Output directory 設 `dist/public`，並設定 `VITE_SITE_URL` / `SITE_URL` 環境變數（見第三節）。

### API Token

1. [API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**
2. 權限：Account → **Cloudflare Pages** → Edit
3. 複製 Token；記下 **Account ID**（Dashboard 右側）

## 二、GitHub Secrets

`cindyflower/apple-tree-clinic-v2` → **Settings → Secrets and variables → Actions**

| Secret | 說明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | 上一步 Token |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID |

（選用）**Variables**

| Variable | 說明 |
|----------|------|
| `CLOUDFLARE_PAGES_PROJECT` | 專案名稱（預設 `apple-tree-clinic-v2`） |
| `CLOUDFLARE_SITE_URL` | 若 `*.pages.dev` 網址不同，覆寫 canonical 用（預設 `https://apple-tree-clinic-v2.pages.dev`） |

推送 `main` 或手動執行 **Actions → Deploy Cloudflare Pages**。

部署成功後在 Cloudflare → 該專案 → **View build** 可看到實際 `*.pages.dev` 網址；若與預設不同，把 `CLOUDFLARE_SITE_URL` 設成該網址後重新 deploy。

## 三、本機建置（與 CI 相同）

```bash
VITE_SITE_URL=https://apple-tree-clinic-v2.pages.dev \
SITE_URL=https://apple-tree-clinic-v2.pages.dev \
pnpm run build:production
```

產出：`dist/public/`（含 `_redirects`、prerender、sitemap 皆指向上述預覽網域）

## 四、與 GitHub Pages 的差異

| 項目 | GitHub Pages | Cloudflare Pages（現在） |
|------|----------------|---------------------------|
| Workflow | `deploy-pages.yml` | `deploy-cloudflare.yml` |
| 對外網址 | `cindyflower.github.io/.../apple-tree-clinic-v2/` | `apple-tree-clinic-v2.pages.dev` |
| `VITE_SITE_URL` | `https://cindyflower.github.io` | `https://apple-tree-clinic-v2.pages.dev` |
| 正式網域 | 不用 | **不綁** |

頁尾／聯絡用的 `BRAND.website` 仍為 `https://www.drappletree.com.tw`（品牌資訊），與 SEO canonical 分開。

## 五、正式上線（AB Test 通過後再做）

1. Cloudflare Pages → **Custom domains** → 新增 `www.drappletree.com.tw`
2. DNS 指向 Cloudflare Pages
3. 將 GitHub Variable `CLOUDFLARE_SITE_URL` 改為 `https://www.drappletree.com.tw`（或改 workflow 預設）後重新 deploy
4. 詳見 [site-urls.md](./site-urls.md)

## 六、常見錯誤

| 訊息 | 原因 | 處理 |
|------|------|------|
| `Pages only supports files up to 25 MiB` | 部署目錄含超大檔（例如未使用的原圖） | 刪除或壓縮至 25 MiB 以下；網站南京環境照只用 `01.jpg`～`08.jpg` |
| `No build command specified` | Cloudflare Git 未設定建置 | 改用工 Actions，或設定 build 與 `dist/public` |
| `Authentication error [code: 10000]` | GitHub Secret 的 API Token 無效、過期、或權限／帳號範圍不對 | 見下方「Token 仍失敗時」 |
| `pnpm failed with exit code 1`（Annotations） | 多半是 **Deploy** 步驟失敗，不是建置失敗 | 展開 **Deploy to Cloudflare Pages** 看真正錯誤訊息 |

### Token 仍失敗時

1. 在 [API Tokens](https://dash.cloudflare.com/profile/api-tokens) 用 **Create Token** → 模板 **Edit Cloudflare Workers**（含 Pages 部署權限），或自訂：**Account → Cloudflare Pages → Edit** + **Account → Account Settings → Read**。
2. **Account Resources** 選 **Include** → 你的帳號（Account ID 須與 `CLOUDFLARE_ACCOUNT_ID` 一致）。
3. GitHub → **Settings → Secrets and variables → Actions → Repository secrets**（不是 Variables）更新 `CLOUDFLARE_API_TOKEN`；貼上時勿多空格或換行。
4. 不要用 Global API Key，要用 **API Token**（`cfut_…` 或類似格式）。
5. 更新 Secret 後需 **重新 Run workflow**（舊 run 不會自動重試 Secret）。

## 七、本機 wrangler 上傳（選用）

```bash
npx wrangler login
npx wrangler pages project create apple-tree-clinic-v2 --production-branch=main
VITE_SITE_URL=https://apple-tree-clinic-v2.pages.dev SITE_URL=https://apple-tree-clinic-v2.pages.dev pnpm run build:production
npx wrangler pages deploy dist/public --project-name=apple-tree-clinic-v2 --branch=main
```
