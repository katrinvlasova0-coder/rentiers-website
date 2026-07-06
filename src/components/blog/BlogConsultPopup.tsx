'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitLead } from '@/lib/submitLead';
import { ymGoal } from '@/lib/metrika';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ASSET_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=240&q=80&auto=format&fit=crop',
    alt: 'Real estate',
    className: 'w-12 h-12 -rotate-6',
  },
  {
    src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80&auto=format&fit=crop',
    alt: 'Luxury car',
    className: 'w-10 h-10 rotate-3 mt-3',
  },
  {
    src: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=220&q=80&auto=format&fit=crop',
    alt: 'Yacht',
    className: 'w-14 h-14 -rotate-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80&auto=format&fit=crop',
    alt: 'Bank building',
    className: 'w-9 h-9 rotate-6 mt-4',
  },
  {
    src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=180&q=80&auto=format&fit=crop',
    alt: 'Property',
    className: 'w-11 h-11 -rotate-3 mt-1',
  },
] as const;

interface Props {
  slug: string;
}

export default function BlogConsultPopup({ slug }: Props) {
  const { p } = useLanguage();
  const copy = p.blog.consultPopup;

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const shownTracked = useRef(false);

  useEffect(() => {
    if (dismissed) return;

    const checkScroll = () => {
      if (dismissed || open) return;
      const threshold = window.innerHeight * 2;
      if (window.scrollY >= threshold) {
        setOpen(true);
        if (!shownTracked.current) {
          shownTracked.current = true;
          ymGoal('blog_consult_popup_shown', { slug });
        }
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, [dismissed, open, slug]);

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
    ymGoal('blog_consult_popup_closed', { slug });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setError(copy.errEmail);
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const page =
        typeof window !== 'undefined'
          ? `${window.location.hostname}${window.location.pathname}`
          : `rentiers.net/blog/${slug}`;

      await submitLead({
        name: '—',
        email: trimmed,
        phone: '—',
        message: copy.leadMessage,
        source: `blog_consult_popup | ${page}`,
      });

      ymGoal('blog_consult_popup_submit', { slug });
      setSubmitted(true);
      setEmail('');
    } catch {
      setError(copy.errSubmit);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[90] sm:left-auto sm:right-6 sm:max-w-[380px] transition-all duration-300 ease-out"
      role="dialog"
      aria-modal="false"
      aria-labelledby="blog-consult-title"
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl border bg-white"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/90 hover:bg-white shadow-sm transition-colors"
          aria-label={copy.close}
        >
          <X className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
        </button>

        <div
          className="flex items-end justify-center gap-1.5 px-6 pt-5 pb-3"
          style={{
            background: 'linear-gradient(180deg, #eef0ff 0%, #f8f9ff 70%, #ffffff 100%)',
          }}
          aria-hidden="true"
        >
          {ASSET_IMAGES.map((item) => (
            <div
              key={item.alt}
              className={`relative shrink-0 rounded-xl overflow-hidden shadow-md ring-2 ring-white ${item.className}`}
            >
              <Image src={item.src} alt="" width={56} height={56} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          {submitted ? (
            <div className="text-center py-4 px-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                style={{ background: 'rgba(59,59,232,0.12)', color: 'var(--color-primary)' }}
              >
                ✓
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                {copy.thanks}
              </p>
            </div>
          ) : (
            <>
              <h2
                id="blog-consult-title"
                className="text-base font-bold leading-snug mb-2 pr-8"
                style={{ color: 'var(--color-dark)' }}
              >
                {copy.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {copy.subtitle}
              </p>

              <form onSubmit={handleSubmit} className="flex gap-2" noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={copy.emailPlaceholder}
                  className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[var(--color-primary)] bg-white"
                  style={{ borderColor: error ? '#f87171' : 'var(--color-border)' }}
                  autoComplete="email"
                  disabled={submitting}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {submitting ? copy.sending : copy.submit}
                </button>
              </form>
              {error && (
                <p className="mt-2 text-xs text-red-500" role="alert">
                  {error}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
