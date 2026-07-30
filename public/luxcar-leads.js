(function () {
  const LEADS_WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbxgm1M73LWE_23wtbWzJjLBwd7P_s1t46Y2bwDNf2Wc9KKkGjjPtR91xFTkKdp64PHV/exec';

  const UTM_STORAGE_KEY = 'rentiers_utm';
  const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
  ];

  const scriptEl = document.currentScript;
  const LUXCAR_VARIANT = scriptEl?.getAttribute('data-luxcar-variant') || 'unknown';

  function readStoredUtms() {
    try {
      const raw =
        sessionStorage.getItem(UTM_STORAGE_KEY) ?? localStorage.getItem(UTM_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeStoredUtms(utms) {
    const json = JSON.stringify(utms);
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, json);
    } catch {
      // ignore
    }
    try {
      localStorage.setItem(UTM_STORAGE_KEY, json);
    } catch {
      // ignore
    }
  }

  function captureUtms() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key)?.trim();
      if (value) fromUrl[key] = value;
    });
    if (!Object.keys(fromUrl).length) return readStoredUtms();
    const merged = { ...readStoredUtms(), ...fromUrl };
    writeStoredUtms(merged);
    return merged;
  }

  function formatUtms(utms) {
    return UTM_KEYS.filter((key) => utms[key])
      .map((key) => `${key}=${utms[key]}`)
      .join('&');
  }

  function appendUtmsToHref(href) {
    const utms = captureUtms();
    const hasAny = UTM_KEYS.some((key) => utms[key]);
    if (!hasAny) return href;
    try {
      const url = new URL(href, window.location.origin);
      UTM_KEYS.forEach((key) => {
        const value = utms[key];
        if (value && !url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });
      return url.toString();
    } catch {
      const tag = formatUtms(utms);
      if (!tag) return href;
      return href.includes('?') ? `${href}&${tag}` : `${href}?${tag}`;
    }
  }

  function enhanceRentiersLinks() {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      if (!/^https?:\/\/(www\.)?rentiers\.net\/?$/i.test(href)) return;
      anchor.setAttribute('href', appendUtmsToHref(href));
    });
  }

  // Persist on load so UTMs survive navigation before submit.
  captureUtms();
  enhanceRentiersLinks();

  async function submitLuxcarLead({ name, email, phone, message, formType }) {
    const page =
      typeof window !== 'undefined'
        ? `${window.location.hostname}${window.location.pathname}`
        : 'rentiers.net';

    const utms = captureUtms();
    const utmTag = formatUtms(utms);

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
        utmTag,
        message?.trim(),
      ]
        .filter(Boolean)
        .join(' | '),
      timestamp: new Date().toISOString(),
      ...utms,
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
})();
