import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { validateArticle } from './validator';
import { publishArticle } from './publisher';
import { addArticleToSitemap } from './sitemap';
import { ensureRobotsTxt } from './robots';
import { fetchUnsplashImages } from './images';
import { getInternalLinks } from './queue';
import type { ArticleRequest } from './prompts/types';
import { SAFE_TEMPLATES, type SafeTemplate } from './safe-fallback-templates';

export { SAFE_TEMPLATES };

const DISCLAIMER_DE =
  '*Dieser Artikel dient ausschließlich Bildungszwecken. Das Material trägt ausschließlich Bildungscharakter und stellt keine Anlageberatung, keine Steuerberatung und keine Aufforderung zum Erwerb eines Produkts dar. Angaben sind stichtagsbezogen und können sich ändern. Primärquellen der zuständigen Aufsicht bleiben maßgeblich.*';

const DISCLAIMER_EN =
  '*This article is for educational purposes only. The material is informational in character and is not investment advice, tax advice, or a solicitation to buy a product. Figures are as-of a stated date and can change. Primary sources from the competent supervisor remain decisive.*';

const DE_FRAMES = [
  'Wer {kw} einordnen will, beginnt bei der Rechts- und Methodenquelle, nicht bei Werbetexten.',
  'Ein zweiter Blick gilt Zuständigkeit, Stichtag und dem konkreten Rechtsträger im Vertrag.',
  'Historisch entstand Verwirrung, weil Markennamen und gesetzliche Institute vermischt wurden.',
  'In der betrieblichen Praxis zählen schriftliche Nachweise mehr als mündliche Zusagen einer Hotline.',
  'Grenzüberschreitend ändert sich oft die zuständige Stelle, obwohl die Website optisch gleich bleibt.',
  'Ein häufiger Fehler ist, ein einzelnes Schlagwort als vollständige Rechtsfolge zu lesen.',
  'Quellenarbeit zu {kw} bedeutet: Richtlinie oder Gesetz, nationales Merkblatt, dann erst Sekundärartikel.',
  'Für die Dokumentation reicht ein Screenshot selten; Vertrag, Informationsbogen und Datum gehören zusammen.',
];

const EN_FRAMES = [
  'Anyone mapping {kw} should start with the legal or methodology source, not with marketing copy.',
  'A second look concerns competence, the as-of date and the specific legal entity in the contract.',
  'Historically, confusion grew because brand names were mixed with statutory institutions.',
  'In operations, written evidence outweighs oral assurances from a call centre.',
  'Cross-border, the competent body often changes even when the website looks the same.',
  'A frequent error is to treat a single slogan as a complete legal consequence.',
  'Source work on {kw} means: directive or statute, national information sheet, and only then secondary articles.',
  'Documentation rarely stops at a screenshot; contract, information sheet and date belong together.',
];

