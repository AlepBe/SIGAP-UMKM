import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export function PublicFooter() {
  return (
    <footer className="bg-sigap-darkest text-sigap-light/70 py-16 border-t border-white/10 mt-auto">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Logo variant="white" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed mb-6">
            Sistem Integrasi Gerbang Akses Pembiayaan UMKM. Membangun resiliensi finansial untuk ekonomi Indonesia.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-5 tracking-wide">Produk</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/fitur" className="hover:text-white transition-colors">Fitur</Link></li>
            <li><Link href="/cara-kerja" className="hover:text-white transition-colors">Cara Kerja</Link></li>
            <li><Link href="/pembiayaan" className="hover:text-white transition-colors">Pembiayaan</Link></li>
            <li><Link href="/literasi" className="hover:text-white transition-colors">Literasi</Link></li>
            <li><Link href="/premium" className="hover:text-white transition-colors text-amber-500 font-medium">Premium</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-5 tracking-wide">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/privasi" className="hover:text-white transition-colors">Privasi</Link></li>
            <li><Link href="/keamanan" className="hover:text-white transition-colors">Keamanan</Link></li>
            <li><Link href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat Ketentuan</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-5 tracking-wide">Akses</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/login" className="hover:text-white transition-colors font-medium">Sign In</Link></li>
            <li><Link href="/register" className="hover:text-white transition-colors font-medium">Sign Up</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-16 pt-8 border-t border-white/10 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <span>&copy; {new Date().getFullYear()} SIGAP UMKM. Hak Cipta Dilindungi.</span>
        <span className="text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">Read-Only Demo Available</span>
      </div>
    </footer>
  );
}
