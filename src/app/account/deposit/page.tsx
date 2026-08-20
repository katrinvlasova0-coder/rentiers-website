'use client';

import AccountShell from '@/components/account/AccountShell';
import DepositScreen from '@/components/account/DepositScreen';

export default function DepositPage() {
  return (
    <AccountShell stepIndex={3}>
      <DepositScreen />
    </AccountShell>
  );
}
