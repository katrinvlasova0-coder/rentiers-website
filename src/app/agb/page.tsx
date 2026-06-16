import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen — Rentiers Pro',
  description: 'AGB von Rentiers SA. Nutzungsbedingungen für die Rentiers-Plattform.',
  alternates: { canonical: 'https://rentierspro.com/agb' },
};

export default function AgbPage() {
  return <LegalContent page="terms" />;
}
