import type { Metadata } from 'next';
import FaqContent from '@/components/pages/FaqContent';
import JsonLd from '@/components/layout/JsonLd';
import { pageContent } from '@/i18n/pages';
import { createMetadata, definedTermSchema, faqSchema } from '@/lib/seo';

const deFaqs = pageContent.de.faq.categories.flatMap((cat) =>
  cat.items.map((item) => ({ question: item.q, answer: item.a })),
);

export const metadata: Metadata = createMetadata({
  title: 'FAQ — Häufige Fragen zu Rentiers Pro | Festgeld, Rendite, Sicherheit',
  description:
    'Antworten auf alle Fragen zu Rentiers: Wie funktionieren die Portfolios? Wie sicher ist mein Geld? Was sind staatliche Einlagengarantien? Alles erklärt.',
  path: '/faq',
});

const einlagenarbitrageFaq = deFaqs.find((item) => item.question === 'Was ist Einlagenarbitrage?');

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(deFaqs),
          ...(einlagenarbitrageFaq
            ? [definedTermSchema('Einlagenarbitrage', einlagenarbitrageFaq.answer)]
            : []),
        ]}
      />
      <FaqContent />
    </>
  );
}
