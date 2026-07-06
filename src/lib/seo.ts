import type { Metadata } from 'next';
import { CONTACT_EMAIL, OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL_LINKS } from '@/constants/site';

interface MetadataArgs {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`;
}

export function pageUrl(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === '/') return SITE_URL;
  return `${SITE_URL}${normalized.slice(0, -1)}`;
}

export function createMetadata({
  title,
  description,
  path,
  ogImage = OG_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
}: MetadataArgs): Metadata {
  const url = pageUrl(path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        de: url,
        en: url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'de_DE',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rentiers Global Corp.',
    legalName: 'Rentiers Global Corp. / Rentiers Global Inc.',
    url: SITE_URL,
    logo: `${SITE_URL}/rentiers_logo.svg`,
    description:
      'Digitale Plattform für Einlagenarbitrage — Technologieplattform, kein Kreditinstitut. MSB-lizenziert bei FinCEN und FINTRAC.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function financialProductSchemas() {
  const products = [
    {
      name: 'Rentiers Konservativ Portfolio',
      description: '12% p.a. Bankeinlagen in stabilen Emerging Markets mit staatlichen Einlagengarantien',
      annualPercentageRate: '12',
      minimumInvestment: '25000 EUR',
    },
    {
      name: 'Rentiers Ausgewogenes Portfolio',
      description: '16% p.a. Bankeinlagen in Emerging Markets — ausgewogenes Rendite-Risiko-Profil',
      annualPercentageRate: '16',
      minimumInvestment: '10000 EUR',
    },
    {
      name: 'Rentiers High-Yield Portfolio',
      description: '20% p.a. Bankeinlagen in Hochzinsmärkten mit aktivem Risikomonitoring',
      annualPercentageRate: '20',
      minimumInvestment: '5000 EUR',
    },
  ];

  return products.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: product.name,
    description: product.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    annualPercentageRate: product.annualPercentageRate,
    feesAndCommissionsSpecification: '25% des Bruttojahresertrags',
    amount: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      minValue: product.minimumInvestment.replace(/\D/g, ''),
    },
  }));
}

export function definedTermSchema(term: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Rentiers Finanzglossar',
      url: `${SITE_URL}/faq`,
    },
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleSchema(
  post: {
    title: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author: { name: string; role: string; roleEn?: string };
    slug: string;
    coverImage?: string;
    wordCount?: number;
  },
  lang: 'de' | 'en' = 'de',
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: lang === 'en' && post.author.roleEn ? post.author.roleEn : post.author.role,
      knowsAbout: ['Einlagenarbitrage', 'Bankeinlagen', 'Emerging Markets', 'Festgeld'],
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/rentiers_logo.svg`,
      },
    },
    url: pageUrl(`/blog/${post.slug}`),
    image: post.coverImage || OG_IMAGE,
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    inLanguage: lang === 'de' ? 'de-DE' : 'en-GB',
    mainEntityOfPage: pageUrl(`/blog/${post.slug}`),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : pageUrl(item.href),
    })),
  };
}
