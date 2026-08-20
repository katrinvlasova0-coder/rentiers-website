'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useLeadForm, type LeadFormSource } from '@/contexts/LeadFormContext';
import { ymGoal } from '@/lib/metrika';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  metrikaGoal?: string;
  metrikaParams?: Record<string, string | number>;
  formSource?: LeadFormSource;
};

type LeadButtonAction =
  | { type: 'route'; href: '/account/register' }
  | { type: 'modal'; source: LeadFormSource };

export function getLeadButtonAction(source: LeadFormSource): LeadButtonAction {
  return source === 'register'
    ? { type: 'route', href: '/account/register' }
    : { type: 'modal', source };
}

export default function LeadButton({
  children,
  onClick,
  metrikaGoal,
  metrikaParams,
  formSource = 'contact',
  ...props
}: Props) {
  const router = useRouter();
  const { openForm } = useLeadForm();

  return (
    <button
      type="button"
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          if (metrikaGoal) ymGoal(metrikaGoal, metrikaParams);
          const action = getLeadButtonAction(formSource);
          if (action.type === 'route') {
            router.push(action.href);
          } else {
            openForm(action.source);
          }
        }
      }}
    >
      {children}
    </button>
  );
}
