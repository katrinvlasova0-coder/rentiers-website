import { useEffect, useRef } from 'react';
import { ymGoal } from '@/lib/metrika';

interface FormAbandonOptions {
  formName: string;
  hasStarted: boolean;
  isSubmitted: boolean;
  filledFields?: string[];
}

export function useFormAbandonTracking({
  formName,
  hasStarted,
  isSubmitted,
  filledFields,
}: FormAbandonOptions): void {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const trackAbandon = () => {
      if (hasStarted && !isSubmitted && !hasTrackedRef.current) {
        hasTrackedRef.current = true;
        ymGoal(`form_${formName}_abandoned`, {
          filled_fields: filledFields?.filter(Boolean).join(',') || '',
          abandon_reason: 'navigation_or_close',
        });
      }
    };

    window.addEventListener('beforeunload', trackAbandon);
    window.addEventListener('pagehide', trackAbandon);

    return () => {
      window.removeEventListener('beforeunload', trackAbandon);
      window.removeEventListener('pagehide', trackAbandon);
      trackAbandon();
    };
  }, [formName, hasStarted, isSubmitted, filledFields]);
}
