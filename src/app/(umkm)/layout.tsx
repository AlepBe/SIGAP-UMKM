"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  BarChart3, Wallet, Activity, ArrowLeftRight, 
  BookOpen, ShieldCheck, PieChart, FileText, 
  User, Bell, HelpCircle, Settings, Menu, X, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useDemo } from "@/lib/context/DemoContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useSubscription } from "@/lib/context/SubscriptionContext";

export default function UMKMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data, updateData } = useDemo();
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [bankConnectionStatus, setBankConnectionStatus] = useState<'Belum Terhubung' | 'Menghubungkan' | 'Terhubung'>('Belum Terhubung');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, isLoading, logout } = useAuth();
  const { subscription } = useSubscription();
  const router = useRouter();

  React.useEffect(() => {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sigap-primary"></div>
      </div>
    );
  }
  
  const business = data.businesses[0];
  const unreadCount = data.notifications.filter(n => !n.read).length;

  const handleConnectBank = () => {
    setBankConnectionStatus('Menghubungkan');
    setTimeout(() => {
      setBankConnectionStatus('Terhubung');
      setTimeout(() => setIsBankModalOpen(false), 1500);
    }, 2000);
  };

  const navItems = [
    { href: "/dashboard", icon: <BarChart3 />, label: "Overview" },
    { href: "/bookkeeping", icon: <Wallet />, label: "Pembukuan" },
    { href: "/credit-score", icon: <Activity />, label: "Skor Kredit" },
    { href: "/financing", icon: <ArrowLeftRight />, label: "Pembiayaan" },
    { href: "/learning", icon: <BookOpen />, label: "Literasi" },
    { href: "/legal-protection", icon: <ShieldCheck />, label: "Legalitas & Proteksi" },
    { href: "/resilience", icon: <PieChart />, label: "Ketahanan Usaha", isPremium: true },
  ];

  const subNavItems = [
    { href: "/documents", icon: <FileText />, label: "Dokumen Usaha" },
    { href: "/profile", icon: <User />, label: "Profil Usaha" },
    { href: "/notifications", icon: <Bell />, label: "Notifikasi" },
    { href: "/support", icon: <HelpCircle />, label: "Bantuan" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform flex-col border-r bg-card transition-transform duration-200 ease-in-out md:static md:flex md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Logo />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {navItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                href={item.href} 
                icon={item.icon} 
                label={item.label} 
                active={pathname === item.href}
                isPremium={item.isPremium}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
            
            <div className="my-4 border-t border-border"></div>
            
            {subNavItems.map((item) => (
              <SidebarItem 
                key={item.href} 
                href={item.href} 
                icon={item.icon} 
                label={item.label} 
                active={pathname === item.href}
                badge={item.href === '/notifications' && unreadCount > 0 ? unreadCount : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          <SidebarItem href="/settings" icon={<Settings />} label="Pengaturan" active={pathname === '/settings'} />
          <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-sigap-soft/20 flex items-center justify-center text-sigap-primary font-bold uppercase">
                {business?.name.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none truncate max-w-[140px]">{business?.name || 'UMKM'}</span>
                <span className="text-xs text-muted-foreground mt-1">UMKM Terverifikasi</span>
              </div>
            </div>
          </div>
          
          <div className="mt-3 px-2">
            <div className={`rounded-lg p-3 ${subscription.plan === 'premium' ? 'bg-gradient-to-r from-sigap-primary/10 to-indigo-500/10 border border-sigap-primary/20' : 'bg-muted border border-border'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Status Plan</span>
                {subscription.plan === 'premium' ? (
                  subscription.status === 'paused' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">PREMIUM DIJEDA</span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sigap-primary text-white">SIGAP PREMIUM</span>
                  )
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">FREE PLAN</span>
                )}
              </div>
              
              <Link href="/premium">
                <Button variant={subscription.plan === 'premium' ? "outline" : "default"} size="sm" className={`w-full h-7 text-xs ${subscription.plan === 'premium' ? 'border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white' : ''}`}>
                  {subscription.plan === 'premium' ? 'Kelola Premium' : 'Upgrade ke Premium'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-3 px-2">
            <button 
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="w-full flex items-center justify-center py-2 text-sm text-red-600 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header & Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" className="-ml-2 mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-bold text-sigap-darkest">SIGAP</span>
          </div>
          <div className="hidden md:flex flex-1">
            <h1 className="text-lg font-semibold text-sigap-darkest capitalize">
              {pathname.split('/')[1]?.replace('-', ' ') || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {subscription.plan === 'premium' && subscription.status === 'active' && (
               <span className="hidden sm:flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sigap-primary/10 text-sigap-primary border border-sigap-primary/20">
                 PREMIUM
               </span>
            )}
            {subscription.plan === 'free' && (
               <span className="hidden sm:flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                 FREE
               </span>
            )}
            {bankConnectionStatus === 'Terhubung' ? (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Bank Terhubung (Demo)
              </span>
            ) : (
              <Button onClick={() => setIsBankModalOpen(true)} variant="outline" size="sm" className="hidden sm:flex border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white">
                Hubungkan Bank
              </Button>
            )}
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-card"></span>
                )}
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 md:p-6 lg:p-8 relative">
          {children}
        </main>
      </div>

      {/* Bank Connection Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">Hubungkan Rekening Bank</h3>
              <button onClick={() => setIsBankModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {bankConnectionStatus === 'Belum Terhubung' && (
                <>
                  <p className="text-sm text-gray-500 mb-4">Pilih bank demo untuk dihubungkan. Data transaksi akan disimulasikan.</p>
                  <div className="space-y-3">
                    {['Bank Demo A', 'Bank Demo B', 'Bank Demo C'].map(bank => (
                      <button key={bank} onClick={handleConnectBank} className="w-full text-left px-4 py-3 border rounded-lg hover:border-sigap-primary hover:bg-sigap-primary/5 transition-colors flex justify-between items-center">
                        <span className="font-medium">{bank}</span>
                        <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </>
              )}
              {bankConnectionStatus === 'Menghubungkan' && (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-sigap-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <h4 className="font-medium mb-1">Menghubungkan ke Bank...</h4>
                  <p className="text-sm text-gray-500">Membangun koneksi aman (Demo)</p>
                </div>
              )}
              {bankConnectionStatus === 'Terhubung' && (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium mb-1">Berhasil Terhubung</h4>
                  <p className="text-sm text-gray-500">Rekening bank Anda telah terhubung (Demo)</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ 
  href, icon, label, active, badge, isPremium, onClick 
}: { 
  href: string, icon: React.ReactNode, label: string, active?: boolean, badge?: number, isPremium?: boolean, onClick?: () => void 
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active 
          ? "bg-sigap-primary/10 text-sigap-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-5 w-5 ${active ? "text-sigap-primary" : "text-muted-foreground"}`}>
          {icon}
        </div>
        {label}
      </div>
      <div className="flex items-center gap-2">
        {isPremium && (
          <span className="bg-gradient-to-r from-sigap-primary to-indigo-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            Premium
          </span>
        )}
        {badge !== undefined && (
          <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}
