# Rentiers Content Factory

Autonomous TypeScript tool for generating Rentiers Pro blog articles from the content plan.

## Features

- Claude API article generation with SEO + GEO constraints
- MDX validator (no JSX, no anchor IDs, bilingual `---en---` section)
- Unsplash image integration
- Queue management (`pending` → `in-progress` → `completed`)
- `sitemap.xml` and `robots.txt` maintenance
- Optional Resend email notifications
- GitHub Actions scheduled batch generation

> **⚠️ Mock mode** (`--mock`) is for **pipeline testing only** — not production-quality content. Use Claude API (`ANTHROPIC_API_KEY`) for real articles.

```bash
cd content-factory
cp .env.example .env
# Fill in ANTHROPIC_API_KEY, UNSPLASH_ACCESS_KEY, etc.

npm install
npm run init

# Dry-run single article (no API key needed)
npm run generate -- sparkonto-inflation-zinsen-2026 --mock --dry-run

# Full pipeline test (Unsplash + email + sitemap)
npm run test

# Mock article publish (test content — delete later)
npm run mock -- sparkonto-inflation-zinsen-2026 --dry-run

# Publish with git commit
npm run generate -- einlagenarbitrage-leitfaden-2026 --commit

# Batch from queue
npm run batch -- -n 3 --commit --delay 10000
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `npm run init` | Initialize queue, sitemap, robots.txt |
| `npm run generate -- <slug>` | Generate one article |
| `npm run batch` | Generate next N from queue |
| `npm run validate -- <slug>` | Validate existing `.mdx` |
| `npm run sitemap` | Rebuild `public/sitemap.xml` |
| `npm run queue:list` | List pending articles |
| `npm run queue:add -- <slug>` | Add article to queue |

## Environment Variables

See `.env.example`. Required:

- `ANTHROPIC_API_KEY`

Optional:

- `UNSPLASH_ACCESS_KEY` — real images (fallback placeholders if missing)
- `RESEND_API_KEY` + `NOTIFY_EMAIL` — email notifications
- `SITE_BASE_URL` — default `https://rentiers.net`

## Content Plan

`config/content-plan.json` — 53 articles exported from `Rentiers_Контент-план_2026.xlsx`.

Re-export after Excel updates:

```bash
npx xlsx-cli "../Rentiers_Контент-план_2026.xlsx" --sheet-index 2 --json > /tmp/raw.json
# Then run the conversion script in scripts/ or re-run init
```

## CMS Constraints (enforced by validator)

- No JSX components in article body
- No `{#anchor-id}` on headings
- No internal `[text](#anchor)` links
- No H1 in body
- `tags` and `faq` as inline YAML arrays
- Mandatory `---en---` English section

## GitHub Actions

1. **content-factory.yml** — every other day at 08:00 UTC: 1 article from queue → commit → deploy (requires `ANTHROPIC_API_KEY`)
2. **notify-on-publish.yml** — Email on new `.mdx` push to `main`

Add secrets: `ANTHROPIC_API_KEY`, `UNSPLASH_ACCESS_KEY`, `RESEND_API_KEY`, `NOTIFY_EMAIL`
