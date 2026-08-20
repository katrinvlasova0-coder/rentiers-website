# Rentiers Full App — Iteration 1 Design Spec

**Date:** 2026-08-20  
**Status:** Approved (design dialogue)  
**Codebase root:** `_repo/` (Next.js App Router)  
**Goal:** Client-demoable “Honest Fake” account app: register → portfolio → Stripe → dashboard; ops via Sheets/Bitrix/email; no real backend.

---

## 1. Decisions locked in dialogue

| Topic | Decision |
|--------|----------|
| Entry path | Single branch: CTAs → `/account/register` |
| Legacy modal | `AppOnboardingModal` stays in repo but is **not mounted**; remove from `LeadFormContext` |
| `/open-account` | Redirect to `/account/register` |
| Copy language | English only for `/account/*` and `/payment-success` |
| Webhooks | Reuse `NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL`; add `type: 'registration' \| 'portfolio' \| 'withdrawal'` |
| KYC | Skipped in Iter.1; after register set `step: 'kyc_approved'`; banner on portfolio |
| Architecture approach | New `/account/*` pages + `session.ts` (not split/refactor of modal form fields) |

---

## 2. Architecture

### Principle: Honest Fake

- UI looks like a real product.
- Payments are real (Stripe Payment Link).
- No JWT, no DB, no server session.
- Browser session: `localStorage` key `rentiers_session`.
- Manager never edits the client’s browser; activation uses a magic link email.

### High-level flow

```
CTA → /account/register
  → webhook type=registration
  → session step=kyc_approved
  → /account/portfolio
  → webhook type=portfolio
  → session step=portfolio_selected
  → /account/deposit
  → Stripe Payment Link (prefilled_email, client_reference_id)
  → session step=payment_pending
  → /payment-success
  → /account/dashboard (State A)
  → manager email with /account/activate?...&sig=
  → session step=active
  → /account/dashboard (State C)
```

### `/account` step router

| `session.step` | Redirect |
|----------------|----------|
| missing / no session | `/account/register` |
| `registered` | `/account/portfolio` (treat as post-KYC skip) |
| `kyc_pending` | `/account/portfolio` |
| `kyc_approved` | `/account/portfolio` |
| `portfolio_selected` | `/account/deposit` |
| `payment_pending` | `/account/dashboard` |
| `active` | `/account/dashboard` |
| default | `/account/register` |

---

## 3. Session model

```ts
type AccountStep =
  | 'registered'
  | 'kyc_pending'
  | 'kyc_approved'
  | 'portfolio_selected'
  | 'payment_pending'
  | 'active';

type PortfolioId = 'conservative' | 'balanced' | 'high_yield';

interface RentiersSession {
  step: AccountStep;
  email: string;
  firstName: string;
  lastName?: string;
  phone: string;
  portfolio?: PortfolioId;
  investmentAmount?: string; // EUR amount as entered, e.g. "10000"
  stripeRef?: string;
  registeredAt: string; // ISO
  portfolioActivatedAt?: string; // ISO date or ISO datetime from activate link
}
```

**Rules:**

- All `localStorage` get/set/clear wrapped in try/catch; on failure, continue without persistence (in-memory fallback via hook state where practical).
- Duplicate registration: overwrite session; Sheets may get a duplicate row (ops OK).
- `step` is only advanced by the client app or the activate page — never by a remote push.

---

## 4. Integrations & env

| Env | Purpose |
|-----|---------|
| `NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL` | Existing Apps Script (keep live table) |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Stripe Payment Link (customer-chooses-amount preferred) |
| `NEXT_PUBLIC_ACTIVATION_SECRET` | Secret for activate `sig` |

**Webhook helper:** extend or wrap `submitOnboarding` as `submitAccountEvent` posting JSON (`Content-Type: text/plain;charset=utf-8`, same as leads) with:

- `type`: `'registration' | 'portfolio' | 'withdrawal'`
- `project`: `'rentiers-onboarding'`
- `timestamp`, `page`, UTMs (existing `getUtms` / `hasUtms`)
- event-specific fields (see below)

**Webhook failure policy (explicit):**

