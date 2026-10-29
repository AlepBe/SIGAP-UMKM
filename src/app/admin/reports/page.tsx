"use client";

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function AdminReportsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Laporan Eksekutif Platform</h2>
          <p className="text-muted-foreground mt-1">Ringkasan pertumbuhan pengguna, volume pembiayaan, dan dampak ekonomi UMKM.</p>
        </div>
        <Button className="bg-gray-900 text-white">
          <Download className="w-4 h-4 mr-2" /> Unduh Laporan Tahunan
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Total Pembiayaan Tersalurkan</span>
          <div className="text-2xl font-extrabold text-sigap-primary mt-1">Rp 2.45 Triliun</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">+18.5% year-over-year</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Tingkat Gagal Bayar (NPL Rata-rata)</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">0.42%</div>
          <p className="text-xs text-gray-500 mt-1">Jauh di bawah batas OJK (5.0%)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase">Pertumbuhan Omzet Rata-rata UMKM</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">+26.4%</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Setelah 6 bulan adopsi SIGAP</p>
        </div>
      </div>
    </div>
  );
}
