"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Full-bleed background film for the homepage hero.
 *
 * One element, not two. The poster is the video's own `poster` attribute and
 * is byte-for-byte the film's first frame, which buys three things at once:
 *
 *  - It paints as soon as that one image arrives, and because it is the video
 *    element painting, playback never supersedes it as a later, larger
 *    largest-contentful-paint candidate. Layering a separate <img> underneath
 *    and cross-fading the video over it cost roughly 1.2s of LCP for a
 *    transition nobody can see.
 *  - There is no jump when playback begins — the first rendered frame and the
 *    first played frame are the same pixels.
 *  - It is the fallback for free. Where no source is attached — reduced
 *    motion, data saver, 2G — the poster is simply what the element shows.
 *
 * The poster is preloaded at high priority by the hero itself.
 */

/** Held back to the poster on data-saver and 2G connections. */
function allowsVideo() {
  if (typeof navigator === "undefined") return false;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /^(slow-)?2g$/.test(conn.effectiveType)) return false;
  return true;
}

export function HeroFilm({
  poster,
  src,
  webmSrc,
  mobileSrc,
  className,
}: {
  poster: string;
  src: string;
  /** VP9 alternative, offered first where the browser takes it. */
  webmSrc?: string;
  mobileSrc?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [posterPainted, setPosterPainted] = useState(false);

  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Derived, not stored: the encode follows the viewport, so rotating a
  // tablet swaps to the right file instead of keeping whichever one happened
  // to be chosen at mount.
  const play = !reduced && allowsVideo();
  const source =
    play && posterPainted ? (wide || !mobileSrc ? src : mobileSrc) : null;

  /**
   * Sources are attached only once the poster has decoded.
   *
   * The film is two megabytes. Started any earlier it saturates a throttled
   * connection and the seventy-kilobyte poster — the frame the reader is
   * waiting on — queues behind it. Holding the film back by the length of one
   * image decode is imperceptible, and it is the difference between the hero
   * appearing at one second and at two.
   */
  useEffect(() => {
    let cancelled = false;
    const done = () => !cancelled && setPosterPainted(true);

    const img = new Image();
    img.src = poster;
    if (img.decode) img.decode().then(done, done);
    else if (img.complete) done();
    else {
      img.onload = done;
      img.onerror = done;
    }

    // Never leave the film unattached because an image event never fired.
    const failsafe = window.setTimeout(done, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, [poster]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !source) return;
    v.load();

    const start = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else if (!v.paused) v.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);

    const onVisibility = () => (document.hidden ? v.pause() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [source, wide, webmSrc]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden
        disablePictureInPicture
        // Framing, not a default. A phone shows about a quarter of a 16:9
        // frame through `cover`, and the centre quarter of this one is trees
        // and glass with neither the sun nor the canal in it. 28% is the
        // slice that still carries all four things the frame is for — light,
        // water, greenery, architecture — and it is held until the viewport
        // is wide enough to show most of the frame anyway.
        // Layer four of the grade: contrast down to flatten the compression
        // the scale exposes, brightness up to pay back what the veil above
        // costs, saturation down so the evergreen over it reads as a grade
        // and not a filter.
        style={{ filter: "contrast(0.95) brightness(1.05) saturate(0.99)" }}
        className="absolute inset-0 size-full object-cover object-[28%_50%] lg:object-[50%_50%]"
      >
        {source && wide && webmSrc ? (
          <source src={webmSrc} type="video/webm" />
        ) : null}
        {source ? <source src={source} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
