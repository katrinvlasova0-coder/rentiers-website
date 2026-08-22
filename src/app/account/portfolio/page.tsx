'use client';

import AccountShell from '@/components/account/AccountShell';
import PortfolioSelector from '@/components/account/PortfolioSelector';

export default function PortfolioPage() {
  return (
    <AccountShell stepIndex={2}>
      <PortfolioSelector />
    </AccountShell>
  );
}
