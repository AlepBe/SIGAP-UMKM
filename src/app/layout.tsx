import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/lib/context/DemoContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { LenderProvider } from "@/lib/context/LenderContext";
import { SubscriptionProvider } from "@/lib/context/SubscriptionContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground`}>
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
