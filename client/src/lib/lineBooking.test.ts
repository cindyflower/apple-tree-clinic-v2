import { describe, expect, it } from "vitest";
import { LINE_BY_APPLE } from "./constants";
import { resolveLineForBranch } from "./lineBooking";

describe("resolveLineForBranch", () => {
  it("routes Nanjing branch to Nanjing LINE page", () => {
    expect(resolveLineForBranch("南京旗艦院所")).toEqual(LINE_BY_APPLE.nanjing);
    expect(LINE_BY_APPLE.nanjing.lineUrl).toBe(
      "https://page.line.me/871wnsdk?oat_content=url&openQrModal=true",
    );
  });

  it("routes both Beida branches to Beida LINE page", () => {
    expect(resolveLineForBranch("北大診所")).toEqual(LINE_BY_APPLE.beida);
    expect(resolveLineForBranch("北大醫美")).toEqual(LINE_BY_APPLE.beida);
    expect(LINE_BY_APPLE.beida.lineUrl).toBe("https://page.line.me/274dtgel?openQrModal=true");
  });

  it("returns undefined for empty or unknown branches", () => {
    expect(resolveLineForBranch("")).toBeUndefined();
    expect(resolveLineForBranch("桃園藝文")).toBeUndefined();
  });
});
