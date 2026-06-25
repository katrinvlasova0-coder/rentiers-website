'use client';

import { TrendingUp, Users, Percent, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const icons = [TrendingUp, Users, Percent, Building2];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.testimonials.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {t.testimonials.subheading}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.testimonials.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.label}
                className="rounded-2xl p-6 border text-center hover:shadow-lg transition-all duration-300"
                style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'rgba(59,59,232,0.1)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <p className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-primary)' }}>
                  {item.value}
                </p>
                <p className="font-semibold text-sm mb-1" style={{ color: 'var(--color-dark)' }}>
                  {item.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
