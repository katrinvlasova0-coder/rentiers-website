import { formatUtms, getUtms, hasUtms, type UtmParams } from '@/lib/utm';

const LEADS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEADS_WEBHOOK_URL ??
  'https://script.google.com/macros/s/AKfycbxgm1M73LWE_23wtbWzJjLBwd7P_s1t46Y2bwDNf2Wc9KKkGjjPtR91xFTkKdp64PHV/exec';

const PROJECT_NAME = 'rentiers';

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
  consent?: boolean;
}

function withUtmSource(base: string, utms: UtmParams): string {
  const tag = formatUtms(utms);
  if (!tag) return base;
  return [base, tag].filter(Boolean).join(' | ');
}

export async function submitLead({
  name,
  email,
  phone,
  message,
  source,
  consent = true,
}: LeadPayload): Promise<void> {
  const page =
    typeof window !== 'undefined'
      ? `${window.location.hostname}${window.location.pathname}`
      : 'rentiers.net';

  const utms = getUtms();

  const sourceDetails =
    source ??
    [page, message.trim() && `message: ${message.trim()}`].filter(Boolean).join(' | ');

  const payload = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    consent,
    project: PROJECT_NAME,
    source: withUtmSource(sourceDetails, utms),
    timestamp: new Date().toISOString(),
    ...(hasUtms(utms) ? utms : {}),
  };

  const response = await fetch(LEADS_WEBHOOK_URL, {
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
    const data = JSON.parse(text) as { result?: string; error?: string };
    if (data.result !== 'ok') {
      throw new Error(data.error || 'Webhook rejected the lead');
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
