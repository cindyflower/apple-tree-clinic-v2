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
  it("uses wouter absolute paths on root deploy to avoid nested relative URLs", () => {
    expect(toRouterPath("/face-test/")).toBe("~/face-test");
    expect(toRouterPath("/case/eyebag-male")).toBe("~/case/eyebag-male");
  });
});
