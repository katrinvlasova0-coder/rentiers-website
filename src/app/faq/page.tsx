import type { Metadata } from 'next';
import FaqContent from '@/components/pages/FaqContent';

export const metadata: Metadata = {
  title: 'FAQ — Häufige Fragen zu Rentiers Pro | Festgeld, Rendite, Sicherheit',
  description:
    'Antworten auf alle Fragen zu Rentiers: Wie funktionieren die Portfolios? Wie sicher ist mein Geld? Was sind staatliche Einlagengarantien? Alles erklärt.',
  alternates: { canonical: 'https://rentierspro.com/faq' },
};

export default function FaqPage() {
  return <FaqContent />;
}
