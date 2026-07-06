'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  categorySlug,
  collectCategories,
  collectUniqueTags,
  getLocalizedCategory,
  localizeBlogMeta,
  localizeTags,
  type BlogPostMeta,
} from '@/lib/blog-shared';
import { slugify } from '@/lib/slugify';

function postMatchesTag(post: BlogPostMeta, tagSlug: string, lang: 'de' | 'en'): boolean {
  const tags = localizeTags(post.tags, post.tagsEn, lang);
  return tags.some((t) => slugify(t) === tagSlug);
}

function postMatchesCategory(post: BlogPostMeta, categorySlugFilter: string): boolean {
  return categorySlug(post.category) === categorySlugFilter;
}

function postMatchesQuery(post: BlogPostMeta, query: string, lang: 'de' | 'en'): boolean {
  const meta = localizeBlogMeta(post, lang);
  const haystack = [meta.title, meta.description, meta.category, ...(meta.tags ?? [])]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
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
  const router = useRouter();
  const { lang, p } = useLanguage();
  const labels = p.blog;
  const searchParams = useSearchParams();

  const tagFilter = searchParams.get('tag');
  const categoryFilter = searchParams.get('category');
  const queryFilter = searchParams.get('q')?.trim() ?? '';

  const [searchInput, setSearchInput] = useState(queryFilter);

  const categories = useMemo(() => collectCategories(posts, lang), [posts, lang]);
  const allTags = useMemo(() => collectUniqueTags(posts, lang).slice(0, 16), [posts, lang]);

  const pushFilters = useCallback(
    (next: { tag?: string | null; category?: string | null; q?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      const setOrDelete = (key: string, value: string | null | undefined) => {
        if (value) params.set(key, value);
        else params.delete(key);
      };
      if ('tag' in next) setOrDelete('tag', next.tag);
      if ('category' in next) setOrDelete('category', next.category);
      if ('q' in next) setOrDelete('q', next.q);
      const qs = params.toString();
      router.push(qs ? `/blog?${qs}` : '/blog');
    },
    [router, searchParams],
  );

  let filtered = posts;
  if (tagFilter) {
    filtered = filtered.filter((post) => postMatchesTag(post, tagFilter, lang));
  }
  if (categoryFilter) {
    filtered = filtered.filter((post) => postMatchesCategory(post, categoryFilter));
  }
  if (queryFilter) {
    filtered = filtered.filter((post) => postMatchesQuery(post, queryFilter, lang));
  }

  const activeCategoryLabel = categoryFilter
    ? categories.find((c) => categorySlug(c.key) === categoryFilter)?.label ?? categoryFilter
    : null;

  const activeTagLabel = tagFilter
    ? allTags.find((t) => slugify(t) === tagFilter) ??
      posts
        .flatMap((p) => localizeTags(p.tags, p.tagsEn, lang))
        .find((t) => slugify(t) === tagFilter) ??
      tagFilter
    : null;

  const hasFilters = Boolean(tagFilter || categoryFilter || queryFilter);
  const featured = !hasFilters ? filtered.find((post) => post.featured) : undefined;
  const rest = filtered.filter((post) => post !== featured);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    pushFilters({ q: searchInput.trim() || null });
  };

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
          <div className="mb-10 space-y-6">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={labels.searchPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none focus:border-[var(--color-primary)]"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{ background: 'var(--color-primary)' }}
              >
                {labels.searchButton}
              </button>
            </form>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {labels.filterCategory}
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map(({ key, label }) => {
                  const slug = categorySlug(key);
                  const active = categoryFilter === slug;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => pushFilters({ category: active ? null : slug })}
                      className="text-sm px-3 py-1.5 rounded-full border transition-all"
                      style={{
                        background: active ? 'var(--color-primary)' : 'var(--color-bg-light)',
                        color: active ? 'white' : 'var(--color-primary)',
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                {labels.tagsTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const slug = slugify(tag);
                  const active = tagFilter === slug;
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => pushFilters({ tag: active ? null : slug })}
                      className="text-sm px-3 py-1.5 rounded-full border transition-all"
                      style={{
                        background: active ? 'var(--color-primary-light)' : 'white',
                        color: 'var(--color-primary)',
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {hasFilters && (
            <div
              className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3 border"
              style={{ background: 'var(--color-bg-light)', borderColor: 'var(--color-border)' }}
            >
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {queryFilter && (
                  <>
                    {labels.filterKeyword}: <strong style={{ color: 'var(--color-dark)' }}>{queryFilter}</strong>
                    {(tagFilter || categoryFilter) && ' · '}
                  </>
                )}
                {tagFilter && (
                  <>
                    {labels.filterTag}: <strong style={{ color: 'var(--color-dark)' }}>{activeTagLabel}</strong>
                    {categoryFilter && ' · '}
                  </>
                )}
                {categoryFilter && (
                  <>
                    {labels.filterCategory}: <strong style={{ color: 'var(--color-dark)' }}>{activeCategoryLabel}</strong>
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
