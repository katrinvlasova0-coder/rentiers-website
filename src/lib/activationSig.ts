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
