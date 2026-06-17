'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog';
import { markdownToHtml } from '@/lib/markdown';

interface LocalizedPost {
  meta: BlogPostMeta;
  content: string;
}

function localizedMeta(post: BlogPostMeta, lang: 'de' | 'en') {
  if (lang === 'en') {
    return {
      title: post.titleEn ?? post.title,
      description: post.descriptionEn ?? post.description,
      faq: post.faqEn ?? post.faq,
    };
  }
  return { title: post.title, description: post.description, faq: post.faq };
}

export default function BlogPostContent({
  de,
  en,
  related,
}: {
  de: LocalizedPost;
  en: LocalizedPost;
  related: BlogPostMeta[];
}) {
  const { lang, p } = useLanguage();
  const labels = p.blog;
  const active = lang === 'en' ? en : de;
  const meta = localizedMeta(active.meta, lang);
  const dateLocale = lang === 'en' ? 'en-GB' : 'de-DE';

  const breadcrumbs = [
    { name: labels.home, href: '/' },
    { name: labels.blog, href: '/blog' },
    { name: active.meta.category, href: `/blog?category=${active.meta.category}` },
    { name: meta.title, href: `/blog/${active.meta.slug}` },
  ];

  return (
    <article className="pt-24 pb-20">
      {active.meta.coverImage && (
        <div className="relative h-72 md:h-96 mb-10">
          <Image src={active.meta.coverImage} alt={meta.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="max-w-[760px] mx-auto px-6">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {breadcrumbs.map((item, i) => (
            <span key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              {i < breadcrumbs.length - 1 ? (
                <Link href={item.href} className="hover:underline">{item.name}</Link>
              ) : (
                <span style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          >
            {active.meta.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
            {active.meta.readTime} {labels.readTime}
          </span>
        </div>

        <h1 className="text-3xl md:text-[2.75rem] font-extrabold mb-5 leading-tight tracking-tight" style={{ color: 'var(--color-dark)' }}>
          {meta.title}
        </h1>

        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          {meta.description}
        </p>

        <div className="flex items-center gap-3 mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ background: 'var(--color-primary)' }}
          >
            {active.meta.author.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
              {active.meta.author.name}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {active.meta.author.role} ·{' '}
              {new Date(active.meta.datePublished).toLocaleDateString(dateLocale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div
          className="blog-article"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(active.content) }}
        />

        {meta.faq && meta.faq.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              {labels.faqTitle}
            </h2>
            <div className="space-y-4">
              {meta.faq.map((item, idx) => (
                <details
                  key={item.question ?? idx}
                  className="rounded-2xl border group"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
                >
                  <summary className="cursor-pointer font-semibold text-sm p-5 list-none flex justify-between items-center" style={{ color: 'var(--color-dark)' }}>
                    {item.question}
                    <span className="text-lg ml-4 group-open:rotate-45 transition-transform" style={{ color: 'var(--color-primary)' }}>+</span>
                  </summary>
                  <p className="text-sm px-5 pb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {active.meta.tags && active.meta.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {active.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-secondary)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 mt-16">
          <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
            {labels.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {related.map((post) => {
              const relatedMeta = localizedMeta(post, lang);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl p-5 border hover:shadow-md transition-all"
                  style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
                >
                  <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                    {post.category}
                  </span>
                  <p className="font-bold text-sm mt-1 mb-2 line-clamp-2" style={{ color: 'var(--color-dark)' }}>
                    {relatedMeta.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {post.readTime} {labels.readTime} →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-[760px] mx-auto px-6 mt-12">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
        >
          <p className="text-white font-bold text-lg mb-2">{labels.ctaTitle}</p>
          <p className="text-white/80 text-sm mb-4">{labels.ctaSubtitle}</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
            style={{ color: 'var(--color-primary)' }}
          >
            {labels.ctaButton}
          </Link>
        </div>
      </div>
    </article>
  );
}
