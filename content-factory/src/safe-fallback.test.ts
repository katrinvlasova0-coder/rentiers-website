import { validateArticle } from './validator';
import {
  SAFE_TEMPLATES,
  buildSafeFallbackArticle,
  selectTemplate,
} from './safe-fallback';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

const dates = ['2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21', '2026-08-22', '2026-08-23'];

for (const date of dates) {
  const selected = selectTemplate(date);
  assert(Boolean(selected?.id), `no template for ${date}`);
}

const used = new Set(dates.map((d) => selectTemplate(d).id));
assert(used.size === SAFE_TEMPLATES.length, 'rotation should hit every template across 6 days');

for (const template of SAFE_TEMPLATES) {
  const { slug, content, request } = buildSafeFallbackArticle(template, '2026-08-18', {
    links: [
      { slug: 'einlagenarbitrage-erklaert', text: 'Was ist Einlagenarbitrage?' },
      { slug: 'bankratings-lesen-anleger-2026', text: 'Bankratings lesen' },
    ],
  });

  assert(slug === `fallback-${template.id}-2026-08-18`, `unexpected slug ${slug}`);
  assert(content.includes('Bildungscharakter'), `${slug} missing DE disclaimer`);
  assert(content.includes('educational purposes only'), `${slug} missing EN disclaimer`);
  assert(/name:\s*"Rentiers Redaktion"/.test(content), `${slug} wrong author`);
  assert(!content.includes('12–20'), `${slug} contains yield claim`);
  assert(!content.includes('Jetzt Konto eröffnen'), `${slug} contains solicitation CTA`);

  const result = validateArticle(content, request.keywordDe, 1500);
  if (!result.valid || result.warnings.length) {
    console.log(`\n--- ${slug} ---`);
    console.log('errors', result.errors);
    console.log('warnings', result.warnings);
    console.log('stats', result.stats);
  }
  assert(result.valid, `${slug} invalid:\n${result.errors.join('\n')}`);
  assert(
    result.stats.wordCountDe >= 1500,
    `${slug} DE word count ${result.stats.wordCountDe} < 1500`,
  );
  assert(
    result.stats.wordCountEn >= 1200,
    `${slug} EN word count ${result.stats.wordCountEn} < 1200`,
  );
}

console.log('✅ safe-fallback.test.ts passed');
