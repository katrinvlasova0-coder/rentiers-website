import { describe, expect, it } from 'vitest';
import type { RentiersSession } from '@/lib/session';
import { getAccountRoute } from './page';

function session(step: RentiersSession['step']): RentiersSession {
  return {
    step,
    email: 'investor@example.com',
    firstName: 'Investor',
    phone: '',
    registeredAt: '2026-08-20T12:00:00.000Z',
  };
}

describe('getAccountRoute', () => {
  it.each(['registered', 'kyc_pending', 'kyc_approved'] as const)(
    'routes %s to portfolio',
    (step) => {
      expect(getAccountRoute(session(step))).toBe('/account/portfolio');
    },
  );

  it('routes portfolio_selected to deposit', () => {
    expect(getAccountRoute(session('portfolio_selected'))).toBe('/account/deposit');
  });

  it.each(['payment_pending', 'active'] as const)(
    'routes %s to dashboard',
    (step) => {
      expect(getAccountRoute(session(step))).toBe('/account/dashboard');
    },
  );

  it('routes a missing session to registration', () => {
    expect(getAccountRoute(null)).toBe('/account/register');
  });
});
