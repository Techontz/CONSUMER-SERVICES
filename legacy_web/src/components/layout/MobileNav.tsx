"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { legalNav, primaryNav, site } from "@/lib/site";
import { industriesPage } from "@/lib/content/pages";

const industryLinks = industriesPage.items.map((i) => ({
  label: i.title,
  href: "/industries",
  image: i.image,
}));

/**
 * Full-screen mobile navigation.
 *
 * Designed for the phone rather than shrunk from the desktop menu: items are
 * large serif targets and sub-sections expand in place instead of pushing the
 * reader onto a second screen.
 *
 * The sheet stays mounted so it can animate both in and out in CSS, and is
 * marked `inert` while closed so it never appears in the tab order.
 */
export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Opening or closing the sheet collapses any expanded section. Adjusted
  // during render so a reopened sheet never flashes its previous state.
  const [renderedOpen, setRenderedOpen] = useState(open);
  if (renderedOpen !== open) {
    setRenderedOpen(open);
    setExpanded(null);
  }

  // Lock the page behind the sheet.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      data-open={open ? "true" : "false"}
      inert={open ? undefined : true}
      className="u-sheet fixed inset-0 z-60 flex flex-col bg-evergreen-900 lg:hidden"
    >
      <div className="u-container flex shrink-0 items-center gap-3.5 py-4">
        <Logo tone="light" size="sm" showTagline={false} className="flex-1" />
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-3 border border-ivory-100/30 px-5 py-3 font-display text-[0.5625rem] uppercase tracking-[0.24em] text-ivory-100"
        >
          Close
          <span aria-hidden>&times;</span>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Primary" className="u-container pb-10 pt-4">
          <ul className="border-t border-ivory-100/10">
            {primaryNav.map((item, i) => {
              const subs =
                item.label === "Industries" ? industryLinks : (item.children ?? []);
              const isOpen = expanded === item.label;
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li
                  key={item.label}
                  data-stagger
                  style={{ transitionDelay: `${140 + i * 55}ms` }}
                  className="border-b border-ivory-100/10"
                >
                  <div className="flex items-stretch">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "u-display-3 flex-1 py-6 transition-colors duration-300",
                        active ? "text-brass-400" : "text-ivory-100",
                      )}
                    >
                      {item.label}
                    </Link>
                    {subs.length ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                        className="grid w-14 shrink-0 place-items-center text-ivory-100/70"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "block text-lg transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isOpen && "rotate-45",
                          )}
                        >
                          +
                        </span>
                      </button>
                    ) : null}
                  </div>

                  {subs.length ? (
                    <div
                      className="u-collapse"
                      data-open={isOpen ? "true" : "false"}
                    >
                      <div>
                        <ul className="mb-5 border-l border-brass-500/30 pl-5">
                          {subs.map((s) => (
                            <li key={s.label}>
                              <Link
                                href={s.href}
                                onClick={onClose}
                                tabIndex={isOpen ? undefined : -1}
                                className="flex items-center gap-3.5 py-2.5 text-[0.9375rem] leading-snug text-ivory-100/75 transition-colors duration-300 hover:text-brass-400"
                              >
                                {/* The same argument the desktop menu makes,
                                    at phone scale: six thumbnails say "six
                                    different kinds of business" faster than
                                    six headings do. */}
                                {s.image ? (
                                  <span className="relative block h-9 w-13 shrink-0 overflow-hidden bg-evergreen-950">
                                    <Image
                                      src={s.image}
                                      alt=""
                                      fill
                                      sizes="52px"
                                      quality={55}
                                      className="object-cover"
                                    />
                                  </span>
                                ) : null}
                                <span className="min-w-0">{s.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div
            data-stagger
            style={{ transitionDelay: "480ms" }}
            className="mt-8 space-y-6"
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="block bg-brass-500 px-6 py-4.5 text-center font-display text-[0.625rem] uppercase tracking-[0.22em] text-evergreen-950"
            >
              Contact Us
            </Link>

            <div className="space-y-2 text-sm">
              <a
                href={site.phoneHref}
                className="block text-ivory-100/75 transition-colors hover:text-ivory-100"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block break-all text-ivory-100/75 transition-colors hover:text-ivory-100"
              >
                {site.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-ivory-100/10 pt-6 font-display text-[0.5625rem] uppercase tracking-[0.2em] text-ivory-100/60">
              {legalNav.map((l) => (
                <Link key={l.href} href={l.href} onClick={onClose}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
