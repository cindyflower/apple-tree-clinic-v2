import { describe, expect, it } from "vitest";
import {
  createLeadId,
  getStoredAttribution,
  initializeAttribution,
  parseAttributionParams,
} from "./attribution";

class MemoryStorage implements Pick<Storage, "getItem" | "setItem"> {
  private readonly values = new Map<string, string>();
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

describe("parseAttributionParams", () => {
  it("captures supported UTM and ad click identifiers", () => {
    const result = parseAttributionParams(
      "https://www.drappletree.com.tw/treatment/picosure-755?utm_source=google&utm_medium=cpc&utm_campaign=picosure&utm_content=rsa-a&utm_term=755%20%E7%9A%AE%E7%A7%92&gclid=test-gclid&gbraid=test-gbraid&wbraid=test-wbraid",
    );

    expect(result).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "picosure",
      utm_content: "rsa-a",
      utm_term: "755 皮秒",
      gclid: "test-gclid",
      gbraid: "test-gbraid",
      wbraid: "test-wbraid",
    });
  });

  it("trims control characters and caps every parameter length", () => {
    const result = parseAttributionParams(
      `https://example.com/?utm_source=${encodeURIComponent(`  google\n${"x".repeat(500)}`)}&gclid=${"g".repeat(500)}`,
    );
    expect(result.utm_source).not.toMatch(/[\u0000-\u001f\u007f]/);
    expect(result.utm_source?.length).toBeLessThanOrEqual(200);
    expect(result.gclid?.length).toBeLessThanOrEqual(200);
  });
});

describe("createLeadId", () => {
  it("creates a stable-format non-PII identifier", () => {
    expect(createLeadId(() => "fixed-random")).toMatch(/^lead_\d+_fixed-random$/);
  });
});

describe("attribution storage", () => {
  it("keeps one lead id across visits and updates the last paid source", () => {
    const storage = new MemoryStorage();
    const first = initializeAttribution(
      "https://www.drappletree.com.tw/?utm_source=line&utm_campaign=awareness",
      storage,
      () => "lead-random",
      () => "2026-07-18T01:00:00.000Z",
    );
    const second = initializeAttribution(
      "https://www.drappletree.com.tw/?utm_source=google&gclid=g-123",
      storage,
      () => "should-not-be-used",
      () => "2026-07-18T02:00:00.000Z",
    );

    expect(second.lead_id).toBe(first.lead_id);
    expect(second.first_touch).toMatchObject({ utm_source: "line", utm_campaign: "awareness" });
    expect(second.last_touch).toMatchObject({ utm_source: "google", gclid: "g-123" });
  });

  it("rejects malformed persisted schemas instead of trusting a type assertion", () => {
    const storage = new MemoryStorage();
    storage.setItem("appletree_attribution_v1", JSON.stringify({ lead_id: 123, first_touch: "bad" }));
    expect(getStoredAttribution(storage)).toBeUndefined();
  });

  it("does not throw when storage reads or writes are blocked", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(() =>
      initializeAttribution("https://example.com/?utm_source=google", blocked, () => "id"),
    ).not.toThrow();
    expect(getStoredAttribution(blocked)).toBeUndefined();
  });
});
