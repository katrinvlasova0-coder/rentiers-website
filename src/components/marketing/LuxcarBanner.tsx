'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CAR_IMAGE =
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80&auto=format&fit=crop';

export default function LuxcarBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-8 md:py-14" aria-label="LUXCAR">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <Link
          href="/luxcar-a/"
          className="group block rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(11,14,36,0.55)]"
        >
          <div
            className="relative grid md:grid-cols-[1.1fr_0.9fr] min-h-[240px] sm:min-h-[280px] md:min-h-[320px]"
            style={{
              background:
                'linear-gradient(135deg, #0B0E24 0%, #12162F 45%, #1A1530 100%)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background:
                  'radial-gradient(circle at 15% 50%, rgba(198,167,104,0.22) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(85,85,240,0.18) 0%, transparent 40%)',
              }}
            />

            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 text-left">
              <div className="inline-flex items-center gap-2 w-fit mb-5 px-3 py-1.5 rounded-full border border-[#C6A768]/35 bg-[#C6A768]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#E8D5A8]" aria-hidden="true" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8D5A8]">
                  {t.luxcar.badge}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-white leading-tight mb-3 max-w-lg">
                {t.luxcar.title}{' '}
                <span className="text-[#E8D5A8]">{t.luxcar.highlight}</span>
              </h2>

              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md mb-6">
                {t.luxcar.desc}
              </p>

              <span className="inline-flex items-center justify-center gap-2 w-full sm:w-fit px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide text-center text-[#0B0E24] bg-gradient-to-r from-[#F2E4BC] via-[#D4B87A] to-[#C6A768] group-hover:gap-3 transition-all">
                {t.luxcar.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>

            <div className="relative min-h-[200px] md:min-h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E24] via-[#0B0E24]/40 to-transparent z-10 md:w-2/5" />
              <Image
                src={CAR_IMAGE}
                alt={t.luxcar.imageAlt}
                fill
                className="object-cover object-center md:object-[65%_center] scale-105 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 520px"
              />
              <div className="absolute bottom-5 right-5 z-20 hidden md:flex flex-col items-end">
                <span className="text-3xl font-black tracking-[0.28em] text-white">
                  LUX<span className="text-[#E8D5A8]">CAR</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                  {t.luxcar.tagline}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
