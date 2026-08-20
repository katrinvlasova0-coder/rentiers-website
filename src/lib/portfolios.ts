import type { PortfolioId } from './session';

export const PORTFOLIOS = [
  { id: 'conservative' as const, label: 'Conservative', rate: 12, blurb: 'Lower risk', popular: false },
  { id: 'balanced' as const, label: 'Balanced', rate: 16, blurb: 'Balanced risk', popular: false },
  { id: 'high_yield' as const, label: 'High-Yield', rate: 20, blurb: 'Higher risk', popular: true },
];

export function getPortfolio(id: PortfolioId) {
  return PORTFOLIOS.find((p) => p.id === id);
}

export const MIN_INVESTMENT_EUR = 5000;
