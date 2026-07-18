import fs from "node:fs";
import { describe, expect, it } from "vitest";

describe("Vite environment loading", () => {
  it("loads mode-specific .env values and lets process.env override CI values", () => {
    const source = fs.readFileSync(new URL("../../../vite.config.ts", import.meta.url), "utf8");
    expect(source).toContain('loadEnv(mode, process.cwd(), "")');
    expect(source).toMatch(/\{\s*\.\.\.fileEnv,\s*\.\.\.process\.env\s*\}/);
  });
});
