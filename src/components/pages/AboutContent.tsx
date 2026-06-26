'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

export default function AboutContent() {
  const { p } = useLanguage();
  const c = p.about;

  return (
    <>
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, #2D3360 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{c.heroTitle}</h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">{c.heroSubtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
              {c.missionTitle}
            </h2>
            {c.mission.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-2xl p-8 mb-16" style={{ background: 'var(--color-bg-light)' }}>
            <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              {c.companyTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.companyRows.map((row) => (
                <div key={row.label}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {row.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              {c.valuesTitle}
            </h2>
            <div className="space-y-4">
              {c.values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div className="w-1 rounded-full shrink-0" style={{ background: 'var(--color-primary)' }} />
                  <div>
                    <p className="font-bold mb-1" style={{ color: 'var(--color-dark)' }}>{v.title}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <LeadButton
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: 'var(--color-primary)' }}
            >
              {c.ctaButton}
            </LeadButton>
          </div>
        </div>
      </section>
    </>
  );
}
