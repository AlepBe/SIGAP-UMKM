"use client";

import React, { useState } from 'react';
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Users, Building, ShieldAlert, 
  BarChart4, FileCheck, Settings, Menu, Bell, X,
  ArrowLeftRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Command Center" },
    { href: "/admin/businesses", icon: Users, label: "Verifikasi UMKM" },
    { href: "/admin/lenders", icon: Building, label: "Mitra Lender" },
    { href: "/admin/applications", icon: FileCheck, label: "Monitoring Transaksi" },
    { href: "/admin/legal-verification", icon: ShieldAlert, label: "Moderasi Legalitas" },
    { href: "/admin/scoring", icon: BarChart4, label: "ML Model Monitoring" },
    { href: "/admin/settings", icon: Settings, label: "Sistem & Konfigurasi" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-72 max-w-[85vw] bg-gray-900 text-gray-300 z-10 shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
                <Logo variant="white" height={34} />
                <button 
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive ? "bg-sigap-primary text-white" : "hover:bg-gray-800/80 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-gray-800 p-4">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-800 text-xs font-semibold text-gray-200 hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5 text-sigap-yellow" />
                  <span>Ke Portal UMKM</span>
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Desktop Sidebar */}
      <aside className="hidden w-64 lg:w-72 flex-col border-r bg-gray-900 text-gray-300 md:flex shrink-0">
        <div className="flex h-18 items-center border-b border-gray-800 px-6">
          <Logo variant="white" height={36} />
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4 text-sm font-medium">
            <div className="pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">Menu Kontrol</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors ${
                    isActive ? "bg-sigap-primary text-white font-semibold shadow-md shadow-sigap-primary/20" : "hover:bg-gray-800/60 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="border-t border-gray-800 p-4 space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors border border-gray-700"
          >
            <span className="flex items-center gap-2">
              <ArrowLeftRight className="h-3.5 w-3.5 text-sigap-yellow" />
              Ke Portal UMKM
            </span>
          </Link>

          <div className="flex items-center gap-3 px-1 text-white">
            <div className="h-9 w-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-xs text-sigap-yellow">
              ADM
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate">Super Admin</span>
              <span className="text-[11px] text-gray-400">Platform Operations</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 sm:h-18 items-center justify-between border-b bg-white px-4 sm:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-1 rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-display font-extrabold text-sm text-gray-900">SIGAP ADMIN</span>
          </div>
          
          <div className="hidden md:flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sigap-primary font-display">SIGAP Operations</span>
            <h1 className="text-base font-extrabold text-gray-900">System Command Center</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative rounded-xl text-gray-500 hover:bg-gray-100">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
