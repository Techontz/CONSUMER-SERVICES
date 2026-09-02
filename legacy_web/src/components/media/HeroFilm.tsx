"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Full-bleed background film for the site's mastheads.
 *
 * Two video elements, not one, both playing the same file.
 *
 * The approved clip is 10.01s and does not loop: its first and last frames
 * are far apart, so a single looping element does two visible things at the
 * seam. It re-seeks to zero, and for a frame or two there is nothing decoded
 * to paint — which is the black flash. And even once it paints, the picture
 * cuts from one camera position to a different one.
 *
 * So the film is double-buffered. One layer plays while the other waits at
 * frame 0. Roughly a second before the playing layer ends, the waiting layer
 * starts and the pair cross-fades; the finishing layer is then rewound and
 * becomes the one waiting. There is never a moment when no layer is decoded,
 * because the incoming layer is already playing before the outgoing one is
 * needed, so the black frame cannot occur.
 *
 * A short evergreen veil rises and falls across the same window. It is not
 * decoration: a cross-fade between two different camera positions reads as a
 * soft double-exposure, and a breath of brand colour over the top of it is
 * what turns that from a glitch into a dissolve.
 *
 * Under it all sits the poster, permanently. Every layer above it can be
 * mid-load, mid-seek or absent and the frame still has a picture in it —
 * which is the actual guarantee that the browser's black video background is
 * never exposed.
 *
 * The poster is also the whole treatment where no source is attached at all:
 * reduced motion, data saver, 2G. In that case nothing here animates.
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

/** Cross-fade length. Long enough to read as a dissolve, short enough not to. */
const FADE_MS = 650;
/** Starts this far from the end, leaving margin for a late frame callback. */
const LEAD_S = 0.95;

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
  const aRef = useRef<HTMLVideoElement | null>(null);
  const bRef = useRef<HTMLVideoElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [posterPainted, setPosterPainted] = useState(false);
  /** Which layer the viewer is currently seeing. */
  const [front, setFront] = useState<0 | 1>(0);
  /** Raised only while the two layers are dissolving. */
  const [dissolving, setDissolving] = useState(false);

  const wide = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const play = !reduced && allowsVideo();
  const source =
    play && posterPainted ? (wide || !mobileSrc ? src : mobileSrc) : null;

  /**
   * Sources are attached only once the poster has decoded — the film is
   * megabytes and would otherwise queue ahead of the frame the reader is
   * actually waiting on.
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
    const failsafe = window.setTimeout(done, 2500);
    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, [poster]);

  const safePlay = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, []);

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    const host = hostRef.current;
    if (!a || !b || !host || !source) return;

    a.load();
    b.load();

    // B waits, paused, at the first frame — so the hand-over has a decoded
    // picture to show the instant it is asked for, and so the two layers can
    // never advance together.
    b.pause();
    const parkB = () => {
      try {
        b.currentTime = 0;
      } catch {
        /* seeking before metadata throws; loadeddata runs this again */
      }
    };
    parkB();
    b.addEventListener("loadeddata", parkB);

    let live = 0 as 0 | 1;
    let handing = false;
    let onScreen = true;
    let raf = 0;

    const layer = (i: 0 | 1) => (i === 0 ? a : b);

    const startCycle = () => {
      setFront(live);
      safePlay(layer(live));
    };

    /**
     * Watched on a frame loop rather than `timeupdate`: that event fires
     * about four times a second, which is coarse enough to start a 650ms
     * dissolve with only 350ms of clip left and clip it against the end.
     */
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!onScreen || handing) return;
      const cur = layer(live);
      const next = layer(live === 0 ? 1 : 0);
      if (!cur.duration || !isFinite(cur.duration)) return;
      if (cur.currentTime < cur.duration - LEAD_S) return;

      handing = true;
      setDissolving(true);
      next.currentTime = 0;
      safePlay(next);
      const outgoing = cur;
      live = live === 0 ? 1 : 0;
      setFront(live);

      // Rewind the outgoing layer once it is fully hidden, so it is waiting
      // at frame 0 for its next turn. Never while it is still visible.
      window.setTimeout(() => {
        outgoing.pause();
        try {
          outgoing.currentTime = 0;
        } catch {
          /* seek can throw mid-load; the next cycle sets it again */
        }
        setDissolving(false);
        handing = false;
      }, FADE_MS + 60);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          onScreen = e.isIntersecting;
          if (e.isIntersecting) safePlay(layer(live));
          else {
            a.pause();
            b.pause();
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        a.pause();
        b.pause();
      } else if (onScreen) safePlay(layer(live));
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Belt and braces: if a hand-over is ever missed the element would sit on
    // its last frame, so `ended` restarts the cycle rather than showing black.
    const onEnded = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (v !== layer(live)) return;
      v.currentTime = 0;
      safePlay(v);
    };
    a.addEventListener("ended", onEnded);
    b.addEventListener("ended", onEnded);

    startCycle();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      a.removeEventListener("ended", onEnded);
      b.removeEventListener("ended", onEnded);
      b.removeEventListener("loadeddata", parkB);
    };
  }, [source, wide, webmSrc, safePlay]);

  // Framing, not a default. A phone shows about a quarter of a 16:9 frame
  // through `cover`, and the centre quarter of this one is trees and glass
  // with neither the sun nor the canal in it. 28% is the slice that still
  // carries all four things the frame is for — light, water, greenery,
  // architecture — and it is held until the viewport is wide enough to show
  // most of the frame anyway.
  const frame =
    "absolute inset-0 size-full object-cover object-[28%_50%] lg:object-[50%_50%]";
  // A small brightness lift to pay back what the evergreen veil above costs,
  // and a touch off saturation so that veil reads as a grade rather than a
  // filter laid on top.
  const grade = { filter: "contrast(0.99) brightness(1.04) saturate(0.98)" };

  // Deliberately no `autoPlay`. With it, both layers start together and run
  // in lockstep, so the hand-over cross-fades to a layer showing the same
  // frame — which does nothing, and leaves both to hit the end at once.
  // Playback is driven entirely from the effect below.
  const videoProps = {
    muted: true,
    playsInline: true,
    preload: "auto" as const,
    tabIndex: -1,
    "aria-hidden": true,
    disablePictureInPicture: true,
  };

  return (
    <div ref={hostRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* The floor. Always painted, so no layer above it can ever expose the
          browser's black video background. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-[28%_50%] bg-no-repeat lg:bg-[50%_50%]"
        style={{ backgroundImage: `url(${poster})`, ...grade }}
      />

      {[0, 1].map((i) => (
        <video
          key={i}
          ref={i === 0 ? aRef : bRef}
          {...videoProps}
          poster={poster}
          style={{
            ...grade,
            opacity: source ? (front === i ? 1 : 0) : 0,
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.4, 1)`,
          }}
          className={frame}
        >
          {source && wide && webmSrc ? (
            <source src={webmSrc} type="video/webm" />
          ) : null}
          {source ? <source src={source} type="video/mp4" /> : null}
        </video>
      ))}

      {/* The breath of evergreen that carries the dissolve. Two different
          camera positions cross-fading read as a double exposure; a little
          brand colour over the top is what makes it read as a dissolve. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[rgba(10,52,44,0.9)]"
        style={{
          opacity: dissolving ? 0.24 : 0,
          transition: `opacity ${Math.round(FADE_MS / 2)}ms ease-in-out`,
        }}
      />
    </div>
  );
}
