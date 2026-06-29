import readingTime from 'reading-time';
import type { ValidationResult } from './validator';

export interface ArticleStats {
  wordCountDe: number;
  wordCountEn: number;
  totalWords: number;
  readTimeDe: string;
  readTimeEn: string;
  keywordDensity: number;
  fleschEstimate: number;
  imageCount: number;
  tableCount: number;
  faqCount: number;
  internalLinks: number;
  externalLinks: number;
}

/** Rough readability estimate (higher = easier to read) */
function estimateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = text.split(/\s+/).filter(Boolean).length || 1;
  const syllables = words * 1.5; // rough estimate for German
  return Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words));
}

export function computeArticleStats(
  content: string,
  validation: ValidationResult,
): ArticleStats {
  const [dePart, enPart] = content.split('---en---');
  const deBody = (dePart ?? '').replace(/^---[\s\S]*?---\n/, '');
  const enBody = enPart ?? '';

  const rtDe = readingTime(deBody);
  const rtEn = readingTime(enBody);

  return {
    wordCountDe: validation.stats.wordCountDe,
    wordCountEn: validation.stats.wordCountEn,
    totalWords: validation.stats.wordCountDe + validation.stats.wordCountEn,
    readTimeDe: rtDe.text,
    readTimeEn: rtEn.text,
    keywordDensity: validation.stats.keywordDensity,
    fleschEstimate: estimateReadability(deBody),
    imageCount: validation.stats.imageCount,
    tableCount: validation.stats.tableCount,
    faqCount: validation.stats.faqCount,
    internalLinks: validation.stats.internalLinks,
    externalLinks: validation.stats.externalLinks,
  };
}

export function formatStatsLog(stats: ArticleStats): string {
  return [
    `DE: ${stats.wordCountDe} words (${stats.readTimeDe})`,
    `EN: ${stats.wordCountEn} words (${stats.readTimeEn})`,
    `Keyword density: ${stats.keywordDensity.toFixed(2)}%`,
    `Images: ${stats.imageCount} | Tables: ${stats.tableCount} | FAQ: ${stats.faqCount}`,
    `Links: ${stats.internalLinks} internal, ${stats.externalLinks} external`,
  ].join('\n   ');
}
