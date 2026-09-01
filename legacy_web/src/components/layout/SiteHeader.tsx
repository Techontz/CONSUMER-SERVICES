"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { primaryNav, site, type NavItem } from "@/lib/site";
import { industriesPage } from "@/lib/content/pages";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

/**
 * The Industries mega-menu panel is populated from the same industry records
 * the Industries page renders, so the two can never drift.
 */
const industryLinks = industriesPage.items.map((i) => ({
  label: i.title,
  href: "/industries",
  blurb: i.note,
  image: i.image,
  alt: i.alt,
}));

function panelItems(item: NavItem) {
  return item.label === "Industries" ? industryLinks : (item.children ?? []);
}

/**
 * The header is a solid evergreen band, on every page and at every scroll
 * position. It used to take an `overHero` flag and go transparent at the top
 * of a page that owned a dark hero; the band does not change ground any
 * more, so the flag was removed rather than left on the signature doing
 * nothing.
 */
export function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * The panel stays mounted so it can animate closed. Holding the last key
   * keeps its contents on screen for the length of that transition instead
   * of blanking the moment it starts to fade.
   */
  const [lastKey, setLastKey] = useState<string | null>(null);
  const panelKey = openKey ?? lastKey;
  if (openKey && openKey !== lastKey) setLastKey(openKey);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating closes everything. Adjusted during render rather than in an
  // effect, so the menus never paint open on the page you just moved to.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpenKey(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setOpenKey(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback((key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenKey(key);
  }, []);

  /**
   * The grace period between leaving a trigger and the panel closing.
   *
   * It was 140ms, which is about as long as it takes to change your mind and
   * far less than it takes to read a menu. Anything that re-enters the header
   * or the panel cancels it, so the only thing this timer measures is a
   * pointer that has genuinely left and stayed away — and 420ms of that is a
   * deliberate departure rather than a hand pausing mid-travel.
   */
  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenKey(null), 420);
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const activeItem = primaryNav.find((i) => i.label === panelKey);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-evergreen-800 focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:font-semibold focus:uppercase focus:tracking-[0.18em] focus:text-ivory-100"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[box-shadow,backdrop-filter] duration-500",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
          // A solid band, not a veil over the film.
          //
          // This used to fade out over the hero so the first viewport read as
          // one cinematic frame. It reads instead as a branded architectural
          // layer with a definite end: strongly evergreen, with a shallow
          // tonal fall inside its own height — deepest at the very top,
          // easing by the foot — so the band has depth without ever letting
          // the video through it.
          "bg-[linear-gradient(180deg,var(--color-evergreen-950)_0%,var(--color-evergreen-900)_58%,var(--color-evergreen-800)_100%)]",
          // The line that says where the header stops. One pixel of low
          // brass: enough to read as a drawn edge against sunlit water,
          // far too little to read as a border.
          "border-b border-brass-500/70",
          scrolled && "shadow-[0_14px_34px_-16px_rgba(4,18,15,0.85)] backdrop-blur-xl",
        )}
        onMouseLeave={scheduleClose}
        // Tabbing out of the header closes any open panel, so keyboard users
        // are never left with a menu hanging open behind the page.
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setOpenKey(null);
          }
        }}
      >
        <Container wide>
          <div
            className={cn(
              "flex items-center gap-4 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] wide:gap-6",
              // A masthead: 116px at the wide tier. The seal supplies 68 of
              // it and the padding the remaining 24 a side, which is the
              // clear air the band needs to read as architecture rather than
              // as a strip with things crammed in it.
              //
              // What it costs is horizontal, and that is the tighter budget.
              // The rail is asymmetric — 8vw at the start so the seal lands
              // on the same line as the headline, 4.5vw at the end — which
              // leaves about 44px spare at 1366, so nothing here may get
              // wider to get taller.
              scrolled ? "py-3" : "py-5 lg:py-5 wide:py-6",
            )}
          >
            {/* ---------- Identity ---------- */}
            <Link
              href="/"
              className="group min-w-0"
              aria-label={`${site.legalName} — home`}
            >
              <Logo tone="light" size={scrolled ? "sm" : "md"} />
            </Link>

            {/* ---------- Desktop navigation ---------- */}
            <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
              <ul className="flex items-center">
                {primaryNav.map((item) => {
                  const hasPanel = panelItems(item).length > 0;
                  const active = isActive(item.href);
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() =>
                        hasPanel ? open(item.label) : scheduleClose()
                      }
                      onFocus={() =>
                        hasPanel ? open(item.label) : scheduleClose()
                      }
                    >
                      <Link
                        href={item.href}
                        aria-expanded={hasPanel ? openKey === item.label : undefined}
                        aria-haspopup={hasPanel || undefined}
                        className={cn(
                          "relative block px-2.5 py-3 font-display text-[0.625rem] uppercase tracking-[0.16em] wide:px-3 wide:py-3 wide:text-[0.75rem] wide:tracking-[0.17em]",
                          "transition-colors duration-300",
                          active || openKey === item.label
                            ? "text-ivory-100"
                            : "text-ivory-100/70 hover:text-ivory-100",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-4 bottom-1.5 block h-px origin-left bg-brass-500",
                            "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            active || openKey === item.label
                              ? "scale-x-100"
                              : "scale-x-0",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <span aria-hidden className="mx-3 block h-7 w-px bg-ivory-100/15 wide:mx-3.5 wide:h-9" />

              <a
                href={site.phoneHref}
                className="mr-4 hidden font-display text-[0.625rem] tracking-[0.14em] text-ivory-100/70 transition-colors duration-300 hover:text-ivory-100 xl:block wide:mr-5 wide:text-[0.75rem]"
              >
                {site.phone}
              </a>

              <Link
                href="/contact"
                className="group relative overflow-hidden whitespace-nowrap border border-brass-500/60 px-5 py-3.5 font-display text-[0.625rem] uppercase tracking-[0.18em] text-brass-400 transition-colors duration-300 hover:text-evergreen-950 wide:px-7 wide:py-3.5 wide:text-[0.75rem] wide:tracking-[0.2em]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-brass-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <span className="relative">Contact Us</span>
              </Link>
            </nav>

            {/* ---------- Mobile trigger ---------- */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="ml-auto flex shrink-0 items-center gap-2.5 border border-ivory-100/30 px-5 py-3.5 font-display text-[0.625rem] uppercase tracking-[0.2em] text-ivory-100 transition-colors duration-300 hover:border-brass-500 lg:hidden"
            >
              Menu
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-[1.125rem] bg-current" />
                <span className="block h-px w-[1.125rem] bg-current" />
              </span>
            </button>
          </div>
        </Container>

        {/* ---------- Mega menu ---------- */}
        <div
          data-open={openKey ? "true" : "false"}
          // Hidden from assistive tech and from the tab order while closed;
          // the panel stays in the DOM only so it can animate out.
          inert={openKey ? undefined : true}
          className="u-panel absolute inset-x-0 top-full hidden border-t border-ivory-100/10 bg-evergreen-900 shadow-[0_28px_60px_-20px_rgba(4,18,15,0.75)] lg:block"
          onMouseEnter={() => openKey && open(openKey)}
        >
          {activeItem ? (
            <MegaPanel item={activeItem} items={panelItems(activeItem)} />
          ) : null}
        </div>
      </header>

      {/* Dims the page behind an open mega menu. Pointer events stay off so
          moving away from the panel simply closes it. */}
      <div
        aria-hidden
        data-open={openKey ? "true" : "false"}
        className="u-panel pointer-events-none fixed inset-0 z-40 hidden bg-evergreen-950/45 lg:block"
      />

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MegaPanel({
  item,
  items,
}: {
  item: NavItem;
  items: { label: string; href: string; blurb?: string; image?: string; alt?: string }[];
}) {
  /**
   * The menu argues visually, but at menu scale.
   *
   * It used to carry a large plate on the right that changed as you moved
   * down the list. That plate set the height of the whole panel — six items
   * made a 747px menu — and it only told you about the one row you happened
   * to be on. The list is two columns now and the thumbnails are the size of
   * the thing they are: a visual cue beside a label, not a card. All six
   * business worlds are legible at a glance, and the panel is as tall as its
   * list rather than as tall as a photograph.
   *
   * No state left in here either: the hover emphasis is `group-hover` and
   * `group-focus-within`, so it works from the keyboard and there is nothing
   * to re-render as the pointer travels.
   */
  return (
    <div className="u-container grid grid-cols-12 gap-x-10 py-8">
      {/* --- the argument --- */}
      <div className="col-span-4 pr-10">
        <p className="u-eyebrow text-brass-400">{item.label}</p>
        <h2 className="u-display-3 mt-5 text-ivory-100">{item.panelTitle}</h2>
        {item.panelBlurb ? (
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ivory-100/70">
            {item.panelBlurb}
          </p>
        ) : null}
      </div>

      {/* --- the index, two columns --- */}
      {/* Column-first, not row-first: the eye reads the first three down the
          left and the next three down the right, which is how the grouping
          was asked for and how a printed index reads. Three rows fixed, so
          the flow can only ever make two columns. */}
      <ul className="col-span-8 grid grid-flow-col grid-cols-2 grid-rows-3 gap-x-10 gap-y-1 border-l border-ivory-100/10 pl-9">
        {items.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex gap-4 border-b border-ivory-100/10 py-3.5"
            >
              {link.image ? (
                <span className="relative mt-0.5 block h-9 w-14 shrink-0 overflow-hidden bg-evergreen-950">
                  <Image
                    src={link.image}
                    alt=""
                    fill
                    sizes="56px"
                    quality={58}
                    // Eager, not lazy. The panel is mounted from first paint
                    // but hidden, so a lazy thumbnail does not start loading
                    // until the menu opens — and then pops in about a second
                    // later, which is exactly when it is being looked at.
                    // Eleven thumbnails at this size cost a few KB in total;
                    // the pop-in cost more than that in feel.
                    loading="eager"
                    className="object-cover opacity-65 grayscale-[0.45] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:opacity-100 group-hover:grayscale-0 group-focus-within:scale-[1.05] group-focus-within:opacity-100 group-focus-within:grayscale-0 motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 block h-0.5 origin-left scale-x-0 bg-brass-500 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
                  />
                </span>
              ) : null}

              <span className="min-w-0">
                <span className="u-display-4 block text-ivory-100 transition-colors duration-400 group-hover:text-brass-400 group-focus-within:text-brass-400">
                  {link.label}
                </span>
                {link.blurb ? (
                  <span className="mt-1.5 block text-xs leading-relaxed text-ivory-100/55">
                    {link.blurb}
                  </span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
