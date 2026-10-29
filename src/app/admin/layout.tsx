import React from 'react';
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { 
  LayoutDashboard, Users, Building, ShieldAlert, 
  BarChart4, FileCheck, Settings, Menu, Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-gray-900 text-gray-300 md:flex">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Logo variant="white" />
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4 text-sm font-medium">
            <SidebarItem href="/admin/dashboard" icon={<LayoutDashboard />} label="Command Center" active />
            <div className="pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Platform</div>
            <SidebarItem href="/admin/businesses" icon={<Users />} label="Verifikasi UMKM" />
            <SidebarItem href="/admin/lenders" icon={<Building />} label="Mitra Lender" />
            <SidebarItem href="/admin/applications" icon={<FileCheck />} label="Monitoring Transaksi" />
            <div className="pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Compliance</div>
            <SidebarItem href="/admin/legal-verification" icon={<ShieldAlert />} label="Moderasi Legalitas" />
            <SidebarItem href="/admin/scoring" icon={<BarChart4 />} label="ML Model Monitoring" />
          </nav>
        </div>
        
        <div className="border-t border-gray-800 p-4">
          <SidebarItem href="/admin/settings" icon={<Settings />} label="Sistem" />
          <div className="mt-4 flex items-center gap-3 px-2 text-white">
            <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center font-bold">
              OP
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">Super Admin</span>
              <span className="text-xs text-gray-400 mt-1">Platform Operations</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" className="-ml-2 mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="font-bold text-gray-900">SIGAP ADMIN</span>
          </div>
          <div className="hidden md:flex">
            <h1 className="text-lg font-semibold text-gray-900">System Monitoring</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
        active 
          ? "bg-gray-800 text-white" 
          : "hover:bg-gray-800/50 hover:text-white"
      }`}
    >
      <div className="h-5 w-5">
        {icon}
      </div>
      {label}
    </Link>
  );
}
