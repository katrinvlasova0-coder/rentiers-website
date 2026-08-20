import { describe, expect, it } from 'vitest';
import { ACCOUNT_THEME, accountThemeVars } from './accountTheme';

describe('account theme', () => {
  it('exposes the account color tokens as CSS variables', () => {
    expect(ACCOUNT_THEME).toEqual({
      background: '#07101f',
      card: '#0d1829',
      primary: '#4FC8E8',
      blue: '#1D4ED8',
    });
    expect(accountThemeVars).toEqual({
      '--account-background': '#07101f',
      '--account-card': '#0d1829',
      '--account-primary': '#4FC8E8',
      '--account-blue': '#1D4ED8',
    });
  });
});
