#!/usr/bin/env python3
"""ACJR brand mark + lockup generator.

Builds every SVG in public/brand/ (and public/favicon.svg) from geometry
defined here. Text is shaped with HarfBuzz (uharfbuzz) and converted to
outlines with fontTools, so no SVG depends on a font.

Requires: pip install uharfbuzz fonttools brotli shapely
Run:      python3 scripts/brand/build_svgs.py   (from the repo root)
Then:     node scripts/brand/rasterise.mjs      (PNG / ICO outputs)
"""
import math
import os

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from shapely import affinity
from shapely.geometry import LineString, Point, Polygon
from shapely.ops import unary_union

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "public", "brand")
FONTS = os.path.join(ROOT, "node_modules", "@fontsource")

BLUE = "#0070AD"  # --blue-700 in src/styles/tokens.css
OCHRE = "#C8963E"
NAVY = "#0B2545"
BLACK = "#000000"
WHITE = "#FFFFFF"

# ---------------------------------------------------------------- Africa
# Simplified coastline, (longitude, latitude). ~75 points + Madagascar.
AFRICA = [
    (-5.9, 35.8), (-2.0, 35.1), (3.0, 36.8), (9.8, 37.3), (11.1, 36.9),
    (10.2, 34.3), (11.4, 33.2), (15.2, 32.3), (17.5, 31.0), (19.3, 30.4),
    (20.1, 32.2), (23.0, 32.6), (25.2, 31.6), (29.9, 31.3), (32.4, 31.2),
    (32.6, 29.9), (34.2, 27.0), (35.6, 23.5), (37.3, 19.5), (38.6, 17.8),
    (39.7, 15.3), (41.6, 13.4), (43.3, 12.3), (44.6, 10.4), (47.5, 11.2),
    (51.2, 11.8), (50.8, 9.6), (49.0, 6.2), (47.3, 4.0), (45.2, 1.8),
    (42.5, -0.7), (40.6, -2.6), (39.6, -4.6), (39.3, -7.2), (39.6, -10.1),
    (40.5, -10.8), (40.7, -14.8), (39.2, -16.6), (36.8, -18.3), (35.2, -21.4),
    (35.5, -23.9), (32.9, -25.9), (32.6, -28.5), (31.0, -29.9), (29.3, -31.6),
    (27.6, -33.3), (25.6, -33.9), (22.2, -34.0), (20.0, -34.8), (18.4, -34.2),
    (18.1, -32.4), (16.5, -28.6), (15.2, -26.7), (14.5, -22.9), (13.2, -20.0),
    (11.8, -17.3), (12.2, -14.0), (13.6, -11.6), (13.2, -9.0), (12.2, -6.0),
    (11.8, -4.6), (9.4, -1.2), (9.5, 1.6), (9.8, 3.6), (8.6, 4.6),
    (6.1, 4.3), (4.4, 6.4), (1.2, 6.1), (-2.0, 4.8), (-4.3, 5.2),
    (-7.5, 4.4), (-10.8, 6.6), (-13.2, 8.7), (-15.0, 11.0), (-16.8, 13.4),
    (-17.5, 14.8), (-16.4, 18.5), (-16.4, 21.0), (-17.0, 21.5), (-14.9, 24.5),
    (-13.0, 27.6), (-9.8, 29.9), (-9.6, 32.4), (-6.9, 34.2),
]
MADAGASCAR = [
    (49.3, -12.0), (50.4, -15.4), (49.6, -17.8), (48.5, -21.0), (47.1, -24.9),
    (45.2, -25.5), (43.7, -23.4), (43.4, -21.4), (44.4, -19.4), (44.1, -17.0),
    (46.3, -15.7), (48.0, -13.6),
]


def catmull(points, steps=6):
    """Closed Catmull-Rom spline sampled to a polygon (smooths coastline)."""
    n = len(points)
    out = []
    for i in range(n):
        p0, p1, p2, p3 = (points[(i + k) % n] for k in (-1, 0, 1, 2))
        for s in range(steps):
            t = s / steps
            t2, t3 = t * t, t * t * t
            out.append(tuple(
                0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t
                       + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2
                       + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3)
                for j in (0, 1)))
    return out


def project(pts, cx, cy, scale):
    # Plain equirectangular, centred on the continent's bbox.
    lon0, lat0 = 16.85, 1.2
    return [(cx + (lon - lon0) * scale, cy - (lat - lat0) * scale) for lon, lat in pts]


# ---------------------------------------------------------------- geometry
def leaf(cx, cy, angle, length, width):
    """Broad stylised olive leaf (pointed oval) centred at cx,cy."""
    pts = []
    for i in range(25):
        t = i / 24 * math.pi
        x = -length / 2 * math.cos(t)
        y = width / 2 * math.sin(t) ** 0.9
        pts.append((x, y))
    pts += [(x, -y) for x, y in reversed(pts[1:-1])]
    poly = Polygon(pts)
    poly = affinity.rotate(poly, angle, origin=(0, 0), use_radians=True)
    return affinity.translate(poly, cx, cy)


