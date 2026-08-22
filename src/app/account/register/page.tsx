'use client';

import AccountShell from '@/components/account/AccountShell';
import RegisterForm from '@/components/account/RegisterForm';

export default function RegisterPage() {
  return (
    <AccountShell stepIndex={1}>
      <div className="mx-auto max-w-lg">
        <RegisterForm />
      </div>
    </AccountShell>
  );
}
