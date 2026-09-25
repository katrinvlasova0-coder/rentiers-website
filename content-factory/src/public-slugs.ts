/** Safe-fallback MDX stays on disk but must not enter public SEO files. */
export function isFallbackSlug(slug: string): boolean {
  return slug.startsWith('fallback-');
}

export function isFallbackUrl(loc: string): boolean {
  return /\/fallback-/.test(loc);
}

/**
 * Frontmatter mark written by the safe-fallback publisher
 * (`fallback: true` or `robots: "noindex, follow"`). Body copy is ignored.
 */
export function isFallbackFrontmatter(raw: string): boolean {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return false;
  const block = match[1];
  if (/^fallback:\s*true\s*$/m.test(block)) return true;
  if (/^noindex:\s*true\s*$/m.test(block)) return true;
  if (/^robots:\s*["']?[^"'\n]*\bnoindex\b/im.test(block)) return true;
  return false;
}
