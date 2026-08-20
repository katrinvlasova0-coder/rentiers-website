'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  clearSession as clearStoredSession,
  getSession,
  setSession as setStoredSession,
  updateSession as updateStoredSession,
  type RentiersSession,
} from '@/lib/session';

export function useSession() {
  const [session, setSessionState] = useState<RentiersSession | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    const nextSession = getSession();
    setSessionState(nextSession);
    return nextSession;
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const setSession = useCallback((nextSession: RentiersSession) => {
    const stored = setStoredSession(nextSession);
    if (stored) setSessionState(nextSession);
    return stored;
  }, []);

  const updateSession = useCallback((partial: Partial<RentiersSession>) => {
    const updated = updateStoredSession(partial);
    if (updated) setSessionState(updated);
    return updated;
  }, []);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setSessionState(null);
  }, []);

  return {
    session,
    ready,
    setSession,
    updateSession,
    clearSession,
    refresh,
  };
}
