'use client';

import AccountShell from '@/components/account/AccountShell';
import Dashboard from '@/components/account/Dashboard';

export default function DashboardPage() {
  return (
    <AccountShell title="Your account">
      <Dashboard />
    </AccountShell>
  );
}
