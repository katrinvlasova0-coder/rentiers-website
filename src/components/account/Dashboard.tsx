'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { getPortfolio } from '@/lib/portfolios';
import type { RentiersSession } from '@/lib/session';
import {
  submitAccountEvent,
  type AccountEventPayload,
} from '@/lib/submitAccountEvent';
import { ACCOUNT_THEME } from './accountTheme';
import { openAccountStatement } from './AccountStatement';

const SUPPORT_EMAIL = 'hello@rentiers.net';
const DAY_MS = 24 * 60 * 60 * 1000;

const BREAKDOWN = [
  { country: 'Georgia', percentage: 45 },
  { country: 'Armenia', percentage: 35 },
  { country: 'Israel', percentage: 20 },
] as const;

export type DashboardView = 'register' | 'continue' | 'pending' | 'active';

export interface WithdrawalValues {
  iban: string;
  amount: string;
}

export function getDashboardView(
  session: RentiersSession | null,
): DashboardView {
  if (!session?.email) return 'register';
  if (session.step === 'active') return 'active';
  if (
    session.step === 'payment_pending' ||
    session.step === 'portfolio_selected'
  ) {
    return 'pending';
  }
  return 'continue';
}

export function calculateDashboardMetrics(
  session: RentiersSession,
  now = new Date(),
) {
  const deposited = Number(session.investmentAmount) || 0;
  const rate = session.portfolio
    ? (getPortfolio(session.portfolio)?.rate ?? 0)
    : 0;
  const activatedAt = session.portfolioActivatedAt
    ? new Date(session.portfolioActivatedAt).getTime()
    : now.getTime();
  const payoutAt = activatedAt + 365 * DAY_MS;

  return {
    deposited,
    expectedReturn: deposited * (rate / 100),
    daysUntilPayout: Math.max(0, Math.ceil((payoutAt - now.getTime()) / DAY_MS)),
  };
}

export async function requestWithdrawal(
  values: WithdrawalValues,
  email: string,
  submit: (payload: AccountEventPayload) => Promise<void>,
): Promise<void> {
  const iban = values.iban.replace(/\s/g, '').toUpperCase();
  if (iban.length < 15 || iban.length > 34) {
    throw new Error('Enter a valid IBAN (15–34 characters)');
  }
  if (!/^[A-Z]{2}[0-9A-Z]+$/.test(iban)) {
    throw new Error('IBAN must start with a country code (e.g. DE, FR)');
  }

  await submit({
    type: 'withdrawal',
    email,
    iban,
    amount: values.amount.trim() || undefined,
  });
}

function formatEuro(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function SupportLink({ label }: { label: string }) {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-300/10"
      style={{ color: ACCOUNT_THEME.primary }}
    >
      {label}
    </a>
  );
}

function PendingDashboard() {
  const checklist = [
    { label: 'Account created', complete: true },
    { label: 'Portfolio selected', complete: true },
    { label: 'Payment being confirmed', complete: false },
    { label: 'Portfolio activated', complete: false },
  ];

  return (
    <section
      className="rounded-2xl border border-cyan-300/10 p-5 shadow-2xl shadow-black/20 sm:p-7"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.16em]"
        style={{ color: ACCOUNT_THEME.primary }}
      >
        Activation in progress
      </p>
      <h2 className="mt-2 text-2xl font-bold text-white">
        Your payment is being confirmed
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
        We are verifying your deposit and preparing your portfolio. We will
        activate your account as soon as confirmation is complete.
      </p>

      <div className="mt-7">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Account setup</span>
          <span>60%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full"
            style={{
              width: '60%',
              background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
            }}
          />
        </div>
      </div>

      <ul className="mt-7 space-y-3">
        {checklist.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
              style={{
                borderColor: item.complete
                  ? ACCOUNT_THEME.primary
                  : 'rgba(148, 163, 184, 0.35)',
                backgroundColor: item.complete
                  ? 'rgba(79, 200, 232, 0.12)'
                  : 'transparent',
                color: item.complete ? ACCOUNT_THEME.primary : '#64748b',
              }}
            >
              {item.complete ? '✓' : '·'}
            </span>
            <span className={item.complete ? 'text-slate-200' : 'text-slate-500'}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-slate-700/70 pt-6">
        <SupportLink label="Contact Support" />
      </div>
    </section>
  );
}

function ContinueSetup() {
  return (
    <section
      className="rounded-2xl border border-cyan-300/10 p-6 text-center shadow-2xl shadow-black/20 sm:p-8"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
    >
      <h2 className="text-2xl font-bold text-white">Complete your account setup</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        Choose a portfolio and fund your investment before opening the
        dashboard.
      </p>
      <Link
        href="/account"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-3 font-semibold text-white"
        style={{
          background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
        }}
      >
        Continue setup →
      </Link>
    </section>
  );
}

