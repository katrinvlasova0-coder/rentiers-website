'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Check, IdCard, X } from 'lucide-react';
import { submitOnboarding } from '@/lib/submitOnboarding';
import { ymGoal } from '@/lib/metrika';
import { customEvent } from '@/lib/fbpixel';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  docType: string;
  docNumber: string;
  investmentAmount: string;
  portfolio: string;
  sourceOfFunds: string;
  howHeard: string;
  consentAge: boolean;
  consentDisclaimer: boolean;
  consentContact: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRIES = [
  'Germany',
  'Austria',
  'Switzerland',
  'Netherlands',
  'Belgium',
  'France',
  'Italy',
  'Spain',
  'Poland',
  'Czech Republic',
  'Other EU country',
  'United Kingdom',
  'United States',
  'Other',
] as const;

const NATIONALITIES = [...COUNTRIES] as const;

const DOC_TYPES = [
  'Passport',
  'National ID Card',
  'Residence Permit',
  "Driver's Licence",
] as const;

const INVESTMENT_AMOUNTS = [
  '€ 5,000 – 10,000',
  '€ 10,000 – 50,000',
  '€ 50,000 – 100,000',
  '€ 100,000 +',
] as const;

const PORTFOLIOS = [
  { id: 'Conservative', label: 'Conservative', rate: 12, emoji: '🔵' },
  { id: 'Balanced', label: 'Balanced', rate: 16, emoji: '🟣' },
  { id: 'High-Yield', label: 'High-Yield', rate: 20, emoji: '🔷' },
] as const;

const SOURCE_OF_FUNDS = [
  'Employment income',
  'Business income / profits',
  'Savings',
  'Inheritance / gift',
  'Sale of property',
  'Sale of investments',
  'Other',
] as const;

const HOW_HEARD = [
  'Google / search engine',
  'Social media (Instagram, Facebook)',
  'Friend or colleague',
  'Online advertisement',
  'Financial blog / media',
  'Other',
] as const;

const INITIAL_FORM: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  dateOfBirth: '',
  nationality: '',
  docType: '',
  docNumber: '',
  investmentAmount: '',
  portfolio: '',
  sourceOfFunds: '',
  howHeard: '',
  consentAge: false,
  consentDisclaimer: false,
  consentContact: false,
};

const STEP_META: Record<Step, { title: string; subtitle: string }> = {
  1: {
    title: 'Create Your Account',
    subtitle: "Let's start with your basic information",
  },
  2: {
    title: 'Identity Verification',
    subtitle: 'Required by financial regulations (KYC)',
  },
  3: {
    title: 'Investment Profile',
    subtitle: 'Help us find the right portfolio for you',
  },
  4: {
    title: 'Confirm & Submit',
    subtitle: 'Review and confirm your application',
  },
};

const inputBase: CSSProperties = {
  background: '#0d1829',
  border: '1px solid rgba(79, 200, 232, 0.2)',
  borderRadius: 12,
  padding: '12px 16px',
  color: 'white',
  fontSize: 14,
  width: '100%',
  outline: 'none',
};

function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

function isAtLeast18(dateOfBirth: string): boolean {
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age >= 18;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1.5 text-xs font-medium"
      style={{ color: '#94a3b8' }}
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{message}</p>;
}

