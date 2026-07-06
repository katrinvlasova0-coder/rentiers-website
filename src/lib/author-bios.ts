export const AUTHOR_BIOS: Record<
  string,
  { de: string; en: string; expertise: string[] }
> = {
  'Dr. Stefan Kaufmann': {
    de: 'Senior Finanzanalyst bei Rentiers Pro mit über 12 Jahren Erfahrung in Emerging-Market-Bankeinlagen, Einlagensicherung und Zinsdifferenzstrategien.',
    en: 'Senior financial analyst at Rentiers Pro with 12+ years of experience in emerging-market bank deposits, deposit insurance, and interest-rate differential strategies.',
    expertise: ['Einlagenarbitrage', 'Festgeld', 'Emerging Markets'],
  },
  'Dr. Markus Hoffmann': {
    de: 'Investment Analyst mit Schwerpunkt internationale Bankeinlagen und staatliche Einlagengarantien in Schwellenländern.',
    en: 'Investment analyst focused on international bank deposits and state deposit guarantees in emerging markets.',
    expertise: ['Einlagengarantie', 'Länder-Guides', 'Risikoanalyse'],
  },
  'Elena Kowalski': {
    de: 'Financial Researcher, spezialisiert auf osteuropäische und kaukasische Finanzmärkte sowie regulatorische Rahmenbedingungen.',
    en: 'Financial researcher specializing in Eastern European and Caucasus financial markets and regulatory frameworks.',
    expertise: ['Georgien', 'Armenien', 'Regulierung'],
  },
  'Max Müller': {
    de: 'Finanzredakteur bei Rentiers Pro — erklärt komplexe Zins- und Arbitragestrategien für Privatanleger.',
    en: 'Financial editor at Rentiers Pro — explains complex interest and arbitrage strategies for private investors.',
    expertise: ['Einlagenarbitrage', 'Passives Einkommen', 'Anlagestrategien'],
  },
};

export function getAuthorBio(name: string, lang: 'de' | 'en'): string | undefined {
  return AUTHOR_BIOS[name]?.[lang];
}
