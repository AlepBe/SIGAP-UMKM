import React from 'react';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/context/DemoContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { LenderProvider } from "@/lib/context/LenderContext";
import { SubscriptionProvider } from "@/lib/context/SubscriptionContext";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIGAP UMKM - Sistem Integrasi Gerbang Akses Pembiayaan UMKM",
  description: "Ubah Data Transaksi Menjadi Kekuatan Usaha. Ekosistem pembiayaan cerdas untuk UMKM Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${sans.variable} ${display.variable}`}>
      <body className="font-sans min-h-screen antialiased bg-background text-foreground">
        <AuthProvider>
          <LenderProvider>
            <DemoProvider>
              <SubscriptionProvider>
                {children}
              </SubscriptionProvider>
            </DemoProvider>
          </LenderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
