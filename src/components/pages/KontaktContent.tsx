'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';
import { CONTACT_EMAIL } from '@/constants/site';

export default function KontaktContent() {
  const { p } = useLanguage();
  const c = p.kontakt;

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
        <div className="max-w-[640px] mx-auto px-6">
          <div
            className="rounded-2xl border p-8 mb-8 text-center"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {c.emailLabel}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg font-bold hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              {c.email}
            </a>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-extrabold mb-2" style={{ color: 'var(--color-dark)' }}>
              {c.formTitle}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {c.formSubtitle}
            </p>
            <LeadButton
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm"
              style={{ background: 'var(--color-primary)' }}
            >
              {c.cta}
            </LeadButton>
          </div>

          <p className="text-center text-sm mt-10" style={{ color: 'var(--color-text-secondary)' }}>
            <Link href="/faq" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
              FAQ
            </Link>
            {' · '}
            <Link href="/impressum" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
              Impressum
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
