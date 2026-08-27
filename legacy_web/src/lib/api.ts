import type { FieldErrors } from "./forms";

/**
 * Posts to this app's own route handlers, which forward to the Laravel API.
 *
 * Nothing here talks to the backend directly: the API key lives only on the
 * server, so the browser never sees it.
 */
export type ApiResult =
  | { ok: true; reference?: string }
  | { ok: false; message: string; fields?: FieldErrors };

export async function postJson(
  path: string,
  body: unknown,
): Promise<ApiResult> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      reference?: string;
      errors?: Record<string, string[]>;
    };

    if (res.ok) return { ok: true, reference: data.reference };

    // Laravel returns 422 with an `errors` bag keyed by field.
    if (res.status === 422 && data.errors) {
      const fields: FieldErrors = {};
      for (const [k, v] of Object.entries(data.errors)) {
        if (v?.[0]) fields[k] = v[0];
      }
      return {
        ok: false,
        message: "Please review the highlighted fields.",
        fields,
      };
    }

    if (res.status === 429) {
      return {
        ok: false,
        message:
          "That’s several submissions in a short time. Please wait a moment and try again.",
      };
    }

    return {
      ok: false,
      message:
        data.message ??
        "We could not send your message just now. Please try again, or email us directly.",
    };
  } catch {
    return {
      ok: false,
      message:
        "We could not reach the server. Check your connection and try again, or email us directly.",
    };
  }
}
