import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/fitur" className="hover:text-sigap-primary transition-colors">Fitur</Link>
          <Link href="/cara-kerja" className="hover:text-sigap-primary transition-colors">Cara Kerja</Link>
          <Link href="/pembiayaan" className="hover:text-sigap-primary transition-colors">Pembiayaan</Link>
          <Link href="/literasi" className="hover:text-sigap-primary transition-colors">Literasi</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-sigap-darkest hidden sm:flex">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="navy" className="shadow-sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
