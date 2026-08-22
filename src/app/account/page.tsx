'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccountShell from '@/components/account/AccountShell';
import { useSession } from '@/hooks/useSession';
import type { RentiersSession } from '@/lib/session';

export function getAccountRoute(session: RentiersSession | null): string {
  switch (session?.step) {
    case 'registered':
    case 'kyc_pending':
    case 'kyc_approved':
      return '/account/portfolio';
    case 'portfolio_selected':
      return '/account/deposit';
    case 'payment_pending':
    case 'active':
      return '/account/dashboard';
    default:
      return '/account/register';
  }
}

export default function AccountPage() {
  const router = useRouter();
  const { session, ready } = useSession();

  useEffect(() => {
    if (ready) router.replace(getAccountRoute(session));
  }, [ready, router, session]);

  return (
    <AccountShell>
      <p className="py-16 text-center text-sm text-slate-400">
        {ready ? 'Redirecting to your account…' : 'Loading your account…'}
      </p>
    </AccountShell>
  );
}
