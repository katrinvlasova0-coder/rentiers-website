import type { Metadata } from 'next';
import LegalContent from '@/components/pages/LegalContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Impressum — Rentiers',
  description: 'Impressum und Unternehmensangaben von Rentiers Global Corp. und Rentiers Global Inc.',
  path: '/impressum',
});

export default function ImpressumPage() {
  return <LegalContent page="impressum" />;
}
