"""
Grades the site's photography: exposure, shadow recovery, white balance,
local contrast and a controlled highlight rolloff.

Why this exists
---------------
The photographs were licensed as moody, cinematic stock: a third of them had
more than half their pixels below L* 25, several had faces sitting in deep
shadow, and four already carried blown highlights. On a warm-ivory page that
reads as muddy and underexposed rather than as premium. An earlier pass raised
the mean by about four points, which was not enough to be visible.

This is a one-shot asset treatment, not part of the build. It reads MASTERS
(the ungraded originals) and writes into public/media. Run it once; the graded
results are what gets committed. Running it against already-graded files would
stack two grades, so it refuses to read from its own output directory.

Reconstructing the masters
--------------------------
The masters are the last version of each file before any grade was applied:

    git show deee468^:legacy_web/public/media/<f>   # advisory-session,
                                                    # funding-consult-poster,
                                                    # industry-healthcare,
                                                    # industry-professional
    git show f729ea3:legacy_web/public/media/<f>    # industry-infrastructure,
                                                    # industry-workforce
    (current file)                                  # everything else, never graded

How the grade is built
----------------------
Every tonal move is made on *luminance* and then applied to R, G and B as a
single common ratio. That is the whole reason faces survive this: scaling all
three channels by one factor cannot change a pixel's hue or its saturation
ratio, so skin, hair and clothing keep exactly the colour the photographer
captured while the exposure moves underneath them. Nothing here paints, warps
or invents pixels.

The curve has three parts, in order:

  1. A gamma lift, which opens shadows and midtones hard and highlights little.
  2. A highlight hold, which blends the lifted value back to the original one
     as luminance approaches white. Windows, sky, paper and white clothing
     therefore end up where they started instead of clipping — which matters
     most on the four images that arrived with highlights already clipped.
  3. A black re-anchor, which takes a fraction of a stop back off the very
     bottom. Without it a lifted image is bright but milky; this is the
     difference between "brightened" and "graded".

The gamma in step 1 is not guessed. It is solved per image by bisection so
that the median pixel lands on a target lightness chosen for that photograph,
which is what makes the treatment individual rather than one filter applied
twelve times.
"""

import json
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

# --------------------------------------------------------------------------
# Colour helpers. Everything tonal happens in linear light, because averaging
# and scaling gamma-encoded values is not a physical operation and produces
# the grey, plasticky look this pass exists to remove.
# --------------------------------------------------------------------------

LUMA = np.array([0.2126, 0.7152, 0.0722])


def srgb_to_linear(a):
    return np.where(a <= 0.04045, a / 12.92, ((a + 0.055) / 1.055) ** 2.4)


def linear_to_srgb(a, clip=True):
    """
    Encode to sRGB. With clip=False the curve is simply continued above 1.0,
    which keeps overbright detail addressable instead of flattening it — the
    detail passes run in that extended space so the shoulder can stay last.
    """
    if clip:
        a = np.clip(a, 0.0, 1.0)
    else:
        a = np.maximum(a, 0.0)
    return np.where(a <= 0.0031308, a * 12.92, 1.055 * a ** (1 / 2.4) - 0.055)


def luminance(lin):
    return lin @ LUMA


def lstar(Y):
    """CIE L*. Perceptual, so "half the pixels are dark" means what it says."""
    Y = np.clip(Y, 0.0, None)
    return np.where(Y > 0.008856, 116 * np.cbrt(Y) - 16, 903.3 * Y)


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / max(hi - lo, 1e-6), 0.0, 1.0)
    return t * t * (3 - 2 * t)


# --------------------------------------------------------------------------
# The tone curve
# --------------------------------------------------------------------------


def tone(Y, gamma, hold, black):
    """Lift shadows and midtones, hold highlights, re-anchor black."""
    y = np.clip(Y, 0.0, 1.0)
    lifted = y ** (1.0 / gamma)

    # Blend back to the original as we approach white. `hold` is where the
    # protection starts; below it the lift is at full strength.
    w = smoothstep(hold, 1.0, y)
    out = lifted * (1 - w) + y * w

    if black > 0:
        out = np.clip((out - black) / (1.0 - black), 0.0, None)
    return out


