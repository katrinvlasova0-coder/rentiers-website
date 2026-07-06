/** Map content-plan cluster names to canonical DE/EN blog tags */
export const CLUSTER_TAG: Record<string, { de: string; en: string }> = {
  Einlagenarbitrage: { de: 'Einlagenarbitrage', en: 'Deposit Arbitrage' },
  'Страновые гиды': { de: 'Länder-Guides', en: 'Country Guides' },
  'Пассивный доход': { de: 'Passives Einkommen', en: 'Passive Income' },
  Сравнения: { de: 'Vergleiche', en: 'Comparisons' },
  Безопасность: { de: 'Sicherheit', en: 'Security' },
  B2B: { de: 'B2B', en: 'B2B' },
  'RU/CIS': { de: 'RU/CIS', en: 'RU/CIS' },
};

export function clusterTagDe(cluster: string): string {
  return CLUSTER_TAG[cluster]?.de ?? cluster;
}

export function clusterTagEn(cluster: string): string {
  return CLUSTER_TAG[cluster]?.en ?? cluster;
}
