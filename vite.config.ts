import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { resolveSiteConfig, absoluteAssetUrl, DEFAULT_OG_IMAGE_PATH } from "./shared/siteConfig.mjs";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

/** Sync image pack (images/00_* … 17_*) → client/public/images for Vite */
function vitePluginSyncTreatmentImages(): Plugin {
  const srcRoot = path.join(PROJECT_ROOT, "images");
  const destRoot = path.join(PROJECT_ROOT, "client", "public", "images");

  const sync = () => {
    if (!fs.existsSync(srcRoot)) return;
    fs.mkdirSync(destRoot, { recursive: true });
    for (const name of fs.readdirSync(srcRoot)) {
      if (!/^\d{2}_/.test(name)) continue;
      const src = path.join(srcRoot, name);
      if (!fs.statSync(src).isDirectory()) continue;
      fs.cpSync(src, path.join(destRoot, name), { recursive: true, force: true });
    }
    const casesSrc = path.join(srcRoot, "cases");
    if (fs.existsSync(casesSrc)) {
      fs.cpSync(casesSrc, path.join(destRoot, "cases"), { recursive: true, force: true });
    }
    const destRootAssets = path.join(destRoot, "_root");
    fs.mkdirSync(destRootAssets, { recursive: true });
    for (const name of fs.readdirSync(srcRoot)) {
      const src = path.join(srcRoot, name);
      if (!fs.statSync(src).isFile()) continue;
      if (!/\.(jpe?g|png|webp|mp4)$/i.test(name)) continue;
      fs.copyFileSync(src, path.join(destRootAssets, name));
    }
  };

  const isUnderImages = (file: string) => {
    const rel = path.relative(srcRoot, file);
    return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
  };

  return {
    name: "sync-treatment-images",
    buildStart: sync,
    configureServer(server) {
      sync();

      server.watcher.add(srcRoot);

      let timer: ReturnType<typeof setTimeout> | undefined;
      const scheduleSync = (file: string) => {
        if (!isUnderImages(file)) return;
        clearTimeout(timer);
        timer = setTimeout(sync, 100);
      };

      server.watcher.on("add", scheduleSync);
      server.watcher.on("change", scheduleSync);
      server.watcher.on("unlink", scheduleSync);

      return () => {
        clearTimeout(timer);
        server.watcher.unwatch(srcRoot);
        server.watcher.off("add", scheduleSync);
        server.watcher.off("change", scheduleSync);
        server.watcher.off("unlink", scheduleSync);
      };
    },
  };
}

function vitePluginSiteUrl(): Plugin {
  return {
    name: "site-url",
    transformIndexHtml(html) {
      const config = resolveSiteConfig(process.env);
      const defaultOgImage = absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH, config);
      return html
        .replaceAll("__SITE_BASE__", config.siteBase)
        .replaceAll("__DEFAULT_OG_IMAGE__", defaultOgImage);
    },
  };
}

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  vitePluginSyncTreatmentImages(),
  vitePluginSiteUrl(),
  vitePluginManusRuntime(),
  vitePluginManusDebugCollector(),
];

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGitHubPages ? "/apple-tree-clinic-v2/" : "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
