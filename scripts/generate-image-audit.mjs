/**
 * Generate treatment + case image audit CSVs.
 * Run: node scripts/generate-image-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const constants = fs.readFileSync(path.join(ROOT, "client/src/lib/constants.ts"), "utf8");
const imageAssets = fs.readFileSync(path.join(ROOT, "client/src/lib/imageAssets.ts"), "utf8");
const caseDetails = fs.readFileSync(path.join(ROOT, "client/src/lib/caseDetails.ts"), "utf8");

const treatmentMapped = new Set(
  [...imageAssets.matchAll(/^\s+"([^"]+)": img\(F\./gm)].map((m) => m[1])
);

const treatmentRows = [];
for (const m of constants.matchAll(/image: treatmentImg\("([^"]+)"\)/g)) {
  const key = m[1];
  const local = treatmentMapped.has(key);
  treatmentRows.push({
    name: key,
    key,
    status: local ? "本地" : "placeholder",
    path: local ? `images/*/${key}` : "",
    fallback: local ? "" : "IMAGES.treatmentAmpule",
  });
}
for (const m of constants.matchAll(/name: "([^"]+)"[^}]*?\n  \},/gs)) {
  const block = m[0];
  if (block.includes("image:") || !m[1]) continue;
  if (/索夫波|乳暈|平胸|抽脂|私密雷射|醫學美容SPA/.test(m[1])) {
    treatmentRows.push({ name: m[1], key: m[1], status: "無圖", path: "", fallback: "" });
  }
}

const caseSlugs = [...caseDetails.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "images/cases/manifest.json"), "utf8")
);

function csv(rows, headers) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

fs.writeFileSync(
  path.join(ROOT, "treatment-image-audit.csv"),
  csv(treatmentRows, ["name", "key", "status", "path", "fallback"]),
  "utf8"
);

const caseRows = caseSlugs.map((slug) => ({
  slug,
  localCount: (manifest[slug] || []).length,
  status: (manifest[slug] || []).length ? "本地相簿" : "替代圖/素材",
}));

fs.writeFileSync(
  path.join(ROOT, "case-image-audit.csv"),
  csv(caseRows, ["slug", "localCount", "status"]),
  "utf8"
);

console.log(`Wrote treatment-image-audit.csv (${treatmentRows.length} rows)`);
console.log(`Wrote case-image-audit.csv (${caseRows.length} rows)`);
