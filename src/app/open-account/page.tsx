import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import { OG_DESCRIPTION_EN } from '@/constants/site';

export const metadata: Metadata = createMetadata({
  title: 'Konto eröffnen — Rentiers',
  description:
    'Eröffnen Sie Ihr Rentiers-Konto in wenigen Schritten. Globale Bankeinlagen mit staatlicher Garantie und 12–20% Jahresrendite.',
  path: '/open-account',
  ogTitle: 'Open a Rentiers account',
  ogDescription: OG_DESCRIPTION_EN,
});

export default function OpenAccountPage() {
  return (
    <div className="flex items-center justify-center px-6 py-24">
      <div className="max-w-md text-center space-y-3">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Konto eröffnen
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Account Setup wird geöffnet…
        </p>
      </div>
    </div>
  );
}
