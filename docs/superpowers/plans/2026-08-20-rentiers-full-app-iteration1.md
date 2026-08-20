# Rentiers Full App Iteration 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a client-demoable Honest Fake account app under `/account/*` (register → portfolio → Stripe → dashboard + magic activate), wired from marketing CTAs, with session in `localStorage` and Sheets via the existing onboarding webhook + `type`.

**Architecture:** Static Next.js export (`output: 'export'`, `trailingSlash: true`) — all step routing is **client-side** (localStorage). Dark `AccountShell` replaces marketing chrome on account routes. One webhook URL with `type: registration | portfolio | withdrawal`. Stripe Payment Link for payment. Activate via signed query params.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind 4, existing `ymGoal` / `customEvent`, Vitest for pure lib tests.

**Spec:** `docs/superpowers/specs/2026-08-20-rentiers-full-app-iteration1-design.md`

## Global Constraints

- Code lives in `_repo/` (git root). Paths below are relative to `_repo/`.
- English-only copy on account + payment-success pages.
- Do not mount `AppOnboardingModal`; keep file on disk unused.
- Reuse `NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL`; add `type` field — do not create separate webhook env vars.
- After register: `step: 'kyc_approved'` (skip KYC UI).
- Webhook URL empty → soft success (advance UI). URL present + failure → show error, do not advance.
- All `localStorage` access in try/catch.
- Min investment €5,000; currency EUR; portfolio rates are “Expected returns. Not guaranteed.”
- Account UI tokens: bg `#07101f`, card `#0d1829`, primary `#4FC8E8`, blue `#1D4ED8`.
- Static export: never rely on server `redirect()` based on session; use client `router.replace`.
- Links must respect `trailingSlash: true` (prefer `/account/register/` or Next `<Link href="/account/register">` which handles it).
- Do not change B2B/contact lead modal behavior.
- YAGNI: no KYC upload, no jsPDF, no DE i18n for account, no separate webhook URLs.

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/session.ts` | Session types + get/set/clear/update with safe storage |
| `src/lib/activationSig.ts` | SHA-256 sig create/verify |
| `src/lib/submitAccountEvent.ts` | Webhook POST with `type` |
| `src/lib/portfolios.ts` | Portfolio catalog (id, label, rate) |
| `src/hooks/useSession.ts` | React session state + refresh |
| `src/components/account/AccountShell.tsx` | Dark chrome + progress slot |
| `src/components/account/StepProgress.tsx` | Steps 1–4 indicator |
| `src/components/account/RegisterForm.tsx` | Registration form |
| `src/components/account/PortfolioSelector.tsx` | Cards + amount + disclaimer |
| `src/components/account/DepositScreen.tsx` | Summary + Stripe CTA |
| `src/components/account/Dashboard.tsx` | payment_pending + active states |
| `src/components/account/SiteChromeGate.tsx` | Hide Header/Footer on account paths |
| `src/app/account/layout.tsx` | Account segment layout wrapper |
| `src/app/account/page.tsx` | Client step router |
| `src/app/account/register/page.tsx` | Register route |
| `src/app/account/portfolio/page.tsx` | Portfolio route |
| `src/app/account/deposit/page.tsx` | Deposit route |
| `src/app/account/dashboard/page.tsx` | Dashboard route |
| `src/app/account/activate/page.tsx` | Magic link |
| `src/app/payment-success/page.tsx` | Post-Stripe |
| `public/manager-activate.html` | Ops link generator |
| `src/components/ui/LeadButton.tsx` | `register` → navigate to `/account/register` |
| `src/contexts/LeadFormContext.tsx` | Remove onboarding modal wiring |
| `src/app/open-account/page.tsx` | Client redirect to register |
| `src/app/sitemap.ts` | Register URL; keep open-account or point note |
| `.github/workflows/deploy.yml` | Pass new public env secrets |
| `.env.example` | Document new vars (create if missing) |

---

### Task 1: Session + activation sig (Vitest)

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (scripts + devDeps)
- Create: `src/lib/session.ts`
- Create: `src/lib/activationSig.ts`
- Create: `src/lib/session.test.ts`
- Create: `src/lib/activationSig.test.ts`

**Interfaces:**
- Produces:
  - `SESSION_KEY = 'rentiers_session'`
  - `AccountStep`, `PortfolioId`, `RentiersSession`
  - `getSession(): RentiersSession | null`
  - `setSession(session: RentiersSession): boolean` (false if storage failed)
  - `updateSession(partial: Partial<RentiersSession>): RentiersSession | null`
  - `clearSession(): void`
  - `createActivationSig(params: { email: string; amount: string; activatedAt: string; portfolio: string; secret: string }): Promise<string>`
  - `verifyActivationSig(params: {...; sig: string }): Promise<boolean>`

- [ ] **Step 1: Add Vitest**

```bash
cd /Users/ekaterinavlasova/Desktop/rentiers-website/_repo
npm install -D vitest
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: { environment: 'node' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
```

- [ ] **Step 2: Write failing tests**

`src/lib/session.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  SESSION_KEY,
  clearSession,
  getSession,
  setSession,
  updateSession,
  type RentiersSession,
} from './session';

