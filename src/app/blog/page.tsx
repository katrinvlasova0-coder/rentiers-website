import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogListContent from '@/components/pages/BlogListContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Blog — Rentiers Pro | Festgeld, passive Einkommen, Einlagenarbitrage',
  description:
    'Expertenwissen zu Festgeld, passivem Einkommen, Einlagenarbitrage und globalen Bankzinsen. Tipps und Guides für Anleger.',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogListContent posts={posts} />;
}
