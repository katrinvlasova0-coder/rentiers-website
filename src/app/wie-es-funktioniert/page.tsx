import type { Metadata } from 'next';
import HowItWorksContent from '@/components/pages/HowItWorksContent';

export const metadata: Metadata = {
  title: 'Wie es funktioniert — Rentiers Pro | Passives Einkommen in 3 Schritten',
  description:
    'So funktioniert Rentiers: Konto eröffnen, Portfolio wählen, Zinsen empfangen. In 3 einfachen Schritten zu 12–20% Jahresrendite mit staatlichen Einlagengarantien.',
  alternates: { canonical: 'https://rentierspro.com/wie-es-funktioniert' },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
