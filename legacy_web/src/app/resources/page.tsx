import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
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
                sizes="(min-width: 1024px) 48vw, 100vw"
                quality={82}
                priority
                className="object-cover"
              />
              {/* Bottom-weighted, not a full-frame wash: the text sits in
                  the column beside this image, never over it. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,61,50,0.02)_0%,rgba(18,61,50,0.02)_60%,rgba(10,32,25,0.09)_100%)]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="u-eyebrow text-gold-700">{p.featured.kicker}</p>
            <h2 className="u-display-3 mt-5 text-evergreen-600">
              {p.featured.headline}
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.72] text-ink-700">
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
            <p className="text-[1.0625rem] leading-[1.72] text-ink-700">
              {p.library.body}
            </p>
          </Reveal>
        </div>

        <ResourceLibrary items={p.library.items} />
      </Section>

      {/* --- Business structure visual ---
          On the page, and only on the page. The client's instruction is
          explicit that this carries no download button, no file link and no
          lightbox: the comparison guide below is the downloadable artefact
          and this is not a second route to it. */}
      <Section tone="paper">
        <Reveal>
          <Eyebrow>{p.structure.eyebrow}</Eyebrow>
          <h2 className="u-display-2 mt-6 max-w-[18ch] text-evergreen-600">
            {p.structure.headline}
          </h2>
          <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-[1.72] text-ink-700">
            {p.structure.body}
          </p>
        </Reveal>

        <Reveal variant="clip" delay={0.1} className="mt-11 block lg:mt-14">
          <figure>
            {/* Width and height rather than `fill`: the artwork sets its own
                aspect ratio and must not be cropped to a frame. It is dense
                with small type, so it runs the full width of the column and
                is left for the reader to pinch-zoom on a phone — which is
                what the brief asks for, and what cropping would prevent. */}
            <Image
              src={p.structure.image}
              alt={p.structure.alt}
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 80vw, 100vw"
              quality={90}
              className="h-auto w-full border border-rule bg-ivory-50"
            />
            <figcaption className="mt-5 max-w-[68ch] text-[0.8125rem] leading-relaxed text-ink-500">
              {p.structure.caption}
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* --- Free downloads --- */}
      <Section tone="ivory">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{p.downloads.eyebrow}</Eyebrow>
            <h2 className="u-display-2 mt-6 text-evergreen-600">
              {p.downloads.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:pt-10">
            <p className="text-[1.0625rem] leading-[1.72] text-ink-700">
              {p.downloads.body}
            </p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-11 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:mt-14"
        >
          {p.downloads.items.map((item) => (
            <RevealItem as="li" key={item.file} className="bg-ivory-50">
              {/* A plain anchor with `download`. These are static files, not
                  routes, so next/link has nothing to prefetch and `download`
                  is what makes a PDF save rather than open in a tab. */}
              <a
                href={item.file}
                download
                className="group relative flex h-full flex-col overflow-hidden p-8 lg:p-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-evergreen-800 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative u-eyebrow text-gold-700 transition-colors duration-400 group-hover:text-gold-400">
                  {item.format}
                </span>
                <h3 className="relative mt-5 text-[1.1875rem] leading-snug text-evergreen-600 transition-colors duration-400 group-hover:text-ivory-100 lg:text-[1.3125rem]">
                  {item.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-700 transition-colors duration-400 group-hover:text-ivory-100/70">
                  {item.body}
                </p>
                <span className="relative mt-7 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-evergreen-700 transition-colors duration-400 group-hover:text-gold-400">
                  {item.action}
                  <span
                    aria-hidden
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5 motion-reduce:transition-none"
                  >
                    &darr;
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15}>
          <p className="mt-9 text-[0.8125rem] leading-relaxed text-ink-500">
            {p.downloads.tip}
          </p>
        </Reveal>
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
            <p className="text-[1.0625rem] leading-[1.72] text-ink-700">
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
                <span className="relative u-eyebrow text-gold-700 transition-colors duration-400 group-hover:text-gold-400">
                  {item.type}
                </span>
                <h3 className="relative mt-5 text-[1.1875rem] leading-snug text-evergreen-600 transition-colors duration-400 group-hover:text-ivory-100">
                  {item.title}
                </h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ink-700 transition-colors duration-400 group-hover:text-ivory-100/70">
                  {item.body}
                </p>
                <span className="relative mt-7 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-evergreen-700 transition-colors duration-400 group-hover:text-gold-400">
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
