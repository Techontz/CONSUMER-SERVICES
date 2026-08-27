import { NextResponse } from "next/server";

/**
 * Forwards a validated submission to the Laravel API.
 *
 * The browser never calls Laravel directly. This handler is the only place
 * the API key exists, and it is the last line before the network — the
 * Laravel side validates everything again.
 */
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

/** Rejects obvious bots before a request ever leaves this process. */
export function looksAutomated(body: Record<string, unknown>) {
  // Honeypot filled.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return true;
  }
  // Submitted implausibly fast for a form a human just read.
  const elapsed = Number(body.elapsed);
  if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2500) {
    return true;
  }
  return false;
}

export async function forward(
  endpoint: string,
  payload: Record<string, unknown>,
  ip: string | null,
) {
  if (!API_URL || !API_KEY) {
    console.error(
      "[forward] API_URL or API_KEY is not configured; refusing to drop a submission.",
    );
    return NextResponse.json(
      {
        message:
          "The inquiry service is not available right now. Please email us directly and we will pick it up.",
      },
      { status: 503 },
    );
  }

  // Never forward the anti-spam fields — they are ours, not the record's.
  const { website: _w, elapsed: _e, ...clean } = payload;
  void _w;
  void _e;

  try {
    const res = await fetch(new URL(endpoint, API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Api-Key": API_KEY,
        ...(ip ? { "X-Forwarded-For": ip } : {}),
      },
      body: JSON.stringify(clean),
      // A form post should fail fast rather than hang the button.
      signal: AbortSignal.timeout(12_000),
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[forward] upstream request failed", error);
    return NextResponse.json(
      {
        message:
          "We could not deliver your message just now. Please try again shortly, or email us directly.",
      },
      { status: 502 },
    );
  }
}

/** Best-effort client IP, for the API's rate limiter. */
export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip");
}