const DE_EXTRAS = [
  'Leser, die eine Einordnung vorbereiten, legen zuerst eine Akte mit drei Registerblättern an: Rechtsgrundlage, Vertragspartner, offene Fragen. Jedes Blatt trägt denselben Stichtag. So bleibt nachvollziehbar, welche Fassung galt, wenn später ein Merkblatt aktualisiert wird. Mündliche Hotline-Auskünfte kommen nur als Gesprächsnotiz dazu, nie als Ersatz für den amtlichen Text. Wer intern übergibt, übergibt die Akte, nicht einen Chatverlauf.',
  'Eine zweite Arbeitshilfe ist die Trennung von Marke, Rechtsträger und Produktname. Dieselbe Oberfläche kann zu einer anderen Gesellschaft gehören als im Vorjahr. LEI, Handelsregisternummer und der genaue Name im Kontovertrag sind die belastbaren Felder. Fehlt eines davon, ist die Recherche unvollständig, unabhängig davon, wie überzeugend die Website wirkt.',
  'Drittens lohnt ein Blick auf Sprache und Rechtsordnung. Eine deutsche Oberfläche ändert nicht automatisch deutsches Aufsichtsrecht. Umgekehrt macht englische Korrespondenz ein Institut nicht zu einem Drittstaatenfall. Zuständigkeit folgt dem beaufsichtigten Unternehmen und dem anwendbaren Gesetz, nicht dem Browser-Übersetzer.',
  'Viertens sollten Zahlen immer mit Einheit, Währung und Stichtag notiert werden. Ein Limit ohne Währung, eine Frist ohne Kalendertag oder eine Quote ohne Nenner sind für die Akte wertlos. Wo die Quelle nur eine Rundung nennt, gehört das Wort „rund“ ausdrücklich in die Notiz, damit niemand später eine Scheingenauigkeit unterstellt.',
  'Fünftens gehört die Unterscheidung zwischen Pflichttext und Werbung in jede Ablage. Pflichttexte sind Informationsbögen, Vertragsbedingungen und aufsichtliche Hinweise. Werbung sind Landingpages, Newsletter und App-Push. Widersprechen sie einander, gilt der einbezogene Vertragstext — und die Abweichung wird als offene Frage markiert.',
  'Sechstens hilft ein Vier-Augen-Prinzip in Unternehmen: eine Person beschafft die Quelle, eine zweite prüft, ob der Rechtsträger im Dokument mit dem Kontovertrag identisch ist. Diese fünf Minuten verhindern teure Fehlzuordnungen, besonders bei Gruppen mit vielen Marken.',
  'Siebtens ist die Archivierung kein Selbstzweck. Auditoren, Steuerberater und künftige Geschäftsführer brauchen denselben Stand. Deshalb wird die Datei versioniert: Datum im Dateinamen, keine unbenannten Kopien auf dem Schreibtisch. PDF vor Screenshot, weil Metadaten und Seitenzahl zitierbar bleiben.',
  'Achtens sollte jede Zusammenfassung in der Akte eine klare Grenze ziehen: was feststeht, was Vermutung ist, was noch bei der Aufsicht nachgefragt wird. Sätze wie „angeblich“ oder „man sagt“ haben in einer Entscheidungsvorlage nichts verloren. Entweder steht die Fundstelle, oder die Frage bleibt offen.',
  'Neuntens gehört der Kalender in die Akte: wann wurde das Dokument erstellt, wann gelesen, wann an den Steuerberater weitergegeben. Ohne diese drei Daten entsteht später Streit darüber, ob eine Änderung der Aufsichtspraxis schon bekannt sein musste. Ein einfaches Deckblatt mit drei Datumsfeldern reicht.',
  'Zehntens sollten Leser externe Links nur als Wegweiser behandeln, nicht als beglaubigte Abschrift. Behörden ändern URLs, PDFs und FAQ-Texte. Deshalb speichert man die heruntergeladene Fassung, nicht bloß den Hyperlink. Wenn die Behörde eine Konsultation ersetzt, bleibt die alte Datei als historischer Stand erkennbar.',
  'Elftens lohnt eine kurze Gegencheck-Frage: welche Annahme würde den Schluss umkehren? Fehlt der Rechtsträger, die Währung oder der Stichtag, ist die Annahme zu schwach für eine Entscheidung. Dann wird nachgefasst, statt die Lücke mit Gewohnheit zu füllen. Diese Disziplin schützt vor Scheinsicherheit.',
  'Zwölftens ist Demut gegenüber Spezialfragen sinnvoll. Steuerliche Qualifikation, insolvenzrechtliche Rangfolge und aufsichtliche Meldewege sind eigene Professionen. Ein Bildungsartikel kann Begriffe klären und auf Primärquellen zeigen; er ersetzt weder den Beratervertrag noch den Bescheid einer Behörde. Genau diese Grenze hält den Text rechtssicher lesbar.',
];

