import Image from "next/image";
import { SectionFilm } from "@/components/media/SectionFilm";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SectionOpener } from "@/components/ui/SectionOpener";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Story = {
  kicker: string;
  headline: string;
  body: string[];
  link: { label: string; href: string };
  chips: string[];
  disclaimer?: string;
};

/**
 * The paired Infrastructure and Funding readiness stories.
 *
 * Each is an asymmetric composition: a tall photograph on one side, the
 * argument on the other, with the chip row acting as the visual footer.
 * `flip` alternates the two so the page develops a rhythm instead of
 * repeating a layout.
 */
export function ReadinessStory({
  story,
  image,
  film,
  filmPoster,
  alt,
  tone = "ivory",
  flip = false,
}: {
  story: Story;
  /** Still media. Ignored when `film` is supplied. */
  image?: string;
  /** Looping footage, loaded only as the section approaches the viewport. */
  film?: string;
  filmPoster?: string;
  alt: string;
  tone?: "ivory" | "evergreen";
  flip?: boolean;
}) {
  const dark = tone === "evergreen";

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-18 lg:py-24",
        dark ? "u-grain bg-evergreen-800 text-ivory-100" : "bg-ivory-200",
      )}
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- Photograph --- */}
          <Reveal
            variant="clip"
            className={cn(
              "lg:col-span-5",
              flip ? "lg:order-2 lg:col-start-8" : "lg:order-1",
            )}
          >
            {/* 4:3 rather than a portrait crop: the supplied industry
                photographs are small landscapes, and a tall frame would crop
                and enlarge them far past where they hold up. */}
            <div className="relative aspect-4/3 overflow-hidden">
              {film && filmPoster ? (
                <SectionFilm src={film} poster={filmPoster} alt={alt} />
              ) : image ? (
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={82}
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 motion-reduce:transition-none"
                />
              ) : null}
              {/* Keeps the crop from competing with the type beside it. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,18,15,0.1),rgba(4,18,15,0.4))]"
              />
              <span
                aria-hidden
                className="absolute bottom-0 left-0 block h-0.5 w-24 bg-brass-500"
              />
            </div>
          </Reveal>

          {/* --- Argument --- */}
          <div
            className={cn(
              "lg:col-span-6",
              flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7",
            )}
          >
            <SectionOpener
              label={story.kicker}
              heading={story.headline}
              tone={dark ? "light" : "dark"}
            />

            <Reveal delay={0.08}>
              <div className="mt-7">
                {story.body.map((p) => (
                  <p
                    key={p}
                    className={cn(
                      "mb-5 text-[1.0625rem] leading-[1.72] last:mb-0",
                      dark ? "text-ivory-100/70" : "text-ink-500",
                    )}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-7">
                <TextLink href={story.link.href} tone={dark ? "light" : "dark"}>
                  {story.link.label}
                </TextLink>
              </div>
            </Reveal>

            <RevealGroup
              as="ul"
              amount={0.05}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {story.chips.map((chip) => (
                <RevealItem as="li" key={chip}>
                  <span
                    className={cn(
                      "block border px-4 py-2 text-[0.6875rem] font-normal uppercase tracking-[0.14em] transition-colors duration-400",
                      dark
                        ? "border-ivory-100/20 text-ivory-100/70 hover:border-brass-500/60 hover:text-brass-400"
                        : "border-rule text-ink-500 hover:border-brass-500/60 hover:text-brass-700",
                    )}
                  >
                    {chip}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            {story.disclaimer ? (
              <Reveal delay={0.1} className="mt-9">
                <Disclaimer dark={dark}>{story.disclaimer}</Disclaimer>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
