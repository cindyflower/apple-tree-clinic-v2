/**
 * Download treatment thumbnails still using old-site fallback URLs.
 * Run: node scripts/download-treatment-fallbacks.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** @type {{ folder: string; file: string; url: string; mapKey: string }[]} */
const ITEMS = [
  { folder: "03_微整注射", file: "Sunmax膠原蛋白-熊貓針.jpg", mapKey: "Sunmax 膠原蛋白（熊貓針）", url: "https://www.drappletree.com.tw/wp-content/uploads/2025/07/縮圖-拷貝-8-768x508.jpg" },
  { folder: "03_微整注射", file: "VivaBella薇貝拉.jpg", mapKey: "VivaBella 薇貝拉", url: "https://www.drappletree.com.tw/wp-content/uploads/2025/07/縮圖-拷貝-6-768x508.jpg" },
  { folder: "03_微整注射", file: "玻尿酸填充.jpg", mapKey: "玻尿酸填充", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/玻尿酸填充喬亞登.jpg" },
  { folder: "03_微整注射", file: "Volite長效保濕針.jpg", mapKey: "Volite 長效保濕針", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/volite長效保濕針.jpg" },
  { folder: "03_微整注射", file: "Sculptra舒顏萃.jpg", mapKey: "Sculptra 舒顏萃", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/舒顏翠.jpg" },
  { folder: "03_微整注射", file: "Ellanse洢蓮絲.jpg", mapKey: "Ellanse 洢蓮絲", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/依蓮絲.jpg" },
  { folder: "03_微整注射", file: "AestheFill艾麗斯.jpg", mapKey: "AestheFill 艾麗斯", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/AestheFill-艾麗斯-new-768x509.jpg" },
  { folder: "03_微整注射", file: "塑立愛少女立提線.jpg", mapKey: "塑立愛 少女立提線", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/埋線拉提塑立愛-少女立提線.jpg" },
  { folder: "03_微整注射", file: "腋下止汗.jpg", mapKey: "腋下止汗", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/04/腋下止汗MIRADRY.jpg" },
  { folder: "04_整型外科", file: "開眼頭開眼尾.jpg", mapKey: "開眼頭/開眼尾", url: "https://www.drappletree.com.tw/wp-content/uploads/2020/07/50cbc5094931dd777718a40b885c5036f15ec925-768x494.jpg" },
  { folder: "04_整型外科", file: "韓式隆鼻手術.jpg", mapKey: "韓式隆鼻手術", url: "https://www.drappletree.com.tw/wp-content/uploads/2020/07/1b29fa9496181057b3482cb48b3597d9f312e814-768x570.jpg" },
  { folder: "04_整型外科", file: "卡麥拉隆鼻手術.jpg", mapKey: "卡麥拉隆鼻手術", url: "https://www.drappletree.com.tw/wp-content/uploads/upload/images/c36fd352049f7d79acc9c6c2f610fa9dcb00d1d3-768x562.jpg" },
  { folder: "04_整型外科", file: "縮鼻翼手術.jpg", mapKey: "縮鼻翼手術", url: "https://www.drappletree.com.tw/wp-content/uploads/2020/07/11287bbed3ca9af00488bc3e87cb9b4c03afc124.jpg" },
  { folder: "04_整型外科", file: "縮鼻頭手術.jpg", mapKey: "縮鼻頭手術", url: "https://www.drappletree.com.tw/wp-content/uploads/upload/images/49818cce29f3c45ecbad57ef138f88806041b6f1.jpg" },
  { folder: "04_整型外科", file: "果凍矽膠隆乳.jpg", mapKey: "果凍矽膠隆乳", url: "https://www.drappletree.com.tw/wp-content/uploads/upload/images/195317a0c9f01a6424029a89b608055f84118953.jpg" },
  { folder: "05_形體雕塑", file: "ICOONE.jpg", mapKey: "ICOONE", url: "https://www.drappletree.com.tw/wp-content/uploads/2021/06/ICOONE.jpg" },
];

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AppleTreeClinic/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const results = [];

for (const { folder, file, url, mapKey } of ITEMS) {
  const dir = path.join(ROOT, "images", folder);
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, file);
  try {
    await download(url, dest);
    results.push({ mapKey, folder, file, status: "ok" });
    console.log(`ok  ${mapKey} → ${folder}/${file}`);
  } catch (e) {
    results.push({ mapKey, folder, file, status: "fail", error: e.message });
    console.error(`FAIL ${mapKey}: ${e.message}`);
  }
}

fs.writeFileSync(
  path.join(ROOT, "scripts/treatment-fallback-download-results.json"),
  JSON.stringify(results, null, 2)
);
