'use client';

import { useEffect, useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitLead } from '@/lib/submitLead';

interface Props {
  open: boolean;
  onClose: () => void;
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

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!data.email.trim() || !EMAIL_RE.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.phone.trim() || !PHONE_RE.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Please describe your request (at least 10 characters).';
  }
  return errors;
}

export default function LeadFormModal({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});

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
    }
  }, [open]);

  if (!open) return null;

  const thankYou =
    lang === 'de'
      ? 'Vielen Dank! Wir melden uns innerhalb von 1 Werktag bei Ihnen.'
      : 'Thank you! We will get back to you within 1 business day.';

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

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setErrors({
        message:
          lang === 'de'
            ? 'Senden fehlgeschlagen. Bitte erneut versuchen oder info@rentierspro.com schreiben.'
            : 'Something went wrong. Please try again or email info@rentierspro.com.',
      });
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
        aria-label="Close"
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
          aria-label="Close"
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
              {lang === 'de' ? 'Anfrage erhalten' : 'Request received'}
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {thankYou}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              {lang === 'de' ? 'Schließen' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <h2 id="lead-form-title" className="text-xl font-bold mb-1 pr-8" style={{ color: 'var(--color-dark)' }}>
              Get in touch
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Leave your details and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="lead-name" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Full name *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass(!!errors.name)}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Email *
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass(!!errors.email)}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Phone *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClass(!!errors.phone)}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="lead-message" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Your request *
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  className={`${fieldClass(!!errors.message)} resize-none`}
                  value={form.message}
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
                {submitting ? 'Sending…' : 'Submit request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
