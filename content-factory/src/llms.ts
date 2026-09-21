import fs from 'fs';
import path from 'path';
import { isFallbackSlug } from './public-slugs';

function getLlmsPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'llms.txt');
}

function getContentDir(): string {
  return path.resolve(process.env.CONTENT_DIR || '../content/blog');
}

function getBaseUrl(): string {
  return (process.env.SITE_BASE_URL || 'https://rentiers.net').replace(/\/$/, '');
}

const PRIMARY_PAGES: Array<{ title: string; path: string }> = [
  { title: 'Home', path: '/' },
  { title: 'Portfolios', path: '/portfolios/' },
  { title: 'Wie es funktioniert', path: '/wie-es-funktioniert/' },
  { title: 'Kalkulator', path: '/kalkulator/' },
  { title: 'Einlagenarbitrage', path: '/einlagenarbitrage/' },
  { title: 'Partner-Banken', path: '/partner-banken/' },
  { title: 'Open account', path: '/open-account/' },
  { title: 'B2B', path: '/b2b/' },
  { title: 'FAQ', path: '/faq/' },
  { title: 'Über uns', path: '/ueber-uns/' },
  { title: 'Kontakt', path: '/kontakt/' },
];

export interface LlmsArticle {
  slug: string;
  title: string;
}

function readSlugsFromDisk(): string[] {
  const dir = getContentDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function selectPublicSlugs(slugs: string[]): string[] {
  return slugs.filter((slug) => !isFallbackSlug(slug)).sort();
}

function titleFromMdx(slug: string): string {
  const filePath = path.join(getContentDir(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return slug.replace(/-/g, ' ');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^title:\s*(.+)\s*$/m);
  if (!match) return slug.replace(/-/g, ' ');
  return match[1].trim().replace(/^["']|["']$/g, '');
}

export function renderLlmsTxt(articles: LlmsArticle[], baseUrl = 'https://rentiers.net'): string {
  const site = baseUrl.replace(/\/$/, '');
  const pages = PRIMARY_PAGES.map((page) => {
    const href = page.path === '/' ? `${site}/` : `${site}${page.path}`;
    return `- [${page.title}](${href})`;
  });
  const posts = articles.map(
    (article) => `- [${article.title}](${site}/blog/${article.slug}/)`,
  );

  return [
    '# Rentiers',
    '',
    '> Digitale Plattform für Einlagenarbitrage / Festgeld bei Partnerbanken. Rentiers ist eine Technologieplattform, kein Kreditinstitut.',
    '',
    `Site: ${site}/`,
    `Blog: ${site}/blog/`,
    `B2B: ${site}/b2b/`,
    '',
    '## Primary pages',
    '',
    ...pages,
    '',
    '## Blog',
    '',
    ...posts,
    '',
    '## Languages',
    '',
    'Content is served primarily in German. English is a client-side locale toggle on the same URLs (no separate /en/ tree yet).',
    '',
    '## Contact',
    '',
    `${site}/kontakt/`,
    '',
  ].join('\n');
}

/** GEO index for LLM and answer-engine crawlers. Fallback articles are omitted. */
export function writeLlmsTxt(slugs?: string[]): void {
  const articles = selectPublicSlugs(slugs ?? readSlugsFromDisk()).map((slug) => ({
    slug,
    title: titleFromMdx(slug),
  }));
  const out = getLlmsPath();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderLlmsTxt(articles, getBaseUrl()), 'utf-8');
  console.log(`✅ llms.txt written (${articles.length} articles)`);
}
