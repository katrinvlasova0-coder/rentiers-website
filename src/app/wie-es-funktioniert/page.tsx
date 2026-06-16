import type { Metadata } from 'next';
import Link from 'next/link';
import CtaBanner from '@/components/marketing/CtaBanner';

export const metadata: Metadata = {
  title: 'Wie es funktioniert — Rentiers Pro | Passives Einkommen in 3 Schritten',
  description:
    'So funktioniert Rentiers: Konto eröffnen, Portfolio wählen, Zinsen empfangen. In 3 einfachen Schritten zu 12–20% Jahresrendite mit staatlichen Einlagengarantien.',
  alternates: { canonical: 'https://rentierspro.com/wie-es-funktioniert' },
};

const steps = [
  {
    num: '01',
    title: 'Konto eröffnen & KYC durchführen',
    desc: 'Die Kontoeröffnung dauert weniger als 5 Minuten. Alles vollständig digital, kein Postweg nötig.',
    details: [
      'E-Mail und Passwort registrieren',
      'Personalausweis oder Reisepass fotografieren (beidseitig)',
      'Selfie mit Liveness-Check (verhindert Betrug)',
      'Adressnachweis hochladen (Kontoauszug oder Rechnung)',
      'Sofortige Überprüfung durch unser KYC-System',
      'GDPR-konform, CRS-integriert, AES-256-verschlüsselt',
    ],
    icon: '✓',
    color: '#3B3BE8',
  },
  {
    num: '02',
    title: 'Portfolio wählen & Kapital einzahlen',
    desc: 'Wählen Sie das passende Portfolio für Ihre Anlageziele und zahlen Sie Ihr Kapital ein.',
    details: [
      'Portfolio wählen: Konservativ (12%), Ausgewogen (16%), High-Yield (20%)',
      'Betrag eingeben (ab Mindesteinlage je Portfolio)',
      'Laufzeit auswählen: 36–120 Monate',
      'Einzahlungsmethode: SEPA-Überweisung, SWIFT oder Debit-/Kreditkarte',
      'Kapitaldistribution auf Partnerbanken startet innerhalb von 24h',
      'Echtzeit-Bestätigung und Portfolio-Dashboard-Zugang',
    ],
    icon: '€',
    color: '#7C3AED',
  },
  {
    num: '03',
    title: 'Zinsen empfangen & Kapital verwalten',
    desc: 'Rentiers übernimmt die komplette Verwaltung. Sie empfangen quartalsweise Zinszahlungen und behalten den vollen Überblick.',
    details: [
      'Vierteljährliche Zinszahlungen direkt auf Ihre Rentiers Mastercard',
      'Portfolio-Dashboard: Echtzeit-Übersicht aller Einlagen',
      'Geografische Verteilung und Gewinndiagramme',
      'AI-Risikomonitoring rund um die Uhr — Sie werden bei Änderungen benachrichtigt',
      'Zinsen mit der Karte ausgeben oder reinvestieren',
      'Kündigung jederzeit möglich (Laufzeitbedingungen beachten)',
    ],
    icon: '+%',
    color: '#0891B2',
  },
];

const faqs = [
  {
    q: 'Wie lange dauert die Kontoeröffnung?',
    a: 'Die Kontoeröffnung dauert typischerweise unter 5 Minuten. Nach dem Upload Ihrer Dokumente überprüft unser automatisches KYC-System Ihre Identität in der Regel innerhalb weniger Minuten. In seltenen Fällen kann die manuelle Überprüfung 1–2 Werktage dauern.',
  },
  {
    q: 'Wie sind meine Einlagen abgesichert?',
    a: 'Alle Einlagen sind durch staatliche Einlagengarantien der jeweiligen Partnerländer abgesichert. Die Höhe variiert je nach Land — in vielen Märkten bis zu 100.000 EUR oder Äquivalent. Zusätzlich überwacht unser AI-System täglich die Bonität jeder Bank und des jeweiligen Landes.',
  },
  {
    q: 'Kann ich mein Kapital vorzeitig abheben?',
    a: 'Rentiers ermöglicht eine vorzeitige Kündigung. Die genauen Bedingungen (Kündigungsfristen, etwaige Gebühren) hängen von Ihrem gewählten Portfolio und der Laufzeit ab. Details finden Sie in den Allgemeinen Geschäftsbedingungen des jeweiligen Portfolios.',
  },
  {
    q: 'Welche Währungen werden unterstützt?',
    a: 'Rentiers unterstützt EUR, USD, GBP und eine Reihe weiterer Währungen. Einlagen können in mehreren Währungen gleichzeitig gehalten werden. Die Rentiers Mastercard ist multiwährungsfähig.',
  },
  {
    q: 'Wie funktioniert die KI-Risikoüberwachung?',
    a: 'Unser proprietäres AI-Modul analysiert täglich Länderrisiken (politische Stabilität, Wirtschaftsdaten), Bankrisiken (Kapitaladäquanz, Ratings von S&P, Moody\'s, Fitch) und Währungsrisiken. Fällt ein Rating unter die Mindestgrenze (B–/S&P), wird die Einlage automatisch in eine sichere Alternative umgeschichtet.',
  },
];

export default function HowItWorksPage() {
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
            Wie Rentiers funktioniert
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            In 3 einfachen Schritten zu 12–20% Jahresrendite. Keine Expertise nötig, keine manuelle
            Verwaltung — wir kümmern uns um alles.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-20">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className="text-6xl font-black mb-4 opacity-20"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-extrabold mb-3"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    {step.title}
                  </h2>
                  <p className="text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    {step.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                          style={{ background: step.color }}
                        >
                          ✓
                        </span>
                        <span style={{ color: 'var(--color-text-primary)' }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <div
                    className="rounded-3xl p-10 flex items-center justify-center"
                    style={{ background: `${step.color}15` }}
                  >
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-6xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}AA 100%)` }}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[800px] mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-10 text-center"
            style={{ color: 'var(--color-dark)' }}
          >
            Häufige Fragen zum Ablauf
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl p-6 bg-white border"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <h3 className="font-bold text-base mb-2" style={{ color: 'var(--color-dark)' }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link href="/faq" style={{ color: 'var(--color-primary)' }} className="font-semibold hover:underline">
              Alle FAQ ansehen →
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
