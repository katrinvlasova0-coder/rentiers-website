'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';
import { useScrollGoal } from '@/hooks/useScrollGoal';
import { ymGoal } from '@/lib/metrika';

const RATES: Record<string, number> = {
  conservative: 0.12,
  balanced: 0.16,
  highyield: 0.20,
};

const YIELD_GOALS: Record<string, string> = {
  conservative: '12',
  balanced: '16',
  highyield: '20',
};

type PaymentFreq = 'monthly' | 'quarterly' | 'annual';

function formatNum(n: number, locale: string) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

type CalculatorProps = {
  showHeader?: boolean;
  compact?: boolean;
};

export default function Calculator({ showHeader = true, compact = false }: CalculatorProps) {
  const { t, lang } = useLanguage();
  const c = t.calculator;
  const locale = lang === 'de' ? 'de-DE' : 'en-US';
  const sectionRef = useScrollGoal('scroll_to_calculator');
  const amountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const termTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(60);
  const [portfolio, setPortfolio] = useState<'conservative' | 'balanced' | 'highyield'>('balanced');
  const [paymentFreq, setPaymentFreq] = useState<PaymentFreq>('quarterly');

  const rate = RATES[portfolio];
  const annualIncome = amount * rate;
  const periodIncome =
    paymentFreq === 'monthly' ? annualIncome / 12 : paymentFreq === 'quarterly' ? annualIncome / 4 : annualIncome;
  const totalReturn = (annualIncome * months) / 12;

  const portfolioLabels: Record<string, string> = {
    conservative: c.conservativeLabel,
    balanced: c.balancedLabel,
    highyield: c.highyieldLabel,
  };

  const periodLabel =
    paymentFreq === 'monthly' ? c.monthlyLabel : paymentFreq === 'quarterly' ? c.quarterlyLabel : c.annualLabel;
  const periodSubLabel =
    paymentFreq === 'monthly'
      ? c.monthlySubLabel
      : paymentFreq === 'quarterly'
        ? c.quarterlySubLabel
        : c.annualSubLabel;

  const freqOptions: { value: PaymentFreq; label: string }[] = [
    { value: 'monthly', label: c.freqMonthly },
    { value: 'quarterly', label: c.freqQuarterly },
    { value: 'annual', label: c.freqAnnual },
  ];

  const trackAmount = (value: number) => {
    if (amountTimer.current) clearTimeout(amountTimer.current);
    amountTimer.current = setTimeout(() => {
      ymGoal('calculator_amount_changed', { amount: value });
    }, 500);
  };

  const trackTerm = (value: number) => {
    if (termTimer.current) clearTimeout(termTimer.current);
    termTimer.current = setTimeout(() => {
      ymGoal('calculator_term_changed', { term: value });
    }, 500);
  };

  return (
    <section
      ref={sectionRef}
      id="kalkulator"
      className={compact ? 'pt-4 pb-16' : 'py-20'}
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {showHeader && (
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4"
              style={{ color: 'var(--color-dark)' }}
            >
              {c.heading}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              {c.subheading}
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl p-8 shadow-xl border"
            style={{ background: 'white', borderColor: 'var(--color-border)' }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left — Inputs */}
              <div className="space-y-6">
                <p className="font-semibold text-lg" style={{ color: 'var(--color-dark)' }}>
                  {c.inputPrompt}
                </p>

                {/* Portfolio selector */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {c.rateLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(RATES) as Array<keyof typeof RATES>).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setPortfolio(key as 'conservative' | 'balanced' | 'highyield');
                          ymGoal('calculator_yield_selected', { yield: YIELD_GOALS[key] });
                        }}
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
                    {portfolioLabels[portfolio]}
                  </p>
                </div>

                {/* Payment frequency */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {c.paymentFreqLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {freqOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setPaymentFreq(opt.value);
                          ymGoal('calculator_payout_changed', { period: opt.value });
                        }}
                        className="py-2 px-2 rounded-xl text-xs font-semibold border-2 transition-all"
                        style={{
                          borderColor: paymentFreq === opt.value ? 'var(--color-primary)' : 'var(--color-border)',
                          background: paymentFreq === opt.value ? 'var(--color-primary-light)' : 'transparent',
                          color: paymentFreq === opt.value ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount slider */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: 'var(--color-text-secondary)' }}>{c.amountLabel}</span>
                    <span className="font-bold" style={{ color: 'var(--color-dark)' }}>
                      {formatNum(amount, locale)} €
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={1000}
                    value={amount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setAmount(value);
                      trackAmount(value);
                    }}
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
                    <span style={{ color: 'var(--color-text-secondary)' }}>{c.durationLabel}</span>
                    <span className="font-bold" style={{ color: 'var(--color-dark)' }}>
                      {months} {c.months}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={120}
                    step={6}
                    value={months}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setMonths(value);
                      trackTerm(value);
                    }}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((months - 12) / (120 - 12)) * 100}%, var(--color-bg-light) ${((months - 12) / (120 - 12)) * 100}%, var(--color-bg-light) 100%)`,
                      accentColor: 'var(--color-primary)',
                    }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                    <span>12 {c.months}</span>
                    <span>120 {c.months}</span>
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
                    {periodLabel}
                  </p>
                  <p className="text-3xl font-extrabold mb-1" style={{ color: 'var(--color-dark)' }}>
                    {formatNum(periodIncome, locale)} €
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {periodSubLabel}
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ background: 'var(--color-bg-light)' }}
                >
                  <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {c.annualLabel}
                  </p>
                  <p className="text-2xl font-extrabold mb-1" style={{ color: 'var(--color-dark)' }}>
                    {formatNum(annualIncome, locale)} €
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {c.annualSubLabel}
                  </p>
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
                >
                  <p className="text-sm mb-1 text-white/80">
                    {c.totalLabel} — {months} {c.months}
                  </p>
                  <p className="text-3xl font-extrabold mb-1 text-white">
                    {formatNum(totalReturn, locale)} €
                  </p>
                  <p className="text-xs text-white/70">
                    {c.depositNote}: {formatNum(amount, locale)} €
                  </p>
                </div>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
                  {c.feeNote}
                </p>

                <LeadButton
                  className="block w-full text-center py-3.5 rounded-xl font-semibold text-white mt-2 hover:opacity-90 transition-opacity"
                  style={{ background: 'var(--color-dark)' }}
                  metrikaGoal="calculator_cta_click"
                  metrikaParams={{
                    amount,
                    term: months,
                    yield: YIELD_GOALS[portfolio],
                  }}
                  formSource="register"
                >
                  {c.cta} →
                </LeadButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
