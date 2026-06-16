'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { label: 'Portfolios', href: '/portfolios' },
  { label: 'Wie es funktioniert', href: '/wie-es-funktioniert' },
  { label: 'Kalkulator', href: '/kalkulator' },
  { label: 'Partner-Banken', href: '/partner-banken' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'var(--color-primary)' }}>
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-lg" style={{ color: 'var(--color-dark)' }}>
            Rentiers Pro
          </span>
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

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Anmelden
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ background: 'var(--color-primary)' }}
          >
            Konto eröffnen
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
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
          <Link
            href="/register"
            className="mt-2 text-center text-sm font-semibold px-5 py-3 rounded-xl text-white"
            style={{ background: 'var(--color-primary)' }}
            onClick={() => setMenuOpen(false)}
          >
            Konto eröffnen
          </Link>
        </div>
      )}
    </header>
  );
}
