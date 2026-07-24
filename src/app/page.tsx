import type { Metadata } from 'next';
import HeroHome from '@/components/marketing/HeroHome';
import LuxcarBanner from '@/components/marketing/LuxcarBanner';
import ProblemSection from '@/components/marketing/ProblemSection';
import HowItWorks from '@/components/marketing/HowItWorks';
import PortfoliosSection from '@/components/marketing/PortfoliosSection';
import B2BSection from '@/components/marketing/B2BSection';
import Calculator from '@/components/marketing/Calculator';
import BankLogos from '@/components/marketing/BankLogos';
import FeaturesGrid from '@/components/marketing/FeaturesGrid';
import TestimonialsSection from '@/components/marketing/TestimonialsSection';
import CtaBanner from '@/components/marketing/CtaBanner';
import JsonLd from '@/components/layout/JsonLd';
import {
  createMetadata,
  definedTermSchema,
  financialProductSchemas,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Rentiers — Bis zu 20% Jahresrendite auf Bankeinlagen | Festgeld weltweit',
  description:
    'Rentiers bündelt Bankeinlagen weltweit und liefert 12–20% Jahresrendite mit staatlichen Einlagengarantien. Einfach anlegen, Zinsen empfangen. Jetzt kostenlos starten.',
  path: '/',
});

const einlagenarbitrageDefinition =
  'Einlagenarbitrage bezeichnet die Strategie, Kapital in Ländern anzulegen, die regulierte Bankzinsen von 10–25% p.a. bieten — deutlich mehr als die 0,5–3%, die deutsche Banken heute zahlen.';

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          websiteSchema(),
          ...financialProductSchemas(),
          definedTermSchema('Einlagenarbitrage', einlagenarbitrageDefinition),
        ]}
      />
      <HeroHome />
      <LuxcarBanner />
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
