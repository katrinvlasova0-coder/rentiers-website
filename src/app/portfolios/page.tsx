import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBanner from '@/components/marketing/CtaBanner';

export const metadata: Metadata = {
  title: 'Portfolios — Rentiers Pro | Festgeld mit 12–20% Jahresrendite',
  description:
    'Wählen Sie Ihr Rentiers-Portfolio: Konservativ (12%), Ausgewogen (16%) oder High-Yield (20%). Alle staatlich garantiert, AI-überwacht.',
  alternates: { canonical: 'https://rentierspro.com/portfolios' },
};

const portfolios = [
  {
    slug: 'konservativ',
    name: 'Rentiers Konservativ',
    rate: '12%',
    color: '#3B3BE8',
    gradient: 'linear-gradient(135deg, #3B3BE8 0%, #5B5BF0 100%)',
    icon: '🛡️',
    badge: 'Am sichersten',
    minDeposit: '€25.000',
    duration: '60–120 Monate',
    payment: 'Vierteljährlich',
    minRating: 'B+ (S&P)',
    desc: 'Das konservative Portfolio richtet sich an Anleger, die maximale Sicherheit priorisieren. Einlagen ausschließlich bei Großbanken in Ländern mit stabilen Volkswirtschaften und politischen Systemen, bewertet mit mindestens B+ von Standard & Poors.',
    features: [
      'Einlagen bei Tier-1-Banken in 10–20 stabilen Ländern',
      'Mindest-Länderrating B+ (S&P), B1 (Moody\'s)',
      'Quartalsweise Zinszahlungen auf Rentiers-Karte',
      'KI-Monitoring mit automatischem Austausch bei Ratingverschlechterung',
      'Staatliche Einlagengarantie pro Land',
      'EUR, USD, GBP und weitere Währungen',
    ],
    countries: ['Israel', 'Georgien', 'Armenien', 'Serbien', 'Nordmazedonien', 'Albanien'],
  },
  {
    slug: 'ausgewogen',
    name: 'Rentiers Ausgewogen',
    rate: '16%',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #9D5CF0 100%)',
    icon: '⚖️',
    badge: 'Beliebtestes Portfolio',
    minDeposit: '€10.000',
    duration: '36–120 Monate',
    payment: 'Vierteljährlich',
    minRating: 'B– (S&P)',
    desc: 'Das ausgewogene Portfolio kombiniert Stabilität mit höherer Rendite. Eine optimale Mischung aus bewährten Märkten und wachstumsstarken Schwellenländern mit staatlichen Garantien.',
    features: [
      'Einlagen in 15–25 Ländern — breite Diversifikation',
      'Mindest-Länderrating B– (S&P)',
      'Höhere Gewichtung von Emerging Markets für mehr Rendite',
      'Quartalsweise Zinszahlungen auf Rentiers-Karte',
      'Automatisches Rebalancing durch AI-Risikomodul',
      'Multiwährung: EUR, USD, GBP, TRY, GEL und weitere',
    ],
    countries: ['Israel', 'Georgien', 'Türkei', 'Usbekistan', 'Kasachstan', 'Vietnam', '+18 weitere'],
  },
  {
    slug: 'high-yield',
    name: 'Rentiers High-Yield',
    rate: '20%',
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
    icon: '🚀',
    badge: 'Höchste Rendite',
    minDeposit: '€5.000',
    duration: '36–120 Monate',
    payment: 'Vierteljährlich',
    minRating: 'B– (S&P)',
    desc: 'Das High-Yield-Portfolio maximiert die Rendite durch Zugang zu den attraktivsten Einlagenmärkten weltweit. Für Anleger mit höherem Risikoappetit, die dennoch von staatlichen Garantien profitieren wollen.',
    features: [
      'Höchste Rendite durch Fokus auf Hochzinsmärkte',
      'Staatliche Einlagengarantien in allen Zielmärkten',
      'Mindestrating B– (S&P) für jede Einzeleinlage',
      'Quartalsweise Zinszahlungen + optionale Reinvestition',
      'AI-Echtzeit-Monitoring aller Positionen',
      'Einstieg bereits ab €5.000 möglich',
    ],
    countries: ['Türkei', 'Argentinien', 'Ägypten', 'Usbekistan', 'Kenia', 'Nigeria', '+30 weitere'],
  },
];

