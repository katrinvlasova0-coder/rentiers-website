import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostsByCategory } from '@/lib/blog';
import { pickReadMorePosts } from '@/lib/blog-shared';
import { articleSchema, faqSchema, breadcrumbSchema, createMetadata } from '@/lib/seo';
import JsonLd from '@/components/layout/JsonLd';
import BlogPostContent from '@/components/pages/BlogPostContent';
import BlogArticleTracker from '@/components/analytics/BlogArticleTracker';

export async function generateStaticParams() {
  const posts = await getPostsByCategory('B2B');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getPostBySlug(slug);
    if (meta.category !== 'B2B') {
      return { title: 'Artikel nicht gefunden' };
    }
    return createMetadata({
      title: meta.title,
      description: meta.description,
      path: `/b2b/blog/${slug}`,
      type: 'article',
      ogImage: meta.coverImage,
      publishedTime: meta.datePublished,
      modifiedTime: meta.dateModified,
    });
  } catch {
    return { title: 'Artikel nicht gefunden' };
  }
}

export default async function B2BBlogPostPage({
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

  if (de.meta.category !== 'B2B') {
    notFound();
  }

  const b2bPosts = await getPostsByCategory('B2B');
  const readMore = pickReadMorePosts(b2bPosts, slug, de.meta.category, 4);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'B2B', href: '/b2b/' },
    { name: 'Blog', href: '/b2b/blog' },
    { name: de.meta.title, href: `/b2b/blog/${slug}` },
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
      <BlogPostContent
        de={de}
        en={en}
        readMore={readMore}
        basePath="/b2b/blog"
        breadcrumbsExtra={[{ name: 'B2B', href: '/b2b/' }]}
      />
    </>
  );
}
