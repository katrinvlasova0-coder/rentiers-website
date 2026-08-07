import { getUtms, hasUtms } from '@/lib/utm';

const ONBOARDING_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL ?? '';

export interface OnboardingPayload {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  // Step 2
  dateOfBirth: string;
  nationality: string;
  docType: string;
  docNumber: string;
  // Step 3
  investmentAmount: string;
  portfolio: string;
  sourceOfFunds: string;
  howHeard: string;
  // Step 4
  consentsAccepted: boolean;
}

export async function submitOnboarding(data: OnboardingPayload): Promise<void> {
  if (!ONBOARDING_WEBHOOK_URL) {
    throw new Error('Onboarding webhook URL is not configured');
  }

  const utms = getUtms();
  const page =
    typeof window !== 'undefined'
      ? `${window.location.hostname}${window.location.pathname}`
      : 'rentiers.net';

  const payload = {
    ...data,
    timestamp: new Date().toISOString(),
    page,
    project: 'rentiers-onboarding',
    ...(hasUtms(utms) ? utms : {}),
  };

  const response = await fetch(ONBOARDING_WEBHOOK_URL, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Webhook HTTP ${response.status}: ${text.slice(0, 200)}`);
  }

  try {
    const json = JSON.parse(text) as { result?: string; error?: string };
    if (json.result !== 'ok') {
      throw new Error(json.error || 'Webhook rejected the submission');
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      if (!text.toLowerCase().includes('ok')) {
        throw new Error('Unexpected webhook response');
      }
    } else {
      throw err;
    }
  }
}
