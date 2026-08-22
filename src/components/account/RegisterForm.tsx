'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/useSession';
import { customEvent } from '@/lib/fbpixel';
import { ymGoal } from '@/lib/metrika';
import {
  submitAccountEvent,
  type AccountEventPayload,
} from '@/lib/submitAccountEvent';
import type { RentiersSession } from '@/lib/session';
import { ACCOUNT_THEME } from './accountTheme';

export interface RegistrationValues {
  firstName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export type RegistrationErrors = Partial<
  Record<keyof RegistrationValues, string>
>;

interface RegistrationDependencies {
  submit: (payload: AccountEventPayload) => Promise<void>;
  setSession: (session: RentiersSession) => unknown;
  trackGoal: (goal: string) => void;
  trackCustomEvent: (event: string) => void;
  push: (href: string) => void;
  now: () => string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: RegistrationValues = {
  firstName: '',
  email: '',
  phone: '',
  consent: false,
};

export function validateRegistration(
  values: RegistrationValues,
): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if ((values.phone.match(/\d/g) ?? []).length < 7) {
    errors.phone = 'Phone must contain at least 7 digits';
  }
  if (!values.consent) {
    errors.consent = 'Please accept the Terms and Privacy Policy';
  }

  return errors;
}

export async function completeRegistration(
  values: RegistrationValues,
  dependencies: RegistrationDependencies,
): Promise<void> {
  const firstName = values.firstName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  await dependencies.submit({
    type: 'registration',
    firstName,
    email,
    phone,
    consent: true,
  });

  dependencies.setSession({
    step: 'kyc_approved',
    firstName,
    email,
    phone,
    registeredAt: dependencies.now(),
  });
  dependencies.trackGoal('registration_completed');
  dependencies.trackCustomEvent('RegistrationCompleted');
  dependencies.push('/account/portfolio');
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-slate-400"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const { setSession } = useSession();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof RegistrationValues>(
    key: K,
    value: RegistrationValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      await completeRegistration(values, {
        submit: submitAccountEvent,
        setSession,
        trackGoal: ymGoal,
        trackCustomEvent: customEvent,
        push: router.push,
        now: () => new Date().toISOString(),
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

  const inputClass =
    'w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-400/10';
  const inputStyle = (hasError: boolean) => ({
    backgroundColor: ACCOUNT_THEME.card,
    borderColor: hasError ? '#f87171' : 'rgba(79, 200, 232, 0.2)',
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-cyan-300/10 p-5 shadow-2xl shadow-black/20 sm:p-7"
      style={{ backgroundColor: ACCOUNT_THEME.card }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Create your account</h2>
        <p className="mt-2 text-sm text-slate-400">
          Start with your contact details. It only takes a minute.
        </p>
      </div>

      <div className="space-y-4">
        <Field id="firstName" label="First name" error={errors.firstName}>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="John"
            value={values.firstName}
            onChange={(event) => update('firstName', event.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={inputClass}
            style={inputStyle(Boolean(errors.firstName))}
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@company.com"
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass}
            style={inputStyle(Boolean(errors.email))}
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+49 123 456 789"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass}
            style={inputStyle(Boolean(errors.phone))}
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-300">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update('consent', event.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              className="mt-1 h-4 w-4 shrink-0 accent-cyan-300"
            />
            <span>
              I agree to the{' '}
              <Link
                href="/agb/"
                className="underline underline-offset-2 hover:text-white"
                style={{ color: ACCOUNT_THEME.primary }}
              >
                Terms and Conditions
              </Link>{' '}
              and the{' '}
              <Link
                href="/datenschutz/"
                className="underline underline-offset-2 hover:text-white"
                style={{ color: ACCOUNT_THEME.primary }}
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1.5 text-xs text-red-400">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl py-3.5 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(90deg, ${ACCOUNT_THEME.blue}, ${ACCOUNT_THEME.primary})`,
        }}
      >
        {submitting ? 'Creating account…' : 'Create Account →'}
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        Your information is encrypted and protected.
      </p>
    </form>
  );
}

export default RegisterForm;
