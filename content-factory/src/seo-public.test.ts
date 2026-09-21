import { renderLlmsTxt, selectPublicSlugs } from './llms';
import { isFallbackSlug, isFallbackUrl } from './public-slugs';
import { germanHreflangLinks } from './sitemap';

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

assert(isFallbackSlug('fallback-crs-meldepflichten-2026-09-18'), 'fallback slug should match');
assert(!isFallbackSlug('crs-fatca-erklaert-2026'), 'real slug should stay public');
assert(
  isFallbackUrl('https://rentiers.net/blog/fallback-waehrungsrisiko-einlagen-2026-09-20'),
  'fallback loc should match',
);
assert(!isFallbackUrl('https://rentiers.net/blog/crs-fatca-erklaert-2026'), 'real loc should stay');

const publicSlugs = selectPublicSlugs([
  'fallback-bankratings-lesen-2026-09-16',
  'einlagensicherung-grenzen-verstehen-2026',
  'fallback-crs-meldepflichten-2026-09-18',
  'hohe-bankzinsen-ausland-georgien-armenien',
]);
assert(
  publicSlugs.join(',') ===
    'einlagensicherung-grenzen-verstehen-2026,hohe-bankzinsen-ausland-georgien-armenien',
  `unexpected public slugs: ${publicSlugs.join(',')}`,
);

const links = germanHreflangLinks('https://rentiers.net/blog/crs-fatca-erklaert-2026');
assert(links.length === 2, 'expected de + x-default only');
assert(
  links.every((link) => link['@_hreflang'] === 'de' || link['@_hreflang'] === 'x-default'),
  'hreflang set should be de and x-default',
);
assert(
  links.every((link) => !link['@_href'].includes('/en/')),
  'hreflang must not invent /en/ URLs',
);

const llms = renderLlmsTxt(
  publicSlugs.map((slug) => ({ slug, title: slug })),
);
assert(llms.includes('kein Kreditinstitut'), 'llms blurb missing');
assert(llms.includes('https://rentiers.net/blog/'), 'blog index missing');
assert(llms.includes('https://rentiers.net/kontakt/'), 'contact missing');
assert(!llms.includes('https://rentiers.net/en/'), 'llms must not advertise /en/ URLs');
assert(!llms.includes('/en/blog/'), 'llms must not advertise /en/blog/ URLs');
assert(!llms.includes('fallback-'), 'llms must not list fallback articles');
assert(!/\b\d+\s*%/.test(llms), 'new llms copy must not promise a return');
assert(!/anlageberatung/i.test(llms), 'new llms copy must not offer investment advice');

console.log('✅ seo-public.test.ts passed');
