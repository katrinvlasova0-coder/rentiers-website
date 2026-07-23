'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Lock, Wifi, Battery, Home, BarChart2, Zap, Building2, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';
import { ymGoal } from '@/lib/metrika';

export default function HeroHome() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const ph = t.hero.phone;
  useEffect(() => { setMounted(true); }, []);

  const phoneNavItems = [
    { Icon: Home, label: ph.navHome },
    { Icon: BarChart2, label: ph.navPortfolio },
    { Icon: Zap, label: ph.navProducts },
    { Icon: Building2, label: ph.navBanks },
    { Icon: Menu, label: ph.navMenu },
  ];

  const stats = [
    { value: t.hero.statReturns, label: t.hero.statReturnsLabel },
    { value: t.hero.statBanks, label: t.hero.statBanksLabel },
    { value: t.hero.statCountries, label: t.hero.statCountriesLabel },
    { value: t.hero.statGuarantee, label: t.hero.statGuaranteeLabel },
  ];

  return (
    <section
      className="relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-24"
      style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 50%, #F7F7FF 100%)' }}
    >
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B3BE8 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className={`relative transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div
              className="hidden md:block absolute -left-16 lg:-left-24 -top-10 pointer-events-none select-none opacity-[0.08] z-0"
              aria-hidden="true"
            >
              <Image src="/rentiers_icon.svg" alt="" width={420} height={420} className="object-contain" priority />
            </div>

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-primary)' }} />
                {t.hero.badge}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4" style={{ color: 'var(--color-dark)' }}>
                {t.hero.h1Line1}
                <br />
                <span style={{ color: 'var(--color-primary)' }}>{t.hero.h1Line2}</span>
              </h1>

              <p className="text-lg mb-8 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full">
                <LeadButton
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ background: 'var(--color-primary)' }}
                  metrikaGoal="cta_register_hero"
                  formSource="register"
                >
                  {t.hero.ctaPrimary}
                  <span>→</span>
                </LeadButton>
                <Link
                  href="#kalkulator"
                  onClick={() => ymGoal('cta_calculator_hero')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-center border-2 hover:bg-white/50 transition-all"
                  style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                  <Lock className="w-3 h-3 shrink-0" />
                  <span>{t.hero.trustLine}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['FinCEN', 'FINTRAC', 'CRS-compliant', 'AES-256', 'GDPR'].map((badge) => (
                    <span
                      key={badge}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{ background: 'rgba(59,59,232,0.08)', color: 'var(--color-primary)' }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 overflow-hidden ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative max-w-full">
              <div
                className="relative z-10 w-56 sm:w-64 mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/80"
                style={{ background: 'var(--color-dark)' }}
              >
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-white text-xs font-medium">14:37</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-white/70" />
                    <Battery className="w-3 h-3 text-white/70" />
                  </div>
                </div>
                <div
                  className="mx-4 mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <Lock className="w-3 h-3 text-white/60 shrink-0" />
                  <Image src="/favicon.svg" alt="" width={14} height={14} className="shrink-0 rounded-sm" />
                  <span className="text-white/80 text-xs truncate">rentiers.net</span>
                </div>
                <div className="bg-white mx-0 p-4 min-h-64">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0"
                      style={{ background: 'var(--color-bg-light)' }}
                    >
                      <Image src="/rentiers_icon.svg" alt="Rentiers" width={28} height={28} className="object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--color-dark)' }}>{ph.welcome}</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>John Doe</p>
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{ph.balance}</p>
                    <p className="text-2xl font-bold mb-2" style={{ color: 'var(--color-dark)' }}>€ 24.680,00</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{ph.iban}</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--color-dark)' }}>DE89 3704 0044 0532</p>
                    <div
                      className="mt-2 px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1.5"
                      style={{ background: 'var(--color-primary)', color: 'white' }}
                    >
                      <Image src="/favicon.svg" alt="" width={12} height={12} className="rounded-sm shrink-0" />
                      {ph.card}
                    </div>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-white text-xs font-semibold"
                      style={{ background: 'var(--color-dark)' }}
                    >
                      {ph.deposit}
                    </button>
                    <button
                      type="button"
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold border"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-dark)' }}
                    >
                      {ph.spend}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2 rounded-xl text-xs font-semibold mb-4"
                    style={{ background: 'var(--color-bg-light)', color: 'var(--color-primary)' }}
                  >
                    {ph.reinvest}
                  </button>

                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>{ph.transactions}</p>
                  {[
                    { label: ph.txCard, date: '23.12.2025', amount: '+ €25.000', positive: true },
                    { label: ph.txTransfer, date: '16.10.2025', amount: '+ €7.500', positive: true },
                  ].map((tx) => (
                    <div
                      key={tx.label + tx.date}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--color-dark)' }}>{tx.label}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{tx.date}</p>
                      </div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: tx.positive ? 'var(--color-success)' : 'var(--color-warning)' }}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  className="bg-white border-t flex justify-around px-2 py-2"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {phoneNavItems.map(({ Icon, label }, idx) => (
                    <span
                      key={label}
                      className="flex flex-col items-center gap-0.5"
                      style={{ color: idx === 0 ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span style={{ fontSize: '9px', fontWeight: idx === 0 ? 600 : 400 }}>{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="hidden lg:block absolute -left-20 top-24 z-10 w-52 rounded-2xl p-4 shadow-xl border border-white/80"
                style={{ background: 'white' }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-dark)' }}>
                  {ph.calcHint}
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{ph.amount}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>50.000 €</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-light)' }}>
                    <div className="h-1.5 rounded-full w-3/4" style={{ background: 'var(--color-primary)' }} />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{ph.term}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>60 {ph.months}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-light)' }}>
                    <div className="h-1.5 rounded-full w-1/2" style={{ background: 'var(--color-primary)' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg p-2" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{ph.monthlyIncome}</p>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>500,00 €</p>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      {ph.totalReturn} 60 {ph.months}
                    </p>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>30.000,00 €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border border-white/80 shadow-sm"
          style={{ background: 'rgba(255,255,255,0.8)' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold mb-1" style={{ color: 'var(--color-primary)' }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
