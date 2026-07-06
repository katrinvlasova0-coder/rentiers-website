import { assetPath } from '@/lib/basePath';
import { slugify } from '@/lib/slugify';

function renderTable(tableLines: string[]): string {
  const isSep = (l: string) => /^\|[\s\-:|]+\|$/.test(l.replace(/[^|:\-\s]/g, ''));

  let html = '<div class="blog-table-wrap"><table class="blog-table">';
  let isFirstRow = true;
  let bodyOpen = false;

  for (const line of tableLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (isSep(trimmed)) {
      if (!bodyOpen) {
        html += '<tbody>';
        bodyOpen = true;
      }
      continue;
    }
    const cells = trimmed.split('|').slice(1, -1).map((c) => c.trim());
    if (isFirstRow && !bodyOpen) {
      html += '<thead><tr>' + cells.map((c) => `<th>${c}</th>`).join('') + '</tr></thead>';
      isFirstRow = false;
    } else {
      if (!bodyOpen) {
        html += '<tbody>';
        bodyOpen = true;
      }
      html += '<tr>' + cells.map((c) => `<td>${c}</td>`).join('') + '</tr>';
    }
  }

  if (bodyOpen) html += '</tbody>';
  html += '</table></div>';
  return html;
}

function renderLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const href = url.startsWith('/') ? assetPath(url) : url;
    const external = /^https?:\/\//i.test(url);
    const extra = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${href}" class="blog-link"${extra}>${label}</a>`;
  });
}

const SOURCE_URLS: Record<string, string> = {
  'Nationalbank Georgiens': 'https://nbg.gov.ge',
  'nbg.gov.ge': 'https://nbg.gov.ge',
  'Zentralbank Armeniens': 'https://www.cba.am',
  'cba.am': 'https://www.cba.am',
  Bundesbank: 'https://www.bundesbank.de',
  'bundesbank.de': 'https://www.bundesbank.de',
  EZB: 'https://www.ecb.europa.eu',
  'ecb.europa.eu': 'https://www.ecb.europa.eu',
  'IMF World Economic Outlook': 'https://www.imf.org/en/Publications/WEO',
  'BIS-Statistiken': 'https://www.bis.org/statistics/',
  'BIS Statistiken': 'https://www.bis.org/statistics/',
  Weltbank: 'https://www.worldbank.org',
};

function linkifySources(text: string): string {
  let result = text;

  result = result.replace(
    /\*?Quellen?:\s*([^*\n]+)\*?/gi,
    (match, sourcesPart: string) => {
      const linked = sourcesPart.replace(
        /([A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß0-9.\- ]+?)\s*\(([^)]+)\)/g,
        (_m: string, name: string, domain: string) => {
          const url = domain.startsWith('http') ? domain : `https://${domain}`;
          return `<a href="${url}" class="blog-link" target="_blank" rel="noopener noreferrer">${name.trim()}</a>`;
        },
      );
      return `<p class="blog-source"><em>Quellen: ${linked}</em></p>`;
    },
  );

  for (const [name, url] of Object.entries(SOURCE_URLS)) {
    const re = new RegExp(`(?<![">/])\\b(${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b(?![^<]*>)`, 'g');
    result = result.replace(
      re,
      `<a href="${url}" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>`,
    );
  }

  return result;
}

function buildTocNav(title: string, items: string[]): string {
  const list = items
    .map((item) => {
      const id = slugify(item);
      return `<li><a href="#${id}" class="blog-toc-link">${item}</a></li>`;
    })
    .join('');
  return `<nav class="blog-toc" aria-label="${title}"><p class="blog-toc-title">${title}</p><ol class="blog-toc-list">${list}</ol></nav>`;
}

function maybeInsertAutoToc(md: string, tocTitle: string): string {
  if (/## (Inhaltsverzeichnis|Table of Contents)/m.test(md)) return md;

  const headings: string[] = [];
  md.replace(/^## (.+)$/gm, (_, title) => {
    headings.push(title);
    return '';
  });
  if (headings.length < 3) return md;

  const tocBlock =
    `## ${tocTitle}\n\n` +
    headings.map((h, i) => `${i + 1}. ${h}`).join('\n') +
    '\n\n---\n\n';

  const firstH2 = md.search(/^## /m);
  if (firstH2 === -1) return md;
  return md.slice(0, firstH2) + tocBlock + md.slice(firstH2);
}

function replaceTocSection(md: string): string {
  return md.replace(
    /^## (Inhaltsverzeichnis|Table of Contents)\s*\n+((?:\d+\.\s+.+\n?)+)/gm,
    (_, title, list) => {
      const items = list
        .trim()
        .split('\n')
        .map((line: string) => line.replace(/^\d+\.\s+/, '').trim())
        .filter(Boolean);
      return buildTocNav(title, items) + '\n\n';
    }
  );
}

export function markdownToHtml(md: string, lang: 'de' | 'en' = 'de'): string {
  const tocTitle = lang === 'en' ? 'Table of Contents' : 'Inhaltsverzeichnis';
  let content = maybeInsertAutoToc(md, tocTitle);
  content = replaceTocSection(content);

  const lines = content.split('\n');
  const segments: string[] = [];
  let i = 0;
  while (i < lines.length) {
    if (lines[i].trim().startsWith('|')) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        block.push(lines[i]);
        i++;
      }
      segments.push(renderTable(block));
    } else {
      segments.push(lines[i]);
      i++;
    }
  }

  return linkifySources(
    renderLinks(
    segments
      .join('\n')
      .replace(/^#### (.+)$/gm, (_, title) => {
        const id = slugify(title);
        return `<h4 class="blog-h4" id="${id}">${title}</h4>`;
      })
      .replace(/^### (.+)$/gm, (_, title) => {
        const id = slugify(title);
        return `<h3 class="blog-h3" id="${id}">${title}</h3>`;
      })
      .replace(/^## (.+)$/gm, (_, title) => {
        const id = slugify(title);
        return `<h2 class="blog-h2" id="${id}">${title}</h2>`;
      })
      .replace(/^# (.+)$/gm, '')
      .replace(/^---$/gm, '<hr class="blog-hr" />')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="blog-em">$1</em>')
      .replace(/`(.+?)`/g, '<code class="blog-code">$1</code>')
      .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="blog-ol-item">$1</li>')
      .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, (list) => {
        const isOrdered = list.includes('blog-ol-item');
        const tag = isOrdered ? 'ol' : 'ul';
        const cleaned = list.replace(/ class="blog-ol-item"/g, '');
        return `<${tag} class="blog-list">${cleaned}</${tag}>`;
      })
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="blog-img" loading="lazy" />')
      .replace(/^(?!<|\s*$)(.+)$/gm, '<p class="blog-p">$1</p>'),
    ),
  );
}
