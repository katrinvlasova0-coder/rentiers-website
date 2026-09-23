import assert from 'node:assert/strict';
import { blogRobotsDirective, isFallbackBlogPost } from './blog-public';

assert.equal(
  isFallbackBlogPost({ slug: 'fallback-bankratings-lesen-2026-09-22' }),
  true,
);
assert.equal(blogRobotsDirective({ slug: 'fallback-crs-meldepflichten-2026-09-18' }), 'noindex, follow');

assert.equal(isFallbackBlogPost({ slug: 'bankratings-lesen-anleger-2026', fallback: true }), true);
assert.equal(isFallbackBlogPost({ slug: 'bankratings-lesen-anleger-2026', noindex: true }), true);
assert.equal(
  isFallbackBlogPost({ slug: 'bankratings-lesen-anleger-2026', robots: 'noindex, follow' }),
  true,
);

assert.equal(isFallbackBlogPost({ slug: 'crs-fatca-erklaert-2026' }), false);
assert.equal(isFallbackBlogPost({ slug: 'crs-fatca-erklaert-2026', fallback: false }), false);
assert.equal(blogRobotsDirective({ slug: 'crs-fatca-erklaert-2026' }), 'index, follow');
assert.equal(
  isFallbackBlogPost({ slug: 'crs-fatca-erklaert-2026', robots: 'index, follow' }),
  false,
);

console.log('✅ blog-public.test.ts passed');
