import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; role: string };
  category: string;
  readTime: number;
  coverImage?: string;
  featured?: boolean;
  tags: string[];
  faq?: Array<{ question: string; answer: string }>;
}

// Custom frontmatter parser — no gray-matter dependency
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return { data: {}, content: raw };

  const yamlBlock = fmMatch[1];
  const content = fmMatch[2];
  const data: Record<string, unknown> = {};

  // Parse YAML line by line (supports strings, numbers, booleans, arrays, nested objects)
  const lines = yamlBlock.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const keyMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)?$/);
    if (!keyMatch) { i++; continue; }

    const key = keyMatch[1];
    const val = (keyMatch[2] || '').trim();

    // Inline array e.g. tags: ["a", "b"]
    if (val.startsWith('[')) {
      const arrContent = val.slice(1, val.lastIndexOf(']'));
      data[key] = arrContent
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      i++;
      continue;
    }

    // Nested object or array (next lines with deeper indent)
    if (!val) {
      const nested: Record<string, unknown>[] | Record<string, unknown> = [];
      i++;
      // List items starting with "  - "
      if (i < lines.length && lines[i].match(/^\s{2}-\s/)) {
        const items: Record<string, unknown>[] = [];
        while (i < lines.length && lines[i].match(/^\s{2}-\s/)) {
          const item: Record<string, unknown> = {};
          i++;
          while (i < lines.length && lines[i].match(/^\s{4}\w/)) {
            const subMatch = lines[i].match(/^\s+(\w[\w-]*)\s*:\s*"?(.*?)"?\s*$/);
            if (subMatch) item[subMatch[1]] = subMatch[2];
            i++;
          }
          items.push(item);
        }
        data[key] = items;
      } else {
        // Simple nested object
        const obj: Record<string, unknown> = {};
        while (i < lines.length && lines[i].match(/^\s{2}\w/)) {
          const subMatch = lines[i].match(/^\s+(\w[\w-]*)\s*:\s*"?(.*?)"?\s*$/);
          if (subMatch) obj[subMatch[1]] = subMatch[2];
          i++;
        }
        data[key] = obj;
      }
      void nested;
      continue;
    }

    // Simple value
    const clean = val.replace(/^["']|["']$/g, '');
    if (clean === 'true') data[key] = true;
    else if (clean === 'false') data[key] = false;
    else if (!isNaN(Number(clean)) && clean !== '') data[key] = Number(clean);
    else data[key] = clean;
    i++;
  }

  return { data, content };
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    return { slug, ...(data as Omit<BlogPostMeta, 'slug'>) };
  });
  return posts.sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<{ meta: BlogPostMeta; content: string }> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = parseFrontmatter(raw);
  return { meta: { slug, ...(data as Omit<BlogPostMeta, 'slug'>) }, content };
}

export async function getAllPostSlugs(): Promise<string[]> {
  ensureBlogDir();
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.featured);
}

export async function getAllCategories(): Promise<string[]> {
  const all = await getAllPosts();
  return [...new Set(all.map((p) => p.category))];
}
