type FetchResponse = {
  ok: boolean;
  json: () => Promise<unknown>;
};

type FetchInit = {
  method: string;
  headers: Record<string, string>;
  body: string;
  credentials: "same-origin";
  signal: AbortSignal;
};

type FetchLike = (input: string, init: FetchInit) => Promise<FetchResponse>;

export type LeadPayload = Record<string, string | number | boolean | null | undefined> & { lead_id: string };
type SubmissionResult = { ok: true } | { ok: false; reason: "not_configured" | "invalid_endpoint" | "request_failed" };

function isAllowedEndpoint(endpoint: string): boolean {
  return endpoint === "/api/leads";
}

export async function submitLead(
  endpoint: string,
  payload: LeadPayload,
  fetcher: FetchLike = fetch,
  timeoutMs = 10_000,
): Promise<SubmissionResult> {
  if (!endpoint) return { ok: false, reason: "not_configured" };
  if (!isAllowedEndpoint(endpoint)) return { ok: false, reason: "invalid_endpoint" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, reason: "request_failed" };
    const acknowledgement = await response.json();
    if (
      !acknowledgement ||
      typeof acknowledgement !== "object" ||
      (acknowledgement as Record<string, unknown>).accepted !== true ||
      (acknowledgement as Record<string, unknown>).lead_id !== payload.lead_id
    ) {
      return { ok: false, reason: "request_failed" };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "request_failed" };
  } finally {
    clearTimeout(timeout);
  }
}
