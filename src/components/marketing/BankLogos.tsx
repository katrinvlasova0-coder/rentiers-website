import Image from 'next/image';

const banks = [
  { name: 'Deutsche Bank', file: 'DeutscheBank.svg' },
  { name: 'JPMorgan Chase', file: 'JPMorganChase.svg' },
  { name: 'HSBC', file: 'HSBCUK.svg' },
  { name: 'Credit Suisse', file: 'CreditSuisse.svg' },
  { name: 'UniCredit', file: 'UniCredit.svg' },
  { name: 'Bank of America', file: 'BankOfAmerica.svg' },
  { name: 'Santander', file: 'Santander.svg' },
  { name: 'Société Générale', file: 'SocieteGenerale.svg' },
];

export default function BankLogos() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-extrabold mb-3"
            style={{ color: 'var(--color-dark)' }}
          >
            Unsere Partner-Banken
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Ihr Kapital liegt bei geprüften Großbanken mit staatlichen Einlagengarantien.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {banks.map((bank) => (
            <div
              key={bank.name}
              className="flex items-center justify-center p-5 rounded-2xl border hover:shadow-md transition-all"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-light)' }}
            >
              <Image
                src={`/banks/${bank.file}`}
                alt={bank.name}
                width={120}
                height={40}
                className="object-contain h-8 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
