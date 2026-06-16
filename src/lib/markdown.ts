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

export function markdownToHtml(md: string): string {
  const lines = md.split('\n');
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

  return segments
    .join('\n')
    .replace(/^#### (.+)$/gm, '<h4 class="blog-h4">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="blog-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="blog-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '')
    .replace(/^---$/gm, '<hr class="blog-hr" />')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="blog-code">$1</code>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="blog-ol-item">$1</li>')
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, (list) => {
      const isOrdered = list.includes('blog-ol-item');
      const tag = isOrdered ? 'ol' : 'ul';
      const cleaned = list.replace(/ class="blog-ol-item"/g, '');
      return `<${tag} class="blog-list">${cleaned}</${tag}>`;
    })
    .replace(/^(?!<|\s*$)(.+)$/gm, '<p class="blog-p">$1</p>');
}
