'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FaqContent() {
  const { p } = useLanguage();
  const c = p.faq;

  return (
    <>
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
            {c.heroTitle}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-12">
            {c.categories.map((cat) => (
              <div key={cat.category}>
                <h2
                  className="text-xl font-extrabold mb-6 pb-2 border-b"
                  style={{ color: 'var(--color-dark)', borderColor: 'var(--color-border)' }}
                >
                  {cat.category}
                </h2>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl p-6 border"
                      style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
                    >
                      <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-dark)' }}>
                        {item.q}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
          >
            <p className="text-white font-bold text-lg mb-2">{c.ctaTitle}</p>
            <p className="text-white/80 text-sm mb-4">{c.ctaSubtitle}</p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
              style={{ color: 'var(--color-primary)' }}
            >
              {c.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
