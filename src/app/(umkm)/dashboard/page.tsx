"use client";

import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";
import { useSubscription } from "@/lib/context/SubscriptionContext";
import {
Activity,
AlertCircle,
ArrowRight,
ArrowUpRight,BookOpen,
ChevronRight,
DollarSign,
Layers,
Sparkles,
TrendingUp,
Wallet
} from "lucide-react";
import { motion } from "motion/react";
import Link from 'next/link';
import React,{ useEffect,useState } from 'react';
import {
Area,
AreaChart,
Bar,
BarChart,
CartesianGrid,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

interface CashflowPoint {
  label: string;
  income: number;
  expense: number;
  net: number;
  date?: string;
}

export default function DashboardPage() {
  const { data } = useDemo();
  const { subscription } = useSubscription();
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState<"7 Hari" | "30 Hari" | "3 Bulan">("30 Hari");
  const [chartType, setChartType] = useState<"area" | "bar">("area");

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = data.users[0] || { name: 'Budi Santoso', profile_completion: 6 };
  const business = data.businesses[0] || { name: 'Kedai Kopi Senja', profile_status: 'Aktif' };
  const dashboard = data.dashboard;
  const score = data.credit_score;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Prepare cashflow data based on period
  const chartData: CashflowPoint[] = React.useMemo(() => {
    const rawCashflow = dashboard.cashflow_30d || [];
    if (period === "7 Hari") {
      return rawCashflow.slice(-4).map(d => ({
        ...d,
        label: d.date.split('-').slice(1).join('/'),
        net: d.income - d.expense
      }));
    }
    if (period === "3 Bulan") {
      // Aggregate into 3 month blocks for informative display
      return [
        { label: "Juli 2026", income: 16500000, expense: 11400000, net: 5100000 },
        { label: "Agustus 2026", income: 17800000, expense: 11800000, net: 6000000 },
        { label: "September 2026", income: dashboard.metrics.income_this_month, expense: dashboard.metrics.expense_this_month, net: dashboard.metrics.net_profit },
      ];
    }
    return rawCashflow.map(d => ({
      ...d,
      label: d.date.split('-').slice(1).join('/'),
      net: d.income - d.expense
    }));
  }, [dashboard.cashflow_30d, period, dashboard.metrics]);

  const totalPeriodIncome = chartData.reduce((acc: number, curr: CashflowPoint) => acc + curr.income, 0);
  const totalPeriodExpense = chartData.reduce((acc: number, curr: CashflowPoint) => acc + curr.expense, 0);
  const totalPeriodNet = totalPeriodIncome - totalPeriodExpense;
  const expenseRatio = totalPeriodIncome > 0 ? Math.round((totalPeriodExpense / totalPeriodIncome) * 100) : 0;

  // Score radial calculation
  const scorePercent = Math.min(100, Math.round((score.score / score.max_score) * 100));
  const strokeDashoffset = 283 - (283 * scorePercent) / 100;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-sigap-light/40 text-sigap-darkest px-3 py-1 text-xs font-bold mb-3 border border-sigap-primary/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Operasional Bisnis Aktif
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-sigap-darkest tracking-tight">
            Selamat Datang, {user.name.split(' ')[0]} 👋
          </h2>
          <p className="mt-1 text-sm md:text-base text-slate-500 max-w-xl leading-relaxed">
            Berikut ringkasan visual kesehatan finansial <span className="font-bold text-sigap-darkest">{business.name}</span>. Data tersinkronisasi otomatis dari catatan transaksi.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap sm:flex-col items-start sm:items-end gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs">
            <span className="text-slate-400 font-medium">Profil Kelayakan:</span>
            <span className="font-bold text-sigap-darkest">{business.profile_status} ({user.profile_completion}/8)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Terakhir sinkronisasi: Hari ini, 12:00 WIB</span>
        </div>
      </motion.div>

      {/* Subscription Alert Pill */}
      {subscription.plan === 'free' && (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-sigap-darkest via-sigap-dark to-[#0f2442] p-6 text-white shadow-xl shadow-sigap-darkest/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sigap-yellow/20 text-sigap-yellow border border-sigap-yellow/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Buka Simulator Ketahanan Usaha &amp; Prediksi Kas 6 Bulan</h3>
              <p className="text-xs text-sigap-light/80 mt-0.5">Tingkatkan visibilitas risiko bisnis dan dapatkan laporan keuangan berstandar perbankan.</p>
            </div>
          </div>
          <Link href="/premium" className="shrink-0">
            <Button className="rounded-full bg-sigap-yellow hover:bg-amber-400 text-sigap-darkest font-extrabold text-xs px-6 shadow-md transition-transform hover:scale-105">
              Coba SIGAP Premium <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </motion.div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Saldo Kas & Bank",
            amount: formatCurrency(dashboard.metrics.total_balance),
            badge: "Likuiditas Siap Pakai",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200/60",
            icon: Wallet,
            desc: "Gabungan BCA & QRIS Merchant"
          },
          {
            title: "Pemasukan Bulan Ini",
            amount: formatCurrency(dashboard.metrics.income_this_month),
            trend: `+${dashboard.metrics.income_change_pct}%`,
            isPositive: true,
            icon: TrendingUp,
            desc: "Tren penjualan meningkat dari bulan lalu"
          },
          {
            title: "Pengeluaran Operasional",
            amount: formatCurrency(dashboard.metrics.expense_this_month),
            trend: `${dashboard.metrics.expense_change_pct}%`,
            isPositive: true, // negative expense is good
            icon: DollarSign,
            desc: "Efisiensi biaya berhasil ditekan"
          },
          {
            title: "Laba Bersih Usaha",
            amount: formatCurrency(dashboard.metrics.net_profit),
            trend: `+${dashboard.metrics.profit_change_pct}%`,
            isPositive: true,
            highlight: true,
            icon: Activity,
            desc: "Margin laba sehat di atas rata-rata"
          }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * idx }}
              whileHover={{ y: -3 }}
              className={`rounded-3xl border p-6 transition-all duration-300 shadow-sm hover:shadow-md ${
                kpi.highlight 
                  ? "border-sigap-yellow/40 bg-gradient-to-br from-white via-amber-50/20 to-sigap-light/20 shadow-amber-500/5 ring-1 ring-sigap-yellow/20"
                  : "border-slate-200/80 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500">{kpi.title}</span>
                <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  kpi.highlight ? "bg-sigap-darkest text-sigap-yellow" : "bg-slate-100 text-slate-600"
                }`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="font-display text-2xl md:text-3xl font-extrabold text-sigap-darkest tracking-tight">
                {kpi.amount}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                {kpi.trend ? (
                  <div className="inline-flex items-center gap-1 font-bold text-emerald-600">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span>{kpi.trend} vs bln lalu</span>
                  </div>
                ) : (
                  <span className={`font-semibold px-2 py-0.5 rounded-full border text-[10px] ${kpi.badgeColor}`}>
                    {kpi.badge}
                  </span>
                )}
                <span className="text-[11px] text-slate-400 truncate max-w-[130px]">{kpi.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts & Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Modern Interactive Arus Kas Chart - 8 cols */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm flex flex-col justify-between"
        >
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-sigap-primary uppercase tracking-wider mb-1">
                <TrendingUp className="h-3.5 w-3.5" />
                Dinamika Finansial
              </div>
              <h3 className="font-display text-2xl font-bold text-sigap-darkest">
                Monitor Arus Kas &amp; Pertumbuhan Laba
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluasi stabilitas kas harian dan kapasitas angsuran pembiayaan usaha.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Period Switcher */}
              <div className="inline-flex rounded-xl bg-slate-100 p-1">
                {(["7 Hari", "30 Hari", "3 Bulan"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      period === p
                        ? "bg-white text-sigap-darkest shadow-xs font-bold"
                        : "text-slate-500 hover:text-sigap-darkest"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Chart type toggle */}
              <div className="inline-flex rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setChartType("area")}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    chartType === "area" ? "bg-white text-sigap-darkest shadow-xs font-bold" : "text-slate-500"
                  }`}
                  title="Area Trend"
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                    chartType === "bar" ? "bg-white text-sigap-darkest shadow-xs font-bold" : "text-slate-500"
                  }`}
                  title="Bar Comparison"
                >
                  Bar
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Pemasukan Periode</span>
              <p className="font-display font-bold text-base md:text-lg text-emerald-600">{formatCurrency(totalPeriodIncome)}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Pengeluaran Periode</span>
              <p className="font-display font-bold text-base md:text-lg text-slate-700">{formatCurrency(totalPeriodExpense)}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Surplus Bersih</span>
              <p className={`font-display font-bold text-base md:text-lg ${totalPeriodNet >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
                {formatCurrency(totalPeriodNet)}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Rasio Beban (Burn)</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-display font-bold text-base md:text-lg text-sigap-darkest">{expenseRatio}%</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Sehat</span>
              </div>
            </div>
          </div>

          {/* Recharts Area/Bar Container */}
          <div className="h-72 w-full pt-2">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "area" ? (
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="dashIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                      </linearGradient>
                      <linearGradient id="dashExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3F6593" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#3F6593" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="label" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#64748b' }} 
                      dy={8} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#64748b' }} 
                      tickFormatter={(val) => `${(val / 1000000).toFixed(1)}Jt`} 
                    />
                    <Tooltip 
                      formatter={(val: number) => [formatCurrency(val), ""]}
                      contentStyle={{ 
                        backgroundColor: '#000F22', 
                        borderRadius: '16px', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        color: '#fff', 
                        fontSize: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' 
                      }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      labelStyle={{ color: '#C0E6FD', fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="income" 
                      name="Pemasukan" 
                      stroke="#10b981" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#dashIncomeGrad)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expense" 
                      name="Pengeluaran" 
                      stroke="#3F6593" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#dashExpenseGrad)" 
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={8} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(val) => `${(val / 1000000).toFixed(1)}Jt`} />
                    <Tooltip 
                      formatter={(val: number) => [formatCurrency(val), ""]}
                      contentStyle={{ backgroundColor: '#000F22', borderRadius: '16px', border: 'none', color: '#fff' }}
                    />
                    <Bar dataKey="income" name="Pemasukan" fill="#10b981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="expense" name="Pengeluaran" fill="#3F6593" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
                Memuat grafik arus kas...
              </div>
            )}
          </div>

          {/* Chart Legend & Insight */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-600">Pemasukan Usaha</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-sigap-primary" />
                <span className="font-semibold text-slate-600">Beban Operasional</span>
              </div>
            </div>

            <Link href="/bookkeeping" className="inline-flex items-center gap-1 font-bold text-sigap-primary hover:text-sigap-darkest transition-colors">
              Buka Rincian Pembukuan <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Animated Credit Score Meter & Actions - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Credit Score Radial Gauge Card */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-7 text-white shadow-xl shadow-sigap-darkest/20 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-sigap-primary/30 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sigap-light/70">Kesiapan Finansial</span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">Skor SIGAP Alternatif</h3>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-sigap-light border border-white/20">
                SIMULASI
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="relative h-44 w-44 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  {/* Track circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="8" 
                  />
                  {/* Animated Progress Circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="url(#scoreGrad)" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={strokeDashoffset} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center text-center">
                  <span className="font-display text-4xl font-extrabold text-white tracking-tight">{score.score}</span>
                  <span className="text-[11px] text-sigap-light/60 font-semibold">dari {score.max_score}</span>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                    Grade {score.grade}
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-sigap-light/80 mt-2 max-w-xs leading-relaxed">
                Kondisi arus kas Anda dinilai <strong className="text-white">{score.label}</strong> untuk pengajuan pinjaman produktif.
              </p>
            </div>

            {/* Mini breakdown indicators */}
            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <div className="flex justify-between items-center text-sigap-light/70">
                <span>Stabilitas Kas (20+ hari/bln)</span>
                <span className="font-bold text-emerald-400">95%</span>
              </div>
              <div className="flex justify-between items-center text-sigap-light/70">
                <span>Rasio Beban Biaya (&lt;60%)</span>
                <span className="font-bold text-emerald-400">90%</span>
              </div>
            </div>

            <Link href="/credit-score" className="mt-5 block">
              <Button className="w-full rounded-2xl bg-white text-sigap-darkest hover:bg-sigap-light font-bold text-xs h-11 transition-all shadow-md">
                Eksplorasi Skor &amp; Faktor Lengkap <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>

          {/* Action Recommendations */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-sigap-darkest mb-4">
              Langkah Direkomendasikan
            </h3>
            <div className="space-y-3">
              <Link href="/bookkeeping" className="group flex items-start gap-3.5 rounded-2xl p-3 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-sigap-darkest group-hover:text-sigap-primary transition-colors">Verifikasi Pengeluaran</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Catat bukti kas operasional minggu ini.</p>
                </div>
              </Link>

              <Link href="/financing" className="group flex items-start gap-3.5 rounded-2xl p-3 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-sigap-darkest group-hover:text-sigap-primary transition-colors">Peluang Pembiayaan KUR</h4>
                  <p className="text-xs text-slate-500 mt-0.5">3 produk mitra cocok dengan skor Anda.</p>
                </div>
              </Link>

              <Link href="/learning" className="group flex items-start gap-3.5 rounded-2xl p-3 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-sigap-darkest group-hover:text-sigap-primary transition-colors">Modul Pemisahan Kas</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Tambah +10 poin ke profil kredit Anda.</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

