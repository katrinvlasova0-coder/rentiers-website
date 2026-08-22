import { getUtms, hasUtms } from '@/lib/utm';

function getAccountWebhookUrl(): string {
  return (
    process.env.NEXT_PUBLIC_ACCOUNT_WEBHOOK_URL ??
    process.env.NEXT_PUBLIC_ONBOARDING_WEBHOOK_URL ??
    ''
  );
}

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

export async function submitAccountEvent(
  data: AccountEventPayload,
): Promise<void> {
  const webhookUrl = getAccountWebhookUrl();
  if (!webhookUrl) {
    console.warn('Account webhook URL is not configured');
    return;
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

  const response = await fetch(webhookUrl, {
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
