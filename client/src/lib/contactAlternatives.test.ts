import { describe, expect, it } from "vitest";
import { BRAND, LINE_BY_APPLE, LOCATIONS } from "./constants";

describe("visible contact alternatives", () => {
  it("keeps both LINE links as working page.line.me HTTPS URLs", () => {
    expect(Object.values(LINE_BY_APPLE).map((line) => line.lineUrl)).toEqual([
      "https://page.line.me/871wnsdk?oat_content=url&openQrModal=true",
      "https://page.line.me/274dtgel?openQrModal=true",
    ]);
  });

  it("keeps every displayed phone number as a valid dialable tel link", () => {
    expect([BRAND.phoneLink, ...LOCATIONS.map((location) => location.phoneLink)]).toEqual([
      "tel:+886227163535",
      "tel:+886227163535",
      "tel:+886286720222",
      "tel:+886286720608",
    ]);
  });
});
