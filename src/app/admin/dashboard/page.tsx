import React from 'react';
import { ShieldAlert, Users, Database, Server, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Platform Command Center</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <AdminStatCard title="Total UMKM Terverifikasi" value="10,482" trend="+125 minggu ini" icon={<Users />} />
        <AdminStatCard title="Lender Aktif" value="18" trend="0" icon={<Database />} />
        <AdminStatCard title="Total Penyaluran" value="Rp 2.4T" trend="+50 M minggu ini" icon={<Server />} />
        <AdminStatCard title="Laporan Pinjol Ilegal" value="24" trend="-5 laporan" alert={true} icon={<ShieldAlert />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-5 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Antrean Verifikasi Dokumen UMKM</h3>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded">142 Pending</span>
          </div>
          <div className="p-0">
            <VerificationRow name="PT Sumber Rejeki" docType="NIB & KTP" date="11 Sep 2026, 08:30" />
            <VerificationRow name="CV Mandiri Jaya" docType="NPWP Perusahaan" date="11 Sep 2026, 09:15" />
            <VerificationRow name="Kedai Kopi ABC" docType="Rekening Koran" date="11 Sep 2026, 10:05" />
            <VerificationRow name="Toko Bangunan 123" docType="KTP Pemilik" date="11 Sep 2026, 11:45" />
          </div>
          <div className="p-4 border-t text-center">
            <Button variant="ghost" size="sm" className="text-gray-600">Lihat Semua Antrean</Button>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Status Sistem & Integrasi</h3>
          <div className="space-y-4">
            <SystemStatus name="API OJK (Direktori Legal)" status="online" ping="45ms" />
            <SystemStatus name="Credit Scoring Engine (ML)" status="online" ping="120ms" />
            <SystemStatus name="Core Database (PostgreSQL)" status="online" ping="12ms" />
            <SystemStatus name="Integrasi Bank Mandiri" status="online" ping="85ms" />
            <SystemStatus name="Integrasi BRI" status="warning" ping="High Latency" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdminStatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  alert?: boolean;
}

function AdminStatCard({ title, value, trend, icon, alert = false }: AdminStatCardProps) {
  return (
    <div className={`bg-white p-6 rounded-xl border shadow-sm ${alert ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-md ${alert ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className={`text-xs ${alert ? 'text-red-600 font-medium' : 'text-gray-500'}`}>{trend}</div>
    </div>
  );
}

interface VerificationRowProps {
  name: string;
  docType: string;
  date: string;
}

function VerificationRow({ name, docType, date }: VerificationRowProps) {
  return (
    <div className="p-4 border-b last:border-b-0 flex justify-between items-center hover:bg-gray-50 transition-colors">
      <div>
        <div className="font-medium text-gray-900 text-sm">{name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{docType} • {date}</div>
      </div>
      <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">Verifikasi</Button>
    </div>
  );
}

interface SystemStatusProps {
  name: string;
  status: 'online' | 'warning' | 'error';
  ping: string;
}

function SystemStatus({ name, status, ping }: SystemStatusProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {status === 'online' ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <ShieldAlert className="w-5 h-5 text-amber-500" />
        )}
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </div>
      <div className="text-xs font-mono text-gray-500">{ping}</div>
    </div>
  );
}
