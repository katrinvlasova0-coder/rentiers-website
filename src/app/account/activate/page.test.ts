import { describe, expect, it, vi } from 'vitest';
import { createActivationSig } from '@/lib/activationSig';
import { activatePortfolio, type ActivationParams } from './page';

const values: ActivationParams = {
  email: 'manager-choice@example.com',
  portfolio: 'balanced',
  amount: '25000',
  activatedAt: '2026-08-20',
  sig: '',
};

describe('activatePortfolio', () => {
  it('rejects an invalid signature without writing a session', async () => {
    const setSession = vi.fn();

    const result = await activatePortfolio(
      { ...values, sig: 'invalid' },
      {
        secret: 'activation-secret',
        getSession: vi.fn(),
        setSession,
        trackGoal: vi.fn(),
        trackCustomEvent: vi.fn(),
        now: () => '2026-08-20T12:00:00.000Z',
      },
    );

    expect(result).toBe(false);
    expect(setSession).not.toHaveBeenCalled();
  });

  it('uses signed manager values even when another session exists', async () => {
    const secret = 'activation-secret';
    const sig = await createActivationSig({ ...values, secret });
    const setSession = vi.fn();
    const trackGoal = vi.fn();
    const trackCustomEvent = vi.fn();

    const result = await activatePortfolio(
      { ...values, sig },
      {
        secret,
        getSession: () => ({
          step: 'payment_pending',
          email: 'browser-session@example.com',
          firstName: 'Ada',
          phone: '+49 123',
          portfolio: 'conservative',
          investmentAmount: '5000',
          registeredAt: '2026-08-01T00:00:00.000Z',
        }),
        setSession,
        trackGoal,
        trackCustomEvent,
        now: () => '2026-08-20T12:00:00.000Z',
      },
    );

    expect(result).toBe(true);
    expect(setSession).toHaveBeenCalledWith({
      step: 'active',
      email: 'manager-choice@example.com',
      firstName: 'Ada',
      phone: '+49 123',
      portfolio: 'balanced',
      investmentAmount: '25000',
      portfolioActivatedAt: '2026-08-20',
      registeredAt: '2026-08-01T00:00:00.000Z',
    });
    expect(trackGoal).toHaveBeenCalledWith('portfolio_activated');
    expect(trackCustomEvent).toHaveBeenCalledWith('PortfolioActivated');
  });
});
