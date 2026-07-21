import { describe, expect, it } from "vitest";
import { getCaseBySlug } from "./caseDetails";

describe("getCaseBySlug", () => {
  it("resolves slugs with trailing slashes (Cloudflare Pages URLs)", () => {
    expect(getCaseBySlug("double-eyelid")).toBeDefined();
    expect(getCaseBySlug("double-eyelid/")).toBeDefined();
    expect(getCaseBySlug("double-eyelid")?.slug).toBe("double-eyelid");
  });
});
