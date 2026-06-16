import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen — Rentiers Pro',
  description: 'AGB von Rentiers SA. Nutzungsbedingungen für die Rentiers-Plattform.',
  alternates: { canonical: 'https://rentierspro.com/agb' },
};

export default function AgbPage() {
  const sections = [
    {
      title: '§1 Geltungsbereich',
      content: 'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen der Rentiers SA (nachfolgend "Rentiers"), die über die Plattform rentierspro.com angeboten werden. Durch die Nutzung der Plattform erklärt sich der Nutzer mit diesen AGB einverstanden.',
    },
    {
      title: '§2 Leistungsbeschreibung',
      content: 'Rentiers ermöglicht Nutzern den Zugang zu einem Portfolio von Bankeinlagen bei internationalen Partnerbanken. Rentiers vermittelt und verwaltet diese Einlagen und schüttet die erzielten Zinsen gemäß den Portfolio-Bedingungen aus. Rentiers ist kein Kreditinstitut und nimmt keine Einlagen im eigenen Namen entgegen.',
    },
    {
      title: '§3 Registrierung und KYC',
      content: 'Die Nutzung der Plattform setzt eine vollständige Registrierung und erfolgreiche KYC-Verifizierung voraus. Der Nutzer ist verpflichtet, wahrheitsgemäße und vollständige Angaben zu machen. Rentiers behält sich das Recht vor, Konten bei Verdacht auf Betrug oder Verstöße gegen AML-Vorschriften zu sperren.',
    },
    {
      title: '§4 Portfoliobedingungen',
      content: 'Die Mindesteinlage, Laufzeit und Rendite variieren je nach gewähltem Portfolio (Konservativ, Ausgewogen, High-Yield). Die konkreten Bedingungen werden bei der Portfolioauswahl angezeigt und durch die Bestätigung der Einlage verbindlich vereinbart. Rentiers garantiert die angegebenen Renditen vorbehaltlich der Verfügbarkeit geeigneter Partnerbanken.',
    },
    {
      title: '§5 Einlagen und Auszahlungen',
      content: 'Einzahlungen erfolgen per SEPA, SWIFT oder Karte. Zinszahlungen erfolgen vierteljährlich auf die Rentiers Mastercard des Nutzers. Kapitalrückzahlung erfolgt am Ende der vereinbarten Laufzeit oder bei vorzeitiger Kündigung unter Einhaltung der vereinbarten Fristen.',
    },
    {
      title: '§6 Risiken',
      content: 'Die Anlage in Bankeinlagen ist mit Risiken verbunden, insbesondere Währungsrisiken, Länderrisiken und — in seltenen Fällen — Insolvenzrisiken der Partnerbanken. Staatliche Einlagengarantien verringern, eliminieren aber nicht das Risiko. Rentiers übernimmt keine Garantie für die Höhe der tatsächlich erzielten Renditen.',
    },
    {
      title: '§7 Haftung',
      content: 'Rentiers haftet für Schäden, die durch vorsätzliches oder grob fahrlässiges Handeln von Rentiers verursacht wurden. Eine Haftung für entgangenen Gewinn, mittelbare Schäden oder Schäden durch höhere Gewalt, politische Ereignisse oder Handlungen von Partnerbanken ist ausgeschlossen, soweit dies gesetzlich zulässig ist.',
    },
    {
      title: '§8 Kündigung',
      content: 'Der Nutzer kann sein Konto jederzeit kündigen. Laufende Einlagen werden gemäß den Portfolio-Bedingungen abgewickelt. Rentiers behält sich das Recht vor, Konten bei schwerwiegenden Verstößen gegen diese AGB oder bei Verdacht auf Geldwäsche/Betrug ohne vorherige Ankündigung zu kündigen.',
    },
    {
      title: '§9 Anwendbares Recht',
      content: 'Es gilt luxemburgisches Recht, soweit nicht zwingende Verbraucherschutzvorschriften des Wohnsitzlandes des Nutzers abweichend gelten. Gerichtsstand für Kaufleute ist Luxemburg Stadt.',
    },
    {
      title: '§10 Änderungen der AGB',
      content: 'Rentiers behält sich vor, diese AGB mit einer Frist von 30 Tagen zu ändern. Nutzer werden per E-Mail informiert. Widerspricht der Nutzer nicht innerhalb der Frist, gelten die neuen AGB als akzeptiert.',
    },
  ];

  return (
    <>
      <section className="pt-24 pb-8" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-dark)' }}>
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Stand: 1. Januar 2025 | Rentiers SA
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[800px] mx-auto px-6 space-y-6 text-sm leading-relaxed"
             style={{ color: 'var(--color-text-secondary)' }}>
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                {s.title}
              </h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
