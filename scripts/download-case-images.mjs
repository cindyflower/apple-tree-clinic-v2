/**
 * Download case detail gallery images from caseDetails URLs into images/cases/{slug}/
 * Run: node scripts/download-case-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CASE_DETAILS_PATH = path.join(ROOT, "client/src/lib/caseDetails.ts");
const OUT_ROOT = path.join(ROOT, "images/cases");

/** @type {{ slug: string; urls: string[] }[]} */
const CASES = [
  { slug: "hydrafacial-male", urls: ["https://www.drappletree.com.tw/wp-content/uploads/2025/11/%E7%B8%AE%E5%9C%96-%E6%8B%B7%E8%B2%9D.jpg"] },
  { slug: "eyebag-male", urls: ["https://www.drappletree.com.tw/wp-content/uploads/2025/07/%E7%B8%AE%E5%9C%96-%E6%8B%B7%E8%B2%9D-10.jpg"] },
  { slug: "double-eyelid", urls: ["https://www.drappletree.com.tw/wp-content/uploads/2025/07/%E7%B8%AE%E5%9C%96-%E6%8B%B7%E8%B2%9D-4.jpg"] },
  { slug: "aesthefill", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2025/08/%E7%B8%AE%E5%9C%96.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/0-0.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/2-2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/1-1-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/3-3.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/6-6.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/8-8.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/8-9.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/9-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/10-10.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/14-14-1.jpg",
  ]},
  { slug: "talent-a-abs", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/%E7%BF%81%E5%85%88%E7%94%9F-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F3.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F4.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F7.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F5.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F6.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%BF%81%E5%85%88%E7%94%9F8.jpg",
  ]},
  { slug: "talent-a-hip", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%B0%81%E9%9D%A2_%E5%BC%B5%E5%B0%8F%E5%A7%90.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E6%9C%AA%E5%91%BD%E5%90%8D-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%903.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%904.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%905.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%906.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%907.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E5%BC%B5%E5%B0%8F%E5%A7%90_%E8%87%80%E9%83%A8.jpg",
  ]},
  { slug: "talent-a-arm", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E7%B6%B2%E7%B4%85_%E5%AE%98%E7%B6%B2%E6%96%87%E7%AB%A0%E5%85%AC%E7%89%88_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-%E8%A4%87%E6%9C%AC-3-scaled.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E9%BB%83%E5%B0%8F%E5%A7%90-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E9%BB%83%E5%B0%8F%E5%A7%90-2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E9%BB%83%E5%B0%8F%E5%A7%90-3.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/LINE_ALBUM_%E7%B6%B2%E7%B4%852_220509_2-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/05/%E9%BB%83%E5%B0%8F%E5%A7%90_%E8%A1%93%E5%BE%8C_220519.jpg",
  ]},
  { slug: "talent-a-abs-kol", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/%E7%B6%B2%E7%B4%85_%E5%AE%98%E7%B6%B2%E6%96%87%E7%AB%A0%E5%85%AC%E7%89%88_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-scaled.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/%E6%9C%AA%E5%91%BD%E5%90%8D-3.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_7_1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_5_5.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_1_1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_2022317_220317_2_1_1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_11.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_10_1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_3_1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/KOL_8_1.jpg",
  ]},
  { slug: "talent-a-belly", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/%E7%B6%B2%E7%B4%85_%E5%AE%98%E7%B6%B2%E6%96%87%E7%AB%A0%E5%85%AC%E7%89%88_1_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-%E8%A4%87%E6%9C%AC-scaled.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_20220301_220303_16.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_20220301_220303_26.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_202233_220303_15.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_20220301_220303_38.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_202233_220303_46.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/LINE_ALBUM_20220301_220303_4.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/03/S__35119116.jpg",
  ]},
  { slug: "v-face-queen", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2020/07/53f93c8d81c9cdfa0bacacfa15f3e78ad8254df5.jpg",
  ]},
  { slug: "picosure-case", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2020/07/7980e6ea3035ff8cbf4afa890ace7127e9495382.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2020/07/6ef225328daedf8708a7b4159c94b4122314d67b.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2020/07/126027838421dc5804a48a321238d17fb486b8a8.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/upload/images/b2a800ffd342f3f2e5fb26f96d86964a398bb031.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/03/755%E8%9C%82%E5%B7%A22.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/07/%E8%8A%B1%E8%8A%B1_%E7%9A%AE%E7%A7%92_BN.png",
    "https://www.drappletree.com.tw/wp-content/uploads/2018/08/%E6%9D%8E-%E7%9A%AE%E8%9C%82-V2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/06/%E5%B0%81%E9%9D%A2_%E7%B6%B2%E7%B4%85.jpg",
  ]},
  { slug: "ha-tear-trough", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/bnV2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E5%8D%9A%E6%B6%B5B1-1.png",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E5%8D%9A%E6%B6%B5B2-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E5%8D%9A%E6%B6%B5B2-2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E6%9D%8E%E9%86%AB%E5%B8%AB.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E8%A8%BA%E6%89%80%E7%85%A7.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E8%A8%BA%E6%89%80%E7%85%A72.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E5%8D%9A%E6%B6%B5I1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/%E5%8D%9A%E6%B6%B5I2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/2B2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/2A2.jpg",
  ]},
  { slug: "rosacea-gut", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2021/06/酒糟A1.png",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/06/酒糟B1.png",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/06/朱醫師_酒糟02.jpg",
  ]},
  { slug: "sensitive-skin-inflammation", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2021/01/bnv2-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/02/BA4.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/02/BA3.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/02/ba2.jpg",
  ]},
  { slug: "menopause-hormone", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/0-0.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/2-2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2022/06/1-1-1.jpg",
  ]},
  { slug: "fatigue-face-stress", urls: [
    "https://www.drappletree.com.tw/wp-content/uploads/2021/12/2_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/12/%E4%B8%80%E9%A0%81%E5%BC%8F%E7%B6%B2%E7%AB%99_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-%E8%A4%87%E6%9C%AC-2.jpg",
    "https://www.drappletree.com.tw/wp-content/uploads/2021/12/2_%E5%B7%A5%E4%BD%9C%E5%8D%80%E5%9F%9F-1-%E8%A4%87%E6%9C%AC-2.jpg",
  ]},
];

