"use client";

import { Button } from '@/components/ui/button';
import {
CheckCircle2,
Clock,
Search,
ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

export default function AdminBusinessesPage() {
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const businesses = [
    { id: 'UMKM-001', name: 'Kedai Kopi Senja', owner: 'Budi Santoso', city: 'Palembang', sector: 'F&B', score: 782, grade: 'A', status: 'verified', revenue: 'Rp 18.2 Jt/bln' },
    { id: 'UMKM-002', name: 'CV Maju Bersama', owner: 'Rina Sugiarto', city: 'Bandung', sector: 'Manufaktur', score: 765, grade: 'A-', status: 'verified', revenue: 'Rp 45.0 Jt/bln' },
    { id: 'UMKM-003', name: 'Toko Kelontong Berkah', owner: 'Ahmad Fauzi', city: 'Surabaya', sector: 'Ritel', score: 712, grade: 'B', status: 'pending', revenue: 'Rp 12.5 Jt/bln' },
    { id: 'UMKM-004', name: 'PT Inovasi Digital', owner: 'Hendro Wijaya', city: 'Jakarta', sector: 'Teknologi', score: 810, grade: 'A+', status: 'verified', revenue: 'Rp 88.0 Jt/bln' }
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = businesses.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    b.owner.toLowerCase().includes(search.toLowerCase()) ||
    b.city.toLowerCase().includes(search.toLowerCase())
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Verifikasi & Direktori UMKM</h2>
          <p className="text-muted-foreground mt-1">Daftar entitas usaha terdaftar, skor kredit, dan validasi berkas legalitas.</p>
        </div>
        <Button onClick={() => showToast('Mengekspor data UMKM (.xlsx)...')} variant="outline">
          Ekspor Data UMKM
        </Button>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama usaha, pemilik, atau kota..."
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
              <th className="px-6 py-4">Nama Usaha / Pemilik</th>
              <th className="px-6 py-4">Kota & Sektor</th>
              <th className="px-6 py-4">Estimasi Omzet</th>
              <th className="px-6 py-4">Skor SIGAP</th>
              <th className="px-6 py-4">Status Legalitas</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {b.name}
                  <span className="block text-xs font-normal text-gray-500">{b.owner} • {b.id}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {b.city}
                  <span className="block text-xs text-gray-400">{b.sector}</span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{b.revenue}</td>
                <td className="px-6 py-4 font-extrabold text-sigap-primary">
                  {b.score} <span className="text-xs font-bold text-gray-400">({b.grade})</span>
                </td>
                <td className="px-6 py-4">
                  {b.status === 'verified' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      <Clock className="w-3.5 h-3.5" /> Pending Review
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => showToast(`Membuka berkas ${b.name}...`)}
                    className="text-xs"
                  >
                    Detail
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
