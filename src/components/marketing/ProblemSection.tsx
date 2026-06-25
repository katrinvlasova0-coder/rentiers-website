'use client';

import { TrendingDown, Lock, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap = {
  'trending-down': TrendingDown,
  lock: Lock,
  globe: Globe,
};

// Fallback icon keys to match translation items by index
const iconKeys = ['trending-down', 'lock', 'globe'] as const;

export default function ProblemSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            {t.problem.heading}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {t.problem.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {t.problem.items.map((p, i) => {
            const iconKey = iconKeys[i] ?? 'globe';
            const Icon = iconMap[iconKey];
            return (
              <div
                key={p.title}
                className="rounded-2xl p-6 hover:shadow-md transition-all border"
                style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(59,59,232,0.08)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Solution bridge */}
        <div
          className="text-center py-8 px-8 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
        >
          <p className="text-xl font-bold text-white mb-2">
            {t.problem.solution}
          </p>
          <p className="text-white/80 text-sm">
            {t.problem.solutionNote}
          </p>
        </div>
      </div>
    </section>
  );
}
