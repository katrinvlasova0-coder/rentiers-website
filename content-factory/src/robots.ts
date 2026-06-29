import fs from 'fs';
import path from 'path';

function getRobotsPath(): string {
  return path.join(process.env.SITE_PUBLIC_DIR || '../public', 'robots.txt');
}

function getBaseUrl(): string {
  return process.env.SITE_BASE_URL || 'https://rentierspro.com';
}

const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'PerplexityBot'];

export function ensureRobotsTxt(): void {
  const ROBOTS_PATH = getRobotsPath();
  const BASE_URL = getBaseUrl();

  if (fs.existsSync(ROBOTS_PATH)) {
    const existing = fs.readFileSync(ROBOTS_PATH, 'utf-8');
    const hasAllAiBots = AI_BOTS.every((bot) => existing.includes(bot));
    const hasSitemap = existing.includes('Sitemap:');

    if (hasAllAiBots && hasSitemap) {
      return;
    }

    // Append missing AI bot blocks without destroying existing rules
    let updated = existing;
    if (!hasSitemap) {
      updated += `\nSitemap: ${BASE_URL}/sitemap.xml\n`;
    }
    for (const bot of AI_BOTS) {
      if (!updated.includes(bot)) {
        updated += `\nUser-agent: ${bot}\nAllow: /\nAllow: /blog/\n`;
      }
    }

    fs.writeFileSync(ROBOTS_PATH, updated, 'utf-8');
    console.log('✅ robots.txt updated (added missing AI crawlers or sitemap)');
    return;
  }

  const content = `User-agent: *
Allow: /

Crawl-delay: 1

Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Allow: /blog/
Allow: /images/
Allow: /fonts/

Sitemap: ${BASE_URL}/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;

  fs.mkdirSync(path.dirname(ROBOTS_PATH), { recursive: true });
  fs.writeFileSync(ROBOTS_PATH, content, 'utf-8');
  console.log('✅ robots.txt created');
}
