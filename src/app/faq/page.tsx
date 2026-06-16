import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — Häufige Fragen zu Rentiers Pro | Festgeld, Rendite, Sicherheit',
  description:
    'Antworten auf alle Fragen zu Rentiers: Wie funktionieren die Portfolios? Wie sicher ist mein Geld? Was sind staatliche Einlagengarantien? Alles erklärt.',
  alternates: { canonical: 'https://rentierspro.com/faq' },
};

const faqs = [
  {
    category: 'Grundlagen',
    items: [
      {
        q: 'Was ist Rentiers Pro?',
        a: 'Rentiers Pro ist eine digitale Plattform für Einlagenarbitrage. Wir bündeln Bankeinlagen aus über 50 Ländern und ermöglichen Privatanlegern, 12–20% Jahresrendite auf ihre Ersparnisse zu erzielen — mit staatlichen Einlagengarantien und ohne Aktienrisiko.',
      },
      {
        q: 'Was ist Einlagenarbitrage?',
        a: 'Einlagenarbitrage bezeichnet die Praxis, Kapital in Ländern anzulegen, die deutlich höhere Bankzinsen bieten als der Heimatmarkt. In Deutschland liegen Festgeldzinsen bei 0,5–3%. In Ländern wie Israel, Georgien oder der Türkei bieten regulierte Banken 10–25% p.a. Rentiers gibt Ihnen Zugang zu diesen Märkten.',
      },
      {
        q: 'Ist Rentiers reguliert?',
        a: 'Rentiers SA ist als Money Services Business (MSB) in Kanada und den USA lizenziert. Die Partnerbanken, bei denen Ihr Kapital liegt, sind vollständig von den lokalen Zentralbanken und Finanzaufsichtsbehörden der jeweiligen Länder reguliert.',
      },
      {
        q: 'Wo ist mein Geld tatsächlich?',
        a: 'Ihr Kapital liegt bei geprüften Partnerbanken in den Zielländern — nicht bei Rentiers selbst. Rentiers agiert als Plattform und Vermittler. Die Banken sind in ihren jeweiligen Ländern vollständig reguliert und unterliegen staatlichen Einlagengarantiesystemen.',
      },
    ],
  },
  {
    category: 'Rendite & Portfolios',
    items: [
      {
        q: 'Wie hoch ist die Mindestrendite?',
        a: 'Die Mindestrendite beträgt 12% p.a. im Konservativ-Portfolio. Das Ausgewogene Portfolio liefert 16% p.a., das High-Yield-Portfolio 20% p.a. Diese Zahlen basieren auf historischen Durchschnittswerten der Partnerbanken. Vergangene Renditen sind keine Garantie für die Zukunft.',
      },
      {
        q: 'Wann und wie werden Zinsen ausgezahlt?',
        a: 'Zinsen werden vierteljährlich ausgezahlt — also alle 3 Monate. Die Auszahlung erfolgt direkt auf Ihre Rentiers Mastercard (ausgestellt von Wallester). Von dort können Sie das Geld ausgeben oder auf Ihr Bankkonto überweisen.',
      },
      {
        q: 'Kann ich Zinsen reinvestieren?',
        a: 'Ja. In den Portfolio-Einstellungen können Sie die automatische Reinvestition aktivieren. Reinvestierte Zinsen werden beim nächsten Verteilungszyklus auf Partnerbanken angelegt und erhöhen Ihren Gesamtkapitalstock.',
      },
      {
        q: 'Welches Portfolio ist für mich geeignet?',
        a: 'Das Konservativ-Portfolio (12%) eignet sich für risikoscheue Anleger mit einem Kapital ab €25.000. Das Ausgewogene Portfolio (16%) ist das beliebteste und kombiniert gute Rendite mit moderatem Risiko (ab €10.000). Das High-Yield-Portfolio (20%) ist für renditeorientierte Anleger gedacht, die höhere Risiken akzeptieren (ab €5.000).',
      },
    ],
  },
  {
    category: 'Sicherheit & Garantien',
    items: [
      {
        q: 'Was sind staatliche Einlagengarantien?',
        a: 'In den meisten Ländern gibt es staatliche Einlagensicherungssysteme, die Bankeinlagen bis zu einem Höchstbetrag garantieren. In Deutschland sichert das Einlagensicherungsgesetz bis zu 100.000 EUR pro Kunde und Bank. In unseren Zielländern existieren ähnliche Systeme — Rentiers schichtet Ihr Kapital so auf mehrere Banken auf, dass Sie stets innerhalb der Garantiegrenzen bleiben.',
      },
      {
        q: 'Was passiert, wenn eine Partnerbank insolvent wird?',
        a: 'Im unwahrscheinlichen Fall einer Bankinsolvenz greift das staatliche Einlagengarantiesystem des jeweiligen Landes. Zusätzlich überwacht unser KI-System täglich die Bonität jeder Partnerbank. Sinkt das Rating einer Bank unter die Mindestgrenze (B–/S&P), wird die Einlage proaktiv in eine sichere Alternative umgeschichtet — noch bevor ein Ausfall eintritt.',
      },
      {
        q: 'Wie sicher sind meine persönlichen Daten?',
        a: 'Rentiers verwendet AES-256-Verschlüsselung für alle Datenspeicherung und Übertragung. Wir sind GDPR-konform und halten alle europäischen Datenschutzstandards ein. Ihre persönlichen Daten werden niemals an Dritte weitergegeben, außer im Rahmen gesetzlicher KYC/AML-Anforderungen.',
      },
      {
        q: 'Wie funktioniert das KI-Risikomonitoring?',
        a: 'Unser proprietäres AI-Modul analysiert täglich: Länderrisiken (politische Stabilität, Wirtschaftsindikatoren, Wechselkursstabilität), Bankrisiken (Kapitaladäquanzquote, Liquiditätskennzahlen, Ratings von S&P, Moody\'s und Fitch) sowie Währungsrisiken. Bei Unterschreiten der Mindestbewertung wird automatisch umgeschichtet und Sie werden benachrichtigt.',
      },
    ],
  },
  {
    category: 'Konto & Verwaltung',
    items: [
      {
        q: 'Wie lange dauert die Kontoeröffnung?',
        a: 'Die Kontoeröffnung dauert in der Regel unter 5 Minuten. KYC umfasst: Personalausweis/Reisepass (beidseitig), Selfie mit Liveness-Check und Adressnachweis. Die automatische Überprüfung erfolgt in den meisten Fällen sofort. In seltenen Fällen kann eine manuelle Prüfung 1–2 Werktage dauern.',
      },
      {
        q: 'Welche Einzahlungsmethoden gibt es?',
        a: 'Rentiers akzeptiert SEPA-Überweisungen (kostenlos), SWIFT-Überweisungen und Debit-/Kreditkarten. Für Unternehmen sind auch spezifische B2B-Einzahlungsoptionen verfügbar.',
      },
      {
        q: 'Kann ich mein Kapital vorzeitig abheben?',
        a: 'Ja. Die genauen Bedingungen hängen von Ihrem Portfolio und der gewählten Laufzeit ab. In der Regel sind vorzeitige Kündigungen mit einer Frist von 30–90 Tagen möglich. Details finden Sie in den Portfolio-spezifischen Bedingungen.',
      },
      {
        q: 'Für wen ist Rentiers geeignet?',
        a: 'Rentiers richtet sich an Privatanleger (ab €5.000), Unternehmer, Freiberufler mit freiem Kapital, Pensionäre, die von Zinsen leben wollen, HNWI/Family Offices sowie Unternehmenskassen (B2B). Nicht geeignet für Personen, die kurzfristige Liquidität benötigen oder keine Einlagen tätigen dürfen.',
      },
    ],
  },
  {
    category: 'Steuern & Regulierung',
    items: [
      {
        q: 'Wie werden Zinsen steuerlich behandelt?',
        a: 'Zinseinkünfte aus ausländischen Bankeinlagen unterliegen in Deutschland grundsätzlich der Abgeltungsteuer (25% + Solidaritätszuschlag). Rentiers stellt Ihnen auf Anfrage eine Jahresübersicht aller erhaltenen Zinszahlungen für Ihre Steuererklärung zur Verfügung. Wir empfehlen, Ihren Steuerberater hinzuzuziehen.',
      },
      {
        q: 'Was ist CRS-Integration?',
        a: 'Der Common Reporting Standard (CRS) ist ein internationales Abkommen zum automatischen Austausch von Finanzinformationen zwischen Ländern. Rentiers ist CRS-konform — das bedeutet, Zinseinnahmen können automatisch an die zuständigen Steuerbehörden Ihres Wohnsitzlandes gemeldet werden.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section
        className="pt-24 pb-16"
        style={{ background: 'linear-gradient(135deg, #F2F2FA 0%, #EDEDFC 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{ color: 'var(--color-dark)' }}
          >
            Häufige Fragen
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Alles, was Sie über Rentiers wissen müssen — transparent und vollständig erklärt.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-12">
            {faqs.map((cat) => (
              <div key={cat.category}>
                <h2
                  className="text-xl font-extrabold mb-6 pb-2 border-b"
                  style={{ color: 'var(--color-dark)', borderColor: 'var(--color-border)' }}
                >
                  {cat.category}
                </h2>
                <div className="space-y-4">
                  {cat.items.map((item) => (
                    <div
                      key={item.q}
                      className="rounded-2xl p-6 border"
                      style={{ background: 'var(--color-bg-light)', borderColor: 'transparent' }}
                    >
                      <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-dark)' }}>
                        {item.q}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #5B5BF0 100%)' }}
          >
            <p className="text-white font-bold text-lg mb-2">Noch Fragen?</p>
            <p className="text-white/80 text-sm mb-4">
              Unser Support-Team hilft Ihnen gerne weiter.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-md transition-all"
              style={{ color: 'var(--color-primary)' }}
            >
              Kontakt aufnehmen →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
