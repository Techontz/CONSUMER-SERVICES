# LegacyByConsumer

The website for **Consumer Services, Inc.** — production domain
**https://www.LegacybyConsumer.com**

Built from the client-approved HTML in [`DOCUMENTS/`](DOCUMENTS), which remains
the source of truth for all copy, structure, navigation and imagery.

```
legacy_web/   Next.js 16 · React 19 · TypeScript · Tailwind CSS 4   (the site)
backend/      Laravel 13 · MySQL · Filament 4                       (forms + admin)
DOCUMENTS/    The approved HTML supplied by the client              (reference)
```

---

## Contents

- [What is here](#what-is-here)
- [Quick start](#quick-start)
- [Frontend](#frontend-legacy_web)
- [Backend](#backend-backend)
- [Admin panel](#admin-panel)
- [Environment variables](#environment-variables)
- [The hero film](#the-hero-film)
- [Deployment](#deployment)
- [Two defects worth recording](#two-defects-worth-recording)
- [Outstanding client content](#outstanding-client-content)

---

## What is here

### Pages

| Route | Source document |
| --- | --- |
| `/` | `LegacyByConsumer-FULL-SITE-DEVELOPER-PREVIEW-V5-FIXED-1991.html` |
| `/services` | `LegacyByConsumer-SERVICES-EVERGREEN-MIST.html` |
| `/about` | `LegacyByConsumer-ABOUT-PAGE-LAKE-FINAL.html` |
| `/industries` | `LegacyByConsumer-INDUSTRIES-OFFLINE-V2-HERO.html` |
| `/resources` | `LegacyByConsumer-RESOURCES-APPROVED-OFFLINE.html` |
| `/contact` | `LegacyByConsumer-CONTACT-US-369-APPROVED.html` |
| `/assessment` | Full-site preview — Business Readiness Assessment |
| `/funding-readiness` | Full-site preview — Funding Readiness |
| `/infrastructure-readiness` | Full-site preview — Infrastructure Readiness |
| `/healthcare-development` | Full-site preview — Healthcare & Residential Care |
| `/privacy-policy`, `/data-sharing` | Linked from the approved footer — see [Outstanding client content](#outstanding-client-content) |

Plus `/sitemap.xml`, `/robots.txt`, a generated Open Graph image and a 404 page.

### Why there is a backend

The approved designs contain two working forms — the Contact inquiry and the
Business Readiness Assessment. Both collect real leads, so both are stored,
acknowledged with a reference, notified on, and managed in an admin panel.
Nothing else on the site needs a server, so nothing else has one.

---

## Quick start

Requires Node 20+, PHP 8.3+, Composer and MySQL 8+.

```bash
# 1. Database
mysql -u root -e "CREATE DATABASE legacybyconsumer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
#    set DB_USERNAME / DB_PASSWORD in .env, then:
php artisan migrate
php artisan legacy:api-key        # copy the key it prints into BOTH .env files
php artisan legacy:admin          # create your admin sign-in
php artisan serve --port=8000

# 3. Frontend (second terminal)
cd legacy_web
npm install
cp .env.example .env.local        # paste the same API key as API_KEY
npm run dev
```

The site runs at `http://localhost:3000`, the admin panel at
`http://localhost:8000/admin`.

---

## Frontend (`legacy_web`)

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```

### How it is put together

```
src/
  app/                 routes, metadata, sitemap, robots, OG image
    api/               route handlers that forward to Laravel
  components/
    forms/             the two real forms, with validation and states
    layout/            header, mega menu, mobile navigation, footer
    media/             the hero backdrop (still, with optional film layer)
    sections/          page sections, composed per route
    ui/                buttons, fields, containers, reveals
  lib/
    site.ts            company facts, navigation — one source of truth
    content/           all approved copy, kept out of the components
    forms.ts           validation shared by the browser and the route handler
    seo.tsx            metadata helper and structured data
```

Every piece of approved copy lives in `lib/content/`. No headline, statistic or
contact detail is written inline in a component, so the client's wording can be
changed in one place and nothing can quietly drift out of sync.

### Design system

Defined once as Tailwind tokens in `src/app/globals.css`, taken from the
approved HTML:

| | |
| --- | --- |
| Evergreen | `#04120F` `#06201B` `#083430` `#0E463F` `#143A2E` |
| Brass | `#DDBC72` `#C9A24B` `#B98B33` `#7E5C22` |
| Paper | `#FBF9F4` `#F6F2E9` `#F3EEE3` |
| Type | Archivo condensed (display) · Mulish (body) · Fraunces (hero only) |

Two brass values were darkened from the source designs so small text clears
the WCAG AA 4.5:1 minimum; the hue is unchanged.

### Where the design came from

| Reference | Governs |
| --- | --- |
| `DOCUMENTS/*.html` | All copy, structure, navigation and imagery — authoritative |
| `DOCUMENTS/REFERENCE.mov` | The homepage hero: full-bleed film, type anchored low and left behind a directional scrim |
| `DOCUMENTS/DESIGN.mov` | The visual system everywhere else — typography, section rhythm, components, motion |

**What was taken from DESIGN.mov.** Its recording is a travel operator's site,
so its subject matter is irrelevant here — but its *design language* is what
this site is now built on:

- **Letterspaced display capitals** as the dominant voice. Every heading,
  label, button, nav item and wordmark is set in them.
- **The section opener**: an index numeral, a rule, the label, then the
  heading — repeated on every section as the spine of the page.
- **Two-tone heading treatment**, pale against the accent colour.
- **Edge-to-edge photographic mosaic** that opens to detail on hover — now the
  Industries page.
- **Index-drives-one-panel** layout — now the seven service pathways.
- **Full-bleed colour bands** alternating with photography, joined by shallow
  **angled seams** rather than flat horizontal lines.
- **Outlined buttons** with thin rules, wide tracking, and a fill that wipes in
  from the left.

What was not carried over is its *content and brand graphics* — the safari
imagery, the animal silhouettes, the yellow palette. Those are replaced by
LegacyByConsumer's own evergreen and brass and by the client's approved
photography.

### Typography

| Role | Face | Why |
| --- | --- | --- |
| Display | **Archivo**, variable, `wght 800 / wdth 86` | Arrived at by rendering the same words beside the reference specimen. Archivo Black is too wide, Anton too narrow; the reference sits between them, and the width axis is the only way to land there. The variable file is larger than a static cut, which is a deliberate trade — this face is the identity of the site. |
| Body | **Mulish**, 400 / 600 | Humanist, large x-height, warm without being soft — the character the reference sets its running text in. Only two cuts are loaded; nothing else was used. |
| Editorial | **Fraunces**, static roman + italic | The homepage hero alone. That frame follows the *other* reference, where the headline is a serif with an italic accent. Static cuts rather than the variable face — less than half the bytes on the critical path, for one headline. |

Cinzel and Inter, used in the first build, are gone. Dropping them also cut
main-thread work noticeably.

### Motion

Deliberately built without an animation library.

- Hero headlines animate with **CSS keyframes**, so the largest element on the
  page does not wait for React to hydrate.
- Scroll reveals are **CSS transitions** toggled by one small observer
  (`components/ui/RevealObserver.tsx`). Elements are hidden only while
  `html[data-motion="on"]` is set by an inline script, and a fallback lifts
  that gate if the app never hydrates — **content can never be trapped behind
  an animation that fails to run**.
- The heritage parallax uses `animation-timeline: view()`, and simply sits
  still where that is unsupported.
- Reveals are not all fades: media **wipes open** from its lower edge out of a
  slight over-scale, headlines **rise from behind their own edge**, and only
  body copy fades and lifts.
- Navigating plays a **curtain wipe** — an evergreen panel sweeps down and
  lifts. It is decorative only: the new page is already painted underneath and
  the curtain never gates rendering.
- `prefers-reduced-motion: reduce` removes all of it.

### Accessibility

`axe-core` reports **zero violations** across all 11 pages at 390px and 1440px,
covering WCAG 2.1 A/AA and best practice. Keyboard: a working skip link, a
visible focus ring on every control, Escape closes the mega menu, and tabbing
out of the header closes it.

---

## Backend (`backend`)

A small, deliberately narrow API. Only the site's own server may call it.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/contact-inquiries` | Contact page submissions |
| `POST` | `/api/v1/assessments` | Business Readiness Assessment |
| `GET` | `/api/up` | Liveness probe |

```bash
php artisan test          # 24 feature tests
php artisan legacy:api-key
php artisan legacy:admin
```

### Request flow

```
browser  →  Next.js route handler  →  Laravel API  →  MySQL
            (holds the API key)       (validates again)
```

The browser never talks to Laravel and never sees the key. The route handler
validates, drops obvious bots, then forwards; Laravel validates everything
again from scratch.

### Security

- **API key** on every write, compared with `hash_equals`.
- **Rate limited** to 8 submissions per IP per hour, keyed on the address the
  frontend forwards rather than the frontend's own.
- **Mass assignment locked down** — `status`, `handled_by`, `internal_notes`
  and `reference` are outside `$fillable`, so a payload cannot mark itself
  qualified. `is_admin` is likewise not fillable; panel access is granted only
  by `php artisan legacy:admin`. Both are covered by tests.
- **Allow-lists** on every select field, matching the approved options exactly.
- Input trimmed and stripped of control characters before validation.
- HTTPS forced and strict Eloquent mode outside production.
- Notifications are queued and wrapped, so a mail failure never loses a
  submission that is already stored.

A note on email validation: these use `email:rfc`, not `email:rfc,dns`. The DNS
variant performs a live MX lookup per submission — it rejects valid addresses
on domains without MX records and fails closed when DNS is slow, which loses
real inquiries. A mistyped address only costs a reply.

---

## Admin panel

Filament 4 at `/admin`, branded to match the site.

- **Dashboard** — what is awaiting a first response, what arrived this week,
  and anything left unopened for more than two days.
- **Contact Inquiries** and **Readiness Assessments** — triage tabs (New, In
  Review, Contacted, Qualified, Closed), search, filters, and a sidebar badge
  counting what is new.
- Submitted fields are read-only; status, owner and internal notes are
  editable. Opening a record for the first time stamps who handled it and when.
- Records cannot be created by hand — they only ever arrive from the website.

Create the first user with `php artisan legacy:admin`. A user row alone grants
nothing; the panel checks `is_admin`, which only that command sets.

---

## Environment variables

### `legacy_web/.env.local`

| Variable | Purpose |
| --- | --- |
| `API_URL` | Base URL of the Laravel API. Server-side only. |
| `API_KEY` | Shared secret. Server-side only — **never** prefix with `NEXT_PUBLIC_`. |

### `backend/.env`

| Variable | Purpose |
| --- | --- |
| `DB_*` | MySQL connection. |
| `LEGACY_API_KEY` | Must match `API_KEY` above, exactly. |
| `LEGACY_NOTIFY_EMAIL` | Where submissions are announced. Comma-separate for several. |
| `LEGACY_SUBMISSIONS_PER_HOUR` | Rate limit per IP. Defaults to 8. |
| `MAIL_*` | SMTP details for notifications. |

Both `.env.example` files carry safe placeholders. Neither real file is
committed.

---

## The hero film

The homepage opens on a full-bleed cinematic film, per the composition in
`DOCUMENTS/REFERENCE.mov`.

**The footage is supplied by the client** — a slow push along a city canal at
golden hour: glass towers, a planted park, a stone embankment, and the sun low
on the left throwing a lane of light down the water. It is the approved hero
asset, and it reads as opportunity and forward movement rather than as a
destination, which is the whole point of putting a film there.

It is graded lightly at encode — shadows lifted a touch toward evergreen,
highlights held off pure blue so the sun stays warm, a small saturation and
sharpening pass — and it loops by running forward then reversed, because a
slow dolly-in neither hard-loops nor cross-dissolves cleanly. Its licence is
the one open item on the asset register; see `ASSET-LICENSES.md`.

No frame of either reference recording appears anywhere in the build.

| File | Purpose |
| --- | --- |
| `public/media/hero-waterfront-desktop.webm` | VP9, 1280×720, 3.4 MB — offered first on wide screens |
| `public/media/hero-waterfront-desktop.mp4` | H.264, 1280×720, 4.3 MB — the fallback everywhere |
| `public/media/hero-waterfront-mobile.mp4` | H.264, 960×540, 1.8 MB — below 768px |
| `public/media/hero-waterfront-poster.webp` | 1280×720, 151 KB; paints immediately and is always the fallback |
| `public/media/work-panel.mp4` | H.264, 1280×720, 660 KB — Funding Readiness, loaded near-viewport |

The desktop film ships at **1280×720, which is the supplied resolution** —
the previous hero was a 4K library clip and could be cut at 1920×1080, this
one cannot. Nothing in the pipeline upscales, so the film is served at its
native size and the browser does the rest; a light sharpening pass in the
grade is there to help that. The files run 15.9 s rather than 8 because the
loop is the clip forward and then reversed.

### How it behaves

The film **plays under normal conditions on desktop and on mobile** — that is
the point of the frame, and it is not deferred to idle.

It is **one element, not two**. The poster is the video's own `poster`
attribute and is byte-for-byte the film's first frame, which buys three things
at once:

- It paints as soon as that one image arrives, and because it is the video
  element painting, playback never supersedes it as a later, larger LCP
  candidate. Layering a separate `<img>` underneath and cross-fading the video
  over it cost roughly 1.2s of LCP for a transition nobody can see.
- There is no jump when playback begins — the first rendered frame and the
  first played frame are the same pixels.
- It is the fallback for free. Where no source is attached, the poster is
  simply what the element shows.

The poster is preloaded at high priority, and sources are attached only once it
has decoded — a two-megabyte film started any earlier saturates a throttled
connection and starves the 53 KB image the reader is actually waiting on.

Sources are withheld entirely under `prefers-reduced-motion`, on a data-saver
connection, and on 2G. The encode follows the viewport through
`useSyncExternalStore`, so rotating a tablet swaps to the correct file rather
than keeping whichever was chosen at mount.

### Measured

Real Chrome, 4× CPU throttle, simulated slow 4G:

| Page | LCP | CLS |
| --- | --- | --- |
| Home | 1.72s | 0.001 |
| Services | 1.22s | 0.016 |
| Contact | 1.02s | 0.013 |
| Industries | 0.94s | 0.013 |

All well inside the "good" thresholds (LCP < 2.5s, CLS < 0.1), with the film
playing.

### Replacing it

Overwrite the files above under the same names. Nothing else changes.
**Spec:** 1920×1080 H.264, 12–18 seconds, seamless loop, **no audio track**,
under 4 MB. Ambient movement only — no cuts, no camera moves.

---

## Two defects worth recording

Both were found by inspecting the rendered page, not by the test suite — and
the test suite is the reason they survived as long as they did. Recorded here
because the failure mode generalises.

### The Funding Readiness panel rendered at zero height

The section showed a dark rectangle where the film should be. Every automated
check passed while it was broken: the request returned 200, `readyState` was 4,
`paused` was false, `currentTime` was advancing, `opacity` was 1, and there
were no console errors. The video was decoding and playing perfectly — into a
box measuring **479 × 0**.

`SectionFilm` hardcoded `relative` on its root, and the call site passed
`className="absolute inset-0"` expecting to override it:

```tsx
<div className={cn("relative overflow-hidden", className)}>   // className = "absolute inset-0"
```

Tailwind resolves competing utilities by **stylesheet order, not by the order
they appear in the class attribute**, and `.relative` is emitted after
`.absolute`. So `position: relative` won, `inset-0` degraded from "stretch to
fill" into a no-op offset, and the div took its height from its content —
which was nothing, because every child (`<Image fill>`, the `<video>`) is
itself absolutely positioned. Zero height.

Fixed by having the component fill its fixed-aspect parent with `size-full`
instead of relying on a position utility a caller might contradict.

**The lesson, now baked into the audit:** a media element existing in the DOM,
loading successfully, and reporting itself as playing proves nothing about
whether anyone can see it. The audit now asserts the *rendered box* — width,
height, computed opacity/visibility/display up the whole ancestor chain — and
skips only subtrees that are deliberately closed (`[inert]`, `[hidden]`,
`aria-hidden`), so a collapsed panel fails loudly instead of passing quietly.

### `data-motion="on"` hydration mismatch

An inline `<head>` script set `data-motion="on"` on `<html>` before first
paint, so CSS could hide the elements JavaScript was about to animate in.
React then hydrated an `<html>` that carried an attribute the server never
rendered, and warned — correctly.

The attribute is now set from a **layout effect** in `RevealObserver`, which
runs after the hydration commit but before the browser paints. The inline
script and its four-second failsafe are gone.

```
server HTML  ==  client's first render      → no mismatch
        ↓
     hydrate
        ↓
layout effect: read prefers-reduced-motion, set the gate,
               sweep the viewport synchronously
        ↓
      paint                                  → no flash either
```

The first sweep runs synchronously rather than through `requestAnimationFrame`
— an rAF callback lands *after* the paint, which would be long enough for
everything above the fold to flash out and back in.

This is strictly safer than the version it replaces, beyond silencing the
warning. Nothing is hidden until the code that un-hides it is proven to be
running, so a failed bundle, a blocked script or a thrown error now leaves
every section plainly visible instead of blank. Verified with JavaScript
disabled: gate unset, **0 elements at `opacity: 0`**, all media visible, hero
poster painted, Funding Readiness panel 360 px tall.

`suppressHydrationWarning` was not used anywhere.

---

## Deployment

### Frontend

Any Node host. On Vercel the defaults are correct.

```bash
npm ci && npm run build && npm run start
```

Set `API_URL` and `API_KEY` in the host's environment. `API_URL` must be
reachable from the server, not the browser.

### Backend

Standard Laravel deployment. Point the web root at `backend/public`.

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
php artisan queue:work        # notifications are queued
```

Set `APP_ENV=production`, `APP_DEBUG=false`, and a real `APP_URL` — the panel
link inside notification emails is built from it.

### Before going live

- [ ] Point DNS at the frontend host; serve `https://www.legacybyconsumer.com`
- [ ] Set the production `API_URL` and a fresh `API_KEY` in both environments
- [ ] Configure SMTP and send a test submission end to end
- [ ] Run `php artisan legacy:admin` for each member of staff
- [ ] Keep `php artisan queue:work` supervised
- [ ] Submit `https://www.legacybyconsumer.com/sitemap.xml` to Search Console
- [ ] Publish the two policies below and remove their `noindex`

---

## Outstanding client content

Two items could not be completed from the supplied material. Both need the
client, not a developer.

**1. Privacy Policy and Data Sharing.** The approved footer links to both, but
no policy text was supplied. Inventing legal wording for a real company is not
something to guess at, so the routes, layout and metadata are built and the
body carries a short holding note pointing readers to the contact details. Both
pages are `noindex` and excluded from the sitemap until the real text lands.
Drop the copy into `src/components/sections/PolicyPage.tsx` and remove the
`robots` override in each page file.

**2. Photography — replaced, and why.** *(Resolved. Recorded here because the
client should know their supplied images are no longer in the build.)*

Every photograph in the originally supplied set was **AI-generated**, not
photography. The tells were consistent and unambiguous once the files were
examined at full size: warped and repeating window grids on the skyline towers,
nonsense glyphs standing in for code on the monitors, a garbled badge and
grille on the truck, an incoherent machined part in the workforce image,
uniform plastic skin and identical shallow-depth bokeh across all six industry
tiles, and every subject smiling directly at camera. It also explained the file
sizes — 288–1004 px wide, typical generator output rather than downsampled
photographs.

They have been replaced with **real, licensed photography**, chosen to carry
the same subject and meaning as the approved alt text and section copy:

| File | Subject | Source | Export |
| --- | --- | --- | --- |
| `city-towers-dusk.jpg` | Lit office towers at dusk | 5272×3515 | 3840×2560 |
| `industry-infrastructure.jpg` | Engineers reviewing drawings on site | 4000×3000 | 3840×2560 |
| `advisory-session.jpg` | Planning documents on a meeting table | 5760×3840 | 3840×2560 |
| `ridge-forest.jpg` | Conifer ridge in low cloud | 3885×2590 | 3840×2560 |
| `industry-healthcare.jpg` | Residential care corridor | 5865×3910 | 3840×2560 |
| `industry-technology.jpg` | Data-centre aisle | 5568×3712 | 2400×1600 |
| `industry-transportation.jpg` | Highway interchange at night | 8000×6000 | 2400×1600 |
| `industry-workforce.jpg` | Technical training workshop | 3240×2160 | 2400×1600 |
| `industry-professional.jpg` | Advisory meeting | 3800×2138 | 2400×1600 |

All from **Pexels**, whose licence permits commercial use with no attribution
and no permission required. Candidates carrying watermarks or AI-generation
markers were rejected during selection — including one otherwise strong hero
clip that turned out to be a watermarked premium file.

**Per-asset provenance — every file, its source, its ID and its licence — is
recorded in [`ASSET-LICENSES.md`](ASSET-LICENSES.md).**

Each is exported at 3:2 so it survives every frame it appears in — the
`aspect-4/3` mosaic tiles, the `aspect-4/5` portrait frame on About, and the
full-bleed page heroes.

They are then **graded per image toward shared targets**, not put through one
common filter. Ten photographs from ten photographers start in ten different
places; the same filter applied to all of them moves ten different images by
the same amount and they still do not match. Each is measured and solved for
its own correction instead. Across the set that took colour-temperature spread
from σ 16.2 to σ 10.8, contrast from σ 15.3 to σ 4.5, saturation from σ 0.15 to
σ 0.09 and key from σ 34.5 to σ 16.1. The targets and the reasoning behind them
— including why colour is held inside a *band* rather than driven to a single
value — are in [`ASSET-LICENSES.md`](ASSET-LICENSES.md#the-campaign-grade).

Two mosaic tiles were re-cropped after being inspected at rendered size rather
than as thumbnails: the data-centre frame was mostly empty floor, and the
interchange had its subject pushed out of frame. One image — the professional
services tile — was replaced outright rather than re-graded: it was the one
frame that still read as generic corporate stock.

**The resolution shortfall is gone.** Measured as resource width against
`box width × devicePixelRatio` at 1920/1×, 1440/2× and 390/3×, every image now
meets or exceeds what its frame asks for — worst case 1.0×, most oversupplied
(0.75–0.97×). Before this pass the same measurement read 3.1× to 6.0× short.

Part of that gain was a code fix rather than an asset one: `u-drift` scales the
page-hero backdrops between 1.08 and 1.14, so `sizes="100vw"` was under-asking
by up to 14% and the browser was quietly upscaling the result. Those images now
declare `sizes="115vw"` (`125vw` for the more aggressively transformed Heritage
backdrop).

One deployment note: these sources are large, so the first request for each
`_next/image` derivative pays a real AVIF encode — several seconds for a
3840 px variant. It is a one-time, per-derivative cost that the build cache and
any CDN in front absorb; it is not a runtime characteristic users will see.

The client is of course still welcome to supply their own photography — real
photographs of their own people, offices and projects would beat any stock,
however carefully chosen. Dropping files with these names into `public/media/`
at 2400 px or wider is all it takes.
