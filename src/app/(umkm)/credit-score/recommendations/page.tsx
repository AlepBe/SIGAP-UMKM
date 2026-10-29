"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
AlertTriangle,
ArrowRight,BookOpen,
Check,
CheckCircle2,
ShieldCheck,
Sparkles,
Target,
TrendingUp,
Wallet
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function CreditScoreRecommendationsPage() {
  const { data } = useDemo();
  const currentScore = data.credit_score.score;
  const targetScore = 825;

  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  const toggleAction = (id: string, impact: number) => {
    if (completedActions.includes(id)) {
      setCompletedActions(completedActions.filter(item => item !== id));
      setToastMsg('Tindakan ditandai belum selesai.');
    } else {
      setCompletedActions([...completedActions, id]);
      setToastMsg(`Hebat! Simulasi peningkatan skor +${impact} poin.`);
    }
    setTimeout(() => setToastMsg(''), 3000);
  };

  const recommendations = [
    {
      id: 'REC-001',
      category: 'Literasi Keuangan',
      title: 'Selesaikan Modul: Memahami Bunga Efektif & Tenor',
      description: 'Mempelajari cara menghitung bunga anuitas vs flat rate sebelum mengambil pinjaman modal kerja.',
      impact: 15,
      impactLabel: '+15 Poin',
      icon: BookOpen,
      iconColor: 'text-amber-600 bg-amber-50',
      actionUrl: '/learning',
      actionText: 'Mulai Modul Ini'
    },
    {
      id: 'REC-002',
      category: 'Kerapian Transaksi',
      title: 'Pertahankan 25 Hari Transaksi QRIS per Bulan',
      description: 'Lembaga keuangan menyukai UMKM dengan arus kas harian aktif. Catat transaksi minimum 25 hari dalam sebulan.',
      impact: 20,
      impactLabel: '+20 Poin',
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50',
      actionUrl: '/bookkeeping/transactions',
      actionText: 'Lihat Buku Kas'
    },
    {
      id: 'REC-003',
      category: 'Cadangan Kas (Runway)',
      title: 'Tingkatkan Saldo Kas Darurat Menjadi 3x Pengeluaran Bulanan',
      description: 'Pengeluaran bulanan Anda Rp 12.1 Jt. Target cadangan kas aman ideal adalah minimal Rp 36.3 Jt untuk daya tahan krisis.',
      impact: 25,
      impactLabel: '+25 Poin',
      icon: Wallet,
      iconColor: 'text-blue-600 bg-blue-50',
      actionUrl: '/resilience',
      actionText: 'Simulasi Runway'
    },
    {
      id: 'REC-004',
      category: 'Kepatuhan & Legalitas',
      title: 'Lengkapi Surat Keterangan Usaha (SKU) / IUMK',
      description: 'Dokumen legalitas sekunder membantu meloloskan plafon pembiayaan di atas Rp 50 Juta tanpa jaminan tambahan.',
      impact: 15,
      impactLabel: '+15 Poin',
      icon: ShieldCheck,
      iconColor: 'text-purple-600 bg-purple-50',
      actionUrl: '/documents',
      actionText: 'Unggah SKU'
    }
  ];

  const simulatedScore = currentScore + recommendations
    .filter(r => completedActions.includes(r.id))
    .reduce((acc, r) => acc + r.impact, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Toast */}
      {toastMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMsg}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Panduan Taktis Skor Kredit
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Roadmap Menuju Skor 825 (Grade A+)
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Daftar rekomendasi aksi terukur yang disusun oleh algoritma SIGAP berdasarkan profil kas dan kelengkapan bisnis Anda.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center min-w-[240px]">
            <div className="flex justify-between items-center text-xs font-bold text-white/70 uppercase mb-2">
              <span>Skor Sekarang</span>
              <span>Target A+</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-3xl font-display font-extrabold text-white">{simulatedScore}</span>
              <ArrowRight className="w-5 h-5 text-sigap-yellow" />
              <span className="text-3xl font-display font-extrabold text-sigap-yellow">{targetScore}</span>
            </div>
            <div className="mt-3 w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-sigap-yellow rounded-full" 
                style={{ width: `${Math.min(100, ((simulatedScore - 600) / 250) * 100)}%` }}
                layout
              />
            </div>
            <span className="text-[11px] text-white/60 block mt-2">
              Tersisa {Math.max(0, targetScore - simulatedScore)} poin untuk plafon kredit bunga terendah.
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
            <Target className="w-5 h-5 text-sigap-primary" /> Daftar Langkah Prioritas
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {completedActions.length} dari {recommendations.length} langkah disimulasikan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendations.map((rec) => {
            const isDone = completedActions.includes(rec.id);
            const Icon = rec.icon;

            return (
              <motion.div
                key={rec.id}
                whileHover={{ y: -3 }}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isDone 
                    ? 'bg-emerald-50/50 border-emerald-300 shadow-sm' 
                    : 'bg-white border-slate-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${rec.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          {rec.category}
                        </span>
                        <h3 className="font-bold text-sigap-darkest text-base leading-snug">
                          {rec.title}
                        </h3>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                      {rec.impactLabel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {rec.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => toggleAction(rec.id, rec.impact)}
                    className={`text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {isDone ? 'Selesai Dilakukan' : 'Simulasikan'}
                  </button>

                  <Link href={rec.actionUrl}>
                    <Button 
                      variant="ghost" 
                      className="text-sigap-primary hover:text-sigap-primary hover:bg-sigap-soft/20 text-xs font-bold rounded-xl"
                    >
                      {rec.actionText} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Best Practices Advice */}
      <div className="bg-amber-50 rounded-3xl p-6 md:p-8 border border-amber-200/70 flex flex-col md:flex-row items-start gap-5">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-amber-900 text-base">Hindari Hal Ini Agar Skor Kredit Tidak Anjlok</h4>
          <p className="text-xs text-amber-800 leading-relaxed">
            1. Jangan mencampur rekening belanja pribadi dengan kas toko.<br />
            2. Jangan mengajukan pinjaman ke banyak platform pinjol ilegal secara bersamaan dalam waktu singkat.<br />
            3. Pastikan tidak ada tagihan operasional atau cicilan yang terlambat bayar lebih dari 3 hari.
          </p>
        </div>
      </div>
    </div>
  );
}