export default function PortfoliosPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Portfolios — 12 bis 20% Jahresrendite
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Wählen Sie das Portfolio, das zu Ihren Anlagezielen passt. Alle staatlich garantiert,
            KI-überwacht, vierteljährlich ausgezahlt.
          </p>
        </div>
      </section>

      {/* Portfolios detail */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 space-y-16">
          {portfolios.map((p, idx) => (
            <div
              key={p.slug}
              className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Info */}
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                  style={{ background: 'rgba(59,59,232,0.1)', color: 'var(--color-primary)' }}
                >
                  {p.icon} {p.badge}
                </div>
                <h2
                  className="text-2xl md:text-3xl font-extrabold mb-2"
                  style={{ color: 'var(--color-dark)' }}
                >
                  {p.name}
                </h2>
                <div
                  className="text-5xl font-black mb-4"
                  style={{ color: p.color }}
                >
                  {p.rate} p.a.
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {p.desc}
                </p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      <span style={{ color: 'var(--color-success)' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={{ background: p.gradient }}
                >
                  {p.name} wählen →
                </Link>
              </div>

              {/* Card */}
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-8 text-white" style={{ background: p.gradient }}>
                    <p className="font-bold text-xl mb-1">{p.name}</p>
                    <p className="text-6xl font-black mb-2">{p.rate}</p>
                    <p className="text-white/80 text-sm">Jahresrendite p.a.</p>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: 'Mindesteinzahlung', value: p.minDeposit },
                        { label: 'Laufzeit', value: p.duration },
                        { label: 'Zahlung', value: p.payment },
                        { label: 'Mindestrating', value: p.minRating },
                      ].map((row) => (
                        <div key={row.label} className="rounded-xl p-3" style={{ background: 'var(--color-bg-light)' }}>
                          <p className="text-xs mb-1" style={{ color: 'var(--color-text-secondary)' }}>{row.label}</p>
                          <p className="font-bold text-sm" style={{ color: 'var(--color-dark)' }}>{row.value}</p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                        Beispiel-Länder
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.countries.map((c) => (
                          <span
                            key={c}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-secondary)' }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center" style={{ color: 'var(--color-dark)' }}>
            Portfolio-Vergleich
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: 'var(--color-dark)', color: 'white' }}>
                  <th className="text-left p-4 rounded-tl-xl">Merkmal</th>
                  <th className="text-center p-4">Konservativ</th>
                  <th className="text-center p-4">Ausgewogen</th>
                  <th className="text-center p-4 rounded-tr-xl">High-Yield</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Jahresrendite', '12%', '16%', '20%'],
                  ['Mindesteinzahlung', '€25.000', '€10.000', '€5.000'],
                  ['Laufzeit', '60–120 M.', '36–120 M.', '36–120 M.'],
                  ['Staatl. Garantie', '✓', '✓', '✓'],
                  ['AI-Monitoring', '✓', '✓', '✓'],
                  ['Mindestrating', 'B+', 'B–', 'B–'],
                  ['Anzahl Länder', '10–20', '15–25', '20–50'],
                  ['Zahlung', 'Quartalsweise', 'Quartalsweise', 'Quartalsweise'],
                ].map((row, i) => (
                  <tr
                    key={row[0]}
                    style={{ background: i % 2 === 0 ? 'white' : 'var(--color-bg-light)' }}
                  >
                    <td className="p-4 font-medium" style={{ color: 'var(--color-dark)' }}>{row[0]}</td>
                    <td className="p-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>{row[1]}</td>
                    <td className="p-4 text-center font-semibold" style={{ color: '#7C3AED' }}>{row[2]}</td>
                    <td className="p-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
