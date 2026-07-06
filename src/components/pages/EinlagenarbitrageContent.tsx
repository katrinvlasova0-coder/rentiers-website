'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

export default function EinlagenarbitrageContent() {
  const { t, p } = useLanguage();
  const c = p.einlagenarbitrage;

  return (
    <>
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
            {c.heroTitle}
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {c.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[720px] mx-auto px-6 space-y-12">
          <article itemScope itemType="https://schema.org/DefinedTerm">
            <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }} itemProp="name">
              {c.definitionTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }} itemProp="description">
              {c.definition}
            </p>
          </article>

          <div>
            <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
              {c.howTitle}
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {c.howPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
              {c.risksTitle}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {c.risksText}
            </p>
          </div>

          <div className="pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
              {c.linksTitle}
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/blog/einlagenarbitrage-erklaert"
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                {c.fullGuide}
              </Link>
              <Link
                href="/portfolios"
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                {c.portfolios}
              </Link>
              <Link
                href="/kalkulator"
                className="text-sm font-semibold hover:underline"
                style={{ color: 'var(--color-primary)' }}
              >
                {c.calculator}
              </Link>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
          >
            <LeadButton
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
              style={{ color: 'var(--color-primary)' }}
            >
              {t.nav.cta}
            </LeadButton>
          </div>
        </div>
      </section>
    </>
  );
}
