/** Safe-fallback MDX stays on disk but must not enter public SEO files. */
export function isFallbackSlug(slug: string): boolean {
  return slug.startsWith('fallback-');
}

export function isFallbackUrl(loc: string): boolean {
  return /\/fallback-/.test(loc);
}
