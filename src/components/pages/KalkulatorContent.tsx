'use client';

import Calculator from '@/components/marketing/Calculator';
import CtaBanner from '@/components/marketing/CtaBanner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function KalkulatorContent() {
  const { p } = useLanguage();
  const c = p.calculator;

  return (
    <>
      <section
        className="pt-24 pb-4"
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
      <Calculator showHeader={false} compact />
      <CtaBanner />
    </>
  );
}
