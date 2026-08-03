import type { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/blog';
import BlogListContent from '@/components/pages/BlogListContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'B2B Blog — Rentiers | Geschäftskonto, Unternehmensreserven, Zinsen',
  description:
    'Expertenwissen für Unternehmen: Geschäftskonto-Zinsen, Unternehmensreserven anlegen, CRS-Reporting und internationale Bankeinlagen.',
  path: '/b2b/blog',
});

export default async function B2BBlogPage() {
  const posts = await getPostsByCategory('B2B');
  return (
    <BlogListContent
      posts={posts}
      basePath="/b2b/blog"
      hideCategoryFilter
      heroTitle={{
        de: 'B2B Wissensblog',
        en: 'B2B Knowledge Blog',
      }}
      heroSubtitle={{
        de: 'Geschäftskonto, Unternehmensreserven, CRS und internationale Bankeinlagen — Wissen für CFOs und Geschäftsführer.',
        en: 'Business accounts, corporate reserves, CRS and international bank deposits — knowledge for CFOs and business owners.',
      }}
    />
  );
}
