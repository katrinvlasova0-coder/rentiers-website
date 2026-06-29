import type { ArticleRequest } from './prompts/types';
import { getInternalLinks } from './queue';
import type { UnsplashImage } from './images';

function repeatParagraph(keyword: string, index: number): string {
  return `Die **${keyword}**-Strategie gewinnt 2026 an Bedeutung, weil europäische Sparkonten real oft unter der Inflation liegen. Laut Daten der Deutschen Bundesbank lag die durchschnittliche Inflation in Deutschland 2025 bei rund 2,4 % — während Tagesgeldzinsen häufig unter 2 % bleiben. Rentiers Pro bietet als Technologieplattform Zugang zu Bankeinlagen in Schwellenländern mit 12–20 % p.a. brutto; nach 25 % Servicegebühr entspricht das einer Nettorendite von Bankrate × 0,75. Absatz ${index + 1} vertieft Währungsrisiken, Einlagengarantien und steuerliche Meldepflichten für deutsche Anleger.`;
}

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

  return items
    .map((item) => `### ${item.q}\n\n${item.a}`)
    .join('\n\n');
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

  const faqDe = faqs
    .map((f) => `  - question: "${f.q}"\n    answer: "${f.a}"`)
    .join('\n');

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

export function generateMockArticle(
  req: ArticleRequest,
  images: UnsplashImage[],
): string {
  const author = req.author ?? { name: 'Dr. Stefan Kaufmann', role: 'Finanzanalyst, Rentiers Pro' };
  const cover = images[0]?.url.replace('w=800', 'w=1200') ?? images[0]?.url ?? '';
  const img1 = images[0] ?? { url: '', altText: req.keywordDe };
  const img2 = images[1] ?? img1;
  const img3 = images[2] ?? img1;
  const internalLinks = getInternalLinks(req.slug, 3);

  const descriptionDe = `${req.keywordDe}: Strategie, Renditen und Risiken 2026. Jetzt vergleichen und informiert starten.`;
  const descriptionEn = `${req.keywordEn}: strategy, returns and risks in 2026. Compare now and start informed.`;

  const minParagraphs = Math.max(18, Math.ceil(req.targetLength / 80));
  const bodyParagraphs = Array.from({ length: minParagraphs }, (_, i) =>
    repeatParagraph(req.keywordDe, i),
  ).join('\n\n');

  const enParagraphs = Array.from({ length: minParagraphs }, (_, i) =>
    repeatParagraph(req.keywordEn, i).replace(/Deutsche Bundesbank/g, 'Bundesbank'),
  ).join('\n\n');

  const linkBlock = internalLinks
    .map((l) => `- Mehr zu [${l.text}](/blog/${l.slug})`)
    .join('\n');

  return `---
title: "${req.titleDe}"
titleEn: "${req.titleEn}"
description: "${descriptionDe}"
descriptionEn: "${descriptionEn}"
datePublished: "${req.plannedDate}"
dateModified: "${req.plannedDate}"
author:
  name: "${author.name}"
  role: "${author.role}"
category: "${req.category}"
readTime: "12 min"
coverImage: "${cover}"
featured: false
tags: ["${req.keywordDe}", "${req.cluster}", "Rentiers", "2026"]
${buildFrontmatterFaq(req)}
---

**${req.keywordDe}** bezeichnet die Strategie, Kapital in Banken mit höheren Zinssätzen anzulegen als im Heimatmarkt. Laut Schätzungen des IWF (World Economic Outlook, 2026) bleiben die Zinsdifferenzen zwischen EU und Schwellenländern signifikant — für Anleger entsteht damit eine strukturelle Chance auf 12–20 % p.a. brutto über Rentiers Pro.

**Auf einen Blick:**
- Sparkonto DE: oft unter 2 % p.a. real nach Inflation
- Einlagenarbitrage EM: 12–20 % p.a. brutto möglich
- Netto nach Rentiers-Gebühr (25 %): Bankrate × 0,75

![${img1.altText} ${req.keywordDe}](${img1.url})

## Was ist ${req.keywordDe}?

${req.keywordDe} ist die gezielte Nutzung internationaler Zinsdifferenzen. Rentiers Pro ist eine Technologieplattform — kein Bank, kein Broker — und platziert Einlagen bei Partnerbanken in Georgien, Armenien, Israel, Serbien, Türkei und weiteren Märkten.

| Land | Zinssatz p.a. | Einlagengarantie | Währung |
|------|---------------|------------------|---------|
| Georgien | 10–14% | 15.000 GEL | GEL |
| Armenien | 8–12% | 16 Mio. AMD | AMD |
| Israel | 4–6% | ILS-Garantie | ILS |

## Warum ${req.keywordDe} 2026 relevant ist

${bodyParagraphs}

![${img2.altText} Prozess ${req.keywordDe}](${img2.url})

## Wie funktioniert ${req.keywordDe} in 5 Schritten?

1. **Registrierung** — Konto bei Rentiers Pro eröffnen (online, ca. 5 Minuten)
2. **Portfolio wählen** — Conservative (~10%), Balanced (~14%), Growth (~17%)
3. **Kapital transferieren** — SEPA-Überweisung auf Ihr Rentiers-Konto
4. **Einlage platzieren** — automatische Platzierung bei Partnerbanken
5. **Zinsen erhalten** — monatlich, quartalsweise oder jährlich
6. **Reporting** — Dashboard und steuerrelevante Unterlagen
7. **Wiederanlage** — Zinsen reinvestieren oder auszahlen

## Risiken und was Sie beachten müssen

Währungsrisiko ohne Hedging, abweichende Einlagengarantien (nicht EU-EDIS, nicht pauschal €100.000), politisches und regulatorisches Risiko in EM-Ländern sowie steuerliche Meldepflichten in Deutschland.

Externe Quellen: [Nationalbank Georgiens](https://nbg.gov.ge), [IMF WEO](https://www.imf.org/en/Publications/WEO), [Bundesbank](https://www.bundesbank.de/de/statistiken/preise).

## Interne Vertiefung

${linkBlock}

![${img3.altText} Fazit ${req.keywordDe}](${img3.url})

## Fazit: ${req.keywordDe} sinnvoll nutzen

${req.keywordDe} kann die Kaufkraftlücke gegenüber Sparkonten schließen — bei klarer Risikokenntnis. Start ab €5.000 bei [Rentiers Pro](https://rentierspro.com).

*Dieser Artikel dient ausschließlich Informationszwecken und stellt keine Anlageberatung dar. Alle Renditeangaben sind Bruttowerte vor Abzug der Rentiers-Servicegebühr (25%) und lokaler Steuern. Vergangene Renditen garantieren keine zukünftigen Ergebnisse. Einlagengarantien gelten gemäß lokalem Recht des jeweiligen Landes. Stand: ${req.plannedDate}.*

## Häufige Fragen zu ${req.keywordDe}

${buildFaqBlock(req, 'de')}

---en---

**${req.keywordEn}** means placing capital in banks offering higher rates than your home market. According to IMF estimates (World Economic Outlook, 2026), rate gaps between the EU and emerging markets remain significant — offering 12–20% p.a. gross via Rentiers Pro.

![${img1.altText} ${req.keywordEn}](${img1.url})

## What is ${req.keywordEn}?

${req.keywordEn} exploits international interest-rate differentials. Rentiers Pro is a technology platform — not a bank or broker.

| Country | Rate p.a. | Deposit guarantee | Currency |
|---------|-----------|-------------------|----------|
| Georgia | 10–14% | 15,000 GEL | GEL |
| Armenia | 8–12% | 16M AMD | AMD |
| Israel | 4–6% | ILS guarantee | ILS |

## Why ${req.keywordEn} matters in 2026

${enParagraphs}

## How ${req.keywordEn} works in 5 steps

1. **Register** — open a Rentiers Pro account online
2. **Choose portfolio** — Conservative, Balanced, or Growth
3. **Transfer capital** — SEPA payment to your Rentiers account
4. **Place deposit** — automatic placement at partner banks
5. **Receive interest** — monthly, quarterly, or annually
6. **Reporting** — dashboard and tax-relevant documents
7. **Reinvest** — compound or withdraw interest

## Risks to consider

Currency risk without hedging, non-EU deposit guarantees, political/regulatory risk, and German tax reporting obligations.

Sources: [National Bank of Georgia](https://nbg.gov.ge), [IMF WEO](https://www.imf.org/en/Publications/WEO), [Bundesbank](https://www.bundesbank.de/de/statistiken/preise).

## Conclusion

${req.keywordEn} can close the purchasing-power gap versus savings accounts — with clear risk awareness. From €5,000 at Rentiers Pro.

*This article is for information only and does not constitute investment advice. All returns are gross before Rentiers fee (25%) and local taxes. Past returns do not guarantee future results. Deposit guarantees apply under local law. As of ${req.plannedDate}.*

## Frequently asked questions about ${req.keywordEn}

${buildFaqBlock(req, 'en')}
`;
}
