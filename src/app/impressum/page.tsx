import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';

export const metadata: Metadata = {
  title: 'Impressum — Rentiers Pro',
  description: 'Impressum und Unternehmensangaben von Rentiers Global Corp. und Rentiers Global Inc.',
  alternates: { canonical: 'https://rentierspro.com/impressum' },
};

export default function ImpressumPage() {
  return <LegalContent page="impressum" />;
}
