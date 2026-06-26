'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useLeadForm } from '@/contexts/LeadFormContext';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function LeadButton({ children, onClick, ...props }: Props) {
  const { openForm } = useLeadForm();

  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) openForm();
      }}
    >
      {children}
    </button>
  );
}
