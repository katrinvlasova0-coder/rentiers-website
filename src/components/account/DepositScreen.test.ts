import { describe, expect, it, vi } from 'vitest';
import type { RentiersSession } from '@/lib/session';
import {
  getDepositGuardRedirect,
  startDepositPayment,
} from './DepositScreen';

const session: RentiersSession = {
  step: 'portfolio_selected',
  email: 'ada@example.com',
  firstName: 'Ada',
  phone: '+49 123 456 789',
  portfolio: 'balanced',
  investmentAmount: '10000',
  registeredAt: '2026-08-20T14:00:00.000Z',
};

describe('getDepositGuardRedirect', () => {
  it('requires an account with a selected portfolio and amount', () => {
    expect(getDepositGuardRedirect(null)).toBe('/account/register');
    expect(getDepositGuardRedirect({ ...session, portfolio: undefined })).toBe(
      '/account/portfolio',
    );
    expect(
      getDepositGuardRedirect({ ...session, investmentAmount: undefined }),
    ).toBe('/account/portfolio');
  });

  it('sends active accounts to the dashboard', () => {
    expect(getDepositGuardRedirect({ ...session, step: 'active' })).toBe(
      '/account/dashboard',
    );
  });

  it('allows eligible accounts to pay', () => {
    expect(getDepositGuardRedirect(session)).toBeNull();
  });
});

describe('startDepositPayment', () => {
  it('stores payment_pending and redirects with Stripe identifiers', () => {
    const updateSession = vi.fn();
    const redirect = vi.fn();

    const result = startDepositPayment(session.email, {
      paymentLink: 'https://buy.stripe.com/test?locale=en',
      now: () => 1_723_000_000_000,
      updateSession,
      redirect,
    });

    expect(result).toBeNull();
    expect(updateSession).toHaveBeenCalledWith({
      stripeRef: 'rentiers_1723000000000_ada',
      step: 'payment_pending',
    });
    expect(redirect).toHaveBeenCalledWith(
      'https://buy.stripe.com/test?locale=en&prefilled_email=ada%40example.com&client_reference_id=rentiers_1723000000000_ada',
    );
    expect(updateSession.mock.invocationCallOrder[0]).toBeLessThan(
      redirect.mock.invocationCallOrder[0],
    );
  });

  it('reports missing Stripe configuration without redirecting', () => {
    const updateSession = vi.fn();
    const redirect = vi.fn();

    const result = startDepositPayment(session.email, {
      paymentLink: undefined,
      now: () => 1_723_000_000_000,
      updateSession,
      redirect,
    });

    expect(result).toBe('Payment is not configured.');
    expect(updateSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('reports invalid Stripe configuration without changing the session', () => {
    const updateSession = vi.fn();
    const redirect = vi.fn();

    const result = startDepositPayment(session.email, {
      paymentLink: 'not a URL',
      now: () => 1_723_000_000_000,
      updateSession,
      redirect,
    });

    expect(result).toBe('Payment is not configured.');
    expect(updateSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('allows localhost http payment links for local demo', () => {
    const updateSession = vi.fn();
    const redirect = vi.fn();

    const result = startDepositPayment(session.email, {
      paymentLink: 'http://localhost:3000/payment-success',
      now: () => 1_723_000_000_000,
      updateSession,
      redirect,
    });

    expect(result).toBeNull();
    expect(updateSession).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(
      'http://localhost:3000/payment-success?prefilled_email=ada%40example.com&client_reference_id=rentiers_1723000000000_ada',
    );
  });
});
