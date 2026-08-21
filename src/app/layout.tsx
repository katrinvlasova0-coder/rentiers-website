import type { Metadata } from 'next';
import { Suspense } from 'react';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlLang from "@/components/layout/HtmlLang";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import { assetPath, BASE_PATH } from "@/lib/basePath";
import { OG_IMAGE, OG_IMAGE_ALT_EN, OG_DESCRIPTION_EN, OG_TITLE_EN, SITE_NAME, SITE_URL } from "@/constants/site";
import YandexMetrika from "@/components/analytics/YandexMetrika";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import FacebookPixelTracker from "@/components/analytics/FacebookPixelTracker";
import UtmCapture from "@/components/analytics/UtmCapture";

const isTestPreview = Boolean(BASE_PATH);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: isTestPreview
      ? "Rentiers TEST — preview (not public)"
      : "Rentiers — Bis zu 20% Jahresrendite auf Bankeinlagen",
    template: "%s | Rentiers",
  },
  description:
    "Rentiers bündelt Bankeinlagen weltweit und liefert 12–20% Jahresrendite mit staatlichen Einlagengarantien. Sicher, transparent, digital.",
  openGraph: {
    title: OG_TITLE_EN,
    description: OG_DESCRIPTION_EN,
    url: `${SITE_URL}${BASE_PATH || ''}/`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT_EN }],
  },
  alternates: {
    canonical: `${SITE_URL}${BASE_PATH || ''}/`,
    languages: {
      de: `${SITE_URL}${BASE_PATH || ''}/`,
      en: `${SITE_URL}${BASE_PATH || ''}/`,
      "x-default": `${SITE_URL}${BASE_PATH || ''}/`,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE_EN,
    description: OG_DESCRIPTION_EN,
    images: [OG_IMAGE],
  },
  robots: isTestPreview
    ? { index: false, follow: false, nocache: true }
    : { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: assetPath('/favicon.svg'), type: 'image/svg+xml' },
      { url: assetPath('/favicon-32.png'), sizes: '32x32', type: 'image/png' },
      { url: assetPath('/favicon-48.png'), sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: assetPath('/apple-touch-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <YandexMetrika />
        <FacebookPixel />
        <Suspense fallback={null}>
          <FacebookPixelTracker />
          <UtmCapture />
        </Suspense>
        <LanguageProvider>
          <LeadFormProvider>
            <HtmlLang />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </LeadFormProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
