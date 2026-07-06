'use client';

import Link from 'next/link';
import { Shield, Scale, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollGoal } from '@/hooks/useScrollGoal';
import { ymGoal } from '@/lib/metrika';

const portfolioIcons = [Shield, Scale, TrendingUp];
const gradients = [
  'linear-gradient(135deg, #3B3BE8 0%, #5B5BF0 100%)',
  'linear-gradient(135deg, #7C3AED 0%, #9D5CF0 100%)',
  'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
];
const badges = ['Am sichersten', 'Beliebtestes Portfolio', 'Höchste Rendite'];
const badgesEn = ['Safest', 'Most Popular', 'Highest Return'];

const portfolioSlugs = ['konservativ', 'ausgewogen', 'high-yield'];

export default function PortfoliosSection() {
  const { t, lang } = useLanguage();
  const sectionRef = useScrollGoal('scroll_to_portfolios');

  const portfolioData = [
    {
      ...t.portfolios.conservative,
      gradient: gradients[0],
      badge: lang === 'de' ? badges[0] : badgesEn[0],
    },
    {
      ...t.portfolios.balanced,
      gradient: gradients[1],
      badge: lang === 'de' ? badges[1] : badgesEn[1],
    },
    {
      ...t.portfolios.highyield,
      gradient: gradients[2],
      badge: lang === 'de' ? badges[2] : badgesEn[2],
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.portfolios.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {t.portfolios.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolioData.map((p, i) => {
            const Icon = portfolioIcons[i];
            return (
              <div
                key={p.name}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {/* Header */}
                <div className="p-6 text-white" style={{ background: p.gradient }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <p className="font-bold text-lg mb-1">{p.name}</p>
                  <p className="text-4xl font-extrabold">{p.badge === badges[0] || p.badge === badgesEn[0] ? '12% p.a.' : p.badge === badges[1] || p.badge === badgesEn[1] ? '16% p.a.' : '20% p.a.'}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {p.desc}
                  </p>

                  <div className="space-y-3 mb-6">
                    {[
                      { label: t.portfolios.minDepositLabel, value: p.minDeposit, note: 'minDepositNote' in p ? p.minDepositNote : undefined },
                      { label: t.portfolios.durationLabel, value: p.duration },
                      { label: t.portfolios.paymentLabel, value: p.payment },
                    ].map((row) => (
                      <div key={row.label}>
                        <div
                          className="flex justify-between items-center py-2 border-b"
                          style={{ borderColor: 'var(--color-border)' }}
                        >
                          <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {row.label}
                          </span>
                          <span className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                            {row.value}
                          </span>
                        </div>
                        {row.note && (
                          <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                            * {row.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/portfolios"
                    onClick={() => ymGoal('portfolio_select', { portfolio: portfolioSlugs[i] })}
                    className="block w-full text-center py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ background: p.gradient }}
                  >
                    {t.portfolios.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
          * {lang === 'de'
            ? 'Renditen basieren auf historischen Durchschnittswerten. Staatliche Garantien variieren je nach Land und Partnerbank. Bitte lesen Sie die Risikohinweise.'
            : 'Returns are based on historical averages. Government guarantees vary by country and partner bank. Please read the risk disclosures.'}
        </p>
      </div>
    </section>
  );
}
