"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/tentang', label: 'Tentang' },
  { href: '/fitur', label: 'Layanan', hasDropdown: true },
  { href: '/cara-kerja', label: 'Cara Kerja' },
  { href: '/pembiayaan', label: 'Pembiayaan' },
  { href: '/literasi', label: 'Literasi' },
];

export function PublicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b-2 border-slate-600'
          : 'bg-white border-b-2 border-slate-200'
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex h-18 sm:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Logo className="transition-opacity hover:opacity-85" />

          {/* Desktop Nav (Execora Centered Style) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-700"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2 transition-colors hover:text-slate-950 hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sigap-primary"
              >
                <span>{link.label}</span>
                {link.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions (Execora Pill Button + Round Phone Icon) */}
          <div className="flex items-center gap-2.5">
            {/* Contact Us / Daftar Pill Button */}
            <Link href="/register">
              <button className="rounded-full border border-slate-300 hover:border-slate-400 bg-white px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-xs">
                Hubungi Kami
              </button>
            </Link>

            {/* Circular Phone Button */}
            <a
              href="tel:08001234567"
              aria-label="Hubungi Layanan SIGAP"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-xs"
              title="Konsultasi via Telepon"
            >
              <Phone className="h-4 w-4" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-1 md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-18 z-40 md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200/80 shadow-xl"
          >
            <nav className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  Masuk Akun
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm"
                >
                  Mulai Konsultasi Gratis
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
