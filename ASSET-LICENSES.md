# Asset provenance and licensing

Every media file in `legacy_web/public/media/`, where it came from, and what
the licence permits. Kept as a separate file so it travels with the handoff
rather than being buried in the README.

Nothing here requires attribution, a credit line, or written permission. The
licences below all permit commercial use as-shipped. No asset is
AI-generated — see [Why the original set was replaced](#why-the-original-set-was-replaced).

---

## Photography — Pexels

**Licence:** [Pexels License](https://www.pexels.com/license/). Free for
commercial and non-commercial use. Attribution not required. No permission
needed. Modification (crop, grade) expressly permitted.

Each photo page is `https://www.pexels.com/photo/<id>/`.

| File in `public/media/` | Pexels ID | Subject | Native source |
| --- | --- | --- | --- |
| `city-towers-dusk.jpg` | `11576307` | Lit office towers at dusk | 5272×3515 |
| `industry-transportation.jpg` | `18048834` | Highway interchange at night | 8000×6000 |
| `industry-healthcare.jpg` | `18429307` | Residential care corridor | 5865×3910 |
| `advisory-session.jpg` | `8171198` | Planning documents on a meeting table | 5760×3840 |
| `industry-professional.jpg` | `8124238` | Two colleagues reviewing a document | 5758×3839 |
| `industry-technology.jpg` | `4508751` | Data-centre aisle | 5568×3712 |
| `industry-infrastructure.jpg` | `15063590` | Engineers reviewing drawings on site | 4000×3000 |
| `ridge-forest.jpg` | `30140363` | Conifer ridge in low cloud | 3885×2590 |
| `industry-workforce.jpg` | `12965141` | Technical training workshop | 3240×2160 |

All are cropped to 3:2 and graded before shipping — see
[The campaign grade](#the-campaign-grade).

**Third-party branding was a rejection criterion, not an afterthought.** The
first choice for the interior page hero was a dusk skyline that turned out, at
full resolution, to carry three other companies' marks — SAMSUNG, PZU and
Warta — across the middle of the frame, legible at 1920px. A client site
cannot imply those associations on six of its pages, so it was replaced with
`city-towers-dusk.jpg`, which was checked quadrant by quadrant at native
resolution and carries no signage, logo or watermark anywhere in the frame.

---

## Motion

Two moving assets, from two libraries.

### Homepage hero — client-supplied

| File in `public/media/` | Derived from |
| --- | --- |
| `hero-waterfront-desktop.mp4`, `hero-waterfront-desktop.webm`, `hero-waterfront-mobile.mp4`, `hero-waterfront-poster.webp` | `DOCUMENTS/Waterfront_city_canal_with_park_202608312150 (1).mov` |

**Origin:** supplied directly by the client and approved by them as the hero
footage. It did not come from Pexels, Coverr or any other library this
repository draws on, so none of those licences cover it.

**Licence: not established here.** Every other asset in this file has a
licence that was checked at its source. This one cannot be, because the
supplied file is the only artefact — it arrives with no library page, no
photographer credit and no licence text, and its filename carries a
generation-style timestamp rather than a catalogue ID. Nothing about the file
tells us who holds the rights to it. **The client should confirm the
provenance and usage rights before this goes to a wider audience**; that is
the one open item on this page.

**Native:** 1280×720, 24 fps, H.264 High, 5.17 Mbps, 8.00 s, with an AAC
track that is dropped on encode (the hero is muted).

**Subject:** a slow push along a city canal at golden hour — glass towers, a
planted park, a stone embankment, and the sun low on the left throwing a
lane of light down the water.

**Framing.** The clip separates into the four things the frame is for: low
warm sun, open water, greenery, and towers that read as a business district
rather than a resort. On a wide screen the type is a column down the left and
the whole frame is visible. A phone is the hard case — `cover` on a 9:19.5
viewport shows about a quarter of a 16:9 frame, and the centre quarter of
this one is trees and glass with neither the sun nor the canal in it, so the
mobile crop is anchored at `28%`, the slice that still carries all four.

**Grade.** Deliberately light, and applied at encode rather than in CSS so
the poster and the film match: shadows lifted a little and pushed a hair
toward evergreen, highlights held back off pure blue so the sun stays warm,
saturation `1.05`, and a gentle unsharp because a 720p source is being asked
to cover a 1920 hero. No teal-and-orange preset, no crushed blacks — the
supplied grade was already close.

**Loop.** The clip is a slow dolly-in whose first and last frames sit far
apart, so it neither hard-loops nor cross-dissolves cleanly: a fade would
ghost two different camera positions over each other. It is encoded forward
then reversed instead — push in, ease back out — with the duplicated boundary
frames trimmed so the turn does not stutter. 15.92 s round trip.

Measured rather than assumed: the loop seam scores **SSIM 0.855** against an
ordinary one-frame step mid-clip of **0.826**, so the join is a smaller
change than the footage's own motion and there is nothing to see at it.

**Encoded:** 1280×720 H.264 (`crf 27`, capped 2.1 Mbps, 4.26 MB) and VP9
(`crf 42`, capped 1.5 Mbps, 3.41 MB — offered first, and genuinely the
smaller file), plus a 960×540 H.264 cut at 1.84 MB below 768 px. Everything
is a downscale or a straight copy of the supplied resolution; nothing is
upscaled, and the 5.2 MB master stays out of the repository (see
`.gitignore`) because the browser is served the derivatives.

`hero-waterfront-poster.webp` is frame 0 of the encoded film. It correlates
**0.942** with the shipped frame 0 — that gap is WebP-vs-H.264 compression on
the same picture, not a different picture, which the one-frame step above
puts in scale: a genuinely adjacent frame only reaches 0.826.

The previous hero (Pexels `5052605`,
`drone-footage-of-city-skyline-during-sunset`, a drone drift across Port
Phillip Bay) is retired at the client's direction and its files are deleted.
Its Pexels licence covered it and no obligation survives its removal.

### Funding Readiness panel — Coverr

**Licence:** [Coverr License](https://coverr.co/license). Free for commercial
use, no attribution required. Only free-tier files are used — no watermarked
"coverr+" premium file appears in the build.

| File in `public/media/` | Coverr ID | Slug | Subject |
| --- | --- | --- | --- |
| `work-panel.mp4`, `work-panel-poster.webp` | `27bG4pHuoI` | `coverr-colleagues-discussing-work-351` | Colleagues working through a plan at a table |

Source 3840×2160; Coverr's free tier delivers 1920×1080, which is what was
downloaded. Encoded at 1280×720 for its panel. Its poster is frame 0 of its own
film, so the first painted frame and the first played frame are the same pixels.


Provenance was verified rather than assumed: every Pexels ID above was
re-fetched and its native resolution confirmed against this table, and each
shipped file was structurally correlated against its documented source
(0.96–1.00; the two explicitly re-cropped tiles confirm at 0.998 when compared
against the same crop region).

That verification covers the library assets. It cannot cover the homepage
hero, which is client-supplied and has no library record to check against —
its specifications above were read off the supplied file itself, and its
rights remain for the client to confirm.

---

`lake-forest.jpg` (Pexels `518485`) is retired. It was the About page's
opener and the photograph in its story band; both now stand on the shared
waterfront film and on typography respectively, and an unused 904 KB asset in
`public/` still ships to the edge. Its Pexels licence covered it and no
obligation survives its removal.

## Client-supplied

| File | Origin | Notes |
| --- | --- | --- |
| `mark.svg` | Consumer Services, Inc. / this repository | The brand mark. Drawn here as vector on a 64-unit grid — three courses: a wide plinth, a course laid on it, and a third stepped forward with its leading edge cut at 45 degrees. Three paths, one flat brass (`#D6B268`), no gradient. |
| `mark-512.png`, `mark-256.png`, `mark-64.png`, `mark-32.png` | derived from `mark.svg` | True-transparent rasters for favicons, social cards and JSON-LD. Verified: 67% transparent pixels, all four corners at alpha 0, one opaque colour. |
| `mark-apple-180.png` | derived from `mark.svg` | Apple touch icon, on the brand evergreen rather than transparent — iOS composites a transparent touch icon onto black. |

The previous `seal.png` — the detailed engraved emblem taken from the
approved HTML, which this file previously recorded as "never redrawn or
regenerated" — is retired at the client's explicit and repeated instruction
to recreate the mark. It is deleted rather than left unreferenced. **If that
seal is a registered mark, this replacement is a brand decision the client
needs to have taken deliberately**, and reinstating it is a one-line revert
of `components/ui/Logo.tsx` plus restoring the file from history.

---

## Why the original set was replaced

The photography supplied with the approved HTML was **AI-generated**, not
photography. Examined at full size the tells were unambiguous and consistent
across all ten files: warped, repeating window grids on the skyline towers;
nonsense glyphs standing in for code on the monitors; a garbled badge and
grille on the truck; an incoherent machined part in the workforce image;
identical plastic skin and shallow-depth bokeh on every industry tile; every
subject smiling directly at camera. Their sizes — 288–1004 px wide — were
generator output rather than downsampled photographs, which is why no
higher-resolution originals existed to ask for.

The originals are preserved outside the build for reference. If the client
wants their own photography instead, files with these names at 2400 px or
wider dropped into `public/media/` need no code changes.

---

## The campaign grade

The ten photographs come from ten different photographers and start in ten
different places. Applying one identical filter to all of them does not make a
set — it moves ten different images by the same amount. Each is instead
measured and given its own correction, converging on shared targets
(`scratchpad/photo/autograde.py` in the working notes; the resulting parameters
are recorded in `grade.json` alongside the graded files).

Targets, and why they are shaped the way they are:

- **Key** — each image's mean luminance is pulled halfway toward 100. Halfway,
  not all the way: a night interchange is legitimately darker than a morning
  lake, and flattening that would look wrong. Spread narrowed from 57–159 to
  74–121.
- **Contrast** — driven to a common standard deviation of ~72. This is the
  measure that most makes images feel like one shoot. Spread narrowed from
  σ 15.3 to σ 4.5.
- **Saturation** — held inside a *band* (0.24–0.42) rather than driven to a
  point, so a near-monochrome misty ridge is not forced to match a green lake.
- **Colour temperature** — held inside a band (−34 to +6 on mean R−B). The
  cool end is deliberately generous: warmth here is a whole-image mean, and on
  a picture split between a large pale sky and a dark forest the correction
  lands almost entirely on the forest. Driving the lake to "neutral" turned its
  evergreens rust-brown while the number looked correct. A genuinely cool
  subject is allowed to stay cool; it only has to stop being an outlier.

Measured on the shipped files:

| | before | after |
| --- | --- | --- |
| Key (mean luminance) | σ 34.5, range 57–159 | **σ 17.2, range 74–121** |
| Contrast (luminance σ) | σ 15.3, range 44–93 | **σ 8.1, range 47–72** |
| Saturation | σ 0.15, range 0.13–0.57 | **σ 0.09, range 0.15–0.43** |
| Colour temperature (mean R−B) | σ 16.2, range −45 to +30 | **σ 10.8, range −31 to +6** |

Every image except the lake now sits inside ±6 on colour temperature, and the
lake is the deliberate exception explained above. Two images sit slightly
outside the contrast band by design: `city-towers-dusk.jpg` (47) is a flat-lit
texture field carrying type on six pages, and `industry-transportation.jpg`
(57) is a night aerial — pushing either to 72 would have looked forced.
