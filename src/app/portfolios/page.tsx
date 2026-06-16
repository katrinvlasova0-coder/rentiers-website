import type { Metadata } from 'next';
import PortfoliosContent from '@/components/pages/PortfoliosContent';

export const metadata: Metadata = {
  title: 'Portfolios — Rentiers Pro | Festgeld mit 12–20% Jahresrendite',
  description:
    'Wählen Sie Ihr Rentiers-Portfolio: Konservativ (12%), Ausgewogen (16%) oder High-Yield (20%). Alle staatlich garantiert, AI-überwacht.',
  alternates: { canonical: 'https://rentierspro.com/portfolios' },
};

export default function PortfoliosPage() {
  return <PortfoliosContent />;
}
