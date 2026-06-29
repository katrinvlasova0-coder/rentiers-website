import type { ArticleRequest } from './types';

/** Prompt template for RU/CIS cluster articles */
export function buildRussianArticlePrompt(
  req: ArticleRequest,
  images: Array<{ url: string; altText: string }>,
): string {
  const imgMarkdown = images
    .map((img, i) => `Изображение ${i + 1}: ![${img.altText}](${img.url})`)
    .join('\n');

  return `
Напишите полную статью для блога Rentiers Pro на русском языке (аудитория RU/CIS).

Параметры:
- Slug: ${req.slug}
- Заголовок: ${req.titleDe}
- Ключевое слово: ${req.keywordDe}
- Формат: ${req.format}

Изображения:
${imgMarkdown}

Требования:
- Frontmatter на немецком (title, description) + titleEn/descriptionEn для EN-аудитории
- Основной текст на русском
- Раздел ---en--- с полным переводом на английский
- Без JSX, без anchor-id, без H1 в теле
- Минимум 1 таблица, 2 изображения, 5 FAQ
- Disclaimer в конце

Начните сразу с frontmatter (---).
`;
}
