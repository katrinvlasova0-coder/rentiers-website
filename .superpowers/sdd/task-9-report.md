# Task 9 Report: CTA Routing + Onboarding Modal Retirement

## Implemented

- Registration `LeadButton` CTAs now record their Metrika goal and route to `/account/register` without opening `LeadFormModal`.
- Contact, B2B, and login CTA sources continue to open `LeadFormModal`.
- Removed the onboarding modal mount, state, deep-link auto-open behavior, and unused context methods from `LeadFormContext`.
- Kept `AppOnboardingModal.tsx` on disk, unused.
- Changed `/open-account` into a client-side redirect to `/account/register`.
- Added `/account/register/` to the sitemap while retaining `/open-account/`.

## Tests

TDD red run failed all four new CTA action tests because `getLeadButtonAction` did not exist. The green run passed all four cases for registration, contact, B2B, and login behavior.

Final verification:

- `npm test -- src/components/ui/LeadButton.test.ts`: 1 file, 4 tests passed.
- `npm run build`: passed; `/account/register` and `/open-account` were statically generated.

Existing non-blocking warnings remain for npm `devdir`, Vitest native config loading, and Next.js workspace-root inference.
