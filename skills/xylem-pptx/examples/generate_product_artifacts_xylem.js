/**
 * generate_product_artifacts_xylem.js
 *
 * Rebuilds the "Del PRFAQ al Sprint: Jerarquía de Artefactos de Producto"
 * presentation (9 slides) using Xylem corporate brand guidelines.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node generate_product_artifacts_xylem.js
 *
 * Output: product_artifacts_framework_xylem.pptx
 */

'use strict';

const pptxgen = require('pptxgenjs');

// ---------------------------------------------------------------------------
// Brand constants
// ---------------------------------------------------------------------------
const X = {
  navy:     '003057',
  blue:     '00629B',
  green:    '78BE20',
  offWhite: 'F5F5F5',
  charcoal: '231F20',
  gray:     '6D6E71',
  white:    'FFFFFF',
  lightBlue:'E8F4FD',
};
const FONT = 'Calibri';
const W    = 13.33;   // slide width (inches) – LAYOUT_WIDE
const H    = 7.5;     // slide height (inches)
const PAD  = 0.5;     // standard margin

// ---------------------------------------------------------------------------
// Helper: standard footer (left = "Xylem", right = slide number)
// ---------------------------------------------------------------------------
function addFooter(slide, slideNum) {
  slide.addText('Xylem', {
    x: PAD, y: H - 0.42, w: 3, h: 0.35,
    fontFace: FONT, fontSize: 10,
    color: X.gray, align: 'left', valign: 'middle',
  });
  slide.addText(String(slideNum), {
    x: W - PAD - 1.5, y: H - 0.42, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 10,
    color: X.gray, align: 'right', valign: 'middle',
  });
}

// ---------------------------------------------------------------------------
// Helper: blue top bar + navy title (shared by content & hierarchy slides)
// ---------------------------------------------------------------------------
function addTopBarAndTitle(slide, titleText) {
  // Blue top bar
  slide.addShape(pptxgen.ShapeType ? pptxgen.ShapeType.rect : 'rect', {
    x: 0, y: 0, w: W, h: 0.15,
    fill: { color: X.blue }, line: { type: 'none' },
  });
  // Title
  slide.addText(titleText, {
    x: PAD, y: 0.22, w: W - PAD * 2, h: 0.55,
    fontFace: FONT, fontSize: 28, bold: true,
    color: X.navy, align: 'left', valign: 'middle',
  });
}

// ---------------------------------------------------------------------------
// SLIDE 1 — Title slide
// ---------------------------------------------------------------------------
function slide1(prs) {
  const slide = prs.addSlide();

  // Full-bleed navy background
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: H,
    fill: { color: X.navy }, line: { type: 'none' },
  });

  // Bottom green accent bar
  slide.addShape('rect', {
    x: 0, y: H - 0.14, w: W, h: 0.14,
    fill: { color: X.green }, line: { type: 'none' },
  });

  // Left blue vertical band (decorative)
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: H - 0.14,
    fill: { color: X.blue }, line: { type: 'none' },
  });

  // Main title
  slide.addText('Del PRFAQ al Sprint', {
    x: 0.9, y: 1.6, w: W - 1.4, h: 1.1,
    fontFace: FONT, fontSize: 44, bold: true,
    color: X.white, align: 'left', valign: 'bottom',
  });

  // Title continuation
  slide.addText('Jerarquía de Artefactos de Producto', {
    x: 0.9, y: 2.7, w: W - 1.4, h: 0.8,
    fontFace: FONT, fontSize: 28, bold: false,
    color: X.white, align: 'left', valign: 'top',
  });

  // Subtitle / tagline
  slide.addText('Framework para alinear estrategia, discovery y ejecución', {
    x: 0.9, y: 3.8, w: W - 1.4, h: 0.65,
    fontFace: FONT, fontSize: 20, bold: false,
    color: X.green, align: 'left', valign: 'top',
  });

  // Notes
  slide.addNotes('Slide 1 – Title. Introduce the framework: from the high-level PRFAQ vision down to Sprint execution tasks. Set the stage for why this hierarchy matters.');

  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 2 — Agenda / Índice
