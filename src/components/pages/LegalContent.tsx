'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

type LegalKey = 'privacy' | 'terms' | 'impressum';

export default function LegalContent({ page }: { page: LegalKey }) {
  const { p } = useLanguage();
  const c = p[page];

  return (
    <>
      <section className="pt-24 pb-8" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-dark)' }}>
            {c.title}
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {c.updated}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[800px] mx-auto px-6 space-y-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {c.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                {section.title}
              </h2>
              {'contact' in section && section.contact ? (
                <LeadButton
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {p.leadForm.askUs}
                </LeadButton>
              ) : (
                <p className="whitespace-pre-line">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
