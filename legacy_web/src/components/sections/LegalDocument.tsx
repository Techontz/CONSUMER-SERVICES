import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import type {
  InlineLink,
  LegalBlock,
  LegalDocument as LegalDocumentData,
} from "@/lib/content/legal";
import { site } from "@/lib/site";

/**
 * The setting for a full legal document.
 *
 * Two things govern this component. The first is that the words are the
 * client's and are not to be touched — every string it renders comes
 * straight out of `lib/content/legal.ts`, and the only decisions made here
 * are typographic. The second is that a legal page is a reading page: it
 * gets a measured column of roughly 790px of text rather than the full
 * page rail the marketing sections use, because a paragraph of statute-like
 * prose set across a 1900px screen is unreadable at any size.
 *
 * The masthead is a flat band of Deep Evergreen rather than the film the
 * marketing openers stand on. It is the same lockup — olive tick, eyebrow,
 * display headline, olive rule — so the page is unmistakably the same site,
 * but a legal document should be calm, and it should not pull a video down
 * the wire to say so.
 */

const anchor = (n: number) => `section-${n}`;

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Draws the links a paragraph declares, matched on their exact wording, so
 * cross-references between the documents are live without the copy being
 * rewritten to carry markup.
 */
function withLinks(text: string, links?: InlineLink[]): ReactNode {
  if (!links?.length) return text;

  const pattern = new RegExp(
    `(${[...links]
      .sort((a, b) => b.text.length - a.text.length)
      .map((l) => escapeRe(l.text))
      .join("|")})`,
    "g",
  );

  return text.split(pattern).map((piece, i) => {
    const match = links.find((l) => l.text === piece);
    return match ? (
      <Link
        key={i}
        href={match.href}
        className="u-underline font-semibold text-olive-700"
      >
        {piece}
      </Link>
    ) : (
      <Fragment key={i}>{piece}</Fragment>
    );
  });
}

/** One line of the contact block, with the address, email and telephone live. */
function contactLine(line: string) {
  if (line.endsWith(site.domainLabel)) {
    const lead = line.slice(0, line.length - site.domainLabel.length);
    return (
      <>
        {lead}
        <a href={site.url} className="u-underline text-olive-700">
          {site.domainLabel}
        </a>
      </>
    );
  }
  if (line.endsWith(site.email)) {
    const lead = line.slice(0, line.length - site.email.length);
    return (
      <>
        {lead}
        <a
          href={`mailto:${site.email}`}
          className="u-underline break-all text-olive-700"
        >
          {site.email}
        </a>
      </>
    );
  }
  if (line.endsWith(site.phone)) {
    const lead = line.slice(0, line.length - site.phone.length);
    return (
      <>
        {lead}
        <a href={site.phoneHref} className="u-underline text-olive-700">
          {site.phone}
        </a>
      </>
    );
  }
  return line;
}

function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "list") {
    return (
      <ul className="mt-5 space-y-3">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3.5 text-[1.0625rem] leading-[1.75] text-ink-700"
          >
            <span
              aria-hidden
              className="u-dot mt-[0.62em] text-olive-600"
            />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === "contact") {
    return (
      <address className="mt-6 border-l-2 border-olive-500/70 py-1 pl-5 not-italic sm:pl-6">
        {block.lines.map((line, i) => (
          <span
            key={line}
            className={
              i === 0
                ? "block text-[1.0625rem] font-semibold leading-[1.7] text-evergreen-600"
                : "block text-[1.0625rem] leading-[1.7] text-ink-700"
            }
          >
            {contactLine(line)}
          </span>
        ))}
      </address>
    );
  }

  return (
    <p className="mt-5 text-[1.0625rem] leading-[1.78] text-ink-700">
      {withLinks(block.text, block.links)}
    </p>
  );
}

