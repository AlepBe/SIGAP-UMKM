"use client";

import { Logo } from '@/components/ui/logo';
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Compass,
  Copy,
  Grid,
  Headphones,
  Home,
  Info,
  Layers,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const desktopNavLinks = [
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
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [menuSheetOpen, setMenuSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const csPhoneRaw = "082165372288";
  const csPhoneDisplay = "0821-6537-2288";

  // Handle scroll effect for topbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when bottom sheet or modal is open
  useEffect(() => {
    if (menuSheetOpen || contactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuSheetOpen, contactModalOpen]);

  // Automatically close bottom sheet if resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuSheetOpen(false);
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
      {/* =========================================================================
          1. TOP HEADER (Desktop: Full Nav, Mobile & Tablet: Clean Brand & CS Action)
          ========================================================================= */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-xs border-b border-slate-200/90'
            : 'bg-white border-b border-slate-200/80'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex h-15 sm:h-18 lg:h-20 items-center justify-between gap-3 sm:gap-6">
          {/* Logo with responsive sizing */}
          <div className="shrink-0 flex items-center">
            <Logo className="transition-opacity hover:opacity-85" height={34} />
          </div>

          {/* Desktop Nav (Visible only on lg >= 1024px) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-700"
          >
            {desktopNavLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1 rounded-full px-3.5 xl:px-4 py-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sigap-primary ${
                    active
                      ? 'bg-sigap-light/35 text-sigap-primary font-bold shadow-2xs'
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

          {/* Right Actions: Hubungi Kami + Phone CS Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Hubungi Kami Pill Button */}
            <button
              onClick={() => setContactModalOpen(true)}
              className="rounded-full border border-slate-300 hover:border-slate-400 bg-white px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 shadow-xs cursor-pointer whitespace-nowrap active:scale-95 flex items-center gap-1.5"
            >
              <Headphones className="w-3.5 h-3.5 text-sigap-primary hidden sm:inline-block" />
              <span>Hubungi Kami</span>
            </button>

            {/* Circular Phone Icon Button */}
            <button
              onClick={() => setContactModalOpen(true)}
              aria-label="Hubungi Customer Service SIGAP"
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-xs cursor-pointer shrink-0 active:scale-95"
              title="Customer Service: 082165372288"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. MOBILE & TABLET BOTTOM NAVIGATION BAR (Visible on < 1024px)
          ========================================================================= */}
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(15,23,42,0.08)] pb-safe transition-all"
      >
        <div className="max-w-lg mx-auto grid grid-cols-5 h-16 sm:h-17 px-1 items-center">
          {/* Tab 1: Beranda */}
          <Link
            href="/"
            onClick={() => setMenuSheetOpen(false)}
            className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
              pathname === '/' && !menuSheetOpen
                ? 'text-sigap-primary font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Home className={`w-5 h-5 transition-transform ${pathname === '/' && !menuSheetOpen ? 'scale-110 text-sigap-primary' : ''}`} />
              {pathname === '/' && !menuSheetOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">Beranda</span>
          </Link>

          {/* Tab 2: Layanan */}
          <Link
            href="/fitur"
            onClick={() => setMenuSheetOpen(false)}
            className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
              pathname.startsWith('/fitur') && !menuSheetOpen
                ? 'text-sigap-primary font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Layers className={`w-5 h-5 transition-transform ${pathname.startsWith('/fitur') && !menuSheetOpen ? 'scale-110 text-sigap-primary' : ''}`} />
              {pathname.startsWith('/fitur') && !menuSheetOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">Layanan</span>
          </Link>

          {/* Tab 3: Cara Kerja */}
          <Link
            href="/cara-kerja"
            onClick={() => setMenuSheetOpen(false)}
            className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
              pathname.startsWith('/cara-kerja') && !menuSheetOpen
                ? 'text-sigap-primary font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Compass className={`w-5 h-5 transition-transform ${pathname.startsWith('/cara-kerja') && !menuSheetOpen ? 'scale-110 text-sigap-primary' : ''}`} />
              {pathname.startsWith('/cara-kerja') && !menuSheetOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">Cara Kerja</span>
          </Link>

          {/* Tab 4: Pembiayaan */}
          <Link
            href="/pembiayaan"
            onClick={() => setMenuSheetOpen(false)}
            className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
              pathname.startsWith('/pembiayaan') && !menuSheetOpen
                ? 'text-sigap-primary font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <WalletCards className={`w-5 h-5 transition-transform ${pathname.startsWith('/pembiayaan') && !menuSheetOpen ? 'scale-110 text-sigap-primary' : ''}`} />
              {pathname.startsWith('/pembiayaan') && !menuSheetOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">Pembiayaan</span>
          </Link>

          {/* Tab 5: Menu / Lainnya (Bottom Sheet Trigger) */}
          <button
            onClick={() => setMenuSheetOpen((v) => !v)}
            aria-label="Buka menu lainnya"
            aria-expanded={menuSheetOpen}
            className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
              menuSheetOpen || pathname === '/tentang' || pathname === '/literasi' || pathname === '/mitra' || pathname === '/kontak'
                ? 'text-sigap-primary font-bold'
                : 'text-slate-500 hover:text-slate-800 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Grid className={`w-5 h-5 transition-transform ${menuSheetOpen ? 'scale-110 text-sigap-primary rotate-90' : ''}`} />
              {menuSheetOpen && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">Lainnya</span>
          </button>
        </div>
      </nav>

      {/* =========================================================================
          3. INTERACTIVE BOTTOM SHEET (Menu Lengkap & Aksi SIGAP pada Mobile/Tablet)
          ========================================================================= */}
      <AnimatePresence>
        {menuSheetOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuSheetOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden"
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-white rounded-t-[28px] sm:rounded-t-[36px] border-t border-slate-200/90 shadow-2xl p-5 sm:p-7 max-h-[88vh] overflow-y-auto"
            >
              {/* Drag/Swipe Indicator Handle */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sigap-light/40 text-sigap-primary flex items-center justify-center font-bold">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-sigap-darkest">
                      Menu Lengkap SIGAP
                    </h3>
                    <p className="text-xs text-slate-400">Jelajahi seluruh ekosistem dan layanan kami</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuSheetOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Tutup menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Menu Links */}
              <div className="grid grid-cols-2 gap-3 py-4">
                {[
                  {
                    href: '/tentang',
                    title: 'Tentang SIGAP',
                    desc: 'Visi & Misi Kami',
                    icon: Info,
                    color: 'text-blue-600 bg-blue-50 border-blue-100'
                  },
                  {
                    href: '/literasi',
                    title: 'Literasi Finansial',
                    desc: 'Modul & Panduan Kas',
                    icon: BookOpen,
                    color: 'text-amber-600 bg-amber-50 border-amber-100'
                  },
                  {
                    href: '/mitra',
                    title: 'Mitra Lembaga',
                    desc: 'Bank & Fintech OJK',
                    icon: Building2,
                    color: 'text-purple-600 bg-purple-50 border-purple-100'
                  },
                  {
                    href: '/kontak',
                    title: 'Pusat Kontak',
                    desc: 'Dukungan Resmi',
                    icon: Headphones,
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
                  },
                  {
                    href: '/keamanan',
                    title: 'Keamanan Data',
                    desc: 'Privasi & Regulasi',
                    icon: ShieldCheck,
                    color: 'text-sky-600 bg-sky-50 border-sky-100'
                  },
                  {
                    href: '/premium',
                    title: 'Paket Usaha',
                    desc: 'Akses Fitur Pro',
                    icon: Sparkles,
                    color: 'text-rose-600 bg-rose-50 border-rose-100'
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuSheetOpen(false)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                        active
                          ? 'border-sigap-primary bg-sigap-light/20 shadow-xs'
                          : 'border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className={`text-xs font-bold block truncate ${active ? 'text-sigap-primary' : 'text-sigap-darkest'}`}>
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Customer Service Support Banner */}
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Customer Service SIGAP
                    </span>
                    <span className="text-sm font-display font-extrabold text-slate-900 block">
                      {csPhoneDisplay}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMenuSheetOpen(false);
                    setContactModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all active:scale-95 whitespace-nowrap"
                >
                  Hubungi
                </button>
              </div>

              {/* Account Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMenuSheetOpen(false)}
                  className="w-full text-center py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Masuk Akun
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuSheetOpen(false)}
                  className="w-full text-center py-3 rounded-2xl bg-sigap-darkest text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-colors"
                >
                  Daftar Demo
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================================
          4. CUSTOMER SERVICE CONTACT MODAL (WhatsApp, Call, Copy Number)
          ========================================================================= */}
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
    </>
  );
}
