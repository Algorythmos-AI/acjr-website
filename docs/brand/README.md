# ACJR brand mark

The mark is an open seal: a silhouette of Africa (with Madagascar), a balanced scale of justice whose beam crosses the continent and whose post runs down through it, and two broad-leaved olive branches that meet at the bottom and stay open at the top.

All SVGs are pure vector paths. Text is converted to outlines, so no font is needed. To rebuild the set, run `python3 scripts/brand/build_svgs.py`, then `node scripts/brand/rasterise.mjs`.

## Files

| File | Use |
|---|---|
| `mark.svg` | Colour mark on white or light backgrounds |
| `mark-white.svg` | On navy `#0B2545`, charcoal `#333333` or photos (the pans stay ochre) |
| `mark-navy.svg` | One colour, navy |
| `mark-black.svg` | One colour, black (fax, stamps, engraving) |
| `favicon-mark.svg` | Simplified mark for sizes under 32 px (no branches, heavier strokes) |
| `lockup-en.svg` / `-white` | Mark, gold divider, a heavy **ACJR** (Roboto Black) over *Africa Center for Justice Rights* on one line (Roboto Medium), as in the president's reference artwork. The logo reads "Africa"; the registered legal name used in all other text stays "African Center for Justice Rights". |
| `lockup-fr.svg` / `-white` | Same wordmark as English (the client asked for the name exactly as in his artwork). ACJR is the legal reference name (statutes, Art. 1), so every lockup uses it. |
| `lockup-ar.svg` / `-white` | Mirrored for RTL (mark on the right), gold divider, heavy **ACJR** over المركز الافريقي للحقوق والعدالة on one line |
| `og-image-{fr,en,ar}.png` | 1200×630 social sharing images |
| `/favicon.svg`, `/favicon.ico`, `/apple-touch-icon.png` | Browser and home-screen icons |

## Colours

| Role | Hex |
|---|---|
| Mark (Africa, scale, branches) | `#0070AD` (`--blue-700`) |
| Scale pans | `#C8963E` |
| Text, dark backgrounds | `#0B2545` |
| Accent rule (OG images) | `#009EDB` |
| Alternative dark background | `#333333` |

## Clear space and minimum size

- **Clear space:** keep a margin on all sides at least equal to the height of one scale pan (x), which is about 1/20 of the mark's height. Nothing else may enter that margin.
- **Minimum size:** the full mark must be at least **24 px** (or 8 mm in print) tall. Below 32 px, use `favicon-mark.svg`.
- **Lockups:** at least **48 px** (or 16 mm) tall, so that the full name stays readable. Below that, use the mark on its own.

## Do

- Use the supplied files exactly as they are, and scale them proportionally.
- Use the language lockup that matches the page language. Use the Arabic lockup only in right-to-left contexts.
- Use the white variant on navy or charcoal, and the colour variant on white or light grey.

## Don't

- **Never pair the mark with the UN emblem, and never imply any affiliation with the United Nations or its agencies.** Don't add a globe, map grid or polar projection to the mark.
- Don't recolour, stretch, rotate, outline, add shadows to, or rearrange the parts of the mark.
- Don't close the olive branches into a full wreath, and don't add leaves.
- Don't retype the name in another font. Don't rebuild the Arabic by hand. Regenerate it with the script, which shapes the text with HarfBuzz.
- Don't place the colour mark on busy images or on mid-tone backgrounds where the contrast is low.
