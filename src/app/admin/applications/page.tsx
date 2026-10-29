"use client";

import { Button } from '@/components/ui/button';
import {
CheckCircle2,
Clock,
Search
} from 'lucide-react';
import { useState } from 'react';

export default function AdminApplicationsPage() {
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const applications = [
    { id: 'APP-2026-0891', business: 'Kedai Kopi Senja', lender: 'Bank Nusantara Demo', product: 'KUR Mikro', amount: 'Rp 35.000.000', score: 782, grade: 'A', status: 'Review Dokumen' },
    { id: 'APP-2026-0892', business: 'CV Maju Bersama', lender: 'Fintech Nusantara Demo', product: 'Invoice Financing', amount: 'Rp 150.000.000', score: 765, grade: 'A-', status: 'Disetujui' },
    { id: 'APP-2026-0893', business: 'Toko Kelontong Berkah', lender: 'Bank Arunika Demo', product: 'KUR Kecil', amount: 'Rp 50.000.000', score: 712, grade: 'B', status: 'Penilaian Kredit' },
    { id: 'APP-2026-0894', business: 'PT Inovasi Digital', lender: 'Bank Nusantara Demo', product: 'Modal Kerja', amount: 'Rp 300.000.000', score: 810, grade: 'A+', status: 'Pencairan Dana' }
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = applications.filter(a => 
    a.business.toLowerCase().includes(search.toLowerCase()) || 
    a.lender.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Monitoring Aplikasi Pembiayaan</h2>
          <p className="text-muted-foreground mt-1">Lalu lintas pengajuan kredit, verifikasi dokumen, dan proses approval seluruh platform.</p>
        </div>
        <Button onClick={() => showToast('Mengekspor laporan aplikasi...')} variant="outline">
          Ekspor Log Aplikasi
        </Button>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama UMKM, lembaga, atau ID aplikasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-sigap-primary"
          />
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">ID & Pemohon UMKM</th>
              <th className="px-6 py-4">Lembaga Penyalur</th>
              <th className="px-6 py-4">Plafon Diajukan</th>
              <th className="px-6 py-4">Skor SIGAP</th>
              <th className="px-6 py-4">Tahapan / Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(app => (
              <tr key={app.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {app.business}
                  <span className="block text-xs font-mono text-gray-400">{app.id}</span>
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {app.lender}
                  <span className="block text-xs text-gray-400">{app.product}</span>
                </td>
                <td className="px-6 py-4 font-extrabold text-sigap-darkest">{app.amount}</td>
                <td className="px-6 py-4 font-bold text-sigap-primary">
                  {app.score} ({app.grade})
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    <Clock className="w-3.5 h-3.5" /> {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" variant="outline" onClick={() => showToast(`Audit trail aplikasi ${app.id}...`)} className="text-xs">
                    Audit Log
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
