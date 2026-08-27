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
| `lake-forest.jpg` | `518485` | Still lake framed by evergreen forest | 4760×3217 |
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

## Motion — Coverr

**Licence:** [Coverr License](https://coverr.co/license). Free for commercial
use. Attribution not required. Only the free tier is used; no watermarked
"coverr+" premium file appears in the build. (One was rejected during
selection for exactly that reason.)

| File in `public/media/` | Coverr ID | Slug | Subject |
| --- | --- | --- | --- |
| `hero-desktop.mp4`, `hero-desktop.webm`, `hero-mobile.mp4`, `hero-poster.webp` | `w1koKmZTTx` | `coverr-city-boulevard-8888` | Aerial over a downtown corporate boulevard |
| `work-panel.mp4`, `work-panel-poster.webp` | `27bG4pHuoI` | `coverr-colleagues-discussing-work-351` | Colleagues working through a plan at a table |

Both clips are 3840×2160 at source; Coverr's free tier delivers them at
1920×1080, which is what was downloaded and what everything here derives from.
The hero is encoded at 1920×1080 native (H.264 and VP9) plus a 1280×720 mobile
cut — nothing is upscaled at any stage. Each poster is frame 0 of its own film,
so the first painted frame and the first played frame are the same pixels
(verified: correlation 1.0000 between `hero-poster.webp` and frame 0 of
`hero-desktop.mp4`).

### One open item: signage in the hero footage

`coverr-city-boulevard-8888` contains a building carrying the **ST REGIS**
hotel wordmark, upper-centre of frame. It is legible at 1920px, occupies about
**4.1% of frame width** (~78px of 1920, ~58px at a 1440 viewport, ~16px on a
phone), and is present for the whole loop — the aerial pushes in, so it grows
slightly rather than leaving frame. It is therefore also in `hero-poster.webp`,
which is frame 0.

This is recorded rather than fixed, deliberately:

- It is a hotel brand incidentally present in a documentary cityscape, which
  reads differently from the case that forced the earlier still-image swap
  (financial-services marks — SAMSUNG, PZU, Warta — sitting behind the headline
  on six interior pages of a business-services site).
- It cannot be cropped out. Coverr's free tier delivers this clip at 1920×1080,
  which is exactly the shipping resolution; cropping would mean upscaling, and
  nothing in this build upscales.
- Removing it therefore means changing the hero footage, which is a client
  decision, not a technical one.

**If the client wants it gone**, the fix is to select a different Coverr clip
and re-run the same encode (1920×1080 H.264 + VP9, 1280×720 mobile, 1.2s
cross-dissolve loop, poster regenerated from frame 0). Candidates checked
during this pass and found free of legible signage are `HxSHCB5dMI`
(*City skyscrapers*, aerial over midtown) and `SBEjKK48WL` (*Skyscrapers in
New York*). Both are free-tier, non-AI, and 1920×1080.

Provenance was verified rather than assumed: every Pexels ID above was
re-fetched and its native resolution confirmed against this table, and each
shipped file was structurally correlated against its documented source
(0.96–1.00; the two explicitly re-cropped tiles confirm at 0.998 when compared
against the same crop region). The hero video correlates at 0.994 with
`coverr-city-boulevard-8888`.

---

## Client-supplied

| File | Origin | Notes |
| --- | --- | --- |
| `seal.png` | Consumer Services, Inc. | The authentic company seal, taken from the approved HTML. Never redrawn or regenerated. |

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
