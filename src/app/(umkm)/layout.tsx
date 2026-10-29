"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/lib/context/AuthContext";
import { useDemo } from "@/lib/context/DemoContext";
import { useSubscription } from "@/lib/context/SubscriptionContext";
import {
Activity,ArrowLeftRight,
BarChart3,
Bell,
BookOpen,
Building2,
CheckCircle2,
ChevronRight,
CreditCard,
FileText,
HelpCircle,
LogOut,
Menu,
PieChart,
Settings,
ShieldCheck,
Sparkles,
User,
Wallet,
X
} from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";
import React,{ useEffect,useState } from 'react';

export default function UMKMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useDemo();
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankConnectionStatus, setBankConnectionStatus] = useState<'Belum Terhubung' | 'Menghubungkan' | 'Terhubung'>('Belum Terhubung');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, isLoading, logout, login } = useAuth();
  const { subscription } = useSubscription();
  const router = useRouter();

  const handleSwitchToLender = () => {
    login({
      id: 'LND-001',
      name: 'Bank Nusantara Demo',
      email: 'lender@sigap.test',
      role: 'lender',
      authenticated: true,
    });
    router.push('/lender/dashboard');
  };

  useEffect(() => {
    if (!isLoading) {
      if (!session?.authenticated) {
        router.replace('/login');
      } else if (session.role === 'lender') {
        router.replace('/lender/dashboard');
      }
    }
  }, [session, isLoading, router]);

  if (isLoading || session?.role !== 'umkm') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sigap-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-500 font-display">Memuat Portal SIGAP UMKM...</span>
        </div>
      </div>
    );
  }
  
  const business = data.businesses[0] || {
    id: 'UMKM-001',
    name: 'Kedai Kopi Senja',
    business_type: 'F&B',
    established_date: '2021',
  };
  const unreadCount = data.notifications.filter(n => !n.read).length;

  const handleConnectBank = () => {
    setBankConnectionStatus('Menghubungkan');
    setTimeout(() => {
      setBankConnectionStatus('Terhubung');
      setTimeout(() => setIsBankModalOpen(false), 1500);
    }, 2000);
  };

  const navItems = [
    { href: "/dashboard", icon: BarChart3, label: "Overview" },
    { href: "/bookkeeping", icon: Wallet, label: "Pembukuan" },
    { href: "/credit-score", icon: Activity, label: "Skor Kredit" },
    { href: "/financing", icon: ArrowLeftRight, label: "Pembiayaan" },
    { href: "/learning", icon: BookOpen, label: "Literasi Finansial" },
    { href: "/legal-protection", icon: ShieldCheck, label: "Legalitas & Proteksi" },
    { href: "/resilience", icon: PieChart, label: "Ketahanan Usaha", isPremium: true },
  ];

  const subNavItems = [
    { href: "/documents", icon: FileText, label: "Dokumen Usaha" },
    { href: "/profile", icon: User, label: "Profil Usaha" },
    { href: "/notifications", icon: Bell, label: "Notifikasi", badge: unreadCount > 0 ? unreadCount : undefined },
    { href: "/support", icon: HelpCircle, label: "Pusat Bantuan" },
  ];

  const pageTitle = () => {
    const segment = pathname.split('/')[1] || '';
    switch(segment) {
      case 'dashboard': return 'Ringkasan Usaha';
      case 'bookkeeping': return 'Pembukuan Digital';
      case 'credit-score': return 'Skor Kredit Alternatif';
      case 'financing': return 'Marketplace Pembiayaan';
      case 'learning': return 'Literasi Finansial';
      case 'legal-protection': return 'Legalitas & Proteksi';
      case 'resilience': return 'Ketahanan Usaha (Runway)';
      case 'documents': return 'Dokumen Usaha';
      case 'profile': return 'Profil Usaha';
      case 'notifications': return 'Pusat Notifikasi';
      case 'support': return 'Pusat Bantuan';
      case 'settings': return 'Pengaturan';
      default: return 'Portal UMKM';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/60 font-sans text-foreground">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-sigap-darkest/60 backdrop-blur-sm md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-slate-200/80 bg-white shadow-xl md:shadow-none transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand header */}
        <div className="flex h-18 items-center justify-between border-b border-slate-100 px-6 py-4">
          <Logo />
          <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:text-sigap-darkest" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? "bg-sigap-darkest text-white shadow-md shadow-sigap-darkest/10" 
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-sigap-darkest"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isActive 
                          ? "bg-white/15 text-sigap-light" 
                          : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-sigap-primary"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.isPremium && (
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isActive 
                            ? "bg-sigap-yellow text-sigap-darkest" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          PRO
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Operasional &amp; Profil
            </div>
            <nav className="space-y-1">
              {subNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? "bg-sigap-darkest text-white shadow-md shadow-sigap-darkest/10" 
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-sigap-darkest"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        isActive 
                          ? "bg-white/15 text-sigap-light" 
                          : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-sigap-primary"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold px-1.5 shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        
        {/* Footer info & Profile card */}
        <div className="border-t border-slate-100 p-4 space-y-3 bg-slate-50/50">
          <Link 
            href="/settings"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              pathname === '/settings' 
                ? 'bg-sigap-darkest text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-sigap-darkest'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Pengaturan</span>
          </Link>

          {/* Business identity badge */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sigap-darkest font-display text-base font-extrabold text-white">
                  {business?.name?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-bold text-sigap-darkest">{business?.name || 'UMKM Indonesia'}</p>
                  <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Terverifikasi
                  </p>
                </div>
              </div>

              <Link href="/profile" className="text-slate-400 hover:text-sigap-darkest p-1">
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Subscription Mini Pill */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500">Paket:</span>
              <Link href="/premium" className="font-display font-bold text-[11px] text-sigap-primary hover:underline">
                {subscription.plan === 'premium' ? (
                  <span className="text-amber-600 flex items-center gap-1 font-extrabold">
                    <Sparkles className="h-3 w-3" /> SIGAP PRO
                  </span>
                ) : (
                  <span className="text-slate-600">Gratis (Upgrade →)</span>
                )}
              </Link>
            </div>
          </div>

          <button 
            onClick={handleSwitchToLender}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-sigap-primary bg-blue-50/80 hover:bg-blue-100/80 transition-colors border border-blue-200/60 mb-2"
          >
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              Ke Portal Lender
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
          </button>

          <button 
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Keluar dari Sesi
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 sm:h-18 items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-3 sm:px-6 md:px-8">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Button variant="ghost" size="icon" className="md:hidden text-slate-600 shrink-0 h-9 w-9" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Link href="/" className="hover:text-sigap-darkest transition-colors">SIGAP</Link>
                <span>/</span>
                <span className="text-slate-600">UMKM Portal</span>
              </div>
              <h1 className="font-display text-base sm:text-lg md:text-xl font-extrabold text-sigap-darkest truncate max-w-[180px] sm:max-w-xs md:max-w-none">
                {pageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Subscription Plan Badge */}
            <Link href="/premium" className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all hover:scale-105 border shadow-xs bg-slate-50 border-slate-200 text-slate-700">
              {subscription.plan === 'premium' ? (
                <>
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  <span className="text-amber-700">PREMIUM</span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>FREE TIER</span>
                </>
              )}
            </Link>

            {/* Bank status pill */}
            {bankConnectionStatus === 'Terhubung' ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-3 py-1 text-xs font-bold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Bank Terhubung
              </span>
            ) : (
              <Button 
                onClick={() => setIsBankModalOpen(true)} 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex rounded-full border-slate-200 text-sigap-darkest hover:border-sigap-primary hover:bg-sigap-light/20 text-xs font-semibold gap-1.5"
              >
                <CreditCard className="h-3.5 w-3.5 text-sigap-primary" />
                Hubungkan Bank
              </Button>
            )}

            {/* Switch to Lender Portal */}
            <Button
              onClick={handleSwitchToLender}
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-1.5 rounded-full border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 text-sigap-primary text-xs font-bold"
            >
              <Building2 className="h-3.5 w-3.5" />
              Portal Lender
            </Button>

            {/* Notifications Button */}
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative rounded-full text-slate-600 hover:bg-slate-100 hover:text-sigap-darkest">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </header>

        {/* Scrollable Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (md:hidden) */}
        <nav
          aria-label="Navigasi Bawah Portal UMKM"
          className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] pb-safe"
        >
          <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
            <Link
              href="/dashboard"
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
                pathname === '/dashboard' ? 'text-sigap-primary font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <BarChart3 className={`w-5 h-5 ${pathname === '/dashboard' ? 'scale-110 text-sigap-primary' : ''}`} />
                {pathname === '/dashboard' && <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">Overview</span>
            </Link>

            <Link
              href="/bookkeeping"
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
                pathname.startsWith('/bookkeeping') ? 'text-sigap-primary font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Wallet className={`w-5 h-5 ${pathname.startsWith('/bookkeeping') ? 'scale-110 text-sigap-primary' : ''}`} />
                {pathname.startsWith('/bookkeeping') && <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">Pembukuan</span>
            </Link>

            <Link
              href="/credit-score"
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
                pathname.startsWith('/credit-score') ? 'text-sigap-primary font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Activity className={`w-5 h-5 ${pathname.startsWith('/credit-score') ? 'scale-110 text-sigap-primary' : ''}`} />
                {pathname.startsWith('/credit-score') && <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">Skor Kredit</span>
            </Link>

            <Link
              href="/financing"
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 ${
                pathname.startsWith('/financing') ? 'text-sigap-primary font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <ArrowLeftRight className={`w-5 h-5 ${pathname.startsWith('/financing') ? 'scale-110 text-sigap-primary' : ''}`} />
                {pathname.startsWith('/financing') && <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">Pembiayaan</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
                isMobileMenuOpen || (!['/dashboard', '/bookkeeping', '/credit-score', '/financing'].some(p => pathname.startsWith(p)))
                  ? 'text-sigap-primary font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Menu className={`w-5 h-5 ${isMobileMenuOpen ? 'scale-110 text-sigap-primary' : ''}`} />
                {isMobileMenuOpen && <span className="absolute -bottom-1.5 w-1.5 h-1.5 bg-sigap-primary rounded-full" />}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">Menu</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Bank Connection Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-sigap-darkest/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-sigap-primary" />
                <h3 className="font-display font-bold text-base text-sigap-darkest">Integrasi Rekening Bank</h3>
              </div>
              <button onClick={() => setIsBankModalOpen(false)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-sigap-darkest transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {bankConnectionStatus === 'Belum Terhubung' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Pilih bank mitra simulasi untuk mengimpor mutasi dan riwayat kas usaha ke sistem pembukuan SIGAP secara otomatis.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Bank Mandiri (Demo)', code: 'BMRI', desc: 'Giro Usaha & QRIS Mandiri' },
                      { name: 'Bank Central Asia (Demo)', code: 'BCA', desc: 'BCA Bisnis & Merchant' },
                      { name: 'Bank Rakyat Indonesia (Demo)', code: 'BRI', desc: 'BRI Simpedes Usaha' }
                    ].map(bank => (
                      <button 
                        key={bank.code} 
                        onClick={handleConnectBank} 
                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200/80 p-4 text-left hover:border-sigap-primary hover:bg-sigap-light/10 hover:shadow-sm transition-all"
                      >
                        <div>
                          <p className="font-display font-bold text-sm text-sigap-darkest group-hover:text-sigap-primary transition-colors">{bank.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{bank.desc}</p>
                        </div>
                        <ArrowLeftRight className="h-4 w-4 text-slate-400 group-hover:text-sigap-primary transition-transform group-hover:scale-110" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bankConnectionStatus === 'Menghubungkan' && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="h-12 w-12 rounded-full border-4 border-sigap-primary border-t-transparent animate-spin mb-4" />
                  <h4 className="font-display font-bold text-base text-sigap-darkest mb-1">Membangun Koneksi Enkripsi...</h4>
                  <p className="text-xs text-slate-500 max-w-xs">Mengotentikasi izin sandbox Open Banking API (Simulasi Terproteksi).</p>
                </div>
              )}

              {bankConnectionStatus === 'Terhubung' && (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 shadow-sm">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-sigap-darkest mb-1">Rekening Berhasil Terhubung</h4>
                  <p className="text-xs text-slate-500 max-w-xs">Sinkronisasi mutasi kas harian kini aktif untuk memperkuat skor kredit usaha Anda.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

