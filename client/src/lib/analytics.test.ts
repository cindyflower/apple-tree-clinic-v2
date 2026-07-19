import { beforeEach, describe, expect, it, vi } from "vitest";

const values = new Map<string, string>();
const localStorage = {
  getItem: vi.fn((key: string) => values.get(key) ?? null),
  setItem: vi.fn((key: string, value: string) => values.set(key, value)),
};

beforeEach(() => {
  values.clear();
  vi.clearAllMocks();
  Object.defineProperty(globalThis, "navigator", { value: { userAgent: "test" }, configurable: true });
  Object.assign(globalThis, {
    document: { title: "Test" },
    window: {
      location: { href: "https://example.com/", pathname: "/" },
      localStorage,
      dataLayer: [],
    },
  });
});

describe("analytics event transport", () => {
  it("emits events without requiring a stored marketing-consent choice", async () => {
    const { trackLeadCompleted } = await import("./analytics");
    const gtag = vi.fn();
    Object.assign(window, { __marketingMode: "direct", gtag });
    trackLeadCompleted();
    expect(gtag).toHaveBeenCalledTimes(1);
    expect((window as any).dataLayer).toHaveLength(0);
  });

  it("uses gtag only in direct mode", async () => {
    values.set("appletree_marketing_consent_v1", "accepted");
    const { trackLeadCompleted } = await import("./analytics");
    const gtag = vi.fn();
    Object.assign(window, { __marketingMode: "direct", gtag });
    trackLeadCompleted();
    expect(gtag).toHaveBeenCalledTimes(1);
    expect((window as any).dataLayer).toHaveLength(0);
  });

  it("uses dataLayer only in GTM mode", async () => {
    values.set("appletree_marketing_consent_v1", "accepted");
    const { trackLeadCompleted } = await import("./analytics");
    const gtag = vi.fn();
    Object.assign(window, { __marketingMode: "gtm", gtag });
    trackLeadCompleted();
    expect(gtag).not.toHaveBeenCalled();
    expect((window as any).dataLayer).toHaveLength(1);
    expect((window as any).dataLayer[0]).toMatchObject({ event: "lead_completed" });
  });
});
