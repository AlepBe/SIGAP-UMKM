"use client";

import { Button } from '@/components/ui/button';
import {
CheckCircle2,
Clock,
FileText,
X
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function FinancingApplicationsPage() {
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Sample applications list with realistic workflow
  const applications = [
    {
      id: 'APP-2026-0891',
      provider: 'Bank Nusantara Demo',
      product: 'KUR Mikro',
      amount: 35000000,
      tenorMonths: 24,
      interest: '0.5% / bulan',
      appliedAt: '2026-09-22T10:30:00+07:00',
      status: 'review',
      statusLabel: 'Verifikasi Dokumen & Scoring',
      currentStep: 2,
      steps: [
        { name: 'Pengajuan Terkirim', date: '22 Sep 10:30', done: true },
        { name: 'Analisis Skor SIGAP (Grade A)', date: '22 Sep 11:15', done: true },
        { name: 'Verifikasi Dokumen Legalitas', date: 'Dalam Proses', done: false, active: true },
        { name: 'Persetujuan & Akad Kredit', date: 'Menunggu', done: false },
        { name: 'Pencairan Dana ke Rekening', date: 'Menunggu', done: false }
      ]
    },
    {
      id: 'APP-2026-0742',
      provider: 'Fintech Nusantara Demo',
      product: 'Invoice Financing',
      amount: 50000000,
      tenorMonths: 3,
      interest: '1.0% / bulan',
      appliedAt: '2026-08-10T14:15:00+07:00',
      status: 'disbursed',
      statusLabel: 'Telah Dicairkan',
      currentStep: 5,
      steps: [
        { name: 'Pengajuan Terkirim', date: '10 Agt 14:15', done: true },
        { name: 'Validasi Invoice Piutang', date: '10 Agt 16:00', done: true },
        { name: 'Persetujuan Plafon', date: '11 Agt 09:30', done: true },
        { name: 'Tanda Tangan Digital Akad', date: '11 Agt 11:00', done: true },
        { name: 'Dana Masuk ke Rekening BCA', date: '11 Agt 13:45', done: true }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Pelacakan Real-time
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Status Pengajuan Pembiayaan
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Pantau tahapan verifikasi berkas, persetujuan batas kredit, hingga pencairan modal kerja ke rekening usaha Anda.
            </p>
          </div>

          <Link href="/financing">
            <Button className="bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-6 py-2.5 rounded-2xl shadow-lg shadow-sigap-yellow/20">
              + Ajukan Pembiayaan Baru
            </Button>
          </Link>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-5">
        <h2 className="text-xl font-display font-bold text-sigap-darkest px-1">
          Daftar Aplikasi Berjalan & Riwayat
        </h2>

        {applications.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ y: -2 }}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-6"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span>ID: {app.id}</span>
                  <span>•</span>
                  <span>{new Date(app.appliedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-sigap-darkest mt-1">
                  {app.product} — <span className="text-sigap-primary">{app.provider}</span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {app.status === 'disbursed' ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" /> {app.statusLabel}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 animate-pulse">
                    <Clock className="w-4 h-4" /> {app.statusLabel}
                  </span>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedApp(app)}
                  className="rounded-xl border-slate-300 text-xs font-bold"
                >
                  Detail Timeline
                </Button>
              </div>
            </div>

            {/* Middle metrics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Plafon Pengajuan</div>
                <div className="text-lg font-display font-extrabold text-sigap-darkest mt-0.5">{formatCurrency(app.amount)}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tenor Pinjaman</div>
                <div className="text-lg font-display font-bold text-sigap-darkest mt-0.5">{app.tenorMonths} Bulan</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estimasi Suku Bunga</div>
                <div className="text-lg font-display font-bold text-sigap-primary mt-0.5">{app.interest}</div>
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Jaminan / Agunan</div>
                <div className="text-sm font-semibold text-slate-700 mt-1">Tanpa Agunan Tambahan</div>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Progres Tahapan:
              </div>
              <div className="grid grid-cols-5 gap-2 text-center">
                {app.steps.map((st, i) => (
                  <div key={i} className="space-y-1">
                    <div className={`h-2 rounded-full transition-all ${
                      st.done ? 'bg-emerald-500' : st.active ? 'bg-amber-500 animate-pulse' : 'bg-slate-200'
                    }`} />
                    <span className={`block text-[11px] font-medium leading-tight ${
                      st.done ? 'text-emerald-700 font-bold' : st.active ? 'text-amber-700 font-bold' : 'text-slate-400'
                    }`}>
                      {st.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail Timeline */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="text-lg font-display font-bold text-sigap-darkest">
                    Detail Timeline Pengajuan
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">ID: {selectedApp.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-2">
                  {selectedApp.steps.map((step: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 bg-white ${
                        step.done ? 'border-emerald-500 bg-emerald-500' : step.active ? 'border-amber-500 bg-amber-500' : 'border-slate-300'
                      }`} />
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-bold ${step.done ? 'text-slate-900' : step.active ? 'text-amber-800' : 'text-slate-400'}`}>
                          {step.name}
                        </span>
                        <span className="text-xs text-slate-400">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1">
                  <p className="font-bold text-sigap-darkest">Catatan Analis Bank:</p>
                  <p>Skor SIGAP 782 telah disetujui otomatis. Tim kredit sedang memverifikasi legalitas NIB RBA Kedai Kopi Senja.</p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setSelectedApp(null)} className="rounded-2xl">
                    Tutup
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
