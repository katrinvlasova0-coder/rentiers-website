'use client';

import { Shield, Bot, CreditCard, Globe, BarChart3, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  shield: Shield,
  cpu: Bot,
  'credit-card': CreditCard,
  globe: Globe,
  'bar-chart': BarChart3,
  'user-check': UserCheck,
};

export default function FeaturesGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.features.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {t.features.subheading}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.items.map((f) => {
            const Icon = iconMap[f.icon as keyof typeof iconMap] ?? Shield;
            return (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border"
                style={{ borderColor: 'transparent' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'var(--color-primary-light)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
