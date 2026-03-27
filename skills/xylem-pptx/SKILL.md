---
name: xylem-pptx
description: >
  Generates and styles PowerPoint presentations following Xylem's official corporate brand
  guidelines. Use this skill whenever the user asks for a presentation, slide deck, or deck
  in "Xylem format", "corporate style", "company template", or "Xylem brand". Also trigger
  when the user shares a presentation and asks to reformat or restyle it with Xylem branding.
  This skill defines exact colors, fonts, layouts, and slide-type rules so every output looks
  like a professionally designed Xylem corporate deck. Always use this skill for any
  presentation work in the Xylem context, even if the user does not explicitly mention branding.
---

# Xylem Corporate PowerPoint Skill

This skill encodes Xylem's corporate visual identity for PowerPoint presentations.
Use it every time you create or reformat a presentation for this organization.

For pptxgenjs API details, code patterns, and per-slide-type code snippets → read [references/slide-types.md](references/slide-types.md).

---

## Brand Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Xylem Navy | `#003057` | Title/closing backgrounds, level-1 cards |
| Secondary | Xylem Blue | `#00629B` | Top bars, section dividers, level-2 cards |
| Accent | Xylem Green | `#78BE20` | Accent bars, CTAs, level-3 cards, sustainability |
| Background | Light Blue | `#E8F4FD` | Level-4 card fills |
| Background | Off-white | `#F5F5F5` | Content slide backgrounds, level-5 cards |
| Body text | Dark Charcoal | `#231F20` | All body copy on light backgrounds |
| Secondary text | Mid Gray | `#6D6E71` | Captions, footers, subtitles on light bg |
| Base | White | `#FFFFFF` | Text on dark backgrounds, card fills |

**Color weight rule**: Navy + Blue ≈ 60–70% visual weight · Green ≈ 10–15% · White/Gray ≈ 20–30%.

---

## Typography

| Element | Font | Size | Style |
|---------|------|------|-------|
| Slide title | Calibri (Arial fallback) | 28–44 pt | Bold |
| Section header | Calibri | 32–36 pt | Bold |
| Body / bullets | Calibri | 16–18 pt | Regular |
| Callouts / labels | Calibri | 14–16 pt | Light Italic |
| Footer / captions | Calibri | 10–12 pt | Regular |

- Never use decorative, script, or display fonts.
- Titles are left-aligned on content slides; centered only on title/closing/section slides.
- Left-align all body paragraphs and lists — never center body text.

---

## Five Slide Types

### 1 · Title Slide
- **Background**: full-bleed Navy `#003057`
- **Title**: white, Calibri Bold, 40–44 pt, left-aligned with left padding ~0.9"
- **Subtitle**: Xylem Green `#78BE20`, Calibri Light, 20 pt
- **Bottom accent**: thin horizontal bar (h = 0.14") in `#78BE20` at slide bottom
- **Left decorative band**: 0.18"-wide vertical stripe in `#00629B` along left edge

### 2 · Section Divider Slide
- **Background**: Xylem Blue `#00629B`
- **Section number** (optional): White, Calibri Light, 16 pt, upper-left
- **Section title**: White, Calibri Bold, 36 pt, vertically + horizontally centered
- No footer on this slide type.

### 3 · Content Slide (standard)
- **Background**: White `#FFFFFF` or Off-white `#F5F5F5`
- **Top bar**: full-width rectangle, h = 0.15", fill `#00629B`, y = 0"
- **Slide title**: `#003057`, Calibri Bold, 28–32 pt, left-aligned, y ≈ 0.22"
- **Body area**: starts at y ≈ 0.95", `#231F20`, Calibri 16–18 pt
- **Footer**: slide number right-aligned + "Xylem" left-aligned, gray `#6D6E71`, 10 pt, y ≈ 7.08"

### 4 · Hierarchy / Framework Slide
Used for pyramid diagrams, layered frameworks, or tiered taxonomies.
- **Background**: White or Off-white
- **Top bar + title + footer**: same as Content Slide
- **Hierarchy cards** (stacked rectangles, progressively wider toward the bottom):

| Level | Fill | Text Color | Use for |
|-------|------|------------|---------|
| 1 (top / strategic) | `#003057` Navy | White | Vision, PRFAQ |
| 2 | `#00629B` Blue | White | Strategy, OKRs |
| 3 | `#78BE20` Green | `#231F20` Dark | Discovery artifacts |
| 4 | `#E8F4FD` Light Blue | `#003057` | Planning artifacts |
| 5+ | `#F5F5F5` Off-white + border `#00629B` | `#231F20` | Execution artifacts |

Connecting arrows (if needed) use `#6D6E71` Mid Gray, thickness 1.5–2 pt.

### 5 · Closing / Thank You Slide
- Same structure as the Title Slide (Navy background, decorative bands)
- Main headline: White, Calibri Bold, 30 pt
- Takeaway pills: slightly lighter navy (`#0A2040`) background, white text
- Contact / next-steps: Green `#78BE20`, Calibri 14 pt

---

## Spacing & Layout Rules

- **Margins**: minimum 0.5" from all slide edges
- **Gap between content blocks**: 0.3"–0.5" consistently
- **Slide dimensions**: 13.33" × 7.5" (widescreen 16:9) — use `prs.layout = 'LAYOUT_WIDE'`
- **Every slide must have at least one visual element** (colored bar, card, icon shape, or chart)
- Footer is present on **every content and hierarchy slide**, absent on title/section/closing

---

## Strict Don'ts

- ❌ Do NOT use gradient fills — solid colors only
- ❌ Do NOT use decorative underlines or accent lines beneath titles
- ❌ Do NOT use fonts other than Calibri / Arial
- ❌ Do NOT put body text smaller than 14 pt
- ❌ Do NOT center body paragraphs or bullet lists
- ❌ Do NOT mix spacing randomly across slides

---

## Workflow

1. **Read this SKILL.md** to internalize brand constants.
2. **Read `references/slide-types.md`** for ready-to-use pptxgenjs code patterns.
3. **Plan slide types** for each slide before writing code (title / content / section / hierarchy / closing).
4. **Generate with pptxgenjs** — install via `npm install pptxgenjs`.
5. **QA**: open the file in PowerPoint or LibreOffice to verify layout.

---

## Quick Reference — pptxgenjs Constants

```js
const XYLEM = {
  navy:     '003057',
  blue:     '00629B',
  green:    '78BE20',
  lightBlue:'E8F4FD',
  offWhite: 'F5F5F5',
  charcoal: '231F20',
  gray:     '6D6E71',
  white:    'FFFFFF',
};
const FONT = 'Calibri';
const W = 13.33; // slide width inches
const H = 7.5;   // slide height inches
const PAD = 0.5; // standard margin inches
```

---

## Examples

- `examples/generate_product_artifacts_xylem.js` — Full 9-slide rebuild of the "Del PRFAQ al Sprint" presentation