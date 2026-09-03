import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <main
      id="main"
      className="u-grain relative isolate flex min-h-[80svh] items-center overflow-hidden bg-evergreen-950 pt-32 text-ivory-100"
    >
      <Container>
        <p className="u-eyebrow flex items-center gap-3 text-olive-400">
          <span aria-hidden className="block h-px w-8 bg-olive-500/70" />
          Error 404
        </p>

        <h1 className="u-display-2 mt-7 max-w-[16ch] text-ivory-100">
          This page isn’t part of the blueprint.
        </h1>

        <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.68] text-ivory-100/72">
          The page you were looking for has moved or no longer exists. Start
          from the homepage, or tell us what you are building and we will point
          you to the right place.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/" variant="accent">
            Return Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="quietLight" withArrow={false}>
            Start a Conversation
          </ButtonLink>
        </div>

        <p className="mt-12 text-sm text-ivory-100/60">
          {site.phone} · {site.email}
        </p>
      </Container>
    </main>
  );
}
