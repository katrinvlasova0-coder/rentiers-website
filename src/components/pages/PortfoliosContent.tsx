'use client';

import Link from 'next/link';
import CtaBanner from '@/components/marketing/CtaBanner';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

export default function PortfoliosContent() {
  const { p } = useLanguage();
  const c = p.portfolios;

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
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          {c.items.map((portfolio, idx) => (
            <div
              key={portfolio.slug}
              className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
                >
                  {portfolio.icon} {portfolio.badge}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {portfolio.name}
                </h2>
                <div className="text-5xl font-black mb-4" style={{ color: portfolio.color }}>
                  {portfolio.rate} p.a.
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {portfolio.desc}
                </p>
                <ul className="space-y-2 mb-8">
                  {portfolio.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      <span style={{ color: 'var(--color-success)' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <LeadButton
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: portfolio.gradient }}
                  metrikaGoal="portfolio_select"
                  metrikaParams={{ portfolio: portfolio.slug }}
                  formSource="register"
                >
                  {portfolio.name} {c.chooseButton}
                </LeadButton>
              </div>

              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-8 text-white" style={{ background: portfolio.gradient }}>
                    <p className="font-bold text-xl mb-1">{portfolio.name}</p>
                    <p className="text-6xl font-black mb-2">{portfolio.rate}</p>
                    <p className="text-white/80 text-sm">{c.annualReturn}</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: c.cardLabels.minDeposit, value: portfolio.minDeposit, note: 'minDepositNote' in portfolio ? portfolio.minDepositNote : undefined },
                        { label: c.cardLabels.duration, value: portfolio.duration },
                        { label: c.cardLabels.payment, value: portfolio.payment },
                        { label: c.cardLabels.minRating, value: portfolio.minRating },
                      ].map((row) => (
                        <div key={row.label} className="rounded-xl p-3" style={{ background: 'var(--color-bg-light)' }}>
                          <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{row.label}</p>
                          <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>{row.value}</p>
                          {row.note && (
                            <p className="text-[10px] mt-1 leading-snug" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                              * {row.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        {c.exampleCountries}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {portfolio.countries.map((country) => (
                          <span
                            key={country}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-secondary)' }}
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center" style={{ color: 'var(--color-dark)' }}>
            {c.comparisonTitle}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'var(--color-dark)', color: 'white' }}>
                  {c.tableHeaders.map((header, i) => (
                    <th
                      key={header}
                      className={`p-4 ${i === 0 ? 'text-left rounded-tl-xl' : 'text-center'} ${i === c.tableHeaders.length - 1 ? 'rounded-tr-xl' : ''}`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.tableRows.map((row, i) => (
                  <tr key={row[0]} style={{ background: i % 2 === 0 ? 'white' : 'var(--color-bg-light)' }}>
                    <td className="p-4 font-medium" style={{ color: 'var(--color-dark)' }}>{row[0]}</td>
                    <td className="p-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>{row[1]}</td>
                    <td className="p-4 text-center font-semibold" style={{ color: '#7C3AED' }}>{row[2]}</td>
                    <td className="p-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
