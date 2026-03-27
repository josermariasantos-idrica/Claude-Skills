# Xylem PPTX — Slide Type Reference

Detailed pptxgenjs code patterns for every Xylem slide type.
Brand constants are defined in [../SKILL.md](../SKILL.md).

---

## Setup

```js
const pptxgen = require('pptxgenjs');
const prs = new pptxgen();
prs.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

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
const W = 13.33, H = 7.5, PAD = 0.5;
```

---

## Helper: addFooter

```js
function addFooter(slide, slideNum) {
  slide.addText('Xylem', {
    x: PAD, y: H - 0.42, w: 3, h: 0.35,
    fontFace: FONT, fontSize: 10,
    color: XYLEM.gray, align: 'left', valign: 'middle',
  });
  slide.addText(String(slideNum), {
    x: W - PAD - 1.5, y: H - 0.42, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 10,
    color: XYLEM.gray, align: 'right', valign: 'middle',
  });
}
```

## Helper: addTopBarAndTitle

```js
function addTopBarAndTitle(slide, titleText) {
  // Blue top bar (full width)
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: 0.15,
    fill: { color: XYLEM.blue }, line: { type: 'none' },
  });
  // Navy title
  slide.addText(titleText, {
    x: PAD, y: 0.22, w: W - PAD * 2, h: 0.55,
    fontFace: FONT, fontSize: 28, bold: true,
    color: XYLEM.navy, align: 'left', valign: 'middle',
  });
}
```

---

## 1 · Title Slide

```js
function addTitleSlide(prs, title, subtitle) {
  const slide = prs.addSlide();

  // Full-bleed navy background
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: H,
    fill: { color: XYLEM.navy }, line: { type: 'none' },
  });

  // Bottom green accent bar
  slide.addShape('rect', {
    x: 0, y: H - 0.14, w: W, h: 0.14,
    fill: { color: XYLEM.green }, line: { type: 'none' },
  });

  // Left blue vertical band (decorative)
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: H - 0.14,
    fill: { color: XYLEM.blue }, line: { type: 'none' },
  });

  // Main title
  slide.addText(title, {
    x: 0.9, y: 1.8, w: W - 1.4, h: 1.2,
    fontFace: FONT, fontSize: 44, bold: true,
    color: XYLEM.white, align: 'left', valign: 'middle',
  });

  // Subtitle
  slide.addText(subtitle, {
    x: 0.9, y: 3.3, w: W - 1.4, h: 0.65,
    fontFace: FONT, fontSize: 20,
    color: XYLEM.green, align: 'left',
  });

  return slide;
}
```

---

## 2 · Section Divider Slide

```js
function addSectionSlide(prs, sectionTitle, sectionNumber) {
  const slide = prs.addSlide();

  // Full-bleed blue background
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: H,
    fill: { color: XYLEM.blue }, line: { type: 'none' },
  });

  // Optional section number (top-left)
  if (sectionNumber) {
    slide.addText(`0${sectionNumber}`, {
      x: PAD, y: PAD, w: 1.5, h: 0.5,
      fontFace: FONT, fontSize: 16,
      color: XYLEM.white, align: 'left',
    });
  }

  // Centered section title
  slide.addText(sectionTitle, {
    x: PAD, y: 0, w: W - PAD * 2, h: H,
    fontFace: FONT, fontSize: 36, bold: true,
    color: XYLEM.white, align: 'center', valign: 'middle',
  });

  return slide;
}
```

---

## 3 · Content Slide

```js
function addContentSlide(prs, title, bullets, slideNum) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, title);

  // Body bullets
  const items = bullets.map(b => ({
    text: b,
    options: { bullet: true, fontSize: 16, color: XYLEM.charcoal, fontFace: FONT },
  }));

  slide.addText(items, {
    x: PAD, y: 0.95, w: W - PAD * 2, h: H - 0.95 - 0.6,
    valign: 'top', lineSpacingMultiple: 1.5, wrap: true,
  });

  addFooter(slide, slideNum);
  return slide;
}
```

---

## 4 · Hierarchy / Framework Slide

