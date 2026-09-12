"""
Keeps funding-consult.mp4 in step with the poster that sits under it.

The poster is the first frame the visitor sees, and the film fades in over it.
Grading one without the other puts a visible jump at the moment playback
starts — the picture would brighten by nearly 40% in a single frame.

Rather than re-tune the film by eye, this extracts the *exact* per-pixel part
of the poster's grade (white balance gains, the solved gamma, the solved
highlight knee — all constants, once solved for that image) and bakes it into
a 3D LUT. The spatial passes are left out by construction: a LUT cannot
express them, and pretending otherwise is how the two drift apart.

The colour path is explicit. The previous attempt at this drove the video
through a YUV filter and the result under-lifted against its own poster,
because the footage is limited-range and the filter treated it as full. Here
the frames are converted to RGB first, the LUT is applied there, and the
result is checked against the same curve applied in Python to the same frame.
"""
import subprocess
import sys

import numpy as np
from PIL import Image

sys.path.insert(0, "scripts")
from grade_photography import (  # noqa: E402
    JOBS, LUMA, apply_ratio, linear_to_srgb, luminance, reconcile_highlights,
    skin_mask, solve_gamma, srgb_to_linear, tone, vibrance,
)

POSTER = "public/media/funding-consult-poster.webp"
CFG = JOBS["funding-consult-poster.webp"]
GRID = 33


def solve_constants(master_path):
    """Re-derive the poster's grade and freeze every image-dependent term."""
    a = np.asarray(Image.open(master_path).convert("RGB"), dtype=np.float32) / 255.0
    lin = srgb_to_linear(a)
    master_clip = float((a.max(axis=2) > 0.99).mean())

    Y = luminance(lin)
    bright = lin[Y > np.percentile(Y, 55)].reshape(-1, 3)
    means = np.maximum(bright.mean(axis=0), 1e-5)
    neutral_gain = (means.mean() / means) ** CFG["wb"]
    warm_gain = neutral_gain * np.array(
        [1.0 + CFG["warm"], 1.0, 1.0 - CFG["warm"] * 0.85], dtype=np.float32
    )

    wb = lin * warm_gain
    skin = skin_mask(lin)[..., None]
    wb = np.maximum(wb * (1 - skin) + (lin * neutral_gain) * skin, 0.0)

    Yw = luminance(wb)
    gamma = solve_gamma(Yw, CFG["target"], CFG["hold"], CFG["black"])
    graded = apply_ratio(wb, Yw, tone(Yw, gamma, CFG["hold"], CFG["black"]))
    graded = vibrance(graded, CFG["vib"], 0.55)

    # Freeze the knee the shoulder solves to, so every frame gets the same one.
    M = graded.max(axis=2)
    lo, hi = 0.50, 0.995
    for _ in range(28):
        mid = (lo + hi) / 2
        span = 1.0 - mid
        out = M.copy()
        over = M > mid
        out[over] = mid + span * (1.0 - np.exp(-(M[over] - mid) / span))
        if (linear_to_srgb(out) > 0.99).mean() > master_clip:
            hi = mid
        else:
            lo = mid
    return neutral_gain, warm_gain, gamma, lo


def pure(srgb, neutral_gain, warm_gain, gamma, knee):
    """The per-pixel grade, as a function of sRGB in to sRGB out."""
    lin = srgb_to_linear(srgb)
    wb = lin * warm_gain
    skin = skin_mask(lin)[..., None]
    wb = np.maximum(wb * (1 - skin) + (lin * neutral_gain) * skin, 0.0)

    Y = luminance(wb)
    out = apply_ratio(wb, Y, tone(Y, gamma, CFG["hold"], CFG["black"]))
    out = vibrance(out, CFG["vib"], 0.55)

    M = out.max(axis=2)
    span = 1.0 - knee
    Mo = M.copy()
    over = M > knee
    Mo[over] = knee + span * (1.0 - np.exp(-(M[over] - knee) / span))
    scale = np.where(M > 1e-6, Mo / np.maximum(M, 1e-6), 1.0)
    res = out * scale[..., None]
    give = np.clip((1.0 - scale) * 1.6, 0.0, 0.55)[..., None]
    res = res * (1 - give) + luminance(res)[..., None] * give
    return linear_to_srgb(np.clip(res, 0.0, 1.0))


def write_cube(path, consts):
    g = np.linspace(0.0, 1.0, GRID, dtype=np.float32)
    # .cube runs red fastest.
    b, gr, r = np.meshgrid(g, g, g, indexing="ij")
    grid = np.stack([r, gr, b], axis=-1).reshape(-1, 1, 3)
    out = pure(grid, *consts).reshape(-1, 3)
    with open(path, "w") as f:
        f.write(f"TITLE \"funding-consult poster grade\"\nLUT_3D_SIZE {GRID}\n")
        f.write("DOMAIN_MIN 0 0 0\nDOMAIN_MAX 1 1 1\n")
        for px in out:
            f.write(f"{px[0]:.6f} {px[1]:.6f} {px[2]:.6f}\n")


def main():
    src, cube, dst = sys.argv[1], sys.argv[2], sys.argv[3]
    consts = solve_constants(POSTER + ".master" if False else sys.argv[4])
    print(f"  gains warm={consts[1].round(4)} gamma={consts[2]:.3f} knee={consts[3]:.4f}")
    write_cube(cube, consts)
    print(f"  wrote {GRID}^3 LUT -> {cube}")

    subprocess.run([
        "ffmpeg", "-y", "-v", "error", "-i", src,
        "-vf", f"format=gbrp,lut3d=file={cube}:interp=tetrahedral,"
               f"unsharp=5:5:0.45:5:5:0.0,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "21",
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-color_range", "tv", "-colorspace", "bt709",
        "-color_primaries", "bt709", "-color_trc", "bt709",
        "-movflags", "+faststart", "-an", dst,
    ], check=True)
    print(f"  encoded -> {dst}")


if __name__ == "__main__":
    main()
