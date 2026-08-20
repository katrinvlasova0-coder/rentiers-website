import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/utm', () => ({
  getUtms: vi.fn(() => ({})),
  hasUtms: vi.fn(() => false),
}));

describe('submitAccountEvent', () => {
  const originalEnv = process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL;

  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL;
    } else {
      process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL = originalEnv;
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns softly when webhook URL is empty', async () => {
    delete process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { submitAccountEvent } = await import('./submitAccountEvent');
    await expect(
      submitAccountEvent({ type: 'registration', email: 'a@b.com' }),
    ).resolves.toBeUndefined();

    expect(warn).toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('throws when fetch returns non-ok response', async () => {
    process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL = 'https://example.com/webhook';
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    } as Response);

    const { submitAccountEvent } = await import('./submitAccountEvent');
    await expect(
      submitAccountEvent({ type: 'portfolio', email: 'a@b.com', portfolio: 'balanced' }),
    ).rejects.toThrow(/Webhook HTTP 500/);
  });

  it('throws when webhook rejects the submission', async () => {
    process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL = 'https://example.com/webhook';
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ result: 'error', error: 'Rejected' }),
    } as Response);

    const { submitAccountEvent } = await import('./submitAccountEvent');
    await expect(
      submitAccountEvent({ type: 'withdrawal', email: 'a@b.com', amount: '1000' }),
    ).rejects.toThrow('Rejected');
  });
});
