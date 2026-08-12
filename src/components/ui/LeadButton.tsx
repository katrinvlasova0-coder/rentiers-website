'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useLeadForm, type LeadFormSource } from '@/contexts/LeadFormContext';
import { ymGoal } from '@/lib/metrika';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  metrikaGoal?: string;
  metrikaParams?: Record<string, string | number>;
  formSource?: LeadFormSource;
};

export default function LeadButton({
  children,
  onClick,
  metrikaGoal,
  metrikaParams,
  formSource = 'contact',
  ...props
}: Props) {
  const { openForm } = useLeadForm();

  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          if (metrikaGoal) ymGoal(metrikaGoal, metrikaParams);
          openForm(formSource);
        }
      }}
    >
      {children}
    </button>
  );
}
