'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { stepIllustrations } from '@/components/marketing/StepIllustrations';

export default function HowItWorks() {
  const { t } = useLanguage();
  const hw = t.howItWorks;

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {hw.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {hw.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hw.steps.map((step, i) => (
            <div key={step.num} className="flex flex-col rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--color-border)', background: 'white' }}>
              {/* Platform screenshot */}
              <div
                className="relative w-full h-56 overflow-hidden"
                style={{ background: '#0B1A33' }}
              >
                {(() => {
                  const Illustration = stepIllustrations[i];
                  return <Illustration className="w-full h-full" />;
                })()}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    boxShadow: 'inset 0 -24px 32px -12px rgba(0,0,0,0.35)',
                  }}
                  aria-hidden
                />
                {/* Step number badge */}
                <div
                  className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-extrabold shadow-lg"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {step.num}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {step.desc}
                </p>
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full self-start"
                  style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
                >
                  {hw.stepDetails[i]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio screen preview */}
        <div className="mt-16">
          <div
            className="rounded-2xl p-6 md:p-8 w-full shadow-xl border"
            style={{ background: 'white', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>{hw.portfolioLabel}</h4>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-secondary)' }}>
                Live
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: hw.invested, value: '€25.000', color: 'var(--color-dark)' },
                  { label: hw.currentValue, value: '€25.000', color: 'var(--color-success)' },
                  { label: hw.annualReturn, value: '16%', color: 'var(--color-dark)' },
                  { label: hw.dailyInterest, value: '€11,00', color: 'var(--color-warning)' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-4" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</p>
                    <p className="font-bold text-lg" style={{ color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-36 h-36 mb-4">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#EDEDFC" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-primary)" strokeWidth="4"
                            strokeDasharray="80 20" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#7C3AED" strokeWidth="4"
                            strokeDasharray="20 80" strokeDashoffset="-80" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-center px-2" style={{ color: 'var(--color-dark)' }}>{hw.distributed}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'var(--color-primary)' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>Israel (80%)</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#7C3AED' }} />
                    <span style={{ color: 'var(--color-text-secondary)' }}>Georgia (20%)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
