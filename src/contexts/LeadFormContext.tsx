'use client';

import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import LeadFormModal from '@/components/marketing/LeadFormModal';

interface LeadFormCtx {
  openForm: () => void;
  closeForm: () => void;
}

const LeadFormContext = createContext<LeadFormCtx>({
  openForm: () => {},
  closeForm: () => {},
});

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ openForm, closeForm }}>
      {children}
      <LeadFormModal open={open} onClose={closeForm} />
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
