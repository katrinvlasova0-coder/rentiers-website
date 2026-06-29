import axios from 'axios';

export interface UnsplashImage {
  url: string;
  altText: string;
  photographer: string;
  photographerUrl: string;
}

const PLACEHOLDER_IMAGES: UnsplashImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop',
    altText: 'International banking and global finance',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    altText: 'Financial data analysis on screen',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
  {
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80&auto=format&fit=crop',
    altText: 'Savings and investment growth concept',
    photographer: 'Unsplash',
    photographerUrl: 'https://unsplash.com',
  },
];

export async function fetchUnsplashImages(
  query: string,
  count: number = 3,
): Promise<UnsplashImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.warn('⚠️ UNSPLASH_ACCESS_KEY not set — using placeholder images');
    return PLACEHOLDER_IMAGES.slice(0, count);
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: count * 3,
        orientation: 'landscape',
        content_filter: 'high',
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      timeout: 15000,
    });

    const results = (response.data.results ?? []).slice(0, count);

    if (results.length === 0) {
      return PLACEHOLDER_IMAGES.slice(0, count);
    }

    return results.map((img: {
      urls: { raw: string };
      alt_description?: string;
      description?: string;
      user: { name: string; links: { html: string } };
    }) => ({
      url: `${img.urls.raw}&w=800&q=80&auto=format&fit=crop`,
      altText: img.alt_description || img.description || query,
      photographer: img.user.name,
      photographerUrl: img.user.links.html,
    }));
  } catch (error) {
    console.warn('⚠️ Unsplash API failed — using placeholder images:', error);
    return PLACEHOLDER_IMAGES.slice(0, count);
  }
}

export const CLUSTER_IMAGE_QUERIES: Record<string, string[]> = {
  Einlagenarbitrage: ['international banking', 'global finance', 'investment banking'],
  'Страновые гиды': ['georgia tbilisi', 'armenia yerevan', 'istanbul finance', 'tel aviv'],
  'Пассивный доход': ['passive income freedom', 'financial independence', 'retirement savings'],
  Сравнения: ['comparison chart finance', 'investment decision', 'financial analysis'],
  Безопасность: ['bank security vault', 'financial regulation', 'safe investment'],
  B2B: ['corporate finance', 'business banking', 'office finance meeting'],
  'RU/CIS': ['expat finance europe', 'international relocation banking', 'global banking'],
  'Länder-Guides': ['tbilisi georgia', 'yerevan armenia', 'tel aviv finance'],
  'Passives Einkommen': ['passive income', 'financial freedom', 'retirement savings'],
  Vergleiche: ['financial comparison', 'investment decision'],
  Sicherheit: ['bank security', 'financial regulation', 'safe vault'],
};
