'use client';

import { useEffect, useRef } from 'react';
import { ymGoal } from '@/lib/metrika';

export default function BlogArticleTracker({ slug }: { slug: string }) {
  const readTracked = useRef(false);

  useEffect(() => {
    ymGoal('blog_article_opened', { slug });
  }, [slug]);

  useEffect(() => {
    const marker = document.getElementById('blog-read-marker');
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !readTracked.current) {
          readTracked.current = true;
          ymGoal('blog_article_read_75', { slug });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, [slug]);

  return null;
}