def branches(c=(100, 101), r=87, stem=4.4, n_leaves=4):
    shapes = []
    cx, cy = c
    for side in (-1, 1):
        # angle measured from straight down (0) going up the side
        a_start, a_end = math.radians(8), math.radians(122)
        pts = []
        for i in range(60):
            a = a_start + (a_end - a_start) * i / 59
            pts.append((cx + side * r * math.sin(a), cy + r * math.cos(a)))
        # short tail crossing to the bottom centre so the branches meet
        tail = [(cx - side * 7, cy + r + 3.5), pts[0]]
        shapes.append(LineString(tail + pts[1:]).buffer(stem / 2, cap_style=1, join_style=1))
        # leaves: outer and inner, alternating, angled towards the tip
        for k in range(n_leaves):
            a = math.radians(30 + k * 25)
            px, py = cx + side * r * math.sin(a), cy + r * math.cos(a)
            # tangent pointing towards the tip
            tx, ty = side * math.cos(a), -math.sin(a)
            tang = math.atan2(ty, tx)
            nx, ny = side * math.sin(a), math.cos(a)  # outward normal
            for outer in (True, False):
                if not outer and k in (0, 2):
                    continue
                sg = 1 if outer else -1
                ang = math.radians(40)
                dx = math.cos(ang) * tx + math.sin(ang) * sg * nx
                dy = math.cos(ang) * ty + math.sin(ang) * sg * ny
                rot = math.atan2(dy, dx)
                L, W = (24, 12.0) if outer else (18, 9.0)
                shapes.append(leaf(px + dx * L * 0.46, py + dy * L * 0.46, rot, L, W))
        # terminal leaf along the tangent at the tip
        a = a_end
        px, py = cx + side * r * math.sin(a), cy + r * math.cos(a)
        tang = math.atan2(-math.sin(a), side * math.cos(a))
        shapes.append(leaf(px + math.cos(tang) * 10, py + math.sin(tang) * 10, tang, 24, 11.5))
    return unary_union(shapes)


def scale_of_justice(w=6.0, beam_y=76, beam_half=55, pan_y=116, post_top=None,
                     post_bottom=153, cx=100, pan_w=31, pan_h=11, string_w=2.8,
                     finial=5.6, beam_w=None):
    # Post rises only to the beam (a T, never a cross); a round finial sits on top.
    beam_w = beam_w or w
    lines = []
    lines.append(LineString([(cx, beam_y), (cx, post_bottom)]).buffer(w / 2, cap_style=2))
    lines.append(LineString([(cx - beam_half, beam_y), (cx + beam_half, beam_y)]).buffer(beam_w / 2, cap_style=1))
    lines.append(Point(cx, beam_y - beam_w / 2 - finial + 1.2).buffer(finial))  # finial
    # base: a flat foot
    lines.append(LineString([(cx - 16, post_bottom + 1), (cx + 16, post_bottom + 1)]).buffer(max(w, 6) / 2, cap_style=1))
    pans = []
    for s in (-1, 1):
        px = cx + s * beam_half
        top = (px, beam_y)
        lines.append(LineString([(px - pan_w / 2 + 2, pan_y), top, (px + pan_w / 2 - 2, pan_y)])
                     .buffer(string_w / 2, cap_style=1, join_style=1))
        # bowl: half ellipse under pan_y
        pts = [(px + pan_w / 2 * math.cos(t), pan_y + pan_h * math.sin(t))
               for t in [i / 30 * math.pi for i in range(31)]]
        pans.append(Polygon(pts))
    return unary_union(lines), unary_union(pans)


def poly_to_path(geom, prec=1):
    fmt = "{:.%df}" % prec

    def num(v):
        s = fmt.format(v)
        if "." in s:
            s = s.rstrip("0").rstrip(".")
        if s.startswith("0."):
            s = s[1:]
        elif s.startswith("-0."):
            s = "-" + s[2:]
        return "0" if s in ("", "-0", "-") else s

    def ring(coords):
        coords = list(coords)[:-1]
        out, prev = [], None
        for i, (x, y) in enumerate(coords):
            if i == 0:
                out.append("M" + num(x) + " " + num(y))
                prev = (round(x, prec), round(y, prec))
                continue
            rx, ry = round(x, prec), round(y, prec)
            if (rx, ry) == prev:
                continue
            dx, dy = rx - prev[0], ry - prev[1]
            out.append("l" + num(dx) + ("" if num(dy).startswith("-") else " ") + num(dy))
            prev = (rx, ry)
        return "".join(out).replace("l", "l", 1) + "z"

    geoms = getattr(geom, "geoms", [geom])
    parts = []
    for g in geoms:
        if g.is_empty:
            continue
        g = g.simplify(0.12)
        parts.append(ring(g.exterior.coords))
        for interior in g.interiors:
            parts.append(ring(interior.coords))
    return "".join(parts)


