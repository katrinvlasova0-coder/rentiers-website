'use client';

import Link from 'next/link';
import CtaBanner from '@/components/marketing/CtaBanner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HowItWorksContent() {
  const { p } = useLanguage();
  const c = p.howItWorks;

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
          <div className="space-y-20">
            {c.steps.map((step, idx) => (
              <div
                key={step.num}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="text-6xl font-black mb-4 opacity-20" style={{ color: step.color }}>
                    {step.num}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={{ color: 'var(--color-dark)' }}>
                    {step.title}
                  </h2>
                  <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {step.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                          style={{ background: step.color }}
                        >
                          ✓
                        </span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <div
                    className="rounded-3xl p-10 flex items-center justify-center"
                    style={{ background: `${step.color}15` }}
                  >
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}AA 100%)` }}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center" style={{ color: 'var(--color-dark)' }}>
            {c.faqTitle}
          </h2>
          <div className="space-y-4">
            {c.faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl p-6 bg-white border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-dark)' }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href="/faq" style={{ color: 'var(--color-primary)' }} className="font-semibold hover:underline">
              {c.allFaq}
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
