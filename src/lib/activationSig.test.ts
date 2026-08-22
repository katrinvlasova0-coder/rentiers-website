import { describe, expect, it } from 'vitest';
import { createActivationSig, verifyActivationSig } from './activationSig';

describe('activationSig', () => {
  const base = {
    email: 'Client@Example.com',
    amount: '10000',
    activatedAt: '2026-01-15',
    portfolio: 'balanced',
    secret: 'rentiers2026secret',
  };

  it('verifies matching sig and rejects tampering', async () => {
    const sig = await createActivationSig(base);
    expect(sig).toBe('82dcad7edc2a5f6d');
    expect(sig).toMatch(/^[0-9a-f]{16}$/);
    expect(await verifyActivationSig({ ...base, sig })).toBe(true);
    expect(await verifyActivationSig({ ...base, amount: '1', sig })).toBe(false);
  });
});
