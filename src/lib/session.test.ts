import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  SESSION_KEY,
  clearSession,
  getSession,
  setSession,
  updateSession,
  type RentiersSession,
} from './session';

function sample(): RentiersSession {
  return {
    step: 'kyc_approved',
    email: 'a@b.com',
    firstName: 'Ann',
    phone: '+49123',
    registeredAt: '2026-01-01T00:00:00.000Z',
  };
}

describe('session', () => {
  beforeEach(() => {
    clearSession();
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    });
  });

  it('round-trips session', () => {
    expect(setSession(sample())).toBe(true);
    expect(getSession()?.email).toBe('a@b.com');
    expect(updateSession({ step: 'payment_pending' })?.step).toBe('payment_pending');
    clearSession();
    expect(getSession()).toBeNull();
    expect(SESSION_KEY).toBe('rentiers_session');
  });

  it('returns null and false when storage throws and memory is empty', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    expect(getSession()).toBeNull();
    expect(setSession(sample())).toBe(false);
  });

  it('returns session from memory when setItem throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    expect(setSession(sample())).toBe(false);
    expect(getSession()?.email).toBe('a@b.com');
  });

  it('returns session from memory when getItem throws after memory set', () => {
    const s = sample();
    expect(setSession(s)).toBe(true);

    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    expect(getSession()?.email).toBe('a@b.com');
  });

  it('returns session from memory when localStorage is empty after memory set', () => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    });
    expect(setSession(sample())).toBe(false);
    expect(getSession()?.email).toBe('a@b.com');
  });

  it('updateSession returns updated object when storage fails but memory has session', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    expect(setSession(sample())).toBe(false);
    const updated = updateSession({ step: 'payment_pending' });
    expect(updated?.step).toBe('payment_pending');
    expect(getSession()?.step).toBe('payment_pending');
  });
});
