import { describe, expect, it, vi } from 'vitest';
import type { RentiersSession } from '@/lib/session';
import {
  calculateDashboardMetrics,
  getDashboardView,
  requestWithdrawal,
} from './Dashboard';

const activeSession: RentiersSession = {
  step: 'active',
  email: 'ada@example.com',
  firstName: 'Ada',
  phone: '+49 123 456 789',
  portfolio: 'balanced',
  investmentAmount: '10000',
  registeredAt: '2026-08-20T14:00:00.000Z',
  portfolioActivatedAt: '2026-08-01T00:00:00.000Z',
};

describe('getDashboardView', () => {
  it('redirects visitors without a session to registration', () => {
    expect(getDashboardView(null)).toBe('register');
  });

  it('shows setup continuation before portfolio selection', () => {
    expect(
      getDashboardView({ ...activeSession, step: 'kyc_approved' }),
    ).toBe('continue');
  });

  it('shows payment progress for selected and pending portfolios', () => {
    expect(
      getDashboardView({ ...activeSession, step: 'portfolio_selected' }),
    ).toBe('pending');
    expect(
      getDashboardView({ ...activeSession, step: 'payment_pending' }),
    ).toBe('pending');
  });

  it('shows investment metrics for active accounts', () => {
    expect(getDashboardView(activeSession)).toBe('active');
  });
});

describe('calculateDashboardMetrics', () => {
  it('calculates expected annual return and remaining payout days', () => {
    expect(
      calculateDashboardMetrics(activeSession, new Date('2026-08-20T00:00:00.000Z')),
    ).toEqual({
      deposited: 10000,
      expectedReturn: 1600,
      daysUntilPayout: 346,
    });
  });

  it('does not return negative payout days', () => {
    expect(
      calculateDashboardMetrics(activeSession, new Date('2027-09-01T00:00:00.000Z'))
        .daysUntilPayout,
    ).toBe(0);
  });
});

describe('requestWithdrawal', () => {
  it('submits the account email, IBAN, and amount', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);

    await requestWithdrawal(
      { iban: 'DE89 3704 0044 0532 0130 00', amount: '10000' },
      activeSession.email,
      submit,
    );

    expect(submit).toHaveBeenCalledWith({
      type: 'withdrawal',
      email: activeSession.email,
      iban: 'DE89370400440532013000',
      amount: '10000',
    });
  });

  it('rejects an empty IBAN', async () => {
    await expect(
      requestWithdrawal(
        { iban: '  ', amount: '10000' },
        activeSession.email,
        vi.fn(),
      ),
    ).rejects.toThrow('Enter your IBAN');
  });
});
