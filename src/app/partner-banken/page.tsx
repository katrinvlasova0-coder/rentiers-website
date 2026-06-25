import type { Metadata } from 'next';
import PartnerBankenContent from '@/components/pages/PartnerBankenContent';

export const metadata: Metadata = {
  title: 'Partner-Banken — Rentiers Pro | Internationale Bankpartner',
  description:
    'Rentiers arbeitet mit geprüften Partnerbanken in über 20 Ländern zusammen. Täglich KI-überwacht, mit staatlichen Einlagengarantien im jeweiligen Land.',
  alternates: { canonical: 'https://rentierspro.com/partner-banken' },
};

export default function PartnerBankenPage() {
  return <PartnerBankenContent />;
}
