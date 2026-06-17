'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizeBlogMeta, type BlogPostMeta } from '@/lib/blog';
import { slugify } from '@/lib/slugify';

function postMatchesTag(post: BlogPostMeta, tagSlug: string): boolean {
  const allTags = [...(post.tags ?? []), ...(post.tagsEn ?? [])];
  return allTags.some((t) => slugify(t) === tagSlug);
}

function postMatchesCategory(post: BlogPostMeta, category: string, lang: 'de' | 'en'): boolean {
  const localized = localizeBlogMeta(post, lang);
  return localized.category === category || post.category === category;
}

function BlogCard({ post, lang }: { post: BlogPostMeta; lang: 'de' | 'en' }) {
  const { p } = useLanguage();
  const labels = p.blog;
  const meta = localizeBlogMeta(post, lang);
  const dateLocale = lang === 'en' ? 'en-GB' : 'de-DE';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {post.coverImage ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={meta.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="h-44 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-light) 100%)' }}
        >
          <span className="text-3xl font-extrabold" style={{ color: 'var(--color-primary)', opacity: 0.4 }}>R</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          >
            {meta.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
            {post.readTime} {labels.readTime}
          </span>
        </div>
        <h2 className="font-bold text-base mb-2 line-clamp-2 transition-colors" style={{ color: 'var(--color-dark)' }}>
          {meta.title}
        </h2>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {meta.description}
        </p>
        <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
          {new Date(post.datePublished).toLocaleDateString(dateLocale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </Link>
  );
}

export default function BlogListContent({ posts }: { posts: BlogPostMeta[] }) {
  const { lang, p } = useLanguage();
  const labels = p.blog;
  const searchParams = useSearchParams();
  const tagFilter = searchParams.get('tag');
  const categoryFilter = searchParams.get('category');

  let filtered = posts;
  if (tagFilter) {
    filtered = filtered.filter((post) => postMatchesTag(post, tagFilter));
  }
  if (categoryFilter) {
    filtered = filtered.filter((post) => postMatchesCategory(post, categoryFilter, lang));
  }

  const activeTagLabel = tagFilter
    ? localizeBlogMeta(
        posts.find((p) => postMatchesTag(p, tagFilter)) ?? posts[0],
        lang
      ).tags?.find((t) => slugify(t) === tagFilter) ?? tagFilter
    : null;

  const featured = !tagFilter && !categoryFilter ? filtered.find((post) => post.featured) : undefined;
  const rest = filtered.filter((post) => post !== featured);

  return (
    <>
      <section
        className="pt-24 pb-12"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
            {labels.heroTitle}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            {labels.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {(tagFilter || categoryFilter) && (
            <div
              className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 border"
              style={{ background: 'var(--color-bg-light)', borderColor: 'var(--color-border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {tagFilter && (
                  <>
                    {labels.filterTag}: <strong style={{ color: 'var(--color-dark)' }}>{activeTagLabel}</strong>
                  </>
                )}
                {categoryFilter && (
                  <>
                    {labels.filterCategory}: <strong style={{ color: 'var(--color-dark)' }}>{categoryFilter}</strong>
                  </>
                )}
                {' · '}
                {filtered.length} {labels.filterResults}
              </p>
              <Link href="/blog" className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>
                {labels.clearFilter}
              </Link>
            </div>
          )}

          {featured && (
            <div className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden border hover:shadow-xl transition-all"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="grid md:grid-cols-2">
                  {featured.coverImage ? (
                    <div className="relative h-64 md:h-auto min-h-[16rem]">
                      <Image
                        src={featured.coverImage}
                        alt={localizeBlogMeta(featured, lang).title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div
                      className="h-64 md:h-auto flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg-light) 100%)' }}
                    >
                      <span className="text-6xl font-extrabold" style={{ color: 'var(--color-primary)', opacity: 0.3 }}>R</span>
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span
                      className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                      style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                    >
                      {labels.featured} · {localizeBlogMeta(featured, lang).category}
                    </span>
                    <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--color-dark)' }}>
                      {localizeBlogMeta(featured, lang).title}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                      {localizeBlogMeta(featured, lang).description}
                    </p>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {labels.readMore}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} lang={lang} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
              <p className="font-semibold">{labels.empty}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
