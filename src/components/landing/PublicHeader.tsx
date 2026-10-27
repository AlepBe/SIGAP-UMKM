import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/fitur', label: 'Fitur' },
  { href: '/cara-kerja', label: 'Cara Kerja' },
  { href: '/pembiayaan', label: 'Pembiayaan' },
  { href: '/literasi', label: 'Literasi' },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md">
      <div className="container grid h-20 grid-cols-[auto_1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <Logo className="justify-self-start transition-opacity hover:opacity-80" />
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-1 rounded-full border border-sigap-dark/10 bg-white/80 p-1 text-sm font-medium text-sigap-dark md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-sigap-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sigap-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <Button asChild variant="ghost" className="hidden text-sigap-darkest sm:inline-flex">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="navy">
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
