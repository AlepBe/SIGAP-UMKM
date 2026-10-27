"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  ArrowUpRight,
  Activity,
  Zap,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicDemoData } from "@/lib/public-demo-data";
import { formatJuta, formatIDR } from "@/lib/format";

const liveTransactions = [
  { id: 1, text: "QRIS Masuk", amount: "+Rp 125.000", time: "Baru saja", type: "income" },
  { id: 2, text: "Pencairan E-Wallet", amount: "+Rp 850.000", time: "2 mnt lalu", type: "income" },
  { id: 3, text: "Penjualan Kasir", amount: "+Rp 320.000", time: "5 mnt lalu", type: "income" },
  { id: 4, text: "Bahan Baku Biji Kopi", amount: "-Rp 450.000", time: "12 mnt lalu", type: "expense" },
];

export function HeroInteractive() {
  const [activeTxIndex, setActiveTxIndex] = useState(0);
  const [activeScoreTab, setActiveScoreTab] = useState<"cashflow" | "growth" | "matching">("cashflow");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTxIndex((prev) => (prev + 1) % liveTransactions.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentTx = liveTransactions[activeTxIndex];
  const { score, metrics, business } = publicDemoData;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Decorative Mesh & Glows using exact sigap palette */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Top subtle blue glow */}
        <div className="absolute -top-32 left-1/2 h-[480px] w-[750px] -translate-x-1/2 rounded-full bg-gradient-to-b from-sigap-light/40 via-sigap-soft/20 to-transparent blur-3xl" />
        {/* Side ambient blob */}
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-sigap-secondary/15 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-sigap-primary/10 blur-3xl animate-blob [animation-delay:4s]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-sigap-primary/25 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-sigap-darkest shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sigap-primary font-bold">SIGAP Gateway 2.0</span>
              <span className="h-3 w-px bg-slate-300" />
              <span className="text-slate-600">Simulasi Ekosistem Finansial UMKM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-balance font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-sigap-darkest leading-[1.08]"
            >
              Ubah Data Transaksi Jadi{" "}
              <span className="bg-gradient-to-r from-sigap-darkest via-sigap-primary to-sigap-secondary bg-clip-text text-transparent underline decoration-sigap-light decoration-4 underline-offset-8">
                Kekuatan Usaha
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
            >
              Hubungkan QRIS & e-wallet otomatis, monitor skor kelayakan kredit real-time, 
              dan buka pintu ke pembiayaan legal institusional terpercaya tanpa birokrasi rumit.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/register">
                <Button 
                  size="lg" 
                  className="rounded-full bg-sigap-darkest text-white hover:bg-sigap-dark h-13 px-8 text-base font-semibold shadow-lg shadow-sigap-darkest/15 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group"
                >
                  Mulai Sekarang Gratis
                  <span className="ml-2.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </Button>
              </Link>

              <Link href="#demo">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full border-sigap-primary/30 bg-white/80 text-sigap-darkest hover:bg-sigap-light/30 hover:border-sigap-primary h-13 px-7 text-base font-semibold shadow-sm backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-sigap-primary" />
                  Coba Demo Interaktif
                </Button>
              </Link>
            </motion.div>

            {/* Trust and Social Proof Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t border-slate-200/80"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-slate-700">Terproteksi Sesuai Standar OJK</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-slate-700">Analisis Otomatis 10 Detik</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sigap-primary" />
                <span className="font-medium text-slate-700">100% Produk Legal</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Animated Bento Financial Hub */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Showcase Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-sigap-primary/10 backdrop-blur-xl"
            >
              {/* Card Header with Business Identity & Simulated Status */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sigap-darkest text-white shadow-sm font-display font-bold text-sm">
                    KS
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-sigap-darkest leading-tight">{business.name}</h4>
                    <p className="text-xs text-slate-500">{business.business_type} • {business.city}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Profil Aktif
                </div>
              </div>

              {/* Dynamic Interactive Metrics & Score Display */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                
                {/* Score Card Component */}
                <div className="rounded-2xl bg-gradient-to-br from-sigap-darkest to-sigap-dark p-4 text-white shadow-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-sigap-primary/30 blur-xl group-hover:bg-sigap-primary/50 transition-colors" />
                  <p className="text-[11px] font-medium text-sigap-light/80 uppercase tracking-wider">Skor SIGAP</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-white">{score.value}</span>
                    <span className="text-xs text-sigap-light/70 font-medium">/{score.max}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                    Grade {score.grade} • {score.label}
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(score.value / score.max) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-sigap-soft to-sigap-light" 
                    />
                  </div>
                </div>

                {/* Net Profit & Cashflow Pulse */}
                <div className="rounded-2xl border border-sigap-primary/15 bg-sigap-light/30 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold text-sigap-dark/80 uppercase tracking-wider">Laba Bersih</p>
                    <p className="mt-1 font-display text-2xl font-bold text-sigap-darkest leading-none">
                      Rp {formatJuta(metrics.netProfit)} jt
                    </p>
                    <div className="mt-1.5 flex items-center text-xs font-semibold text-emerald-600">
                      <TrendingUp className="mr-1 h-3.5 w-3.5" />
                      +28.4% bulan ini
                    </div>
                  </div>
                  
                  {/* Mini Visual Sparkline Wave */}
                  <div className="mt-2 pt-2 border-t border-sigap-dark/10">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <span>Saldo Total</span>
                      <span className="font-semibold text-sigap-darkest">Rp {formatJuta(metrics.totalBalance)} jt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Tabs: Explore Score Breakdown */}
              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="flex gap-1 rounded-xl bg-slate-200/60 p-1 text-xs">
                  <button
                    onClick={() => setActiveScoreTab("cashflow")}
                    className={`flex-1 rounded-lg py-1.5 text-center font-semibold transition-all ${
                      activeScoreTab === "cashflow" 
                        ? "bg-white text-sigap-darkest shadow-sm" 
                        : "text-slate-600 hover:text-sigap-darkest"
                    }`}
                  >
                    Arus Kas
                  </button>
                  <button
                    onClick={() => setActiveScoreTab("growth")}
                    className={`flex-1 rounded-lg py-1.5 text-center font-semibold transition-all ${
                      activeScoreTab === "growth" 
                        ? "bg-white text-sigap-darkest shadow-sm" 
                        : "text-slate-600 hover:text-sigap-darkest"
                    }`}
                  >
                    Kredensial
                  </button>
                  <button
                    onClick={() => setActiveScoreTab("matching")}
                    className={`flex-1 rounded-lg py-1.5 text-center font-semibold transition-all ${
                      activeScoreTab === "matching" 
                        ? "bg-white text-sigap-darkest shadow-sm" 
                        : "text-slate-600 hover:text-sigap-darkest"
                    }`}
                  >
                    Peluang Modal
                  </button>
                </div>

                {/* Tab Content Display with Animation */}
                <div className="mt-3 text-xs">
                  {activeScoreTab === "cashflow" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          Pemasukan Bulan Ini
                        </span>
                        <span className="font-bold text-emerald-700">{formatIDR(metrics.incomeThisMonth)}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-400" />
                          Pengeluaran Terkontrol
                        </span>
                        <span className="font-bold text-slate-800">{formatIDR(metrics.expenseThisMonth)}</span>
                      </div>
                    </motion.div>
                  )}

                  {activeScoreTab === "growth" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-1.5"
                    >
                      <p className="font-medium text-slate-700">Faktor penentu skor saat ini:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 font-medium text-[10px]">
                          ✓ Arus Kas Stabil
                        </span>
                        <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 font-medium text-[10px]">
                          ✓ Rasio Beban 66%
                        </span>
                        <span className="rounded-md bg-blue-100 text-blue-800 px-2 py-0.5 font-medium text-[10px]">
                          ✓ Modul Literasi Selesai
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {activeScoreTab === "matching" && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-sigap-darkest">Kredit Modal Usaha</p>
                        <p className="text-[10px] text-slate-500">Plafon s/d Rp 500 Jt • Bunga 0.5%/bln</p>
                      </div>
                      <span className="rounded-full bg-sigap-primary text-white px-2.5 py-1 font-semibold text-[10px]">
                        Sangat Cocok
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Real-time Ticker Notification */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200/70 bg-white p-2.5 shadow-sm">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentTx.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 truncate"
                    >
                      <span className="font-medium text-xs text-sigap-darkest truncate">{currentTx.text}</span>
                      <span className={`text-xs font-bold ${currentTx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {currentTx.amount}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="shrink-0 text-[10px] text-slate-400 pl-2">{currentTx.time}</span>
              </div>
            </motion.div>

            {/* Floating Floating Accent Pill 1: Match Alert */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex absolute -top-5 -left-6 items-center gap-3 rounded-2xl border border-white bg-white/95 p-3.5 shadow-xl shadow-sigap-darkest/10 backdrop-blur-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sigap-primary text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-sigap-darkest">3 Mitra Pembiayaan Siap</p>
                <p className="text-[11px] text-slate-500">Plafon hingga Rp 2 Miliar</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-sigap-primary ml-1" />
            </motion.div>

            {/* Floating Floating Accent Pill 2: Security Badge */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden sm:flex absolute -bottom-4 -right-4 items-center gap-2.5 rounded-full border border-white bg-sigap-darkest text-white px-4 py-2.5 shadow-xl shadow-sigap-darkest/20"
            >
              <ShieldCheck className="h-4 w-4 text-sigap-light" />
              <span className="text-xs font-semibold">Anti-Pinjol Ilegal Verified</span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
