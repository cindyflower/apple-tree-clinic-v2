import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "./leadSubmission";

const payload = { lead_id: "lead-1", name: "王小姐", phone: "0900000000" };

afterEach(() => vi.useRealTimers());

describe("submitLead", () => {
  it("does not pretend to submit when no endpoint is configured", async () => {
    const fetcher = vi.fn();
    expect(await submitLead("", payload, fetcher)).toEqual({ ok: false, reason: "not_configured" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each([
    "https://example.com/api/leads",
    "//example.com/api/leads",
    "/api/leads?token=secret",
    "/api/leads#fragment",
    "/other/path",
  ])("rejects unsafe or non-canonical endpoint %s", async (endpoint) => {
    const fetcher = vi.fn();
    expect(await submitLead(endpoint, payload, fetcher)).toEqual({ ok: false, reason: "invalid_endpoint" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("reports success only for an explicit matching acknowledgement", async () => {
    const fetcher = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ accepted: true, lead_id: "lead-1" }),
    });
    expect(await submitLead("/api/leads", payload, fetcher)).toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it.each([
    { ok: true, json: async () => ({ accepted: false, lead_id: "lead-1" }) },
    { ok: true, json: async () => ({ accepted: true, lead_id: "different" }) },
    { ok: true, json: async () => ({ accepted: true }) },
    { ok: false, json: async () => ({ accepted: true, lead_id: "lead-1" }) },
  ])("rejects missing, mismatched, or unsuccessful acknowledgements", async (response) => {
    expect(await submitLead("/api/leads", payload, vi.fn().mockResolvedValue(response))).toEqual({
      ok: false,
      reason: "request_failed",
    });
  });

  it("aborts a request after the timeout", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn((_input, init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
      }),
    );
    const pending = submitLead("/api/leads", payload, fetcher, 25);
    await vi.advanceTimersByTimeAsync(25);
    await expect(pending).resolves.toEqual({ ok: false, reason: "request_failed" });
    expect(fetcher.mock.calls[0][1].signal.aborted).toBe(true);
  });
});
