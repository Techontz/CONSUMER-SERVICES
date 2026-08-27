"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A looping film used as section media rather than as a background.
 *
 * Unlike the hero, this only starts loading once it is close to the viewport
 * — a clip halfway down the page has no business competing with anything
 * above it. The poster carries the frame until then, so the layout is settled
 * from first paint either way.
 */
export function SectionFilm({
  poster,
  src,
  alt = "",
  className,
}: {
  poster: string;
  src: string;
  alt?: string;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // Attach the source only when the section is nearly on screen.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /^(slow-)?2g$/.test(conn.effectiveType)) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSource(src);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, [src]);

  // Play only while visible.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !source) return;

    const stop = () => setPlaying(false);
    const start = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(stop);
    };

    v.addEventListener("playing", () => setPlaying(true));
    v.addEventListener("error", stop);
    v.addEventListener("stalled", stop);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else if (!v.paused) v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);

    const onVisibility = () => (document.hidden ? v.pause() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [source]);

  // `size-full` rather than `absolute inset-0`: this sits inside a fixed-aspect
  // frame, and a hardcoded `relative` here would silently beat any `absolute`
  // a caller passed in — Tailwind resolves position utilities by stylesheet
  // order, not by the order they appear in the class attribute. That collapsed
  // this panel to zero height once already.
  return (
    <div
      ref={hostRef}
      className={cn("relative size-full overflow-hidden", className)}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        quality={78}
        className="object-cover"
      />

      {source ? (
        <video
          ref={videoRef}
          src={source}
          poster={poster}
          muted
          loop
          autoPlay
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden
          disablePictureInPicture
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out",
            playing ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
