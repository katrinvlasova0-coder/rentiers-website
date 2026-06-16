'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Lock, Wifi, Battery, Home, BarChart2, Zap, Building2, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const phoneNavItems = [
  { Icon: Home, label: 'Home' },
  { Icon: BarChart2, label: 'Portfolio' },
  { Icon: Zap, label: 'Produkte' },
  { Icon: Building2, label: 'Banken' },
  { Icon: Menu, label: 'Menu' },
];

export default function HeroHome() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  useEffect(() => { setMounted(true); }, []);

  const stats = [
    { value: t.hero.statReturns, label: t.hero.statReturnsLabel },
    { value: t.hero.statBanks, label: t.hero.statBanksLabel },
    { value: t.hero.statCountries, label: t.hero.statCountriesLabel },
    { value: t.hero.statGuarantee, label: t.hero.statGuaranteeLabel },
  ];

  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
      style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 50%, #F7F7FF 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3B3BE8 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div
            className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
                 style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-primary)' }} />
              {t.hero.badge}
            </div>

            {/* H1 */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4"
              style={{ color: 'var(--color-dark)' }}
            >
              {t.hero.h1Line1}
              <br />
              <span style={{ color: 'var(--color-primary)' }}>{t.hero.h1Line2}</span>
            </h1>

            <p className="text-lg mb-8 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/kalkulator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={{ background: 'var(--color-primary)' }}
              >
                {t.hero.ctaPrimary}
                <span>→</span>
              </Link>
              <Link
                href="/wie-es-funktioniert"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 hover:bg-white/50 transition-all"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
              <Lock className="w-3 h-3 shrink-0" />
              <span>{t.hero.trustLine}</span>
            </div>
          </div>

          {/* Right — App mockup */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative">
              {/* Phone mockup */}
              <div
                className="w-64 rounded-3xl overflow-hidden shadow-2xl border border-white/80"
                style={{ background: 'var(--color-dark)' }}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-white text-xs font-medium">14:37</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-white/70" />
                    <Battery className="w-3 h-3 text-white/70" />
                  </div>
                </div>
                {/* Browser bar */}
                <div className="mx-4 mb-3 px-3 py-1.5 rounded-lg flex items-center gap-2"
                     style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Lock className="w-3 h-3 text-white/60" />
                  <span className="text-white/80 text-xs">Rentierspro.com/</span>
                </div>
                {/* App content */}
                <div className="bg-white mx-0 p-4 min-h-64">
                  {/* Welcome */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                         style={{ background: 'var(--color-primary)' }}>A</div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--color-dark)' }}>Willkommen zurück!</p>
                      <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Ariel Kharan</p>
                    </div>
                  </div>

                  {/* Balance card */}
                  <div className="rounded-2xl p-4 mb-4"
                       style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>Kontostand</p>
                    <p className="text-2xl font-bold mb-2" style={{ color: 'var(--color-dark)' }}>€ 0,00</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>IBAN</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--color-dark)' }}>DE89 3704 0044 0532</p>
                    <div className="mt-2 px-2 py-1 rounded text-xs font-medium inline-block"
                         style={{ background: 'var(--color-primary)', color: 'white' }}>
                      Rentiers Kart
                    </div>
                  </div>

                  {/* Deposit button */}
                  <button className="w-full py-3 rounded-2xl text-white text-sm font-semibold mb-4"
                          style={{ background: 'var(--color-dark)' }}>
                    + Einzahlen
                  </button>

                  {/* Transactions */}
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>Letzte Transaktionen</p>
                  {[
                    { label: 'Deposit via Debit Card', date: '23.12.2025', amount: '+ €25.000', positive: true },
                    { label: 'Deposit via Bank Transfer', date: '16.10.2025', amount: '+ €7.500', positive: true },
                  ].map((tx) => (
                    <div key={tx.label + tx.date} className="flex items-center justify-between py-2 border-b last:border-0"
                         style={{ borderColor: 'var(--color-border)' }}>
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--color-dark)' }}>{tx.label}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{tx.date}</p>
                      </div>
                      <span className="text-xs font-semibold"
                            style={{ color: tx.positive ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom nav */}
                <div className="bg-white border-t flex justify-around px-2 py-2"
                     style={{ borderColor: 'var(--color-border)' }}>
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

              {/* Floating calculator card */}
              <div
                className="absolute -left-20 top-24 w-52 rounded-2xl p-4 shadow-xl border border-white/80"
                style={{ background: 'white' }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-dark)' }}>
                  Bitte Anlagebetrag und Laufzeit eingeben
                </p>
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Einlagebetrag</span>
                    <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>50.000 €</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-light)' }}>
                    <div className="h-1.5 rounded-full w-3/4" style={{ background: 'var(--color-primary)' }} />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Laufzeit</span>
                    <span className="font-semibold" style={{ color: 'var(--color-dark)' }}>60 Monate</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-light)' }}>
                    <div className="h-1.5 rounded-full w-1/2" style={{ background: 'var(--color-primary)' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg p-2" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Monatliches Einkommen</p>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>500,00 €</p>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: 'var(--color-bg-light)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Gesamtertrag nach 60 Monate</p>
                    <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>30.000,00 €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-white/80 shadow-sm"
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