function SelectArrow() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      aria-hidden
    >
      <path d="M1 1.5L6 6.5L11 1.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AppOnboardingModal({ open, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [visible, setVisible] = useState(false);
  const openedTracked = useRef(false);
  const submittedRef = useRef(false);
  const stepRef = useRef<Step>(1);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  stepRef.current = step;

  const handleClose = useCallback(() => {
    if (!submittedRef.current) {
      ymGoal('onboarding_abandoned', { step: stepRef.current });
      customEvent('OnboardingAbandoned', { step: stepRef.current });
    }
    onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (!openedTracked.current) {
      openedTracked.current = true;
      ymGoal('onboarding_opened');
      customEvent('OnboardingStarted');
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setStep(1);
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitted(false);
      setSubmitting(false);
      setSubmitError('');
      openedTracked.current = false;
      submittedRef.current = false;
    }, 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const fieldStyle = (hasError: boolean): CSSProperties => ({
    ...inputBase,
    borderColor: hasError ? '#f87171' : 'rgba(79, 200, 232, 0.2)',
  });

  const validateStep = (current: Step): FormErrors => {
    const next: FormErrors = {};

    if (current === 1) {
      if (!form.firstName.trim() || form.firstName.trim().length < 2) {
        next.firstName = 'First name must be at least 2 characters';
      }
      if (!form.lastName.trim() || form.lastName.trim().length < 2) {
        next.lastName = 'Last name must be at least 2 characters';
      }
      if (!form.email.trim() || !EMAIL_RE.test(form.email.trim())) {
        next.email = 'Please enter a valid email address';
      }
      if (!form.phone.trim() || digitCount(form.phone) < 7) {
        next.phone = 'Phone must contain at least 7 digits';
      }
      if (!form.country) next.country = 'Please select your country of residence';
    }

    if (current === 2) {
      if (!form.dateOfBirth) {
        next.dateOfBirth = 'Date of birth is required';
      } else if (!isAtLeast18(form.dateOfBirth)) {
        next.dateOfBirth = 'You must be 18 years or older to apply';
      }
      if (!form.nationality) next.nationality = 'Please select your nationality';
      if (!form.docType) next.docType = 'Please select a document type';
      if (!form.docNumber.trim() || form.docNumber.trim().length < 5) {
        next.docNumber = 'Document number must be at least 5 characters';
      }
    }

    if (current === 3) {
      if (!form.investmentAmount) next.investmentAmount = 'Please select an investment amount';
      if (!form.portfolio) next.portfolio = 'Please select a portfolio preference';
      if (!form.sourceOfFunds) next.sourceOfFunds = 'Please select your source of funds';
    }

    if (current === 4) {
      if (!form.consentAge || !form.consentDisclaimer || !form.consentContact) {
        next.consentAge = 'Please accept all required consents';
      }
    }

    return next;
  };

  const trackStepCompleted = (completedStep: Step) => {
    ymGoal(`onboarding_step_${completedStep}_completed`);
    customEvent('OnboardingStep', {
      step: completedStep,
      portfolio: form.portfolio || undefined,
    });
  };

  const goNext = () => {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    trackStepCompleted(step);
    if (step < 4) setStep((step + 1) as Step);
  };

  const goBack = () => {
    setErrors({});
    setSubmitError('');
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleSubmit = async () => {
    const nextErrors = validateStep(4);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');

    const selectedPortfolio = PORTFOLIOS.find((p) => p.id === form.portfolio);
    const portfolioLabel = selectedPortfolio
      ? `${selectedPortfolio.label} ${selectedPortfolio.rate}%`
      : form.portfolio;

    try {
      await submitOnboarding({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.country,
        dateOfBirth: form.dateOfBirth,
        nationality: form.nationality,
        docType: form.docType,
        docNumber: form.docNumber.trim(),
        investmentAmount: form.investmentAmount,
        portfolio: portfolioLabel,
        sourceOfFunds: form.sourceOfFunds,
        howHeard: form.howHeard,
        consentsAccepted: true,
      });

      ymGoal('onboarding_submitted');
      customEvent('OnboardingCompleted', {
        portfolio: portfolioLabel,
        amount: form.investmentAmount,
        country: form.country,
      });

      submittedRef.current = true;
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPortfolio = PORTFOLIOS.find((p) => p.id === form.portfolio);
  const allConsentsAccepted =
    form.consentAge && form.consentDisclaimer && form.consentContact;

  const primaryBtnClass =
    'w-full py-3.5 rounded-xl font-semibold text-white transition-opacity disabled:opacity-50';
  const primaryBtnStyle: CSSProperties = {
    background: 'linear-gradient(90deg, #1D4ED8, #4FC8E8)',
  };
  const ghostBtnClass =
    'px-4 py-3 rounded-xl font-medium text-sm transition-colors border';
  const ghostBtnStyle: CSSProperties = {
    borderColor: 'rgba(79, 200, 232, 0.35)',
    color: '#4FC8E8',
    background: 'transparent',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
        aria-label="Close"
      />

      <div
        className={[
          'relative flex w-full flex-col overflow-hidden',
          'max-h-[100dvh] rounded-t-[20px] rounded-b-none',
          'min-[480px]:max-w-[420px] min-[480px]:max-h-[90vh] min-[480px]:rounded-[24px]',
          'transition-all duration-300 ease-out',
          visible
            ? 'translate-y-0 opacity-100 min-[480px]:scale-100'
            : 'translate-y-full opacity-100 min-[480px]:translate-y-3 min-[480px]:scale-[0.98] min-[480px]:opacity-0',
        ].join(' ')}
        style={{
          background: '#07101f',
          border: '1px solid rgba(79, 200, 232, 0.15)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: '#0d1829' }}
        >
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="font-bold text-base" style={{ color: '#4FC8E8' }}>
              Rentiers
            </span>
            <span className="text-sm truncate" style={{ color: '#94a3b8' }}>
              Account Setup
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-white/5 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" style={{ color: '#94a3b8' }} />
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="flex gap-1 px-0 shrink-0" style={{ background: 'rgba(79, 200, 232, 0.08)' }}>
            {([1, 2, 3, 4] as Step[]).map((s) => (
              <div
                key={s}
                className="flex-1 h-[3px] transition-all duration-300 ease"
                style={{
                  background:
                    s <= step
                      ? 'linear-gradient(90deg, #4FC8E8, #1D4ED8)'
                      : 'rgba(79, 200, 232, 0.15)',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8 min-h-[420px]">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(79, 200, 232, 0.15)' }}
              >
                <Check className="w-8 h-8" style={{ color: '#4FC8E8' }} strokeWidth={2.5} />
              </div>
              <h2 id="onboarding-title" className="text-xl font-bold text-white">
                Application Submitted
              </h2>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#94a3b8' }}>
                We&apos;ve received your information and will review your application. A member of
                our team will contact you at{' '}
                <span className="text-white">{form.email}</span> within 3 business days.
              </p>

              <div className="w-full h-px my-6" style={{ background: 'rgba(79, 200, 232, 0.15)' }} />

              <p
                className="text-xs uppercase tracking-wider font-semibold self-start"
                style={{ color: '#4FC8E8' }}
              >
                What happens next:
              </p>
              <ul className="mt-3 space-y-2 self-start text-left w-full">
                {[
                  'Application review (1–2 business days)',
                  'Identity verification confirmation',
                  'Account activation & onboarding call',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#4FC8E8' }} />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onClose}
                className={`${ghostBtnClass} mt-8 w-full`}
                style={ghostBtnStyle}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>
                Step {step} of 4
              </p>
              <h2 id="onboarding-title" className="text-lg font-bold text-white">
                {STEP_META[step].title}
              </h2>
              <p className="text-sm mt-1 mb-5" style={{ color: '#94a3b8' }}>
                {STEP_META[step].subtitle}
              </p>

              {step === 2 && (
                <p className="text-xs mb-5 leading-relaxed" style={{ color: '#64748b' }}>
                  Your data is encrypted and stored securely. We follow GDPR and AML compliance
                  standards.
                </p>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel htmlFor="ob-firstName">First Name</FieldLabel>
                      <input
                        id="ob-firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="John"
                        value={form.firstName}
                        onChange={(e) => update('firstName', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.firstName
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={fieldStyle(!!errors.firstName)}
                      />
                      <FieldError message={errors.firstName} />
                    </div>
                    <div>
                      <FieldLabel htmlFor="ob-lastName">Last Name</FieldLabel>
                      <input
                        id="ob-lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={(e) => update('lastName', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.lastName
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={fieldStyle(!!errors.lastName)}
                      />
                      <FieldError message={errors.lastName} />
                    </div>
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-email">Email</FieldLabel>
                    <input
                      id="ob-email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4FC8E8';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.email
                          ? '#f87171'
                          : 'rgba(79, 200, 232, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      style={fieldStyle(!!errors.email)}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-phone">Phone</FieldLabel>
                    <input
                      id="ob-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+49 123 456 789"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4FC8E8';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.phone
                          ? '#f87171'
                          : 'rgba(79, 200, 232, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      style={fieldStyle(!!errors.phone)}
                    />
                    <FieldError message={errors.phone} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-country">Country of Residence</FieldLabel>
                    <div className="relative">
                      <select
                        id="ob-country"
                        value={form.country}
                        onChange={(e) => update('country', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.country
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{
                          ...fieldStyle(!!errors.country),
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          paddingRight: 36,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>
                          Select country
                        </option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError message={errors.country} />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <FieldLabel htmlFor="ob-dob">Date of Birth</FieldLabel>
                    <input
                      id="ob-dob"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => update('dateOfBirth', e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#4FC8E8';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = errors.dateOfBirth
                          ? '#f87171'
                          : 'rgba(79, 200, 232, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      style={{
                        ...fieldStyle(!!errors.dateOfBirth),
                        colorScheme: 'dark',
                      }}
                    />
                    <FieldError message={errors.dateOfBirth} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-nationality">Nationality</FieldLabel>
                    <div className="relative">
                      <select
                        id="ob-nationality"
                        value={form.nationality}
                        onChange={(e) => update('nationality', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.nationality
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{
                          ...fieldStyle(!!errors.nationality),
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          paddingRight: 36,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>
                          Select nationality
                        </option>
                        {NATIONALITIES.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError message={errors.nationality} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-docType">Document Type</FieldLabel>
                    <div className="relative">
                      <select
                        id="ob-docType"
                        value={form.docType}
                        onChange={(e) => update('docType', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.docType
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{
                          ...fieldStyle(!!errors.docType),
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          paddingRight: 36,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>
                          Select document type
                        </option>
                        {DOC_TYPES.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError message={errors.docType} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-docNumber">Document Number</FieldLabel>
                    <div className="relative">
                      <input
                        id="ob-docNumber"
                        type="text"
                        autoComplete="off"
                        placeholder="AB1234567"
                        value={form.docNumber}
                        onChange={(e) => update('docNumber', e.target.value)}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#4FC8E8';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 200, 232, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = errors.docNumber
                            ? '#f87171'
                            : 'rgba(79, 200, 232, 0.2)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        style={{ ...fieldStyle(!!errors.docNumber), paddingRight: 44 }}
                      />
                      <IdCard
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                        style={{ color: '#4FC8E8' }}
                        aria-hidden
                      />
                    </div>
                    <FieldError message={errors.docNumber} />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                      Planned Investment Amount
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {INVESTMENT_AMOUNTS.map((amount) => {
                        const selected = form.investmentAmount === amount;
                        return (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => update('investmentAmount', amount)}
                            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                            style={{
                              border: `1px solid ${selected ? '#4FC8E8' : '#1a2844'}`,
                              background: selected ? 'rgba(79, 200, 232, 0.08)' : 'transparent',
                              color: 'white',
                            }}
                          >
                            {amount}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError message={errors.investmentAmount} />
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                      Portfolio Preference
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {PORTFOLIOS.map((p) => {
                        const selected = form.portfolio === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => update('portfolio', p.id)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                            style={{
                              border: `1px solid ${selected ? '#4FC8E8' : '#1a2844'}`,
                              background: selected ? 'rgba(79, 200, 232, 0.08)' : 'transparent',
                              color: 'white',
                            }}
                          >
                            <span>
                              {p.emoji} {p.label}
                            </span>
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-md"
                              style={{
                                background: 'rgba(79, 200, 232, 0.12)',
                                color: '#4FC8E8',
                              }}
                            >
                              {p.rate}% p.a.
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <FieldError message={errors.portfolio} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-sof">Source of Funds</FieldLabel>
                    <div className="relative">
                      <select
                        id="ob-sof"
                        value={form.sourceOfFunds}
                        onChange={(e) => update('sourceOfFunds', e.target.value)}
                        style={{
                          ...fieldStyle(!!errors.sourceOfFunds),
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          paddingRight: 36,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" disabled>
                          Select source of funds
                        </option>
                        {SOURCE_OF_FUNDS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                    <FieldError message={errors.sourceOfFunds} />
                  </div>

                  <div>
                    <FieldLabel htmlFor="ob-heard">How did you hear about us?</FieldLabel>
                    <div className="relative">
                      <select
                        id="ob-heard"
                        value={form.howHeard}
                        onChange={(e) => update('howHeard', e.target.value)}
                        style={{
                          ...fieldStyle(false),
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          paddingRight: 36,
                          cursor: 'pointer',
                        }}
                      >
                        <option value="">Optional</option>
                        {HOW_HEARD.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <SelectArrow />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-5">
                  <div
                    className="rounded-xl p-4 space-y-2 text-sm"
                    style={{ background: '#0d1829' }}
                  >
                    <p style={{ color: '#94a3b8' }}>
                      Name:{' '}
                      <span className="text-white">
                        {form.firstName} {form.lastName}
                      </span>
                    </p>
                    <p style={{ color: '#94a3b8' }}>
                      Email: <span className="text-white">{form.email}</span>
                    </p>
                    <p style={{ color: '#94a3b8' }}>
                      Country: <span className="text-white">{form.country}</span>
                    </p>
                    <p style={{ color: '#94a3b8' }}>
                      Portfolio:{' '}
                      <span className="text-white">
                        {selectedPortfolio
                          ? `${selectedPortfolio.label} — ${selectedPortfolio.rate}%`
                          : form.portfolio}
                      </span>
                    </p>
                    <p style={{ color: '#94a3b8' }}>
                      Investment: <span className="text-white">{form.investmentAmount}</span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    {(
                      [
                        {
                          key: 'consentAge' as const,
                          label: 'I confirm that I am 18 years of age or older.',
                        },
                        {
                          key: 'consentDisclaimer' as const,
                          label:
                            'I understand that Rentiers is a technology platform, not a licensed investment advisor. Deposits are held at regulated partner banks. Returns are not guaranteed.',
                        },
                        {
                          key: 'consentContact' as const,
                          label:
                            'I agree to be contacted by the Rentiers team at the email and phone number I have provided.',
                        },
                      ] as const
                    ).map((item) => (
                      <label
                        key={item.key}
                        className="flex items-start gap-3 cursor-pointer text-sm leading-snug"
                        style={{ color: '#cbd5e1' }}
                      >
                        <span className="relative mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            checked={form[item.key]}
                            onChange={(e) => update(item.key, e.target.checked)}
                            className="peer sr-only"
                          />
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded border transition-colors"
                            style={{
                              borderColor: form[item.key] ? '#4FC8E8' : 'rgba(79, 200, 232, 0.35)',
                              background: form[item.key] ? '#4FC8E8' : 'transparent',
                            }}
                            aria-hidden
                          >
                            {form[item.key] ? (
                              <Check className="w-3 h-3" style={{ color: '#07101f' }} strokeWidth={3} />
                            ) : null}
                          </span>
                        </span>
                        {item.label}
                      </label>
                    ))}
                    <FieldError message={errors.consentAge} />
                  </div>

                  {submitError && (
                    <p className="text-xs" style={{ color: '#f87171' }}>
                      {submitError}
                    </p>
                  )}
                </div>
              )}

              {/* Footer buttons */}
              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className={ghostBtnClass}
                    style={ghostBtnStyle}
                  >
                    ← Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className={`${primaryBtnClass} ${step > 1 ? 'flex-1' : ''}`}
                    style={primaryBtnStyle}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!allConsentsAccepted || submitting}
                    className={`${primaryBtnClass} flex-1`}
                    style={primaryBtnStyle}
                  >
                    {submitting ? 'Submitting…' : 'Submit Application'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
