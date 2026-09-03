"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

// A colour-only focus cue is not enough on its own, so the control keeps a
// real focus ring. `outline-hidden` is deliberately absent here.
const control =
  "block w-full border bg-transparent px-4 py-3.5 text-[0.9375rem] text-ink-900 " +
  "placeholder:text-ink-300 transition-colors duration-300 " +
  "focus:border-olive-600 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-600";

const ok = "border-rule hover:border-ink-300";
const bad = "border-red-700/70 bg-red-50/40";

function Shell({
  id,
  label,
  optional,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // Column layout with the control pushed to the bottom, so fields sitting
    // side by side in a grid row keep their inputs aligned even when one
    // label wraps to a second line.
    <div className={cn("flex h-full flex-col", className)}>
      <label
        htmlFor={id}
        className="mb-2.5 flex items-baseline gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-evergreen-600"
      >
        {label}
        {optional ? (
          <span className="text-[0.6875rem] font-normal normal-case tracking-normal text-ink-500">
            (optional)
          </span>
        ) : null}
      </label>
      <div className="mt-auto">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[0.8125rem] leading-snug text-red-800"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Common = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
};

export function TextField({
  type = "text",
  autoComplete,
  ...p
}: Common & { type?: string; autoComplete?: string }) {
  const id = useId();
  return (
    <Shell
      id={id}
      label={p.label}
      optional={p.optional}
      error={p.error}
      className={p.className}
    >
      <input
        id={id}
        name={p.name}
        type={type}
        value={p.value}
        required={p.required}
        placeholder={p.placeholder}
        autoComplete={autoComplete}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={p.error ? `${id}-error` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        className={cn(control, p.error ? bad : ok)}
      />
    </Shell>
  );
}

export function TextArea({ rows = 5, ...p }: Common & { rows?: number }) {
  const id = useId();
  return (
    <Shell
      id={id}
      label={p.label}
      optional={p.optional}
      error={p.error}
      className={p.className}
    >
      <textarea
        id={id}
        name={p.name}
        rows={rows}
        value={p.value}
        required={p.required}
        placeholder={p.placeholder}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={p.error ? `${id}-error` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        className={cn(control, "leading-relaxed", p.error ? bad : ok)}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  placeholder = "Select one",
  ...p
}: Common & { options: readonly string[] }) {
  const id = useId();
  return (
    <Shell
      id={id}
      label={p.label}
      optional={p.optional}
      error={p.error}
      className={p.className}
    >
      <div className="relative">
        <select
          id={id}
          name={p.name}
          value={p.value}
          required={p.required}
          aria-invalid={p.error ? true : undefined}
          aria-describedby={p.error ? `${id}-error` : undefined}
          onChange={(e) => p.onChange(e.target.value)}
          className={cn(
            control,
            "cursor-pointer appearance-none pr-11",
            p.value ? "text-ink-900" : "text-ink-300",
            p.error ? bad : ok,
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink-900">
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.625rem] text-olive-700"
        >
          &#9660;
        </span>
      </div>
    </Shell>
  );
}

/**
 * Off-screen honeypot. Real users never see or focus it; scripted
 * submissions fill it and are rejected server-side.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor="website-url">Leave this field empty</label>
      <input
        id="website-url"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
