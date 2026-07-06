import type { Metadata } from 'next';
import KalkulatorContent from '@/components/pages/KalkulatorContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Renditenkalkulator — Rentiers Pro | Berechnen Sie Ihre Festgeld-Rendite',
  description:
    'Berechnen Sie Ihre Rendite bei Rentiers Pro. Geben Sie Einlagebetrag und Laufzeit ein und sehen Sie sofort Ihr monatliches Einkommen, Jahresertrag und Gesamtrendite.',
  path: '/kalkulator',
});

export default function KalkulatorPage() {
  return <KalkulatorContent />;
}
