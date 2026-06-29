import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/layout/JsonLd';
import BlogPostContent from '@/components/pages/BlogPostContent';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.description,
      alternates: { canonical: `https://rentierspro.com/blog/${slug}` },
      openGraph: {
        title: meta.title,
        description: meta.description,
        type: 'article',
        publishedTime: meta.datePublished,
        modifiedTime: meta.dateModified,
        images: meta.coverImage ? [{ url: meta.coverImage, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return { title: 'Artikel nicht gefunden' };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let de;
  let en;
  try {
    de = await getPostBySlug(slug, 'de');
    en = await getPostBySlug(slug, 'en');
  } catch {
    notFound();
  }

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === de.meta.category)
    .slice(0, 5);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: de.meta.category, href: `/blog?category=${de.meta.category}` },
    { name: de.meta.title, href: `/blog/${slug}` },
  ];

  const deWordCount = de.content.split(/\s+/).filter(Boolean).length;

  const schemas = [
    articleSchema({ ...de.meta, wordCount: deWordCount }, 'de'),
    breadcrumbSchema(breadcrumbs),
    ...(de.meta.faq && de.meta.faq.length > 0 ? [faqSchema(de.meta.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <BlogPostContent de={de} en={en} related={related} />
    </>
  );
}
