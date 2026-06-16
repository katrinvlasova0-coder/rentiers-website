import type { Metadata } from 'next';
import Calculator from '@/components/marketing/Calculator';
import CtaBanner from '@/components/marketing/CtaBanner';

export const metadata: Metadata = {
  title: 'Renditenkalkulator — Rentiers Pro | Berechnen Sie Ihre Festgeld-Rendite',
  description:
    'Berechnen Sie Ihre Rendite bei Rentiers Pro. Geben Sie Einlagebetrag und Laufzeit ein und sehen Sie sofort Ihr monatliches Einkommen, Jahresertrag und Gesamtrendite.',
  alternates: { canonical: 'https://rentierspro.com/kalkulator' },
};

export default function KalkulatorPage() {
  return (
    <>
      <section
        className="pt-24 pb-8"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Renditenkalkulator
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Berechnen Sie, wie viel Ihr Kapital bei Rentiers erwirtschaftet — monatlich, jährlich
            und über die gesamte Laufzeit.
          </p>
        </div>
      </section>
      <Calculator />
      <CtaBanner />
    </>
  );
}
