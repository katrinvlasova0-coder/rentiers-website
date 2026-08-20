export const ACCOUNT_THEME = {
  background: '#07101f',
  card: '#0d1829',
  primary: '#4FC8E8',
  blue: '#1D4ED8',
} as const;

export const accountThemeVars = {
  '--account-background': ACCOUNT_THEME.background,
  '--account-card': ACCOUNT_THEME.card,
  '--account-primary': ACCOUNT_THEME.primary,
  '--account-blue': ACCOUNT_THEME.blue,
} as const;
