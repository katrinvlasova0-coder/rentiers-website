import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import type { BlogPostMeta } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Rentiers Pro | Festgeld, passive Einkommen, Einlagenarbitrage',
  description:
    'Expertenwissen zu Festgeld, passivem Einkommen, Einlagenarbitrage und globalen Bankzinsen. Tipps und Guides für Anleger.',
  alternates: { canonical: 'https://rentierspro.com/blog' },
};

function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {post.coverImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      {!post.coverImage && (
        <div
          className="h-44 flex items-center justify-center text-4xl"
          style={{ background: 'var(--color-bg-light)' }}
        >
          💶
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
            {post.readTime} Min. Lesezeit
          </span>
        </div>
        <h2
          className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors"
          style={{ color: 'var(--color-dark)' }}
        >
          {post.title}
        </h2>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
          {post.description}
        </p>
        <p className="text-xs mt-3" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
          {new Date(post.datePublished).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <section
        className="pt-24 pb-12"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Wissen für Anleger
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Guides zu Festgeld, passivem Einkommen und globaler Einlagenarbitrage.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Featured post */}
          {featured && (
            <div className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-3xl overflow-hidden border hover:shadow-xl transition-all"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="grid md:grid-cols-2">
                  {featured.coverImage ? (
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  ) : (
                    <div
                      className="h-64 md:h-auto flex items-center justify-center text-6xl"
                      style={{ background: 'var(--color-bg-light)' }}
                    >
                      💶
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span
                      className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                      style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                    >
                      ⭐ Featured · {featured.category}
                    </span>
                    <h2
                      className="text-2xl font-extrabold mb-3"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                      {featured.description}
                    </p>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      Weiterlesen →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20" style={{ color: 'var(--color-text-secondary)' }}>
              <p className="text-4xl mb-4">✍️</p>
              <p className="font-semibold">Artikel werden bald veröffentlicht.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
