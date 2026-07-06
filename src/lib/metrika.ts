declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export function getYmId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YM_ID;
  if (!raw) return null;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export function isMetrikaEnabled(): boolean {
  return getYmId() !== null;
}

export function ymGoal(target: string, params?: object): void {
  const id = getYmId();
  if (typeof window === 'undefined' || !id || !window.ym) return;
  window.ym(id, 'reachGoal', target, params);
}

export function ymParams(params: object): void {
  const id = getYmId();
  if (typeof window === 'undefined' || !id || !window.ym) return;
  window.ym(id, 'params', params);
}
