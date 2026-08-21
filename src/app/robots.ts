import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/site';
import { BASE_PATH } from '@/lib/basePath';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (BASE_PATH) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
