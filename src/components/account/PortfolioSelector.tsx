'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { customEvent } from '@/lib/fbpixel';
import { ymGoal } from '@/lib/metrika';
import { MIN_INVESTMENT_EUR, PORTFOLIOS } from '@/lib/portfolios';
import type { PortfolioId, RentiersSession } from '@/lib/session';
import {
  submitAccountEvent,
  type AccountEventPayload,
} from '@/lib/submitAccountEvent';
import { ACCOUNT_THEME } from './accountTheme';

export interface PortfolioSelectionValues {
  portfolio: PortfolioId | '';
  investmentAmount: string;
  riskAccepted: boolean;
}

export type PortfolioSelectionErrors = Partial<
  Record<keyof PortfolioSelectionValues, string>
>;

interface PortfolioSelectionDependencies {
  submit: (payload: AccountEventPayload) => Promise<void>;
  updateSession: (partial: Partial<RentiersSession>) => unknown;
  trackGoal: (goal: string) => void;
  trackCustomEvent: (event: string) => void;
  push: (href: string) => void;
}

const INITIAL_VALUES: PortfolioSelectionValues = {
  portfolio: '',
  investmentAmount: String(MIN_INVESTMENT_EUR),
  riskAccepted: false,
};

export function validatePortfolioSelection(
  values: PortfolioSelectionValues,
): PortfolioSelectionErrors {
  const errors: PortfolioSelectionErrors = {};
  const amount = Number(values.investmentAmount);

  if (!values.portfolio) {
    errors.portfolio = 'Please select a portfolio';
  }
  if (!Number.isFinite(amount) || amount < MIN_INVESTMENT_EUR) {
    errors.investmentAmount = 'Minimum investment is €5,000';
  }
  if (!values.riskAccepted) {
    errors.riskAccepted = 'Please acknowledge the investment risk';
  }

  return errors;
}

export async function completePortfolioSelection(
  values: PortfolioSelectionValues,
  email: string,
  dependencies: PortfolioSelectionDependencies,
): Promise<void> {
  if (!values.portfolio) {
    throw new Error('A portfolio selection is required');
  }

  await dependencies.submit({
    type: 'portfolio',
    email,
    portfolio: values.portfolio,
    investmentAmount: values.investmentAmount,
  });
  dependencies.updateSession({
    step: 'portfolio_selected',
    portfolio: values.portfolio,
    investmentAmount: values.investmentAmount,
  });
  dependencies.trackGoal('portfolio_selected');
  dependencies.trackCustomEvent('PortfolioSelected');
  dependencies.push('/account/deposit');
}

export function getPortfolioGuardRedirect(
  session: RentiersSession | null,
): string | null {
  if (!session?.email) return '/account/register';
  if (session.step === 'active') return '/account/dashboard';
  return null;
}

export function PortfolioSelector() {
  const router = useRouter();
  const { session, ready, updateSession } = useSession();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<PortfolioSelectionErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirect = ready ? getPortfolioGuardRedirect(session) : null;

  useEffect(() => {
    if (redirect) router.replace(redirect);
  }, [redirect, router]);

  const update = <K extends keyof PortfolioSelectionValues>(
    key: K,
    value: PortfolioSelectionValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validatePortfolioSelection(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !session?.email) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      await completePortfolioSelection(values, session.email, {
        submit: submitAccountEvent,
        updateSession,
        trackGoal: ymGoal,
        trackCustomEvent: customEvent,
        push: router.push,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready || redirect) return null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-cyan-300/10 p-5 shadow-2xl shadow-black/20 sm:p-7"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
    >
      <div>
        <h2 className="text-xl font-bold text-white">Choose your portfolio</h2>
        <p className="mt-2 text-sm text-slate-400">
          Select the strategy that best matches your investment goals.
        </p>
      </div>

      <div
        role="status"
        className="rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm text-amber-100"
      >
        Identity verification will be required before portfolio activation.
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-slate-300">
          Portfolio strategy
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {PORTFOLIOS.map((portfolio) => {
            const selected = values.portfolio === portfolio.id;
            return (
              <label
                key={portfolio.id}
                className="relative cursor-pointer rounded-xl border p-4 transition"
                style={{
                  borderColor: selected
                    ? ACCOUNT_THEME.primary
                    : 'rgba(79, 200, 232, 0.16)',
                  backgroundColor: selected
                    ? 'rgba(79, 200, 232, 0.1)'
                    : 'rgba(9, 20, 39, 0.65)',
                }}
              >
                <input
                  type="radio"
                  name="portfolio"
                  value={portfolio.id}
                  checked={selected}
                  onChange={() => update('portfolio', portfolio.id)}
                  className="sr-only"
                />
                {portfolio.popular && (
                  <span
                    className="mb-3 inline-block rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950"
                    style={{ backgroundColor: ACCOUNT_THEME.primary }}
                  >
                    Most Popular
                  </span>
                )}
                <span className="block font-semibold text-white">
                  {portfolio.label}
                </span>
                <span
                  className="mt-2 block text-2xl font-bold"
                  style={{ color: ACCOUNT_THEME.primary }}
                >
                  {portfolio.rate}%
                </span>
                <span className="mt-1 block text-xs text-slate-400">
                  {portfolio.blurb}
                </span>
                <span className="mt-4 block text-[11px] leading-relaxed text-slate-500">
                  Expected returns. Not guaranteed.
                </span>
              </label>
            );
          })}
        </div>
        {errors.portfolio && (
          <p className="mt-2 text-xs text-red-400">{errors.portfolio}</p>
        )}
      </fieldset>

      <div>
        <label
          htmlFor="investmentAmount"
          className="mb-1.5 block text-xs font-medium text-slate-400"
        >
          Investment amount (EUR)
        </label>
        <input
          id="investmentAmount"
          name="investmentAmount"
          type="number"
          min={MIN_INVESTMENT_EUR}
          step="1"
          value={values.investmentAmount}
          onChange={(event) => update('investmentAmount', event.target.value)}
          aria-invalid={Boolean(errors.investmentAmount)}
          aria-describedby={
            errors.investmentAmount ? 'investmentAmount-error' : undefined
          }
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:ring-2 focus:ring-cyan-400/10"
          style={{
            backgroundColor: 'rgba(9, 20, 39, 0.65)',
            borderColor: errors.investmentAmount
              ? '#f87171'
              : 'rgba(79, 200, 232, 0.2)',
          }}
        />
        {errors.investmentAmount && (
          <p
            id="investmentAmount-error"
            className="mt-1.5 text-xs text-red-400"
          >
            {errors.investmentAmount}
          </p>
        )}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-300">
          <input
            type="checkbox"
            checked={values.riskAccepted}
            onChange={(event) => update('riskAccepted', event.target.checked)}
            aria-invalid={Boolean(errors.riskAccepted)}
            aria-describedby={
              errors.riskAccepted ? 'riskAccepted-error' : undefined
            }
            className="mt-1 h-4 w-4 shrink-0 accent-cyan-300"
          />
          <span>
            I understand that investment returns are not guaranteed and capital
            is at risk.
          </span>
        </label>
        {errors.riskAccepted && (
          <p id="riskAccepted-error" className="mt-1.5 text-xs text-red-400">
            {errors.riskAccepted}
          </p>
        )}
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl py-3.5 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
        }}
      >
        {submitting ? 'Saving selection…' : 'Continue to Deposit →'}
      </button>
    </form>
  );
}

export default PortfolioSelector;
