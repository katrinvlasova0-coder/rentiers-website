const features = [
  {
    icon: '🛡️',
    title: 'Staatliche Einlagengarantie',
    desc: 'Alle Einlagen sind durch staatliche Garantieprogramme abgesichert — ähnlich dem deutschen EDIS, aber in über 50 Ländern. Ihr Kapital ist geschützt.',
  },
  {
    icon: '🤖',
    title: 'KI-Risikomonitoring',
    desc: 'Unser AI-Modul überwacht täglich Länder-, Bank- und Währungsrisiken. Bewertungen unter B– (S&P) werden automatisch durch bessere Alternativen ersetzt.',
  },
  {
    icon: '💳',
    title: 'Rentiers Debitkarte',
    desc: 'Zinsen fließen direkt auf Ihre Rentiers Mastercard (Wallester). Ausgeben oder weitersparen — Ihre Entscheidung. Multiwährung inklusive.',
  },
  {
    icon: '🌍',
    title: 'Globale Diversifikation',
    desc: 'Kapital verteilt auf 5–15 Banken in verschiedenen Ländern und Währungen. Kein Klumpenrisiko, maximale Streuung, minimales Risiko.',
  },
  {
    icon: '📊',
    title: 'Portfolio-Dashboard',
    desc: 'Echtzeit-Übersicht über alle Einlagen, Zinszahlungen, geografische Verteilung und Gewinndiagramme. Alles auf einen Blick, jederzeit.',
  },
  {
    icon: '✅',
    title: 'Einfaches KYC in 5 Min.',
    desc: 'ID-Scan + Liveness-Check + Adressnachweis. Vollständig digital, GDPR-konform, CRS-integriert. In unter 5 Minuten verifiziert.',
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Warum Rentiers?
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Entwickelt für Anleger, die Sicherheit und Rendite nicht trennen wollen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border"
              style={{ borderColor: 'transparent' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: 'var(--color-primary-light)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
