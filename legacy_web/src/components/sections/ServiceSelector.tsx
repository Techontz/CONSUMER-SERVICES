"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Service = {
  step: string;
  title: string;
  body: string;
  href: string;
  image?: string;
  alt?: string;
};

/**
 * The service pathways, as an index that drives a single detail panel.
 *
 * Seven cards in a grid make the reader compare seven things at once; a list
 * against one panel lets them read the index, then one answer. The step verbs
 * run down the left as a spine, and the panel to the right changes with the
 * selection.
 *
 * The spine used to be numbered, and the panel carried a 64px ghost numeral
 * in its corner. Both are gone. The brass bar already marks which pathway is
 * live, which is the only thing the numeral was doing that the reader needed;
 * counting to seven was never it.
 *
 * Built as a proper tablist so arrow keys move between pathways and the panel
 * is announced when it changes. Below `lg` it falls back to a stacked
 * accordion-free list, because a two-pane layout on a phone is just a card
 * grid with extra steps.
 */
export function ServiceSelector({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const current = items[active];

  const move = (dir: 1 | -1) => {
    const next = (active + dir + items.length) % items.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16">
      {/* ---------- Index ---------- */}
      <div
        role="tablist"
        aria-label="Service pathways"
        aria-orientation="vertical"
        className="hidden border-t border-rule lg:col-span-5 lg:block"
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.title}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="group relative flex w-full items-start gap-5 border-b border-rule py-5 text-left"
            >
              {/* Brass spine marking the live pathway. */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0 h-full w-0.5 origin-top bg-brass-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  selected ? "scale-y-100" : "scale-y-0",
                )}
              />

              <span
                aria-hidden
                className={cn(
                  "ml-5 mt-1 u-dot transition-colors duration-300",
                  selected ? "text-brass-700" : "text-ink-300",
                )}
              />

              <span className="min-w-0 flex-1">
                <span
                  className={cn(
                    "u-eyebrow block transition-colors duration-300",
                    selected ? "text-brass-700" : "text-ink-300",
                  )}
                >
                  {item.step}
                </span>
                <span
                  className={cn(
                    "u-display-4 mt-3 block transition-colors duration-300",
                    selected ? "text-evergreen-600" : "text-ink-500",
                  )}
                >
                  {item.title}
                </span>
              </span>

              <span
                aria-hidden
                className={cn(
                  "shrink-0 pr-1 text-brass-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  selected
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0",
                )}
              >
                &rarr;
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- Detail panel ---------- */}
      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-live="polite"
        className="hidden lg:col-span-7 lg:sticky lg:top-28 lg:block"
      >
        {/* The panel used to be an evergreen field with type on it, which
            described a pathway without ever showing one. Every pathway now
            opens on a photograph, cross-faded rather than swapped so there is
            no decode flash and no layout to settle between selections. */}
        <div className="relative isolate overflow-hidden bg-evergreen-800 text-ivory-100">
          <div className="relative aspect-16/9 w-full overflow-hidden bg-evergreen-950">
            {items.map((s, i) =>
              s.image ? (
                <span
                  key={s.image + i}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 block transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    active === i ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={s.image}
                    alt={active === i ? (s.alt ?? "") : ""}
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    quality={80}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={cn(
                      "object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                      active === i ? "scale-[1.03]" : "scale-100",
                    )}
                  />
                </span>
              ) : null,
            )}
            {/* One tint over seven photographs, so the set reads as commissioned. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(195deg,rgba(10,60,52,0.24),rgba(4,18,15,0.60))]"
            />
            <span
              aria-hidden
              className="absolute bottom-0 left-0 block h-0.5 w-20 bg-brass-500"
            />
          </div>

          <div className="u-grain relative isolate p-10 xl:p-12">
          {/* Keying on the index restarts the entrance each time the
              selection changes. */}
          <div key={active}>
            <p className="u-in-fade flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
              <span className="u-eyebrow text-brass-400">{current.step}</span>
            </p>
            {/* h2: the panel carries the section's primary heading — the
                index beside it is a control, not an outline level. */}
            <h2
              className="u-in-rise u-display-2 mt-8 max-w-[16ch] text-ivory-100"
              style={{ animationDelay: "60ms" }}
            >
              {current.title}
            </h2>
            <p
              className="u-in-rise u-copy mt-8 max-w-[46ch] text-ivory-100/75"
              style={{ animationDelay: "130ms" }}
            >
              {current.body}
            </p>
          </div>

          <div
            className="u-in-rise mt-12 flex items-end justify-between gap-8 border-t border-ivory-100/12 pt-7"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href={current.href}
              className="group inline-flex items-center gap-3 font-display text-[0.5625rem] uppercase tracking-[0.24em] text-brass-400 transition-colors duration-300 hover:text-ivory-100"
            >
              Explore this pathway
              <span
                aria-hidden
                className="block h-px w-8 bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-14 motion-reduce:transition-none"
              />
            </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Small screens: a plain list, no two-pane theatre ---------- */}
      <ul className="border-t border-rule lg:hidden">
        {items.map((item) => (
          <li key={item.title} className="border-b border-rule">
            <Link href={item.href} className="group block py-7">
              <span className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-brass-600" />
                <span className="u-eyebrow text-brass-700">{item.step}</span>
              </span>
              <span className="u-display-4 mt-5 block text-evergreen-600">
                {item.title}
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-ink-500">
                {item.body}
              </span>
              <span className="mt-6 flex items-center gap-3 font-display text-[0.5625rem] uppercase tracking-[0.24em] text-evergreen-700">
                Explore
                <span aria-hidden className="block h-px w-7 bg-current" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
