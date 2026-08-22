import { describe, expect, it } from 'vitest';
import { shouldHideSiteChrome } from './SiteChromeGate';

describe('shouldHideSiteChrome', () => {
  it.each([
    '/account',
    '/account/',
    '/account/register',
    '/payment-success',
    '/payment-success/',
    '/payment-success/confirmation',
  ])('hides site chrome for %s', (pathname) => {
    expect(shouldHideSiteChrome(pathname)).toBe(true);
  });

  it.each([null, '/', '/accounts', '/payment-successful'])(
    'keeps site chrome visible for %s',
    (pathname) => {
      expect(shouldHideSiteChrome(pathname)).toBe(false);
    },
  );
});
