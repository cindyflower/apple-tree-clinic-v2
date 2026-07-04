/**
 * Generate sitemap.xml and robots.txt for the deployed site.
 * Run: GITHUB_PAGES=true VITE_SITE_URL=https://cindyflower.github.io node scripts/generate-sitemap.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, resolveSiteConfig } from "../shared/siteConfig.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "client/public");
const config = resolveSiteConfig();
const today = new Date().toISOString().slice(0, 10);

function readSlugs(file) {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  return [...text.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
}

function urlEntry(route, { changefreq, priority, lastmod = today }) {
  return `  <url>
    <loc>${absoluteUrl(route, config)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const treatmentSlugs = readSlugs("client/src/lib/treatmentDetails.ts");
const caseSlugs = readSlugs("client/src/lib/caseDetails.ts");
const doctorSlugs = readSlugs("client/src/lib/doctorDetails.ts");

const entries = [
  urlEntry("/", { changefreq: "weekly", priority: "1.0" }),
  urlEntry("/face-test", { changefreq: "monthly", priority: "0.7" }),
  urlEntry("/xuyan-ai", { changefreq: "monthly", priority: "0.7" }),
  ...treatmentSlugs.map((slug) =>
    urlEntry(`/treatment/${slug}`, { changefreq: "monthly", priority: "0.8" })
  ),
  ...caseSlugs.map((slug) =>
    urlEntry(`/case/${slug}`, { changefreq: "monthly", priority: "0.6" })
  ),
  ...doctorSlugs.map((slug) =>
    urlEntry(`/doctor/${slug}`, { changefreq: "monthly", priority: "0.7", lastmod: "2026-05-21" })
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

const disallowPrefix = config.basePath || "";
const robots = `User-agent: *
Allow: /
Disallow: ${disallowPrefix}/404
Disallow: ${disallowPrefix}/face-result
Disallow: /wp-admin/
Disallow: /wp-content/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /wp-cron.php
Disallow: /xmlrpc.php
Disallow: /wp-json/
Disallow: /?p=*
Disallow: /category/
Disallow: /tag/
Disallow: /feed/
Disallow: /author/
Disallow: /.env

Sitemap: ${absoluteUrl("/sitemap.xml", config)}
`;

fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(PUBLIC, "robots.txt"), robots);

console.log(`Wrote sitemap (${entries.length} URLs) and robots.txt for ${config.siteBase}/`);
