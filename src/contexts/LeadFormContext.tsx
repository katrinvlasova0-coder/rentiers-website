'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import LeadFormModal from '@/components/marketing/LeadFormModal';
import AppOnboardingModal from '@/components/marketing/AppOnboardingModal';

export type LeadFormSource = 'contact' | 'register' | 'b2b' | 'login';

interface LeadFormCtx {
  openForm: (source?: LeadFormSource) => void;
  closeForm: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  formSource: LeadFormSource;
}

const LeadFormContext = createContext<LeadFormCtx>({
  openForm: () => {},
  closeForm: () => {},
  openOnboarding: () => {},
  closeOnboarding: () => {},
  formSource: 'contact',
});

function isOnboardingSource(source: LeadFormSource): boolean {
  return source === 'register' || source === 'login';
}

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [formSource, setFormSource] = useState<LeadFormSource>('contact');

  const openOnboarding = useCallback(() => setOnboardingOpen(true), []);
  const closeOnboarding = useCallback(() => setOnboardingOpen(false), []);

  const openForm = useCallback(
    (source: LeadFormSource = 'contact') => {
      if (isOnboardingSource(source)) {
        setOnboardingOpen(true);
        return;
      }
      setFormSource(source);
      setOpen(true);
    },
    [],
  );

  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <LeadFormContext.Provider
      value={{ openForm, closeForm, openOnboarding, closeOnboarding, formSource }}
    >
      {children}
      <LeadFormModal open={open} onClose={closeForm} formSource={formSource} />
      <AppOnboardingModal open={onboardingOpen} onClose={closeOnboarding} />
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
