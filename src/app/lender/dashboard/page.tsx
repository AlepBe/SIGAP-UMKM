"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, Users, FileText, CheckCircle, Clock } from "lucide-react";
import { useLenderDemo } from "@/lib/context/LenderContext";
import Link from 'next/link';

export default function LenderDashboardPage() {
  const { data } = useLenderDemo();
  const partner = data.lender_accounts[0];
  const leadQuality = data.lead_quality;
  const applications = data.applications.slice(0, 5); // Take top 5 for dashboard

  // Calculate metrics dynamically
  const metrics = {
    total_applications: data.applications.length,
    waiting_verification: data.applications.filter(a => a.status === 'Verifikasi Dokumen').length,
    approved_this_month: data.applications.filter(a => a.status === 'Disetujui').length,
    total_disbursed: data.dashboard.metrics.total_disbursed_this_month
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Lender Dashboard</h2>
          <p className="text-muted-foreground">Tinjauan pipeline pembiayaan dan kinerja portofolio {partner.name}.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">Ekspor Data (Demo)</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LenderKPICard title="Total Pengajuan" value={metrics.total_applications.toLocaleString('id-ID')} trend="+12%" isPositive={true} icon={<FileText />} />
        <LenderKPICard title="Menunggu Verifikasi" value={metrics.waiting_verification.toLocaleString('id-ID')} trend="-5%" isPositive={false} icon={<Clock />} />
        <LenderKPICard title="Disetujui (Bulan Ini)" value={metrics.approved_this_month.toLocaleString('id-ID')} trend="+18%" isPositive={true} icon={<CheckCircle />} />
        <LenderKPICard title="Total Disalurkan" value={formatCurrency(metrics.total_disbursed)} trend="+24%" isPositive={true} icon={<ArrowUpRight />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline / Application List */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
            <h3 className="font-semibold text-lg text-sigap-darkest">Pipeline Pengajuan Terbaru</h3>
            <Link href="/lender/applications">
              <Button variant="ghost" size="sm" className="text-sigap-primary">Lihat Semua</Button>
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama Usaha</th>
                  <th className="px-6 py-3 font-medium">Skor SIGAP</th>
                  <th className="px-6 py-3 font-medium">Plafon</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {applications.map(app => (
                  <ApplicationRow 
                    key={app.id}
                    name={app.business_name} 
                    score={`${app.score} (${app.grade})`} 
                    amount={formatCurrency(app.requested_amount)} 
                    status={app.status} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scoring Distribution / Referral Info */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-sigap-darkest mb-4">Kualitas Lead UMKM (Demo)</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Kategori A (Skor 750+)</span>
                  <span>{leadQuality.categories[0].pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${leadQuality.categories[0].pct}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Kategori B (Skor 650-749)</span>
                  <span>{leadQuality.categories[1].pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${leadQuality.categories[1].pct}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">Kategori C (Skor &lt; 650)</span>
                  <span>{leadQuality.categories[2].pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${leadQuality.categories[2].pct}%` }}></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Sistem filtering SIGAP memprioritaskan penyaluran pada kategori A dan B untuk produk kredit Anda.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LenderKPICardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

function LenderKPICard({ title, value, trend, isPositive, icon }: LenderKPICardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-xl font-bold text-sigap-darkest mb-2">{value}</div>
        <div className={`text-xs font-medium px-1.5 py-0.5 rounded-sm inline-flex items-center ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </div>
      </div>
      <div className="w-10 h-10 rounded-lg bg-sigap-primary/10 flex items-center justify-center text-sigap-primary shrink-0">
        {icon}
      </div>
    </div>
  );
}

interface ApplicationRowProps {
  name: string;
  score: string;
  amount: string;
  status: string;
}

function ApplicationRow({ name, score, amount, status }: ApplicationRowProps) {
  const getStatusColor = (s: string) => {
    if (s.toLowerCase().includes('review')) return 'bg-amber-100 text-amber-800';
    if (s.toLowerCase().includes('baru')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <tr className="hover:bg-muted/30">
      <td className="px-6 py-4 font-medium text-sigap-darkest whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 font-semibold text-green-600 whitespace-nowrap">{score}</td>
      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{amount}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(status)}`}>{status}</span>
      </td>
      <td className="px-6 py-4 text-right">
        <Link href="/lender/applications">
          <Button size="sm" variant="outline">Evaluasi</Button>
        </Link>
      </td>
    </tr>
  );
}
