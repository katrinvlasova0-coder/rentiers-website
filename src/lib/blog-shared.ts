import { slugify } from '@/lib/slugify';

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  titleEn?: string;
  descriptionEn?: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; role: string; roleEn?: string };
  category: string;
  categoryEn?: string;
  readTime: number;
  coverImage?: string;
  featured?: boolean;
  tags: string[];
  tagsEn?: string[];
  faq?: Array<{ question: string; answer: string }>;
  faqEn?: Array<{ question: string; answer: string }>;
}

export type BlogLang = 'de' | 'en';

/** Canonical category keys (German) → localized labels */
export const CATEGORY_LABELS: Record<string, { de: string; en: string }> = {
  Einlagenarbitrage: { de: 'Einlagenarbitrage', en: 'Deposit Arbitrage' },
  Festgeld: { de: 'Festgeld', en: 'Fixed Deposits' },
  'Passives Einkommen': { de: 'Passives Einkommen', en: 'Passive Income' },
  Anlagestrategien: { de: 'Anlagestrategien', en: 'Investment Strategies' },
  Inflationsschutz: { de: 'Inflationsschutz', en: 'Inflation Protection' },
  Geldanlage: { de: 'Geldanlage', en: 'Investments' },
  'Finanzielle Freiheit': { de: 'Finanzielle Freiheit', en: 'Financial Freedom' },
  'Länder-Guides': { de: 'Länder-Guides', en: 'Country Guides' },
  Sicherheit: { de: 'Sicherheit', en: 'Security' },
  Altersvorsorge: { de: 'Altersvorsorge', en: 'Retirement Planning' },
  Märkte: { de: 'Märkte', en: 'Markets' },
  Vergleiche: { de: 'Vergleiche', en: 'Comparisons' },
};

/** Content-factory cluster names and legacy tag strings */
const TAG_LABELS: Record<string, { de: string; en: string }> = {
  Сравнения: { de: 'Vergleiche', en: 'Comparisons' },
  'Страновые гиды': { de: 'Länder-Guides', en: 'Country Guides' },
  'Пассивный доход': { de: 'Passives Einkommen', en: 'Passive Income' },
  Безопасность: { de: 'Sicherheit', en: 'Security' },
  'RU/CIS': { de: 'RU/CIS', en: 'RU/CIS' },
  Rentiers: { de: 'Rentiers', en: 'Rentiers' },
  'Emerging Markets': { de: 'Schwellenländer', en: 'Emerging Markets' },
  'Festgeld Ausland': { de: 'Festgeld Ausland', en: 'Foreign Fixed Deposits' },
  'Carry Trade': { de: 'Carry Trade', en: 'Carry Trade' },
  Bankeinlagen: { de: 'Bankeinlagen', en: 'Bank Deposits' },
  'Globale Zinsen': { de: 'Globale Zinsen', en: 'Global Interest Rates' },
  Weltmärkte: { de: 'Weltmärkte', en: 'Global Markets' },
};

const CYRILLIC_RE = /[\u0400-\u04FF]/;

export function categorySlug(category: string): string {
  return slugify(category);
}

export function getLocalizedCategory(
  category: string,
  categoryEn: string | undefined,
  lang: BlogLang,
): string {
  if (lang === 'en') {
    return categoryEn ?? CATEGORY_LABELS[category]?.en ?? category;
  }
  return CATEGORY_LABELS[category]?.de ?? category;
}

export function localizeTag(tag: string, lang: BlogLang): string {
  const mapped = TAG_LABELS[tag];
  if (mapped) return mapped[lang];
  if (CYRILLIC_RE.test(tag)) return '';
  return tag;
}

export function localizeTags(
  tags: string[],
  tagsEn: string[] | undefined,
  lang: BlogLang,
): string[] {
  const source = lang === 'en' && tagsEn?.length ? tagsEn : tags;
  const seen = new Set<string>();
  const result: string[] = [];

  for (const tag of source) {
    const label = localizeTag(tag, lang);
    if (!label) continue;
    const key = label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(label);
  }

  return result;
}

export function localizeBlogMeta(meta: BlogPostMeta, lang: BlogLang): BlogPostMeta {
  if (lang === 'de') {
    return {
      ...meta,
      category: getLocalizedCategory(meta.category, meta.categoryEn, 'de'),
      tags: localizeTags(meta.tags, meta.tagsEn, 'de'),
    };
  }

  return {
    ...meta,
    title: meta.titleEn ?? meta.title,
    description: meta.descriptionEn ?? meta.description,
    category: getLocalizedCategory(meta.category, meta.categoryEn, 'en'),
    tags: localizeTags(meta.tags, meta.tagsEn, 'en'),
    faq: meta.faqEn ?? meta.faq,
    author: {
      ...meta.author,
      role: meta.author.roleEn ?? meta.author.role,
    },
  };
}

export function collectUniqueTags(posts: BlogPostMeta[], lang: BlogLang): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];

  for (const post of posts) {
    for (const tag of localizeTags(post.tags, post.tagsEn, lang)) {
      const key = slugify(tag);
      if (!seen.has(key)) {
        seen.add(key);
        tags.push(tag);
      }
    }
  }

  return tags.sort((a, b) => a.localeCompare(b, lang === 'de' ? 'de' : 'en'));
}

export function collectCategories(posts: BlogPostMeta[], lang: BlogLang): Array<{ key: string; label: string }> {
  const seen = new Set<string>();
  const items: Array<{ key: string; label: string }> = [];

  for (const post of posts) {
    const key = post.category;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({
      key,
      label: getLocalizedCategory(key, post.categoryEn, lang),
    });
  }

  return items.sort((a, b) => a.label.localeCompare(b.label, lang === 'de' ? 'de' : 'en'));
}

export function pickReadMorePosts(
  posts: BlogPostMeta[],
  currentSlug: string,
  category: string,
  limit = 4,
): BlogPostMeta[] {
  const others = posts.filter((p) => p.slug !== currentSlug);
  const same = others.filter((p) => p.category === category);
  const rest = others.filter((p) => p.category !== category);
  return [...same, ...rest].slice(0, limit);
}