const EN_EXTRAS = [
  'Readers preparing a briefing should open a file with three tabs: legal basis, contracting party, open questions. Each tab carries the same as-of date. That shows which version applied if an information sheet is later updated. Call-centre remarks enter only as notes, never as a substitute for the official text. Handovers pass the file, not a chat log.',
  'A second aid is to separate brand, legal entity and product name. The same interface may belong to a different company than last year. LEI, registry number and the exact name in the account contract are the reliable fields. If one is missing, the research is incomplete no matter how polished the website looks.',
  'Third, language does not equal legal regime. A German interface does not automatically mean German supervisory law. English correspondence does not turn an institution into a third-country case. Competence follows the supervised entity and the applicable statute, not the browser translator.',
  'Fourth, figures should always be stored with unit, currency and as-of date. A cap without a currency, a deadline without a calendar day or a ratio without a denominator is useless in the file. Where the source only gives a rounded figure, the word “about” belongs in the note so nobody later infers false precision.',
  'Fifth, mandatory text and marketing belong in different folders. Mandatory texts are information sheets, terms and supervisory notices. Marketing is landing pages, newsletters and app pushes. If they conflict, the incorporated contract prevails — and the mismatch is flagged as an open question.',
  'Sixth, a four-eyes rule helps inside firms: one person fetches the source, a second checks that the legal entity in the document matches the account contract. Those few minutes prevent expensive mis-attribution, especially in groups with many brands.',
  'Seventh, archiving is not decoration. Auditors, tax advisers and future managers need the same snapshot. Version the file: date in the filename, no unnamed desktop copies. Prefer PDF over screenshots because metadata and page numbers remain citable.',
  'Eighth, every summary in the file should draw a line: what is established, what is assumption, what still needs a question to the supervisor. Phrases such as “supposedly” have no place in a decision memo. Either there is a citation, or the question stays open.',
  'Ninth, put a calendar on the file: when the document was issued, when it was read, when it was sent to the tax adviser. Without those three dates, later disputes arise over whether a change in supervisory practice should already have been known. A one-page cover with three date fields is enough.',
  'Tenth, treat external links as signposts, not certified copies. Authorities change URLs, PDFs and FAQ wording. Save the downloaded file, not only the hyperlink. If a consultation paper is replaced, the old file remains recognisable as a historical snapshot.',
  'Eleventh, run a short reversal check: which missing assumption would overturn the conclusion? If legal entity, currency or as-of date is missing, the assumption is too weak for a decision. Follow up instead of filling the gap with habit. That discipline prevents false certainty.',
  'Twelfth, stay humble on specialist questions. Tax characterisation, insolvency ranking and supervisory reporting channels are separate professions. An educational article can clarify terms and point to primary sources; it does not replace an advisory contract or an administrative decision. That boundary keeps the text legally readable.',
];

const DE_WORKFLOW = [
  'Bevor eine Entscheidung vorbereitet wird, sammelt man zuerst nur Dokumente: Kontovertrag, Informationsbogen, Registerauszug, letzte Aufsichtsmeldung. Erst danach schreibt man drei Sätze in eigenen Worten. Wer mit der Meinung beginnt und die Quelle nachschiebt, verdreht die Reihenfolge und erzeugt Bestätigungsfehler. Der Ordner trägt das Datum im Namen, damit niemand eine alte Fassung als aktuell weiterreicht.',
  'Im zweiten Schritt markiert man Widersprüche farblich: Vertrag gegen Website, App gegen PDF, Merkblatt gegen Newsletter. Jeder Widerspruch wird eine nummerierte Frage. Fragen ohne Adressat (Aufsicht, Bank, Steuerberater) bleiben unerledigt und dürfen nicht als geklärt gelten. Diese Liste ist die eigentliche Arbeit; der Fließtext der Vorlage ist nur die Zusammenfassung.',
  'Im dritten Schritt wird bewusst weggelassen, was nicht belegt ist. Fehlende Limits, unklare Währungen und undatierte Screenshots fließen nicht in die Schlussfolgerung ein. Stattdessen steht dort ein Satz: „Nicht belegt, Nachfrage offen.“ Genau dieser Satz verhindert, dass Zeitdruck eine Lücke in eine Scheintatsache verwandelt. Nach der Rückmeldung wird die Akte aktualisiert, nicht überschrieben.',
  'Zum Schluss datiert man die Akte und nennt die nächste Prüfgelegenheit: Quartalsende, Vertragsverlängerung oder eine angekündigte Gesetzesänderung. Ohne nächsten Termin versandet die Sorgfalt. Ein Kalendereintrag mit Link auf den Ordner genügt. So bleibt die Einordnung ein Prozess, kein einmaliger Aufsatz, und neue Merkblätter werden nicht übersehen.',
];