def build_mark(simple=False):
    """Returns (blue_geom, ochre_geom) in a 200x200 box."""
    s = 1.34
    cx, cy = 100, 100
    af = Polygon(catmull(project(AFRICA, cx, cy, s))).buffer(0)
    mg = Polygon(catmull(project(MADAGASCAR, cx, cy, s))).buffer(0)
    if simple:
        # favicon: no branches, bigger continent, heavier scale
        k = 1.36
        af = affinity.scale(af, k, k, origin=(100, 100))
        mg = affinity.scale(mg, k, k, origin=(100, 100))
        sc, pans = scale_of_justice(w=9, beam_w=11, beam_y=62, beam_half=76, pan_y=122,
                                    post_bottom=184, pan_w=44, pan_h=19, string_w=6, finial=8)
        land = unary_union([af, mg])
        blue = land.symmetric_difference(sc).difference(pans.buffer(3.5))
        return fit(blue, pans, pad=2)
    sc, pans = scale_of_justice()
    land = unary_union([af, mg])
    blue = land.symmetric_difference(sc)
    # keep pans clear of the land with a hairline gap
    blue = blue.difference(pans.buffer(2.2))
    br = branches()
    blue = unary_union([blue, br.difference(pans.buffer(2.5))])
    return fit(blue, pans, pad=3)


def fit(blue, pans, pad=3, size=200):
    """Scale + centre both layers into the square viewBox with padding."""
    x0, y0, x1, y1 = unary_union([blue, pans]).bounds
    k = (size - 2 * pad) / max(x1 - x0, y1 - y0)
    def t(g):
        g = affinity.scale(g, k, k, origin=(x0, y0))
        return affinity.translate(g, pad - x0 + ((size - 2 * pad) - (x1 - x0) * k) / 2,
                                  pad - y0 + ((size - 2 * pad) - (y1 - y0) * k) / 2)
    return t(blue), t(pans)


# ---------------------------------------------------------------- text
class Font:
    def __init__(self, path):
        self.tt = TTFont(path)
        self.upem = self.tt["head"].unitsPerEm
        self.gs = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        self.tt.flavor = None
        import io
        buf = io.BytesIO()
        self.tt.save(buf)
        self.hbfont = hb.Font(hb.Face(hb.Blob(buf.getvalue())))

    def shape(self, text, direction="ltr", script=None, lang=None):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        buf.direction = direction
        if script:
            buf.script = script
        if lang:
            buf.language = lang
        hb.shape(self.hbfont, buf, {"kern": True, "liga": True})
        return buf.glyph_infos, buf.glyph_positions

    def path(self, text, size, x, y, direction="ltr", script=None, lang=None,
             tracking=0.0):
        """Return (svg path d, advance width) with baseline at y, left edge x."""
        infos, poss = self.shape(text, direction, script, lang)
        k = size / self.upem
        pen = SVGPathPen(self.gs, ntos=lambda v: ("%.1f" % v).rstrip("0").rstrip("."))
        pen_x = 0
        for info, pos in zip(infos, poss):
            name = self.order[info.codepoint]
            gx = x + (pen_x + pos.x_offset) * k
            gy = y - pos.y_offset * k
            tp = TransformPen(pen, (k, 0, 0, -k, gx, gy))
            self.gs[name].draw(tp)
            pen_x += pos.x_advance + tracking * self.upem
        return pen.getCommands(), pen_x * k


def font_path(pkg, fn):
    return os.path.join(FONTS, pkg, "files", fn)


ROBOTO_B = Font(font_path("roboto", "roboto-latin-700-normal.woff2"))
ROBOTO_R = Font(font_path("roboto", "roboto-latin-400-normal.woff2"))
NASKH_B = Font(font_path("noto-naskh-arabic", "noto-naskh-arabic-arabic-700-normal.woff2"))


# ---------------------------------------------------------------- output
def svg(w, h, title, body, desc=None, lang=None):
    d = f"<desc>{desc}</desc>" if desc else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmtn(w)} {fmtn(h)}" '
            + (f'lang="{lang}" ' if lang else '') + f'role="img" aria-labelledby="t">'
            f'<title id="t">{title}</title>{d}{body}</svg>\n')


def fmtn(v):
    return ("%.1f" % v).rstrip("0").rstrip(".")


def write(name, content, base=OUT):
    p = os.path.join(base, name)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"{os.path.relpath(p, ROOT):40s} {len(content.encode()):6d} B")


