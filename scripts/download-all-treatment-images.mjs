/**
 * Download all treatmentImg fallback URLs + items without images (scrape og:image).
 * Run: node scripts/download-all-treatment-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONSTANTS = path.join(ROOT, "client/src/lib/constants.ts");
const IMAGE_ASSETS = path.join(ROOT, "client/src/lib/imageAssets.ts");

const F = {
  brand: "00_品牌與環境",
  banner: "01_橫幅Banner",
  laser: "02_雷射電音波",
  injection: "03_微整注射",
  surgery: "04_整型外科",
  body: "05_形體雕塑",
  men: "06_型男醫美",
  skin: "07_肌膚管理",
  cases: "08_案例Banner",
  regen: "09_再生醫學",
  hair: "10_生髮門診",
  nutrition: "11_營養醫學",
  functional: "12_功能醫學檢測",
  happy: "13_快樂門診",
  vaccine: "14_預防保健",
  doctors: "15_醫師照片",
};

/** @type {{ key: string; folder: string; file: string; url: string }[]} */
const EXTRA = [
  { key: "索夫波", folder: F.laser, file: "索夫波.jpg", url: "https://www.drappletree.com.tw/service/micro/13744/" },
  { key: "乳暈手術", folder: F.surgery, file: "乳暈手術.jpg", url: "https://www.drappletree.com.tw/service/carved/" },
  { key: "平胸手術", folder: F.surgery, file: "平胸手術.jpg", url: "https://www.drappletree.com.tw/service/carved/" },
  { key: "抽脂手術", folder: F.surgery, file: "抽脂手術.jpg", url: "https://www.drappletree.com.tw/service/carved/12725/" },
  { key: "私密處雷射", folder: F.laser, file: "私密處雷射.jpg", url: "https://www.drappletree.com.tw/category/service/micro/" },
  { key: "醫學美容SPA", folder: F.skin, file: "醫學美容SPA.jpg", url: "https://www.drappletree.com.tw/service/spa/" },
];

function parseMappings() {
  const text = fs.readFileSync(IMAGE_ASSETS, "utf8");
  const map = {};
  for (const m of text.matchAll(/"([^"]+)": img\(F\.(\w+), "([^"]+)"\)/g)) {
    map[m[1]] = { folderKey: m[2], file: m[3] };
  }
  const m2 = text.match(/ICOONE: img\(F\.(\w+), "([^"]+)"\)/);
  if (m2) map.ICOONE = { folderKey: m2[1], file: m2[2] };
  return map;
}

function parseFallbacks() {
  const text = fs.readFileSync(CONSTANTS, "utf8");
  const out = [];
  for (const m of text.matchAll(/treatmentImg\("([^"]+)", "(https[^"]+)"\)/g)) {
    out.push({ key: m[1], url: m[2] });
  }
  return out;
}

function guessFile(url) {
  const u = new URL(url);
  return decodeURIComponent(path.basename(u.pathname));
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AppleTreeClinic/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractImageUrl(html, pageUrl) {
  const og = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    ?? html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (og) return og[1];
  const imgs = [...html.matchAll(/https:\/\/www\.drappletree\.com\.tw\/wp-content\/uploads\/[^"'\s]+\.(?:jpe?g|png|webp)/gi)];
  const filtered = imgs.map((m) => m[0]).filter((u) => !u.includes("logo") && !u.includes("icon"));
  return filtered[0] ?? null;
}

async function downloadBinary(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AppleTreeClinic/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const mappings = parseMappings();
const jobs = [];

for (const { key, url } of parseFallbacks()) {
  const info = mappings[key];
  if (!info) {
    jobs.push({ key, folder: F.injection, file: guessFile(url), url, note: "unmapped" });
    continue;
  }
  jobs.push({
    key,
    folder: F[info.folderKey],
    file: info.file,
    url,
  });
}

for (const ex of EXTRA) {
  jobs.push({ ...ex, scrape: true });
}

const results = [];

for (const job of jobs) {
  let imageUrl = job.url;
  if (job.scrape) {
    try {
      const html = await fetchHtml(job.url);
      const found = extractImageUrl(html, job.url);
      if (!found) throw new Error("no image in page");
      imageUrl = found;
    } catch (e) {
      results.push({ ...job, status: "scrape-fail", error: e.message });
      console.error(`scrape FAIL ${job.key}: ${e.message}`);
      continue;
    }
  }
  const dest = path.join(ROOT, "images", job.folder, job.file);
  try {
    await downloadBinary(imageUrl, dest);
    results.push({ key: job.key, folder: job.folder, file: job.file, imageUrl, status: "ok" });
    console.log(`ok  ${job.key} → ${job.folder}/${job.file}`);
  } catch (e) {
    results.push({ key: job.key, imageUrl, status: "fail", error: e.message });
    console.error(`FAIL ${job.key}: ${e.message}`);
  }
}

fs.writeFileSync(
  path.join(ROOT, "scripts/download-all-treatment-results.json"),
  JSON.stringify(results, null, 2)
);

const newMappings = results
  .filter((r) => r.status === "ok")
  .filter((r) => !mappings[r.key])
  .map((r) => `  "${r.key}": img(F.${Object.entries(F).find(([, v]) => v === r.folder)?.[0] ?? "skin"}, "${r.file}"),`);

if (newMappings.length) {
  console.log("\n// Add to TREATMENT_IMG:\n" + newMappings.join("\n"));
}
