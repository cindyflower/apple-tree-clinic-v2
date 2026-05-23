#!/usr/bin/env node
/**
 * Rename case gallery files to ASCII names (cover.jpg, 02.jpg, …)
 * so Vite dev server and static hosts serve them reliably.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const casesDir = path.join(ROOT, "images", "cases");

/** Source order per slug (from caseImageAssets GALLERY_FILES) */
const GALLERY_ORDER = {
  "hydrafacial-male": ["縮圖-拷貝.jpg"],
  "eyebag-male": ["縮圖-拷貝-10.jpg"],
  "double-eyelid": ["縮圖-拷貝-4.jpg"],
  aesthefill: [
    "縮圖.jpg",
    "0-0.jpg",
    "2-2.jpg",
    "1-1-1.jpg",
    "3-3.jpg",
    "6-6.jpg",
    "8-8.jpg",
    "8-9.jpg",
    "9-1.jpg",
    "10-10.jpg",
    "14-14-1.jpg",
  ],
  "talent-a-abs": [
    "翁先生-1.jpg",
    "翁先生3.jpg",
    "翁先生4.jpg",
    "翁先生7.jpg",
    "翁先生5.jpg",
    "翁先生6.jpg",
    "翁先生8.jpg",
  ],
  "talent-a-hip": [
    "封面_張小姐.jpg",
    "未命名-1.jpg",
    "張小姐3.jpg",
    "張小姐4.jpg",
    "張小姐5.jpg",
    "張小姐6.jpg",
    "張小姐7.jpg",
    "張小姐_臀部.jpg",
  ],
  "talent-a-arm": [
    "網紅_官網文章公版_工作區域-1-複本-3-scaled.jpg",
    "黃小姐-1.jpg",
    "黃小姐-2.jpg",
    "黃小姐-3.jpg",
    "LINE_ALBUM_網紅2_220509_2-1.jpg",
    "黃小姐_術後_220519.jpg",
  ],
  "talent-a-abs-kol": [
    "網紅_官網文章公版_工作區域-1-scaled.jpg",
    "未命名-3.jpg",
    "KOL_7_1.jpg",
    "KOL_5_5.jpg",
    "KOL_1_1.jpg",
    "LINE_ALBUM_2022317_220317_2_1_1.jpg",
    "KOL_11.jpg",
    "KOL_10_1.jpg",
    "KOL_3_1.jpg",
    "KOL_8_1.jpg",
  ],
  "talent-a-belly": [
    "網紅_官網文章公版_1_工作區域-1-複本-scaled.jpg",
    "LINE_ALBUM_20220301_220303_16.jpg",
    "LINE_ALBUM_20220301_220303_26.jpg",
    "LINE_ALBUM_202233_220303_15.jpg",
    "LINE_ALBUM_20220301_220303_38.jpg",
    "LINE_ALBUM_202233_220303_46.jpg",
    "LINE_ALBUM_20220301_220303_4.jpg",
    "S__35119116.jpg",
  ],
  "v-face-queen": ["53f93c8d81c9cdfa0bacacfa15f3e78ad8254df5.jpg"],
  "picosure-case": [
    "7980e6ea3035ff8cbf4afa890ace7127e9495382.jpg",
    "6ef225328daedf8708a7b4159c94b4122314d67b.jpg",
    "126027838421dc5804a48a321238d17fb486b8a8.jpg",
    "b2a800ffd342f3f2e5fb26f96d86964a398bb031.jpg",
    "755蜂巢2.jpg",
    "花花_皮秒_BN.png",
    "李-皮蜂-V2.jpg",
    "封面_網紅.jpg",
  ],
  "ha-tear-trough": [
    "bnV2.jpg",
    "博涵B1-1.png",
    "博涵B2-1.jpg",
    "博涵B2-2.jpg",
    "李醫師.jpg",
    "診所照.jpg",
    "診所照2.jpg",
    "博涵I1.jpg",
    "博涵I2.jpg",
    "2B2.jpg",
    "2A2.jpg",
  ],
};

function targetName(index, ext) {
  if (index === 0) return `cover${ext}`;
  return `${String(index + 1).padStart(2, "0")}${ext}`;
}

function needsAsciiRename(name) {
  return /[^\x00-\x7F]/.test(name) || /%/.test(encodeURIComponent(name));
}

const manifest = {};

for (const [slug, sources] of Object.entries(GALLERY_ORDER)) {
  const dir = path.join(casesDir, slug);
  if (!fs.existsSync(dir)) {
    console.warn(`skip missing dir: ${slug}`);
    continue;
  }

  const newNames = [];
  const toRemove = new Set();

  sources.forEach((src, i) => {
    const srcPath = path.join(dir, src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`missing: ${slug}/${src}`);
      return;
    }
    const ext = path.extname(src).toLowerCase() || ".jpg";
    const dest = targetName(i, ext);
    const destPath = path.join(dir, dest);

    if (src === dest && !needsAsciiRename(src)) {
      newNames.push(dest);
      return;
    }

    fs.copyFileSync(srcPath, destPath);
    newNames.push(dest);
    if (src !== dest) toRemove.add(src);
  });

  for (const old of toRemove) {
    const p = path.join(dir, old);
    if (fs.existsSync(p) && !newNames.includes(old)) fs.unlinkSync(p);
  }

  // Remove stale ASCII duplicates from manual tests
  for (const f of fs.readdirSync(dir)) {
    if (f === "manifest.json") continue;
    if (!newNames.includes(f) && (f === "top.jpg" || f === "test.jpg")) {
      fs.unlinkSync(path.join(dir, f));
    }
  }

  manifest[slug] = newNames;
  console.log(`${slug}: ${newNames.join(", ")}`);
}

fs.writeFileSync(
  path.join(casesDir, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);
console.log("\nWrote images/cases/manifest.json");
