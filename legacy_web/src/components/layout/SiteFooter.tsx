import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { footerNav, legalNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="u-watermark relative isolate overflow-hidden bg-evergreen-950 text-ivory-100">
      {/* A single brass hairline above the footer reads as a page rule. */}
      <div aria-hidden className="h-px w-full bg-gradient-to-r from-transparent via-brass-500/45 to-transparent" />

      <Container className="py-18 lg:py-24">
        <Reveal className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Logo tone="light" size="lg" showTagline={false} />

            <p className="mt-5 text-[0.5625rem] font-normal uppercase tracking-[0.24em] text-brass-500/85">
              {site.brandName}
            </p>

            <p className="mt-8 text-xl leading-[1.5] text-ivory-100/85">
              {site.creed.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-6">
            <h2 className="u-eyebrow text-brass-500/80">Navigate</h2>
            <ul className="mt-6 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="u-underline text-sm text-ivory-100/70 transition-colors duration-300 hover:text-ivory-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="u-eyebrow text-brass-500/80">Contact</h2>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="u-underline text-ivory-100/70 transition-colors duration-300 hover:text-ivory-100"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="u-underline break-all text-ivory-100/70 transition-colors duration-300 hover:text-ivory-100"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.url}
                  className="u-underline text-ivory-100/70 transition-colors duration-300 hover:text-ivory-100"
                >
                  {site.domainLabel}
                </a>
              </li>
            </ul>

            <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory-100/60">
              Established {site.established} · {site.establishedIn}
            </p>
          </div>
        </Reveal>

        {/* Legal */}
        <div className="mt-16 flex flex-col gap-5 border-t border-ivory-100/10 pt-8 text-xs text-ivory-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {site.copyrightRange} {site.legalName} All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="u-underline transition-colors duration-300 hover:text-ivory-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

    </footer>
  );
}
