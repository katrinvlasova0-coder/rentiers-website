'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-14 md:py-20 text-center"
          style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, #2D3360 50%, #1A1F3E 100%)' }}
        >
          {/* SVG line pattern */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.12 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Radial overlays */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(59,59,232,0.4) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t.cta.heading}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              {t.cta.subheading}
            </p>
            <LeadButton
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              style={{ background: 'var(--color-primary)' }}
            >
              {t.cta.button}
              <span>→</span>
            </LeadButton>
            <p className="text-white/50 text-sm mt-4">
              {t.cta.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
