import { describe, expect, it, vi } from "vitest";
import { getMarketingConsent, setMarketingConsent } from "./marketingConsent";

describe("marketing consent storage", () => {
  it("accepts only the two known consent choices", () => {
    expect(getMarketingConsent({ getItem: () => "accepted" })).toBe("accepted");
    expect(getMarketingConsent({ getItem: () => "rejected" })).toBe("rejected");
    expect(getMarketingConsent({ getItem: () => "tampered" })).toBeUndefined();
  });

  it("fails safely when consent storage is blocked", () => {
    const blocked = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    expect(getMarketingConsent(blocked)).toBeUndefined();
    expect(() => setMarketingConsent("accepted", blocked)).not.toThrow();
  });

  it("stores only the strictly necessary consent choice", () => {
    const setItem = vi.fn();
    setMarketingConsent("rejected", { getItem: vi.fn(), setItem });
    expect(setItem).toHaveBeenCalledWith("appletree_marketing_consent_v1", "rejected");
  });
});
