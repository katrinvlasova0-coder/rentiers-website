import Link from 'next/link';

const portfolios = [
  {
    name: 'Rentiers Konservativ',
    rate: '12% p.a.',
    color: '#3B3BE8',
    gradient: 'linear-gradient(135deg, #3B3BE8 0%, #5B5BF0 100%)',
    desc: 'Einlagen bei großen internationalen Banken in Ländern mit stabilen Volkswirtschaften und politischen Systemen, die mit mindestens B+ (S&P) bewertet sind.',
    minDeposit: '€25.000',
    duration: '60–120 Monate',
    payment: 'Vierteljährlich',
    icon: '🛡️',
    badge: 'Am sichersten',
  },
  {
    name: 'Rentiers Ausgewogen',
    rate: '16% p.a.',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #9D5CF0 100%)',
    desc: 'Ausgewogene Mischung aus stabilen und wachstumsstarken Märkten. Höhere Rendite bei moderatem Risiko — ideal für den Einstieg.',
    minDeposit: '€10.000',
    duration: '36–120 Monate',
    payment: 'Vierteljährlich',
    icon: '⚖️',
    badge: 'Beliebtestes Portfolio',
  },
  {
    name: 'Rentiers High-Yield',
    rate: '20% p.a.',
    color: '#0891B2',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)',
    desc: 'Maximale Rendite durch Emerging-Market-Einlagen mit staatlicher Garantie. Für renditeorientierte Anleger mit höherem Risikoappetit.',
    minDeposit: '€5.000',
    duration: '36–120 Monate',
    payment: 'Vierteljährlich',
    icon: '🚀',
    badge: 'Höchste Rendite',
  },
];

export default function PortfoliosSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Drei Portfolios für jeden Anlegertyp
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Von konservativ bis renditeoptimiert — staatlich garantiert, AI-überwacht.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {portfolios.map((p, i) => (
            <div
              key={p.name}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {/* Header */}
              <div className="p-6 text-white" style={{ background: p.gradient }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  >
                    {p.badge}
                  </span>
                </div>
                <p className="font-bold text-lg mb-1">{p.name}</p>
                <p className="text-4xl font-extrabold">{p.rate}</p>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {p.desc}
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Mindesteinzahlung', value: p.minDeposit },
                    { label: 'Laufzeit', value: p.duration },
                    { label: 'Zahlung', value: p.payment },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between items-center py-2 border-b"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {row.label}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/portfolios/${p.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block w-full text-center py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: p.gradient }}
                >
                  Portfolio wählen
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
          * Renditen basieren auf historischen Durchschnittswerten. Staatliche Garantien variieren
          je nach Land und Partnerbank. Bitte lesen Sie die Risikohinweise.
        </p>
      </div>
    </section>
  );
}
