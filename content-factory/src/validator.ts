import { FORBIDDEN_PATTERNS } from '../config/forbidden-patterns';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    wordCountDe: number;
    wordCountEn: number;
    imageCount: number;
    tableCount: number;
    faqCount: number;
    internalLinks: number;
    externalLinks: number;
    h2Count: number;
    hasEnSection: boolean;
    keywordDensity: number;
    numberedListItems: number;
  };
}

function countTables(text: string): number {
  const lines = text.split('\n');
  let tables = 0;
  let inTable = false;

  for (const line of lines) {
    const isTableLine = line.trim().startsWith('|');
    if (isTableLine && !inTable) {
      tables++;
      inTable = true;
    } else if (!isTableLine) {
      inTable = false;
    }
  }

  return tables;
}

function countKeywordOccurrences(text: string, keyword: string): number {
  const normalized = text.toLowerCase();
  const kw = keyword.toLowerCase().trim();
  if (!kw) return 0;

  // Multi-word keyword: count phrase occurrences
  if (kw.includes(' ')) {
    const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return (normalized.match(regex) || []).length;
  }

  const words = normalized.split(/\s+/);
  return words.filter((w) => w.replace(/[^\wäöüß-]/g, '') === kw).length;
}

function extractParagraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(
      (p) =>
        p.length > 80 &&
        !p.startsWith('!') &&
        !p.startsWith('|') &&
        !p.startsWith('#') &&
        !p.startsWith('*') &&
        !p.startsWith('-'),
    );
}

function detectCopyPaste(body: string, label: string): string[] {
  const errors: string[] = [];

  if (FORBIDDEN_PATTERNS.mockAbsatzFiller.test(body)) {
    errors.push(`❌ ${label}: Mock-Kopierpaste (Absatz N vertieft) — Artikel verwerfen`);
  }

  const paragraphs = extractParagraphs(body);
  const seen = new Map<string, number>();

  for (const paragraph of paragraphs) {
    const normalized = paragraph.replace(/\s+/g, ' ').toLowerCase();
    const count = (seen.get(normalized) ?? 0) + 1;
    seen.set(normalized, count);

    if (count >= 2) {
      errors.push(
        `❌ ${label}: identischer Absatz ${count}x — "${paragraph.slice(0, 72)}…"`,
      );
      break;
    }
  }

  const repeatedOpeners = paragraphs
    .map((p) => p.slice(0, 120).replace(/\s+/g, ' '))
    .filter((opener) => opener.length >= 60);
  const openerCounts = new Map<string, number>();
  for (const opener of repeatedOpeners) {
    const count = (openerCounts.get(opener) ?? 0) + 1;
    openerCounts.set(opener, count);
    if (count >= 3) {
      errors.push(`❌ ${label}: gleicher Absatzanfang ${count}x wiederholt — Kopierpaste`);
      break;
    }
  }

  return errors;
}

