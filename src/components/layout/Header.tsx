'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LeadButton from '@/components/ui/LeadButton';
import { assetPath } from '@/lib/basePath';
import { ymGoal } from '@/lib/metrika';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, toggle } = useLanguage();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: t.nav.portfolios, href: '/portfolios' },
    { label: t.nav.howItWorks, href: '/wie-es-funktioniert' },
    { label: t.nav.calculator, href: '/kalkulator' },
    { label: t.nav.partnerBanks, href: '/partner-banken' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.impressum, href: '/impressum' },
    { label: t.nav.blog, href: '/blog' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-sm border-b border-gray-100' : 'border-b border-gray-100/60'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetPath('/rentiers_logo.svg')}
            alt="Rentiers"
            className="h-9 w-auto object-contain object-left"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Language switcher */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => {
              ymGoal('language_switch', { to: lang === 'de' ? 'en' : 'de' });
              toggle();
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-secondary)',
              background: 'transparent',
            }}
            aria-label="Switch language"
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          <LeadButton
            className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
            style={{ color: 'var(--color-text-secondary)' }}
            metrikaGoal="cta_login"
            formSource="login"
          >
            {t.nav.login}
          </LeadButton>
          <LeadButton
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: 'var(--color-primary)' }}
            metrikaGoal="cta_register_navbar"
            formSource="register"
          >
            {t.nav.cta}
          </LeadButton>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile language toggle */}
          <button
            onClick={() => {
              ymGoal('language_switch', { to: lang === 'de' ? 'en' : 'de' });
              toggle();
            }}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü öffnen"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--color-dark)' }}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--color-dark)' }}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--color-dark)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-2 border-b border-gray-50"
              style={{ color: 'var(--color-text-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LeadButton
            className="mt-2 w-full inline-flex items-center justify-center text-center text-sm font-semibold px-5 py-3 rounded-xl text-white"
            style={{ background: 'var(--color-primary)' }}
            onClick={() => setMenuOpen(false)}
            metrikaGoal="cta_register_navbar"
            formSource="register"
          >
            {t.nav.cta}
          </LeadButton>
        </div>
      )}
    </header>
  );
}