def solve_gamma(Y, target_l, hold, black):
    """
    Find the gamma whose median output lands on `target_l` (in L*).

    Solved on a decimated copy — the median of a few hundred thousand samples
    is the median, and this turns forty full-resolution passes into nothing.
    """
    step = max(1, int(np.sqrt(Y.size / 200_000)))
    Y = Y[::step, ::step]
    lo, hi = 1.0, 4.0
    for _ in range(40):
        mid = (lo + hi) / 2
        got = np.median(lstar(tone(Y, mid, hold, black)))
        if got < target_l:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def apply_ratio(lin, Y_in, Y_out):
    """
    Re-expose RGB by the luminance ratio.

    Deliberately NOT clipped to white here. Everything above 1.0 is real
    signal that the shoulder further down still needs in order to roll it
    back gracefully; throwing it away at this point is precisely what turns
    a lifted sky into a flat white shape.
    """
    ratio = np.where(Y_in > 1e-6, Y_out / np.maximum(Y_in, 1e-6), 1.0)
    return np.maximum(lin * ratio[..., None], 0.0)


def reconcile_highlights(lin, target_frac):
    """
    Roll the overbright range back under white, and *measure* that the result
    is no more clipped than the master was.

    The brief's hard rule is that windows, sky, skin, white clothing and paper
    must not blow out. Hoping a protection curve was strong enough is not the
    same as checking, so this solves for the knee: bisection on where the
    shoulder starts until the fraction of pixels still sitting at white
    matches what the original photograph already had. A frame that arrived
    with 6.3% of its highlights gone keeps 6.3% — those are unrecoverable in
    the source and pretending otherwise would only grey them down — but it
    never gains a single point beyond that.

    Compression is applied to the channel maximum and passed to R, G and B as
    one ratio, so recovering a highlight cannot shift its hue the way
    per-channel clipping does (where a lifted warm tone goes orange as red
    clips first, then yellow as green follows).
    """
    M = lin.max(axis=2)
    if M.max() <= 1.0:
        return np.clip(lin, 0.0, 1.0)

    def clipped_at(knee):
        over = M > knee
        out = M.copy()
        span = 1.0 - knee
        out[over] = knee + span * (1.0 - np.exp(-(M[over] - knee) / span))
        # Measured after encoding, because "blown out" is a thing you see on
        # screen, not a linear-light quantity — and because the master's
        # figure this is solved against was measured the same way.
        return (linear_to_srgb(out) > 0.99).mean(), out

    # `lo` is kept on the side of the search that satisfies the constraint and
    # is what gets used, so the result can only ever come in at or under the
    # master's clipping — never over it on a rounding accident.
    lo, hi = 0.50, 0.995
    for _ in range(28):
        mid = (lo + hi) / 2
        frac, _ = clipped_at(mid)
        if frac > target_frac:
            hi = mid          # start the shoulder earlier: recover more
        else:
            lo = mid
    _, Mout = clipped_at(lo)

    scale = np.where(M > 1e-6, Mout / np.maximum(M, 1e-6), 1.0)
    out = lin * scale[..., None]

    # Film gives up a little saturation as it approaches white. Only where
    # the shoulder actually did something, and only a little.
    give = np.clip((1.0 - scale) * 1.6, 0.0, 0.55)[..., None]
    Y = luminance(out)[..., None]
    out = out * (1 - give) + Y * give
    return np.clip(out, 0.0, 1.0)


# --------------------------------------------------------------------------
# Colour
# --------------------------------------------------------------------------


def skin_mask(lin):
    """
    Roughly where skin is, so the warm bias and the saturation lift can stay
    off it entirely.

    Tested on chromaticity rather than on raw channel values, so it tracks a
    face through shade and daylight instead of only finding the well-lit
    parts of it. The bounds are a conservative band around human skin across
    complexions — it is a hue test, not a lightness test, which is the whole
    point: the same band holds for deep and fair skin because they differ in
    luminance far more than in chromaticity.
    """
    r, g, b = lin[..., 0], lin[..., 1], lin[..., 2]
    total = r + g + b + 1e-6
    rn, gn, bn = r / total, g / total, b / total
    return (
        (r > g) & (g > b)
        & (rn > 0.355) & (rn < 0.52)
        & (gn > 0.28) & (gn < 0.36)
        & (bn > 0.16) & (bn < 0.315)
        & (r > 0.012)
    ).astype(np.float32)


