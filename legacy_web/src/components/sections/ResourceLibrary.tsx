"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { resourcesPage } from "@/lib/content/pages";

type Topic = (typeof resourcesPage.library.items)[number];

/**
 * The resource library, and the short reading panel each topic opens.
 *
 * The rows are unchanged — same stacked list, same hover wash, same baseline
 * grid. What changed is where they lead: a topic used to be a link to the
 * contact form, which asked the reader to start a conversation before they
 * had read anything. Now it opens a few paragraphs and offers the download
 * that belongs to it, and the contact form is still one click further on.
 *
 * Built on <dialog>, not on a div with a high z-index. The platform element
 * brings the things a hand-rolled modal gets wrong: it traps focus, it
 * closes on Escape, it returns focus to the control that opened it, and it
 * makes the rest of the page inert for assistive technology — none of which
 * has to be written, tested or maintained here.
 */
export function ResourceLibrary({ items }: { items: readonly Topic[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [topic, setTopic] = useState<Topic | null>(null);

  const open = useCallback((item: Topic) => {
    setTopic(item);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // showModal() makes the page inert but does not stop it scrolling behind
  // the panel, which on a long page means the reader loses their place.
  useEffect(() => {
    if (!topic) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [topic]);

  return (
    <>
      <RevealGroup as="ul" className="mt-11 border-t border-rule lg:mt-14">
        {items.map((item) => (
          <RevealItem as="li" key={item.title}>
            <button
              type="button"
              onClick={() => open(item)}
              aria-haspopup="dialog"
              className="group relative grid w-full grid-cols-12 items-baseline gap-x-4 border-b border-rule py-7 text-left sm:gap-x-8 lg:py-8"
            >
              <span
                aria-hidden
                className="absolute -inset-x-[var(--spacing-gutter)] inset-y-0 -z-10 origin-bottom scale-y-0 bg-ivory-50 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
              />
              <h3 className="col-span-12 text-[1.1875rem] leading-snug text-evergreen-600 sm:col-span-6 lg:text-[1.3125rem]">
                {item.title}
              </h3>
              <p className="col-span-12 mt-2 text-sm leading-relaxed text-ink-700 sm:col-span-5 sm:mt-0">
                {item.body}
              </p>
              <span
                aria-hidden
                className="col-span-12 mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-evergreen-700 transition-colors duration-400 group-hover:text-gold-700 sm:col-span-1 sm:mt-0 sm:text-right"
              >
                &rarr;
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <dialog
        ref={dialogRef}
        onClose={() => setTopic(null)}
        // A dialog's backdrop is not inside the dialog, so a click on it
        // lands on the dialog element itself. Comparing the target to the
        // element is what separates "clicked the backdrop" from "clicked
        // something in the panel", without an extra wrapper div.
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-labelledby="resource-panel-title"
        className="m-auto w-[min(100%-2rem,38rem)] bg-ivory-50 p-0 text-ink-900 backdrop:bg-evergreen-950/70"
      >
        {topic ? (
          // Keyed on the title so the entrance replays each time a different
          // topic is opened, rather than only on first mount.
          <div key={topic.title} className="u-in-rise relative">
            <span aria-hidden className="u-metal-rule block h-[3px]" />

            <button
              type="button"
              onClick={close}
              aria-label="Close reading panel"
              className="absolute right-3 top-4 flex size-11 items-center justify-center text-[1.5rem] leading-none text-evergreen-600 transition-colors duration-300 hover:text-gold-700"
            >
              <span aria-hidden>&times;</span>
            </button>

            <div className="max-h-[80vh] overflow-y-auto px-7 py-9 lg:px-10 lg:py-11">
              <p className="u-eyebrow text-gold-700">
                Resource Library · Quick Read
              </p>

              <h2
                id="resource-panel-title"
                className="u-display-3 mt-5 text-evergreen-600"
              >
                {topic.title}
              </h2>

              <p className="mt-5 text-[1.0625rem] leading-[1.72] text-ink-700">
                {topic.lead}
              </p>

              <h3 className="u-eyebrow mt-9 text-evergreen-700">What to know</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                {topic.details}
              </p>

              <h3 className="u-eyebrow mt-8 text-evergreen-700">
                One useful next step
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
                {topic.step}
              </p>

              {/* A plain anchor with `download`, not a ButtonLink: next/link
                  is for route transitions and these are static files. */}
              <a
                href={topic.file}
                download
                className="group mt-9 inline-flex items-center gap-3 border border-gold-700 px-7 py-4 font-display text-[0.625rem] uppercase tracking-[0.22em] text-evergreen-700 transition-colors duration-300 hover:bg-evergreen-800 hover:text-ivory-100"
              >
                Download {topic.tool}
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5 motion-reduce:transition-none"
                >
                  &darr;
                </span>
              </a>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
