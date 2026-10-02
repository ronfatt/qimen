import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: `${brandConfig.name} - ${brandConfig.tagline}`,
  description: brandConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#FAF9F5] text-ink-900 flex flex-col antialiased selection:bg-champagne-200 selection:text-moss-900">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
