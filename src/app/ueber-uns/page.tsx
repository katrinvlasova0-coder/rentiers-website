import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Über uns — Rentiers | Mission und Team',
  description:
    'Rentiers wurde gegründet, um Privatanlegern Zugang zu den besten Bankzinsen der Welt zu verschaffen. Erfahren Sie mehr über unsere Mission, unser Team und unsere Werte.',
  path: '/ueber-uns',
});

export default function UeberUnsPage() {
  return <AboutContent />;
}
