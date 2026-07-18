const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "li_fat_id",
] as const;

const MAX_ATTRIBUTION_VALUE_LENGTH = 200;
const ATTRIBUTION_STORAGE_KEY = "appletree_attribution_v1";

export type AttributionParams = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;
export type AttributionState = {
  lead_id: string;
  first_touch: AttributionParams;
  last_touch: AttributionParams;
  created_at: string;
  updated_at: string;
};

type StorageLike = Pick<Storage, "getItem" | "setItem">;

function sanitizeValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const clean = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_ATTRIBUTION_VALUE_LENGTH);
  return clean || undefined;
}

function sanitizeParams(value: unknown): AttributionParams | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const result: AttributionParams = {};
  for (const key of ATTRIBUTION_KEYS) {
    const clean = sanitizeValue((value as Record<string, unknown>)[key]);
    if (clean) result[key] = clean;
  }
  return result;
}

function validateState(value: unknown): AttributionState | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const candidate = value as Record<string, unknown>;
  const leadId = sanitizeValue(candidate.lead_id);
  const firstTouch = sanitizeParams(candidate.first_touch);
  const lastTouch = sanitizeParams(candidate.last_touch);
  const createdAt = sanitizeValue(candidate.created_at);
  const updatedAt = sanitizeValue(candidate.updated_at);
  if (!leadId?.startsWith("lead_") || !firstTouch || !lastTouch || !createdAt || !updatedAt) return undefined;
  if (Number.isNaN(Date.parse(createdAt)) || Number.isNaN(Date.parse(updatedAt))) return undefined;
  return { lead_id: leadId, first_touch: firstTouch, last_touch: lastTouch, created_at: createdAt, updated_at: updatedAt };
}

export function parseAttributionParams(url: string): AttributionParams {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return {};
  }
  const result: AttributionParams = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = sanitizeValue(parsed.searchParams.get(key));
    if (value) result[key] = value;
  }
  return result;
}

export function createLeadId(random: () => string = () => crypto.randomUUID()): string {
  const safeRandom = sanitizeValue(random())?.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80) || "random";
  return `lead_${Date.now()}_${safeRandom}`;
}

export function getStoredAttribution(storage: Pick<Storage, "getItem">): AttributionState | undefined {
  try {
    const raw = storage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? validateState(JSON.parse(raw)) : undefined;
  } catch {
    return undefined;
  }
}

export function initializeAttribution(
  url: string,
  storage: StorageLike,
  random: () => string = () => crypto.randomUUID(),
  now: () => string = () => new Date().toISOString(),
): AttributionState {
  const currentTouch = parseAttributionParams(url);
  const timestamp = now();
  const existing = getStoredAttribution(storage);
  const state: AttributionState = existing
    ? {
        ...existing,
        last_touch: Object.keys(currentTouch).length ? currentTouch : existing.last_touch,
        updated_at: timestamp,
      }
    : {
        lead_id: createLeadId(random),
        first_touch: currentTouch,
        last_touch: currentTouch,
        created_at: timestamp,
        updated_at: timestamp,
      };

  try {
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Attribution is optional; blocked/quota-limited storage must not stop rendering.
  }
  return state;
}
