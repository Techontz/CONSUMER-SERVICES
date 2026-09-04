import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { SubmitState } from "@/lib/forms";

/**
 * Success and failure states for both forms.
 *
 * On success the form is replaced entirely — there is nothing left to do
 * on it, and leaving a filled form on screen invites a second submission.
 */
export function SuccessPanel({
  headline,
  body,
  reference,
  dark = false,
}: {
  headline: string;
  body: string;
  reference?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border p-10 lg:p-12",
        dark
          ? "border-olive-500/40 bg-evergreen-700"
          : "border-olive-500/50 bg-ivory-200",
      )}
    >
      <span
        aria-hidden
        className="flex size-11 items-center justify-center rounded-full border border-olive-500 text-olive-600"
      >
        &#10003;
      </span>

      <h3
        className={cn(
          "u-display-4 mt-7",
          dark ? "text-ivory-100" : "text-evergreen-600",
        )}
      >
        {headline}
      </h3>

      <p
        className={cn(
          "mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.7]",
          dark ? "text-ivory-100/72" : "text-ink-700",
        )}
      >
        {body}
      </p>

      {reference ? (
        <p
          className={cn(
            "mt-6 text-[0.6875rem] uppercase tracking-[0.18em]",
            dark ? "text-ivory-100/60" : "text-ink-700",
          )}
        >
          Reference{" "}
          <span className={dark ? "text-olive-400" : "text-olive-700"}>
            {reference}
          </span>
        </p>
      ) : null}

      <p
        className={cn(
          "mt-8 border-t pt-6 text-sm",
          dark
            ? "border-ivory-100/15 text-ivory-100/60"
            : "border-rule text-ink-700",
        )}
      >
        Need to reach us sooner?{" "}
        <a
          href={site.phoneHref}
          className={cn(
            "u-underline",
            dark ? "text-olive-400" : "text-olive-700",
          )}
        >
          {site.phone}
        </a>{" "}
        ·{" "}
        <a
          href={`mailto:${site.email}`}
          className={cn(
            "u-underline break-all",
            dark ? "text-olive-400" : "text-olive-700",
          )}
        >
          {site.email}
        </a>
      </p>
    </div>
  );
}

export function ErrorNotice({ state }: { state: SubmitState }) {
  if (state.status !== "error") return null;
  return (
    <div
      role="alert"
      // Deep Evergreen, not the stock red this carried: red is not in the
      // approved palette, and a heavy brand-coloured bar against Warm Ivory
      // is at least as loud as the mid red was. The alert role and the
      // sentence itself are what actually carry the meaning.
      className="mb-8 border-l-2 border-evergreen-800 bg-evergreen-800/[0.06] px-6 py-4"
    >
      <p className="text-sm leading-relaxed text-ink-900">{state.message}</p>
    </div>
  );
}
