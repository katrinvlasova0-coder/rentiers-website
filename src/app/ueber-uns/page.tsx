import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns — Rentiers Pro | Mission und Team',
  description:
    'Rentiers Pro wurde gegründet, um Privatanlegern Zugang zu den besten Bankzinsen der Welt zu verschaffen. Erfahren Sie mehr über unsere Mission, unser Team und unsere Werte.',
  alternates: { canonical: 'https://rentierspro.com/ueber-uns' },
};

export default function UeberUnsPage() {
  return (
    <>
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, var(--color-dark) 0%, #2D3360 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            Über Rentiers Pro
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-white/80">
            Wir sind angetreten, um Einlagenarbitrage — lange nur institutionellen Anlegern
            vorbehalten — für jeden zugänglich zu machen.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold mb-4" style={{ color: 'var(--color-dark)' }}>
              Unsere Mission
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Millionen von Europäern sehen, wie ihre Ersparnisse durch Inflation schrumpfen — während
              ihre Bankzinsen bei 0–2% stagnieren. Gleichzeitig bieten regulierte Banken in anderen
              Teilen der Welt 10–20% p.a. auf einfache Einlagen.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Rentiers schließt diese Lücke. Wir haben eine Infrastruktur aufgebaut, die es Privatanlegern
              ermöglicht, von diesen globalen Zinsdifferenzen zu profitieren — ohne Komplexität, ohne
              Sprachbarrieren, ohne Aktienrisiko.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Unser Versprechen: Ihr Kapital ist staatlich gesichert, täglich von KI überwacht und
              erbringt eine Rendite, die mit keinem europäischen Festgeldkonto zu vergleichen ist.
            </p>
          </div>

          {/* Company facts */}
          <div
            className="rounded-2xl p-8 mb-16"
            style={{ background: 'var(--color-bg-light)' }}
          >
            <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              Unternehmensangaben
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Firmenname', value: 'Rentiers SA' },
                { label: 'Sitz', value: '1368 Ville Haute Luxembourg, Luxemburg' },
                { label: 'Handelsregister', value: 'LU 127-18093451' },
                { label: 'Geschäftsführer', value: 'Max Müller, Pierre Dijon' },
                { label: 'Lizenz', value: 'MSB – Kanada & USA' },
                { label: 'Gegründet', value: '2023' },
                { label: 'Telefon', value: '+49 (0) 69 1234 5678' },
              ].map((row) => (
                <div key={row.label}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {row.label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--color-dark)' }}>
              Unsere Werte
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Transparenz', desc: 'Keine versteckten Gebühren. Alle Kosten sind in der Rendite eingerechnet. Sie sehen genau, wo Ihr Geld liegt.' },
                { title: 'Sicherheit', desc: 'Staatliche Garantien, AI-Monitoring, AES-256-Verschlüsselung — Ihr Kapital ist immer geschützt.' },
                { title: 'Zugänglichkeit', desc: 'Wir glauben, dass jeder Zugang zu den besten Finanzinstrumenten der Welt verdient — unabhängig von Herkunft oder Kapital.' },
                { title: 'Innovation', desc: 'Einlagenarbitrage ist uralt. Wir haben sie digitalisiert, automatisiert und für das 21. Jahrhundert neu gedacht.' },
              ].map((v) => (
                <div key={v.title} className="flex gap-4">
                  <div
                    className="w-1 rounded-full shrink-0"
                    style={{ background: 'var(--color-primary)' }}
                  />
                  <div>
                    <p className="font-bold mb-1" style={{ color: 'var(--color-dark)' }}>{v.title}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: 'var(--color-primary)' }}
            >
              Jetzt Konto eröffnen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
