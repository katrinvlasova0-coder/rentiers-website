'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OpenAccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account/register');
  }, [router]);

  return (
    <div
      className="px-6 py-24 text-center text-sm"
      style={{ color: 'var(--color-text-secondary)' }}
    >
      Redirecting to account registration…
    </div>
  );
}
