/**
 * Safe-fallback drafts stay on disk (direct URL still returns 200) but must not
 * be indexed or shown in public blog listings.
 *
 * A post is a fallback when its slug starts with `fallback-`, or when frontmatter
 * marks it (`fallback: true`, `noindex: true`, or `robots` containing noindex).
 */
export interface FallbackBlogFields {
  slug: string;
  fallback?: boolean;
  noindex?: boolean;
  robots?: string;
}

export function isFallbackBlogPost(post: FallbackBlogFields): boolean {
  if (post.slug.startsWith('fallback-')) return true;
  if (post.fallback === true) return true;
  if (post.noindex === true) return true;
  if (typeof post.robots === 'string' && /\bnoindex\b/i.test(post.robots)) return true;
  return false;
}

/** Meta robots content for a blog article. Fallback drafts are noindex, follow. */
export function blogRobotsDirective(post: FallbackBlogFields): 'noindex, follow' | 'index, follow' {
  return isFallbackBlogPost(post) ? 'noindex, follow' : 'index, follow';
}
