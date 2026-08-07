import { describe, expect, it } from "vitest";
import { getClinicFromLineUrl, resolveLineButtonText, getPageContextLabel } from "./useGlobalTracking";

function fakeAnchor(attrs: Record<string, string> = {}): HTMLElement {
  return {
    getAttribute(name: string) {
      return attrs[name] ?? null;
    },
  } as HTMLElement;
}

describe("getClinicFromLineUrl", () => {
  it("maps Nanjing LINE URLs", () => {
    expect(getClinicFromLineUrl("https://page.line.me/871wnsdk?openQrModal=true")).toBe("南京旗艦");
    expect(getClinicFromLineUrl("https://lin.ee/vvMGVlN")).toBe("南京旗艦");
  });

  it("maps Beida LINE URLs", () => {
    expect(getClinicFromLineUrl("https://page.line.me/274dtgel?openQrModal=true")).toBe("北大");
    expect(getClinicFromLineUrl("https://lin.ee/aNqmtP7")).toBe("北大");
  });

  it("returns 未指定 for unknown URLs", () => {
    expect(getClinicFromLineUrl("https://example.com")).toBe("未指定");
  });
});

describe("getPageContextLabel", () => {
  it("extracts treatment/case/doctor slugs", () => {
    expect(getPageContextLabel("/treatment/picosure-755")).toBe("療程:picosure-755");
    expect(getPageContextLabel("/case/eyebag-male")).toBe("案例:eyebag-male");
    expect(getPageContextLabel("/doctor/jason")).toBe("醫師:jason");
  });
});

describe("resolveLineButtonText", () => {
  it("prefers data-track-button", () => {
    const el = fakeAnchor({ "data-track-button": "南京旗艦｜LINE 預約｜Navbar" });
    expect(resolveLineButtonText(el, "LINE 預約", "Navbar", "南京旗艦")).toBe(
      "南京旗艦｜LINE 預約｜Navbar",
    );
  });

  it("falls back to aria-label", () => {
    const el = fakeAnchor({ "aria-label": "北大診所 LINE 預約" });
    expect(resolveLineButtonText(el, "LINE 預約", "兩顆蘋果", "北大")).toBe("北大診所 LINE 預約");
  });

  it("produces distinct button_text for Nanjing vs Beida and detail pages", () => {
    const el = fakeAnchor();
    const samples = [
      resolveLineButtonText(el, "LINE 預約", "兩顆蘋果", "南京旗艦"),
      resolveLineButtonText(el, "LINE 預約", "兩顆蘋果", "北大"),
      resolveLineButtonText(fakeAnchor({ "data-track-button": "南京旗艦｜LINE 預約｜Navbar" }), "南京 LINE", "Navbar", "南京旗艦"),
      resolveLineButtonText(el, "LINE 立即預約", "unknown", "南京旗艦", "療程:picosure-755"),
      resolveLineButtonText(el, "LINE 立即預約", "unknown", "南京旗艦", "療程:ultrasound-lifting"),
      resolveLineButtonText(el, "LINE 立即預約", "unknown", "南京旗艦", "案例:eyebag-male"),
    ];
    expect(new Set(samples).size).toBe(samples.length);
  });
});
