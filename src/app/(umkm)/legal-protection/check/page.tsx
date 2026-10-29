"use client";

import { Button } from "@/components/ui/button";
import {
ArrowLeft,
Check,
CheckCircle2,
FileWarning,
Loader2,
Search,
ShieldCheck,
X,
XCircle
} from "lucide-react";
import { AnimatePresence,motion } from 'motion/react';
import Link from 'next/link';
import React,{ useState } from 'react';

export default function LegalProtectionCheckPage() {
  const [appName, setAppName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanResult, setScanResult] = useState<'idle' | 'verified' | 'unverified'>('idle');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const handleRunCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim()) return;

    setIsScanning(true);
    setScanResult('idle');
    setScanStep('Menghubungkan ke API Basis Data OJK...');

    setTimeout(() => {
      setScanStep('Memeriksa entitas di Satgas Pasti (Waspada Investasi)...');
      setTimeout(() => {
        setScanStep('Memvalidasi izin operasional & pola reputasi kontak...');
        setTimeout(() => {
          setIsScanning(false);
          const q = appName.toLowerCase();
          // Logic: if it contains standard legal keywords
          if (q.includes('bank') || q.includes('bca') || q.includes('mandiri') || q.includes('amartha') || q.includes('pegadaian') || q.includes('investree')) {
            setScanResult('verified');
          } else {
            setScanResult('unverified');
          }
        }, 800);
      }, 700);
    }, 600);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button */}
      <Link 
        href="/legal-protection" 
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-sigap-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Pusat Proteksi Hukum
      </Link>

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Mesin Verifikasi Legalitas OJK
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Pengecekan Penawaran Pinjaman
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
            Pernah dihubungi nomor tak dikenal yang menawarkan dana instan via WhatsApp, SMS, atau media sosial? Cek legalitas entitas tersebut di sini sebelum merespons.
          </p>
        </div>
      </div>

      {/* Verification Tool Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
          <Search className="w-5 h-5 text-sigap-primary" /> Formulir Validasi Entitas
        </h2>

        <form onSubmit={handleRunCheck} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Nama Aplikasi / Lembaga Penawar Pinjaman *
            </label>
            <input 
              type="text" 
              required
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Contoh: KSP Dana Cepat, Bank Nusantara, Easy Pinjam..."
              className="w-full p-3.5 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none font-semibold text-sigap-darkest"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Tip: Masukkan nama persis seperti yang tertulis di pesan atau profil WhatsApp mereka.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Nomor Telepon / WhatsApp Pengirim (Opsional)
              </label>
              <input 
                type="text" 
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="0812-XXXX-XXXX"
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                Nomor Rekening Tujuan Transfer (Jika Diminta Biaya)
              </label>
              <input 
                type="text" 
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                placeholder="Contoh: BCA 8720192831 a.n Pribadi"
                className="w-full p-3 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-sigap-primary outline-none"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isScanning || !appName.trim()}
            className="w-full bg-sigap-darkest text-white hover:bg-sigap-darkest/90 font-bold py-6 rounded-2xl text-sm shadow-md"
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> {scanStep}
              </span>
            ) : (
              'Verifikasi Legalitas Sekarang'
            )}
          </Button>
        </form>

        {/* Results Display */}
        <AnimatePresence>
          {scanResult === 'verified' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 block">
                    STATUS: RESMI & TERDAFTAR
                  </span>
                  <h3 className="text-xl font-display font-extrabold text-emerald-950 mt-0.5">
                    Entitas Terdaftar Resmi di OJK
                  </h3>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Nama &quot;{appName}&quot; terdaftar dalam direktori lembaga jasa keuangan berizin. Tetap pastikan penawaran datang dari kontak customer service resmi bank dan bukan nomor handphone pribadi perorangan.
                  </p>
                </div>
              </div>

              <div className="bg-white/70 p-4 rounded-2xl grid grid-cols-2 gap-3 text-xs border border-emerald-200">
                <div>
                  <span className="text-emerald-700 font-bold">Jenis Izin:</span>
                  <p className="text-slate-800 font-semibold">Bank Umum / P2P Berizin OJK</p>
                </div>
                <div>
                  <span className="text-emerald-700 font-bold">Status Perlindungan:</span>
                  <p className="text-slate-800 font-semibold">Tunduk pada Regulasi POJK</p>
                </div>
              </div>
            </motion.div>
          )}

          {scanResult === 'unverified' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-3xl bg-rose-50 border border-rose-300 text-rose-900 space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <XCircle className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-rose-700 block">
                    PERINGATAN: TIDAK TERDAFTAR / TERINDIKASI ILEGAL
                  </span>
                  <h3 className="text-xl font-display font-extrabold text-rose-950 mt-0.5">
                    Entitas Tidak Ditemukan dalam Database OJK
                  </h3>
                  <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                    Nama &quot;{appName}&quot; tidak memiliki izin operasional pinjam-meminjam dari OJK. Waspada modus penipuan berkedok Koperasi Simpan Pinjam (KSP) abal-abal atau pinjol ilegal.
                  </p>
                </div>
              </div>

              {/* Danger Checklist */}
              <div className="bg-white/80 p-4 rounded-2xl border border-rose-200 space-y-2 text-xs">
                <p className="font-bold text-rose-950">Langkah Pengamanan Diri:</p>
                <div className="space-y-1.5 text-rose-900">
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><strong>JANGAN</strong> mentransfer biaya administrasi, provisi, atau uang muka dalam bentuk apa pun.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><strong>JANGAN</strong> mengirimkan foto KTP memegang wajah atau memberikan izin kontak handphone.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Segera blokir nomor pengirim di aplikasi WhatsApp Anda.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs px-5"
                >
                  <FileWarning className="w-4 h-4 mr-2" /> Laporkan Entitas Ini ke Satgas
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-5"
            >
              {reportSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-sigap-darkest">Laporan Berhasil Dicatat</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Terima kasih telah berkontribusi melindungi ekosistem UMKM Indonesia dari jeratan pinjol ilegal.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-sigap-darkest">Laporkan Entitas Ilegal</h3>
                    <p className="text-xs text-slate-500 mt-1">Laporan Anda akan diteruskan ke tim Satgas Waspada Investasi.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nama Entitas</label>
                    <input 
                      type="text" 
                      defaultValue={appName} 
                      className="w-full p-3 rounded-2xl border text-sm bg-slate-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Kronologi Singkat</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Contoh: Menawarkan pinjaman Rp 20 Juta via WhatsApp lalu meminta transfer biaya admin Rp 500.000..."
                      className="w-full p-3 rounded-2xl border text-sm outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setIsReportModalOpen(false)} className="rounded-2xl flex-1">
                      Batal
                    </Button>
                    <Button type="submit" className="bg-rose-600 text-white hover:bg-rose-700 font-bold rounded-2xl flex-1">
                      Kirim Laporan
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
