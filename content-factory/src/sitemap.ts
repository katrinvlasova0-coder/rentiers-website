import fs from 'fs';
import path from 'path';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { writeLlmsTxt } from './llms';
import { isFallbackSlug, isFallbackUrl } from './public-slugs';

function getSitemapPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'sitemap.xml');
}

function getBaseUrl(): string {
  return (process.env.SITE_BASE_URL || 'https://rentiers.net').replace(/\/$/, '');
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  'xhtml:link'?: Array<{ '@_rel': string; '@_hreflang': string; '@_href': string }>;
}

/**
 * English is a client-side toggle on the German URL. Do not advertise hreflang="en"
 * or /en/blog/ until those routes exist. x-default matches the German URL.
 */
export function germanHreflangLinks(href: string): NonNullable<SitemapEntry['xhtml:link']> {
  return [
    { '@_rel': 'alternate', '@_hreflang': 'de', '@_href': href },
    { '@_rel': 'alternate', '@_hreflang': 'x-default', '@_href': href },
  ];
}

function normalizeEntry(entry: SitemapEntry): SitemapEntry | null {
  if (!entry?.loc || isFallbackUrl(entry.loc)) return null;
  const loc = entry.loc.replace('/en/blog/', '/blog/');
  return {
    ...entry,
    loc,
    'xhtml:link': germanHreflangLinks(loc),
  };
}

function buildBlogEntry(
  slug: string,
  lastmod: string,
  priority: 'high' | 'medium' | 'low' = 'medium',
): SitemapEntry {
  const BASE_URL = getBaseUrl();
  const priorityMap = { high: '0.9', medium: '0.7', low: '0.5' };
  const loc = `${BASE_URL}/blog/${slug}`;

  return {
    loc,
    lastmod,
    changefreq: 'monthly',
    priority: priorityMap[priority],
    'xhtml:link': germanHreflangLinks(loc),
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
  sitemap.urlset.url = sitemap.urlset.url
    .map((entry) => normalizeEntry(entry))
    .filter((entry): entry is SitemapEntry => entry !== null);
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
  const sitemap = readSitemap();

  if (isFallbackSlug(slug)) {
    const rawPath = getSitemapPath();
    const raw = fs.existsSync(rawPath) ? fs.readFileSync(rawPath, 'utf-8') : '';
    if (raw.includes('/fallback-') || raw.includes('hreflang="en"') || raw.includes('/en/blog/')) {
      writeSitemap(sitemap);
    }
    writeLlmsTxt();
    console.log(`ℹ️ Sitemap skipped fallback article: /blog/${slug}`);
    return;
  }

  const newEntry = buildBlogEntry(slug, datePublished, priority);
  const loc = `${BASE_URL}/blog/${slug}`;

  sitemap.urlset.url = sitemap.urlset.url.filter((u) => u.loc !== loc && u.loc !== `${loc}/`);
  sitemap.urlset.url.push(newEntry);

  sitemap.urlset.url.sort(
    (a, b) => parseFloat(b.priority) - parseFloat(a.priority),
  );

  writeSitemap(sitemap);
  writeLlmsTxt();
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

  const blogEntries = slugs
    .filter((slug) => !isFallbackSlug(slug))
    .map((slug) => buildBlogEntry(slug, defaultDate, 'medium'));

  sitemap.urlset.url = [...staticEntries, ...blogEntries].sort(
    (a, b) => parseFloat(b.priority) - parseFloat(a.priority),
  );

  writeSitemap(sitemap);
  writeLlmsTxt();
  console.log(`✅ Sitemap regenerated with ${blogEntries.length} blog entries`);
}
