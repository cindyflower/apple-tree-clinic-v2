export const MARKETING_CONSENT_STORAGE_KEY = "appletree_marketing_consent_v1";

export type MarketingConsent = "accepted" | "rejected";
type ConsentStorage = Pick<Storage, "getItem" | "setItem">;

function defaultStorage(): ConsentStorage | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

export function getMarketingConsent(storage: Pick<Storage, "getItem"> | undefined = defaultStorage()): MarketingConsent | undefined {
  if (!storage) return undefined;
  try {
    const value = storage.getItem(MARKETING_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : undefined;
  } catch {
    return undefined;
  }
}

export function setMarketingConsent(
  choice: MarketingConsent,
  storage: ConsentStorage | undefined = defaultStorage(),
): void {
  try {
    storage?.setItem(MARKETING_CONSENT_STORAGE_KEY, choice);
  } catch {
    // Consent UI remains usable even when browser storage is unavailable.
  }
}

export function hasMarketingConsent(): boolean {
  return getMarketingConsent() === "accepted";
}
