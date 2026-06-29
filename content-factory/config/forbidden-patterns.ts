/** Patterns that break the MDX blog engine — used by validator and post-generation cleanup */
export const FORBIDDEN_PATTERNS = {
  jsxComponent: /<[A-Z][a-zA-Z]+[\s/>]/g,
  anchorId: /\{#[^}]+\}/,
  internalAnchorLink: /\[([^\]]+)\]\(#[^)]+\)/,
  scriptTag: /<script[\s>]/i,
  h1InBody: /^# [^#]/m,
  yamlBlockTags: /^tags:\s*\n\s*-/m,
  yamlBlockFaq: /^faq:\s*\n\s*-\s*question/m,
  imageJsx: /<Image[\s/>]/,
  keyTakeaways: /<KeyTakeaways/,
  callout: /<Callout/,
} as const;

export const FORBIDDEN_PATTERN_MESSAGES: Record<keyof typeof FORBIDDEN_PATTERNS, string> = {
  jsxComponent: 'JSX-Komponenten gefunden — verboten im CMS',
  anchorId: 'Anchor-IDs {#id} gefunden — verboten im CMS',
  internalAnchorLink: 'Interne Anchor-Links [text](#id) gefunden — verboten',
  scriptTag: '<script> Tag gefunden — verboten im CMS',
  h1InBody: 'H1 (# Heading) im Artikelkörper — verboten',
  yamlBlockTags: 'YAML-Block-Array für tags — bitte Inline-Array verwenden',
  yamlBlockFaq: 'YAML-Block-Array für faq — bitte Inline-Array oder List-Syntax im Frontmatter',
  imageJsx: '<Image /> JSX — nur ![alt](url) erlaubt',
  keyTakeaways: '<KeyTakeaways> Komponente — verboten',
  callout: '<Callout> Komponente — verboten',
};
