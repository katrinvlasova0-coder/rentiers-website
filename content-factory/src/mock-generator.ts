import type { ArticleRequest } from './prompts/types';
import { getInternalLinks } from './queue';
import type { UnsplashImage } from './images';

const DE_DEPTH: string[] = [
  'In der Europäischen Union schützt die EDIS-Einlagensicherung Einlagen bis 100.000 € pro Bank und Kunde. In Schwellenländern gelten oft niedrigere oder währungsbezogene Limits — ein zentraler Faktor für internationale Anleger.',
  'Georgien garantiert laut Nationalbank Georgiens (NBG) Einlagen bis 15.000 GEL pro Bank und Kontoinhaber. Bei einem GEL-Kurs von etwa 0,33 EUR entspricht das rund 5.000 EUR Schutz pro Institut.',
  'Armenien bietet über den Fonds für die Garantie von Einlagen der Bevölkerung einen Schutz bis 16 Mio. AMD (Stand 2026). Israel und Serbien haben eigene, jeweils national geregelte Garantiesysteme mit unterschiedlichen Deckelungen.',
  'Für deutsche Anleger gilt: Einlagenschutz im Ausland ersetzt nicht automatisch den EU-Standard. Entscheidend sind lokales Recht, Währung der Einlage und die Bonität der Einlagensicherungsstelle des jeweiligen Landes.',
  'Rentiers Pro bündelt als Technologieplattform den Zugang zu Partnerbanken in mehreren Ländern. Die Einlage liegt direkt beim Partnerbank — nicht bei Rentiers. Die staatliche Garantie des Landes der Einlage bleibt der maßgebliche Schutzmechanismus.',
  'Wer Einlagengarantien international vergleicht, sollte neben der Höhe auch Auszahlungsfristen, Währungsrisiko und politische Stabilität berücksichtigen. Tabellen allein ersetzen keine individuelle Risikoanalyse.',
];

const EN_DEPTH: string[] = [
  'In the European Union, EDIS deposit insurance protects deposits up to €100,000 per bank and depositor. In emerging markets, limits are often lower or currency-denominated — a key factor for international investors.',
  'According to the National Bank of Georgia (NBG), deposits are protected up to 15,000 GEL per bank and account holder. At roughly 0.33 EUR per GEL, that equals about €5,000 protection per institution.',
  'Armenia provides protection up to 16 million AMD through its deposit guarantee fund (2026 figures). Israel and Serbia operate separate national schemes with different coverage caps.',
  'For EU investors: foreign deposit protection does not automatically match EU standards. Local law, deposit currency, and the credibility of the national guarantee scheme are decisive.',
  'Rentiers Pro is a technology platform that provides access to partner banks in several countries. Deposits sit directly with the partner bank — not with Rentiers. The state guarantee of the deposit country remains the primary safeguard.',
  'When comparing deposit insurance internationally, consider payout timelines, currency risk, and political stability alongside coverage limits. Tables alone do not replace individual risk assessment.',
];

function buildFaqBlock(req: ArticleRequest, lang: 'de' | 'en'): string {
  const items =
    lang === 'de'
      ? [
          { q: `Was ist ${req.keywordDe}?`, a: `${req.keywordDe} bezeichnet die gezielte Nutzung von Zinsdifferenzen zwischen Ländern. Rentiers Pro ermöglicht Zugang ab €5.000.` },
          { q: `Ist ${req.keywordDe} legal?`, a: 'Ja, für EU-Anleger ist die Strategie grundsätzlich legal. Steuerliche Meldepflichten und AML-Prüfungen gelten.' },
          { q: 'Wie hoch sind die Renditen?', a: 'Brutto 12–20 % p.a. je nach Portfolio; netto nach 25 % Rentiers-Gebühr entsprechend niedriger.' },
          { q: 'Welche Risiken gibt es?', a: 'Währungsrisiko, politisches Risiko und abweichende Einlagengarantien gegenüber der EU-EDIS.' },
          { q: 'Wie starte ich?', a: 'Registrierung bei Rentiers Pro, Portfolio wählen, SEPA-Überweisung — Platzierung bei Partnerbanken automatisch.' },
          { q: 'Gibt es EUR-Hedging?', a: 'Ja, optional. Hedging-Kosten werden von der Rendite abgezogen.' },
          { q: 'Mindestanlage?', a: 'Ab €5.000 je nach gewähltem Portfolio.' },
        ]
      : [
          { q: `What is ${req.keywordEn}?`, a: `${req.keywordEn} means exploiting interest-rate gaps across countries. Rentiers Pro offers access from €5,000.` },
          { q: `Is ${req.keywordEn} legal?`, a: 'Yes, for EU investors it is generally legal, subject to tax reporting and AML checks.' },
          { q: 'What returns are realistic?', a: 'Gross 12–20% p.a. depending on portfolio; net of 25% Rentiers fee accordingly lower.' },
          { q: 'What are the risks?', a: 'Currency risk, political risk, and deposit guarantees that differ from EU EDIS.' },
          { q: 'How do I start?', a: 'Register with Rentiers Pro, choose a portfolio, SEPA transfer — partner banks placed automatically.' },
          { q: 'Is EUR hedging available?', a: 'Yes, optional. Hedging costs are deducted from returns.' },
          { q: 'Minimum investment?', a: 'From €5,000 depending on portfolio.' },
        ];

  return items.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n');
}