- URL **missing/empty**: treat as soft success for local demo — advance UI, do not throw (optional console warn).
- URL present but **HTTP/network/reject**: show error, **do not** advance `step` (user can retry).

### Payload shapes

**registration**

- `type`, `firstName`, `email`, `phone`, `consent: true`, `page`, `project`, UTMs

**portfolio**

- `type`, `email`, `portfolio`, `investmentAmount`, `stripeRef?`, `page`, `project`, UTMs

**withdrawal**

- `type`, `email`, `iban`, `amount?`, `page`, `project`, UTMs

Apps Script (ops-owned): branch on `type` into sheet/column. Separate webhook URLs are **out of scope** until ops requests them.

### Stripe redirect

```ts
const stripeRef = `rentiers_${Date.now()}_${emailLocalPart}`;
setSession({ ...session, stripeRef, step: 'payment_pending' });
const url = new URL(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK!);
url.searchParams.set('prefilled_email', session.email);
url.searchParams.set('client_reference_id', stripeRef);
// Prefer same-tab navigation; if blocked, fallback window.open(..., '_blank')
```

---

## 5. Routes & UI

### Shared: `AccountShell` + `StepProgress`

- Dark theme scoped to account layout (do not change global marketing CSS tokens).
- Tokens: `--bg #07101f`, `--card #0d1829`, border `rgba(79,200,232,0.15)`, primary `#4FC8E8`, blue `#1D4ED8`, muted `#94a3b8`.
- Header: Rentiers → `/`, steps 1–4 on onboarding routes, email chip when session exists.
- Footer: AES-256 · FinCEN/FINTRAC · Rentiers Global Inc. © 2026.
- Mobile-first, usable from 320px width.
- EN copy only.

### `/account/register`

- Fields: First Name, Email, Phone, TOS checkbox (required).
- Submit: validate → webhook `registration` → session `{ step: 'kyc_approved', ... }` → `/account/kyc` **not used**; go to `/account/portfolio`.
- Analytics: `ymGoal('registration_completed')`, `customEvent('RegistrationCompleted')`.

### `/account/portfolio`

- Guard: no session/email → register; `active` → dashboard.
- Banner: identity verification will be required before portfolio activation.
- Three cards: Conservative 12% / Balanced 16% / High-Yield 20% (Most Popular); each with “Expected returns. Not guaranteed.”
- Investment amount input, min **€5,000**, currency **EUR only**.
- Risk disclaimer checkbox required.
- Submit: session `portfolio_selected` + webhook `portfolio` → `/account/deposit`.

### `/account/deposit`

- Summary of portfolio + amount + first payout ~12 months.
- Payment methods shown as informational (Card / SEPA / iDEAL).
- Trust bullets (Stripe PCI, funds to Rentiers Global Inc., activation within 3 business days).
- Primary: Pay Securely with Stripe →.
- Secondary: Change Portfolio → `/account/portfolio`.
- “I’ve already paid — check my status” → message: checking, up to 24h (stay on `payment_pending` / link to dashboard).

### `/payment-success`

- Stripe success redirect target: `https://rentiers.net/payment-success` (path `/payment-success`).
- Keep `step` as `payment_pending` if already set.
- Analytics: `ymGoal('payment_completed')`, `customEvent('DepositCompleted', { source: 'stripe' })`.
- CTA: View My Account → `/account/dashboard`.

### `/account/dashboard`

**State A — `payment_pending`:** progress ~60%, checklist through “payment being confirmed”, Contact Support.

**State C — `active`:** portfolio summary, deposited / expected return / days until payout, simple breakdown bars (Georgia / Armenia / Israel illustrative), actions:

- Request Withdrawal → IBAN form → webhook `withdrawal` → success toast/message
- Download Statement → **hidden or disabled** (Iter.2)
- Contact Manager → `mailto:` or contact path

If session is earlier than payment (edge): show “Continue setup” linking to `/account`.

### `/account/activate`

Query: `email`, `portfolio`, `amount`, `activatedAt`, `sig`.

