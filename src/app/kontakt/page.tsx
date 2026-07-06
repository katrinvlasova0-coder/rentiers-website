import type { Metadata } from 'next';
import KontaktContent from '@/components/pages/KontaktContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Kontakt — Rentiers Pro',
  description:
    'Kontaktieren Sie Rentiers Pro per E-Mail oder Kontaktformular. Antwort innerhalb eines Werktags zu Portfolios, Konto und Einlagenarbitrage.',
  path: '/kontakt',
});

export default function KontaktPage() {
  return <KontaktContent />;
}
