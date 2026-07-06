import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Datenschutzrichtlinie — Rentiers Pro',
  description: 'Datenschutzrichtlinie von Rentiers Global. Erfahren Sie, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen.',
  path: '/datenschutz',
});

export default function DatenschutzPage() {
  return <LegalContent page="privacy" />;
}
