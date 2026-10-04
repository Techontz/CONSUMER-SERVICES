import { InquiryForm } from "@/components/forms/InquiryForm";
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
                  <span aria-hidden className="mt-2.5 u-dot text-gold-700" />
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
                      className="u-underline text-evergreen-600 transition-colors hover:text-gold-700"
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
                      className="u-underline break-all text-evergreen-600 transition-colors hover:text-gold-700"
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
            {/* The eyebrow keeps the page's voice above the frame; the
                frame itself does not get the card's padding, because the
                form arrives with its own margins baked in by the CRM and
                nesting those inside another 44px of inset reads as two
                boxes rather than one.

                `p.form.body` is deliberately not rendered here any more.
                It read "Share a few details about your business and what
                you want to accomplish…", and the embedded form opens with
                "Tell us where you are in your business journey and where
                you'd like to go" — the same invitation, twice, two lines
                apart. The string is still in pages.ts: if the CRM form's
                own introduction is ever turned off, put it back. */}
            <div className="border border-rule bg-ivory-50">
              <div className="p-8 pb-6 lg:p-11 lg:pb-7">
                <Eyebrow>{p.form.eyebrow}</Eyebrow>
              </div>

              <InquiryForm />

              {/* The legal note, which the approved page carries and which
                  used to be the last thing ContactForm rendered. It does
                  not belong to the form — it belongs to the act of
                  submitting one — so it survives the form being replaced,
                  and it sits outside the frame where we still control it.
                  Nothing inside a third-party iframe can be relied on to
                  say this. */}
              <p className="max-w-[56ch] px-8 pb-8 text-[0.8125rem] leading-relaxed text-ink-700 lg:px-11 lg:pb-11">
                {p.form.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

    </main>
  );
}
