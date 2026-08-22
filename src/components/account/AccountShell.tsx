'use client';

import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { useSession } from '@/hooks/useSession';
import { ACCOUNT_THEME, accountThemeVars } from './accountTheme';
import StepProgress from './StepProgress';

export interface AccountShellProps {
  children: ReactNode;
  stepIndex?: 1 | 2 | 3 | 4 | null;
  title?: string;
}

export function AccountShell({ children, stepIndex = null, title }: AccountShellProps) {
  const { session, ready } = useSession();

  return (
    <div
      className="flex min-h-screen flex-col text-slate-100"
      style={{
        ...accountThemeVars,
        backgroundColor: ACCOUNT_THEME.background,
      } as CSSProperties}
    >
      <header className="border-b border-slate-800/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5">
          <Link
            href="/"
            className="text-lg font-bold tracking-[0.08em]"
            style={{ color: ACCOUNT_THEME.primary }}
          >
            RENTIERS
          </Link>
          {ready && session?.email && (
            <span className="max-w-[60%] truncate text-sm text-slate-400">{session.email}</span>
          )}
        </div>
        {stepIndex && (
          <div className="mx-auto flex w-full max-w-5xl justify-center px-4 pb-5">
            <StepProgress current={stepIndex} />
          </div>
        )}
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {title && <h1 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">{title}</h1>}
        {children}
      </div>

      <footer className="border-t border-slate-800/80 px-4 py-5 text-center text-xs text-slate-500">
        AES-256 · FinCEN/FINTRAC · Rentiers Global Inc. © 2026
      </footer>
    </div>
  );
}

export default AccountShell;
