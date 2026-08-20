export const SESSION_KEY = 'rentiers_session';

export type AccountStep =
  | 'registered'
  | 'kyc_pending'
  | 'kyc_approved'
  | 'portfolio_selected'
  | 'payment_pending'
  | 'active';

export type PortfolioId = 'conservative' | 'balanced' | 'high_yield';

export interface RentiersSession {
  step: AccountStep;
  email: string;
  firstName: string;
  lastName?: string;
  phone: string;
  portfolio?: PortfolioId;
  investmentAmount?: string;
  stripeRef?: string;
  registeredAt: string;
  portfolioActivatedAt?: string;
}

export function getSession(): RentiersSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RentiersSession;
  } catch {
    return null;
  }
}

export function setSession(session: RentiersSession): boolean {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

export function updateSession(partial: Partial<RentiersSession>): RentiersSession | null {
  const current = getSession();
  if (!current) return null;
  const updated = { ...current, ...partial };
  if (!setSession(updated)) return null;
  return updated;
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore storage failures
  }
}
