/**
 * Case detail page images: /images/cases/{slug}/…
 * Filenames are ASCII (cover.jpg, 02.jpg) for reliable static hosting.
 * Synced from images/cases/ on dev/build (vitePluginSyncTreatmentImages).
 */
import { withBase } from "./basePath";
import { img, F, IMAGES } from "./imageAssets";

export function caseImg(slug: string, filename: string): string {
  return withBase(`/images/cases/${slug}/${filename}`);
}

/** Gallery filenames per slug (see images/cases/manifest.json) */
const GALLERY_FILES: Record<string, readonly string[]> = {
  "hydrafacial-male": ["cover.jpg"],
  "eyebag-male": ["cover.jpg"],
  "double-eyelid": ["cover.jpg"],
  aesthefill: [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
  ],
  "talent-a-abs": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
  ],
  "talent-a-hip": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
  ],
  "talent-a-arm": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
  ],
  "talent-a-abs-kol": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
  ],
  "talent-a-belly": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
  ],
  "v-face-queen": ["cover.jpg"],
  "picosure-case": [
    "cover.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.png",
    "07.jpg",
    "08.jpg",
  ],
  "ha-tear-trough": [
    "cover.jpg",
    "02.png",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
  ],
};

/** Slugs with no downloaded assets — use Manus pack / clinic imagery */
const FALLBACK_GALLERY: Record<string, readonly string[]> = {
  "rosacea-gut": [img(F.functional, "腸道菌叢分析.jpg")],
  "menopause-hormone": [img(F.functional, "3DMRA檢測.jpg"), img(F.functional, "HRV自律神經分析.jpg")],
  "sensitive-skin-inflammation": [img(F.skin, "AI光譜治療.jpg"), img(F.functional, "腸道菌叢分析.jpg")],
  "fatigue-face-stress": [img(F.functional, "腦波檢測.jpg"), img(F.happy, "快樂門診.jpg")],
};

export function caseGallery(slug: string): string[] {
  const files = GALLERY_FILES[slug];
  if (files?.length) return files.map((f) => caseImg(slug, f));
  return [...(FALLBACK_GALLERY[slug] ?? [IMAGES.caseBannerBeauty])];
}

export function caseMainImage(slug: string): string {
  return caseGallery(slug)[0];
}
