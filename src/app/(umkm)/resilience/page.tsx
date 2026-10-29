"use client";

import { Button } from "@/components/ui/button";
import { PremiumFeatureLock } from "@/components/ui/PremiumFeatureLock";
import { useDemo } from "@/lib/context/DemoContext";
import {
AlertTriangle,
ArrowRight,
CalendarDays,
Sparkles,
Zap
} from "lucide-react";
import { motion } from "motion/react";
import Link from 'next/link';
import { useEffect,useMemo,useState } from 'react';
import {
Area,
AreaChart,
CartesianGrid,
ReferenceLine,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function ResiliencePage() {
  const { data } = useDemo();
  const balance = data.dashboard.metrics.total_balance;
  const baseExpense = data.dashboard.metrics.expense_this_month;
  const baseIncome = data.dashboard.metrics.income_this_month;
  
  const [activeScenario, setActiveScenario] = useState<'base' | 'pessimistic_a' | 'pessimistic_b'>('base');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Scenario parameters
  // Base: normal income & expense
  // Pesimis A: revenue drops 25%, expenses constant (high cash drain)
  // Beban B: expenses jump 30% (inflasi bahan baku)
  const scenarioConfig = useMemo(() => {
    if (activeScenario === 'pessimistic_a') {
      const inc = baseIncome * 0.75;
      const exp = baseExpense;
      const netMonthly = inc - exp;
      const burnRate = Math.abs(Math.min(0, netMonthly)) || baseExpense * 0.4;
      return {
        title: "Skenario Penurunan Omzet (-25%)",
        desc: "Daya beli konsumen menurun, beban operasional tetap harus dibayar.",
        monthlyNet: netMonthly,
        burnRate: burnRate,
        color: "#f59e0b"
      };
    }
    if (activeScenario === 'pessimistic_b') {
      const inc = baseIncome;
      const exp = baseExpense * 1.30;
      const netMonthly = inc - exp;
      const burnRate = Math.abs(Math.min(0, netMonthly)) || baseExpense * 0.3;
      return {
        title: "Skenario Lonjakan Biaya Operasional (+30%)",
        desc: "Kenaikan harga bahan baku dan tarif utilitas memangkas arus kas bersih.",
        monthlyNet: netMonthly,
        burnRate: burnRate,
        color: "#f43f5e"
      };
    }
    // Base
    const netMonthly = baseIncome - baseExpense;
    return {
      title: "Skenario Dasar (Normal)",
      desc: "Tren omzet dan pengeluaran stabil mengikuti pola 3 bulan terakhir.",
      monthlyNet: netMonthly,
      burnRate: baseExpense,
      color: "#3F6593"
    };
  }, [activeScenario, baseIncome, baseExpense]);

  // Projected 6 Months Cash Balance Data
  const projectionData = useMemo(() => {
    const months = ["Bln 1", "Bln 2", "Bln 3", "Bln 4", "Bln 5", "Bln 6"];
    let currentBalance = balance;
    
    return months.map((m, idx) => {
      // Monthly delta
      currentBalance = Math.max(0, currentBalance + scenarioConfig.monthlyNet);
      return {
        month: m,
        fullMonth: `Bulan ke-${idx + 1}`,
        balance: Math.round(currentBalance),
        safeThreshold: 15000000,
        criticalThreshold: 5000000
      };
    });
  }, [balance, scenarioConfig]);

  // Runway calculation
  const runwayMonths = scenarioConfig.monthlyNet >= 0 
    ? 24 // Cash positive, virtually infinite runway
    : Math.max(0, balance / scenarioConfig.burnRate);

  let statusText = "LIKUIDITAS SEHAT";
  let statusBadge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  let dotColor = "bg-emerald-400";

  if (runwayMonths < 3) {
    statusText = "ZONA KRITIS";
    statusBadge = "bg-rose-500/20 text-rose-300 border-rose-500/30";
    dotColor = "bg-rose-400";
  } else if (runwayMonths < 6) {
    statusText = "ZONA WASPADA";
    statusBadge = "bg-amber-500/20 text-amber-300 border-amber-500/30";
    dotColor = "bg-amber-400";
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sigap-yellow/15 text-sigap-yellow-dark px-3 py-1 text-xs font-bold mb-3 border border-sigap-yellow/30">
            <Sparkles className="h-3.5 w-3.5" />
            Fitur Eksklusif SIGAP Premium
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-sigap-darkest">
            Simulasi Ketahanan Usaha &amp; Runway
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-xl leading-relaxed">
            Stress-testing arus kas 6 bulan ke depan untuk mengantisipasi krisis likuiditas sebelum terjadi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">
            <CalendarDays className="h-4 w-4 text-sigap-primary" />
            <span>Horizon Analisis: 6 Bulan</span>
          </div>
        </div>
      </motion.div>

      <PremiumFeatureLock>
        <div className="space-y-8">
          
          {/* Main Hero Card: Runway Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-8 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex-1">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-extrabold border ${statusBadge}`}>
                  <span className={`h-2 w-2 rounded-full ${dotColor} animate-pulse`} />
                  {statusText}
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-sigap-light border border-white/15">
                  SIMULASI RESILIENSI
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Estimasi Runway:{" "}
                <span className="text-sigap-yellow">
                  {runwayMonths >= 24 ? '> 24 Bulan (Arus Kas Positif)' : `${runwayMonths.toFixed(1)} Bulan`}
                </span>
              </h3>

              <p className="mt-3 text-sm md:text-base text-sigap-light/80 max-w-xl leading-relaxed">
                Dengan cadangan kas <strong className="text-white">{formatCurrency(balance)}</strong> dan estimasi arus kas bulanan ({formatCurrency(scenarioConfig.monthlyNet)}/bln), bisnis Anda{" "}
                {runwayMonths >= 6 
                  ? "memiliki bantalan likuiditas yang kokoh untuk berekspansi maupun menghadapi gejolak pasar."
                  : "perlu segera menyiapkan fasilitas kredit siaga atau restrukturisasi pengeluaran non-prioritas."
                }
              </p>
            </div>

            <div className="relative z-10 rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/15 w-full lg:w-80 shrink-0 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-sigap-light/70 block">
                Rekomendasi Strategis
              </span>
              <p className="font-display font-bold text-base text-white mt-1 mb-4">
                {runwayMonths >= 6 ? "Amankan Modal Kerja Cadangan" : "Ajukan Fasilitas Kredit Siaga (Standby)"}
              </p>

              {runwayMonths < 6 ? (
                <Link href="/financing" className="block w-full">
                  <Button className="w-full rounded-xl bg-sigap-yellow hover:bg-amber-400 text-sigap-darkest font-extrabold text-xs h-11 shadow-md">
                    Bandingkan Kredit Siaga <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/bookkeeping" className="block w-full">
                  <Button className="w-full rounded-xl bg-white hover:bg-sigap-light text-sigap-darkest font-extrabold text-xs h-11 shadow-md">
                    Optimalisasi Pembukuan
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>

          {/* Scenario Grid & Modern Recharts Projection Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Scenario Switcher - 4 cols */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-sigap-yellow" />
                  <h3 className="font-display text-lg font-bold text-sigap-darkest">Pilih Skenario Pasar</h3>
                </div>
                <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                  Pilih kondisi makro untuk melihat bagaimana ketahanan saldo kas berubah secara instan.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      id: 'base',
                      title: 'Skenario Normal (Dasar)',
                      desc: 'Tren arus kas saat ini berlanjut stabil.',
                      badge: 'Laba +Rp6,15 Jt/bln',
                      badgeColor: 'text-emerald-700 bg-emerald-50'
                    },
                    {
                      id: 'pessimistic_a',
                      title: 'Skenario Penurunan Omzet',
                      desc: 'Penjualan merosot 25% (musim sepi).',
                      badge: 'Tekanan Arus Kas',
                      badgeColor: 'text-amber-700 bg-amber-50'
                    },
                    {
                      id: 'pessimistic_b',
                      title: 'Skenario Kenaikan Biaya',
                      desc: 'Beban operasional & bahan baku melonjak +30%.',
                      badge: 'Penyusutan Margin',
                      badgeColor: 'text-rose-700 bg-rose-50'
                    }
                  ].map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => setActiveScenario(sc.id as any)}
                      className={`rounded-2xl p-4 border cursor-pointer transition-all ${
                        activeScenario === sc.id
                          ? "border-sigap-primary bg-sigap-light/15 shadow-sm ring-1 ring-sigap-primary"
                          : "border-slate-200/80 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-display font-bold text-sm text-sigap-darkest">{sc.title}</h4>
                        {activeScenario === sc.id && (
                          <span className="h-2 w-2 rounded-full bg-sigap-primary" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{sc.desc}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.badgeColor}`}>
                        {sc.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stress testing warning */}
              {activeScenario !== 'base' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 shadow-xs text-xs space-y-2 text-amber-900"
                >
                  <div className="flex items-center gap-2 font-bold">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>Peringatan Dini Likuiditas</span>
                  </div>
                  <p className="leading-relaxed text-amber-800">
                    Pada skenario ini, cadangan kas tergerus lebih cepat. Mempersiapkan plafon pinjaman modal kerja sebelum saldo menyentuh zona kritis adalah praktik mitigasi terbaik.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Column: Dynamic Recharts Projection Chart - 8 cols */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-sigap-primary">Kurva Proyeksi Likuiditas</span>
                    <h3 className="font-display text-xl font-bold text-sigap-darkest mt-0.5">
                      Proyeksi Saldo Kas 6 Bulan ke Depan
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-bold border border-slate-200">
                    {scenarioConfig.title.split('(')[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Garis proyeksi memperlihatkan akumulasi saldo kas jika kondisi skenario terpilih terjadi.
                </p>
              </div>

              {/* Recharts Area Container */}
              <div className="h-72 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="resilienceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={scenarioConfig.color} stopOpacity={0.35}/>
                          <stop offset="95%" stopColor={scenarioConfig.color} stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#64748b' }} 
                        dy={8} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#64748b' }} 
                        tickFormatter={(val) => `${(val / 1000000).toFixed(0)}Jt`} 
                      />
                      <Tooltip 
                        formatter={(val: number) => [formatCurrency(val), "Saldo Kas Proyeksi"]}
                        contentStyle={{ 
                          backgroundColor: '#000F22', 
                          borderRadius: '16px', 
                          border: 'none', 
                          color: '#fff', 
                          fontSize: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' 
                        }}
                        labelStyle={{ color: '#C0E6FD', fontWeight: 'bold' }}
                      />
                      <ReferenceLine y={15000000} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Batas Kas Aman (Rp15 Jt)', fill: '#10b981', fontSize: 10, position: 'insideTopRight' }} />
                      <ReferenceLine y={5000000} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Zona Kritis (Rp5 Jt)', fill: '#f43f5e', fontSize: 10, position: 'insideTopRight' }} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Saldo Kas" 
                        stroke={scenarioConfig.color} 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#resilienceGrad)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
                    Memuat kurva proyeksi...
                  </div>
                )}
              </div>

              {/* Threshold explanation */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600 font-semibold">&gt; Rp 15 Jt (Zona Aman)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    <span className="text-slate-600 font-semibold">&lt; Rp 5 Jt (Zona Kritis)</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  Saldo Awal: {formatCurrency(balance)}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </PremiumFeatureLock>
    </div>
  );
}

