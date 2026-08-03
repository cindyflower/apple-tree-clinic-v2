/**
 * Prerender SPA routes as static index.html files (HTTP 200 for deep links).
 * Run after vite build: node scripts/prerender-spa-routes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveSiteConfig } from "../shared/siteConfig.mjs";
import { listPrerenderRoutes, patchHtmlMeta } from "./lib/seoRoutes.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "dist/public");
const config = resolveSiteConfig();
const templatePath = path.join(OUT, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("Missing dist/public/index.html — run vite build first.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const routes = listPrerenderRoutes(ROOT, config);
let written = 0;

for (const route of routes) {
  if (route.path === "/") continue;

  const dir = path.join(OUT, route.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    patchHtmlMeta(template, route, config)
  );
  written += 1;
}

console.log(
  `Prerendered ${written} SPA routes under dist/public/ (${config.siteBase}/)`
);
