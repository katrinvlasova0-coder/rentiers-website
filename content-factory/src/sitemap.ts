import fs from 'fs';
import path from 'path';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';

function getSitemapPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'sitemap.xml');
}

function getBaseUrl(): string {
  return process.env.SITE_BASE_URL || 'https://rentiers.net';
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  'xhtml:link'?: Array<{ '@_rel': string; '@_hreflang': string; '@_href': string }>;
}

function buildBlogEntry(
  slug: string,
  lastmod: string,
  priority: 'high' | 'medium' | 'low' = 'medium',
): SitemapEntry {
  const BASE_URL = getBaseUrl();
  const priorityMap = { high: '0.9', medium: '0.7', low: '0.5' };

  return {
    loc: `${BASE_URL}/blog/${slug}`,
    lastmod,
    changefreq: 'monthly',
    priority: priorityMap[priority],
    'xhtml:link': [
      { '@_rel': 'alternate', '@_hreflang': 'de', '@_href': `${BASE_URL}/blog/${slug}` },
      { '@_rel': 'alternate', '@_hreflang': 'en', '@_href': `${BASE_URL}/en/blog/${slug}` },
      { '@_rel': 'alternate', '@_hreflang': 'x-default', '@_href': `${BASE_URL}/blog/${slug}` },
    ],
  };
}

function readSitemap(): { urlset: { url: SitemapEntry[] } } {
  const SITEMAP_PATH = getSitemapPath();
  let sitemap: { urlset: { url: SitemapEntry[] } } = { urlset: { url: [] } };

  if (fs.existsSync(SITEMAP_PATH)) {
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(fs.readFileSync(SITEMAP_PATH, 'utf-8'));
    const urls = parsed?.urlset?.url;
    sitemap.urlset.url = Array.isArray(urls) ? urls : urls ? [urls] : [];
  }

  return sitemap;
}

function writeSitemap(sitemap: { urlset: { url: SitemapEntry[] } }): void {
  const SITEMAP_PATH = getSitemapPath();
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${builder.build(sitemap.urlset)}
</urlset>`;

  fs.mkdirSync(path.dirname(SITEMAP_PATH), { recursive: true });
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf-8');
}

export async function addArticleToSitemap(
  slug: string,
  datePublished: string,
  priority: 'high' | 'medium' | 'low' = 'medium',
): Promise<void> {
  const BASE_URL = getBaseUrl();
  const newEntry = buildBlogEntry(slug, datePublished, priority);
  const sitemap = readSitemap();

  sitemap.urlset.url = sitemap.urlset.url.filter(
    (u) => u.loc !== `${BASE_URL}/blog/${slug}`,
  );
  sitemap.urlset.url.push(newEntry);

  sitemap.urlset.url.sort(
    (a, b) => parseFloat(b.priority) - parseFloat(a.priority),
  );

  writeSitemap(sitemap);
  console.log(`✅ Sitemap updated: added /blog/${slug}`);
}

export function regenerateSitemap(
  slugs: string[],
  defaultDate: string = new Date().toISOString().split('T')[0],
): void {
  const sitemap = readSitemap();
  const BASE_URL = getBaseUrl();

  // Keep non-blog entries
  const staticEntries = sitemap.urlset.url.filter(
    (u) => !u.loc?.includes('/blog/') || u.loc === `${BASE_URL}/blog`,
  );

  const blogEntries = slugs.map((slug) => buildBlogEntry(slug, defaultDate, 'medium'));

  sitemap.urlset.url = [...staticEntries, ...blogEntries].sort(
    (a, b) => parseFloat(b.priority) - parseFloat(a.priority),
  );

  writeSitemap(sitemap);
  console.log(`✅ Sitemap regenerated with ${blogEntries.length} blog entries`);
}
