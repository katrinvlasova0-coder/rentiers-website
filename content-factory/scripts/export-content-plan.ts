#!/usr/bin/env tsx
/**
 * Re-export content-plan.json from Rentiers_Контент-план_2026.xlsx
 * Usage: npx tsx scripts/export-content-plan.ts
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import slugify from 'slugify';

const ROOT = path.join(__dirname, '..');
const XLSX_PATH = path.join(ROOT, '..', 'Rentiers_Контент-план_2026.xlsx');
const OUTPUT = path.join(ROOT, 'config', 'content-plan.json');
const BLOG_DIR = path.join(ROOT, '..', 'content', 'blog');

const CLUSTER_UNSPLASH: Record<string, string> = {
  Einlagenarbitrage: 'banking finance international',
  'Страновые гиды': 'tbilisi georgia finance',
  'Пассивный доход': 'passive income financial freedom',
  Сравнения: 'financial comparison investment',
  Безопасность: 'bank security financial regulation',
  B2B: 'corporate finance business banking',
  'RU/CIS': 'expat europe banking',
};

const CATEGORY_MAP: Record<string, string> = {
  Einlagenarbitrage: 'Einlagenarbitrage',
  'Страновые гиды': 'Länder-Guides',
  'Пассивный доход': 'Passives Einkommen',
  Сравнения: 'Vergleiche',
  Безопасность: 'Sicherheit',
  B2B: 'B2B',
  'RU/CIS': 'RU/CIS',
};

function parsePriority(p: string): 'high' | 'medium' | 'low' {
  if (p?.includes('Hoch') || p?.includes('🔴')) return 'high';
  if (p?.includes('Niedrig') || p?.includes('🟢')) return 'low';
  return 'medium';
}

function parseDate(d: string): string {
  const m = d?.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '2026-06-01';
}

function main(): void {
  const rawJson = execSync(
    `npx --yes xlsx-cli "${XLSX_PATH}" --sheet-index 2 --json`,
    { encoding: 'utf-8', cwd: ROOT },
  );
  const raw = JSON.parse(rawJson) as Array<Record<string, unknown>>;

  const existingSlugs = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', ''))
    : [];

  const slugOverrides: Record<number, string> = {
    1: 'einlagenarbitrage-leitfaden-2026',
    2: 'einlagenarbitrage-legal-2026',
    3: 'sparkonto-inflation-zinsen-2026',
    4: 'festgeld-etf-vergleich-2026',
  };

  const used = new Set(existingSlugs);
  const articles = [];

  for (const row of raw) {
    const id = row['RENTIERS PRO — КОНТЕНТ-ПЛАН СТАТЕЙ 2026 (с ключевыми словами и статистикой поиска)'];
    if (typeof id !== 'number') continue;

    const cluster = String(row['__EMPTY'] ?? '');
    const keywordDe = String(row['__EMPTY_3'] ?? '');
    const plannedDate = parseDate(String(row['__EMPTY_13'] ?? ''));

    let slug = slugOverrides[id];
    if (!slug) {
      let base = slugify(keywordDe, { lower: true, strict: true, locale: 'de' });
      if (!base || base.length < 5) {
        base = slugify(String(row['__EMPTY_1'] ?? '').slice(0, 60), {
          lower: true,
          strict: true,
          locale: 'de',
        });
      }
      const parts = base.split('-').filter(Boolean).slice(0, 6);
      const core = parts.join('-');
      slug = core.includes('2026') ? core : `${core}-2026`;
      let n = 2;
      while (used.has(slug)) {
        slug = `${core}-${n}`;
        n++;
      }
    }
    used.add(slug);

    const lsiRaw = String(row['__EMPTY_8'] ?? '');
    const statusRaw = String(row['__EMPTY_14'] ?? '');
    const isPublished =
      statusRaw === 'Опубликовано' ||
      existingSlugs.some((s) => s.includes(slug.split('-').slice(0, 2).join('-')));

    articles.push({
      id,
      cluster,
      slug,
      titleDe: String(row['__EMPTY_1'] ?? ''),
      titleEn: String(row['__EMPTY_2'] ?? ''),
      keywordDe,
      searchVolDe: Number(row['__EMPTY_4'] ?? 0),
      kd: Number(row['__EMPTY_5'] ?? 0),
      keywordEn: String(row['__EMPTY_6'] ?? ''),
      searchVolEn: Number(row['__EMPTY_7'] ?? 0),
      lsiKeywords: lsiRaw.split(/[;,]/).map((s) => s.trim()).filter(Boolean).slice(0, 5),
      format: String(row['__EMPTY_9'] ?? 'Explainer'),
      targetLength: Math.max(1200, Math.round(Number(row['__EMPTY_10'] ?? 15000) / 6)),
      taSegments: String(row['__EMPTY_11'] ?? '1,2,3').split(/[,;]/).map((s) => s.trim()),
      priority: parsePriority(String(row['__EMPTY_12'] ?? '')),
      plannedDate,
      language: cluster === 'RU/CIS' ? 'RU' : 'DE+EN',
      category: CATEGORY_MAP[cluster] ?? cluster,
      status: isPublished ? 'published' : 'pending',
      unsplashQuery: CLUSTER_UNSPLASH[cluster] ?? 'international banking',
    });
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(articles, null, 2));
  console.log(`✅ Exported ${articles.length} articles to config/content-plan.json`);
}

main();