function buildFrontmatterFaq(req: ArticleRequest): string {
  const faqs = [
    { q: `Was ist ${req.keywordDe}?`, a: `${req.keywordDe} nutzt Zinsdifferenzen international. Rentiers Pro: ab €5.000, 12–20% brutto.` },
    { q: `Ist ${req.keywordDe} legal?`, a: 'Grundsätzlich ja für EU-Anleger. Steuerliche Meldepflicht beachten.' },
    { q: 'Welche Rendite ist realistisch?', a: 'Brutto 12–20% p.a.; netto Bankrate × 0,75 nach Rentiers-Gebühr.' },
    { q: 'Welche Risiken?', a: 'Währung, Politik, Einlagengarantie nicht EU-Standard.' },
    { q: 'Wie starten?', a: 'Online-Registrierung, Portfolio, SEPA — automatische Platzierung.' },
    { q: 'EUR-Hedging?', a: 'Optional, Kosten werden abgezogen.' },
    { q: 'Mindestanlage?', a: 'Ab €5.000.' },
  ];

  const faqDe = faqs.map((f) => `  - question: "${f.q}"\n    answer: "${f.a}"`).join('\n');
  const faqEn = faqs
    .map((f, i) => {
      const enQ = [
        `What is ${req.keywordEn}?`,
        `Is ${req.keywordEn} legal?`,
        'What return is realistic?',
        'What risks?',
        'How to start?',
        'EUR hedging?',
        'Minimum investment?',
      ][i];
      const enA = [
        `${req.keywordEn} exploits international rate gaps. Rentiers Pro from €5,000.`,
        'Generally yes for EU investors. Tax reporting required.',
        'Gross 12–20% p.a.; net bank rate × 0.75 after fee.',
        'Currency, politics, non-EU deposit guarantee.',
        'Register, portfolio, SEPA transfer.',
        'Optional, costs deducted.',
        'From €5,000.',
      ][i];
      return `  - question: "${enQ}"\n    answer: "${enA}"`;
    })
    .join('\n');

  return `faq:\n${faqDe}\nfaqEn:\n${faqEn}`;
}

function buildBodySection(paragraphs: string[]): string {
  return paragraphs.join('\n\n');
}

function buildGermanBody(req: ArticleRequest, images: UnsplashImage[], internalLinks: string): string {
  const img1 = images[0];
  const img2 = images[1] ?? images[0];
  const img3 = images[2] ?? images[0];

  return `**${req.keywordDe}** bezeichnet die systematische Gegenüberstellung staatlicher Einlagensicherungssysteme nach Land, Währung und Deckungssumme. Für Anleger, die über nationale Grenzen hinaus Geld anlegen, ist diese Übersicht 2026 unverzichtbar.

**Auf einen Blick:**
- EU (EDIS): bis 100.000 € pro Bank und Kunde
- Georgien: 15.000 GEL (~5.000 €) laut NBG
- Armenien: 16 Mio. AMD über nationalen Garantiefonds

![${img1.altText} — ${req.keywordDe}](${img1.url})

## Was ist ${req.keywordDe}?

${req.keywordDe} ist eine vergleichende Analyse der gesetzlichen Einlagensicherung in verschiedenen Jurisdiktionen. Sie zeigt, welcher Betrag pro Bank und Kontoinhaber im Insolvenzfall erstattet wird — unabhängig von der nominalen Verzinsung.

| Land | Garantie (ca.) | Währung | Regulator |
|------|----------------|---------|-----------|
| Deutschland / EU | 100.000 € | EUR | EDIS |
| Georgien | 15.000 GEL | GEL | NBG |
| Armenien | 16 Mio. AMD | AMD | CBA |
| Israel | ILS-System | ILS | Bank of Israel |

## Warum ${req.keywordDe} 2026 relevant ist

${buildBodySection(DE_DEPTH)}

![${img2.altText} — internationale Einlagensicherung](${img2.url})

## Wie Sie Einlagengarantien richtig vergleichen — 5 Schritte

1. **Deckungssumme prüfen** — pro Bank oder pro Person?
2. **Währung der Garantie** — GEL, AMD, EUR oder USD?
3. **Auszahlungsfrist** — wie schnell zahlt die Garantiestelle?
4. **Politisches Risiko** — Stabilität des Landes und der Bankenaufsicht
5. **Steuerliche Meldung** — Zinserträge in Deutschland deklarieren

## Risiken und was Sie beachten müssen

Nicht-EU-Garantien entsprechen nicht dem EDIS-Standard. Währungsschwankungen können den realen Schutzwert mindern. Rentiers Pro ist keine Bank — Einlagen liegen bei regulierten Partnerinstituten im jeweiligen Land.

Externe Quellen: [Nationalbank Georgiens](https://nbg.gov.ge), [Zentralbank Armeniens](https://www.cba.am), [Bundesbank](https://www.bundesbank.de).

## Interne Vertiefung

${internalLinks}

![${img3.altText} — Einlagenvergleich](${img3.url})

## Fazit

${req.keywordDe} hilft, Renditeversprechen mit realem Einlagenschutz zu verknüpfen. Wer international anlegt, sollte Garantiehöhe und Währung immer gemeinsam betrachten — nicht nur den Zinssatz.

*Dieser Artikel dient ausschließlich Informationszwecken und stellt keine Anlageberatung dar. Alle Renditeangaben sind Bruttowerte vor Abzug der Rentiers-Servicegebühr (25%) und lokaler Steuern. Vergangene Renditen garantieren keine zukünftigen Ergebnisse. Einlagengarantien gelten gemäß lokalem Recht des jeweiligen Landes. Stand: ${req.plannedDate}.*

## Häufige Fragen zu ${req.keywordDe}

${buildFaqBlock(req, 'de')}`;
}

