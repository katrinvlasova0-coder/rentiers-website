import type { Metadata } from 'next';

interface MetadataArgs {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const BASE_URL = 'https://rentierspro.com';

export function createMetadata({ title, description, path, ogImage }: MetadataArgs): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Rentiers Pro',
      locale: 'de_DE',
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rentiers Pro',
    legalName: 'Rentiers Global Corp. / Rentiers Global Inc.',
    url: BASE_URL,
    logo: `${BASE_URL}/rentiers_logo.png`,
    description:
      'Digitale Plattform für Einlagenarbitrage — Technologieplattform, kein Kreditinstitut. MSB-lizenziert bei FinCEN und FINTRAC.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@rentierspro.com',
      contactType: 'customer service',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [
      'https://twitter.com/rentierspro',
      'https://linkedin.com/company/rentierspro',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rentiers Pro',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
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

export function articleSchema(post: {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; role: string };
  slug: string;
  coverImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@type': 'Person', name: post.author.name, jobTitle: post.author.role },
    publisher: {
      '@type': 'Organization',
      name: 'Rentiers Pro',
      url: BASE_URL,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.coverImage || `${BASE_URL}/og-default.png`,
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
      item: `${BASE_URL}${item.href}`,
    })),
  };
}
