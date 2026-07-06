import type { Metadata } from 'next';
import EinlagenarbitrageContent from '@/components/pages/EinlagenarbitrageContent';
import JsonLd from '@/components/layout/JsonLd';
import { createMetadata, definedTermSchema } from '@/lib/seo';
import { pageContent } from '@/i18n/pages';

const definition = pageContent.de.einlagenarbitrage.definition;

export const metadata: Metadata = createMetadata({
  title: 'Einlagenarbitrage erklärt — Definition, Risiken & Beispiele | Rentiers Pro',
  description:
    'Was ist Einlagenarbitrage? Vollständiger Leitfaden: Definition, Funktionsweise, Risiken und Beispiele für Privatanleger. 12–20% p.a. mit staatlichen Garantien.',
  path: '/einlagenarbitrage',
});

export default function EinlagenarbitragePage() {
  return (
    <>
      <JsonLd data={definedTermSchema('Einlagenarbitrage', definition)} />
      <EinlagenarbitrageContent />
    </>
  );
}
