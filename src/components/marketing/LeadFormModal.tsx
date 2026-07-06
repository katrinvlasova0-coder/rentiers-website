'use client';

import { useEffect, useRef, useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LeadFormSource } from '@/contexts/LeadFormContext';
import { submitLead } from '@/lib/submitLead';
import { ymGoal } from '@/lib/metrika';
import { useFormAbandonTracking } from '@/hooks/useFormAbandonTracking';

interface Props {
  open: boolean;
  onClose: () => void;
  formSource: LeadFormSource;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{6,20}$/;

const SUCCESS_GOALS: Record<LeadFormSource, string> = {
  contact: 'form_contact_submitted',
  register: 'form_register_success',
  b2b: 'form_b2b_submitted',
  login: 'form_login_success',
};

export default function LeadFormModal({ open, onClose, formSource }: Props) {
  const { p } = useLanguage();
  const lf = p.leadForm;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const startedTracked = useRef(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const filledFields = (['name', 'email', 'phone', 'message'] as const).filter((key) =>
    form[key].trim(),
  );

  useFormAbandonTracking({
    formName: formSource,
    hasStarted,
    isSubmitted: submitted,
    filledFields: [...filledFields],
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setErrors({});
      setSubmitting(false);
      setHasStarted(false);
      startedTracked.current = false;
      setForm({ name: '', email: '', phone: '', message: '' });
    }
  }, [open]);

  if (!open) return null;

  const trackStarted = () => {
    if (startedTracked.current) return;
    startedTracked.current = true;
    setHasStarted(true);
    ymGoal(`form_${formSource}_started`);
  };

  const trackFieldAbandon = (field: string, value: string) => {
    if (!value.trim()) {
      ymGoal('form_field_abandoned', { form: formSource, field });
    }
  };

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.name.trim() || data.name.trim().length < 2) next.name = lf.errName;
    if (!data.email.trim() || !EMAIL_RE.test(data.email.trim())) next.email = lf.errEmail;
    if (!data.phone.trim() || !PHONE_RE.test(data.phone.trim())) next.phone = lf.errPhone;
    if (!data.message.trim() || data.message.trim().length < 10) next.message = lf.errMessage;
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      ymGoal(SUCCESS_GOALS[formSource]);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      const message = err instanceof Error ? err.message : lf.errSubmit;
      ymGoal(`form_${formSource}_error`, { error: message });
      setErrors({ message: lf.errSubmit });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
      hasError ? 'border-red-400' : 'border-[var(--color-border)]'
    } focus:border-[var(--color-primary)]`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label={lf.close}
      />
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        style={{ background: 'white' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100"
          aria-label={lf.close}
        >
          <X className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
              style={{ background: 'rgba(59,59,232,0.1)' }}
            >
              ✓
            </div>
            <h2 id="lead-form-title" className="text-xl font-bold mb-3" style={{ color: 'var(--color-dark)' }}>
              {lf.received}
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {lf.thankYou}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              {lf.close}
            </button>
          </div>
        ) : (
          <>
            <h2 id="lead-form-title" className="text-xl font-bold mb-1 pr-8" style={{ color: 'var(--color-dark)' }}>
              {lf.title}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {lf.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="lead-name" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {lf.name}
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass(!!errors.name)}
                  value={form.name}
                  onFocus={trackStarted}
                  onBlur={(e) => trackFieldAbandon('name', e.target.value)}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {lf.email}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass(!!errors.email)}
                  value={form.email}
                  onFocus={trackStarted}
                  onBlur={(e) => trackFieldAbandon('email', e.target.value)}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {lf.phone}
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClass(!!errors.phone)}
                  value={form.phone}
                  onFocus={trackStarted}
                  onBlur={(e) => trackFieldAbandon('phone', e.target.value)}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="lead-message" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {lf.message}
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  className={`${fieldClass(!!errors.message)} resize-none`}
                  value={form.message}
                  onFocus={trackStarted}
                  onBlur={(e) => trackFieldAbandon('message', e.target.value)}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-semibold text-white disabled:opacity-60"
                style={{ background: 'var(--color-primary)' }}
              >
                {submitting ? lf.sending : lf.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
