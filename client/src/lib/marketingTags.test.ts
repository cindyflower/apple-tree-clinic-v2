import { describe, expect, it } from "vitest";
import { renderMarketingTags } from "../../../shared/marketingTags.mjs";

function combined(env: Record<string, string> = {}) {
  const tags = renderMarketingTags(env);
  return `${tags.head}${tags.bodyStart}${tags.bodyEnd}`;
}

describe("renderMarketingTags", () => {
  it("renders no tracking network references when ids are missing", () => {
    const html = combined();
    expect(html).not.toMatch(/googletagmanager|google-analytics|connect\.facebook|line-scdn|tr\.line\.me/i);
  });

  it("loads a valid GTM container immediately without a consent gate", () => {
    const html = combined({ VITE_GTM_CONTAINER_ID: "GTM-ABC1234" });
    expect(html).toContain("GTM-ABC1234");
    expect(html).toContain("googletagmanager.com/gtm.js");
    expect(html).toContain("googletagmanager.com/ns.html?id=GTM-ABC1234");
    expect(html).not.toContain("appletree_marketing_consent_v1");
    expect(html).not.toMatch(/<script[^>]+src=/i);
  });

  it("injects GTM head script and body noscript for container GTM-NGGPZKBB", () => {
    const tags = renderMarketingTags({ VITE_GTM_CONTAINER_ID: "GTM-NGGPZKBB" });
    expect(tags.head).toContain("GTM-NGGPZKBB");
    expect(tags.head).toContain("googletagmanager.com/gtm.js");
    expect(tags.bodyStart).toContain("googletagmanager.com/ns.html?id=GTM-NGGPZKBB");
  });

  it("prefers one GTM container and avoids duplicate direct ids", () => {
    const html = combined({
      VITE_GTM_CONTAINER_ID: "GTM-ABC1234",
      VITE_GA_MEASUREMENT_ID: "G-ABC1234567",
      VITE_GOOGLE_ADS_ID: "AW-123456789",
    });
    expect(html).toContain("GTM-ABC1234");
    expect(html).not.toContain("G-ABC1234567");
    expect(html).not.toContain("AW-123456789");
    expect(html).toContain('__marketingMode="gtm"');
  });

  it("uses direct mode only when GTM is not configured", () => {
    const html = combined({
      VITE_GA_MEASUREMENT_ID: "G-ABC1234567",
      VITE_GOOGLE_ADS_ID: "AW-123456789",
      VITE_META_PIXEL_ID: "123456789012345",
      VITE_LINE_TAG_ID: "11111111-2222-3333-4444-555555555555",
    });
    expect(html).toContain('__marketingMode="direct"');
    expect(html).toContain("G-ABC1234567");
    expect(html).toContain("AW-123456789");
    expect(html).toContain("123456789012345");
    expect(html).toContain("11111111-2222-3333-4444-555555555555");
  });

  it("injects Meta Pixel even when GTM is configured", () => {
    const html = combined({
      VITE_GTM_CONTAINER_ID: "GTM-ABC1234",
      VITE_META_PIXEL_ID: "1711029540139618",
    });
    expect(html).toContain("GTM-ABC1234");
    expect(html).toContain("1711029540139618");
    expect(html).toContain("connect.facebook.net");
    expect(html).toContain("fbq('init'");
  });

  it("rejects malformed ids instead of injecting them into HTML", () => {
    expect(combined({ VITE_GTM_CONTAINER_ID: "<script>alert(1)</script>" })).not.toContain("alert(1)");
  });
});
