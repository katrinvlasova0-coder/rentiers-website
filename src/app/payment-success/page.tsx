'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import AccountShell from '@/components/account/AccountShell';
import { customEvent } from '@/lib/fbpixel';
import { ymGoal } from '@/lib/metrika';
import { ACCOUNT_THEME } from '@/components/account/accountTheme';

export default function PaymentSuccessPage() {
  const analyticsSent = useRef(false);

  useEffect(() => {
    if (analyticsSent.current) return;
    analyticsSent.current = true;
    ymGoal('payment_completed');
    customEvent('DepositCompleted', { source: 'stripe' });
  }, []);

  return (
    <AccountShell>
      <section
        className="mx-auto max-w-xl rounded-2xl border border-cyan-300/10 p-6 text-center shadow-2xl shadow-black/20 sm:p-9"
        style={{ backgroundColor: ACCOUNT_THEME.card }}
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-slate-950"
          style={{ backgroundColor: ACCOUNT_THEME.primary }}
          aria-hidden="true"
        >
          ✓
        </div>
        <h1 className="mt-5 text-2xl font-bold text-white">Payment received</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Thank you. Your payment is being confirmed, and your dashboard will
          show the latest status as soon as processing is complete.
        </p>
        <Link
          href="/account/dashboard"
          className="mt-7 inline-flex w-full items-center justify-center rounded-xl py-3.5 font-semibold text-white"
          style={{
            background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
          }}
        >
          Go to Dashboard →
        </Link>
      </section>
    </AccountShell>
  );
}
