import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <Logo className="mb-12 grayscale opacity-50" />
      <h1 className="text-7xl font-extrabold text-sigap-darkest mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 max-w-md mb-8">Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link href="/"><Button variant="navy" size="lg">Kembali ke Beranda</Button></Link>
    </div>
  );
}
