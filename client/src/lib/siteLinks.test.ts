import { describe, expect, it } from "vitest";
import { CASE_DETAILS } from "./caseDetails";
import { getDoctorBySlug } from "./doctorDetails";
import { TREATMENT_DETAILS } from "./treatmentDetails";
import { UNIQUE_VIDEOS } from "./videoData";
import { getTreatmentSlug } from "./treatmentSlugMap";
import { toRouterPath } from "./basePath";

const TREATMENT_SLUGS = new Set(TREATMENT_DETAILS.map((t) => t.slug));
const CASE_SLUGS = new Set(CASE_DETAILS.map((c) => c.slug));
const DOCTOR_SLUGS = new Set(["meng-xiangyue"].filter((slug) => getDoctorBySlug(slug)));

const FOOTER_POPULAR_TREATMENT_HREFS = [
  "/treatment/picosure-755",
  "/treatment/ultrasound-lifting",
  "/treatment/thermage-flx",
  "/treatment/hyaluronic-acid",
  "/treatment/botox",
  "/treatment/aesthefill",
  "/treatment/water-glow",
];

const APP_ROUTE_PATTERNS = [
  /^\/$/,
  /^\/face-test$/,
  /^\/face-result(\?.*)?$/,
  /^\/xuyan-ai(#.*)?$/,
  /^\/treatment\/[^/]+$/,
  /^\/case\/[^/]+$/,
  /^\/doctor\/[^/]+$/,
  /^\/#[-a-z0-9]+$/,
];

function extractSlug(href: string, prefix: string): string {
  return href.slice(prefix.length + 1).replace(/\/+$/, "");
}

describe("site internal links", () => {
  it("footer popular treatments resolve to valid treatment pages", () => {
    for (const href of FOOTER_POPULAR_TREATMENT_HREFS) {
      const slug = extractSlug(href, "/treatment");
      expect(TREATMENT_SLUGS.has(slug), `missing treatment slug: ${slug}`).toBe(true);
    }
  });

  it("all case slugs are unique and non-empty", () => {
    expect(CASE_SLUGS.size).toBe(CASE_DETAILS.length);
    for (const slug of CASE_SLUGS) {
      expect(slug.length).toBeGreaterThan(0);
    }
  });

  it("all doctor slugs resolve", () => {
    for (const slug of DOCTOR_SLUGS) {
      expect(slug.length).toBeGreaterThan(0);
    }
  });

  it("video relatedTreatments only reference valid treatment slugs", () => {
    const invalid: string[] = [];
    for (const video of UNIQUE_VIDEOS) {
      for (const slug of video.relatedTreatments) {
        if (!TREATMENT_SLUGS.has(slug)) {
          invalid.push(`${video.id}:${slug}`);
        }
      }
    }
    expect(invalid, invalid.join(", ")).toEqual([]);
  });

  it("treatmentSlugMap values resolve to valid treatment pages", () => {
    const names = [
      "PicoSure 755 皮秒蜂巢雷射",
      "肉毒桿菌",
      "雙眼皮手術",
      "Wegovy 週纖達",
      "Talent-A 動磁波",
    ];
    for (const name of names) {
      const slug = getTreatmentSlug(name);
      if (slug) expect(TREATMENT_SLUGS.has(slug), name).toBe(true);
    }
  });

  it("toRouterPath uses absolute paths on root deploy for nested routes", () => {
    expect(toRouterPath("/case/eyebag-male")).toBe("~/case/eyebag-male");
    expect(toRouterPath("/treatment/botox")).toBe("~/treatment/botox");
    expect(toRouterPath("/face-result?primary=type1")).toBe("~/face-result?primary=type1");
  });

  it("nested route navigations do not double path segments", () => {
    const paths = [
      "/case/eyebag-male",
      "/case/double-eyelid",
      "/treatment/picosure-755",
      "/doctor/meng-xiangyue",
      "/face-test",
      "/xuyan-ai",
    ];
    for (const href of paths) {
      const routerPath = toRouterPath(href);
      expect(routerPath.startsWith("~/"), href).toBe(true);
      expect(routerPath.includes("/case/case/"), href).toBe(false);
      expect(routerPath.includes("/treatment/treatment/"), href).toBe(false);
    }
  });
});

describe("internal href patterns", () => {
  it("matches known app route shapes", () => {
    const hrefs = [
      "/",
      "/face-test",
      "/face-result?primary=a",
      "/xuyan-ai",
      "/treatment/botox",
      "/case/double-eyelid",
      "/doctor/meng-xiangyue",
      "/#cases",
    ];
    for (const href of hrefs) {
      const ok = APP_ROUTE_PATTERNS.some((re) => re.test(href));
      expect(ok, href).toBe(true);
    }
  });
});
