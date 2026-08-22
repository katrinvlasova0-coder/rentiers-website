'use client';

import type { RentiersSession } from '@/lib/session';
import { getPortfolio } from '@/lib/portfolios';

function formatEuro(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Opens a printable statement window (Iteration 1 — no jsPDF dependency). */
export function openAccountStatement(session: RentiersSession) {
  const portfolio = session.portfolio
    ? getPortfolio(session.portfolio)
    : undefined;
  const amount = Number(session.investmentAmount) || 0;
  const rate = portfolio?.rate ?? 0;
  const expected = amount * (rate / 100);
  const activated = session.portfolioActivatedAt || '—';
  const issued = new Date().toISOString().slice(0, 10);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Rentiers Statement — ${session.email}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; color: #0f172a; margin: 40px; }
    h1 { color: #0e7490; margin: 0 0 8px; font-size: 28px; }
    .muted { color: #64748b; font-size: 13px; margin-bottom: 28px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    th { color: #64748b; font-weight: 600; width: 40%; }
    .footer { margin-top: 36px; font-size: 12px; color: #94a3b8; }
    @media print { button { display: none; } }
    button { margin-top: 24px; padding: 10px 18px; background: #0e7490; color: white; border: 0; border-radius: 8px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Rentiers</h1>
  <p class="muted">Portfolio statement · Issued ${issued}</p>
  <table>
    <tr><th>Investor</th><td>${session.firstName} &lt;${session.email}&gt;</td></tr>
    <tr><th>Portfolio</th><td>${portfolio?.label ?? session.portfolio ?? '—'} (${rate}% p.a. expected)</td></tr>
    <tr><th>Deposited</th><td>${formatEuro(amount)}</td></tr>
    <tr><th>Expected return (12 months)</th><td>${formatEuro(expected)}</td></tr>
    <tr><th>Activated</th><td>${activated}</td></tr>
    <tr><th>Status</th><td>Active</td></tr>
  </table>
  <p class="footer">Expected returns are not guaranteed. Rentiers Global Inc. · Confidential</p>
  <button onclick="window.print()">Print / Save as PDF</button>
  <script>window.focus();</script>
</body>
</html>`;

  const w = window.open('', '_blank', 'noopener,noreferrer,width=720,height=900');
  if (!w) {
    throw new Error('Pop-up blocked. Allow pop-ups to download your statement.');
  }
  w.document.write(html);
  w.document.close();
}

export function StatementHint() {
  return (
    <p className="mt-2 text-xs text-slate-500">
      Opens a printable statement you can save as PDF from your browser.
    </p>
  );
}
