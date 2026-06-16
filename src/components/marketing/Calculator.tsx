'use client';

import { useState } from 'react';
import Link from 'next/link';

const RATES: Record<string, number> = {
  conservative: 0.12,
  balanced: 0.16,
  highyield: 0.20,
};

const PORTFOLIO_LABELS: Record<string, string> = {
  conservative: 'Konservativ (12%)',
  balanced: 'Ausgewogen (16%)',
  highyield: 'High-Yield (20%)',
};

function formatEur(n: number) {
  return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function Calculator() {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(60);
  const [portfolio, setPortfolio] = useState<'conservative' | 'balanced' | 'highyield'>('balanced');

  const rate = RATES[portfolio];
  const annualIncome = amount * rate;
  const monthlyIncome = annualIncome / 12;
  const totalReturn = (annualIncome * months) / 12;

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Berechnen Sie Ihre Rendite
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Sehen Sie, wie viel Ihr Kapital bei Rentiers erwirtschaftet.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8 shadow-xl border"
            style={{ background: 'white', borderColor: 'var(--color-border)' }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left — Inputs */}
              <div className="space-y-6">
                <p className="font-semibold text-lg" style={{ color: 'var(--color-dark)' }}>
                  Bitte Anlagebetrag und Laufzeit eingeben
                </p>

                {/* Portfolio selector */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    Portfolio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(RATES) as Array<keyof typeof RATES>).map((key) => (
                      <button
                        key={key}
                        onClick={() => setPortfolio(key as 'conservative' | 'balanced' | 'highyield')}
                        className="py-2 px-2 rounded-xl text-xs font-semibold border-2 transition-all"
                        style={{
                          borderColor: portfolio === key ? 'var(--color-primary)' : 'var(--color-border)',
                          background: portfolio === key ? 'var(--color-primary-light)' : 'transparent',
                          color: portfolio === key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {key === 'conservative' ? '12% p.a.' : key === 'balanced' ? '16% p.a.' : '20% p.a.'}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {PORTFOLIO_LABELS[portfolio]}
                  </p>
                </div>

                {/* Amount slider */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Einlagebetrag</span>
                    <span className="font-bold" style={{ color: 'var(--color-dark)' }}>
                      {formatEur(amount)} €
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={1000}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((amount - 5000) / (500000 - 5000)) * 100}%, var(--color-bg-light) ${((amount - 5000) / (500000 - 5000)) * 100}%, var(--color-bg-light) 100%)`,
                      accentColor: 'var(--color-primary)',
                    }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                    <span>5.000 €</span>
                    <span>500.000 €</span>
                  </div>
                </div>

                {/* Duration slider */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: 'var(--color-text-secondary)' }}>Laufzeit</span>
                    <span className="font-bold" style={{ color: 'var(--color-dark)' }}>
                      {months} Monate
                    </span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={120}
                    step={6}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((months - 12) / (120 - 12)) * 100}%, var(--color-bg-light) ${((months - 12) / (120 - 12)) * 100}%, var(--color-bg-light) 100%)`,
                      accentColor: 'var(--color-primary)',
                    }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                    <span>12 Monate</span>
                    <span>120 Monate</span>
                  </div>
                </div>
              </div>

              {/* Right — Results */}
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-xl p-4 flex-1"
                  style={{ background: 'var(--color-bg-light)' }}
                >
                  <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    Monatliches Einkommen
                  </p>
                  <p className="text-3xl font-extrabold mb-1" style={{ color: 'var(--color-dark)' }}>
                    {formatEur(monthlyIncome)} €
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    jeden Monat auf Ihre Karte
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ background: 'var(--color-bg-light)' }}
                >
                  <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    Jährliches Einkommen
                  </p>
                  <p className="text-2xl font-extrabold mb-1" style={{ color: 'var(--color-dark)' }}>
                    {formatEur(annualIncome)} €
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    pro Jahr garantiert
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
                >
                  <p className="text-sm mb-1 text-white/80">
                    Gesamtertrag nach {months} Monate
                  </p>
                  <p className="text-3xl font-extrabold mb-1 text-white">
                    {formatEur(totalReturn)} €
                  </p>
                  <p className="text-xs text-white/70">
                    Ihre ursprüngliche Einlage von {formatEur(amount)} €
                  </p>
                </div>

                <Link
                  href="/register"
                  className="block text-center py-3.5 rounded-xl font-semibold text-white mt-2 hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--color-dark)' }}
                >
                  Jetzt starten →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
