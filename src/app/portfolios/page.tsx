import type { Metadata } from 'next';
import PortfoliosContent from '@/components/pages/PortfoliosContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Portfolios — Rentiers Pro | Festgeld mit 12–20% Jahresrendite',
  description:
    'Wählen Sie Ihr Rentiers-Portfolio: Konservativ (12%), Ausgewogen (16%) oder High-Yield (20%). Mit staatlichen Einlagengarantien, AI-überwacht.',
  path: '/portfolios',
});

export default function PortfoliosPage() {
  return <PortfoliosContent />;
}
