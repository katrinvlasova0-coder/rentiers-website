import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';

export const metadata: Metadata = {
  title: 'Datenschutzrichtlinie — Rentiers Pro',
  description: 'Datenschutzrichtlinie von Rentiers Global. Erfahren Sie, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen.',
  alternates: { canonical: 'https://rentierspro.com/datenschutz' },
};

export default function DatenschutzPage() {
  return <LegalContent page="privacy" />;
}
