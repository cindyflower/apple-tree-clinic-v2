#!/usr/bin/env node
/** Scrape wp-content image URLs from old site pages */
const urls = process.argv.slice(2);
if (!urls.length) {
  console.error("Usage: node scrape-page-images.mjs <url>...");
  process.exit(1);
}

for (const url of urls) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await r.text();
  const imgs = [
    ...html.matchAll(
      /https:\/\/www\.drappletree\.com\.tw\/wp-content\/uploads\/[^"'\s\\>]+\.(?:jpg|jpeg|png|webp)/gi
    ),
  ].map((m) => m[0].replace(/\\u0026/g, "&"));
  const uniq = [...new Set(imgs)];
  console.log(`\n=== ${url} (${r.status}) ${uniq.length} images ===`);
  uniq.forEach((u) => console.log(u));
}