// ---------------------------------------------------------------------------
function slide2(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'Agenda');

  const items = [
    { text: '01 · El problema: desconexión entre estrategia y ejecución', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
    { text: '02 · La jerarquía de artefactos de producto (visión completa)', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
    { text: '03 · Nivel 1 – Visión: PRFAQ', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
    { text: '04 · Niveles 3–4 – Discovery & Planning: Artefactos clave', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
    { text: '05 · Nivel 5 – Ejecución: User Stories, Tasks, Bugs y Spikes', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
    { text: '06 · Cómo usar el framework en tu equipo', options: { fontSize: 16, color: X.charcoal, fontFace: FONT, bullet: true } },
  ];

  slide.addText(items, {
    x: PAD, y: 1.0, w: W - PAD * 2, h: H - 1.0 - 0.6,
    valign: 'top', lineSpacingMultiple: 1.6, wrap: true,
  });

  // Right decorative block
  slide.addShape('rect', {
    x: W - 1.2, y: 0.15, w: 0.7, h: H - 0.6,
    fill: { color: X.lightBlue }, line: { type: 'none' },
  });

  addFooter(slide, 2);
  slide.addNotes('Slide 2 – Agenda. Walk the audience through the six sections of the presentation.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 3 — El Problema
// ---------------------------------------------------------------------------
function slide3(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'El Problema: Desconexión entre Estrategia y Ejecución');

  // Two-column layout: problem description | consequences
  const leftW = (W - PAD * 3) / 2;
  const rightW = leftW;
  const colY = 1.0;
  const colH = H - colY - 0.6;

  // Left column header
  slide.addText('¿Qué ocurre sin un framework?', {
    x: PAD, y: colY, w: leftW, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true,
    color: X.navy, align: 'left',
  });

  const leftBullets = [
    { text: 'Los equipos trabajan en features sin saber por qué.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'La estrategia de producto no se traslada a los sprints.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'Los OKRs quedan desconectados de las historias de usuario.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'El discovery y la entrega operan en silos.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
  ];

  slide.addText(leftBullets, {
    x: PAD, y: colY + 0.5, w: leftW, h: colH - 0.5,
    valign: 'top', lineSpacingMultiple: 1.4, wrap: true,
  });

  // Vertical divider
  slide.addShape('line', {
    x: PAD + leftW + 0.15, y: colY, w: 0, h: colH,
    line: { color: X.blue, width: 1 },
  });

  // Right column header
  slide.addText('Consecuencias', {
    x: PAD + leftW + 0.3, y: colY, w: rightW, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true,
    color: X.navy, align: 'left',
  });

  const rightBullets = [
    { text: 'Desperdicio de esfuerzo en features de bajo impacto.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'Deuda técnica por falta de criterios claros de priorización.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'Fricción entre negocio, producto e ingeniería.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
    { text: 'Velocidad alta, impacto bajo.', options: { bullet: true, fontSize: 15, color: X.charcoal, fontFace: FONT } },
  ];

  slide.addText(rightBullets, {
    x: PAD + leftW + 0.3, y: colY + 0.5, w: rightW, h: colH - 0.5,
    valign: 'top', lineSpacingMultiple: 1.4, wrap: true,
  });

  addFooter(slide, 3);
  slide.addNotes('Slide 3 – The Problem. Explain the misalignment pain that this framework solves. Use examples from your own team if available.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 4 — La Jerarquía de Artefactos (main framework / hierarchy slide)
// ---------------------------------------------------------------------------
function slide4(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'La Jerarquía de Artefactos de Producto');

  const levels = [
    { level: 1, label: 'NIVEL 1 · VISIÓN',        sublabel: 'PRFAQ',                                                     fill: X.navy,      text: X.white,    borderColor: null },
    { level: 2, label: 'NIVEL 2 · ESTRATEGIA',     sublabel: 'Product Strategy · OKRs',                                   fill: X.blue,      text: X.white,    borderColor: null },
    { level: 3, label: 'NIVEL 3 · DISCOVERY',      sublabel: 'Problem Statement · Opportunity Canvas · Solution Brief',   fill: X.green,     text: X.charcoal, borderColor: null },
    { level: 4, label: 'NIVEL 4 · PLANIFICACIÓN',  sublabel: 'Epic · Feature · User Story Map',                           fill: X.lightBlue, text: X.navy,     borderColor: X.blue },
    { level: 5, label: 'NIVEL 5 · EJECUCIÓN',      sublabel: 'User Story · Task · Bug · Spike',                           fill: X.offWhite,  text: X.charcoal, borderColor: X.blue },
  ];

  const cardH  = 0.82;
  const gapY   = 0.06;
  const startY = 1.05;
  const minW   = 4.2;
  const maxW   = W - PAD * 2;
  const wStep  = (maxW - minW) / (levels.length - 1);

  levels.forEach((lvl, i) => {
    const cardW = minW + wStep * i;           // wider at bottom
    const cardX = PAD + (maxW - cardW) / 2;
    const cardY = startY + i * (cardH + gapY);

    // Card background
    const lineOpts = lvl.borderColor
      ? { color: lvl.borderColor, width: 1.5 }
      : { type: 'none' };

    slide.addShape('rect', {
      x: cardX, y: cardY, w: cardW, h: cardH,
      fill: { color: lvl.fill }, line: lineOpts,
    });

    // Level label (top portion of card)
    slide.addText(lvl.label, {
      x: cardX + 0.25, y: cardY + 0.04, w: cardW - 0.5, h: cardH * 0.48,
      fontFace: FONT, fontSize: 13, bold: true,
      color: lvl.text, align: 'center', valign: 'bottom',
    });

    // Artifacts sub-label
    slide.addText(lvl.sublabel, {
      x: cardX + 0.25, y: cardY + cardH * 0.5, w: cardW - 0.5, h: cardH * 0.46,
      fontFace: FONT, fontSize: 11,
      color: lvl.text, align: 'center', valign: 'top',
    });
  });

  addFooter(slide, 4);
  slide.addNotes('Slide 4 – The Hierarchy. This is the core framework slide. Explain how each level feeds into the next, from the PRFAQ vision down to Sprint execution tasks.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 5 — PRFAQ (Nivel 1 · Visión)
// ---------------------------------------------------------------------------
function slide5(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'Nivel 1 · Visión — PRFAQ');

  // Colored label badge
  slide.addShape('rect', {
    x: PAD, y: 0.95, w: 2.8, h: 0.38,
    fill: { color: X.navy }, line: { type: 'none' },
  });
  slide.addText('Press Release & FAQ', {
    x: PAD, y: 0.95, w: 2.8, h: 0.38,
    fontFace: FONT, fontSize: 12, bold: true,
    color: X.white, align: 'center', valign: 'middle',
  });

  // Definition
  slide.addText('¿Qué es el PRFAQ?', {
    x: PAD, y: 1.5, w: W - PAD * 2, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: X.navy, align: 'left',
  });
  slide.addText(
    'Artefacto estratégico inspirado en el método Amazon. Describe el producto desde la perspectiva del cliente final, simulando el comunicado de prensa del lanzamiento y respondiendo las preguntas más frecuentes.',
    {
      x: PAD, y: 1.95, w: W - PAD * 2, h: 0.75,
      fontFace: FONT, fontSize: 15, color: X.charcoal, align: 'left', wrap: true,
    }
  );

  // Two columns: Estructura | Cuándo usarlo
  const colW = (W - PAD * 3) / 2;

  slide.addText('Estructura', {
    x: PAD, y: 2.85, w: colW, h: 0.38,
    fontFace: FONT, fontSize: 15, bold: true, color: X.navy,
  });
  const leftItems = [
    { text: 'Título: nombre del producto', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'Subtítulo: propuesta de valor en una frase', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'Párrafo introductorio: contexto del problema', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'Cita del cliente (ficticia): validación emocional', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'FAQ: las 5-10 preguntas más difíciles respondidas', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
  ];
  slide.addText(leftItems, { x: PAD, y: 3.28, w: colW, h: 2.8, valign: 'top', lineSpacingMultiple: 1.35, wrap: true });

  slide.addShape('line', {
    x: PAD + colW + 0.15, y: 2.85, w: 0, h: 3.2,
    line: { color: X.blue, width: 1 },
  });

  slide.addText('¿Cuándo usarlo?', {
    x: PAD + colW + 0.3, y: 2.85, w: colW, h: 0.38,
    fontFace: FONT, fontSize: 15, bold: true, color: X.navy,
  });
  const rightItems = [
    { text: 'Al inicio de cualquier iniciativa de producto nueva.', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'Antes de comprometer recursos de discovery o desarrollo.', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
    { text: 'Para alinear a stakeholders en la visión antes de priorizar.', options: { bullet: true, fontSize: 14, color: X.charcoal, fontFace: FONT } },
  ];
  slide.addText(rightItems, { x: PAD + colW + 0.3, y: 3.28, w: colW, h: 2.8, valign: 'top', lineSpacingMultiple: 1.35, wrap: true });

  addFooter(slide, 5);
  slide.addNotes('Slide 5 – PRFAQ. Explain the Amazon-inspired artifact and why starting with the end customer in mind forces clarity before any investment is made.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 6 — Discovery Artifacts (Nivel 3)
// ---------------------------------------------------------------------------
function slide6(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'Nivel 3 · Discovery — Artefactos Clave');

  const cards = [
    {
      title: 'Problem Statement',
      body: 'Define el problema específico del usuario con evidencias. Incluye: usuario objetivo, problema observado, contexto, impacto medible y definición de éxito.',
      fill: X.navy, text: X.white,
    },
    {
      title: 'Opportunity Canvas',
      body: 'Marco visual para explorar el espacio del problema. Conecta el problema con soluciones potenciales, métricas de éxito, restricciones y riesgos.',
      fill: X.blue, text: X.white,
    },
    {
      title: 'Solution Brief',
      body: 'Documento ligero (~1 página) que describe la solución propuesta, hipótesis clave, alcance mínimo viable y criterios de validación.',
      fill: X.green, text: X.charcoal,
    },
  ];

  const cardW = (W - PAD * 4) / 3;
  const cardH = 4.8;
  const cardY = 1.05;

  cards.forEach((card, i) => {
    const cardX = PAD + i * (cardW + 0.3);

    slide.addShape('rect', {
      x: cardX, y: cardY, w: cardW, h: cardH,
      fill: { color: card.fill }, line: { type: 'none' },
    });

    // Card title
    slide.addText(card.title, {
      x: cardX + 0.2, y: cardY + 0.2, w: cardW - 0.4, h: 0.6,
      fontFace: FONT, fontSize: 15, bold: true,
      color: card.text, align: 'center', valign: 'middle', wrap: true,
    });

    // Thin divider inside card
    slide.addShape('line', {
      x: cardX + 0.3, y: cardY + 0.9, w: cardW - 0.6, h: 0,
      line: { color: card.text === X.white ? X.white : X.navy, width: 0.5 },
    });

    // Card body
    slide.addText(card.body, {
      x: cardX + 0.2, y: cardY + 1.05, w: cardW - 0.4, h: cardH - 1.25,
      fontFace: FONT, fontSize: 13, color: card.text,
      align: 'left', valign: 'top', wrap: true,
    });
  });

  addFooter(slide, 6);
  slide.addNotes('Slide 6 – Discovery artifacts. These three artifacts bridge the strategic vision (PRFAQ) with the planning phase. Each builds on the previous.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 7 — Planning Artifacts (Nivel 4)
// ---------------------------------------------------------------------------
function slide7(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'Nivel 4 · Planificación — Epic, Feature y User Story Map');

  const items = [
    {
      label: 'Epic',
      color: X.navy,
      textColor: X.white,
      desc: 'Gran cuerpo de trabajo que engloba múltiples features relacionadas con un objetivo de negocio. Horizonte: 1–3 trimestres. Tiene criterios de éxito propios ligados a OKRs.',
    },
    {
      label: 'Feature',
      color: X.blue,
      textColor: X.white,
      desc: 'Funcionalidad entregable de valor al usuario, con alcance de semanas. Descompone la Epic en entregas tangibles. Incluye criterios de aceptación de alto nivel.',
    },
    {
      label: 'User Story Map',
      color: X.green,
      textColor: X.charcoal,
      desc: 'Mapa visual que organiza las historias de usuario a lo largo del journey del usuario. Permite identificar el MVP y planificar releases de forma coherente.',
    },
  ];

  const rowH = 1.55;
  const startY = 1.05;
  const labelW = 2.2;
  const descW = W - PAD * 2 - labelW - 0.3;

  items.forEach((item, i) => {
    const rowY = startY + i * (rowH + 0.12);

    // Label badge
    slide.addShape('rect', {
      x: PAD, y: rowY, w: labelW, h: rowH,
      fill: { color: item.color }, line: { type: 'none' },
    });
    slide.addText(item.label, {
      x: PAD, y: rowY, w: labelW, h: rowH,
      fontFace: FONT, fontSize: 16, bold: true,
      color: item.textColor, align: 'center', valign: 'middle',
    });

    // Description
    slide.addText(item.desc, {
      x: PAD + labelW + 0.3, y: rowY + 0.1, w: descW, h: rowH - 0.2,
      fontFace: FONT, fontSize: 14, color: X.charcoal,
      align: 'left', valign: 'middle', wrap: true,
    });

    // Bottom border for row separation
    if (i < items.length - 1) {
      slide.addShape('line', {
        x: PAD, y: rowY + rowH + 0.05, w: W - PAD * 2, h: 0,
        line: { color: X.lightBlue, width: 1 },
      });
    }
  });

  addFooter(slide, 7);
  slide.addNotes('Slide 7 – Planning artifacts. These connect Discovery outcomes to the Sprint backlog. Emphasize that each level has different ownership (PM for Epics/Features, team for Story Map).');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 8 — Execution Artifacts (Nivel 5)
// ---------------------------------------------------------------------------
function slide8(prs) {
  const slide = prs.addSlide();
  addTopBarAndTitle(slide, 'Nivel 5 · Ejecución — Artefactos del Sprint');

  const cards = [
    {
      title: 'User Story',
      icon: '📖',
      desc: 'Como [usuario], quiero [acción] para [beneficio]. Incluye criterios de aceptación en formato Given/When/Then. Tamaño: completable en ≤ 3 días.',
    },
    {
      title: 'Task',
      icon: '✅',
      desc: 'Unidad técnica de trabajo derivada de una User Story. No tiene valor de negocio independiente. Asignada a una persona. Estimada en horas.',
    },
    {
      title: 'Bug',
      icon: '🐛',
      desc: 'Comportamiento no esperado del sistema. Incluye: pasos de reproducción, comportamiento actual vs esperado, severidad e impacto al usuario.',
    },
    {
      title: 'Spike',
      icon: '🔬',
      desc: 'Tarea de investigación técnica o de negocio con tiempo fijo (time-boxed). Output: decisión documentada o propuesta de implementación, no código productivo.',
    },
  ];

  const colW = (W - PAD * 5) / 4;
  const cardH = 4.6;
  const cardY = 1.1;

  cards.forEach((card, i) => {
    const cardX = PAD + i * (colW + 0.3);

    // Card background (alternating light blue / off-white)
    const fillColor = i % 2 === 0 ? X.lightBlue : X.offWhite;
    slide.addShape('rect', {
      x: cardX, y: cardY, w: colW, h: cardH,
      fill: { color: fillColor },
      line: { color: X.blue, width: 1 },
    });

    // Top colored bar on card
    slide.addShape('rect', {
      x: cardX, y: cardY, w: colW, h: 0.35,
      fill: { color: X.navy }, line: { type: 'none' },
    });

    // Card title
    slide.addText(`${card.icon}  ${card.title}`, {
      x: cardX + 0.1, y: cardY + 0.38, w: colW - 0.2, h: 0.55,
      fontFace: FONT, fontSize: 14, bold: true,
      color: X.navy, align: 'center', valign: 'middle', wrap: true,
    });

    // Divider
    slide.addShape('line', {
      x: cardX + 0.15, y: cardY + 1.0, w: colW - 0.3, h: 0,
      line: { color: X.blue, width: 0.75 },
    });

    // Card description
    slide.addText(card.desc, {
      x: cardX + 0.15, y: cardY + 1.1, w: colW - 0.3, h: cardH - 1.25,
      fontFace: FONT, fontSize: 12, color: X.charcoal,
      align: 'left', valign: 'top', wrap: true,
    });
  });

  addFooter(slide, 8);
  slide.addNotes('Slide 8 – Execution artifacts. Clarify the difference between User Stories (value-bearing) and Tasks (implementation steps). Emphasize Spikes as time-boxed research, not open-ended exploration.');
  return slide;
}

// ---------------------------------------------------------------------------
// SLIDE 9 — Closing / Cierre
// ---------------------------------------------------------------------------
function slide9(prs) {
  const slide = prs.addSlide();

  // Full-bleed navy background
  slide.addShape('rect', {
    x: 0, y: 0, w: W, h: H,
    fill: { color: X.navy }, line: { type: 'none' },
  });

  // Bottom green accent bar
  slide.addShape('rect', {
    x: 0, y: H - 0.14, w: W, h: 0.14,
    fill: { color: X.green }, line: { type: 'none' },
  });

  // Left blue vertical band (mirrors title slide)
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.18, h: H - 0.14,
    fill: { color: X.blue }, line: { type: 'none' },
  });

  // Closing headline
  slide.addText('El framework en 5 pasos clave', {
    x: 0.9, y: 0.9, w: W - 1.4, h: 0.7,
    fontFace: FONT, fontSize: 30, bold: true,
    color: X.white, align: 'left',
  });

  // Five takeaway pills
  const takeaways = [
    '① Define la visión con el PRFAQ antes de comprometer cualquier recurso.',
    '② Traduce la visión a estrategia mediante OKRs medibles.',
    '③ Valida el problema con Problem Statement y Opportunity Canvas.',
    '④ Estructura la entrega con Epics, Features y User Story Maps.',
    '⑤ Ejecuta con User Stories bien definidas; usa Spikes para reducir incertidumbre.',
  ];

  const pillH = 0.62;
  const pillGap = 0.1;
  const pillY0 = 1.85;

  takeaways.forEach((t, i) => {
    const pillY = pillY0 + i * (pillH + pillGap);
    slide.addShape('rect', {
      x: 0.9, y: pillY, w: W - 1.4, h: pillH,
      fill: { color: '0A2040' }, // slightly lighter navy for contrast
      line: { type: 'none' },
    });
    slide.addText(t, {
      x: 1.1, y: pillY, w: W - 1.8, h: pillH,
      fontFace: FONT, fontSize: 14, color: X.white,
      align: 'left', valign: 'middle', wrap: true,
    });
  });

  // Call to action
  slide.addText('¿Preguntas? · jose.santos@xylem.com', {
    x: 0.9, y: H - 0.75, w: W - 1.4, h: 0.45,
    fontFace: FONT, fontSize: 14,
    color: X.green, align: 'left',
  });

  slide.addNotes('Slide 9 – Closing. Summarize the five action steps. Invite questions. Leave a reference to where the framework templates are stored (Confluence, Notion, etc.).');
  return slide;
}

// ---------------------------------------------------------------------------
// Main: assemble and save
// ---------------------------------------------------------------------------
async function main() {
  const prs = new pptxgen();
  prs.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

  prs.title   = 'Del PRFAQ al Sprint: Jerarquía de Artefactos de Producto';
  prs.subject = 'Product Management Framework – Xylem';
  prs.author  = 'Product Team';

  slide1(prs);
  slide2(prs);
  slide3(prs);
  slide4(prs);
  slide5(prs);
  slide6(prs);
  slide7(prs);
  slide8(prs);
  slide9(prs);

  const outputFile = 'product_artifacts_framework_xylem';
  await prs.writeFile({ fileName: `${outputFile}.pptx` });
  console.log(`✅  Saved: ${outputFile}.pptx`);
}

main().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});