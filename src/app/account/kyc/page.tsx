'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** KYC is skipped in Iteration 1 — send users to portfolio setup. */
export default function AccountKycPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account/portfolio');
  }, [router]);

  return null;
}
