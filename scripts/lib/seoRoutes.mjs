/**
 * SEO metadata for public routes (used by sitemap + SPA prerender).
 */
import fs from "node:fs";
import path from "node:path";
import {
  absoluteAssetUrl,
  absoluteUrl,
  DEFAULT_OG_IMAGE_PATH,
  resolveSiteConfig,
} from "../../shared/siteConfig.mjs";

const BRAND_NAME = "蘋果樹 Dr. Appletree";

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}

function parseFolders(text) {
  const block = text.match(/export const F = \{([\s\S]*?)\} as const/)?.[1] ?? "";
  const folders = {};
  for (const match of block.matchAll(/(\w+):\s*"([^"]+)"/g)) {
    folders[match[1]] = match[2];
  }
  return folders;
}

function buildAssetPath(basePath, folder, filename) {
  const dir = folder.split("/").map((part) => encodeURIComponent(part)).join("/");
  const asset = `/images/${dir}/${encodeURIComponent(filename)}`;
  return basePath ? `${basePath}${asset}` : asset;
}

function buildRootAssetPath(basePath, filename) {
  const asset = `/images/_root/${encodeURIComponent(filename)}`;
  return basePath ? `${basePath}${asset}` : asset;
}

function loadImagesMap(root, basePath) {
  const text = fs.readFileSync(path.join(root, "client/src/lib/imageAssets.ts"), "utf8");
  const folders = parseFolders(text);
  const images = {};

  for (const match of text.matchAll(/(\w+):\s*img\(F\.(\w+),\s*"([^"]+)"\)/g)) {
    const folder = folders[match[2]];
    if (folder) images[match[1]] = buildAssetPath(basePath, folder, match[3]);
  }
  for (const match of text.matchAll(/(\w+):\s*imgRoot\("([^"]+)"\)/g)) {
    images[match[1]] = buildRootAssetPath(basePath, match[2]);
  }

  return images;
}

function caseMainImagePath(root, basePath, slug) {
  const manifestPath = path.join(root, "images/cases/manifest.json");
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const file = manifest[slug]?.[0];
    if (file) {
      const asset = `/images/cases/${slug}/${file}`;
      return basePath ? `${basePath}${asset}` : asset;
    }
  }
  return buildAssetPath(basePath, "08_案例Banner", "case-banner-beauty.jpeg");
}

function parseTreatmentRoutes(root, images) {
  const text = fs.readFileSync(path.join(root, "client/src/lib/treatmentDetails.ts"), "utf8");
  const routes = [];

  for (const match of text.matchAll(
    /slug: "([^"]+)"[\s\S]*?heroImage: IMAGES\.(\w+)[\s\S]*?metaTitle: "([^"]+)"[\s\S]*?metaDescription: "([^"]+)"/g
  )) {
    routes.push({
      path: `/treatment/${match[1]}`,
      title: match[3],
      description: match[4],
      ogImage: images[match[2]] || DEFAULT_OG_IMAGE_PATH,
    });
  }

  return routes;
}

function parseCaseRoutes(root, basePath) {
  const text = fs.readFileSync(path.join(root, "client/src/lib/caseDetails.ts"), "utf8");
  const routes = [];

  for (const match of text.matchAll(
    /slug: "([^"]+)"[\s\S]*?title: "([^"]+)"[\s\S]*?subtitle: "([^"]+)"/g
  )) {
    const slug = match[1];
    routes.push({
      path: `/case/${slug}`,
      title: `${match[2]}｜${BRAND_NAME} 真實案例`,
      description: match[3],
      ogImage: caseMainImagePath(root, basePath, slug),
    });
  }

  return routes;
}

function parseDoctorRoutes(root, basePath) {
  const text = fs.readFileSync(path.join(root, "client/src/lib/doctorDetails.ts"), "utf8");
  const folders = parseFolders(
    fs.readFileSync(path.join(root, "client/src/lib/imageAssets.ts"), "utf8")
  );
  const doctorFolder = folders.doctors || "15_醫師照片";
  const routes = [];

  for (const match of text.matchAll(/slug: "([^"]+)"/g)) {
    const slug = match[1];
    const block = text.slice(match.index, match.index + 2500);
    const imageMatch = block.match(/image: img\(F\.doctors,\s*"([^"]+)"\)/);
    const titleMatch = block.match(/metaTitle: "([^"]+)"/);
    const descMatch = block.match(/metaDescription:\s*\n?\s*"([^"]+)"/);
    if (!imageMatch || !titleMatch || !descMatch) continue;

    routes.push({
      path: `/doctor/${slug}`,
      title: titleMatch[1],
      description: descMatch[1],
      ogImage: buildAssetPath(basePath, doctorFolder, imageMatch[1]),
    });
  }

  return routes;
}

const HOME_ROUTE = {
  path: "/",
  title:
    "蘋果樹醫美 Dr. Appletree｜搭載 AI 序顏美學評估，科學化精準變美、15年臨床經驗、打造自然協調專屬美學。",
  description:
    "蘋果樹醫美診所｜台北松山南京旗艦・三峽北大。提供皮秒雷射、音波拉提、電波拉提、立體雕塑、再生醫學、整型外科等專業醫美療程。以醫療專業與科技檢測，陪你建立更自然、更長期的美麗管理方式。",
  ogImage: DEFAULT_OG_IMAGE_PATH,
};

const STATIC_ROUTES = [
  {
    path: "/face-test",
    title: "臉部老化測驗｜蘋果樹醫美",
    description: "30 秒測出你的臉部老化類型，取得專屬 4R 美學管理建議。",
    ogImage: DEFAULT_OG_IMAGE_PATH,
  },
  {
    path: "/xuyan-ai",
    title: "序顏 AI 檢測｜蘋果樹醫美",
    description: "序顏 AI 科技檢測，協助您了解肌膚與輪廓狀態，作為療程規劃參考。",
    ogImage: DEFAULT_OG_IMAGE_PATH,
  },
];

/** @param {string} root @param {ReturnType<typeof resolveSiteConfig>} [config] */
export function listSeoRoutes(root, config = resolveSiteConfig()) {
  const images = loadImagesMap(root, config.basePath);

  return [
    HOME_ROUTE,
    ...STATIC_ROUTES,
    ...parseTreatmentRoutes(root, images),
    ...parseCaseRoutes(root, config.basePath),
    ...parseDoctorRoutes(root, config.basePath),
  ].map((route) => ({
    ...route,
    ogImage: route.ogImage.startsWith("/") ? route.ogImage : DEFAULT_OG_IMAGE_PATH,
  }));
}

/** @param {string} html @param {{ path: string, title: string, description: string, ogImage: string }} route @param {ReturnType<typeof resolveSiteConfig>} config */
export function patchHtmlMeta(html, route, config) {
  const canonical = absoluteUrl(route.path, config);
  const ogImage = absoluteAssetUrl(route.ogImage, config);
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<link rel="canonical" href=")[^"]*(")/,
      `$1${canonical}$2`
    )
    .replace(
      /(<meta property="og:url" content=")[^"]*(")/,
      `$1${canonical}$2`
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta property="og:image" content=")[^"]*(")/,
      `$1${ogImage}$2`
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${title}$2`
    )
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`
    )
    .replace(
      /(<meta name="twitter:image" content=")[^"]*(")/,
      `$1${ogImage}$2`
    );
}
