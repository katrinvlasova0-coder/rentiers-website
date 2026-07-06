import type { Metadata } from 'next';
import HowItWorksContent from '@/components/pages/HowItWorksContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Wie es funktioniert — Rentiers Pro | Passives Einkommen in 3 Schritten',
  description:
    'So funktioniert Rentiers: Konto eröffnen, Portfolio wählen, Zinsen empfangen. In 3 einfachen Schritten zu 12–20% Jahresrendite mit staatlichen Einlagengarantien.',
  path: '/wie-es-funktioniert',
});

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