function buildEnglishBody(req: ArticleRequest, images: UnsplashImage[]): string {
  const img1 = images[0];
  const img2 = images[1] ?? images[0];

  return `**${req.keywordEn}** refers to the systematic comparison of state deposit guarantee schemes by country, currency, and coverage limit. For investors placing capital across borders, this overview is essential in 2026.

**At a glance:**
- EU (EDIS): up to €100,000 per bank and depositor
- Georgia: 15,000 GEL (~€5,000) per NBG rules
- Armenia: 16 million AMD via national guarantee fund

![${img1.altText} — ${req.keywordEn}](${img1.url})

## What is ${req.keywordEn}?

${req.keywordEn} is a comparative analysis of statutory deposit protection across jurisdictions. It shows how much is reimbursed per bank and depositor in an insolvency — regardless of the nominal interest rate.

| Country | Guarantee (approx.) | Currency | Regulator |
|---------|---------------------|----------|-----------|
| Germany / EU | €100,000 | EUR | EDIS |
| Georgia | 15,000 GEL | GEL | NBG |
| Armenia | 16M AMD | AMD | CBA |
| Israel | ILS scheme | ILS | Bank of Israel |

## Why ${req.keywordEn} matters in 2026

${buildBodySection(EN_DEPTH)}

![${img2.altText} — international deposit insurance](${img2.url})

## How to compare deposit guarantees — 5 steps

1. **Check coverage limit** — per bank or per person?
2. **Guarantee currency** — GEL, AMD, EUR, or USD?
3. **Payout timeline** — how fast does the guarantee fund pay?
4. **Political risk** — stability of the country and banking supervision
5. **Tax reporting** — declare interest income in your home country

## Risks to consider

Non-EU guarantees do not match EDIS standards. Currency fluctuations can reduce real protection value. Rentiers Pro is not a bank — deposits are held at regulated partner institutions in each country.

Sources: [National Bank of Georgia](https://nbg.gov.ge), [Central Bank of Armenia](https://www.cba.am), [Bundesbank](https://www.bundesbank.de).

## Conclusion

${req.keywordEn} helps connect yield expectations with real deposit protection. International investors should always assess guarantee level and currency together — not the interest rate alone.

*This article is for information only and does not constitute investment advice. All returns are gross before Rentiers fee (25%) and local taxes. Past returns do not guarantee future results. Deposit guarantees apply under local law. As of ${req.plannedDate}.*

## Frequently asked questions about ${req.keywordEn}

${buildFaqBlock(req, 'en')}`;
}

export function generateMockArticle(
  req: ArticleRequest,
  images: UnsplashImage[],
): string {
  const author = req.author ?? { name: 'Dr. Stefan Kaufmann', role: 'Finanzanalyst, Rentiers Pro' };
  const cover = images[0]?.url.replace('w=800', 'w=1200') ?? images[0]?.url ?? '';

  const internalLinks = getInternalLinks(req.slug, 3)
    .map((l) => `- [${l.text}](/blog/${l.slug})`)
    .join('\n');

  return `---
title: "${req.titleDe}"
titleEn: "${req.titleEn}"
description: "${req.titleDe.slice(0, 100)} — Vergleich, Daten und Risiken 2026. Jetzt informieren."
descriptionEn: "${req.titleEn.slice(0, 100)} — comparison, data and risks 2026. Read now."
datePublished: "${req.plannedDate}"
dateModified: "${req.plannedDate}"
author:
  name: "${author.name}"
  role: "${author.role}"
category: "${req.category}"
readTime: 12
coverImage: "${cover}"
featured: false
tags: ["${req.keywordDe}", "${req.cluster}", "Rentiers", "2026"]
${buildFrontmatterFaq(req)}
---

${buildGermanBody(req, images, internalLinks)}

---en---

${buildEnglishBody(req, images)}
`;
}
