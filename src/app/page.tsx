import type { Metadata } from 'next';
import HeroHome from '@/components/marketing/HeroHome';
import ProblemSection from '@/components/marketing/ProblemSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import PortfoliosSection from '@/components/marketing/PortfoliosSection';
import B2BSection from '@/components/marketing/B2BSection';
import Calculator from '@/components/marketing/Calculator';
import BankLogos from '@/components/marketing/BankLogos';
import FeaturesGrid from '@/components/marketing/FeaturesGrid';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';
import CtaBanner from '@/components/marketing/CtaBanner';

export const metadata: Metadata = {
  title: 'Rentiers Pro — Bis zu 20% Jahresrendite auf Bankeinlagen | Festgeld weltweit',
  description:
    'Rentiers bündelt Bankeinlagen weltweit und liefert 12–20% Jahresrendite mit staatlichen Einlagengarantien. Einfach anlegen, Zinsen empfangen. Jetzt kostenlos starten.',
  alternates: { canonical: 'https://rentierspro.com' },
};

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ProblemSection />
      <HowItWorks />
      <PortfoliosSection />
      <B2BSection />
      <Calculator />
      <BankLogos />
      <FeaturesGrid />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