def white_balance(lin, strength, warm):
    """
    Partial grey-world, measured on the brighter half of the frame where the
    illuminant actually shows, then a small deliberate warm bias.

    Correction is partial by design. Driving a photograph all the way to
    neutral strips the character of the light it was shot in; the aim is to
    take the green and blue casts off without turning golden-hour into noon.
    """
    Y = luminance(lin)
    bright = lin[Y > np.percentile(Y, 55)]
    if bright.size == 0:
        return lin
    means = bright.reshape(-1, 3).mean(axis=0)
    means = np.maximum(means, 1e-5)
    gain = (means.mean() / means) ** strength

    if warm:
        gain = gain * np.array([1.0 + warm, 1.0, 1.0 - warm * 0.85])

    out = lin * gain

    # Hold skin at its corrected-but-unwarmed value so nobody goes orange.
    if warm:
        skin = skin_mask(lin)[..., None]
        neutral = lin * ((means.mean() / means) ** strength)
        out = out * (1 - skin) + neutral * skin
    return np.clip(out, 0.0, None)


def vibrance(lin, amount, green_hold=0.55):
    """
    Saturation returned where the lift flattened it, weighted toward the
    dull pixels. Greens get a fraction of the boost: foliage and hi-vis vests
    are the first things to go cartoonish, and the brief says so explicitly.
    """
    if amount == 0:
        return lin
    Y = luminance(lin)[..., None]
    mx = lin.max(axis=2)
    mn = lin.min(axis=2)
    sat = (mx - mn) / np.maximum(mx, 1e-6)

    w = amount * (1.0 - sat) ** 1.5

    greenish = (lin[..., 1] >= mx - 1e-6).astype(float)
    w = w * (1.0 - greenish * green_hold)
    w = w * (1.0 - skin_mask(lin) * 0.92)

    return np.maximum(Y + (lin - Y) * (1.0 + w[..., None]), 0.0)


# --------------------------------------------------------------------------
# Detail
# --------------------------------------------------------------------------