1. Validate required params.
2. Verify `sig` matches manager generator.
3. On invalid sig: error UI, no write.
4. On valid sig: write session `step: 'active'`, portfolio, amount, `portfolioActivatedAt` from params (**manager intent wins** even if a different session email exists).
5. Success message → redirect `/account/dashboard`.

**`sig` algorithm (fixed for Iter.1):**

```
payload = `${email.trim().toLowerCase()}|${amount}|${activatedAt}|${portfolio}|${secret}`
sig = first 16 hex chars of SHA-256(payload)   // Web Crypto in browser; SubtleCrypto
```

Manager HTML must use the same formula. Not cryptographic auth — only stops accidental/guessed links.

### Manager helper (Iter.1 — include)

- Static `_repo/public/manager-activate.html` (not linked in nav/footer/sitemap): inputs → copy activate URL with `sig`. Not a public product page.

### Not in Iteration 1

- KYC upload / `/account/kyc` page (may 404 or redirect to portfolio if hit)
- Email verification
- jsPDF statements
- Push notifications, multi-portfolio, card flows, referrals
- DE/EN i18n for account
- Separate registration/portfolio/withdrawal webhook URLs

---

## 6. CTA & legacy wiring

**Change to navigate to `/account/register` (link or router):**

- Header register CTAs
- `HeroHome`, `Calculator`, `PortfoliosContent`, `CtaBanner`
- Blog register CTAs where `formSource === 'register'`
- Prefer `<Link href="/account/register">` over `LeadButton` for register; keep `LeadButton` for `contact` / `b2b` / `login`

**`LeadFormContext`:**

- Remove `AppOnboardingModal` render and `onboardingOpen` auto-open on `/open-account`
- `OPEN_ACCOUNT_PATH` may redirect at page level instead

**`/open-account`:** server or client redirect → `/account/register` (preserve as bookmark URL).

**Sitemap:** add `/account/register` (and optionally other account entry URLs); keep or replace `/open-account` entry with register.

---

## 7. Error handling & edge cases

| Case | Behavior |
|------|----------|
| Safari private / storage blocked | try/catch; proceed; session may not survive refresh |
| Webhook failure on register/portfolio | If URL configured: show error, do not advance; retry OK. If URL missing: soft-advance (demo) |
| Withdrawal webhook failure | Same policy as above; stay on dashboard |
| Missing Stripe env | Disable pay button with config message |
| User closes Stripe unpaid | Remains `payment_pending`; deposit/dashboard messaging |
| Popup blockers | Prefer `location.href`; fallback `_blank` |
| Activate bad sig | Hard stop, no session mutation |
| Browser back | Portfolio ↔ deposit OK; register does not clear session |

---

## 8. Analytics events

| Moment | Metrika / Pixel |
|--------|------------------|
| Registration success | `registration_completed` / `RegistrationCompleted` |
| Portfolio proceed | e.g. `portfolio_selected` / `PortfolioSelected` |
| Payment success page | `payment_completed` / `DepositCompleted` |
| Activate success | e.g. `portfolio_activated` / `PortfolioActivated` |

Reuse `ymGoal` + `customEvent` patterns from existing codebase.

---

## 9. Verification checklist

- [ ] `npm run build` (TypeScript) succeeds in `_repo`
- [ ] Register CTAs land on `/account/register`; modal not shown
- [ ] `/open-account` → `/account/register`
- [ ] Happy path produces Stripe URL with `prefilled_email` + `client_reference_id`
- [ ] Activate with valid sig → active dashboard; invalid sig → error
- [ ] Mobile layout usable at 320px
- [ ] Escape/back do not break the shell (no orphan modal)

---

## 10. Manager ops (post-deploy, non-code)

1. New registration row (`type=registration`) → Bitrix contact  
2. Portfolio row (`type=portfolio`) → status New  
3. Stripe payment email → match by email / `client_reference_id` → Payment Confirmed  
4. Generate activate link → email client → Portfolio Active  
5. Withdrawal rows → process offline  

---

## 11. Scope boundary

This spec is **one** implementation plan: Iteration 1 demo path only. Do not expand into KYC upload, multi-language account UI, or new webhook infrastructure unless a follow-up spec says so.
