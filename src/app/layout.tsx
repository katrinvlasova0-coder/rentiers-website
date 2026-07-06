import type { Metadata } from 'next';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlLang from "@/components/layout/HtmlLang";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import { assetPath } from "@/lib/basePath";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rentiers Pro — Bis zu 20% Jahresrendite auf Bankeinlagen",
    template: "%s | Rentiers Pro",
  },
  description:
    "Rentiers bündelt Bankeinlagen weltweit und liefert 12–20% Jahresrendite mit staatlichen Einlagengarantien. Sicher, transparent, digital.",
  openGraph: {
    title: "Rentiers Pro — Bis zu 20% Jahresrendite",
    description:
      "Globale Bankeinlagen mit staatlicher Garantie. 12–20% p.a. Einfach anlegen, Zinsen empfangen.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      de: SITE_URL,
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentiers Pro — Bis zu 20% Jahresrendite",
    description:
      "Globale Bankeinlagen mit staatlicher Garantie. 12–20% p.a.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: assetPath('/favicon.svg'), type: 'image/svg+xml' }],
    shortcut: assetPath('/favicon.svg'),
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
