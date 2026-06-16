const problems = [
  {
    icon: '📉',
    title: 'Inflation schlägt Zinsen',
    desc: 'Deutsche Festgeldkonten zahlen 0,5–3% — weit unter der Inflationsrate. Ihre Ersparnisse schrumpfen real jedes Jahr.',
  },
  {
    icon: '🔒',
    title: 'Kapital gebunden, Rendite minimal',
    desc: 'Traditionelle Banken binden Ihr Geld für Monate oder Jahre und zahlen trotzdem kaum Zinsen.',
  },
  {
    icon: '🌍',
    title: 'Hochzinsmärkte unzugänglich',
    desc: 'Banken in Ländern mit 10–20% Einlagenzinsen sind für Privatpersonen in Europa kaum zugänglich — bis jetzt.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Warum Ihr Erspartes auf dem Konto verliert
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Während Ihr Geld bei einer deutschen Bank 0–2% einbringt, fressen Inflation und
            Lebenshaltungskosten Ihre Kaufkraft auf.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 hover:shadow-md transition-all border"
              style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Solution bridge */}
        <div
          className="text-center py-8 px-8 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
        >
          <p className="text-xl font-bold text-white mb-2">
            Rentiers öffnet Ihnen Zugang zu den besten Bankzinsen weltweit.
          </p>
          <p className="text-white/80 text-sm">
            Staatlich garantiert · AI-überwacht · Vollständig digital
          </p>
        </div>
      </div>
    </section>
  );
}
