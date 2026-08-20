import { describe, expect, it, vi } from 'vitest';
import type { RentiersSession } from '@/lib/session';
import {
  completePortfolioSelection,
  getPortfolioGuardRedirect,
  validatePortfolioSelection,
  type PortfolioSelectionValues,
} from './PortfolioSelector';

const validValues: PortfolioSelectionValues = {
  portfolio: 'high_yield',
  investmentAmount: '10000',
  riskAccepted: true,
};

const session: RentiersSession = {
  step: 'kyc_approved',
  email: 'ada@example.com',
  firstName: 'Ada',
  phone: '+49 123 456 789',
  registeredAt: '2026-08-20T14:00:00.000Z',
};

describe('validatePortfolioSelection', () => {
  it('requires a portfolio, minimum investment, and risk acceptance', () => {
    expect(
      validatePortfolioSelection({
        portfolio: '',
        investmentAmount: '4999',
        riskAccepted: false,
      }),
    ).toEqual({
      portfolio: 'Please select a portfolio',
      investmentAmount: 'Minimum investment is €5,000',
      riskAccepted: 'Please acknowledge the investment risk',
    });
  });

  it('accepts a valid portfolio selection', () => {
    expect(validatePortfolioSelection(validValues)).toEqual({});
  });
});

describe('completePortfolioSelection', () => {
  it('submits, updates the session, tracks, and navigates', async () => {
    const submit = vi.fn().mockResolvedValue(undefined);
    const updateSession = vi.fn();
    const trackGoal = vi.fn();
    const trackCustomEvent = vi.fn();
    const push = vi.fn();

    await completePortfolioSelection(validValues, session.email, {
      submit,
      updateSession,
      trackGoal,
      trackCustomEvent,
      push,
    });

    expect(submit).toHaveBeenCalledWith({
      type: 'portfolio',
      email: 'ada@example.com',
      portfolio: 'high_yield',
      investmentAmount: '10000',
    });
    expect(updateSession).toHaveBeenCalledWith({
      step: 'portfolio_selected',
      portfolio: 'high_yield',
      investmentAmount: '10000',
    });
    expect(trackGoal).toHaveBeenCalledWith('portfolio_selected');
    expect(trackCustomEvent).toHaveBeenCalledWith('PortfolioSelected');
    expect(push).toHaveBeenCalledWith('/account/deposit');
  });

  it('does not advance when submission fails', async () => {
    const updateSession = vi.fn();
    const trackGoal = vi.fn();
    const trackCustomEvent = vi.fn();
    const push = vi.fn();

    await expect(
      completePortfolioSelection(validValues, session.email, {
        submit: vi.fn().mockRejectedValue(new Error('Webhook failed')),
        updateSession,
        trackGoal,
        trackCustomEvent,
        push,
      }),
    ).rejects.toThrow('Webhook failed');

    expect(updateSession).not.toHaveBeenCalled();
    expect(trackGoal).not.toHaveBeenCalled();
    expect(trackCustomEvent).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});

describe('getPortfolioGuardRedirect', () => {
  it('redirects missing account details to registration', () => {
    expect(getPortfolioGuardRedirect(null)).toBe('/account/register');
    expect(getPortfolioGuardRedirect({ ...session, email: '' })).toBe(
      '/account/register',
    );
  });

  it('redirects active accounts to the dashboard', () => {
    expect(getPortfolioGuardRedirect({ ...session, step: 'active' })).toBe(
      '/account/dashboard',
    );
  });

  it('allows eligible accounts to continue', () => {
    expect(getPortfolioGuardRedirect(session)).toBeNull();
  });
});
