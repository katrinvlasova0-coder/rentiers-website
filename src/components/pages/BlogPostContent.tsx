'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';
import {
  categorySlug,
  getLocalizedCategory,
  localizeBlogMeta,
  type BlogPostMeta,
} from '@/lib/blog-shared';
import { markdownToHtml } from '@/lib/markdown';
import { slugify } from '@/lib/slugify';

interface LocalizedPost {
  meta: BlogPostMeta;
  content: string;
}

export default function BlogPostContent({
  de,
  en,
  readMore,
}: {
  de: LocalizedPost;
  en: LocalizedPost;
  readMore: BlogPostMeta[];
}) {
  const { lang, p } = useLanguage();
  const labels = p.blog;
  const active = lang === 'en' ? en : de;
  const rawMeta = active.meta;
  const meta = localizeBlogMeta(rawMeta, lang);
  const canonicalCategory = de.meta.category;
  const dateLocale = lang === 'en' ? 'en-GB' : 'de-DE';

  const breadcrumbs = [
    { name: labels.home, href: '/' },
    { name: labels.blog, href: '/blog' },
    {
      name: meta.category,
      href: `/blog?category=${encodeURIComponent(categorySlug(canonicalCategory))}`,
    },
    { name: meta.title, href: `/blog/${meta.slug}` },
  ];

  return (
    <article className="pt-24 pb-20">
      {meta.coverImage && (
        <div className="relative h-72 md:h-[28rem] mb-0">
          <Image src={meta.coverImage} alt={meta.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-[720px] mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-10 mb-10" style={{ borderColor: 'var(--color-border)' }}>
          <nav className="flex flex-wrap items-center gap-1.5 text-xs mb-5" style={{ color: 'var(--color-text-secondary)' }}>
            {breadcrumbs.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {i < breadcrumbs.length - 1 ? (
                  <Link href={item.href} className="hover:underline hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                ) : (
                  <span className="line-clamp-1" style={{ color: 'var(--color-text-primary)' }}>
                    {item.name}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/blog?category=${encodeURIComponent(categorySlug(canonicalCategory))}`}
              className="text-xs font-semibold px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              {meta.category}
            </Link>
            <span className="text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
              {rawMeta.readTime} {labels.readTime}
            </span>
          </div>

          <h1
            className="text-3xl md:text-[2.5rem] font-extrabold mb-4 leading-tight tracking-tight"
            style={{ color: 'var(--color-dark)' }}
          >
            {meta.title}
          </h1>

          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            {meta.description}
          </p>

          <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
              style={{ background: 'var(--color-primary)' }}
            >
              {meta.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                {meta.author.name}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {meta.author.role} ·{' '}
                {new Date(meta.datePublished).toLocaleDateString(dateLocale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div
          className="blog-article"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(active.content, lang) }}
        />

        {meta.faq && meta.faq.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              {labels.faqTitle}
            </h2>
            <div className="space-y-3">
              {meta.faq.map((item, idx) => (
                <details
                  key={item.question ?? idx}
                  className="rounded-xl border group bg-white"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <summary
                    className="cursor-pointer font-semibold text-sm p-5 list-none flex justify-between items-start gap-4"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    <span>{item.question}</span>
                    <span
                      className="text-xl shrink-0 group-open:rotate-45 transition-transform leading-none"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-sm px-5 pb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {meta.tags && meta.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {labels.tagsTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(slugify(tag))}`}
                  className="text-sm px-3 py-1.5 rounded-full border hover:shadow-sm transition-all"
                  style={{
                    background: 'var(--color-bg-light)',
                    color: 'var(--color-primary)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {readMore.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-6 mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--color-dark)' }}>
              {labels.readMoreTitle}
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:shadow-sm"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              {labels.allArticles}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {readMore.map((post) => {
              const relatedMeta = localizeBlogMeta(post, lang);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl overflow-hidden border hover:shadow-md transition-all bg-white"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {post.coverImage ? (
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={relatedMeta.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{ background: 'var(--color-primary-light)' }}
                    >
                      <span className="text-2xl font-extrabold" style={{ color: 'var(--color-primary)', opacity: 0.35 }}>
                        R
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                      {getLocalizedCategory(post.category, post.categoryEn, lang)}
                    </span>
                    <p className="font-bold text-sm mt-1 mb-2 line-clamp-2" style={{ color: 'var(--color-dark)' }}>
                      {relatedMeta.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {post.readTime} {labels.readTime} →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-[720px] mx-auto px-6 mt-12">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
        >
          <p className="text-white font-bold text-lg mb-2">{labels.ctaTitle}</p>
          <p className="text-white/80 text-sm mb-4">{labels.ctaSubtitle}</p>
          <LeadButton
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
            style={{ color: 'var(--color-primary)' }}
          >
            {labels.ctaButton}
          </LeadButton>
        </div>
      </div>
    </article>
  );
}