export function LegalDocument({ doc }: { doc: LegalDocumentData }) {
  return (
    <main id="main">
      {/* ---- Masthead: solid Deep Evergreen, olive hairline at its foot ---- */}
      <section className="u-grain relative isolate overflow-hidden bg-evergreen-800 pb-14 pt-32 lg:pb-18 lg:pt-40">
        <div className="mx-auto w-full max-w-[53.5rem] px-5 sm:px-8">
          <p
            className="u-in-fade flex items-center gap-4"
            style={{ animationDelay: "80ms" }}
          >
            <span aria-hidden className="block h-px w-10 shrink-0 bg-olive-500/80" />
            <span className="u-eyebrow text-olive-400">{site.legalName}</span>
          </p>

          <h1 className="u-display-1 mt-6 max-w-[16ch] text-ivory-100">
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="u-in-mask block"
                style={{ animationDelay: "180ms" }}
              >
                {doc.title}
              </span>
            </span>
          </h1>

          {/* The two dates are set as the client wrote them — label, colon,
              date, in sentence case. The eyebrow treatment used elsewhere
              on the site would have uppercased them, which changes the
              rendered wording of a legal document, so it is not used here. */}
          <div
            className="u-in-rise mt-8 flex flex-col gap-x-12 gap-y-1.5 text-[0.9375rem] leading-[1.6] sm:flex-row"
            style={{ animationDelay: "520ms" }}
          >
            <p className="text-ivory-100/80">
              <span className="font-semibold text-olive-400">
                Effective Date:
              </span>{" "}
              {doc.effectiveDate}
            </p>
            <p className="text-ivory-100/80">
              <span className="font-semibold text-olive-400">
                Last Updated:
              </span>{" "}
              {doc.lastUpdated}
            </p>
          </div>
        </div>

        {/* The thin Light Olive rule that closes the masthead. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-olive-500/55"
        />
      </section>

      {/* ---- The document ---- */}
      <div className="bg-ivory-50 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="mx-auto w-full max-w-[53.5rem] px-5 sm:px-8">
          {/* Contents. Nothing but the client's own numbers and headings,
              set as a jump list so a seventeen-section document can be
              scanned rather than scrolled. */}
          <nav
            aria-label={`${doc.title} contents`}
            className="u-reveal border-y border-rule-soft py-7"
          >
            <h2 className="u-eyebrow text-olive-700">Contents</h2>
            {/* Columns rather than a grid, so a numbered index reads down
                the first column and then down the second — 1…9 on the left,
                10…17 on the right — instead of zig-zagging 1, 2 / 3, 4. */}
            <ol className="mt-5 sm:columns-2 sm:gap-x-10">
              {doc.sections.map((s) => (
                <li key={s.number} className="break-inside-avoid pb-2.5">
                  <Link
                    href={`#${anchor(s.number)}`}
                    className="u-underline flex gap-2.5 text-[0.9375rem] leading-[1.55] text-ink-500 transition-colors duration-300 hover:text-evergreen-600"
                  >
                    <span className="w-6 shrink-0 tabular-nums text-olive-700">
                      {s.number}.
                    </span>
                    <span className="min-w-0">{s.heading}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {/* Preamble */}
          <Reveal className="mt-12">
            {doc.preamble.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </Reveal>

          {/* Numbered sections */}
          {doc.sections.map((s) => (
            <section
              key={s.number}
              id={anchor(s.number)}
              aria-labelledby={`${anchor(s.number)}-heading`}
              // Deliberately not a `u-reveal`. The contents list jumps
              // straight to any of these, and a reveal that has not fired
              // yet is an element at opacity 0 — a reader who follows
              // "17. Contact Us" must not land on blank paper. Legal text
              // is never hidden behind an animation.
              className="mt-14 scroll-mt-28 lg:mt-16"
            >
              <h2
                id={`${anchor(s.number)}-heading`}
                className="u-display-4 text-evergreen-600"
              >
                <span className="text-olive-700">{s.number}.</span>{" "}
                {s.heading}
              </h2>
              <span
                aria-hidden
                className="mt-4 block h-px w-14 bg-olive-600/55"
              />
              {s.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </section>
          ))}

          {/* Not a dead end: the other two documents and the way back. */}
          <Reveal className="mt-16 border-t border-rule pt-8 lg:mt-20">
            <h2 className="u-eyebrow text-olive-700">Also in this section</h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Data Sharing Disclosure", href: "/data-sharing" },
                { label: "Terms of Use", href: "/terms-of-use" },
                { label: "Return to homepage", href: "/" },
              ]
                .filter((l) => l.href !== doc.path)
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="u-underline text-ink-500 transition-colors duration-300 hover:text-evergreen-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
