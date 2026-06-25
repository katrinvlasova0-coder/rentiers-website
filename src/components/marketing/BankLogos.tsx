'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const regions = [
  { flag: '🇬🇪', country: 'Georgien', banks: '8+ Banken', rate: 'bis 14% p.a.' },
  { flag: '🇦🇲', country: 'Armenien', banks: '6+ Banken', rate: 'bis 12% p.a.' },
  { flag: '🇮🇱', country: 'Israel', banks: '5+ Banken', rate: 'bis 8% p.a.' },
  { flag: '🇷🇸', country: 'Serbien', banks: '4+ Banken', rate: 'bis 9% p.a.' },
  { flag: '🇹🇷', country: 'Türkei', banks: '6+ Banken', rate: 'bis 20% p.a.*' },
  { flag: '🇰🇿', country: 'Kasachstan', banks: '4+ Banken', rate: 'bis 15% p.a.' },
  { flag: '🇺🇿', country: 'Usbekistan', banks: '3+ Banken', rate: 'bis 18% p.a.' },
  { flag: '🌍', country: '+ 13 weitere', banks: '20+ Banken', rate: '' },
];

export default function BankLogos() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.banks.heading}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {t.banks.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {regions.map((region) => (
            <div
              key={region.country}
              className="flex flex-col items-center justify-center p-5 rounded-2xl border hover:shadow-md transition-all text-center"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
            >
              <span className="text-3xl mb-2">{region.flag}</span>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
                {region.country}
              </p>
              <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                {region.banks}
              </p>
              {region.rate && (
                <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                  {region.rate}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
          {t.banks.footnote}
        </p>
        <p className="text-center text-sm mt-2 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          {t.banks.subtext}
        </p>
      </div>
    </section>
  );
}
