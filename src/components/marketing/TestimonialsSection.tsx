'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const AVATARS = [
  { letter: 'T', color: '#3B3BE8' },
  { letter: 'I', color: '#7C3AED' },
  { letter: 'K', color: '#0891B2' },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
}

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

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((item, i) => (
            <div
              key={item.name}
              className="rounded-2xl p-6 border hover:shadow-lg transition-all duration-300"
              style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
            >
              <Stars count={item.rating} />
              <p
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'var(--color-text-primary)' }}
              >
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: AVATARS[i].color }}
                >
                  {AVATARS[i].letter}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--color-dark)' }}>
                    {item.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
