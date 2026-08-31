import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * The closing call to action shared by the interior pages. A brass rule
 * and an oversized serif line on the deepest evergreen — the visual full
 * stop for a page.
 */
export function CtaBand({
  eyebrow,
  headline,
  body,
  primary,
  secondary,
  id,
  className,
}: {
  eyebrow?: string;
  headline: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "u-grain relative isolate overflow-hidden bg-evergreen-800 py-18 text-ivory-100 lg:py-24",
        className,
      )}
    >
      <Container className="relative">
        <Reveal className="max-w-[46rem]">
          {eyebrow ? (
            <p className="flex items-center gap-4">
              <span aria-hidden className="block h-px w-10 bg-brass-500/80" />
              <span className="u-eyebrow text-brass-400">{eyebrow}</span>
            </p>
          ) : null}

          <h2 className="u-display-2 mt-7 max-w-[20ch] text-ivory-100">
            {headline}
          </h2>

          {body ? (
            <p className="u-copy mt-6 max-w-[52ch] text-ivory-100/75">{body}</p>
          ) : null}

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href={primary.href} variant="gold">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                variant="quietLight"
                withArrow={false}
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