PALETTES = {
    "": (BLUE, OCHRE, NAVY),        # colour: mark, pans, text
    "-white": (WHITE, OCHRE, WHITE),
    "-navy": (NAVY, NAVY, NAVY),
    "-black": (BLACK, BLACK, BLACK),
}


def mark_body(blue_d, ochre_d, c_mark, c_pan, transform=None):
    t = f' transform="{transform}"' if transform else ""
    return (f'<g{t}><path fill="{c_mark}" d="{blue_d}"/>'
            f'<path fill="{c_pan}" d="{ochre_d}"/></g>')


def main():
    blue, ochre = build_mark()
    blue_d, ochre_d = poly_to_path(blue), poly_to_path(ochre)

    title_mark = "ACJR – African Center for Justice Rights"
    for suf in ("", "-white", "-navy", "-black"):
        cm, cp, _ = PALETTES[suf]
        write(f"mark{suf}.svg", svg(200, 200, title_mark, mark_body(blue_d, ochre_d, cm, cp)))

    # favicon: simplified (no branches, heavier strokes)
    fb, fo = build_mark(simple=True)
    write("favicon.svg", svg(200, 200, "ACJR",
                             mark_body(poly_to_path(fb), poly_to_path(fo), BLUE, OCHRE)),
          base=os.path.join(ROOT, "public"))
    write("favicon-mark.svg", svg(200, 200, "ACJR",
                                  mark_body(poly_to_path(fb), poly_to_path(fo), BLUE, OCHRE)))

    # ---- lockups. Mark occupies a 200x200 cell; text block to its side.
    langs = {
        "en": dict(acr="ACJR", lines=["African Center for", "Justice Rights"],
                   title="ACJR – African Center for Justice Rights"),
        # ACJR is the legal reference name (statutes, Art. 1), so it is used in every language.
        "fr": dict(acr="ACJR", lines=["Centre Africain pour les", "Droits de la Justice"],
                   title="ACJR – Centre Africain pour les Droits de la Justice"),
        "ar": dict(acr=None, lines=["المركز الافريقي", "للحقوق والعدالة"],
                   title="المركز الافريقي للحقوق والعدالة – ACJR"),
    }
    gap = 26          # mark -> divider and divider -> text
    for lang, cfg in langs.items():
        for suf in ("", "-white"):
            cm, cp, ct = PALETTES[suf]
            parts = []
            if lang != "ar":
                # The name is sized to stay legible at header size (the lockup is shown 52–72 px tall).
                acr_size, line_size = 70, 40
                text_x = 200 + gap * 2 + 3
                d1, w1 = ROBOTO_B.path(cfg["acr"], acr_size, text_x, 86, tracking=0.02)
                d2, w2 = ROBOTO_R.path(cfg["lines"][0], line_size, text_x + 2, 132)
                d3, w3 = ROBOTO_R.path(cfg["lines"][1], line_size, text_x + 2, 178)
                width = text_x + max(w1, w2 + 2, w3 + 2) + 12
                parts.append(f'<path fill="{ct}" d="{d1}"/>')
                parts.append(f'<path fill="{ct}" d="{d2}{d3}"/>')
                parts.insert(0, mark_body(blue_d, ochre_d, cm, cp))
                divider_x = 200 + gap
            else:
                size = 54
                acr_size = 38
                # measure first, then right-align next to the divider on the right
                _, w1 = NASKH_B.path(cfg["lines"][0], size, 0, 0, "rtl", "Arab", "ar")
                _, w2 = NASKH_B.path(cfg["lines"][1], size, 0, 0, "rtl", "Arab", "ar")
                _, w3 = ROBOTO_B.path("ACJR", acr_size, 0, 0, tracking=0.02)
                tw = max(w1, w2, w3)
                pad = 12
                right = pad + tw
                d1, _ = NASKH_B.path(cfg["lines"][0], size, right - w1, 66, "rtl", "Arab", "ar")
                d2, _ = NASKH_B.path(cfg["lines"][1], size, right - w2, 132, "rtl", "Arab", "ar")
                # ACJR, the legal reference name, under the Arabic name as in the other lockups.
                d3, _ = ROBOTO_B.path("ACJR", acr_size, right - w3, 182, tracking=0.02)
                d2 += d3
                divider_x = right + gap
                mark_x = divider_x + gap + 3 - 3
                width = mark_x + 200
                parts.append(f'<path fill="{ct}" d="{d1}{d2}"/>')
                parts.append(mark_body(blue_d, ochre_d, cm, cp, f"translate({fmtn(mark_x)} 0)"))
            div_col = ct
            parts.append(f'<rect x="{fmtn(divider_x)}" y="36" width="3" height="128" '
                         f'fill="{div_col}" opacity=".35"/>')
            write(f"lockup-{lang}{suf}.svg", svg(width, 200, cfg["title"], "".join(parts), lang=lang))


if __name__ == "__main__":
    main()
