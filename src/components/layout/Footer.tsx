'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { assetPath } from '@/lib/basePath';

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'F' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'YouTube', href: '#', icon: '▶' },
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
              <li>info@rentierspro.com</li>
              {t.footer.phone && <li>{t.footer.phone}</li>}
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
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold hover:shadow-md transition-all hover:-translate-y-0.5"
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
            <Link href="/datenschutz" className="hover:opacity-70">{t.footer.privacy}</Link>
            <span>•</span>
            <Link href="/agb" className="hover:opacity-70">{t.footer.terms}</Link>
            <span>•</span>
            <Link href="/impressum" className="hover:opacity-70">{t.footer.impressum}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
