import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ArticleNotification {
  slug: string;
  titleDe: string;
  titleEn: string;
  cluster: string;
  keywordDe: string;
  searchVolDe: number;
  wordCountDe: number;
  wordCountEn: number;
  faqCount: number;
  publishedDate: string;
  coverImage: string;
  descriptionDe: string;
}

export async function sendArticleNotification(
  article: ArticleNotification,
): Promise<void> {
  if (!resend || !process.env.NOTIFY_EMAIL) {
    console.log('ℹ️ Email notification skipped (RESEND_API_KEY or NOTIFY_EMAIL not set)');
    return;
  }

  const baseUrl = process.env.SITE_BASE_URL || 'https://rentierspro.com';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  const fromEmail = process.env.FROM_EMAIL || 'content@rentiers.pro';

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Artikel veröffentlicht</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#1B2A4A;padding:28px 32px;">
              <p style="margin:0;color:#C9A84C;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">RENTIERS PRO — CONTENT UPDATE</p>
              <h1 style="margin:8px 0 0;color:#ffffff;font-size:20px;font-weight:700;">✅ Новая статья опубликована</h1>
            </td>
          </tr>
          ${
            article.coverImage
              ? `<tr><td><img src="${article.coverImage}" alt="${article.titleDe}" style="width:100%;height:220px;object-fit:cover;display:block;" /></td></tr>`
              : ''
          }
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px;color:#2563EB;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${article.cluster}</p>
              <h2 style="margin:0 0 8px;color:#0F172A;font-size:22px;font-weight:700;line-height:1.3;">${article.titleDe}</h2>
              <p style="margin:0 0 4px;color:#64748B;font-size:14px;font-style:italic;">${article.titleEn}</p>
              <p style="margin:16px 0 24px;color:#475569;font-size:15px;line-height:1.6;">${article.descriptionDe}</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td width="25%" style="padding:12px;background:#F1F5F9;border-radius:8px;text-align:center;">
                    <p style="margin:0;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;">DE Wörter</p>
                    <p style="margin:4px 0 0;color:#0F172A;font-size:20px;font-weight:700;">${article.wordCountDe.toLocaleString('de-DE')}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="25%" style="padding:12px;background:#F1F5F9;border-radius:8px;text-align:center;">
                    <p style="margin:0;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;">EN Wörter</p>
                    <p style="margin:4px 0 0;color:#0F172A;font-size:20px;font-weight:700;">${article.wordCountEn.toLocaleString('de-DE')}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="25%" style="padding:12px;background:#F1F5F9;border-radius:8px;text-align:center;">
                    <p style="margin:0;color:#64748B;font-size:11px;font-weight:600;text-transform:uppercase;">FAQ</p>
                    <p style="margin:4px 0 0;color:#0F172A;font-size:20px;font-weight:700;">${article.faqCount}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="13%" style="padding:12px;background:#DCFCE7;border-radius:8px;text-align:center;">
                    <p style="margin:0;color:#166534;font-size:11px;font-weight:600;text-transform:uppercase;">SEO vol</p>
                    <p style="margin:4px 0 0;color:#166534;font-size:16px;font-weight:700;">${article.searchVolDe.toLocaleString('de-DE')}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;color:#64748B;font-size:13px;">
                🔑 <strong>Primärkeyword:</strong>
                <span style="background:#DBEAFE;color:#1D4ED8;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;">${article.keywordDe}</span>
              </p>
              <p style="margin:0 0 28px;color:#64748B;font-size:13px;">
                📅 <strong>Veröffentlicht:</strong> ${new Date(article.publishedDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#1B2A4A;border-radius:10px;padding:14px 28px;">
                    <a href="${articleUrl}" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">Artikel ansehen →</a>
                  </td>
                  <td width="12"></td>
                  <td style="border:2px solid #E2E8F0;border-radius:10px;padding:12px 24px;">
                    <a href="${baseUrl}/en/blog/${article.slug}" style="color:#475569;text-decoration:none;font-size:15px;font-weight:600;">View in English →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;">
              <p style="margin:0;color:#94A3B8;font-size:12px;text-align:center;">
                Rentiers Pro Content Factory · Automatisch generiert und veröffentlicht<br>
                <a href="${baseUrl}/blog" style="color:#2563EB;">Alle Artikel ansehen</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: `Rentiers Content Factory <${fromEmail}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `✅ Neue Artikel: ${article.titleDe}`,
    html,
  });

  if (error) {
    console.error('❌ Resend API error:', error);
    throw new Error(`Resend failed: ${error.message}`);
  }

  console.log(`📧 Email notification sent to ${process.env.NOTIFY_EMAIL} (id: ${data?.id ?? 'n/a'})`);
}
