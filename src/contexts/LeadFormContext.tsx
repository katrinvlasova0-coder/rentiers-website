'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import LeadFormModal from '@/components/marketing/LeadFormModal';

export type LeadFormSource = 'contact' | 'register' | 'b2b' | 'login';

interface LeadFormCtx {
  openForm: (source?: LeadFormSource) => void;
  closeForm: () => void;
  formSource: LeadFormSource;
}

const LeadFormContext = createContext<LeadFormCtx>({
  openForm: () => {},
  closeForm: () => {},
  formSource: 'contact',
});

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formSource, setFormSource] = useState<LeadFormSource>('contact');

  const openForm = useCallback((source: LeadFormSource = 'contact') => {
    setFormSource(source);
    setOpen(true);
  }, []);

  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ openForm, closeForm, formSource }}>
      {children}
      <LeadFormModal open={open} onClose={closeForm} formSource={formSource} />
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
