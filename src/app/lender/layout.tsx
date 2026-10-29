"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Logo } from "@/components/ui/logo";
import { FloatingBottomNav } from "@/components/ui/floating-bottom-nav";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, FileText, BarChart3, 
  Settings, Menu, Bell, Building2, X, ArrowLeftRight,
  LogOut, ShieldCheck, Share2, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenderDemo } from "@/lib/context/LenderContext";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function LenderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useLenderDemo();
  const partner = useMemo(() => {
    return data.lender_accounts[0] || {
      id: 'LND-001',
      name: 'Bank Nusantara Demo',
      short_name: 'BND',
      role: 'lender'
    };
  }, [data.lender_accounts]);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  
  const { session, isLoading, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!session?.authenticated) {
        router.replace('/login');
      } else if (session.role === 'umkm') {
        router.replace('/dashboard');
      }
    }
  }, [session, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleSwitchToUMKM = () => {
    login({
      id: 'USR-001',
      name: 'Budi Santoso',
      email: 'demo@sigap.test',
      role: 'umkm',
      authenticated: true,
    });
    router.push('/dashboard');
  };

  const navItems = [
    { href: "/lender/dashboard", icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard" },
    { href: "/lender/applications", icon: <FileText className="w-5 h-5" />, label: "Pipeline Pengajuan" },
    { href: "/lender/applicants", icon: <Users className="w-5 h-5" />, label: "Database UMKM" },
    { href: "/lender/products", icon: <Building2 className="w-5 h-5" />, label: "Katalog Produk" },
    { href: "/lender/reports", icon: <BarChart3 className="w-5 h-5" />, label: "Laporan Kinerja" },
    { href: "/lender/referrals", icon: <Share2 className="w-5 h-5" />, label: "Program Referral" },
    { href: "/lender/settings", icon: <Settings className="w-5 h-5" />, label: "Pengaturan & API" },
  ];

  if (isLoading || session?.role !== 'lender') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-sigap-yellow border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-slate-300 font-display">Memuat Partner Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Mobile & Tablet Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.aside 
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-72 h-full bg-sigap-darkest text-white flex flex-col border-r border-white/10 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 px-2">
                <Logo variant="white" />
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="my-4 px-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sigap-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {partner.short_name || 'BND'}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-display font-bold text-white truncate">{partner.name}</h4>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Mitra Terverifikasi
                    </span>
                  </div>
                </div>
              </div>

              <nav className="flex-1 space-y-1.5 overflow-y-auto px-1 py-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-sigap-primary text-white shadow-lg shadow-sigap-primary/25 font-semibold"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10 space-y-2 px-1">
                <button
                  onClick={handleSwitchToUMKM}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold bg-white/10 text-white hover:bg-white/15 transition-all border border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-sigap-yellow" />
                    Ke Portal UMKM
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Keluar dari Sistem
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 lg:w-72 bg-sigap-darkest text-white border-r border-white/10 shadow-2xl z-20 shrink-0">
        {/* Brand */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Logo variant="white" />
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Lender
          </span>
        </div>

        {/* Institution Profile Chip */}
        <div className="p-4 mx-4 my-4 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sigap-primary to-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md border border-white/20">
              {partner.short_name || 'BND'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-display font-bold text-white truncate">{partner.name}</h4>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Mitra OJK Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-sigap-primary text-white shadow-lg shadow-sigap-primary/30 font-semibold"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activePill"
                    className="absolute right-3 w-1.5 h-5 rounded-full bg-sigap-yellow" 
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2.5">
          <button
            onClick={handleSwitchToUMKM}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30 transition-all shadow-sm"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
              Beralih ke Portal UMKM
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Keluar dari Sistem
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-slate-700 hover:bg-slate-100 rounded-2xl shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sigap-primary font-display truncate">
                  Partner Workspace
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Demo Engine
                </span>
              </div>
              <h1 className="text-sm sm:text-lg md:text-xl font-display font-extrabold text-sigap-darkest capitalize truncate">
                {pathname === '/lender/dashboard' ? 'Overview & Kinerja Portofolio' :
                 pathname === '/lender/applications' ? 'Pipeline & Verifikasi Pengajuan' :
                 pathname === '/lender/applicants' ? 'Database & Direktori UMKM' :
                 pathname === '/lender/products' ? 'Manajemen Katalog Produk Pembiayaan' :
                 pathname === '/lender/reports' ? 'Laporan Analitik & Monitoring NPL' :
                 pathname === '/lender/referrals' ? 'Program Afiliasi Lembaga' :
                 pathname === '/lender/settings' ? 'Pengaturan Core Banking & Webhook' :
                 'Partner Workspace'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Switcher Button */}
            <Button
              onClick={handleSwitchToUMKM}
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-2 rounded-2xl border-slate-200 hover:border-sigap-primary text-slate-700 hover:text-sigap-primary font-bold text-xs shadow-sm bg-slate-50/50"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-sigap-primary" />
              <span>Lihat Sebagai UMKM</span>
            </Button>

            {/* Notification Button */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowNotificationToast(!showNotificationToast)}
                className="relative rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-100 shadow-sm"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"></span>
              </Button>

              <AnimatePresence>
                {showNotificationToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-xl border border-slate-200 p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-display font-bold text-xs text-sigap-darkest">Notifikasi Mitra</span>
                      <span className="text-[10px] font-semibold text-sigap-primary">2 Baru</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-2xl bg-blue-50/80 border border-blue-100">
                        <p className="font-bold text-blue-900">Pengajuan Baru: Kedai Kopi Senja</p>
                        <p className="text-blue-700 text-[11px] mt-0.5">Plafon Rp 25.000.000 dengan Skor SIGAP 782 (Grade A).</p>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                        <p className="font-bold text-emerald-900">Pembayaran Cicilan Lancar</p>
                        <p className="text-emerald-700 text-[11px] mt-0.5">14 debitur binaan tercatat membayar tepat waktu minggu ini.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Partner Header Badge & Quick Logout */}
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-2xl bg-sigap-darkest text-white flex items-center justify-center font-extrabold text-xs">
                {partner.short_name || 'BND'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-sigap-darkest truncate max-w-[140px]">{partner.name}</p>
                <p className="text-[10px] text-slate-500">Partner Institutional</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Keluar dari Sistem"
                className="ml-1 h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/70 pb-28 lg:pb-8">
          {children}
        </main>

        {/* Floating Curved Notch Bottom Nav (Simetris 2 Kiri, Dashboard Tengah, 2 Kanan) */}
        <FloatingBottomNav
          ariaLabel="Navigasi Bawah Portal Lender"
          leftItems={[
            {
              id: 'applications',
              label: 'Pengajuan',
              href: '/lender/applications',
              active: pathname.startsWith('/lender/applications') && !isMobileMenuOpen,
              icon: FileText,
            },
            {
              id: 'applicants',
              label: 'Database',
              href: '/lender/applicants',
              active: pathname.startsWith('/lender/applicants') && !isMobileMenuOpen,
              icon: Users,
            },
          ]}
          centerItem={{
            id: 'dashboard',
            label: 'Dashboard',
            href: '/lender/dashboard',
            active: pathname === '/lender/dashboard' && !isMobileMenuOpen,
            icon: LayoutDashboard,
          }}
          rightItems={[
            {
              id: 'products',
              label: 'Katalog',
              href: '/lender/products',
              active: pathname.startsWith('/lender/products') && !isMobileMenuOpen,
              icon: Building2,
            },
            {
              id: 'menu',
              label: 'Lainnya',
              onClick: () => setIsMobileMenuOpen((v) => !v),
              active:
                isMobileMenuOpen ||
                !['/lender/dashboard', '/lender/applications', '/lender/applicants', '/lender/products'].some((p) =>
                  pathname.startsWith(p)
                ),
              icon: Menu,
            },
          ]}
        />
      </div>
    </div>
  );
}
