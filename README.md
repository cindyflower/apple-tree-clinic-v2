# 蘋果樹 Dr. Appletree

React 19 + Vite 7 + Tailwind CSS 4 醫美官網專案。

## 目錄結構

```
apple-tree-clinic-v2/
├── client/                   ← 前端原始碼（唯一開發目錄）
├── server/                   ← 正式環境靜態伺服器
├── shared/                   ← 共用常數
├── images/                   ← 離線圖片素材（CDN 備份）
├── image_urls_reference.txt  ← CDN URL 對照表
├── _archive/                 ← Manus 匯出備份（勿在此開發）
└── package.json
```

## 本機開發

```bash
pnpm install
pnpm dev          # 開發模式 → http://localhost:3000
```

正式版預覽（最接近 Manus 線上部署）：

```bash
pnpm build
pnpm preview      # → http://localhost:4173
```

## GitHub Pages 線上預覽

網址：**https://cindyflower.github.io/apple-tree-clinic-v2/**

1. 推送 `main` 分支後，GitHub Actions 會自動建置並部署
2. 首次請到 repo **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**
3. 本地模擬 GitHub Pages 建置：

```bash
GITHUB_PAGES=true VITE_SITE_URL=https://cindyflower.github.io pnpm run build:pages
pnpm preview
```

Canonical / sitemap / Schema.org 網址由 `VITE_SITE_URL` 統一控制；深連結 prerender 與 Cloudflare 上線說明見 **[docs/site-urls.md](docs/site-urls.md)**。

## 版本管理建議

| 用途 | 做法 |
|------|------|
| 日常微調 | 在根目錄改 `client/`，用 Git commit |
| 對照線上 | [Manus 預覽](https://appleclinic-nimipr2g.manus.space/) |
| 從 Manus 匯入 | 放到 `_archive/`，用 `diff` 比對後只合併需要的檔案 |
| 上線 | `pnpm build` → 部署 `dist/public/` |

**不要**再使用 `source-code/` 子目錄開發；Manus 原始匯出已備份至 `_archive/manus-export-2026-05-18/`。

## 離線圖片

將 `images/` 內檔案複製到 `client/public/images/`，並把程式中的 CloudFront URL 改為 `/images/檔名`。對照表見 `image_urls_reference.txt`。
