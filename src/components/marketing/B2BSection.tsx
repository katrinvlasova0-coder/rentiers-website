'use client';

import { TrendingUp, Calendar, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ymGoal } from '@/lib/metrika';

const icons = [TrendingUp, Calendar, Globe];

export default function B2BSection() {
  const { t } = useLanguage();
  const b = t.b2b;

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {b.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {b.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {b.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6 bg-white border hover:shadow-lg transition-all"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(59,59,232,0.1)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/b2b/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{ background: 'var(--color-primary)' }}
            onClick={() => ymGoal('cta_b2b')}
          >
            {b.cta}
            <span>→</span>
          </a>
          <p className="text-sm mt-4" style={{ color: 'var(--color-text-secondary)' }}>
            {b.note}
          </p>
        </div>
      </div>
    </section>
  );
}