function sample(): RentiersSession {
  return {
    step: 'kyc_approved',
    email: 'a@b.com',
    firstName: 'Ann',
    phone: '+49123',
    registeredAt: '2026-01-01T00:00:00.000Z',
  };
}

describe('session', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    });
  });

  it('round-trips session', () => {
    expect(setSession(sample())).toBe(true);
    expect(getSession()?.email).toBe('a@b.com');
    expect(updateSession({ step: 'payment_pending' })?.step).toBe('payment_pending');
    clearSession();
    expect(getSession()).toBeNull();
    expect(SESSION_KEY).toBe('rentiers_session');
  });

  it('returns null and false when storage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    });
    expect(getSession()).toBeNull();
    expect(setSession(sample())).toBe(false);
  });
});
```

`src/lib/activationSig.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createActivationSig, verifyActivationSig } from './activationSig';

describe('activationSig', () => {
  const base = {
    email: 'Client@Example.com',
    amount: '10000',
    activatedAt: '2026-01-15',
    portfolio: 'balanced',
    secret: 'rentiers2026secret',
  };

  it('verifies matching sig and rejects tampering', async () => {
    const sig = await createActivationSig(base);
    expect(sig).toMatch(/^[0-9a-f]{16}$/);
    expect(await verifyActivationSig({ ...base, sig })).toBe(true);
    expect(await verifyActivationSig({ ...base, amount: '1', sig })).toBe(false);
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npm test
```

Expected: FAIL (modules missing).

- [ ] **Step 4: Implement `session.ts` and `activationSig.ts`**

`src/lib/session.ts` — implement types + get/set/update/clear with try/catch around every storage call; `updateSession` merges into current or returns null if none; JSON parse errors → null.

`src/lib/activationSig.ts`:

```ts
async function sha256Hex(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createActivationSig(params: {
  email: string;
  amount: string;
  activatedAt: string;
  portfolio: string;
  secret: string;
}): Promise<string> {
  const payload = `${params.email.trim().toLowerCase()}|${params.amount}|${params.activatedAt}|${params.portfolio}|${params.secret}`;
  const hex = await sha256Hex(payload);
  return hex.slice(0, 16);
}

export async function verifyActivationSig(
  params: Parameters<typeof createActivationSig>[0] & { sig: string },
): Promise<boolean> {
  const expected = await createActivationSig(params);
  return expected === params.sig;
}
```

Note: Vitest node may need `webcrypto` — if tests fail on `crypto.subtle`, set in test file or config:

```ts
import { webcrypto } from 'node:crypto';
vi.stubGlobal('crypto', webcrypto);
```

- [ ] **Step 5: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/session.ts src/lib/activationSig.ts src/lib/session.test.ts src/lib/activationSig.test.ts
git commit -m "feat(account): add session storage and activation signature helpers"
```

---

### Task 2: Webhook helper + portfolio catalog

**Files:**
- Create: `src/lib/submitAccountEvent.ts`
- Create: `src/lib/submitAccountEvent.test.ts`
- Create: `src/lib/portfolios.ts`
- Modify: `.github/workflows/deploy.yml` (add env keys for later; values from secrets)
- Create: `.env.example` (if absent) documenting vars

**Interfaces:**
- Consumes: `getUtms`, `hasUtms` from `@/lib/utm`
- Produces:
  - `submitAccountEvent(payload: AccountEventPayload): Promise<void>`
  - `AccountEventType = 'registration' | 'portfolio' | 'withdrawal'`
  - `PORTFOLIOS` constant array with `{ id: PortfolioId; label: string; rate: number; blurb: string; popular?: boolean }`
  - `getPortfolio(id: PortfolioId)`

**Payload type:**

```ts
export type AccountEventType = 'registration' | 'portfolio' | 'withdrawal';

export type AccountEventPayload = {
  type: AccountEventType;
  email: string;
  firstName?: string;
  phone?: string;
  consent?: boolean;
  portfolio?: string;
  investmentAmount?: string;
  stripeRef?: string;
  iban?: string;
  amount?: string;
};
```

Behavior (mirror `submitOnboarding.ts` fetch style):
1. If `!process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL` → `console.warn` and `return` (soft success).
2. Else POST JSON as `text/plain;charset=utf-8` with `project: 'rentiers-onboarding'`, `timestamp`, `page`, UTMs, and payload fields.
3. On non-ok or rejected JSON → throw Error.

- [ ] **Step 1: Write failing test** for empty-URL soft success and for throw when fetch fails (mock `global.fetch` + set `process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL`).

- [ ] **Step 2: Run `npm test` — expect FAIL**

- [ ] **Step 3: Implement `submitAccountEvent.ts` and `portfolios.ts`**

`portfolios.ts`:

```ts
import type { PortfolioId } from './session';

export const PORTFOLIOS = [
  { id: 'conservative' as const, label: 'Conservative', rate: 12, blurb: 'Lower risk', popular: false },
  { id: 'balanced' as const, label: 'Balanced', rate: 16, blurb: 'Balanced risk', popular: false },
  { id: 'high_yield' as const, label: 'High-Yield', rate: 20, blurb: 'Higher risk', popular: true },
];

export function getPortfolio(id: PortfolioId) {
  return PORTFOLIOS.find((p) => p.id === id);
}

export const MIN_INVESTMENT_EUR = 5000;
```

- [ ] **Step 4: `npm test` PASS**

- [ ] **Step 5: Update deploy workflow env block**

```yaml
NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL: ${{ secrets.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL }}
NEXT_PUBLIC_STRIPE_PAYMENT_LINK: ${{ secrets.NEXT_PUBLIC_STRIPE_PAYMENT_LINK }}
NEXT_PUBLIC_ACTIVATION_SECRET: ${{ secrets.NEXT_PUBLIC_ACTIVATION_SECRET }}
```

Create `.env.example`:

```bash
NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=
NEXT_PUBLIC_ACTIVATION_SECRET=
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/submitAccountEvent.ts src/lib/submitAccountEvent.test.ts src/lib/portfolios.ts .github/workflows/deploy.yml .env.example
git commit -m "feat(account): add account event webhook and portfolio catalog"
```

---

### Task 3: Account shell, chrome gate, useSession

**Files:**
- Create: `src/hooks/useSession.ts`
- Create: `src/components/account/accountTheme.ts` (CSS variable object / className helpers)
- Create: `src/components/account/StepProgress.tsx`
- Create: `src/components/account/AccountShell.tsx`
- Create: `src/components/account/SiteChromeGate.tsx`
- Modify: `src/components/layout/Header.tsx` — return null when hidden
- Modify: `src/components/layout/Footer.tsx` — return null when hidden
- Create: `src/app/account/layout.tsx`

**Interfaces:**
- Consumes: `getSession`, `setSession`, `updateSession`, `clearSession`
- Produces:
  - `useSession()` → `{ session, ready, setSession, updateSession, clearSession, refresh }`
  - `AccountShell({ children, stepIndex?: 1|2|3|4|null, title?: string })`
  - `StepProgress({ current: 1|2|3|4 })`
  - `SiteChromeGate` context or pathname helper `shouldHideSiteChrome(pathname): boolean`

**Hide chrome rule:** pathname matches `/account` or `/payment-success` (with or without trailing slash / locale — site has no locale prefix).

Implementation approach for Header/Footer (client components already):

```tsx
import { usePathname } from 'next/navigation';
import { shouldHideSiteChrome } from '@/components/account/SiteChromeGate';

// at top of Header/Footer render:
const pathname = usePathname();
if (shouldHideSiteChrome(pathname)) return null;
```

`shouldHideSiteChrome`:

```ts
export function shouldHideSiteChrome(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname === '/account' ||
    pathname.startsWith('/account/') ||
    pathname === '/payment-success' ||
    pathname.startsWith('/payment-success/')
  );
}
```

`AccountShell`: min-h-screen flex column, bg `#07101f`, header with Link “Rentiers” color `#4FC8E8`, optional `StepProgress`, email from `useSession`, main content max-w-3xl mx-auto px-4 py-8, footer trust line.

`useSession`: on mount read `getSession`, set `ready=true`; expose wrappers that update React state after storage writes.

`account/layout.tsx`:

```tsx
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

(Pages wrap themselves in `AccountShell` so payment-success can share shell too by importing it.)

- [ ] **Step 1: Implement files above**

- [ ] **Step 2: Manual check** — `npm run build` still succeeds (no new routes yet required, but imports must compile). Prefer implementing then build.

```bash
npm run build
```

Expected: success (or only pre-existing issues).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useSession.ts src/components/account src/app/account/layout.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat(account): add AccountShell and hide marketing chrome on account routes"
```

---

### Task 4: Register page

**Files:**
- Create: `src/components/account/RegisterForm.tsx`
- Create: `src/app/account/register/page.tsx`

**Interfaces:**
- Consumes: `submitAccountEvent`, `useSession`, `ymGoal`, `customEvent`, `AccountShell`

Behavior:
1. Client page wrapped in `AccountShell` `stepIndex={1}`.
2. Fields: firstName, email, phone, TOS checkbox.
3. Validate; on submit call `submitAccountEvent({ type: 'registration', firstName, email, phone, consent: true })`.
4. On success: `setSession({ step: 'kyc_approved', email, firstName, phone, registeredAt: new Date().toISOString() })`, analytics, `router.push('/account/portfolio')`.
5. On throw: show error string; stay on page.

- [ ] **Step 1: Implement RegisterForm + page** (EN copy: “Create Account →”, TOS text linking `/agb/` and `/datenschutz/` if desired).

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: includes `/account/register` in export.

- [ ] **Step 3: Commit**

```bash
git add src/components/account/RegisterForm.tsx src/app/account/register/page.tsx
git commit -m "feat(account): add registration page"
```

---

### Task 5: Portfolio page

**Files:**
- Create: `src/components/account/PortfolioSelector.tsx`
- Create: `src/app/account/portfolio/page.tsx`

**Guards (client, after `ready`):**
- no session / no email → `router.replace('/account/register')`
- `session.step === 'active'` → `router.replace('/account/dashboard')`

UI:
- Banner: “Identity verification will be required before portfolio activation.”
- Three cards from `PORTFOLIOS`; High-Yield “Most Popular”; under each: “Expected returns. Not guaranteed.”
- Amount number input, min 5000; risk checkbox required.
- Submit → `submitAccountEvent({ type: 'portfolio', email, portfolio, investmentAmount })` → `updateSession({ step: 'portfolio_selected', portfolio, investmentAmount })` → analytics `portfolio_selected` / `PortfolioSelected` → `/account/deposit`.

- [ ] **Step 1: Implement**

- [ ] **Step 2: `npm run build`**

- [ ] **Step 3: Commit**

```bash
git add src/components/account/PortfolioSelector.tsx src/app/account/portfolio/page.tsx
git commit -m "feat(account): add portfolio selection page"
```

---

### Task 6: Deposit + payment-success

**Files:**
- Create: `src/components/account/DepositScreen.tsx`
- Create: `src/app/account/deposit/page.tsx`
- Create: `src/app/payment-success/page.tsx`

**Deposit guards:** need session with email; if missing portfolio/amount → portfolio; if `active` → dashboard.

**Pay click:**

```ts
const local = session.email.split('@')[0] || 'user';
const stripeRef = `rentiers_${Date.now()}_${local}`;
updateSession({ stripeRef, step: 'payment_pending' });
const link = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
if (!link) { setError('Payment is not configured.'); return; }
const url = new URL(link);
url.searchParams.set('prefilled_email', session.email);
url.searchParams.set('client_reference_id', stripeRef);
window.location.href = url.toString();
// optional: try { window.open(...) } only as documented fallback if needed
```

Also: “Change Portfolio” link; “I’ve already paid” → set message + link to dashboard.

**payment-success:** client; fire analytics once on mount; `AccountShell` without step or step 3 complete; CTA to dashboard; do not change step away from `payment_pending`.

- [ ] **Step 1: Implement**

- [ ] **Step 2: `npm run build`**

- [ ] **Step 3: Commit**

```bash
git add src/components/account/DepositScreen.tsx src/app/account/deposit/page.tsx src/app/payment-success/page.tsx
git commit -m "feat(account): add deposit Stripe redirect and payment success page"
```

---

### Task 7: Dashboard + withdrawal

**Files:**
- Create: `src/components/account/Dashboard.tsx`
- Create: `src/app/account/dashboard/page.tsx`

**States:**
- `payment_pending` (and `portfolio_selected` if user lands early): State A progress UI + Contact Support (`mailto:hello@rentiers.net` or existing contact — use `mailto:info@rentiers.net` if that is site standard; check `constants/site.ts` / Footer for email).
- `active`: State C metrics using `investmentAmount`, `getPortfolio`, `portfolioActivatedAt`; expected return = amount * rate/100; days until payout ≈ activatedAt + 365 days.
- Breakdown bars (static illustrative percentages) as in spec.
- Withdrawal: toggle panel with IBAN (+ optional amount defaulting to deposited); `submitAccountEvent({ type: 'withdrawal', email, iban, amount })`; success message.
- Hide/disable Download Statement (do not implement PDF).
- No session → register; early steps (`kyc_approved` only) → “Continue setup” → `/account`.

- [ ] **Step 1: Implement**

- [ ] **Step 2: `npm run build`**

- [ ] **Step 3: Commit**

```bash
git add src/components/account/Dashboard.tsx src/app/account/dashboard/page.tsx
git commit -m "feat(account): add dashboard with pending and active states"
```

---

### Task 8: Activate + manager HTML + account router

**Files:**
- Create: `src/app/account/activate/page.tsx`
- Create: `public/manager-activate.html`
- Create: `src/app/account/page.tsx`

**activate page (client):**
1. Read searchParams (`useSearchParams`): email, portfolio, amount, activatedAt, sig.
2. `secret = process.env.NEXT_PUBLIC_ACTIVATION_SECRET || ''`.
3. If missing fields or `!(await verifyActivationSig(...))` → error UI in shell.
4. Else `setSession({ step: 'active', email, firstName: getSession()?.firstName || 'Investor', phone: getSession()?.phone || '', portfolio, investmentAmount: amount, portfolioActivatedAt: activatedAt, registeredAt: getSession()?.registeredAt || new Date().toISOString() })`.
5. Analytics; redirect dashboard after short delay.

**manager-activate.html:** dark simple form; secret input (default empty, user pastes); Generate uses same payload formula. Because static HTML cannot import TS, **duplicate the SHA-256 logic in the HTML file with Web Crypto** and comment “must match activationSig.ts”. Base URL default `https://rentiers.net/account/activate/`.

**account/page.tsx:** client; when `ready`, map step → `router.replace` per spec table.

- [ ] **Step 1: Implement**

- [ ] **Step 2: `npm test && npm run build`**

- [ ] **Step 3: Commit**

```bash
git add src/app/account/activate/page.tsx public/manager-activate.html src/app/account/page.tsx
git commit -m "feat(account): add activate magic link, manager helper, and step router"
```

---

### Task 9: Wire CTAs + kill modal + open-account redirect

**Files:**
- Modify: `src/components/ui/LeadButton.tsx`
- Modify: `src/contexts/LeadFormContext.tsx`
- Modify: `src/app/open-account/page.tsx`
- Modify: `src/app/sitemap.ts`

**LeadButton:** if `formSource === 'register'`, after metrika goal, `router.push('/account/register')` and **do not** `openForm`. Keep contact/b2b/login opening modal.

**LeadFormContext:** remove `AppOnboardingModal` import/render; remove `onboardingOpen` state and `/open-account` auto-open effect; keep `openOnboarding` as no-op or make it `router.push('/account/register')` for safety; simplify context type if unused — if `openOnboarding` unused elsewhere, remove from type; grep first.

**open-account/page.tsx:**

```tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OpenAccountPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/account/register');
  }, [router]);
  return (
    <div className="px-6 py-24 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
      Redirecting to account registration…
    </div>
  );
}
```

**sitemap:** change open-account entry priority or add `{ url: `${SITE_URL}/account/register/`, ... priority 0.9 }`; keep `/open-account/` for old links.

- [ ] **Step 1: Grep `openOnboarding` and `AppOnboardingModal` usages; apply changes**

- [ ] **Step 2: `npm run build`**

- [ ] **Step 3: Smoke checklist (dev server)**

```bash
npm run dev
```

Manually: Header CTA → `/account/register/`; complete register (webhook soft or real); portfolio; deposit builds Stripe URL with query params; `/account/` routes by step.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/LeadButton.tsx src/contexts/LeadFormContext.tsx src/app/open-account/page.tsx src/app/sitemap.ts
git commit -m "feat(account): route register CTAs to /account/register and retire onboarding modal"
```

---

### Task 10: Final verification

- [ ] **Step 1: Full check**

```bash
npm test
npm run build
```

Expected: all tests pass; build exports account + payment-success routes without TS errors.

- [ ] **Step 2: Spec coverage spot-check**

Confirm present: session try/catch, type on webhook, KYC skip + banner, €5k min, Stripe params, payment_pending dashboard, activate sig, manager HTML, modal unmounted, EN-only account copy.

- [ ] **Step 3: Commit any leftover fixes** (only if needed)

```bash
git status
# fix and commit if anything remains
```

---

## Plan self-review

| Spec item | Task |
|-----------|------|
| session.ts + try/catch | T1 |
| activation sig SHA-256 16 hex | T1, T8 |
| submitAccountEvent + type | T2 |
| AccountShell / StepProgress | T3 |
| Hide marketing chrome | T3 |
| Register + kyc_approved | T4 |
| Portfolio + banner + min €5k | T5 |
| Deposit + Stripe | T6 |
| payment-success analytics | T6 |
| Dashboard A + C + withdrawal | T7 |
| Activate + manager HTML + router | T8 |
| CTAs + unwire modal + open-account | T9 |
| Deploy env for Stripe/secret | T2 |
| Static export client routing | All page tasks |
| No KYC upload / no PDF | Explicitly omitted |

No TBD placeholders. Types consistent: `PortfolioId`, `RentiersSession.step`, event `type` union.
