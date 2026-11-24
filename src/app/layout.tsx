import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { PageTransitionProvider } from "@/providers/PageTransition";
import { en } from "@/content/en";
import { site } from "@/content/site";
import "./globals.css";

// Same pairing as the Sunroom reference: Bricolage Grotesque for headings, Inter for text.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.website),
  title: en.meta.title,
  description: en.meta.description,
  keywords: [
    "Data Scientist",
    "Data Engineer",
    "Machine Learning Engineer",
    "Computer Vision",
    "NLP",
    "Morocco",
    "Adnane Amrouss",
  ],
  authors: [{ name: site.name, url: site.website }],
  openGraph: {
    type: "website",
    url: site.website,
    title: en.meta.title,
    description: en.meta.description,
    siteName: site.name,
    locale: "en_US",
    alternateLocale: ["fr_FR"],
    images: [{ url: site.photo, width: 2048, height: 2048, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <LanguageProvider>
          <SmoothScroll>
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
