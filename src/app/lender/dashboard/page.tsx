"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, FileText, CheckCircle2, 
  Clock, TrendingUp, ShieldCheck, AlertCircle,
  ChevronRight, XCircle
} from "lucide-react";
import { useLenderDemo } from "@/lib/context/LenderContext";
import Link from 'next/link';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function LenderDashboardPage() {
  const { data, updateData } = useLenderDemo();
  const partner = data.lender_accounts[0] || {
    id: 'LND-001',
    name: 'Bank Nusantara Demo',
    short_name: 'BND',
    role: 'lender'
  };
  const leadQuality = data.lead_quality;
  const applications = data.applications.slice(0, 5); // 5 top applications
  const monthlyTrend = data.dashboard.monthly_trend;

  const [chartMetric, setChartMetric] = useState<'disbursed' | 'applications'>('disbursed');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // Dynamic calculated metrics
  const totalApps = data.applications.length;
  const waitingVerification = data.applications.filter(a => a.status === 'Verifikasi Dokumen').length;
  const underReview = data.applications.filter(a => a.status === 'Review' || a.status === 'Baru').length;
  const approvedCount = data.applications.filter(a => a.status === 'Disetujui' || a.status === 'Disalurkan').length;
  const totalDisbursed = data.dashboard.metrics.total_disbursed_this_month;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatShortBillions = (amount: number) => {
    return `Rp ${(amount / 1000000000).toFixed(1)} M`;
  };

  // Pie chart data for lead quality
  const pieData = leadQuality.categories.map((cat, idx) => ({
    name: cat.label.split(' (')[0],
    fullName: cat.label,
    value: cat.count,
    pct: cat.pct,
    color: idx === 0 ? '#10B981' : idx === 1 ? '#F59E0B' : '#EF4444'
  }));

  // Handle status update from quick evaluation modal
  const handleUpdateStatus = (appId: string, newStatus: string) => {
    updateData(prev => ({
      ...prev,
      applications: prev.applications.map(app =>
        app.id === appId ? { ...app, status: newStatus, last_action: `Berubah ke ${newStatus}` } : app
      )
    }));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      {/* Hero Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
      >
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-64 h-64 rounded-full bg-sigap-yellow/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Lembaga Mitra Terverifikasi: {partner.name}
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              Kinerja Portofolio & Pipeline Penyaluran
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Pantau penyaluran kredit produktif UMKM dengan scoring transparan berbasis transaksi riil QRIS, e-wallet, dan pembukuan terstandar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/lender/applications">
              <Button className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold rounded-2xl px-6 py-6 text-sm shadow-lg shadow-sigap-primary/30 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Buka Pipeline ({underReview + waitingVerification})
              </Button>
            </Link>
            <Link href="/lender/reports">
              <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl px-5 py-6 text-sm backdrop-blur-md">
                Laporan Kinerja
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Pengajuan</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-sigap-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-2">
            {totalApps.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl w-fit">
            <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% MoM
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verifikasi Dokumen</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-2">
            {waitingVerification.toLocaleString('id-ID')} Berkas
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl w-fit">
            <AlertCircle className="w-3.5 h-3.5" /> Memerlukan Review
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Disetujui & Cair</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-2">
            {approvedCount.toLocaleString('id-ID')} Debitur
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl w-fit">
            <ArrowUpRight className="w-3.5 h-3.5" /> Rasio 85.3%
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Penyaluran</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-sigap-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest mb-2 truncate" title={formatCurrency(totalDisbursed)}>
            {formatShortBillions(totalDisbursed)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl w-fit">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% Bulan Ini
          </div>
        </motion.div>
      </div>

      {/* Main Analytics Row: Monthly Disbursement Trend & Lead Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Recharts Monthly Trend Chart */}
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
                  Tren Penyaluran Kredit & Aplikasi
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-sigap-primary">
                  6 Bulan Terakhir
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Visualisasi dinamika volume pengajuan vs realisasi pencairan dana kredit UMKM.
              </p>
            </div>

            {/* Metric Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setChartMetric('disbursed')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  chartMetric === 'disbursed'
                    ? 'bg-sigap-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-sigap-darkest'
                }`}
              >
                Nominal Penyaluran
              </button>
              <button
                onClick={() => setChartMetric('applications')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  chartMetric === 'applications'
                    ? 'bg-sigap-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-sigap-darkest'
                }`}
              >
                Volume Berkas
              </button>
            </div>
          </div>

          {/* Recharts Area Container */}
          <div className="h-72 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartMetric === 'disbursed' ? (
                <AreaChart data={monthlyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="disbursedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#006699" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#006699" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#E2E8F0' }} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(val) => `Rp ${(val / 1e9).toFixed(1)}M`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length && payload[0]) {
                        return (
                          <div className="bg-sigap-darkest text-white p-3.5 rounded-2xl shadow-xl border border-white/10 text-xs">
                            <p className="font-bold text-slate-300 mb-1">{label} 2026</p>
                            <p className="text-sigap-yellow font-extrabold text-sm">
                              {formatCurrency((payload[0].value as number) || 0)}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1">Realisasi Penyaluran Modal</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="disbursed" 
                    stroke="#006699" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#disbursedGrad)" 
                  />
                </AreaChart>
              ) : (
                <ComposedChart data={monthlyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94A3B8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: '#E2E8F0' }} 
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-sigap-darkest text-white p-3.5 rounded-2xl shadow-xl border border-white/10 text-xs space-y-1">
                            <p className="font-bold text-slate-300">{label} 2026</p>
                            <p className="text-blue-400 font-bold">Total Masuk: {payload[0]?.value} berkas</p>
                            <p className="text-emerald-400 font-bold">Disetujui: {payload[1]?.value} debitur</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="applications" fill="#CBD5E1" radius={[8, 8, 0, 0]} name="Aplikasi Masuk" />
                  <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={3} name="Disetujui" />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 text-center">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Rata-rata Penyaluran</p>
              <p className="font-display font-extrabold text-sigap-darkest text-base mt-0.5">Rp 7.1 M/Bulan</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Pertumbuhan Aplikasi</p>
              <p className="font-display font-extrabold text-emerald-600 text-base mt-0.5">+52.2% H1</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Tingkat Approval</p>
              <p className="font-display font-extrabold text-blue-600 text-base mt-0.5">33% Lolos Filter</p>
            </div>
          </div>
        </motion.div>

        {/* Lead Quality Donut Chart (Replacing divs with real animated Recharts) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
                Kualitas Scoring Lead
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Otomatis SIGAP
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Komposisi profil risiko kredit berdasarkan skor algoritma machine learning SIGAP.
            </p>

            {/* Donut Chart */}
            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length && payload[0]) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-sigap-darkest text-white px-3 py-2 rounded-xl text-xs shadow-lg">
                            <span className="font-bold">{d.fullName}: </span>
                            <span className="font-extrabold text-sigap-yellow">{d.pct}% ({d.value} UMKM)</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-display font-extrabold text-sigap-darkest">83%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Prima (A & B)</span>
              </div>
            </div>

            {/* Category breakdown pills */}
            <div className="space-y-3 mt-4">
              {pieData.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="font-bold text-sigap-darkest">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">{cat.value} UMKM</span>
                    <span className="font-extrabold text-sigap-darkest px-2 py-0.5 rounded-lg bg-white border border-slate-200">
                      {cat.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-normal bg-blue-50/50 p-2.5 rounded-xl border border-blue-100/60">
            Debitur Kategori A otomatis lolos pre-screening dan memenuhi syarat instant approval plafon s/d Rp 100 Juta.
          </p>
        </motion.div>
      </div>

      {/* Pipeline Status Flow & Recent Applications */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-display font-extrabold text-xl text-sigap-darkest">
              Pipeline Pengajuan Terbaru
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              5 aplikasi terbaru yang siap untuk diverifikasi dan dievaluasi tim analis kredit.
            </p>
          </div>
          <Link href="/lender/applications">
            <Button variant="outline" className="border-slate-200 hover:border-sigap-primary text-sigap-primary font-bold text-xs rounded-2xl">
              Lihat Semua Pengajuan <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Nama Usaha / Pemilik</th>
                <th className="px-6 py-4">Kategori & Kota</th>
                <th className="px-6 py-4">Skor SIGAP</th>
                <th className="px-6 py-4">Plafon Diajukan</th>
                <th className="px-6 py-4">Status Pipeline</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sigap-primary to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {app.business_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-display font-bold text-sigap-darkest text-sm">{app.business_name}</div>
                        <div className="text-xs text-slate-400 font-mono">{app.id} • {app.owner_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-semibold text-slate-700">{app.business_type}</div>
                    <div className="text-xs text-slate-400">{app.city}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-emerald-600 text-base">{app.score}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Grade {app.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-display font-extrabold text-sigap-darkest text-sm">
                      {formatCurrency(app.requested_amount)}
                    </div>
                    <div className="text-xs text-slate-400">{app.tenor_months} Bulan</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                      app.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      app.status === 'Disalurkan' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      app.status === 'Verifikasi Dokumen' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      app.status === 'Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      app.status === 'Ditolak' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedApp(app)}
                      className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold text-xs rounded-xl px-4 shadow-sm"
                    >
                      Evaluasi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Evaluation Drawer */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm overflow-hidden"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 bg-sigap-darkest text-white flex justify-between items-center sticky top-0 z-10 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sigap-yellow font-display">
                    Panel Evaluasi Cepat
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white">{selectedApp.business_name}</h3>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">{selectedApp.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)} 
                  className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 space-y-6">
                {/* Financial Summary */}
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Plafon Diajukan</span>
                    <span className="font-display font-extrabold text-lg text-sigap-darkest">
                      {formatCurrency(selectedApp.requested_amount)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Tenor</span>
                      <p className="font-display font-bold text-sigap-darkest text-sm mt-0.5">{selectedApp.tenor_months} Bln</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Skor Kredit</span>
                      <p className="font-display font-extrabold text-emerald-600 text-sm mt-0.5">{selectedApp.score}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Cashflow</span>
                      <p className="font-display font-bold text-blue-600 text-sm mt-0.5">{selectedApp.cashflow_status}</p>
                    </div>
                  </div>
                </div>

                {/* Identity Information */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Profil Pemilik & Usaha
                  </h4>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nama Pemilik:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.owner_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lokasi:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sektor:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.business_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Produk Dipilih:</span>
                      <span className="font-bold text-sigap-primary">{selectedApp.product_id}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Indicators */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Indikator Kelayakan Kredit
                  </h4>
                  {selectedApp.risk_flags && selectedApp.risk_flags.length > 0 ? (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Catatan Mitigasi Risiko
                      </div>
                      <ul className="text-xs text-amber-700 list-disc pl-5 space-y-1">
                        {selectedApp.risk_flags.map((flag: string, i: number) => (
                          <li key={i}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-emerald-800">
                        Profil risiko sangat sehat. Tidak ada catatan keterlambatan atau rasio utang berlebih.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Verifikasi Dokumen')}
                    className="rounded-2xl text-xs font-bold border-slate-300"
                  >
                    Minta Dokumen
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Review')}
                    className="rounded-2xl text-xs font-bold border-slate-300"
                  >
                    Set Review
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Ditolak')}
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-bold shadow-md"
                  >
                    Tolak Pengajuan
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Disetujui')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md"
                  >
                    Setujui Kredit
                  </Button>
                </div>
                <Button 
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Disalurkan')}
                  className="w-full bg-sigap-primary hover:bg-sigap-primary/90 text-white rounded-2xl text-xs font-bold py-5 shadow-lg shadow-sigap-primary/30"
                >
                  Konfirmasi Pencairan Dana (Cairkan)
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
