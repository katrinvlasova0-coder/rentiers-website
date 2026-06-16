'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPostMeta } from '@/lib/blog';

function localizedMeta(post: BlogPostMeta, lang: 'de' | 'en') {
  if (lang === 'en') {
    return {
      title: post.titleEn ?? post.title,
      description: post.descriptionEn ?? post.description,
    };
  }
  return { title: post.title, description: post.description };
}

function BlogCard({ post, lang }: { post: BlogPostMeta; lang: 'de' | 'en' }) {
  const { p } = useLanguage();
  const labels = p.blog;
  const { title, description } = localizedMeta(post, lang);
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
            alt={title}
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
            {post.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
            {post.readTime} {labels.readTime}
          </span>
        </div>
        <h2
          className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors"
          style={{ color: 'var(--color-dark)' }}
        >
          {title}
        </h2>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {description}
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
  const featured = posts.find((post) => post.featured);
  const rest = posts.filter((post) => !post.featured);

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
                      <Image src={featured.coverImage} alt={localizedMeta(featured, lang).title} fill className="object-cover" priority />
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
                      {labels.featured} · {featured.category}
                    </span>
                    <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--color-dark)' }}>
                      {localizedMeta(featured, lang).title}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                      {localizedMeta(featured, lang).description}
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

          {posts.length === 0 && (
            <div className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
              <p className="font-semibold">{labels.empty}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
