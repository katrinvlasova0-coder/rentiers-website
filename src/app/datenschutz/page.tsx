import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzrichtlinie — Rentiers Pro',
  description: 'Datenschutzrichtlinie von Rentiers SA. Erfahren Sie, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen.',
  alternates: { canonical: 'https://rentierspro.com/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <>
      <section className="pt-24 pb-8" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: 'var(--color-dark)' }}>
            Datenschutzrichtlinie
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Stand: 1. Januar 2025 | Rentiers SA
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[800px] mx-auto px-6 prose prose-sm max-w-none">
          <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {[
              {
                title: '1. Verantwortlicher',
                content: 'Verantwortlich im Sinne der DSGVO ist: Rentiers SA, 1368 Ville Haute Luxembourg, Luxemburg. Geschäftsführer: Max Müller, Pierre Dijon. Telefon: +49 (0) 69 1234 5678. E-Mail: datenschutz@rentierspro.com',
              },
              {
                title: '2. Erhebung und Verarbeitung personenbezogener Daten',
                content: 'Wir erheben folgende Kategorien personenbezogener Daten: Identitätsdaten (Name, Geburtsdatum, Staatsangehörigkeit), Kontaktdaten (E-Mail-Adresse, Telefonnummer, Anschrift), Ausweisdaten (Personalausweis oder Reisepass) zur KYC-Verifizierung, Finanzdaten (Bankverbindungen, Transaktionshistorie), technische Daten (IP-Adresse, Browser-Informationen, Gerätedaten).',
              },
              {
                title: '3. Zweck der Datenverarbeitung',
                content: 'Wir verarbeiten Ihre Daten zur Erbringung unserer Dienstleistungen (Kontoeröffnung, Portfolioverwaltung, Zinszahlungen), zur Erfüllung rechtlicher Pflichten (KYC/AML, CRS), zur Betrugsprävention und Sicherheitsüberwachung sowie zur Kommunikation mit Ihnen (Support, Benachrichtigungen).',
              },
              {
                title: '4. Rechtsgrundlagen',
                content: 'Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrugsprävention und Sicherheit).',
              },
              {
                title: '5. Weitergabe an Dritte',
                content: 'Wir geben Ihre Daten nur in folgenden Fällen weiter: an Partnerbanken zur Durchführung von Einlagen, an KYC-Dienstleister zur Identitätsverifizierung, an zuständige Behörden bei gesetzlicher Verpflichtung (KYC/AML, CRS). Eine Weitergabe zu Werbezwecken findet nicht statt.',
              },
              {
                title: '6. Datensicherheit',
                content: 'Wir verwenden AES-256-Verschlüsselung für alle gespeicherten und übertragenen Daten. Alle Verbindungen sind TLS-verschlüsselt. Zugriff auf Kundendaten ist streng auf autorisierte Mitarbeiter beschränkt und wird protokolliert.',
              },
              {
                title: '7. Ihre Rechte',
                content: 'Sie haben folgende Rechte: Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich an: datenschutz@rentierspro.com.',
              },
              {
                title: '8. Cookies',
                content: 'Wir verwenden technisch notwendige Cookies für den Betrieb der Plattform sowie optionale Analyse-Cookies (PostHog) zur Verbesserung unseres Angebots. Sie können die Nutzung von Analyse-Cookies über unser Cookie-Banner ablehnen.',
              },
              {
                title: '9. Aufbewahrungsfristen',
                content: 'Wir speichern Ihre Daten so lange, wie es für die Erbringung unserer Dienste erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. KYC-Daten werden gemäß AML-Anforderungen mindestens 5 Jahre nach Vertragsende aufbewahrt.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-dark)' }}>
                  {section.title}
                </h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