function ActiveDashboard({ session }: { session: RentiersSession }) {
  const portfolio = session.portfolio ? getPortfolio(session.portfolio) : undefined;
  const metrics = calculateDashboardMetrics(session);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [values, setValues] = useState<WithdrawalValues>({
    iban: '',
    amount: session.investmentAmount ?? '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleWithdrawal = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      await requestWithdrawal(values, session.email, submitAccountEvent);
      setSuccess(true);
      setWithdrawalOpen(false);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Unable to submit your request. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cards = [
    { label: 'Deposited', value: formatEuro(metrics.deposited) },
    { label: 'Expected annual return', value: formatEuro(metrics.expectedReturn) },
    { label: 'Days until payout', value: String(metrics.daysUntilPayout) },
  ];

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border border-cyan-300/10 p-5 shadow-2xl shadow-black/20 sm:p-7"
        style={{ backgroundColor: ACCOUNT_THEME.card }}
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: ACCOUNT_THEME.primary }}
            >
              Active portfolio
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {portfolio?.label ?? 'Your portfolio'}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {portfolio ? `${portfolio.rate}% expected annual return` : 'Portfolio active'}
            </p>
          </div>
          <span className="w-fit rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            Active
          </span>
        </div>

        <dl className="mt-7 grid gap-3 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-slate-700/70 bg-slate-950/20 p-4"
            >
              <dt className="text-xs text-slate-400">{card.label}</dt>
              <dd className="mt-2 text-xl font-bold text-white">{card.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-slate-500">
          Expected returns are illustrative and not guaranteed.
        </p>
      </section>

      <section
        className="rounded-2xl border border-cyan-300/10 p-5 sm:p-7"
        style={{ backgroundColor: ACCOUNT_THEME.card }}
      >
        <h3 className="text-lg font-bold text-white">Deposit breakdown</h3>
        <p className="mt-1 text-sm text-slate-400">
          Illustrative allocation across partner markets.
        </p>
        <div className="mt-6 space-y-4">
          {BREAKDOWN.map((item) => (
            <div key={item.country}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{item.country}</span>
                <span className="font-semibold text-white">{item.percentage}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: ACCOUNT_THEME.primary,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="rounded-2xl border border-cyan-300/10 p-5 sm:p-7"
        style={{ backgroundColor: ACCOUNT_THEME.card }}
      >
        <h3 className="text-lg font-bold text-white">Account actions</h3>

        {success && (
          <div
            role="status"
            className="mt-4 rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200"
          >
            Withdrawal request received. Processing usually takes up to 3
            business days — we will email you at {session.email}.
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setWithdrawalOpen((current) => !current);
              setError('');
              setSuccess(false);
            }}
            className="min-h-11 rounded-xl px-5 py-3 text-sm font-semibold text-white"
            style={{
              background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
            }}
          >
            {withdrawalOpen ? 'Cancel withdrawal' : 'Request Withdrawal'}
          </button>
          <button
            type="button"
            onClick={() => {
              try {
                openAccountStatement(session);
                setError('');
              } catch (err) {
                setError(
                  err instanceof Error
                    ? err.message
                    : 'Could not open statement',
                );
              }
            }}
            className="min-h-11 rounded-xl border border-cyan-300/25 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-300/10"
            style={{ color: ACCOUNT_THEME.primary }}
          >
            Download Statement
          </button>
          <SupportLink label="Contact Manager" />
        </div>

        {withdrawalOpen && (
          <form
            onSubmit={handleWithdrawal}
            className="mt-6 space-y-4 border-t border-slate-700/70 pt-6"
          >
            <div>
              <label
                htmlFor="withdrawal-iban"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                IBAN
              </label>
              <input
                id="withdrawal-iban"
                name="iban"
                required
                autoComplete="off"
                value={values.iban}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    iban: event.target.value,
                  }))
                }
                placeholder="DE89 3704 0044 0532 0130 00"
                className="w-full rounded-xl border border-cyan-300/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/60"
              />
            </div>
            <div>
              <label
                htmlFor="withdrawal-amount"
                className="mb-1.5 block text-xs font-medium text-slate-400"
              >
                Amount (EUR, optional)
              </label>
              <input
                id="withdrawal-amount"
                name="amount"
                type="number"
                min="1"
                step="1"
                value={values.amount}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    amount: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-cyan-300/20 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300/60"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="min-h-11 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: ACCOUNT_THEME.blue }}
            >
              {submitting ? 'Submitting…' : 'Submit withdrawal request'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export function Dashboard() {
  const router = useRouter();
  const { session, ready } = useSession();
  const view = ready ? getDashboardView(session) : null;

  useEffect(() => {
    if (view === 'register') router.replace('/account/register');
  }, [router, view]);

  if (!ready || !view || view === 'register') return null;
  if (view === 'continue') return <ContinueSetup />;
  if (view === 'pending') return <PendingDashboard />;
  if (!session) return null;

  return <ActiveDashboard session={session} />;
}

export default Dashboard;
