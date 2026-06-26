import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HtmlLang from "@/components/layout/HtmlLang";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LeadFormProvider } from "@/contexts/LeadFormContext";
import { assetPath } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Rentiers Pro — Bis zu 20% Jahresrendite auf Bankeinlagen",
  description:
    "Rentiers bündelt Bankeinlagen weltweit und liefert 12–20% Jahresrendite mit staatlichen Einlagengarantien. Sicher, transparent, digital.",
  keywords:
    "Festgeld, hohe Zinsen, passive Einkommen, Einlagenarbitrage, Bankeinlagen, high yield savings",
  openGraph: {
    title: "Rentiers Pro — Bis zu 20% Jahresrendite",
    description:
      "Globale Bankeinlagen mit staatlicher Garantie. 12–20% p.a. Einfach anlegen, Zinsen empfangen.",
    url: "https://rentierspro.com",
    siteName: "Rentiers Pro",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://rentierspro.com",
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
