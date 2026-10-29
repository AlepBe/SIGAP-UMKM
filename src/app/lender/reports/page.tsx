"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, Download, ArrowUpRight, ArrowDownRight, 
  Activity, ShieldCheck, CheckCircle2, TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart
} from 'recharts';

export default function ReportsPage() {
  const { data } = useLenderDemo();
  const metrics = data.dashboard.metrics;
  const [timeRange, setTimeRange] = useState<'3M' | '6M' | '1Y'>('6M');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Performance data with Target vs Actual
  const performanceTrendData = [
    { month: 'Apr', realisasi: 5.21, target: 5.00, npl: 2.1, approved: 268 },
    { month: 'Mei', realisasi: 6.18, target: 6.00, npl: 2.0, approved: 301 },
    { month: 'Jun', realisasi: 7.04, target: 6.80, npl: 1.9, approved: 337 },
    { month: 'Jul', realisasi: 7.59, target: 7.50, npl: 1.9, approved: 361 },
    { month: 'Agu', realisasi: 8.01, target: 8.00, npl: 1.8, approved: 388 },
    { month: 'Sep', realisasi: 8.55, target: 8.20, npl: 1.8, approved: 412 },
  ];

  // Sector distribution data
  const sectorData = [
    { name: 'Kuliner (F&B)', value: 42, nominal: 3591000000, color: '#006699' },
    { name: 'Retail & Fashion', value: 28, nominal: 2394000000, color: '#10B981' },
    { name: 'Jasa & Bengkel', value: 18, nominal: 1539000000, color: '#F59E0B' },
    { name: 'Agribisnis & Kerajinan', value: 12, nominal: 1026000000, color: '#8B5CF6' },
  ];

  const handleDownloadCSV = () => {
    const csvContent = 
      "data:text/csv;charset=utf-8,Bulan,Target Penyaluran (Miliar IDR),Realisasi Penyaluran (Miliar IDR),Total Debitur Lolos,NPL (%)\n" +
      performanceTrendData.map(d => `${d.month} 2026,${d.target},${d.realisasi},${d.approved},${d.npl}%`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_kinerja_portofolio_sigap_${timeRange.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
      >
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-sigap-primary/25 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-24 w-60 h-60 rounded-full bg-sigap-yellow/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
              <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
              Laporan Analitik Portofolio Kredit
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              Kinerja Penyaluran & Monitoring Risiko NPL
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Analisis komprehensif kepatuhan rasio kehati-hatian, diversifikasi sektor usaha, dan profil ketahanan kredit UMKM binaan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Time range selector */}
            <div className="flex p-1 bg-white/10 rounded-2xl border border-white/15 text-xs font-semibold backdrop-blur-md">
              {(['3M', '6M', '1Y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    timeRange === range
                      ? 'bg-sigap-primary text-white shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {range === '3M' ? '3 Bulan' : range === '6M' ? '6 Bulan' : '1 Tahun'}
                </button>
              ))}
            </div>

            <Button 
              onClick={handleDownloadCSV}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl px-5 py-5 text-xs shadow-lg shadow-emerald-900/30 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Ekspor CSV Lengkap
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Penyaluran Bulan Ini</span>
            <span className="p-2 rounded-xl bg-blue-50 text-sigap-primary">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-3">
            {formatCurrency(metrics.total_disbursed_this_month)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl w-fit">
            <ArrowUpRight className="w-3.5 h-3.5" /> +15.3% di atas RBB target
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Non-Performing Loan (NPL)</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-emerald-600 mb-3">
            1.8% <span className="text-xs font-normal text-slate-500">Gross</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sangat Sehat (Batas OJK: 5.0%)
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Kecepatan Evaluasi Kredit</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-3">
            1.5 Hari Kerja
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl w-fit">
            <ArrowDownRight className="w-3.5 h-3.5" /> 68% lebih cepat dari konvensional
          </div>
        </motion.div>
      </div>

      {/* Row 1 Charts: Realisasi vs Target (ComposedChart) & NPL Trend (LineChart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Realisasi vs Target Penyaluran */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
                  Realisasi Penyaluran vs Rencana Bisnis Bank (RBB)
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Target Tercapai
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Perbandingan nominal pencairan kumulatif (Miliar IDR) terhadap target RBB per bulan.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-sigap-primary"></span>
                <span className="text-slate-600">Realisasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-amber-500 rounded-full"></span>
                <span className="text-slate-600">Target RBB</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `Rp ${val}M`} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-sigap-darkest text-white p-3.5 rounded-2xl shadow-xl border border-white/10 text-xs space-y-1">
                          <p className="font-bold text-slate-300">{label} 2026</p>
                          <p className="text-sigap-yellow font-extrabold text-sm">
                            Realisasi: Rp {payload[0]?.value} Miliar
                          </p>
                          <p className="text-amber-400 font-medium">
                            Target RBB: Rp {payload[1]?.value} Miliar
                          </p>
                          <p className="text-emerald-400 font-medium">
                            Debitur Baru: {payload[0]?.payload.approved} UMKM
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="realisasi" fill="#006699" radius={[8, 8, 0, 0]} barSize={36} />
                <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 text-center">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Total H1 Tersalurkan</p>
              <p className="font-display font-extrabold text-sigap-darkest text-base mt-0.5">Rp 42.58 M</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Deviasi Terhadap Target</p>
              <p className="font-display font-extrabold text-emerald-600 text-base mt-0.5">+4.27% Surplus</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Tingkat Retensi Debitur</p>
              <p className="font-display font-extrabold text-blue-600 text-base mt-0.5">91.4% Re-apply</p>
            </div>
          </div>
        </motion.div>

        {/* NPL Monitoring Gauge / Trend Line */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
                Tren Rasio NPL
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Konsisten Turun
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Monitoring stabilitas kualitas kredit portofolio debitur SIGAP 6 bulan terakhir.
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
                  <YAxis domain={[1.0, 2.5]} stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length && payload[0]) {
                        return (
                          <div className="bg-sigap-darkest text-white px-3 py-2 rounded-xl text-xs shadow-lg">
                            <span className="font-bold">{label}: </span>
                            <span className="font-extrabold text-emerald-400">{payload[0].value}% NPL</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="npl" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-4">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Ambang Batas Maks. OJK</span>
                <span className="font-bold text-slate-700">5.00%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Batas Toleransi Internal Bank</span>
                <span className="font-bold text-slate-700">2.50%</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-emerald-800 font-bold">Posisi Portofolio SIGAP</span>
                <span className="font-extrabold text-emerald-700">1.80% (Unggul)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            Mitigasi risiko dini via integrasi mutasi QRIS real-time.
          </div>
        </motion.div>
      </div>

      {/* Row 2: Sektor UMKM Distribution & Profil Risiko */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart Sektor */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
                Portofolio per Sektor Usaha
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-sigap-primary">
                Diversifikasi
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Sebaran nominal pembiayaan aktif pada sektor-sektor produktif Indonesia.
            </p>

            <div className="h-52 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length && payload[0]) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-sigap-darkest text-white px-3 py-2 rounded-xl text-xs shadow-lg">
                            <span className="font-bold">{d.name}: </span>
                            <span className="font-extrabold text-sigap-yellow">{d.value}% ({formatCurrency(d.nominal)})</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-display font-extrabold text-sigap-darkest">4 Sektor</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ekosistem</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {sectorData.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sec.color }}></span>
                    <span className="font-bold text-sigap-darkest">{sec.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{formatCurrency(sec.nominal)}</span>
                    <span className="font-bold text-sigap-darkest px-2 py-0.5 rounded-lg bg-white border border-slate-200">
                      {sec.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Vintage & Audit Table */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
                  Analisis Kepatuhan & Mitigasi Risiko OJK
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Indikator kesehatan kredit berdasarkan standar regulasi POJK No. 10/POJK.05/2022.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Compliance: 100%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Rasio Pemulihan Kredit (Recovery Rate)</span>
                <p className="font-display font-extrabold text-sigap-darkest text-lg">98.4%</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Terserap melalui auto-debit escrow</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Rata-rata Skor Kredit Debitur Aktif</span>
                <p className="font-display font-extrabold text-sigap-darkest text-lg">768 (Kategori A)</p>
                <p className="text-[11px] text-blue-600 font-semibold">Tergolong High Creditworthiness</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Cakupan Asuransi Penjaminan</span>
                <p className="font-display font-extrabold text-sigap-darkest text-lg">100% Tercover</p>
                <p className="text-[11px] text-purple-600 font-semibold">Bekerjasama dengan Askrindo / Jamkrindo</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Rata-rata Plafon per Debitur</span>
                <p className="font-display font-extrabold text-sigap-darkest text-lg">Rp 20.75 Juta</p>
                <p className="text-[11px] text-amber-600 font-semibold">Optimal untuk modal kerja mikro</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sigap-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sigap-darkest text-xs">Butuh Laporan untuk Audit Internal?</p>
                <p className="text-[11px] text-slate-500">Unduh data transaksi historis lengkap bersertifikasi digital.</p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadCSV}
              variant="outline" 
              className="border-slate-300 hover:border-sigap-primary text-sigap-primary font-bold text-xs rounded-xl shrink-0"
            >
              Unduh Audit Trail
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
