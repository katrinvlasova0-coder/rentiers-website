import Link from 'next/link';

const footerLinks = [
  { label: 'Partner-Banken', href: '/partner-banken' },
  { label: 'Kalkulator', href: '/kalkulator' },
  { label: 'Portfolios', href: '/portfolios' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Über uns', href: '/ueber-uns' },
];

const socialLinks = [
  { label: 'Facebook', href: '#', icon: 'F' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Twitter', href: '#', icon: 'X' },
  { label: 'YouTube', href: '#', icon: '▶' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-bg-light)' }}>
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg" style={{ color: 'var(--color-dark)' }}>
                Rentiers Pro
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Rentiers ist die erste digitale Plattform für Einlagenarbitrage und -handel, die es
              Nutzern ermöglicht, durch Einlagen bei großen Banken auf der ganzen Welt ohne Risiko
              ein beträchtliches passives Einkommen zu erzielen.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              1368 Ville Haute Luxembourg&nbsp;&nbsp;Land , Luxemburg
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>Links</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
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
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>Info</h3>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li>Phone: +49 (0) 69 1234 5678</li>
              <li>Firmenname: Rentiers SA</li>
              <li>Geschäftsführer: Max Müller, Pierre Dijon</li>
              <li>Handelsregister: LU 127-18093451</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--color-dark)' }}>
              Soziale Netzwerke
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
          Rentiers SA ist als Money Services Business (MSB) in Kanada und den USA lizenziert.
          Investitionen sind mit Risiken verbunden. Vergangene Renditen sind keine Garantie für
          zukünftige Ergebnisse. Die Höhe der staatlichen Einlagengarantien variiert je nach Land
          und Partnerbank. Bitte lesen Sie die Risikohinweise vor der Anlage.
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm"
             style={{ color: 'var(--color-text-secondary)' }}>
          <span>© 2025 Rentiers. Alle Rechte vorbehalten.</span>
          <div className="flex gap-4">
            <Link href="/datenschutz" className="hover:opacity-70">Datenschutzrichtlinie</Link>
            <span>•</span>
            <Link href="/agb" className="hover:opacity-70">Geschäftsbedingungen</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
