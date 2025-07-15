import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/ui/cookie-consent";
import { Analytics } from "@vercel/analytics/next";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Socukai.my ",
  description: "An info app Malaysian tax compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <title>Socukai.my </title>
        <meta name="description" content="An info app Malaysian tax compliance." />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://socukai.ama24.my/changelog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Socukai.my " />
        <meta property="og:description" content="An info app Malaysian tax compliance." />
        <meta property="og:image" content="https://socukai.ama24.my/META-OPENGRAPH.jpg" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="socukai.ama24.my" />
        <meta property="twitter:url" content="https://socukai.ama24.my/changelog" />
        <meta name="twitter:title" content="Socukai.my " />
        <meta name="twitter:description" content="An info app Malaysian tax compliance." />
        <meta name="twitter:image" content="https://socukai.ama24.my/META-OPENGRAPH.jpg" />
      </Head>
      <body className={inter.className + " min-h-screen flex flex-col overflow-x-hidden"}>
        {children}
        <Analytics />
        <CookieConsent variant="default" />
        <Toaster />
      </body>
    </html>
  );
} 