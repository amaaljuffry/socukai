import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "../components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

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
      <body className={inter.className + " min-h-screen flex flex-col h-full overflow-x-hidden"}>
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
} 