function filenameFromUrl(url) {
  const u = new URL(url);
  const base = decodeURIComponent(path.basename(u.pathname));
  return base.replace(/[^\w.\-()\u4e00-\u9fff]/g, "_") || "image.jpg";
}

async function download(url, dest) {
  if (fs.existsSync(dest)) {
    const stat = fs.statSync(dest);
    if (stat.size > 1000) return "skip";
  }
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AppleTreeClinic/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return "ok";
}

const manifestPath = path.join(OUT_ROOT, "manifest.json");
const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : {};

for (const { slug, urls } of CASES) {
  const dir = path.join(OUT_ROOT, slug);
  fs.mkdirSync(dir, { recursive: true });
  const files = [];
  const seen = new Set();
  for (const url of urls) {
    let name = filenameFromUrl(url);
    if (seen.has(name)) {
      const ext = path.extname(name);
      const stem = path.basename(name, ext);
      let i = 2;
      while (seen.has(`${stem}-${i}${ext}`)) i++;
      name = `${stem}-${i}${ext}`;
    }
    seen.add(name);
    const dest = path.join(dir, name);
    try {
      const status = await download(url, dest);
      files.push(name);
      console.log(`${status === "skip" ? "skip" : "ok  "} ${slug}/${name}`);
    } catch (e) {
      console.error(`FAIL ${slug} ${url}: ${e.message}`);
    }
  }
  manifest[slug] = files;
}

fs.writeFileSync(
  manifestPath,
  JSON.stringify(manifest, null, 2),
  "utf-8"
);
console.log("\nWrote images/cases/manifest.json");
