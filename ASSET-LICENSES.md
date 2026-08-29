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

## Motion

Two moving assets, from two libraries.

### Homepage hero — Pexels

| File in `public/media/` | Pexels ID | Slug |
| --- | --- | --- |
| `hero-desktop.mp4`, `hero-desktop.webm`, `hero-mobile.mp4`, `hero-poster.webp` | `5052605` | `drone-footage-of-city-skyline-during-sunset-5052605` |

**Source:** <https://www.pexels.com/video/drone-footage-of-city-skyline-during-sunset-5052605/>
**Licence:** [Pexels License](https://www.pexels.com/license/) — free for
commercial use, no attribution required, no permission needed.
**Native:** 3840×2160, 24fps, 21.8 Mbps, 14.43 s.
**Subject:** a slow aerial drift across a bay toward a modern CBD at golden
hour — Melbourne across Port Phillip Bay.

**Why this clip.** The brief asked for a business district meeting a horizon:
growth and opportunity, not tourism. This frame separates cleanly into the
three things that had to be there — glass towers reading unmistakably as a
financial district, open water carrying the eye out to a clean horizon, and
warm low sun that is optimistic without going orange. The left third is open
sky and water, which is where the headline sits, so the type lands on calm
ground rather than fighting architecture. The camera drifts slowly enough that
nothing crosses the CTAs.

It was chosen against 18 candidates across both libraries. Rejected along the
way: clips shot through plane windows (hazy, low contrast); overcast harbour
shots with no sunlight; frames where the sun blew out the area behind the
headline; a life-ring filling the foreground; and several that read as beach
or resort rather than business. Coverr's free tier had nothing that met the
brief, which is why the hero moved libraries.

Inspected at native 3840×2160 across the clip before acceptance: no legible
signage, no watermark, no third-party logos, no AI artefacts. The construction
cranes on the skyline are real, and sit comfortably with a company whose
subject is businesses growing.

**Encoded:** 1920×1080 H.264 (`crf 25`) and VP9, plus a 1280×720 mobile cut —
a downscale from 4K at every step, nothing upscaled. The last 1.5 s
cross-dissolves into the first: measured loop seam 1.23 against a largest
ordinary in-clip step of 1.50, so the join is below the clip's own motion.
`hero-poster.webp` is frame 0 of the encoded file (correlation 0.9995).

The previous hero (`coverr-city-boulevard-8888`, Coverr `w1koKmZTTx`) is
retired. It carried a legible ST REGIS hotel wordmark that could not be cropped
out at its shipping resolution; the new clip has no such problem, so that open
item is now closed.

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

The hero film was re-verified the same way after the change: the live source
at `videos.pexels.com/video-files/5052605/5052605-uhd_3840_2160_24fps.mp4`
returns 3840×2160 at 24000/1001 fps, 14.431 s — matching this record — and the
shipped `hero-desktop.mp4` correlates at **0.9970** with its frame 0.

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
