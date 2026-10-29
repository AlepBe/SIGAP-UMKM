"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
AlertCircle,
ArrowUpRight,BarChart3,
Calendar,CheckCircle2,
DollarSign,
Download,
FileText,
Sparkles,
TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import {
Bar,
CartesianGrid,
ComposedChart,
Legend,
Line,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function BookkeepingReportsPage() {
  const { data } = useDemo();
  const [activeTab, setActiveTab] = useState<'pnl' | 'cashflow' | 'balance'>('pnl');
  const [selectedPeriod, setSelectedPeriod] = useState<'3m' | '6m' | 'year'>('6m');
  const [downloadToast, setDownloadToast] = useState('');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const showToast = (msg: string) => {
    setDownloadToast(msg);
    setTimeout(() => setDownloadToast(''), 3500);
  };

  // 6-month financial performance data
  const monthlyData = [
    { month: 'Mei 2026', revenue: 15400000, cogs: 6100000, opex: 4800000, netProfit: 4500000, margin: 29.2 },
    { month: 'Jun 2026', revenue: 16200000, cogs: 6500000, opex: 5100000, netProfit: 4600000, margin: 28.4 },
    { month: 'Jul 2026', revenue: 17100000, cogs: 6800000, opex: 5300000, netProfit: 5000000, margin: 29.2 },
    { month: 'Agt 2026', revenue: 17500000, cogs: 7000000, opex: 5400000, netProfit: 5100000, margin: 29.1 },
    { month: 'Sep 2026', revenue: 18250000, cogs: 7300000, opex: 4800000, netProfit: 6150000, margin: 33.7 },
    { month: 'Okt 2026 (Est)', revenue: 19400000, cogs: 7700000, opex: 5100000, netProfit: 6600000, margin: 34.0 }
  ];

  // Summary Metrics
  const currentMonth = monthlyData[4]; // September
  const totalRevenue = monthlyData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalNetProfit = monthlyData.reduce((acc, curr) => acc + curr.netProfit, 0);
  const avgMargin = (totalNetProfit / totalRevenue) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Toast Notification */}
      {downloadToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">{downloadToast}</p>
            <p className="text-xs text-white/60">Dokumen siap untuk verifikasi perbankan & OJK.</p>
          </div>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sigap-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" /> Standar Akuntansi SAK EMKM
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Laporan Keuangan: {data.businesses[0]?.name || 'Kedai Kopi Senja'}
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Ringkasan performa finansial usaha otomatis berbasis histori transaksi riil. Memenuhi standar kelayakan pengajuan kredit modal kerja perbankan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Button 
              onClick={() => showToast('Mengunduh Laporan SAK EMKM 2026 (PDF)...')}
              className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-sigap-yellow/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Unduh PDF Resmi
            </Button>
            <Button 
              onClick={() => showToast('Mengekspor Laporan Excel (.xlsx)...')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 mr-2" /> Ekspor Excel
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendapatan Bulan Ini</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-2xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest">
            {formatCurrency(currentMonth.revenue)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% vs bulan lalu
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beban Pokok (HPP)</span>
            <span className="p-2 bg-slate-100 text-slate-600 rounded-2xl">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest">
            {formatCurrency(currentMonth.cogs)}
          </div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            40.0% dari total pendapatan usaha
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Laba Bersih (Net Income)</span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-2xl">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-sigap-darkest">
            {formatCurrency(currentMonth.netProfit)}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600">
            <ArrowUpRight className="w-3.5 h-3.5" /> Margin Laba: {currentMonth.margin}%
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Kesehatan Laba</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-xl font-display font-extrabold text-emerald-700">
            Sangat Sehat
          </div>
          <div className="text-xs text-slate-500 mt-2 font-medium">
            Rata-rata Margin 6 Bln: {avgMargin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sigap-primary" /> Tren Pendapatan vs Beban Operasional vs Laba
            </h2>
            <p className="text-xs text-slate-500 mt-1">Perbandingan 6 bulan terakhir dengan visualisasi batang bertumpuk & garis margin.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
            <button 
              onClick={() => setSelectedPeriod('3m')}
              className={`px-3 py-1.5 rounded-xl transition-all ${selectedPeriod === '3m' ? 'bg-white shadow text-sigap-darkest font-bold' : 'text-slate-600 hover:text-sigap-darkest'}`}
            >
              3 Bulan
            </button>
            <button 
              onClick={() => setSelectedPeriod('6m')}
              className={`px-3 py-1.5 rounded-xl transition-all ${selectedPeriod === '6m' ? 'bg-white shadow text-sigap-darkest font-bold' : 'text-slate-600 hover:text-sigap-darkest'}`}
            >
              6 Bulan
            </button>
            <button 
              onClick={() => setSelectedPeriod('year')}
              className={`px-3 py-1.5 rounded-xl transition-all ${selectedPeriod === 'year' ? 'bg-white shadow text-sigap-darkest font-bold' : 'text-slate-600 hover:text-sigap-darkest'}`}
            >
              Tahun 2026
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis 
                yAxisId="left" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `Rp ${(val / 1000000).toFixed(0)}Jt`} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#f59e0b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `${val}%`} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                  backgroundColor: '#0c1b33', 
                  color: '#fff',
                  padding: '12px 16px'
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'Margin Laba (%)') return [`${value}%`, name];
                  return [formatCurrency(Number(value)), name];
                }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}
              />
              <Bar yAxisId="left" dataKey="revenue" name="Total Pendapatan" fill="#006699" radius={[8, 8, 0, 0]} barSize={24} />
              <Bar yAxisId="left" dataKey="cogs" name="Harga Pokok Penjualan" fill="#94a3b8" radius={[8, 8, 0, 0]} barSize={24} />
              <Bar yAxisId="left" dataKey="opex" name="Beban Operasional" fill="#cbd5e1" radius={[8, 8, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="margin" name="Margin Laba (%)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs & Detailed Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2 p-1.5 bg-slate-200/60 rounded-2xl">
            <button
              onClick={() => setActiveTab('pnl')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'pnl' 
                  ? 'bg-sigap-darkest text-white shadow-md' 
                  : 'text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              Laporan Laba Rugi (P&L)
            </button>
            <button
              onClick={() => setActiveTab('cashflow')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'cashflow' 
                  ? 'bg-sigap-darkest text-white shadow-md' 
                  : 'text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              Laporan Arus Kas
            </button>
            <button
              onClick={() => setActiveTab('balance')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                activeTab === 'balance' 
                  ? 'bg-sigap-darkest text-white shadow-md' 
                  : 'text-slate-600 hover:text-sigap-darkest'
              }`}
            >
              Neraca Sederhana
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" /> Periode Buku: <strong>September 2026</strong>
          </div>
        </div>

        {/* Tab 1: P&L Statement */}
        {activeTab === 'pnl' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-sigap-darkest">Laporan Laba Rugi Komprehensif (SAK EMKM)</h3>
                <p className="text-xs text-slate-500">Kedai Kopi Senja — Periode 1 September 2026 s/d 30 September 2026</p>
              </div>
              <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                Status: Final & Diverifikasi
              </span>
            </div>

            <div className="space-y-4 text-sm">
              {/* Pendapatan Usaha */}
              <div>
                <div className="font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl flex justify-between">
                  <span>1. PENDAPATAN USAHA</span>
                  <span className="text-sigap-darkest">{formatCurrency(18250000)}</span>
                </div>
                <div className="divide-y divide-slate-100 px-4 py-2 space-y-1">
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Penjualan Minuman & Kopi (QRIS & Tunai)</span>
                    <span>{formatCurrency(15400000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Penjualan Makanan Ringan / Pastry</span>
                    <span>{formatCurrency(2850000)}</span>
                  </div>
                </div>
              </div>

              {/* HPP */}
              <div>
                <div className="font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl flex justify-between">
                  <span>2. BEBAN POKOK PENJUALAN (HPP)</span>
                  <span className="text-rose-600">({formatCurrency(7300000)})</span>
                </div>
                <div className="divide-y divide-slate-100 px-4 py-2 space-y-1">
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Biji Kopi Spesialti (Robusta & Arabika)</span>
                    <span>{formatCurrency(3100000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Susu Fresh Milk, Sirup, & Flavouring</span>
                    <span>{formatCurrency(2450000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Kemasan Paper Cup, Straw & Tas Takeaway</span>
                    <span>{formatCurrency(1750000)}</span>
                  </div>
                </div>
              </div>

              {/* Laba Kotor */}
              <div className="font-bold text-sigap-darkest bg-emerald-50 border border-emerald-200/60 px-4 py-3 rounded-2xl flex justify-between items-center text-base">
                <span>LABA KOTOR (GROSS PROFIT)</span>
                <span className="text-emerald-700 font-extrabold">{formatCurrency(10950000)}</span>
              </div>

              {/* Beban Operasional */}
              <div>
                <div className="font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl flex justify-between">
                  <span>3. BEBAN OPERASIONAL & UMUM</span>
                  <span className="text-rose-600">({formatCurrency(4800000)})</span>
                </div>
                <div className="divide-y divide-slate-100 px-4 py-2 space-y-1">
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Gaji Barista & Staf Kedai (2 Orang)</span>
                    <span>{formatCurrency(3000000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Listrik PLN, Air PDAM & Wi-Fi Kedai</span>
                    <span>{formatCurrency(1200000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Gas LPG & Perlengkapan Kebersihan</span>
                    <span>{formatCurrency(350000)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-600">
                    <span className="pl-4">Iklan Instagram & Promosi Lokal</span>
                    <span>{formatCurrency(250000)}</span>
                  </div>
                </div>
              </div>

              {/* Laba Bersih */}
              <div className="font-bold text-white bg-sigap-darkest px-6 py-4 rounded-3xl flex justify-between items-center text-lg shadow-xl">
                <div>
                  <span>LABA BERSIH BULAN INI (NET PROFIT)</span>
                  <span className="block text-xs font-normal text-white/70 mt-0.5">Setelah seluruh biaya operasional & bahan baku</span>
                </div>
                <span className="text-sigap-yellow font-extrabold text-2xl">{formatCurrency(6150000)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cash Flow Statement */}
        {activeTab === 'cashflow' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-sigap-darkest">Laporan Arus Kas Sederhana (Direct Method)</h3>
                <p className="text-xs text-slate-500">Mutasi kas masuk dan keluar secara riil di rekening bank dan dompet digital usaha.</p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center font-bold text-slate-700">
                <span>Saldo Kas Awal Bulan (1 September 2026)</span>
                <span className="text-sigap-darkest">{formatCurrency(18350000)}</span>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl flex justify-between">
                  <span>ARUS KAS DARI AKTIVITAS OPERASIONAL</span>
                  <span className="text-emerald-600 font-extrabold">+{formatCurrency(6150000)}</span>
                </div>
                <div className="px-4 space-y-1.5 text-slate-600 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>(+) Penerimaan Kas dari Penjualan Harian</span>
                    <span className="font-semibold text-emerald-600">+{formatCurrency(18250000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>(-) Pembayaran Bahan Baku ke Supplier</span>
                    <span className="font-semibold text-rose-600">-{formatCurrency(7300000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>(-) Pembayaran Beban Operasional & Gaji</span>
                    <span className="font-semibold text-rose-600">-{formatCurrency(4800000)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-2xl flex justify-between items-center font-bold text-emerald-800">
                <span>Kenaikan Bersih Kas Bulan Ini</span>
                <span className="text-xl font-extrabold">+{formatCurrency(6150000)}</span>
              </div>

              <div className="p-6 bg-sigap-darkest text-white rounded-3xl flex justify-between items-center font-bold text-lg shadow-lg">
                <div>
                  <span>Saldo Kas Akhir Bulan (30 September 2026)</span>
                  <span className="block text-xs font-normal text-white/70 mt-0.5">Kas di Bank BCA Demo (Rp 15 Jt) + Dompet Digital (Rp 9.5 Jt)</span>
                </div>
                <span className="text-sigap-yellow font-extrabold text-2xl">{formatCurrency(24500000)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Balance Sheet */}
        {activeTab === 'balance' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg font-display font-bold text-sigap-darkest">Ringkasan Posisi Keuangan (Neraca)</h3>
                <p className="text-xs text-slate-500">Keseimbangan Aset (Aktiva) dengan Liabilitas & Ekuitas Usaha.</p>
              </div>
              <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold">
                Kondisi: Seimbang (Balanced)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {/* Aktiva / Aset */}
              <div className="space-y-4">
                <div className="font-bold text-sigap-darkest bg-slate-100 px-4 py-2.5 rounded-xl flex justify-between">
                  <span>ASET (AKTIVA)</span>
                  <span>{formatCurrency(54500000)}</span>
                </div>

                <div className="border rounded-2xl p-4 space-y-3 bg-white">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Aset Lancar</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Kas di Bank & Dompet Digital</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(24500000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Persediaan Bahan Baku (Kopi & Susu)</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(3500000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Piutang QRIS Belum Settled</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(1500000)}</span>
                  </div>
                </div>

                <div className="border rounded-2xl p-4 space-y-3 bg-white">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Aset Tetap (Nilai Buku)</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Mesin Espresso & Grinder Profesional</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(18000000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Meja Bar, Interior & AC Kedai</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(7000000)}</span>
                  </div>
                </div>
              </div>

              {/* Liabilitas & Ekuitas */}
              <div className="space-y-4">
                <div className="font-bold text-sigap-darkest bg-slate-100 px-4 py-2.5 rounded-xl flex justify-between">
                  <span>KEWAJIBAN & MODAL</span>
                  <span>{formatCurrency(54500000)}</span>
                </div>

                <div className="border rounded-2xl p-4 space-y-3 bg-white">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Kewajiban (Liabilitas)</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Utang Usaha Supplier (Jatuh Tempo 14 Hari)</span>
                    <span className="font-semibold text-rose-600">{formatCurrency(2500000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Pinjaman Modal Kerja Bank</span>
                    <span className="font-semibold text-slate-400">Rp 0 (Bebas Utang)</span>
                  </div>
                </div>

                <div className="border rounded-2xl p-4 space-y-3 bg-white">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Ekuitas (Modal Sendiri)</div>
                  <div className="flex justify-between text-slate-600">
                    <span>Modal Awal Disetor</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(35000000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Laba Ditahan Akumulasi</span>
                    <span className="font-semibold text-sigap-darkest">{formatCurrency(10850000)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Laba Berjalan Bulan Ini</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(6150000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Callout */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-sigap-primary">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sigap-darkest text-sm">Butuh Verifikasi Bank untuk Pengajuan KUR?</h4>
            <p className="text-xs text-slate-500">Laporan ini telah ditandatangani secara digital dengan segel hash integritas SIGAP.</p>
          </div>
        </div>
        <Link href="/financing">
          <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl font-bold text-xs px-5">
            Ajukan ke Marketplace &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}
