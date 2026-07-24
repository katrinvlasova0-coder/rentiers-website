export const AUTHOR_BIOS: Record<
  string,
  { de: string; en: string; expertise: string[] }
> = {
  'Rentiers Redaktion': {
    de: 'Die Redaktion von Rentiers erklärt Bankeinlagen, Einlagensicherung und Zinsstrategien in klarer Sprache — ohne erfundene Experten-Personas.',
    en: 'The Rentiers editorial team explains bank deposits, deposit insurance, and interest strategies in clear language — without invented expert personas.',
    expertise: ['Einlagenarbitrage', 'Festgeld', 'Einlagengarantie', 'Finanzbildung'],
  },
};

export function getAuthorBio(name: string, lang: 'de' | 'en'): string | undefined {
  return AUTHOR_BIOS[name]?.[lang];
}
