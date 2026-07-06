import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { pickReadMorePosts, categorySlug } from '@/lib/blog-shared';
import { articleSchema, faqSchema, breadcrumbSchema, createMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/JsonLd';
import BlogPostContent from '@/components/pages/BlogPostContent';
import BlogArticleTracker from '@/components/analytics/BlogArticleTracker';

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
    return createMetadata({
      title: meta.title,
      description: meta.description,
      path: `/blog/${slug}`,
      type: 'article',
      ogImage: meta.coverImage,
      publishedTime: meta.datePublished,
      modifiedTime: meta.dateModified,
    });
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
  const readMore = pickReadMorePosts(allPosts, slug, de.meta.category, 4);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: de.meta.category, href: `/blog?category=${categorySlug(de.meta.category)}` },
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
      <BlogArticleTracker slug={slug} />
      <JsonLd data={schemas} />
      <BlogPostContent de={de} en={en} readMore={readMore} />
    </>
  );
}
