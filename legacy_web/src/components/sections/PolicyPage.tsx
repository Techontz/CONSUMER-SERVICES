import { PageHero } from "@/components/sections/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

/**
 * Shell for a legal page whose text the client has not yet supplied.
 *
 * Data Sharing and Terms of Use now carry their own documents — see
 * `lib/content/legal.ts` and `LegalDocument.tsx`. The Privacy Policy is the
 * one page still waiting on copy, and legal wording is not something to
 * invent, so the route is built and linked and the body says plainly that
 * the text is coming. Delete this component once that copy arrives.
 */
export function PolicyPage({
  eyebrow,
  headline,
  summary,
}: {
  eyebrow: string;
  headline: string;
  summary: string;
}) {
  return (
    <main id="main">
      <PageHero
        eyebrow={eyebrow}
        headline={headline}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{site.legalName}</Eyebrow>
            <p className="mt-6 text-sm leading-relaxed text-ink-700">
              Established {site.established} in {site.establishedIn}.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink-700">
              Questions about this policy can be directed to{" "}
              <a
                href={`mailto:${site.email}`}
                className="u-underline break-all text-olive-700"
              >
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.phoneHref} className="u-underline text-olive-700">
                {site.phone}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <p className="u-lede">{summary}</p>

            <div className="mt-10 border-l-2 border-olive-500/60 py-1 pl-6">
              <h2 className="u-display-4 text-evergreen-600">
                This policy is being finalised.
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-700">
                The full text is in preparation and will be published here.
                In the meantime, please contact us directly with any question
                about how {site.legalName} handles your information, and we
                will answer it.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}
