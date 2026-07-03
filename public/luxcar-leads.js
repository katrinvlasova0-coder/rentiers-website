(function () {
  const LEADS_WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbxgm1M73LWE_23wtbWzJjLBwd7P_s1t46Y2bwDNf2Wc9KKkGjjPtR91xFTkKdp64PHV/exec';

  const scriptEl = document.currentScript;
  const LUXCAR_VARIANT = scriptEl?.getAttribute('data-luxcar-variant') || 'unknown';

  async function submitLuxcarLead({ name, email, phone, message, formType }) {
    const page =
      typeof window !== 'undefined'
        ? `${window.location.hostname}${window.location.pathname}`
        : 'rentiers.net';

    const payload = {
      name: (name || '').trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      consent: true,
      project: 'rentiers',
      source: [
        `luxcar-${LUXCAR_VARIANT}`,
        formType,
        page,
        message?.trim(),
      ]
        .filter(Boolean)
        .join(' | '),
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(LEADS_WEBHOOK_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Webhook HTTP ${response.status}`);
    }

    try {
      const data = JSON.parse(text);
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

  window.submitLuxcarLead = submitLuxcarLead;
  window.LUXCAR_VARIANT = LUXCAR_VARIANT;
})();
