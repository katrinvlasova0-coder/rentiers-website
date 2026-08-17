import { FORBIDDEN_PATTERNS } from '../config/forbidden-patterns';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function shouldMatch(pattern: RegExp, text: string, label: string): void {
  assert(pattern.test(text), `expected to MATCH (${label}): ${text}`);
}

function shouldNotMatch(pattern: RegExp, text: string, label: string): void {
  assert(!pattern.test(text), `expected NOT to match (${label}): ${text}`);
}

shouldNotMatch(
  FORBIDDEN_PATTERNS.investCta,
  'So eröffnen Sie ein Bankkonto in Georgien als Nichtresident.',
  'educational DE account opening',
);
shouldNotMatch(
  FORBIDDEN_PATTERNS.investCta,
  'How to open a bank account as a non-resident in Georgia.',
  'educational EN account opening',
);
shouldMatch(
  FORBIDDEN_PATTERNS.investCta,
  'Jetzt Konto eröffnen und direkt starten.',
  'solicitation DE',
);
shouldMatch(
  FORBIDDEN_PATTERNS.investCta,
  'Open a Rentiers account today.',
  'solicitation EN',
);
shouldMatch(
  FORBIDDEN_PATTERNS.investCta,
  'Mit Rentiers starten lohnt sich.',
  'brand CTA',
);

shouldNotMatch(
  FORBIDDEN_PATTERNS.guaranteedReturn,
  'Einlagen sind ohne Risikoübernahme durch die Plattform bei der Partnerbank.',
  'educational ohne Risikoübernahme',
);
shouldMatch(
  FORBIDDEN_PATTERNS.guaranteedReturn,
  'Eine völlig ohne Risiko erzielbare Rendite gibt es nicht — und darf nicht beworben werden.',
  'absolute no-risk claim',
);

console.log('✅ compliance-patterns.test.ts passed');
