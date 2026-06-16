import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogListContent from '@/components/pages/BlogListContent';

export const metadata: Metadata = {
  title: 'Blog — Rentiers Pro | Festgeld, passive Einkommen, Einlagenarbitrage',
  description:
    'Expertenwissen zu Festgeld, passivem Einkommen, Einlagenarbitrage und globalen Bankzinsen. Tipps und Guides für Anleger.',
  alternates: { canonical: 'https://rentierspro.com/blog' },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogListContent posts={posts} />;
}
