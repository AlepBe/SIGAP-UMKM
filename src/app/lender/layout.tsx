"use client";

import React, { useState } from 'react';
import { Logo } from "@/components/ui/logo";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, FileText, BarChart, 
  Settings, Menu, Bell, Building, X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenderDemo } from "@/lib/context/LenderContext";
import { useAuth } from "@/lib/context/AuthContext";
import Link from "next/link";

export default function LenderLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data } = useLenderDemo();
  const partner = data.lender_accounts[0];
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { session, isLoading, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading) {
      if (!session?.authenticated) {
        router.replace('/login');
      } else if (session.role === 'umkm') {
        router.replace('/dashboard');
      }
    }
  }, [session, isLoading, router]);

  if (isLoading || session?.role !== 'lender') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sigap-primary"></div>
      </div>
    );
  }

  const navItems = [
    { href: "/lender/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
    { href: "/lender/applications", icon: <FileText />, label: "Pengajuan" },
    { href: "/lender/applicants", icon: <Users />, label: "Database UMKM" },
    { href: "/lender/products", icon: <Building />, label: "Produk Pembiayaan" },
    { href: "/lender/reports", icon: <BarChart />, label: "Laporan Kinerja" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Lender Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform flex-col border-r bg-sigap-darkest text-white transition-transform duration-200 ease-in-out md:static md:flex md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Logo variant="white" />
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-white/80" onClick={() => setIsMobileMenuOpen(false)}>
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
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
        
        <div className="border-t border-white/10 p-4">
          <SidebarItem href="/lender/settings" icon={<Settings />} label="Pengaturan API" active={pathname === '/lender/settings'} />
          <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-white text-sigap-darkest flex items-center justify-center font-bold">
                {partner.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none text-white truncate max-w-[130px]">{partner.name}</span>
                <span className="text-xs text-sigap-light mt-1">{partner.role}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 px-2">
            <button 
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="w-full flex items-center justify-center py-2 text-sm text-red-400 font-medium bg-red-900/30 hover:bg-red-900/50 hover:text-red-300 rounded-lg transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" className="-ml-2 mr-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-bold text-sigap-darkest">SIGAP LENDER</span>
          </div>
          <div className="hidden md:flex flex-1">
            <h1 className="text-lg font-semibold text-sigap-darkest capitalize">
              {pathname.split('/')[2]?.replace('-', ' ') || 'Partner Workspace'}
            </h1>
            <span className="ml-4 bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold self-center">
              MODE DEMO
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-white"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ 
  href, icon, label, active, onClick 
}: { 
  href: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void 
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        active 
          ? "bg-sigap-primary text-white" 
          : "text-sigap-light/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className="h-5 w-5">
        {icon}
      </div>
      {label}
    </Link>
  );
}
