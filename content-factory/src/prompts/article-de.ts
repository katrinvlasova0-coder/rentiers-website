import type { ArticleRequest } from './types';
import { clusterTagDe, clusterTagEn } from '../../config/cluster-tags';

export function buildArticlePrompt(
  req: ArticleRequest,
  images: Array<{ url: string; altText: string }>,
  internalLinks: Array<{ slug: string; text: string }>,
): string {
  const imgMarkdown = images
    .map((img, i) => `Bild ${i + 1}: ![${img.altText}](${img.url})`)
    .join('\n');

  const internalLinksText = internalLinks
    .map((l) => `- [${l.text}](/blog/${l.slug})`)
    .join('\n');

  const authorName = req.author?.name ?? 'Rentiers Redaktion';
  const authorRole = req.author?.role ?? 'Redaktion';
  const coverUrl = images[0]?.url?.replace('w=800', 'w=1200') ?? '';

  return `
Schreibe einen vollständigen Bildungsartikel für den Rentiers Blog (educational only — keine Investment-Solicitation).

## ARTIKEL-PARAMETER
- **Slug:** ${req.slug}
- **Titel DE:** ${req.titleDe}
- **Titel EN:** ${req.titleEn}
- **Primärkeyword DE:** "${req.keywordDe}" (Zieldichte: 0,8–1,2%)
- **Primärkeyword EN:** "${req.keywordEn}"
- **LSI-Keywords:** ${req.lsiKeywords.join(', ')}
- **Format:** ${req.format}
- **Ziel-Wortanzahl:** ${req.targetLength} Wörter (DE-Teil)
- **Kategorie:** ${req.category}
- **Zielgruppe:** Segment ${req.taSegments.join(', ')} — ${getSegmentDesc(req.taSegments)}

## BILDER (in den Artikel einbauen, an sinnvollen Stellen)
${imgMarkdown}

## INTERNE LINKS (3–5 davon natürlich einbauen)
${internalLinksText}

## EXTERNE AUTORITATIVE QUELLEN (passend einbauen)
- BaFin: https://www.bafin.de
- Nationalbank Georgiens: https://nbg.gov.ge
- Zentralbank Armeniens: https://www.cba.am
- IMF World Economic Outlook: https://www.imf.org/en/Publications/WEO
- Bundesbank Inflationsdaten: https://www.bundesbank.de/de/statistiken/preise
- BIS Statistiken: https://www.bis.org/statistics/

## PFLICHT-INHALTE (alle müssen enthalten sein)

### 1. Frontmatter (exakt dieses Format)
\`\`\`
---
title: "${req.titleDe}"
titleEn: "${req.titleEn}"
description: "[150–160 Zeichen, Keyword '${req.keywordDe}' — OHNE Investitions-CTA]"
descriptionEn: "[150–160 chars, keyword '${req.keywordEn}' — NO invest CTA]"
datePublished: "${req.plannedDate}"
dateModified: "${req.plannedDate}"
author:
  name: "${authorName}"
  role: "${authorRole}"
category: "${req.category}"
readTime: "[X min]"
coverImage: "${coverUrl}"
featured: false
tags: ["${req.keywordDe}", "${clusterTagDe(req.cluster)}", "Finanzbildung", "2026"]
tagsEn: ["${req.keywordEn}", "${clusterTagEn(req.cluster)}", "financial literacy", "2026"]
faq:
  - question: "..."
    answer: "..."
faqEn:
  - question: "..."
    answer: "..."
---
\`\`\`

### 2. Artikelstruktur (Pflicht)
- Einleitung: Hook mit Fakt + Kernantwort in ersten 150 Wörtern (GEO!)
- Bild 1 direkt nach Einleitung
- Min. 5 H2-Überschriften
- Min. 1 Datentabelle (Vergleich oder Übersicht)
- Min. 1 nummerierte Liste (5+ Punkte)
- Bild 2 in der Mitte des Artikels
- Risiken- / Grenzen-Abschnitt (obligatorisch)
- Praktischer Prüf-/Lernabschnitt (Checkliste oder Howto) — KEIN „Jetzt bei Rentiers anlegen“
- Fazit OHNE Investitions-CTA
- Pflicht-Disclaimer am Ende DE und EN (siehe System-Prompt)
- Bild 3 optional

### 3. FAQ-Sektion (am Ende des DE-Teils, VOR ---en---)
Min. 5 Fragen — erste Frage muss die häufigste Suchanfrage zu "${req.keywordDe}" sein.
FAQ-Antworten dürfen nicht zu Rentiers-Investments auffordern.

### 4. Englische Sektion (nach ---en---)
- Vollständige Übersetzung mit gleicher Struktur
- Keyword: "${req.keywordEn}"
- British English

## VERBOTENE PATTERNS (NOCHMALS)
- ❌ {#anchor-id}
- ❌ [Abschnitt](#anchor)
- ❌ <AnyJSXComponent>
- ❌ <script>
- ❌ # H1 im Body
- ❌ YAML-Block-Arrays für tags
- ❌ Renditeversprechen für Rentiers / LUXCAR
- ❌ „Konto eröffnen“, „jetzt anlegen“, „mit Rentiers starten“
- ❌ erfundene Experten-Autoren

Schreibe jetzt den vollständigen Artikel. Beginne direkt mit den drei Bindestrichen (---) des Frontmatters.
`;
}

function getSegmentDesc(segments: string[]): string {
  const map: Record<string, string> = {
    '1': 'Masseninvestoren €5k–50k',
    '2': 'Unternehmer & Freiberufler €10k–100k',
    '3': 'Rentner 55+ €50k–250k',
    '4': 'HNWI / Family Offices €250k+',
    '5': 'Unternehmensliquidität €100k–1M',
    '6': 'Millennials post-Crypto €5k–20k',
  };
  return segments.map((s) => map[s] || s).join(', ');
}
