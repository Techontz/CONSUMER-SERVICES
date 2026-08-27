import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A still photograph on a slow drift, used behind the interior page heroes.
 *
 * The homepage's film lives in HeroFilm; this is the quieter treatment for
 * every other opener, where a moving background would compete with the page
 * rather than set it up.
 */
export function CinematicBackdrop({
  src,
  alt = "",
  priority = false,
  position = "center 55%",
  drift = true,
  className,
  sizes = "115vw",
  quality = 82,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  position?: string;
  drift?: boolean;
  className?: string;
  /**
   * Defaults to 115vw, not 100vw: `u-drift` scales this image between 1.08
   * and 1.14, so a 100vw request under-asks by up to 14% and the browser
   * upscales the result. Measured as a 1.11x shortfall before this changed.
   */
  sizes?: string;
  /** Lower this where a heavy scrim sits over the photograph. */
  quality?: number;
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0", drift && "u-drift")}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          // Marks the hero photograph as the page's most important fetch, so
          // it is not queued behind the rest of the page's resources.
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes}
          quality={quality}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
