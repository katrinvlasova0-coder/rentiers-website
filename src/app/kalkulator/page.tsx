import type { Metadata } from 'next';
import KalkulatorContent from '@/components/pages/KalkulatorContent';

export const metadata: Metadata = {
  title: 'Renditenkalkulator — Rentiers Pro | Berechnen Sie Ihre Festgeld-Rendite',
  description:
    'Berechnen Sie Ihre Rendite bei Rentiers Pro. Geben Sie Einlagebetrag und Laufzeit ein und sehen Sie sofort Ihr monatliches Einkommen, Jahresertrag und Gesamtrendite.',
  alternates: { canonical: 'https://rentierspro.com/kalkulator' },
};

export default function KalkulatorPage() {
  return <KalkulatorContent />;
}
