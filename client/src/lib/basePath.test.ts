import { describe, expect, it } from "vitest";
import { normalizeRouterPath, toRouterPath } from "./basePath";

describe("normalizeRouterPath", () => {
  it("keeps root as /", () => {
    expect(normalizeRouterPath("/")).toBe("/");
    expect(normalizeRouterPath("")).toBe("/");
  });

  it("adds leading slash for wouter-relative paths", () => {
    expect(normalizeRouterPath("face-test")).toBe("/face-test");
  });

  it("strips trailing slashes from Cloudflare Pages URLs", () => {
    expect(normalizeRouterPath("face-test/")).toBe("/face-test");
    expect(normalizeRouterPath("/face-test/")).toBe("/face-test");
    expect(normalizeRouterPath("/xuyan-ai/")).toBe("/xuyan-ai");
  });
});

describe("toRouterPath", () => {
  it("strips leading and trailing slashes for wouter navigate()", () => {
    expect(toRouterPath("/face-test/")).toBe("face-test");
    expect(toRouterPath("/face-test")).toBe("face-test");
  });
});
