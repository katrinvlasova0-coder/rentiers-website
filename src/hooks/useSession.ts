'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearSession as clearStoredSession,
  getSession,
  setSession as setStoredSession,
  updateSession as updateStoredSession,
  type RentiersSession,
} from '@/lib/session';

export function commitSession(
  nextSession: RentiersSession,
  persist: (session: RentiersSession) => boolean,
  setCurrent: (session: RentiersSession | null) => void,
): boolean {
  const stored = persist(nextSession);
  setCurrent(nextSession);
  return stored;
}

export function mergeSession(
  current: RentiersSession,
  partial: Partial<RentiersSession>,
): RentiersSession {
  return { ...current, ...partial };
}

export function useSession() {
  const [session, setSessionState] = useState<RentiersSession | null>(null);
  const sessionRef = useRef<RentiersSession | null>(null);
  const [ready, setReady] = useState(false);

  const setCurrentSession = useCallback((nextSession: RentiersSession | null) => {
    sessionRef.current = nextSession;
    setSessionState(nextSession);
  }, []);

  const refresh = useCallback(() => {
    const nextSession = getSession();
    setCurrentSession(nextSession);
    return nextSession;
  }, [setCurrentSession]);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const setSession = useCallback((nextSession: RentiersSession) => {
    return commitSession(nextSession, setStoredSession, setCurrentSession);
  }, [setCurrentSession]);

  const updateSession = useCallback((partial: Partial<RentiersSession>) => {
    if (sessionRef.current) {
      const updated = mergeSession(sessionRef.current, partial);
      commitSession(updated, setStoredSession, setCurrentSession);
      return updated;
    }

    const updated = updateStoredSession(partial);
    if (updated) setCurrentSession(updated);
    return updated;
  }, [setCurrentSession]);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setCurrentSession(null);
  }, [setCurrentSession]);

  return {
    session,
    ready,
    setSession,
    updateSession,
    clearSession,
    refresh,
  };
}