const EN_WORKFLOW = [
  'Before a decision is drafted, collect documents only: account contract, information sheet, registry extract, latest supervisory notice. Only then write three sentences in your own words. Starting with the opinion and fetching the source afterwards reverses the order and creates confirmation bias. The folder name includes the date so nobody forwards an old version as current.',
  'Second, mark contradictions in colour: contract versus website, app versus PDF, information sheet versus newsletter. Each contradiction becomes a numbered question. Questions without an addressee (supervisor, bank, tax adviser) stay open and must not be treated as settled. That list is the real work; the memo prose is only the summary.',
  'Third, omit what is not evidenced. Missing caps, unclear currencies and undated screenshots do not enter the conclusion. Instead the file records: “Not evidenced, follow-up open.” That sentence stops time pressure from turning a gap into a fake fact. After the reply, the file is updated, not silently overwritten.',
  'Finally, date the file and name the next review: quarter-end, contract renewal or an announced legal change. Without a next date, diligence fades. A calendar entry with a link to the folder is enough. The briefing stays a process, not a one-off essay, and new information sheets are less likely to be missed.',
];

const DE_TAILS = [
  'Leser notieren die Fundstelle mit Paragraph oder Artikelnr. und bewahren sie neben dem Kontovertrag auf. So bleibt nachvollziehbar, welche Fassung zum Stichtag galt. Änderungen der Aufsichtspraxis werden später leichter erkannt.',
  'Eine interne Checkliste mit drei Feldern — Quelle, Datum, offene Frage — verhindert, dass Gesprächsnotizen die Akte ersetzen. Offene Fragen gehören an die zuständige Stelle, nicht in Foren.',
  'Vergleiche zwischen Ländern sind nur hilfreich, wenn Währung, Limitlogik und Auszahlungsverfahren getrennt bleiben. Ein Tabellenwert ohne Fußnote zur Rechtsgrundlage ist unvollständig.',
  'Marketingseiten verkürzen Sachverhalte. Wer Entscheidungen vorbereitet, liest das amtliche Merkblatt und prüft, ob der Vertrag denselben Rechtsträger nennt.',
  'Wiederholte Begriffe in Werbemails ändern die Rechtslage nicht. Maßgeblich bleibt der Text, den Gesetzgeber, Aufsicht oder Sicherungseinrichtung veröffentlicht haben.',
  'Bei Widersprüchen zwischen Website, App und PDF-Anhang gilt der vertraglich einbezogene Text. Das Datum des PDFs sollte in der eigenen Ablage stehen.',
  'Schulungen im Unternehmen sollten Beispiele aus der eigenen Kontostruktur verwenden, nicht generische Folien ohne Rechtsträger. Sonst bleibt die Einordnung abstrakt.',
  'Archivierung für Auditoren und Steuerberater braucht denselben Datensatz. Getrennte Excel-Dateien mit abweichenden Stichtagen erzeugen später Erklärungsbedarf.',
];

const EN_TAILS = [
  'Readers should record the citation with article or section number and keep it next to the account contract. That shows which version applied on the as-of date. Later changes in supervisory practice are easier to spot.',
  'An internal checklist with three fields — source, date, open question — stops call notes from replacing the file. Open questions belong with the competent body, not on forums.',
  'Cross-country comparisons help only if currency, cap logic and payout process stay separate. A table cell without a legal-basis footnote is incomplete.',
  'Marketing pages compress facts. Anyone preparing a decision should read the official sheet and check that the contract names the same legal entity.',
  'Repeated slogans in promotional emails do not change the law. What matters is the text published by the legislature, the supervisor or the scheme.',
  'Where website, app and PDF annex disagree, the contractually incorporated text prevails. The PDF date should sit in the local archive.',
  'Internal training should use the firm’s own account structure, not generic slides without a legal entity. Otherwise the briefing stays abstract.',
  'Auditors and tax advisers need the same data set. Separate spreadsheets with different as-of dates create later explanation work.',
];

export interface FallbackPublishResult {
  published: boolean;
  skipped: boolean;
  slug?: string;
  reason: string;
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? '');
}

