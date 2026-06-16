import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPostSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { articleSchema, faqSchema, breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/layout/JsonLd';

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

  let meta;
  let content;
  try {
    const result = await getPostBySlug(slug);
    meta = result.meta;
    content = result.content;
  } catch {
    notFound();
  }

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === meta.category)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: meta.category, href: `/blog?category=${meta.category}` },
    { name: meta.title, href: `/blog/${slug}` },
  ];

  const schemas = [
    articleSchema(meta),
    breadcrumbSchema(breadcrumbs),
    ...(meta.faq && meta.faq.length > 0 ? [faqSchema(meta.faq)] : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />

      <article className="pt-24 pb-20">
        {/* Cover image */}
        {meta.coverImage && (
          <div className="relative h-72 md:h-96 mb-10">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-[800px] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'var(--color-text-secondary)' }}>
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

          {/* Category + readtime */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
            >
              {meta.category}
            </span>
            <span className="text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
              {meta.readTime} Min. Lesezeit
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
            style={{ color: 'var(--color-dark)' }}
          >
            {meta.title}
          </h1>

          {/* Author + date */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
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
                {new Date(meta.datePublished).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Content — rendered as raw markdown for simplicity */}
          <div
            className="prose prose-sm max-w-none leading-relaxed"
            style={{
              color: 'var(--color-text-primary)',
            }}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />

          {/* FAQ section */}
          {meta.faq && meta.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
                Häufige Fragen
              </h2>
              <div className="space-y-4">
                {meta.faq.map((item, idx) => (
                  <div
                    key={item.question ?? idx}
                    className="rounded-2xl p-5 border"
                    style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
                  >
                    <p className="font-bold text-sm mb-2" style={{ color: 'var(--color-dark)' }}>
                      {item.question}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
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

        {/* Related articles */}
        {related.length > 0 && (
          <div className="max-w-[1200px] mx-auto px-6 mt-16">
            <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              Weitere Artikel
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl p-5 border hover:shadow-md transition-all"
                  style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {p.category}
                  </span>
                  <p className="font-bold text-sm mt-1 mb-2 line-clamp-2" style={{ color: 'var(--color-dark)' }}>
                    {p.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {p.readTime} Min. →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-[800px] mx-auto px-6 mt-12">
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
          >
            <p className="text-white font-bold text-lg mb-2">
              Bereit, Ihr Geld für sich arbeiten zu lassen?
            </p>
            <p className="text-white/80 text-sm mb-4">
              12–20% Jahresrendite mit staatlichen Einlagengarantien.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
              style={{ color: 'var(--color-primary)' }}
            >
              Kostenloses Konto eröffnen →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

// Render a block of consecutive | lines as an HTML table
function renderTable(tableLines: string[]): string {
  const thStyle = 'padding:10px 14px;border:1px solid #E5E7EB;background:#F2F2FA;font-weight:700;text-align:left;font-size:0.875rem';
  const tdStyle = 'padding:10px 14px;border:1px solid #E5E7EB;font-size:0.875rem;vertical-align:top;line-height:1.5';
  // A separator row looks like |---|---|
  const isSep = (l: string) => /^\|[\s\-:|]+\|$/.test(l.replace(/[^|:\-\s]/g, ''));

  let html = '<div style="overflow-x:auto;margin:1.5rem 0"><table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB">';
  let isFirstRow = true;
  let bodyOpen = false;

  for (const line of tableLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (isSep(trimmed)) {
      // separator row — open tbody if not already
      if (!bodyOpen) { html += '<tbody>'; bodyOpen = true; }
      continue;
    }
    const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());
    if (isFirstRow && !bodyOpen) {
      html += '<thead><tr>' + cells.map(c => `<th style="${thStyle}">${c}</th>`).join('') + '</tr></thead>';
      isFirstRow = false;
    } else {
      if (!bodyOpen) { html += '<tbody>'; bodyOpen = true; }
      html += '<tr>' + cells.map(c => `<td style="${tdStyle}">${c}</td>`).join('') + '</tr>';
    }
  }

  if (bodyOpen) html += '</tbody>';
  html += '</table></div>';
  return html;
}

// Markdown → HTML converter with proper table support
function markdownToHtml(md: string): string {
  // Pass 1: extract table blocks line-by-line
  const lines = md.split('\n');
  const segments: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|')) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        block.push(lines[i]);
        i++;
      }
      segments.push(renderTable(block));
    } else {
      segments.push(lines[i]);
      i++;
    }
  }

  // Pass 2: standard markdown transforms (no table regex needed)
  return segments.join('\n')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;color:#1A1F3E;margin:1.5rem 0 0.5rem">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.4rem;font-weight:800;color:#1A1F3E;margin:2rem 0 0.75rem">$1</h2>')
    .replace(/^# (.+)$/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#F2F2FA;padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/^[-*] (.+)$/gm, '<li style="margin-bottom:4px">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-bottom:4px;list-style:decimal">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, (list) => `<ul style="padding-left:1.5rem;margin:0.75rem 0">${list}</ul>`)
    .replace(/^(?!<|\s*$)(.+)$/gm, '<p style="margin-bottom:0.75rem;line-height:1.7;color:#6B7280">$1</p>');
}
