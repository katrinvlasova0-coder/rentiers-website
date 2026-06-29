import type { ArticleRequest } from './types';

/** Prompt template for EN-only section regeneration (fallback) */
export function buildEnglishSectionPrompt(req: ArticleRequest, germanBody: string): string {
  return `
Translate and adapt the following German Rentiers Pro blog article into a complete English section.

Requirements:
- British English, professional financial journalism
- Primary keyword: "${req.keywordEn}"
- Same structure as German: headings, tables, images, numbered lists, FAQ, disclaimer
- Place output after a conceptual ---en--- separator (include the separator line first)
- No JSX, no anchor IDs, no H1, no internal anchor links

German article for reference:
${germanBody.slice(0, 12000)}
`;
}
