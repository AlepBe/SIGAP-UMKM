"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building2, Search, CheckCircle2, ShieldCheck, Plus 
} from 'lucide-react';

export default function AdminLendersPage() {
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const lenders = [
    { id: 'LDR-001', name: 'Bank Nusantara Demo', type: 'Bank BUMN', license: 'POJK Bank Umum No. 12/2021', products: 3, disbursed: 'Rp 850 Miliar', status: 'active' },
    { id: 'LDR-002', name: 'Fintech Nusantara Demo', type: 'P2P Lending', license: 'KEP-45/D.05/2019 OJK', products: 2, disbursed: 'Rp 420 Miliar', status: 'active' },
    { id: 'LDR-003', name: 'Bank Arunika Demo', type: 'Bank Swasta', license: 'POJK Bank Umum No. 08/2020', products: 4, disbursed: 'Rp 610 Miliar', status: 'active' },
    { id: 'LDR-004', name: 'Koperasi Maju Demo', type: 'Koperasi Digital', license: 'Kemenkop & UKM / OJK Sandbox', products: 1, disbursed: 'Rp 95 Miliar', status: 'active' }
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = lenders.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    l.type.toLowerCase().includes(search.toLowerCase())
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Mitra Lender</h2>
          <p className="text-muted-foreground mt-1">Lembaga perbankan, fintech p2p lending, dan institusi pembiayaan terintegrasi.</p>
        </div>
        <Button onClick={() => showToast('Membuka modal integrasi lender baru...')} className="bg-gray-900 text-white">
          <Plus className="w-4 h-4 mr-2" /> Tambah Mitra Lender
        </Button>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama lembaga atau jenis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-sigap-primary"
          />
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">Nama Lembaga</th>
              <th className="px-6 py-4">Jenis Lembaga</th>
              <th className="px-6 py-4">Nomor Izin OJK</th>
              <th className="px-6 py-4">Total Penyaluran</th>
              <th className="px-6 py-4">Status Integrasi</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(l => (
              <tr key={l.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span>{l.name}</span>
                    <span className="block text-xs font-mono text-gray-400">{l.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{l.type}</td>
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{l.license}</td>
                <td className="px-6 py-4 font-extrabold text-sigap-primary">{l.disbursed}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5" /> Aktif & Diawasi
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button size="sm" variant="outline" onClick={() => showToast(`Konfigurasi API ${l.name}...`)} className="text-xs">
                    Kelola API
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