def unsharp(disp, amount, radius, floor=0.0, guard=(0.70, 0.94)):
    """
    Unsharp mask on luminance, applied to RGB as a ratio.

    Used twice: once wide (local contrast — the "clarity" that separates a
    building from the sky behind it) and once tight (edge definition). Both
    are luminance-only and ratio-applied, so they add crispness without
    touching a single hue.

    Three things keep it from looking processed:

      * the detail signal is measured on a clipped proxy but *added* to the
        un-clipped signal, so a highlight gains definition instead of a halo;
      * `guard` fades the effect out towards black (where extra local contrast
        just crushes shadows) and towards white (where it makes halos);
      * `floor` is a soft threshold that ignores very small differences, which
        is what stops sharpening from amplifying sensor noise and JPEG grain
        in flat areas like sky.
    """
    if amount == 0:
        return disp

    L = disp @ LUMA
    proxy = np.clip(L, 0.0, 1.0)
    img = Image.fromarray((proxy * 255).astype(np.uint8), "L")
    blur = np.asarray(img.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255.0

    detail = proxy - blur
    if floor > 0:
        mag = np.abs(detail)
        detail = detail * smoothstep(floor * 0.4, floor, mag)

    g = smoothstep(0.0, 0.18, proxy) * (1.0 - smoothstep(guard[0], guard[1], proxy))
    L2 = L + detail * amount * g

    ratio = np.where(L > 1e-4, L2 / np.maximum(L, 1e-4), 1.0)
    return np.maximum(disp * ratio[..., None], 0.0)


def daylight(lin, spec):
    """
    A subtle sense of sun, for outdoor frames that have a believable source.

    This is NOT drawn rays. It is the two things a camera actually records
    when it is pointed near the sun: a wide, soft warm falloff from that
    direction, and a little bloom where the highlights already are. Both are
    tiny and additive in linear light. Beams, flares and glowing discs are
    what make an image read as retouched, so there are none.
    """
    if not spec:
        return lin
    h, w = lin.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = spec["at"]
    d = np.sqrt(((xx / w - cx) * 1.0) ** 2 + ((yy / h - cy) * 0.85) ** 2)
    fall = np.clip(1.0 - d / spec.get("reach", 1.15), 0.0, 1.0) ** 2

    warm = np.array(spec.get("tint", [1.0, 0.88, 0.66]))
    lin = lin + fall[..., None] * spec["strength"] * warm

    if spec.get("bloom", 0):
        Y = luminance(lin)
        hi = np.clip((Y - 0.72) / 0.28, 0, 1)
        img = Image.fromarray((hi * 255).astype(np.uint8), "L")
        soft = np.asarray(
            img.filter(ImageFilter.GaussianBlur(max(6.0, 0.02 * min(h, w)))), dtype=float
        ) / 255.0
        lin = lin + soft[..., None] * spec["bloom"] * warm

    return np.clip(lin, 0.0, None)


# --------------------------------------------------------------------------
# Per-image treatment.
#
# `target` is the median lightness (L*) the image should land on, chosen for
# what the photograph is rather than applied across the board: an interior
# with faces in it needs to arrive somewhere different from a night aerial,
# which cannot be pushed to daylight without inventing a photograph that was
# never taken.
# --------------------------------------------------------------------------

JOBS = {
    "advisory-session.jpg": dict(
        target=47, hold=0.60, black=0.0016, wb=0.55, warm=0.010, vib=0.09,
        clar=0.20, sharp=42,
        note="Interior, two people, documents. Faces and dark suits were the "
             "floor of the frame; opened hard with the window held.",
    ),
    "atlanta-skyline-day.jpg": dict(
        target=64, hold=0.68, black=0.0010, wb=0.35, warm=0.010, vib=0.10,
        clar=0.22, sharp=48,
        sun=dict(at=(0.74, 0.18), reach=1.25, strength=0.012, bloom=0.030),
        note="Already the best-exposed frame on the site. Clarity for the "
             "skyline edges, and a soft daylight falloff from the sun side.",
    ),
    "city-towers-dusk.jpg": dict(
        target=36, hold=0.52, black=0.0022, wb=0.40, warm=0.014, vib=0.14,
        clar=0.24, sharp=44,
        note="Dusk, and it stays dusk — it cannot be graded into daylight "
             "without inventing one. Opened enough to read the architecture.",
    ),
    "funding-consult-poster.webp": dict(
        target=52, hold=0.58, black=0.0014, wb=0.55, warm=0.012, vib=0.16,
        clar=0.18, sharp=38,
        note="Poster for the funding film. Tonal settings shared with the "
             "video so there is no jump when playback starts.",
    ),
    "industry-healthcare.jpg": dict(
        target=46, hold=0.46, black=0.0018, wb=0.60, warm=0.010, vib=0.12,
        clar=0.22, sharp=44,
        note="Institutional corridor, staff and a resident lost in shadow "
             "against a blown window. The hardest frame on the site: the "
             "hold sits very low so the lift stays off the window entirely.",
    ),
    "industry-healthcare.jpeg": dict(
        target=66, hold=0.74, black=0.0008, wb=0.30, warm=0.004, vib=0.06,
        clar=0.16, sharp=36,
        note="Client-supplied, and already bright, warm and well exposed. "
             "Left essentially alone: definition only.",
    ),
    "industry-infrastructure.jpg": dict(
        target=58, hold=0.66, black=0.0026, wb=0.45, warm=0.008, vib=0.12,
        clar=0.30, sharp=52,
        note="Site haze flattened the rebar. The black anchor is the dehaze; "
             "clarity is highest here because the subject is structure.",
    ),
    "industry-professional.jpeg": dict(
        target=54, hold=0.62, black=0.0014, wb=0.50, warm=0.010, vib=0.14,
        clar=0.18, sharp=38,
        note="Client-supplied portrait. Two faces against a bright window; "
             "lifted onto them with the window held back.",
    ),
    "industry-professional.jpg": dict(
        target=65, hold=0.70, black=0.0010, wb=0.40, warm=0.008, vib=0.10,
        clar=0.18, sharp=40,
        note="Well exposed already. A small lift and definition.",
    ),
    "industry-technology.jpg": dict(
        target=47, hold=0.50, black=0.0018, wb=0.50, warm=0.006, vib=0.12,
        clar=0.26, sharp=46,
        note="Worst clipping on the site at 6.3% — the ceiling strips were "
             "already gone. Lowest hold point of any image so the lift stays "
             "off them entirely.",
    ),
    "industry-transportation.jpg": dict(
        target=38, hold=0.52, black=0.0020, wb=0.45, warm=0.010, vib=0.14,
        clar=0.26, sharp=46,
        note="Night aerial. Opened until the interchange and the planting "
             "read, stopping short of the fake-daylight look.",
    ),
    "industry-workforce.jpg": dict(
        target=54, hold=0.64, black=0.0016, wb=0.50, warm=0.008, vib=0.10,
        clar=0.24, sharp=48,
        green_hold=0.75,
        note="Training floor. Greens held hard: the hi-vis and the paint go "
             "lurid before anything else in the frame does.",
    ),
}


# Nothing above this is ever delivered: it is the largest width the
# derivative generator builds, so pixels beyond it are weight in the repo
# that no visitor can receive. Capping here rather than after the grade
# keeps it to a single encode.
MAX_MASTER_WIDTH = 2560


def grade(path_in, path_out, cfg):
    im = Image.open(path_in).convert("RGB")
    if im.width > MAX_MASTER_WIDTH:
        im = im.resize(
            (MAX_MASTER_WIDTH, round(im.height * MAX_MASTER_WIDTH / im.width)),
            Image.LANCZOS,
        )
    a = np.asarray(im, dtype=np.float32) / 255.0
    lin = srgb_to_linear(a)

    before = np.median(lstar(luminance(lin)))
    clipped_before = (a.max(axis=2) > 0.99).mean() * 100

    master_clip = float((a.max(axis=2) > 0.99).mean())

    lin = white_balance(lin, cfg["wb"], cfg.get("warm", 0.0))
    lin = daylight(lin, cfg.get("sun"))

    Y = luminance(lin)
    g = solve_gamma(Y, cfg["target"], cfg["hold"], cfg["black"])
    lin = apply_ratio(lin, Y, tone(Y, g, cfg["hold"], cfg["black"]))
    lin = vibrance(lin, cfg.get("vib", 0.0), cfg.get("green_hold", 0.55))

    disp = linear_to_srgb(lin, clip=False)
    h, w = disp.shape[:2]
    wide = max(2.0, 0.012 * min(h, w))
    disp = unsharp(disp, cfg.get("clar", 0.0), wide)
    disp = unsharp(disp, cfg.get("sharp", 0) / 100.0, 1.1, floor=0.012, guard=(0.78, 0.98))

    # Shoulder last, so nothing downstream can undo the highlight guarantee.
    lin = reconcile_highlights(srgb_to_linear(disp), master_clip)
    out = linear_to_srgb(lin)

    after = np.median(lstar(luminance(lin)))
    clipped_after = (out.max(axis=2) > 0.99).mean() * 100

    img = Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8), "RGB")

    if path_out.lower().endswith(".webp"):
        img.save(path_out, "WEBP", quality=95, method=6)
    else:
        img.save(path_out, "JPEG", quality=92, subsampling=0, optimize=True,
                 progressive=True)

    return dict(
        file=os.path.basename(path_out), gamma=round(g, 3),
        l_before=round(before, 1), l_after=round(after, 1),
        gain_pct=round((after - before) / max(before, 1e-6) * 100, 1),
        clip_before=round(clipped_before, 2), clip_after=round(clipped_after, 2),
        note=cfg["note"],
    )


def main():
    src, dst = sys.argv[1], sys.argv[2]
    if os.path.abspath(src) == os.path.abspath(dst):
        raise SystemExit("Refusing to grade in place: that would stack grades.")

    rows = []
    for name, cfg in sorted(JOBS.items()):
        p = os.path.join(src, name)
        if not os.path.exists(p):
            print(f"  MISSING MASTER {name}")
            continue
        r = grade(p, os.path.join(dst, name), cfg)
        rows.append(r)
        flag = "  <-- HIGHLIGHTS WORSE" if r["clip_after"] > r["clip_before"] + 0.05 else ""
        print(f"  {r['file']:32s} L* {r['l_before']:5.1f} -> {r['l_after']:5.1f} "
              f"({r['gain_pct']:+5.1f}%)  gamma {r['gamma']:.2f}  "
              f"clip {r['clip_before']:.2f}% -> {r['clip_after']:.2f}%{flag}")

    with open(os.path.join(dst, "_grade-report.json"), "w") as f:
        json.dump(rows, f, indent=2)


if __name__ == "__main__":
    main()
