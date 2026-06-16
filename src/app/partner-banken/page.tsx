import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partner-Banken — Rentiers Pro | Internationale Bankpartner',
  description:
    'Rentiers arbeitet mit geprüften Großbanken in über 50 Ländern zusammen. Alle Partner-Banken sind von lokalen Zentralbanken reguliert und staatlich garantiert.',
  alternates: { canonical: 'https://rentierspro.com/partner-banken' },
};

const banks = [
  { name: 'Deutsche Bank', file: 'DeutscheBank.svg', country: 'Deutschland', rating: 'BBB+' },
  { name: 'JPMorgan Chase', file: 'JPMorganChase.svg', country: 'USA', rating: 'A+' },
  { name: 'HSBC', file: 'HSBCUK.svg', country: 'Großbritannien', rating: 'A' },
  { name: 'Credit Suisse', file: 'CreditSuisse.svg', country: 'Schweiz', rating: 'BBB+' },
  { name: 'UniCredit', file: 'UniCredit.svg', country: 'Italien', rating: 'BBB' },
  { name: 'Bank of America', file: 'BankOfAmerica.svg', country: 'USA', rating: 'A+' },
  { name: 'Santander', file: 'Santander.svg', country: 'Spanien', rating: 'A–' },
  { name: 'Société Générale', file: 'SocieteGenerale.svg', country: 'Frankreich', rating: 'A–' },
];

const criteria = [
  {
    icon: '≡',
    title: 'Mindestrating B+ (S&P)',
    desc: 'Jede Partnerbank muss mindestens ein B+-Rating von Standard & Poors oder ein equivalentes Rating von Moody\'s (B1) oder Fitch aufweisen.',
  },
  {
    icon: '€',
    title: 'Lokale Regulierung',
    desc: 'Alle Partner-Banken sind vollständig von der Zentralbank oder der Finanzaufsichtsbehörde des jeweiligen Landes reguliert und lizenziert.',
  },
  {
    icon: '✓',
    title: 'Staatliche Einlagengarantie',
    desc: 'Das Partnerland muss über ein funktionierendes staatliches Einlagengarantiesystem verfügen, das Kundeneinlagen absichert.',
  },
  {
    icon: 'AI',
    title: 'Kontinuierliches Monitoring',
    desc: 'Unser KI-System überprüft täglich alle Partnerbanken. Bei Verschlechterung des Ratings wird die Einlage automatisch umgeschichtet.',
  },
];

export default function PartnerBankenPage() {
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
            Unsere Partner-Banken
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Ihr Kapital liegt bei geprüften, regulierten Großbanken in über 50 Ländern.
            Alle staatlich garantiert, täglich von unserem KI-System überwacht.
          </p>
        </div>
      </section>

      {/* Bank logos grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border hover:shadow-md transition-all"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
              >
                <Image
                  src={`/banks/${bank.file}`}
                  alt={bank.name}
                  width={120}
                  height={40}
                  className="object-contain h-10 w-auto mb-3"
                />
                <p className="text-xs font-semibold text-center" style={{ color: 'var(--color-dark)' }}>
                  {bank.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {bank.country}
                </p>
                <span
                  className="mt-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#15803D' }}
                >
                  {bank.rating}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-muted, #9CA3AF)' }}>
            + über 200 weitere Partnerbanken in 50+ Ländern
          </p>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-20" style={{ background: 'var(--color-bg-light)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-10 text-center"
            style={{ color: 'var(--color-dark)' }}
          >
            Unsere Auswahlkriterien
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {criteria.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--color-dark)' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
          Bereit, Ihr Kapital anlegen?
        </h2>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          style={{ background: 'var(--color-primary)' }}
        >
          Konto eröffnen →
        </Link>
      </section>
    </>
  );
}
