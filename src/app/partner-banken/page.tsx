import type { Metadata } from 'next';
import PartnerBankenContent from '@/components/pages/PartnerBankenContent';

export const metadata: Metadata = {
  title: 'Partner-Banken — Rentiers Pro | Internationale Bankpartner',
  description:
    'Rentiers arbeitet mit geprüften Großbanken in über 50 Ländern zusammen. Alle Partner-Banken sind von lokalen Zentralbanken reguliert und staatlich garantiert.',
  alternates: { canonical: 'https://rentierspro.com/partner-banken' },
};

export default function PartnerBankenPage() {
  return <PartnerBankenContent />;
}
