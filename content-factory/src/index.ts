#!/usr/bin/env node
import { Command } from 'commander';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { generateArticle, getMinWordCount } from './generator';
import { publishArticle } from './publisher';
import { addArticleToSitemap, regenerateSitemap } from './sitemap';
import { ensureRobotsTxt } from './robots';
import {
  getPendingArticles,
  markAsCompleted,
  markInProgress,
  getQueueStats,
  addToQueue,
} from './queue';
import { validateArticle } from './validator';
import type { ArticleRequest } from './prompts/types';
import contentPlan from '../config/content-plan.json';

dotenv.config({ path: path.join(__dirname, '../.env') });

const program = new Command();

program
  .name('content-factory')
  .description('Rentiers Pro Autonomous Content Factory')
  .version('1.0.0');

program
  .command('generate <slug>')
  .description('Generate a single article by slug')
  .option('--commit', 'Auto-commit to git after generation')
  .option('--dry-run', 'Generate but do not write file')
  .option('--mock', 'Use mock generator (no Claude API)')
  .action(async (slug: string, options: { commit?: boolean; dryRun?: boolean; mock?: boolean }) => {
    const request = (contentPlan as ArticleRequest[]).find((a) => a.slug === slug);
    if (!request) {
      console.error(`❌ Slug not found in content plan: ${slug}`);
      process.exit(1);
    }

    ensureRobotsTxt();
    markInProgress(slug);

    try {
      const content = await generateArticle(request, { mock: options.mock });

      if (!options.dryRun) {
        await publishArticle(slug, content, request, options.commit ?? false);
        await addArticleToSitemap(slug, request.plannedDate, request.priority);
        markAsCompleted(slug);
        console.log(`\n🎉 Article published: /blog/${slug}`);
      } else {
        console.log('\n--- DRY RUN: Article content ---\n');
        console.log(`${content.slice(0, 2000)}\n...[truncated]`);
      }
    } catch (error) {
      console.error(`❌ Generation failed for ${slug}:`, error);
      process.exit(1);
    }
  });

program
  .command('batch')
  .description('Generate next N articles from the queue')
  .option('-n, --count <number>', 'Number of articles to generate', '3')
  .option('--commit', 'Auto-commit each article')
  .option('--mock', 'Use mock generator (no Claude API)')
  .option('--delay <ms>', 'Delay between articles (ms)', '5000')
  .action(async (options: { count: string; commit?: boolean; mock?: boolean; delay: string }) => {
    const count = parseInt(options.count, 10);
    const delay = parseInt(options.delay, 10);
    const articles = getPendingArticles(count);

    if (articles.length === 0) {
      console.log('📋 Queue is empty — nothing to generate');
      return;
    }

    console.log(`📋 Generating ${articles.length} articles from queue...`);

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      try {
        console.log(`\n━━━ [${i + 1}/${articles.length}] ${article.slug} ━━━`);
        ensureRobotsTxt();
        markInProgress(article.slug);
        const content = await generateArticle(article, { mock: options.mock });
        await publishArticle(article.slug, content, article, options.commit ?? false);
        await addArticleToSitemap(article.slug, article.plannedDate, article.priority);
        markAsCompleted(article.slug);
        console.log(`✅ Done: /blog/${article.slug}`);

        if (i < articles.length - 1) {
          console.log(`⏳ Waiting ${delay}ms before next article...`);
          await new Promise((r) => setTimeout(r, delay));
        }
      } catch (error) {
        console.error(`❌ Failed: ${article.slug}`, error);
      }
    }

    console.log('\n🏁 Batch generation complete!');
  });

program
  .command('validate <slug>')
  .description('Validate an existing article')
  .action(async (slug: string) => {
    const contentDir = path.resolve(process.env.CONTENT_DIR || '../content/blog');
    const filePath = path.join(contentDir, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const request = (contentPlan as ArticleRequest[]).find((a) => a.slug === slug);
    const keyword = request?.keywordDe || slug.replace(/-/g, ' ');
    const minWords = request ? getMinWordCount(request.format) : 1500;

    const result = validateArticle(content, keyword, minWords);

    console.log('\n📊 VALIDATION RESULTS:');
    console.log(`Status: ${result.valid ? '✅ VALID' : '❌ INVALID'}`);
    console.log('\nStats:', result.stats);
    if (result.errors.length) {
      console.log('\nErrors:');
      result.errors.forEach((e) => console.log(e));
    }
    if (result.warnings.length) {
      console.log('\nWarnings:');
      result.warnings.forEach((w) => console.log(w));
    }

    process.exit(result.valid ? 0 : 1);
  });

program
  .command('sitemap')
  .description('Rebuild sitemap.xml from all existing articles')
  .action(async () => {
    const contentDir = path.resolve(process.env.CONTENT_DIR || '../content/blog');
    const slugs = fs
      .readdirSync(contentDir)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''));

    regenerateSitemap(slugs);
    console.log(`✅ Sitemap rebuilt with ${slugs.length} entries`);
  });

program
  .command('queue <action> [slug]')
  .description('Manage article queue: list | stats | add <slug>')
  .action(async (action: string, slug?: string) => {
    if (action === 'list') {
      const pending = getPendingArticles(100);
      console.log(`\n📋 PENDING ARTICLES (${pending.length}):\n`);
      pending.forEach((a, i) => {
        console.log(`${i + 1}. [${a.priority.toUpperCase()}] ${a.slug} — ${a.plannedDate}`);
      });
      return;
    }

    if (action === 'stats') {
      const stats = getQueueStats();
      console.log('\n📊 QUEUE STATS:');
      console.log(`Pending: ${stats.pending}`);
      console.log(`In progress: ${stats.inProgress}`);
      console.log(`Completed: ${stats.completed}`);
      return;
    }

    if (action === 'add' && slug) {
      const article = (contentPlan as ArticleRequest[]).find((a) => a.slug === slug);
      if (!article) {
        console.error(`❌ Slug not found in content plan: ${slug}`);
        process.exit(1);
      }
      addToQueue(article);
      console.log(`✅ Added to queue: ${slug}`);
      return;
    }

    console.error('Usage: queue list | queue stats | queue add <slug>');
    process.exit(1);
  });

program
  .command('test')
  .description('Run integration tests without Claude API (Unsplash, email, sitemap)')
  .option('--skip-email', 'Skip Resend email test')
  .option('--slug <slug>', 'Validate an existing article slug')
  .action(async (options: { skipEmail?: boolean; slug?: string }) => {
    const { runIntegrationTests } = await import('./test');
    await runIntegrationTests({ skipEmail: options.skipEmail, slug: options.slug });
  });

program
  .command('mock <slug>')
  .description('Generate mock article (no Claude) — for pipeline testing')
  .option('--dry-run', 'Preview only, do not write file')
  .action(async (slug: string, options: { dryRun?: boolean }) => {
    const request = (contentPlan as ArticleRequest[]).find((a) => a.slug === slug);
    if (!request) {
      console.error(`❌ Slug not found in content plan: ${slug}`);
      process.exit(1);
    }
    const { runMockGenerateTest } = await import('./test');
    await runMockGenerateTest(request, options.dryRun ?? false);
  });

program.parse(process.argv);