```js
function addHierarchySlide(prs, title, levels, slideNum) {
  // levels = [{ label, sublabel, fill, textColor, borderColor? }, ...]
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, title);

  const cardH  = 0.82;
  const gapY   = 0.06;
  const startY = 1.05;
  const minW   = 4.0;
  const maxW   = W - PAD * 2;
  const wStep  = (maxW - minW) / (levels.length - 1);

  levels.forEach((lvl, i) => {
    const cardW = minW + wStep * i;
    const cardX = PAD + (maxW - cardW) / 2;
    const cardY = startY + i * (cardH + gapY);

    const lineOpts = lvl.borderColor
      ? { color: lvl.borderColor, width: 1.5 }
      : { type: 'none' };

    slide.addShape('rect', {
      x: cardX, y: cardY, w: cardW, h: cardH,
      fill: { color: lvl.fill }, line: lineOpts,
    });

    slide.addText(lvl.label, {
      x: cardX + 0.2, y: cardY + 0.04, w: cardW - 0.4, h: cardH * 0.46,
      fontFace: FONT, fontSize: 13, bold: true,
      color: lvl.textColor, align: 'center', valign: 'bottom',
    });

    slide.addText(lvl.sublabel, {
      x: cardX + 0.2, y: cardY + cardH * 0.5, w: cardW - 0.4, h: cardH * 0.46,
      fontFace: FONT, fontSize: 11,
      color: lvl.textColor, align: 'center', valign: 'top',
    });
  });

  addFooter(slide, slideNum);
  return slide;
}

// Example usage:
addHierarchySlide(prs, 'La Jerarquía de Artefactos de Producto', [
  { label: 'NIVEL 1 · VISIÓN',       sublabel: 'PRFAQ',                         fill: XYLEM.navy,      textColor: XYLEM.white    },
  { label: 'NIVEL 2 · ESTRATEGIA',   sublabel: 'Product Strategy · OKRs',       fill: XYLEM.blue,      textColor: XYLEM.white    },
  { label: 'NIVEL 3 · DISCOVERY',    sublabel: 'Problem Statement · Opp. Canvas · Solution Brief', fill: XYLEM.green, textColor: XYLEM.charcoal },
  { label: 'NIVEL 4 · PLANIFICACIÓN',sublabel: 'Epic · Feature · User Story Map', fill: XYLEM.lightBlue, textColor: XYLEM.navy, borderColor: XYLEM.blue },
  { label: 'NIVEL 5 · EJECUCIÓN',    sublabel: 'User Story · Task · Bug · Spike', fill: XYLEM.offWhite, textColor: XYLEM.charcoal, borderColor: XYLEM.blue },
], 4);
```

---

## 5 · Two-Column Content Slide

```js
function addTwoColumnSlide(prs, title, leftHeader, leftBullets, rightHeader, rightBullets, slideNum) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, title);

  const colW   = (W - PAD * 3) / 2;
  const colY   = 1.0;
  const colH   = H - colY - 0.6;

  // Left header
  slide.addText(leftHeader, {
    x: PAD, y: colY, w: colW, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true,
    color: XYLEM.navy, align: 'left',
  });

  const leftItems = leftBullets.map(b => ({
    text: b,
    options: { bullet: true, fontSize: 15, color: XYLEM.charcoal, fontFace: FONT },
  }));
  slide.addText(leftItems, { x: PAD, y: colY + 0.5, w: colW, h: colH - 0.5, valign: 'top', lineSpacingMultiple: 1.4, wrap: true });

  // Vertical divider
  slide.addShape('line', {
    x: PAD + colW + 0.15, y: colY, w: 0, h: colH,
    line: { color: XYLEM.blue, width: 1 },
  });

  // Right header
  slide.addText(rightHeader, {
    x: PAD + colW + 0.3, y: colY, w: colW, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true,
    color: XYLEM.navy, align: 'left',
  });

  const rightItems = rightBullets.map(b => ({
    text: b,
    options: { bullet: true, fontSize: 15, color: XYLEM.charcoal, fontFace: FONT },
  }));
  slide.addText(rightItems, { x: PAD + colW + 0.3, y: colY + 0.5, w: colW, h: colH - 0.5, valign: 'top', lineSpacingMultiple: 1.4, wrap: true });

  addFooter(slide, slideNum);
  return slide;
}
```

---

## 6 · Closing / Thank You Slide

```js
function addClosingSlide(prs, headline, takeaways, contactInfo) {
  const slide = prs.addSlide();

  // Full-bleed navy background
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: H,
    fill: { color: XYLEM.navy }, line: { type: 'none' },
  });

  // Bottom green accent bar
  slide.addShape('rect', {
    x: 0, y: H - 0.14, w: W, h: 0.14,
    fill: { color: XYLEM.green }, line: { type: 'none' },
  });

  // Left blue vertical band
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: H - 0.14,
    fill: { color: XYLEM.blue }, line: { type: 'none' },
  });

  // Headline
  slide.addText(headline, {
    x: 0.9, y: 0.9, w: W - 1.4, h: 0.7,
    fontFace: FONT, fontSize: 30, bold: true,
    color: XYLEM.white, align: 'left',
  });

  // Takeaway pills
  const pillH = 0.62, pillGap = 0.1, pillY0 = 1.85;
  takeaways.forEach((t, i) => {
    const pillY = pillY0 + i * (pillH + pillGap);
    slide.addShape('rect', {
      x: 0.9, y: pillY, w: W - 1.4, h: pillH,
      fill: { color: '0A2040' }, line: { type: 'none' },
    });
    slide.addText(t, {
      x: 1.1, y: pillY, w: W - 1.8, h: pillH,
      fontFace: FONT, fontSize: 14, color: XYLEM.white,
      align: 'left', valign: 'middle', wrap: true,
    });
  });

  // Contact info
  slide.addText(contactInfo, {
    x: 0.9, y: H - 0.75, w: W - 1.4, h: 0.45,
    fontFace: FONT, fontSize: 14,
    color: XYLEM.green, align: 'left',
  });

  return slide;
}
```