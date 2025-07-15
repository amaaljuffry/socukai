import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/ui/cookie-consent";
import { Analytics } from "@vercel/analytics/next";

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
      <body className={inter.className + " min-h-screen flex flex-col overflow-x-hidden"}>
        {children}
        <Analytics />
        <CookieConsent variant="default" />
        <Toaster />
      </body>
    </html>
  );
} 