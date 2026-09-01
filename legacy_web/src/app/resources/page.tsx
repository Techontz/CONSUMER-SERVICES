import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { resourcesPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Resources",
  description:
    "Business-development guidance, planning resources, and practical information to help entrepreneurs understand the road from idea to implementation.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      {/* --- Featured resource --- */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>{p.featured.label}</Eyebrow>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="clip" className="lg:col-span-7">
            <div className="relative aspect-16/9 overflow-hidden bg-evergreen-900">
              <Image
                src={p.featured.image}
                alt={p.featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={82}
                priority
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,52,48,0.1),rgba(4,18,15,0.34))]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="u-eyebrow text-brass-700">{p.featured.kicker}</p>
            <h2 className="u-display-3 mt-5 text-evergreen-600">
              {p.featured.headline}
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.72] text-ink-500">
              {p.featured.body}
            </p>
            <div className="mt-9">
              <ButtonLink href={p.featured.action.href} variant="quiet">
                {p.featured.action.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- Resource library --- */}
      <Section tone="ivory">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Library</Eyebrow>
            <h2 className="u-display-2 mt-6 text-evergreen-600">
              {p.library.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-[1.0625rem] leading-[1.72] text-ink-500">
              {p.library.body}
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-11 border-t border-rule lg:mt-14">
          {p.library.items.map((item) => (
            <RevealItem as="li" key={item.title}>
              <Link
                href="/contact"
                className="group relative grid grid-cols-12 items-baseline gap-x-4 border-b border-rule py-7 sm:gap-x-8 lg:py-8"
              >
                <span
                  aria-hidden
                  className="absolute -inset-x-[var(--spacing-gutter)] inset-y-0 -z-10 origin-bottom scale-y-0 bg-ivory-50 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <h3 className="col-span-12 text-[1.1875rem] leading-snug text-evergreen-600 sm:col-span-6 lg:text-[1.3125rem]">
                  {item.title}
                </h3>
                <p className="col-span-12 mt-2 text-sm leading-relaxed text-ink-500 sm:col-span-5 sm:mt-0">
                  {item.body}
                </p>
                <span
                  aria-hidden
                  className="col-span-12 mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-evergreen-700 transition-colors duration-400 group-hover:text-brass-700 sm:col-span-1 sm:mt-0 sm:text-right"
                >
                  &rarr;
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* --- Notes & guidance --- */}
      <Section tone="paper">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Notes</Eyebrow>
            <h2 className="u-display-2 mt-6 text-evergreen-600">
              {p.notes.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-[1.0625rem] leading-[1.72] text-ink-500">
              {p.notes.body}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-11 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {p.notes.items.map((item) => (
            <RevealItem as="li" key={item.title} className="bg-ivory-50">
              <Link
                href="/contact"
                className="group relative flex h-full flex-col overflow-hidden p-8 lg:p-9"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-evergreen-800 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative u-eyebrow text-brass-700 transition-colors duration-400 group-hover:text-brass-400">
                  {item.type}
                </span>
                <h3 className="relative mt-5 text-[1.1875rem] leading-snug text-evergreen-600 transition-colors duration-400 group-hover:text-ivory-100">
                  {item.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-500 transition-colors duration-400 group-hover:text-ivory-100/70">
                  {item.body}
                </p>
                <span className="relative mt-7 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-evergreen-700 transition-colors duration-400 group-hover:text-brass-400">
                  {item.action}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand
        headline={p.cta.headline}
        body={p.cta.body}
        primary={p.cta.action}
      />
    </main>
  );
}
