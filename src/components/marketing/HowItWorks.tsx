'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const stepColors = [
  'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary) 100%)',
  'linear-gradient(135deg, var(--color-primary) 0%, #7C3AED 100%)',
  'linear-gradient(135deg, var(--color-primary) 0%, #0891B2 100%)',
];

const stepDetails = [
  'ID-Scan · Liveness-Check · Proof of Address',
  'SEPA · SWIFT · Debit-/Kreditkarte',
  'Quartalsweise Auszahlung · Rentiers Debitkarte',
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.howItWorks.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {t.howItWorks.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5"
            style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))', opacity: 0.3 }}
          />

          {t.howItWorks.steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {/* Step circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-6 shadow-lg relative z-10"
                style={{ background: stepColors[i] }}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-dark)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {step.desc}
              </p>
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
              >
                {stepDetails[i]}
              </span>
            </div>
          ))}
        </div>

        {/* Portfolio screen preview */}
        <div className="mt-16 flex justify-center">
          <div
            className="rounded-2xl p-6 max-w-sm w-full shadow-xl border"
            style={{ background: 'white', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold" style={{ color: 'var(--color-dark)' }}>Portfolioverteilung</h4>
              <span className="text-xs px-2 py-1 rounded-full"
                    style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-secondary)' }}>
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Investiert', value: '€25.000', color: 'var(--color-dark)' },
                { label: 'Aktueller Wert', value: '€25.000', color: 'var(--color-success)' },
                { label: 'Jahresrendite', value: '16%', color: 'var(--color-dark)' },
                { label: 'Tägliche Zinsen', value: '€11,00', color: 'var(--color-warning)' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-3" style={{ background: 'var(--color-bg-light)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</p>
                  <p className="font-bold text-sm" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Donut chart placeholder */}
            <div className="flex items-center justify-center py-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#EDEDFC" strokeWidth="4" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-primary)" strokeWidth="4"
                          strokeDasharray="80 20" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#7C3AED" strokeWidth="4"
                          strokeDasharray="20 80" strokeDashoffset="-80" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold" style={{ color: 'var(--color-dark)' }}>Verteilt</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-center text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--color-primary)' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Israel (80%)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#7C3AED' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Georgien (20%)</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
