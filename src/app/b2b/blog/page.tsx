import type { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/blog';
import BlogListContent from '@/components/pages/BlogListContent';
import { createMetadata } from '@/lib/seo';
import { OG_IMAGE_B2B } from '@/constants/site';

export const metadata: Metadata = createMetadata({
  title: 'B2B Blog — Rentiers | Geschäftskonto, Unternehmensreserven, Zinsen',
  description:
    'Expertenwissen für Unternehmen: Geschäftskonto-Zinsen, Unternehmensreserven anlegen, CRS-Reporting und internationale Bankeinlagen.',
  path: '/b2b/blog',
  ogImage: OG_IMAGE_B2B,
});

export default async function B2BBlogPage() {
  const posts = await getPostsByCategory('B2B');
  return (
    <BlogListContent
      posts={posts}
      basePath="/b2b/blog"
      hideCategoryFilter
      variant="corporate"
      heroTitle={{
        de: 'Corporate Investment Knowledge Hub',
        en: 'Corporate Investment Knowledge Hub',
      }}
      heroSubtitle={{
        de: 'Geschäftskonto, Unternehmensreserven, CRS und internationale Bankeinlagen — Wissen für CFOs und Geschäftsführer.',
        en: 'Business accounts, corporate reserves, CRS and international bank deposits — knowledge for CFOs and business owners.',
      }}
    />
  );
}
