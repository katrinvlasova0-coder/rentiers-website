'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPortfolio } from '@/lib/portfolios';
import type { RentiersSession } from '@/lib/session';
import { ACCOUNT_THEME } from './accountTheme';

interface DepositPaymentDependencies {
  paymentLink: string | undefined;
  now: () => number;
  updateSession: (partial: Partial<RentiersSession>) => unknown;
  redirect: (url: string) => void;
}

export function getDepositGuardRedirect(
  session: RentiersSession | null,
): string | null {
  if (!session?.email) return '/account/register';
  if (session.step === 'active') return '/account/dashboard';
  if (!session.portfolio || !session.investmentAmount) {
    return '/account/portfolio';
  }
  return null;
}

export function startDepositPayment(
  email: string,
  dependencies: DepositPaymentDependencies,
): string | null {
  if (!dependencies.paymentLink) return 'Payment is not configured.';

  const local = email.split('@')[0] || 'user';
  const stripeRef = `rentiers_${dependencies.now()}_${local}`;

  let url: URL;
  try {
    url = new URL(dependencies.paymentLink);
    const isLocalHttp =
      url.protocol === 'http:' &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
    if (url.protocol !== 'https:' && !isLocalHttp) {
      return 'Payment is not configured.';
    }
    url.searchParams.set('prefilled_email', email);
    url.searchParams.set('client_reference_id', stripeRef);
  } catch {
    return 'Payment is not configured.';
  }

  dependencies.updateSession({ stripeRef, step: 'payment_pending' });
  dependencies.redirect(url.toString());
  return null;
}

export function DepositScreen() {
  const router = useRouter();
  const { session, ready, updateSession } = useSession();
  const [error, setError] = useState('');
  const [paidMessage, setPaidMessage] = useState(false);

  const redirect = ready ? getDepositGuardRedirect(session) : null;

  useEffect(() => {
    if (redirect) router.replace(redirect);
  }, [redirect, router]);

  if (!ready || redirect || !session?.portfolio || !session.investmentAmount) {
    return null;
  }

  const portfolio = getPortfolio(session.portfolio);
  const formattedAmount = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Number(session.investmentAmount));

  const paymentConfigured = Boolean(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK);

  const handlePayment = () => {
    setError('');
    try {
      const nextError = startDepositPayment(session.email, {
        paymentLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
        now: Date.now,
        updateSession,
        redirect: (url) => {
          window.location.href = url;
        },
      });
      if (nextError) setError(nextError);
    } catch {
      setError('Unable to start payment. Please try again.');
    }
  };

  return (
    <section
      className="rounded-2xl border border-cyan-300/10 p-5 shadow-2xl shadow-black/20 sm:p-7"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
    >
      <h2 className="text-xl font-bold text-white">Fund your investment</h2>
      <p className="mt-2 text-sm text-slate-400">
        Review your selection, then continue to our secure Stripe checkout. First payout
        is typically about 12 months after activation.
      </p>

      <dl className="mt-6 divide-y divide-slate-700/70 rounded-xl border border-slate-700/70 bg-slate-950/20 px-4">
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="text-sm text-slate-400">Portfolio</dt>
          <dd className="font-semibold text-white">
            {portfolio?.label ?? session.portfolio}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-4">
          <dt className="text-sm text-slate-400">Deposit amount</dt>
          <dd className="font-semibold text-white">{formattedAmount}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-xl border border-slate-700/70 bg-slate-950/20 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
          Payment methods
        </p>
        <p className="mt-2 text-sm text-slate-300">Card · SEPA · iDEAL</p>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-slate-400">
        <li>Stripe PCI-compliant checkout — we never store card details.</li>
        <li>Funds are received by Rentiers Global Inc.</li>
        <li>Account activation within 3 business days after payment clears.</li>
      </ul>

      <Link
        href="/account/portfolio"
        className="mt-3 inline-block text-sm underline underline-offset-4"
        style={{ color: ACCOUNT_THEME.primary }}
      >
        Change Portfolio
      </Link>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handlePayment}
        disabled={!paymentConfigured}
        className="mt-6 w-full rounded-xl py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
        }}
      >
        Pay Securely with Stripe →
      </button>

      <button
        type="button"
        onClick={() => setPaidMessage(true)}
        className="mt-4 w-full text-sm text-slate-400 underline underline-offset-4 hover:text-white"
      >
        I’ve already paid — check my status
      </button>

      {paidMessage && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3 text-sm text-slate-300"
        >
          We&apos;re checking your payment — this can take up to 24 hours.{' '}
          <Link
            href="/account/dashboard"
            className="font-semibold underline underline-offset-4"
            style={{ color: ACCOUNT_THEME.primary }}
          >
            Go to dashboard
          </Link>
        </p>
      )}
    </section>
  );
}

export default DepositScreen;
