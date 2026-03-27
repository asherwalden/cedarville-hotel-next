import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { theme } from "@/lib/theme";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${theme.name} — ${theme.tagline}`,
    template: `%s | ${theme.name}`,
  },
  description: theme.description,
  keywords: [...theme.keywords],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: theme.url,
    siteName: theme.name,
    title: `${theme.name} — ${theme.tagline}`,
    description: theme.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${theme.name} — ${theme.tagline}`,
    description: theme.description,
  },
  other: {
    "geo.region": theme.geo.region,
    "geo.placename": theme.geo.placename,
    "geo.position": `${theme.geo.latitude};${theme.geo.longitude}`,
    ICBM: `${theme.geo.latitude}, ${theme.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
