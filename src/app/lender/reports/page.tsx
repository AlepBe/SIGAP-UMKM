"use client";

import React from 'react';
import { BarChart, Download, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';

export default function ReportsPage() {
  const { data } = useLenderDemo();
  const metrics = data.dashboard.metrics;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const handleDownloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Bulan,Disetujui,Ditolak,Total Penyaluran\nJanuari,12,3,500000000\nFebruari,15,4,650000000\nMaret,21,2,980000000";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan_kinerja_sigap.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Laporan Kinerja</h2>
          <p className="text-muted-foreground mt-1">Pantau analitik penyaluran dan tingkat NPL (Non-Performing Loan).</p>
        </div>
        <Button variant="outline" onClick={handleDownloadCSV} className="bg-white">
          <Download className="w-4 h-4 mr-2" /> Unduh CSV (Demo)
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Disalurkan (Bulan Ini)</h3>
          <div className="text-2xl font-bold text-sigap-darkest mb-2">{formatCurrency(metrics.total_disbursed_this_month)}</div>
          <div className="text-xs font-medium px-1.5 py-0.5 rounded-sm inline-flex items-center bg-green-100 text-green-700">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +15.3% dari bulan lalu
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Non-Performing Loan (NPL)</h3>
          <div className="text-2xl font-bold text-sigap-darkest mb-2">1.8%</div>
          <div className="text-xs font-medium px-1.5 py-0.5 rounded-sm inline-flex items-center bg-green-100 text-green-700">
            <ArrowDownRight className="w-3 h-3 mr-1" /> Terjaga di bawah 2%
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Rata-rata Waktu Proses</h3>
          <div className="text-2xl font-bold text-sigap-darkest mb-2">1.5 Hari</div>
          <div className="text-xs font-medium px-1.5 py-0.5 rounded-sm inline-flex items-center bg-green-100 text-green-700">
            <ArrowDownRight className="w-3 h-3 mr-1" /> -12 jam (Lebih Cepat)
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-sigap-soft/20 text-sigap-primary rounded-full flex items-center justify-center mb-4">
          <BarChart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Visualisasi Grafik (Placeholder)</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-6 text-center">
          Di lingkungan produksi, area ini akan menampilkan grafik interaktif (mis. menggunakan Recharts atau Chart.js) yang memetakan tren penyaluran, distribusi kredit berdasarkan sektor, dan profil risiko portofolio secara real-time.
        </p>
      </div>
    </div>
  );
}
