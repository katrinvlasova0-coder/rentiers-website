'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AccountShell from '@/components/account/AccountShell';
import { ACCOUNT_THEME } from '@/components/account/accountTheme';
import { customEvent } from '@/lib/fbpixel';
import { ymGoal } from '@/lib/metrika';
import { verifyActivationSig } from '@/lib/activationSig';
import {
  getSession,
  setSession,
  type PortfolioId,
  type RentiersSession,
} from '@/lib/session';

export interface ActivationParams {
  email: string;
  portfolio: string;
  amount: string;
  activatedAt: string;
  sig: string;
}

interface ActivationDependencies {
  secret: string;
  getSession: () => RentiersSession | null;
  setSession: (session: RentiersSession) => unknown;
  trackGoal: (goal: string) => void;
  trackCustomEvent: (event: string) => void;
  now: () => string;
}

export async function activatePortfolio(
  params: ActivationParams,
  dependencies: ActivationDependencies,
): Promise<boolean> {
  if (
    !params.email ||
    !params.portfolio ||
    !params.amount ||
    !params.activatedAt ||
    !params.sig
  ) {
    return false;
  }

  const valid = await verifyActivationSig({
    ...params,
    secret: dependencies.secret,
  });
  if (!valid) return false;

  const current = dependencies.getSession();
  dependencies.setSession({
    step: 'active',
    email: params.email,
    firstName: current?.firstName || 'Investor',
    phone: current?.phone || '',
    portfolio: params.portfolio as PortfolioId,
    investmentAmount: params.amount,
    portfolioActivatedAt: params.activatedAt,
    registeredAt: current?.registeredAt || dependencies.now(),
  });
  dependencies.trackGoal('portfolio_activated');
  dependencies.trackCustomEvent('PortfolioActivated');
  return true;
}

function ActivationCard({
  state,
}: {
  state: 'loading' | 'success' | 'error';
}) {
  const copy = {
    loading: {
      mark: '…',
      title: 'Activating your portfolio',
      body: 'Please wait while we verify your secure activation link.',
    },
    success: {
      mark: '✓',
      title: 'Portfolio activated',
      body: 'Your portfolio is active. Taking you to your dashboard…',
    },
    error: {
      mark: '!',
      title: 'Activation link is invalid',
      body: 'This link is incomplete or could not be verified. Ask your manager for a new activation link.',
    },
  }[state];

  return (
    <section
      className="mx-auto max-w-xl rounded-2xl border border-cyan-300/10 p-6 text-center shadow-2xl shadow-black/20 sm:p-9"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
      aria-live="polite"
    >
      <div
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-slate-950"
        style={{
          backgroundColor:
            state === 'error' ? '#f87171' : ACCOUNT_THEME.primary,
        }}
        aria-hidden="true"
      >
        {copy.mark}
      </div>
      <h1 className="mt-5 text-2xl font-bold text-white">{copy.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{copy.body}</p>
    </section>
  );
}

function ActivateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const activation = useRef<Promise<boolean> | null>(null);

  useEffect(() => {
    const params: ActivationParams = {
      email: searchParams.get('email') || '',
      portfolio: searchParams.get('portfolio') || '',
      amount: searchParams.get('amount') || '',
      activatedAt: searchParams.get('activatedAt') || '',
      sig: searchParams.get('sig') || '',
    };

    activation.current ??= activatePortfolio(params, {
      secret: process.env.NEXT_PUBLIC_ACTIVATION_SECRET || '',
      getSession,
      setSession,
      trackGoal: ymGoal,
      trackCustomEvent: customEvent,
      now: () => new Date().toISOString(),
    });

    let cancelled = false;
    let redirectTimer: ReturnType<typeof setTimeout> | undefined;

    void activation.current.then((valid) => {
      if (cancelled) return;
      if (!valid) {
        setState('error');
        return;
      }

      setState('success');
      redirectTimer = setTimeout(() => {
        router.replace('/account/dashboard');
      }, 1200);
    });

    return () => {
      cancelled = true;
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [router, searchParams]);

  return (
    <AccountShell>
      <ActivationCard state={state} />
    </AccountShell>
  );
}

export default function ActivatePage() {
  return (
    <Suspense
      fallback={
        <AccountShell>
          <ActivationCard state="loading" />
        </AccountShell>
      }
    >
      <ActivateContent />
    </Suspense>
  );
}
