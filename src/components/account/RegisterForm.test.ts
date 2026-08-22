import { describe, expect, it, vi } from 'vitest';
import {
  completeRegistration,
  validateRegistration,
  type RegistrationValues,
} from './RegisterForm';

const validValues: RegistrationValues = {
  firstName: 'Ada',
  email: 'ada@example.com',
  phone: '+49 123 456 789',
  consent: true,
};

describe('validateRegistration', () => {
  it('requires valid account details and consent', () => {
    expect(
      validateRegistration({
        firstName: 'A',
        email: 'invalid',
        phone: '123',
        consent: false,
      }),
    ).toEqual({
      firstName: 'First name must be at least 2 characters',
      email: 'Please enter a valid email address',
      phone: 'Phone must contain at least 7 digits',
      consent: 'Please accept the Terms and Privacy Policy',
    });
  });

  it('accepts valid account details', () => {
    expect(validateRegistration(validValues)).toEqual({});
  });
});

describe('completeRegistration', () => {
  it('submits, stores kyc_approved, tracks, and navigates', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    const setSession = vi.fn();
    const trackGoal = vi.fn();
    const trackCustomEvent = vi.fn();
    const push = vi.fn();

    await completeRegistration(validValues, {
      submit,
      setSession,
      trackGoal,
      trackCustomEvent,
      push,
      now: () => '2026-08-20T14:00:00.000Z',
    });

    expect(submit).toHaveBeenCalledWith({
      type: 'registration',
      firstName: 'Ada',
      email: 'ada@example.com',
      phone: '+49 123 456 789',
      consent: true,
    });
    expect(setSession).toHaveBeenCalledWith({
      step: 'kyc_approved',
      firstName: 'Ada',
      email: 'ada@example.com',
      phone: '+49 123 456 789',
      registeredAt: '2026-08-20T14:00:00.000Z',
    });
    expect(trackGoal).toHaveBeenCalledWith('registration_completed');
    expect(trackCustomEvent).toHaveBeenCalledWith('RegistrationCompleted');
    expect(push).toHaveBeenCalledWith('/account/portfolio');
  });

  it('does not advance when submission fails', async () => {
    const error = new Error('Webhook failed');
    const setSession = vi.fn();
    const trackGoal = vi.fn();
    const trackCustomEvent = vi.fn();
    const push = vi.fn();

    await expect(
      completeRegistration(validValues, {
        submit: vi.fn().mockRejectedValue(error),
        setSession,
        trackGoal,
        trackCustomEvent,
        push,
        now: () => '2026-08-20T14:00:00.000Z',
      }),
    ).rejects.toThrow('Webhook failed');

    expect(setSession).not.toHaveBeenCalled();
    expect(trackGoal).not.toHaveBeenCalled();
    expect(trackCustomEvent).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
