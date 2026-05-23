# 網站 URL 與 Canonical 設定

本專案的 sitemap、robots.txt、canonical、Open Graph、Schema.org 等 SEO 網址，皆由同一套設定產生。**切換部署環境時只需改環境變數，不必再改程式或手動更新 sitemap。**

## 單一設定來源

| 檔案 | 用途 |
|------|------|
| `shared/siteConfig.mjs` | build 腳本、Vite plugin、sitemap 產生 |
| `client/src/lib/siteUrl.ts` | React 執行時（useSEO、SchemaOrg、分享連結） |
| `.env.example` | 環境變數說明 |

核心環境變數：**`VITE_SITE_URL`**（不含 trailing slash）

`GITHUB_PAGES=true` 時會自動加上 base path `/apple-tree-clinic-v2`；正式網域部署時 base path 為 `/`。

## 各環境設定

| 環境 | 環境變數 | 產出的 canonical 範例 |
|------|----------|------------------------|
| **GitHub Pages（現在）** | `GITHUB_PAGES=true`<br>`VITE_SITE_URL=https://cindyflower.github.io` | `https://cindyflower.github.io/apple-tree-clinic-v2/face-test` |
| **Cloudflare Pages + 正式網域（未來）** | 不設 `GITHUB_PAGES`<br>`VITE_SITE_URL=https://www.drappletree.com.tw` | `https://www.drappletree.com.tw/face-test` |
| **本機開發** | 可不設（執行時 fallback 至 `window.location.origin`） | `http://localhost:3000/...` |

sitemap 腳本亦支援 `SITE_URL`（與 `VITE_SITE_URL` 同值），供 Node 腳本在 build 前使用。

## 會自動對齊的項目

- `client/public/sitemap.xml`（`scripts/generate-sitemap.mjs`）
- `client/public/robots.txt`
- `client/index.html` 內 canonical / og:url / JSON-LD（Vite `vitePluginSiteUrl` 於 build 替換 `__SITE_BASE__`）
- `client/src/hooks/useSEO.ts`
- `client/src/components/SchemaOrg.tsx`
- 臉部測驗分享連結（`FaceResult.tsx` → `runtimeSiteUrl()`）

## 上線 Cloudflare Pages 時

Cloudflare Pages build 設定：

```bash
VITE_SITE_URL=https://www.drappletree.com.tw
# 不要設 GITHUB_PAGES
```

另需設定 SPA fallback（`_redirects` 或 Pages 路由設定），取代 GitHub Pages 的 `404.html` 複製步驟。

DNS 將 `drappletree.com.tw` / `www` 指向 Cloudflare Pages 即可。sitemap、canonical、Schema.org 會自動指向正式網域。

## 與 BRAND.website 的差異

`client/src/lib/constants.ts` 的 `BRAND.website`（`https://www.drappletree.com.tw`）保留為**品牌正式聯絡網域**（頁尾、email 等），不隨預覽環境變動。

SEO canonical 則依 `VITE_SITE_URL` 決定，避免 GitHub Pages 預覽期 sitemap 與 canonical 不一致。

## 本地指令

```bash
# GitHub Pages 預覽（與 CI 相同）
GITHUB_PAGES=true VITE_SITE_URL=https://cindyflower.github.io pnpm run build:pages

# 僅重新產生 sitemap / robots
GITHUB_PAGES=true VITE_SITE_URL=https://cindyflower.github.io node scripts/generate-sitemap.mjs

# 模擬正式網域 build
VITE_SITE_URL=https://www.drappletree.com.tw pnpm build
```