export function validateArticle(
  content: string,
  keyword: string,
  minWordCount: number,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const enSplit = content.split('---en---');
  const dePart = enSplit[0] ?? '';
  const enPart = enSplit.slice(1).join('---en---');

  // Strip frontmatter from DE body for word counts
  const deBody = dePart.replace(/^---[\s\S]*?---\n/, '');
  const enBody = enPart.trim();

  if (FORBIDDEN_PATTERNS.jsxComponent.test(content)) {
    errors.push('❌ JSX-Komponenten gefunden — verboten im CMS');
  }
  if (FORBIDDEN_PATTERNS.anchorId.test(content)) {
    errors.push('❌ Anchor-IDs {#id} gefunden — verboten im CMS');
  }
  if (FORBIDDEN_PATTERNS.internalAnchorLink.test(content)) {
    errors.push('❌ Interne Anchor-Links [text](#id) gefunden — verboten');
  }
  if (FORBIDDEN_PATTERNS.scriptTag.test(content)) {
    errors.push('❌ <script> Tag gefunden — verboten im CMS');
  }
  if (FORBIDDEN_PATTERNS.h1InBody.test(deBody) || FORBIDDEN_PATTERNS.h1InBody.test(enBody)) {
    errors.push('❌ H1 (# Heading) im Artikelkörper — verboten');
  }
  if (FORBIDDEN_PATTERNS.yamlBlockTags.test(content)) {
    warnings.push('⚠️ YAML-Block-Array für tags gefunden — bitte zu Inline-Array konvertieren');
  }
  if (FORBIDDEN_PATTERNS.mockAbsatzFiller.test(content)) {
    errors.push('❌ Mock-Kopierpaste (Absatz N vertieft) im Artikel — Veröffentlichung blockiert');
  }

  errors.push(...detectCopyPaste(deBody, 'DE'));
  errors.push(...detectCopyPaste(enBody, 'EN'));

  const hasEnSection = content.includes('---en---') && enBody.length > 500;
  if (!hasEnSection) {
    errors.push('❌ Keine englische Sektion (---en---) oder zu kurz');
  }

  const wordCountDe = deBody.split(/\s+/).filter(Boolean).length;
  const wordCountEn = enBody.split(/\s+/).filter(Boolean).length;
  const imageCount = (content.match(/!\[/g) || []).length;
  const tableCount = countTables(deBody);
  const faqCount = (content.match(/^\s*-\s+question:/gm) || []).length;
  const internalLinks = (content.match(/\[([^\]]+)\]\(\/blog\//g) || []).length;
  const externalLinks = (content.match(/\[([^\]]+)\]\(https?:\/\//g) || []).length;
  const h2Count = (deBody.match(/^## /gm) || []).length;
  const numberedListItems = (deBody.match(/^\d+\.\s+/gm) || []).length;

  const keywordOccurrences = countKeywordOccurrences(deBody, keyword);
  const keywordDensity = wordCountDe > 0 ? (keywordOccurrences / wordCountDe) * 100 : 0;

  if (wordCountDe < minWordCount) {
    warnings.push(`⚠️ DE-Teil zu kurz: ${wordCountDe} Wörter (Minimum: ${minWordCount})`);
  }
  if (wordCountEn < minWordCount * 0.8) {
    warnings.push(`⚠️ EN-Teil zu kurz: ${wordCountEn} Wörter`);
  }
  if (imageCount < 2) {
    warnings.push(`⚠️ Zu wenige Bilder: ${imageCount} (Minimum: 2)`);
  }
  if (tableCount === 0) {
    warnings.push('⚠️ Keine Tabelle gefunden — mindestens 1 erforderlich');
  }
  if (faqCount < 5) {
    warnings.push(`⚠️ Zu wenige FAQ-Fragen: ${faqCount} (Minimum: 5)`);
  }
  if (internalLinks < 2) {
    warnings.push(`⚠️ Wenige interne Links: ${internalLinks} (Empfehlung: 3–5)`);
  }
  if (keywordDensity < 0.3) {
    warnings.push(`⚠️ Keyword-Dichte zu niedrig: ${keywordDensity.toFixed(2)}%`);
  }
  if (keywordDensity > 2.0) {
    warnings.push(`⚠️ Keyword-Dichte zu hoch (Keyword Stuffing): ${keywordDensity.toFixed(2)}%`);
  }
  if (h2Count < 4) {
    warnings.push(`⚠️ Zu wenige H2-Headings: ${h2Count} (Empfehlung: 5–8)`);
  }
  if (!content.includes('*Dieser Artikel dient')) {
    warnings.push('⚠️ Disclaimer fehlt');
  }
  if (numberedListItems < 5) {
    warnings.push(`⚠️ Zu wenige nummerierte Listeneinträge: ${numberedListItems} (Empfehlung: 5+)`);
  }

  // Title/description length from frontmatter
  const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const descMatch = content.match(/^description:\s*["']?(.+?)["']?\s*$/m);
  if (titleMatch) {
    const len = titleMatch[1].length;
    if (len < 50 || len > 70) {
      warnings.push(`⚠️ title Länge: ${len} Zeichen (Ziel: 55–65)`);
    }
  }
  if (descMatch) {
    const len = descMatch[1].length;
    if (len < 140 || len > 170) {
      warnings.push(`⚠️ description Länge: ${len} Zeichen (Ziel: 150–160)`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      wordCountDe,
      wordCountEn,
      imageCount,
      tableCount,
      faqCount,
      internalLinks,
      externalLinks,
      h2Count,
      hasEnSection,
      keywordDensity,
      numberedListItems,
    },
  };
}
