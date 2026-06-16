// Design tokens for Rentiers — derived from Figma design files
export const colors = {
  // Primary brand
  primary: '#3B3BE8',        // Vivid blue (buttons, active states)
  primaryDark: '#2929B0',    // Darker blue (hover)
  primaryLight: '#EDEDFC',   // Very light blue (backgrounds)

  // Dark navy
  dark: '#1A1F3E',           // Dark navy (header, headings, dark CTA)
  darkMid: '#2D3360',        // Mid navy

  // Backgrounds
  bgLight: '#F2F2FA',        // Light lavender (section backgrounds)
  bgWhite: '#FFFFFF',
  bgCard: '#FFFFFF',

  // Status
  success: '#22C55E',        // Positive returns (green)
  successLight: '#DCFCE7',
  warning: '#F59E0B',        // Fees / cautionary (amber)
  danger: '#EF4444',

  // Text
  textPrimary: '#1A1F3E',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textLight: '#FFFFFF',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Footer
  footerBg: '#F5F5FB',
} as const;

export const typography = {
  fontSans: "'Inter', 'Roboto', system-ui, -apple-system, sans-serif",
  fontHeading: "'Inter', 'Roboto', system-ui, -apple-system, sans-serif",
} as const;

export const spacing = {
  sectionY: '5rem',        // 80px vertical section padding
  sectionYSm: '3rem',
  maxWidth: '1200px',
  containerPx: '1.5rem',  // horizontal padding on container
} as const;

export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

export const shadows = {
  card: '0 2px 16px 0 rgba(26,31,62,0.08)',
  cardHover: '0 8px 32px 0 rgba(59,59,232,0.14)',
  button: '0 4px 14px 0 rgba(59,59,232,0.35)',
} as const;
