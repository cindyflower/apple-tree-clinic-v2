#!/usr/bin/env node
/**
 * Sync images/ → client/public/images (same as vitePluginSyncTreatmentImages).
 * Run after adding/renaming files in images/ when dev server was already running.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(ROOT, "images");
const destRoot = path.join(ROOT, "client", "public", "images");
const SKIP_DIRS = new Set(["_archive"]);

if (!fs.existsSync(srcRoot)) {
  console.error("Missing images/ directory");
  process.exit(1);
}

fs.mkdirSync(destRoot, { recursive: true });

for (const name of fs.readdirSync(srcRoot)) {
  if (SKIP_DIRS.has(name)) continue;
  const src = path.join(srcRoot, name);
  if (!fs.statSync(src).isDirectory()) continue;
  fs.cpSync(src, path.join(destRoot, name), { recursive: true, force: true });
}

const destRootAssets = path.join(destRoot, "_root");
fs.mkdirSync(destRootAssets, { recursive: true });
for (const name of fs.readdirSync(srcRoot)) {
  const src = path.join(srcRoot, name);
  if (!fs.statSync(src).isFile()) continue;
  if (!/\.(jpe?g|png|webp|mp4)$/i.test(name)) continue;
  fs.copyFileSync(src, path.join(destRootAssets, name));
}

const check = path.join(destRoot, "services/13_肌膚管理/1.AI智慧皮膚檢測儀_cover.jpg");
console.log(
  check && fs.existsSync(check)
    ? "✓ Synced images/ → client/public/images/"
    : "✓ Synced (verify skin assets in images/services/13_肌膚管理/)",
);
