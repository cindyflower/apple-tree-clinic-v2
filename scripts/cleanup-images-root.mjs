#!/usr/bin/env node
/**
 * Remove duplicate / junk loose files at images/ root.
 * Keeps imgRoot() assets; archives unreferenced doctor hi-res originals.
 * Run: node scripts/cleanup-images-root.mjs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = path.join(ROOT, "images");
const archiveDir = path.join(imagesRoot, "_archive", "doctor-originals");

const FOLDERS = [
  "00_品牌與環境",
  "01_橫幅Banner",
  "02_雷射電音波",
  "03_微整注射",
  "04_整型外科",
  "05_形體雕塑",
  "06_型男醫美",
  "07_肌膚管理",
  "08_案例Banner",
  "09_再生醫學",
  "10_生髮門診",
  "11_營養醫學",
  "12_功能醫學檢測",
  "13_快樂門診",
  "14_預防保健",
  "15_醫師照片",
];

function hash(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

const imageAssets = fs.readFileSync(
  path.join(ROOT, "client/src/lib/imageAssets.ts"),
  "utf8"
);
const keep = new Set([...imageAssets.matchAll(/imgRoot\("([^"]+)"\)/g)].map((m) => m[1]));

const loose = fs.readdirSync(imagesRoot).filter((name) => {
  const p = path.join(imagesRoot, name);
  return fs.statSync(p).isFile() && /\.(jpe?g|png|webp|mp4)$/i.test(name);
});

const actions = [];

for (const name of loose) {
  if (keep.has(name)) continue;

  const rootPath = path.join(imagesRoot, name);
  let duplicateOf = null;

  for (const folder of FOLDERS) {
    const dir = path.join(imagesRoot, folder);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      const p = path.join(dir, file);
      if (!fs.statSync(p).isFile()) continue;
      if (hash(rootPath) === hash(p)) {
        duplicateOf = `${folder}/${file}`;
        break;
      }
    }
    if (duplicateOf) break;
  }

  if (duplicateOf) {
    fs.unlinkSync(rootPath);
    actions.push({ action: "delete-duplicate", name, duplicateOf });
    continue;
  }

  if (/^[\u4e00-\u9fff].*\.jpg$/i.test(name)) {
    fs.mkdirSync(archiveDir, { recursive: true });
    fs.renameSync(rootPath, path.join(archiveDir, name));
    actions.push({ action: "archive-doctor", name });
    continue;
  }

  fs.unlinkSync(rootPath);
  actions.push({ action: "delete-unreferenced", name });
}

const dsStore = path.join(imagesRoot, ".DS_Store");
if (fs.existsSync(dsStore)) {
  fs.unlinkSync(dsStore);
  actions.push({ action: "delete-junk", name: ".DS_Store" });
}

const reportPath = path.join(ROOT, "scripts/cleanup-images-root-results.json");
fs.writeFileSync(reportPath, JSON.stringify({ kept: keep.size, actions }, null, 2));

console.log(`Kept ${keep.size} imgRoot assets at images/ root`);
for (const a of actions) {
  console.log(`${a.action}: ${a.name}${a.duplicateOf ? ` (→ ${a.duplicateOf})` : ""}`);
}
console.log(`\nWrote ${reportPath}`);
