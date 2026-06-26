'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

export default function PartnerBankenContent() {
  const { p } = useLanguage();
  const c = p.partnerBanken;

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
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {c.banks.map((bank) => (
              <div
                key={bank.name}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border hover:shadow-md transition-all text-center"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-dark)' }}>
                  {bank.name}
                </p>
                <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {bank.country}
                </p>
                {bank.rating && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
                  >
                    {bank.rating}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
            {c.moreBanks}
          </p>
        </div>
      </section>

      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center" style={{ color: 'var(--color-dark)' }}>
            {c.criteriaTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.criteria.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          {c.ctaTitle}
        </h2>
        <LeadButton
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ background: 'var(--color-primary)' }}
        >
          {c.ctaButton}
        </LeadButton>
      </section>
    </>
  );
}
