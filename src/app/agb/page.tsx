import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Allgemeine Geschäftsbedingungen — Rentiers',
  description: 'AGB von Rentiers Global. Nutzungsbedingungen für die Rentiers-Plattform.',
  path: '/agb',
});

export default function AgbPage() {
  return <LegalContent page="terms" />;
}
