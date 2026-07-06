'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { assetPath } from '@/lib/basePath';
import { SOCIAL_LINKS } from '@/constants/site';
import LeadButton from '@/components/ui/LeadButton';
import { ymGoal } from '@/lib/metrika';

const socialLinks = [
  {
    label: 'Facebook',
    href: SOCIAL_LINKS.facebook,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: SOCIAL_LINKS.x,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: SOCIAL_LINKS.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: 'var(--color-bg-light)' }}>
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath('/rentiers_logo.svg')}
                alt="Rentiers"
                className="h-7 w-auto object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t.footer.desc}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>{t.footer.links}</h3>
            <ul className="space-y-2.5">
              {t.footer.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:opacity-70"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>{t.footer.info}</h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Rentiers Global Corp. (USA)</li>
              <li>Rentiers Global Inc. (Canada)</li>
              {t.footer.phone && <li>{t.footer.phone}</li>}
              <li>
                <LeadButton
                  className="text-sm font-semibold hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                  formSource="contact"
                >
                  {t.footer.askUs}
                </LeadButton>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>
              {t.footer.social}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:shadow-md transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(59,59,232,0.08)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-10 pt-8 text-xs leading-relaxed"
          style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted, #9CA3AF)' }}
        >
          {t.footer.disclaimer}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
             style={{ color: 'var(--color-text-secondary)' }}>
          <span>{t.footer.copyright}</span>
          <div className="flex gap-4">
            <Link href="/datenschutz" className="hover:opacity-70" onClick={() => ymGoal('footer_datenschutz_click')}>{t.footer.privacy}</Link>
            <span>•</span>
            <Link href="/agb" className="hover:opacity-70" onClick={() => ymGoal('footer_terms_click')}>{t.footer.terms}</Link>
            <span>•</span>
            <Link href="/impressum" className="hover:opacity-70" onClick={() => ymGoal('footer_impressum_click')}>{t.footer.impressum}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
