import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

const linkGroups = [
  {
    title: 'Produk',
    links: [
      { href: '/fitur', label: 'Fitur' },
      { href: '/cara-kerja', label: 'Cara Kerja' },
      { href: '/pembiayaan', label: 'Pembiayaan' },
      { href: '/literasi', label: 'Literasi' },
      { href: '/premium', label: 'Premium' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privasi', label: 'Privasi' },
      { href: '/keamanan', label: 'Keamanan' },
      { href: '/syarat-ketentuan', label: 'Syarat Ketentuan' },
    ],
  },
  {
    title: 'Akses',
    links: [
      { href: '/login', label: 'Sign In' },
      { href: '/register', label: 'Sign Up' },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="mt-auto overflow-hidden bg-sigap-darkest text-sigap-light/70">
      <div className="container grid gap-12 pt-16 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo variant="white" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Sistem Integrasi Gerbang Akses Pembiayaan UMKM. Membangun resiliensi finansial untuk ekonomi Indonesia.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-5 font-semibold text-white">{group.title}</p>
              <ul className="space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="container mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 pb-12 text-sm sm:flex-row">
        <span>&copy; {new Date().getFullYear()} SIGAP UMKM. Hak Cipta Dilindungi.</span>
        <span>Demo hanya-baca tersedia</span>
      </div>
    </footer>
  );
}
