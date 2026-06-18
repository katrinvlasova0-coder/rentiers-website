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

export const CATEGORY_LABELS: Record<string, { de: string; en: string }> = {
  Einlagenarbitrage: { de: 'Einlagenarbitrage', en: 'Deposit Arbitrage' },
  Festgeld: { de: 'Festgeld', en: 'Fixed Deposits' },
  'Passives Einkommen': { de: 'Passives Einkommen', en: 'Passive Income' },
};

export function localizeBlogMeta(meta: BlogPostMeta, lang: BlogLang): BlogPostMeta {
  if (lang === 'de') return meta;
  const category =
    meta.categoryEn ??
    CATEGORY_LABELS[meta.category]?.en ??
    meta.category;
  return {
    ...meta,
    title: meta.titleEn ?? meta.title,
    description: meta.descriptionEn ?? meta.description,
    category,
    tags: meta.tagsEn ?? meta.tags,
    faq: meta.faqEn ?? meta.faq,
    author: {
      ...meta.author,
      role: meta.author.roleEn ?? meta.author.role,
    },
  };
}
