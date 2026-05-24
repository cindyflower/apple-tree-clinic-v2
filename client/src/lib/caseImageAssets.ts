/**
 * Case detail page images: /images/cases/{slug}/…
 * Filenames are ASCII (cover.jpg, 02.jpg) for reliable static hosting.
 * Synced from images/cases/ on dev/build (vitePluginSyncTreatmentImages).
 */
import { withBase } from "./basePath";
import { IMAGES } from "./imageAssets";

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
  "rosacea-gut": ["cover.png", "02.png", "03.jpg"],
  "sensitive-skin-inflammation": ["cover.jpg", "02.jpg", "03.jpg", "04.jpg"],
  "menopause-hormone": ["cover.jpg", "02.jpg", "03.jpg"],
  "fatigue-face-stress": ["cover.jpg", "02.jpg", "03.jpg"],
};

export function caseGallery(slug: string): string[] {
  const files = GALLERY_FILES[slug];
  if (files?.length) return files.map((f) => caseImg(slug, f));
  return [IMAGES.caseBannerBeauty];
}

export function caseMainImage(slug: string): string {
  return caseGallery(slug)[0];
}