function utcDate(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function dayOfYearUtc(d = new Date()): number {
  const start = Date.UTC(d.getUTCFullYear(), 0, 0);
  return Math.floor((d.getTime() - start) / 86400000);
}

function repoRootFromContentDir(contentDir: string): string {
  return path.resolve(contentDir, '../..');
}

function getContentDir(): string {
  return path.resolve(process.env.CONTENT_DIR || '../content/blog');
}

export function hasUncommittedBlogMdx(contentDir = getContentDir()): boolean {
  const root = repoRootFromContentDir(contentDir);
  try {
    const out = execSync('git status --porcelain -- content/blog', {
      cwd: root,
      encoding: 'utf8',
    });
    return out.split('\n').some((line) => /\.mdx\s*$/.test(line.trim()) || line.includes('.mdx'));
  } catch {
    return false;
  }
}

export function existingFallbackSlugForDate(
  date: string,
  contentDir = getContentDir(),
): string | null {
  if (!fs.existsSync(contentDir)) return null;
  const found = fs
    .readdirSync(contentDir)
    .find((file) => file.startsWith('fallback-') && file.endsWith(`-${date}.mdx`));
  return found ? found.replace(/\.mdx$/, '') : null;
}

export function selectTemplate(date: string): SafeTemplate {
  const [year, month, day] = date.split('-').map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  const index = dayOfYearUtc(utc) % SAFE_TEMPLATES.length;
  return SAFE_TEMPLATES[index];
}

function paragraph(frame: string, fact: string, tail: string, vars: Record<string, string>): string {
  return `${fill(frame, vars)} ${fact} ${fill(tail, vars)}`;
}

function buildBody(
  template: SafeTemplate,
  lang: 'de' | 'en',
  asOf: string,
  images: Array<{ url: string; alt: string }>,
  links: Array<{ slug: string; text: string }>,
): string {
  const kw = lang === 'de' ? template.keywordDe : template.keywordEn;
  const frames = lang === 'de' ? DE_FRAMES : EN_FRAMES;
  const tails = lang === 'de' ? DE_TAILS : EN_TAILS;
  const facts = lang === 'de' ? template.factsDe : template.factsEn;
  const headings = lang === 'de' ? template.headingsDe : template.headingsEn;
  const list = lang === 'de' ? template.listDe : template.listEn;
  const headers = lang === 'de' ? template.tableHeadersDe : template.tableHeadersEn;
  const extras = lang === 'de' ? DE_EXTRAS : EN_EXTRAS;
  const vars = { kw, asOf };
  const asOfLabel =
    lang === 'de' ? `Stand der Einordnung: ${asOf}` : `As-of date for this briefing: ${asOf}`;

  const lead =
    lang === 'de'
      ? `${kw} ist ein Bildungsgegenstand, kein Produktversprechen. ${asOfLabel}. Dieser Text erklärt Begriffe, Zuständigkeiten und typische Dokumente, damit Leser Primärquellen selbst prüfen können. Rentiers tritt hier als Redaktion auf, nicht als Ersatz für Aufsicht, Steuerberatung oder den Kontovertrag. Ziel ist eine nachvollziehbare Akte: Quelle, Stichtag, Rechtsträger. Wo Belege fehlen, bleibt die Frage offen statt durch Gewohnheit geschlossen. Zahlen ohne Einheit, Währung oder Datum werden in diesem Text bewusst nicht als Entscheidungshilfe verwendet. So bleibt der Abstand zwischen Bildungstext und individueller Lage sichtbar. Diese Grenze schützt Leser vor falscher Sicherheit.`
      : `${kw} is an educational topic, not a product promise. ${asOfLabel}. This text explains terms, competence and typical documents so readers can check primary sources themselves. Rentiers appears here as an editorial desk, not as a substitute for a supervisor, a tax adviser or the account contract. The aim is a traceable file: source, as-of date, legal entity. Where evidence is missing, the question stays open instead of being closed by habit.`;

  const p = (index: number) =>
    paragraph(frames[index], facts[index], tails[index], vars);

  const img0 = images[0]
    ? `\n\n![${images[0].alt}](${images[0].url})\n`
    : '\n';
  const img1 = images[1]
    ? `\n\n![${images[1].alt}](${images[1].url})\n`
    : '\n';

  const numbered = list.map((item, i) => `${i + 1}. ${item}`).join('\n');
  const table = [
    `| ${headers[0]} | ${headers[1]} | ${headers[2]} |`,
    '|---|---|---|',
    ...template.tableRows.map((row) => `| ${row[0]} | ${row[1]} | ${row[2]} |`),
  ].join('\n');

  const moreHeading =
    lang === 'de' ? 'Weiterlesen im Investor Hub' : 'Further reading in Investor Hub';
  const linkLines = links
    .slice(0, 4)
    .map((link) => `- [${link.text}](/blog/${link.slug}/)`)
    .join('\n');

  return [
    lead,
    img0,
    `## ${headings[0]}`,
    '',
    p(0),
    '',
    p(1),
    '',
    extras[0],
    '',
    extras[1],
    '',
    `## ${headings[1]}`,
    '',
    p(2),
    '',
    p(3),
    '',
    extras[2],
    '',
    extras[3],
    '',
    `## ${headings[2]}`,
    '',
    lang === 'de'
      ? `Die folgende nummerierte Liste ist eine Arbeitshilfe zu ${kw}, keine Checkliste mit Rechtswirkung.`
      : `The numbered list below is a working aid on ${kw}, not a legally binding checklist.`,
    '',
    numbered,
    '',
    `## ${headings[3]}`,
    '',
    lang === 'de'
      ? `Die Tabelle verdichtet ${kw} auf drei Vergleichsebenen. Sie ersetzt kein amtliches Merkblatt.`
      : `The table compresses ${kw} into three comparison rows. It does not replace an official information sheet.`,
    '',
    table,
    img1,
    `## ${headings[4]}`,
    '',
    p(4),
    '',
    p(5),
    '',
    extras[4],
    '',
    extras[5],
    '',
    `## ${headings[5]}`,
    '',
    p(6),
    '',
    p(7),
    '',
    extras[6],
    '',
    extras[7],
    '',
    extras[8],
    '',
    extras[9],
    '',
    extras[10],
    '',
    extras[11],
    '',
    lang === 'de' ? '## Arbeitsablauf für die eigene Akte' : '## A working file workflow',
    '',
    (lang === 'de' ? DE_WORKFLOW : EN_WORKFLOW).join('\n\n'),
    '',
    `## ${moreHeading}`,
    '',
    linkLines,
    '',
    lang === 'de'
      ? `Dieser Bildungsstand zu „${template.titleDe}“ gilt für ${asOf} und wird nicht als dauerhafte Rechtsauskunft verstanden. Wer handelt, prüft die zum Handlungstag aktuelle Primärquelle der zuständigen Stelle und legt den Ausdruck zur Akte. Abweichungen zwischen dieser Übersicht und dem amtlichen Text sind zugunsten des amtlichen Textes zu lösen. Eine spätere Fassung ersetzt diese Notiz nur, wenn Datum und Quelle erneut dokumentiert sind.`
      : `This educational snapshot of “${template.titleEn}” is for ${asOf} and is not standing legal advice. Anyone acting should check the primary source from the competent body as of the action date and file a copy. Where this overview and the official text differ, the official text prevails. A later version replaces this note only if date and source are documented again.`,
    '',
    lang === 'de' ? DISCLAIMER_DE : DISCLAIMER_EN,
    '',
  ].join('\n');
}

function buildFaqYaml(
  items: Array<{ question: string; answer: string }>,
): string {
  return items
    .map(
      (item) =>
        `  - question: ${yamlString(item.question)}\n    answer: ${yamlString(item.answer)}`,
    )
    .join('\n');
}

export function buildSafeFallbackArticle(
  template: SafeTemplate,
  date: string,
  options: {
    images?: Array<{ url: string; alt: string }>;
    links?: Array<{ slug: string; text: string }>;
  } = {},
): { slug: string; content: string; request: ArticleRequest } {
  const slug = `fallback-${template.id}-${date}`;
  const images = options.images ?? [
    {
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
      alt: `${template.keywordDe} — Dokumente und Übersicht`,
    },
    {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
      alt: `${template.keywordDe} — Planung und Prüfung`,
    },
  ];
  const links =
    options.links ??
    getInternalLinks(slug, 4).map((link) => ({ slug: link.slug, text: link.text }));

  const deBody = buildBody(template, 'de', date, images, links);
  const enBody = buildBody(template, 'en', date, images, links);

  const content = `---
title: ${yamlString(template.titleDe)}
titleEn: ${yamlString(template.titleEn)}
description: ${yamlString(template.descriptionDe)}
descriptionEn: ${yamlString(template.descriptionEn)}
datePublished: ${yamlString(date)}
dateModified: ${yamlString(date)}
author:
  name: "Rentiers Redaktion"
  role: "Redaktion"
category: ${yamlString(template.category)}
readTime: "8 min"
coverImage: ${yamlString(images[0].url)}
featured: false
tags: ${JSON.stringify([template.keywordDe, template.category, 'Finanzbildung', '2026'])}
tagsEn: ${JSON.stringify([template.keywordEn, template.category, 'financial literacy', '2026'])}
faq:
${buildFaqYaml(template.faqDe)}
faqEn:
${buildFaqYaml(template.faqEn)}
---

${deBody}
---en---
${enBody}
`;

  const request: ArticleRequest = {
    id: 0,
    cluster: template.cluster,
    slug,
    titleDe: template.titleDe,
    titleEn: template.titleEn,
    keywordDe: template.keywordDe,
    searchVolDe: 0,
    kd: 0,
    keywordEn: template.keywordEn,
    searchVolEn: 0,
    lsiKeywords: [template.keywordDe, template.keywordEn],
    format: 'Explainer',
    targetLength: 1500,
    taSegments: ['Bildungsleser'],
    priority: 'medium',
    plannedDate: date,
    language: 'de-en',
    category: template.category,
    status: 'fallback',
    unsplashQuery: template.unsplashQuery,
    author: { name: 'Rentiers Redaktion', role: 'Redaktion' },
  };

  return { slug, content, request };
}

export function assertSafeFallbackValid(content: string, keywordDe: string): void {
  const result = validateArticle(content, keywordDe, 1500);
  if (!result.valid) {
    throw new Error(
      `Safe fallback failed validation:\n${result.errors.join('\n')}\nWarnings:\n${result.warnings.join('\n')}`,
    );
  }
}

export async function publishSafeFallback(options: {
  reason: string;
  onlyIfMissing?: boolean;
  date?: string;
  failedSlugs?: string[];
}): Promise<FallbackPublishResult> {
  const date = options.date ?? utcDate();
  const contentDir = getContentDir();
  const reasonParts = [options.reason];
  if (options.failedSlugs?.length) {
    reasonParts.push(`failed queued slugs: ${options.failedSlugs.join(', ')}`);
  }
  const reason = reasonParts.join(' | ');

  if (options.onlyIfMissing) {
    if (hasUncommittedBlogMdx(contentDir)) {
      console.log('ℹ️ Fallback skipped: uncommitted blog MDX already present');
      return { published: false, skipped: true, reason: 'uncommitted-mdx-present' };
    }
  }

  const existing = existingFallbackSlugForDate(date, contentDir);
  if (existing) {
    console.log(`ℹ️ Fallback skipped: ${existing} already exists for ${date}`);
    return { published: false, skipped: true, slug: existing, reason: 'already-exists' };
  }

  const template = selectTemplate(date);
  const slug = `fallback-${template.id}-${date}`;
  console.log(`🛟 Publishing safe fallback: ${slug}`);
  console.log(`   Reason: ${reason}`);
  console.log(`::warning::Content factory used a safe fallback article (${slug}). ${reason}`);

  let images = (
    await fetchUnsplashImages(template.unsplashQuery, 2, { excludeSlug: slug })
  ).map((img) => ({
    url: img.url,
    alt: `${template.keywordDe} — ${img.altText}`,
  }));
  if (images.length < 2) {
    images = [
      {
        url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
        alt: `${template.keywordDe} — Dokumente und Übersicht`,
      },
      {
        url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
        alt: `${template.keywordDe} — Planung und Prüfung`,
      },
    ];
  }

  const { content, request } = buildSafeFallbackArticle(template, date, { images });
  assertSafeFallbackValid(content, request.keywordDe);

  ensureRobotsTxt();
  await publishArticle(slug, content, request, false, {
    isFallback: true,
    fallbackReason: reason,
  });
  await addArticleToSitemap(slug, date, 'medium');

  console.log(`✅ Safe fallback published: /blog/${slug}`);
  return { published: true, skipped: false, slug, reason };
}
