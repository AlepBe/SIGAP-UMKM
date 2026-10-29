"use client";

import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";
import {
Activity,
AlertTriangle,
ArrowRight,BookOpen,
CheckCircle2,
RefreshCw,
ShieldAlert,
Sliders,
Sparkles,
TrendingUp
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo,useState } from "react";

export default function CreditScorePage() {
  const { data } = useDemo();
  const baseScoreData = data.credit_score;

  // Simulator state
  const [simTxCount, setSimTxCount] = useState<number>(data.transactions.length);
  const [simLitCount, setSimLitCount] = useState<number>(data.literacy_modules.filter(m => m.status === 'completed').length);
  const [simProfitMargin, setSimProfitMargin] = useState<number>(34); // ~34% net profit margin

  // Dynamic calculated score
  const calculatedScore = useMemo(() => {
    let base = 680;
    
    // Transaction volume factor (max +60)
    base += Math.min(60, simTxCount * 3);

    // Literacy completion factor (max +50)
    base += Math.min(50, simLitCount * 12);

    // Profit margin factor (max +60)
    if (simProfitMargin > 30) base += 60;
    else if (simProfitMargin > 20) base += 40;
    else if (simProfitMargin > 10) base += 20;

    return Math.min(Math.max(base, 300), 850);
  }, [simTxCount, simLitCount, simProfitMargin]);

  // Determine grade and styling
  let grade = "C";
  let label = "Cukup";
  let gradeColor = "text-amber-500 bg-amber-500/10 border-amber-500/30";
  let bankReadiness = "Memerlukan Riwayat Tambahan";

  if (calculatedScore >= 800) { 
    grade = "A+"; 
    label = "Sangat Prima"; 
    gradeColor = "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
    bankReadiness = "Prioritas Persetujuan Bank Tinggi";
  } else if (calculatedScore >= 750) { 
    grade = "A"; 
    label = "Sangat Baik"; 
    gradeColor = "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
    bankReadiness = "Layak Kredit Komersial & KUR";
  } else if (calculatedScore >= 700) { 
    grade = "B"; 
    label = "Baik"; 
    gradeColor = "text-blue-400 bg-blue-500/15 border-blue-500/30";
    bankReadiness = "Layak Kredit Mikro & P2P";
  } else if (calculatedScore >= 600) { 
    grade = "C"; 
    label = "Cukup"; 
    gradeColor = "text-amber-400 bg-amber-500/15 border-amber-500/30";
    bankReadiness = "Perlu Perbaikan Arus Kas";
  } else { 
    grade = "D"; 
    label = "Kurang"; 
    gradeColor = "text-rose-400 bg-rose-500/15 border-rose-500/30";
    bankReadiness = "Tingkat Risiko Tinggi";
  }

  // Semi-circle gauge calculation (score ranges 300 - 850)
  const scorePercent = (calculatedScore - 300) / 550;

  const resetSimulator = () => {
    setSimTxCount(data.transactions.length);
    setSimLitCount(data.literacy_modules.filter(m => m.status === 'completed').length);
    setSimProfitMargin(34);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sigap-light/50 px-3 py-1 text-xs font-bold text-sigap-darkest mb-3 border border-sigap-primary/20">
            <Activity className="h-3.5 w-3.5 text-sigap-primary" />
            Metrik Alternatif Berbasis Arus Kas
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-sigap-darkest">
            Skor Kredit Alternatif SIGAP
          </h2>
          <p className="mt-1 text-sm text-slate-500 max-w-xl leading-relaxed">
            Evaluasi kelayakan finansial yang diakui perbankan tanpa memerlukan agunan fisik di awal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Terakhir Diperbarui: Hari Ini</span>
          </div>
        </div>
      </motion.div>

      {/* Main Gauge & Bank Assessment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Speedometer Card - 7 cols */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
        >
          {/* Radial Ambient Glow */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-sigap-primary/25 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sigap-light/70">Tingkat Kelayakan</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-sigap-light border border-white/15">
                SKOR SIMULASI
              </span>
            </div>

            {/* High-end SVG Semi-radial Gauge */}
            <div className="my-6 sm:my-8 flex flex-col items-center justify-center">
              <div className="relative h-44 sm:h-56 w-56 sm:w-72 flex items-center justify-center">
                <svg className="h-full w-full" viewBox="0 0 200 120">
                  <defs>
                    <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Arc track (radius 80, center 100,105) */}
                  <path
                    d="M 20 105 A 80 80 0 0 1 180 105"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* Dynamic Arc Progress */}
                  <path
                    d="M 20 105 A 80 80 0 0 1 180 105"
                    fill="none"
                    stroke="url(#scoreGaugeGradient)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * scorePercent)}
                    className="transition-all duration-700 ease-out"
                  />

                  {/* Ticks */}
                  <text x="22" y="120" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold">300</text>
                  <text x="94" y="24" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold">575</text>
                  <text x="165" y="120" fill="rgba(255,255,255,0.4)" fontSize="9" fontWeight="bold">850</text>
                </svg>

                <div className="absolute bottom-2 flex flex-col items-center text-center">
                  <span className="font-display text-5xl font-extrabold text-white tracking-tight">{calculatedScore}</span>
                  <span className="text-xs text-sigap-light/70 font-semibold mt-0.5">Maksimal 850</span>
                  <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-extrabold border ${gradeColor}`}>
                    <span>Grade {grade}</span>
                    <span>•</span>
                    <span>{label}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-center">
                <span className="text-[11px] font-semibold text-sigap-light/70 uppercase tracking-wider block">Status Kesiapan Lembaga</span>
                <p className="font-display font-bold text-sm text-white mt-0.5">{bankReadiness}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-sigap-light/70">
              Formula: Stabilitas Arus Kas + Rasio Beban + Literasi + Legalitas
            </span>
            <Link href="/financing" className="inline-flex items-center font-bold text-sigap-light hover:text-white transition-colors">
              Lihat Pembiayaan Cocok <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Interactive Simulator Card - 5 cols */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sigap-primary text-white shadow-xs">
                <Sliders className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-sigap-darkest">Simulator Skor Interaktif</h3>
                <p className="text-xs text-slate-400">Uji bagaimana pertumbuhan usaha menaikkan skor Anda.</p>
              </div>
            </div>

            <button 
              onClick={resetSimulator}
              className="text-slate-400 hover:text-sigap-darkest p-1 transition-colors"
              title="Reset ke Data Asli"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">Jumlah Transaksi Bulanan</span>
                <span className="font-display font-extrabold text-sigap-primary bg-sigap-light/40 px-2 py-0.5 rounded-md">
                  {simTxCount} Transaksi
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="35" 
                value={simTxCount} 
                onChange={(e) => setSimTxCount(parseInt(e.target.value))}
                className="w-full accent-sigap-primary h-2 bg-slate-100 rounded-lg cursor-pointer" 
              />
              <span className="text-[11px] text-slate-400">Makin konsisten mutasi QRIS, skor semakin terangkat.</span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">Modul Literasi Diselesaikan</span>
                <span className="font-display font-extrabold text-sigap-primary bg-sigap-light/40 px-2 py-0.5 rounded-md">
                  {simLitCount} dari 4 Modul
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="4" 
                value={simLitCount} 
                onChange={(e) => setSimLitCount(parseInt(e.target.value))}
                className="w-full accent-sigap-primary h-2 bg-slate-100 rounded-lg cursor-pointer" 
              />
              <span className="text-[11px] text-slate-400">Penyelesaian sertifikat edukasi bernilai +12 poin/modul.</span>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700">Margin Laba Bersih</span>
                <span className="font-display font-extrabold text-sigap-primary bg-sigap-light/40 px-2 py-0.5 rounded-md">
                  {simProfitMargin}% dari Omzet
                </span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="50" 
                value={simProfitMargin} 
                onChange={(e) => setSimProfitMargin(parseInt(e.target.value))}
                className="w-full accent-sigap-primary h-2 bg-slate-100 rounded-lg cursor-pointer" 
              />
              <span className="text-[11px] text-slate-400">Efisiensi operasional memperbesar kapasitas angsuran.</span>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-sigap-darkest font-bold">
              <Sparkles className="h-4 w-4 text-sigap-yellow" />
              <span>Dampak Simulasi:</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Skor bergeser dari basis {baseScoreData.score} menjadi <strong className="text-sigap-darkest font-bold">{calculatedScore}</strong>. Tingkat kecocokan produk pembiayaan akan otomatis terkalibrasi.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Factors Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Positive Factors */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-sigap-darkest">Faktor Penguat Kelayakan</h3>
              <p className="text-xs text-slate-400">Parameter yang mengangkat skor kesehatan bisnis Anda.</p>
            </div>
          </div>

          <div className="space-y-4">
            {baseScoreData.positive_factors.map((factor) => (
              <div key={factor.id} className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-sm text-sigap-darkest">{factor.title}</h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3 w-3" /> Baik
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{factor.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Areas */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-sigap-darkest">Peluang Peningkatan Skor</h3>
              <p className="text-xs text-slate-400">Langkah mudah untuk menaikkan skor ke level A+.</p>
            </div>
          </div>

          <div className="space-y-4">
            {baseScoreData.improvement_areas.map((area) => (
              <div key={area.id} className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-bold text-sm text-sigap-darkest">{area.title}</h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    +15 Poin
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{area.detail}</p>
              </div>
            ))}

            <Link href="/learning" className="block pt-2">
              <Button variant="outline" className="w-full rounded-2xl border-sigap-primary text-sigap-primary hover:bg-sigap-light/20 font-bold text-xs h-11">
                <BookOpen className="h-4 w-4 mr-2" /> Buka Modul Literasi Penambah Poin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Regulatory & Disclaimer Card */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex items-start gap-4 text-xs text-slate-500">
        <ShieldAlert className="h-5 w-5 text-sigap-primary shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-sigap-darkest font-bold">Kebijakan Transparansi Penilaian:</strong> Skor SIGAP adalah instrumen indikator kesiapan komersial berbasis simulasi data mutasi internal. Hasil ini digunakan oleh mitra perbankan sebagai suplemen analisa kelayakan (credit underwriting), bukan penjaminan persetujuan pinjaman secara otomatis.
        </div>
      </div>
    </div>
  );
}

