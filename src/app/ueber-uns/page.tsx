import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: 'Über uns — Rentiers Pro | Mission und Team',
  description:
    'Rentiers Pro wurde gegründet, um Privatanlegern Zugang zu den besten Bankzinsen der Welt zu verschaffen. Erfahren Sie mehr über unsere Mission, unser Team und unsere Werte.',
  alternates: { canonical: 'https://rentierspro.com/ueber-uns' },
};

export default function UeberUnsPage() {
  return <AboutContent />;
}
