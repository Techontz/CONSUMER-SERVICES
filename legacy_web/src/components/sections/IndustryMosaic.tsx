import Image from "next/image";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Industry = {
  title: string;
  note: string;
  image: string;
  alt: string;
};

/**
 * The industries, as an edge-to-edge photographic mosaic.
 *
 * At rest each tile is a photograph with its name on an evergreen band. On
 * hover or focus the band rises to fill the tile and the detail is revealed
 * over it — so the grid reads as imagery first and turns into a reference
 * only when someone asks it to.
 *
 * The tiles are deliberately not all one size. Six identical rectangles is
 * the shape of a template, and it also flattens six genuinely different
 * kinds of business into one repeated card; alternating a wide tile against
 * a narrow one down the grid gives the page an editorial rhythm and lets the
 * photography breathe at different scales. The row height is constant, so
 * the variation reads as composition rather than accident.
 *
 * No JavaScript: the whole interaction is CSS on `group-hover` and
 * `group-focus-within`, which means it also works from the keyboard.
 */
/** Wide, narrow, narrow, wide, wide, narrow — down a three-column grid. */
const SPAN = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1",
              "lg:col-span-2", "lg:col-span-2", "lg:col-span-1"];

export function IndustryMosaic({ items }: { items: Industry[] }) {
  return (
    <RevealGroup
      as="ul"
      className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:auto-rows-[clamp(15rem,23vw,21rem)] lg:grid-cols-3"
    >
      {items.map((item, i) => (
        <RevealItem
          as="li"
          key={item.title}
          className={cn("bg-evergreen-900", SPAN[i % SPAN.length])}
        >
          <Link
            href="/contact"
            className="group relative block aspect-4/3 overflow-hidden focus:outline-none lg:aspect-auto lg:h-full"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 55vw"
              quality={82}
              className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-focus-within:scale-[1.03] motion-reduce:transition-none"
            />

            {/* Evergreen tint unifies six photographs shot in six different
                conditions into one set. */}
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,52,48,0.2),rgba(4,18,15,0.55))]"
            />

            {/* The panel that rises to fill the tile. */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-evergreen-800/96 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-within:scale-y-100 motion-reduce:transition-none"
            />

            {/* Resting state: name on a band at the foot of the tile. */}
            <span className="absolute inset-x-0 bottom-0 flex items-end p-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-focus-within:-translate-y-1 lg:p-7">
              <span className="relative">
                <span
                  aria-hidden
                  className="mb-4 block h-0.5 w-10 origin-left bg-olive-500 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[2.2] group-focus-within:scale-x-[2.2] motion-reduce:transition-none"
                />
                <h2 className="u-display-3 max-w-[14ch] text-ivory-100">
                  {item.title}
                </h2>
              </span>
            </span>

            {/* Revealed state: the detail, held above the name. */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-6 pb-24 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none lg:p-7 lg:pb-26">
              <span className="block text-[0.9375rem] leading-relaxed text-ivory-100/80">
                {item.note}
              </span>
              <span className="mt-6 flex items-center gap-3 font-display text-[0.5625rem] uppercase tracking-[0.24em] text-olive-400">
                Discuss This Industry
                <span aria-hidden className="block h-px w-7 bg-current" />
              </span>
            </span>

            {/* Olive hairline that draws across the foot of a live tile. */}
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-olive-500 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
            />
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
