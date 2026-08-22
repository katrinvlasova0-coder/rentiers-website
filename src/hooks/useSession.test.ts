import { describe, expect, it, vi } from 'vitest';
import type { RentiersSession } from '@/lib/session';
import { commitSession, mergeSession } from './useSession';

const session: RentiersSession = {
  step: 'portfolio_selected',
  email: 'ada@example.com',
  firstName: 'Ada',
  phone: '+49 123 456 789',
  portfolio: 'balanced',
  investmentAmount: '10000',
  registeredAt: '2026-08-20T14:00:00.000Z',
};

describe('useSession state helpers', () => {
  it('updates in-memory state when storage rejects the session', () => {
    const setCurrent = vi.fn();

    const stored = commitSession(session, () => false, setCurrent);

    expect(stored).toBe(false);
    expect(setCurrent).toHaveBeenCalledWith(session);
  });

  it('merges updates from the in-memory session', () => {
    expect(mergeSession(session, { step: 'payment_pending' })).toEqual({
      ...session,
      step: 'payment_pending',
    });
  });
});
