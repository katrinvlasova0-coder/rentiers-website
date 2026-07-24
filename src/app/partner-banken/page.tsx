import type { Metadata } from 'next';
import PartnerBankenContent from '@/components/pages/PartnerBankenContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Partner-Banken — Rentiers | Internationale Bankpartner',
  description:
    'Rentiers arbeitet mit geprüften Partnerbanken in über 20 Ländern zusammen. Täglich KI-überwacht, mit staatlichen Einlagengarantien im jeweiligen Land.',
  path: '/partner-banken',
});

export default function PartnerBankenPage() {
  return <PartnerBankenContent />;
}
