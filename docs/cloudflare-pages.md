# Cloudflare Pages 部署指南

正式網域：`https://www.drappletree.com.tw`

GitHub Pages 預覽仍維持不變；**正式上線**請用 Cloudflare Pages + 本文件設定。

## 一、Cloudflare 後台（首次）

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create**
2. 選 **Pages** → **Connect to Git**（或直接建立空專案，由 GitHub Actions 部署）
3. 若用 **GitHub Actions**（本 repo 已含 workflow）：
   - 專案名稱建議：`apple-tree-clinic-v2`（與 workflow 預設一致）
   - 不必在 Cloudflare 填 build 指令（由 Actions 建置後上傳 `dist/public`）

### API Token（給 GitHub Actions）

1. [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**
2. 使用模板 **Edit Cloudflare Workers** 或自訂權限：
   - Account → **Cloudflare Pages** → Edit
3. 複製 Token（只顯示一次）

### Account ID

Dashboard 右側欄或任意網域 **Overview** 頁可看到 **Account ID**。

## 二、GitHub Secrets

Repo：`cindyflower/apple-tree-clinic-v2` → **Settings → Secrets and variables → Actions**

| Secret | 說明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | 上一步建立的 Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |

（選用）**Variables** → `CLOUDFLARE_PAGES_PROJECT`：若 Cloudflare 專案名稱不是 `apple-tree-clinic-v2` 可覆寫。

設定完成後：

- 推送 `main` 會觸發 `.github/workflows/deploy-cloudflare.yml`
- 或到 **Actions** → **Deploy Cloudflare Pages** → **Run workflow**

## 三、本機建置驗證

```bash
VITE_SITE_URL=https://www.drappletree.com.tw SITE_URL=https://www.drappletree.com.tw pnpm run build:production
```

產出目錄：`dist/public/`（含 `_redirects`、prerender 路由、sitemap）

## 四、自訂網域 DNS

在 Cloudflare Pages 專案 → **Custom domains**：

- `www.drappletree.com.tw`（建議 primary）
- `drappletree.com.tw` → 設 **Redirect to www**

若網域已在 Cloudflare DNS，通常會自動建議 CNAME。

## 五、與 GitHub Pages 的差異

| 項目 | GitHub Pages | Cloudflare Pages |
|------|----------------|------------------|
| 觸發 | `deploy-pages.yml` | `deploy-cloudflare.yml` |
| `GITHUB_PAGES` | `true` | **不要設** |
| `VITE_SITE_URL` | `https://cindyflower.github.io` | `https://www.drappletree.com.tw` |
| Base path | `/apple-tree-clinic-v2/` | `/` |
| SPA fallback | `404.html` 複製 | `_redirects` → 200 |

SEO canonical 由 `VITE_SITE_URL` 控制，詳見 [site-urls.md](./site-urls.md)。

## 六、本機直接上傳（選用）

```bash
npx wrangler login
npx wrangler pages project create apple-tree-clinic-v2 --production-branch=main
VITE_SITE_URL=https://www.drappletree.com.tw SITE_URL=https://www.drappletree.com.tw pnpm run build:production
npx wrangler pages deploy dist/public --project-name=apple-tree-clinic-v2 --branch=main
```
