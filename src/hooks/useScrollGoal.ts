import { useEffect, useRef } from 'react';
import { ymGoal } from '@/lib/metrika';

export function useScrollGoal(goal: string, threshold = 0.25) {
  const ref = useRef<HTMLElement | null>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || firedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          ymGoal(goal);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [goal, threshold]);

  return ref;
}
