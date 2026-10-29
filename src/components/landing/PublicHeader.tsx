"use client";

import { Logo } from '@/components/ui/logo';
import {
  CheckCircle2,
  ChevronDown,
  Copy,
  Headphones,
  Menu,
  MessageSquare,
  Phone,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/fitur', label: 'Layanan', hasDropdown: true },
  { href: '/cara-kerja', label: 'Cara Kerja' },
  { href: '/pembiayaan', label: 'Pembiayaan' },
  { href: '/literasi', label: 'Literasi' },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const csPhoneRaw = "082165372288";
  const csPhoneDisplay = "0821-6537-2288";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Automatically close mobile menu if viewport resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(csPhoneRaw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-6">
          {/* Logo with responsive height */}
          <div className="shrink-0">
            <Logo className="transition-opacity hover:opacity-85" height={36} />
          </div>

          {/* Desktop Nav (Visible on lg >= 1024px, tablet & mobile switch cleanly to drawer) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-700"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 rounded-full px-3 xl:px-4 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sigap-primary ${
                    active
                      ? 'bg-sigap-light/30 text-sigap-primary font-bold shadow-2xs'
                      : 'hover:text-slate-950 hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions (Hubungi Kami Pill Button + Round Phone Icon + Hamburger) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Hubungi Kami Button -> Opens Customer Service Modal */}
            <button
              onClick={() => setContactModalOpen(true)}
              className="rounded-full border border-slate-300 hover:border-slate-400 bg-white px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-xs cursor-pointer whitespace-nowrap active:scale-95"
            >
              Hubungi Kami
            </button>

            {/* Circular Phone Button -> Opens Customer Service Modal */}
            <button
              onClick={() => setContactModalOpen(true)}
              aria-label="Hubungi Customer Service SIGAP"
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-xs cursor-pointer shrink-0 active:scale-95"
              title="Customer Service: 082165372288"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>

            {/* Mobile Menu Toggle (Visible on < 1024px) */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition-colors hover:bg-slate-50 shrink-0 cursor-pointer active:scale-95"
              aria-label={mobileOpen ? "Tutup navigasi" : "Buka navigasi"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Customer Service Contact Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-5 sm:p-7 space-y-5 sm:space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-sigap-darkest">
                  Customer Service SIGAP
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Layanan bantuan dan konsultasi resmi bagi para pelaku UMKM Indonesia.
                </p>
              </div>

              {/* Number Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-center space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Nomor Layanan / WhatsApp
                </span>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-sigap-darkest tracking-tight">
                  {csPhoneDisplay}
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online Setiap Hari Kerja (08:00 - 18:00 WIB)
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/6282165372288?text=${encodeURIComponent('Halo Customer Service SIGAP UMKM, saya ingin konsultasi.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  Hubungi via WhatsApp
                </a>

                {/* Direct Call Button */}
                <a
                  href={`tel:${csPhoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 rounded-2xl bg-sigap-darkest hover:bg-sigap-darkest/90 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  Panggil Langsung
                </a>

                {/* Copy Number Button */}
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all cursor-pointer active:scale-98"
                >
                  {copied ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Nomor Berhasil Disalin!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Salin Nomor Telepon
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile & Tablet Drawer with Backdrop Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-16 sm:top-20 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
              aria-hidden="true"
            />

            {/* Slide Down Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 sm:top-20 z-40 lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-2xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <nav className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-between ${
                        active
                          ? 'bg-sigap-light/35 text-sigap-primary border-l-4 border-sigap-primary'
                          : 'text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
                    </Link>
                  );
                })}

                <div className="mt-3 flex flex-col gap-2.5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setContactModalOpen(true);
                    }}
                    className="w-full text-center py-3 rounded-2xl border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Hubungi CS: {csPhoneDisplay}
                  </button>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      Masuk Akun
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl bg-sigap-darkest text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-colors"
                    >
                      Daftar Demo
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
