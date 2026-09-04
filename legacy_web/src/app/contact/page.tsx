import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { contactPage as p } from "@/lib/content/pages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
    "Whether you’re starting with an idea, strengthening an existing business, or preparing for your next opportunity, tell us where you are and what you’re working toward.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={p.hero.eyebrow}
        headline={p.hero.headline}
        lede={p.hero.lede}
      />

      {/* --- Reasons + form --- */}
      <Section tone="paper" id="contact-form">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Reasons */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{p.reasons.eyebrow}</Eyebrow>
              <h2 className="u-display-3 mt-6 text-evergreen-600">
                {p.reasons.headline}
              </h2>
            </Reveal>

            <RevealGroup as="ol" className="mt-11 space-y-0">
              {p.reasons.items.map((r) => (
                <RevealItem
                  as="li"
                  key={r.title}
                  className="group flex gap-5 border-t border-rule py-6 last:border-b"
                >
                  <span aria-hidden className="mt-2.5 u-dot text-olive-700" />
                  <span>
                    <h3 className="text-[1.1875rem] leading-snug text-evergreen-600">
                      {r.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
                      {r.body}
                    </p>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Direct contact — always available alongside the form. */}
            <Reveal delay={0.1} className="mt-11">
              <Eyebrow>Speak With Us Directly</Eyebrow>
              <dl className="mt-6 space-y-4 text-[0.9375rem]">
                <div>
                  <dt className="sr-only">Telephone</dt>
                  <dd>
                    <a
                      href={site.phoneHref}
                      className="u-underline text-evergreen-600 transition-colors hover:text-olive-700"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="u-underline break-all text-evergreen-600 transition-colors hover:text-olive-700"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <div className="border border-rule bg-ivory-50 p-8 lg:p-11">
              <Eyebrow>{p.form.eyebrow}</Eyebrow>
              <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-700">
                {p.form.body}
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

    </main>
  );
}
