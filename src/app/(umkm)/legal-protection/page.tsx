"use client";

import { Button } from "@/components/ui/button";
import {
AlertTriangle,
FileWarning,
Loader2,
Search,
ShieldCheck,
XCircle
} from "lucide-react";
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

export default function LegalProtectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'idle' | 'verified' | 'unverified'>('idle');

  const handleVerify = () => {
    if (!searchQuery.trim()) return;
    
    setIsVerifying(true);
    setVerificationResult('idle');

    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      if (query.includes('bank') || query.includes('mandiri') || query.includes('investree') || query.includes('amartha') || query.includes('bca') || query.includes('pegadaian')) {
        setVerificationResult('verified');
      } else {
        setVerificationResult('unverified');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const verifiedPartners = [
    { name: "Bank Mandiri (Persero) Tbk", type: "Bank BUMN", license: "POJK Bank Umum", status: "Terdaftar & Diawasi OJK" },
    { name: "PT Amartha Mikro Fintek", type: "P2P Lending Finansial Mikro", license: "KEP-46/D.05/2019", status: "Berizin OJK" },
    { name: "PT Pegadaian (Persero)", type: "Lembaga Gadai Resmi", license: "POJK Lembaga Keuangan Khusus", status: "Terdaftar OJK" },
    { name: "PT Bank Central Asia Tbk", type: "Bank Swasta Nasional", license: "POJK Bank Umum", status: "Terdaftar & Diawasi OJK" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Pusat Perlindungan Konsumen UMKM
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Legalitas & Proteksi Keuangan
            </h1>
            <p className="text-white/70 max-w-2xl text-xs sm:text-base leading-relaxed">
              Lindungi data pribadi dan keuangan usaha Anda dari jeratan pinjol ilegal, penipuan transfer biaya admin, dan entitas investasi bodong.
            </p>
          </div>

          <Link href="/legal-protection/check" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-6 py-2.5 rounded-2xl shadow-lg shadow-sigap-yellow/20">
              Buka Scanner OJK Lengkap &rarr;
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Verification Check Tool (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Cek Cepat Instan</span>
            <h3 className="text-xl font-display font-bold text-sigap-darkest mt-1">
              Verifikasi Penawaran Pinjaman (Simulasi)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Masukkan nama aplikasi atau lembaga yang menghubungi Anda untuk mengecek status legalitasnya di basis data simulasi OJK.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                Nama Aplikasi / Lembaga
              </label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sigap-primary outline-none text-sm font-semibold" 
                placeholder="Ketik: 'Bank', 'Mandiri', 'Amartha' untuk valid, atau 'KSP Cepat' untuk simulasi ilegal" 
              />
            </div>

            <Button 
              onClick={handleVerify} 
              disabled={isVerifying || !searchQuery.trim()} 
              className="w-full bg-sigap-darkest text-white hover:bg-sigap-darkest/90 h-12 font-bold rounded-2xl text-xs shadow-md"
            >
              {isVerifying ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              Periksa Status OJK Sekarang
            </Button>
          </div>

          {/* Results */}
          {verificationResult === 'verified' && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex gap-3.5 text-xs text-emerald-800"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-display font-bold text-emerald-950 mb-0.5">
                  Terdaftar & Terverifikasi (Simulasi OJK)
                </strong>
                <p>
                  Entitas ini terdaftar dalam database resmi dan memiliki izin operasional yang sah.
                </p>
              </div>
            </motion.div>
          )}

          {verificationResult === 'unverified' && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-5 bg-rose-50 border border-rose-200 rounded-2xl flex gap-3.5 text-xs text-rose-800"
            >
              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-display font-bold text-rose-950 mb-0.5">
                  Peringatan: Tidak Ditemukan / Berisiko Ilegal
                </strong>
                <p>
                  Entitas ini tidak terdaftar di OJK. Jangan transfer biaya administrasi di awal dan jangan bagikan data kontak.
                </p>
              </div>
            </motion.div>
          )}

          <div className="p-4 bg-amber-50 border border-amber-200/70 rounded-2xl flex gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Peringatan Keamanan:</strong> Lembaga keuangan berizin OJK tidak pernah meminta biaya &quot;pencairan dana&quot; atau &quot;jaminan provisi&quot; yang harus ditransfer ke rekening pribadi di awal.
            </p>
          </div>
        </div>

        {/* Legal Partners Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-sigap-darkest">Direktori Lembaga Resmi</h3>
                <p className="text-xs text-slate-500">Koneksi API Simulasi OJK</p>
              </div>
              <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" /> Terhubung
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {verifiedPartners.map((item, i) => (
                <div key={i} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-sigap-darkest flex items-center gap-1.5">
                      {item.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    </h4>
                    <span className="text-[11px] text-slate-400">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-semibold block">
                      {item.license}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/legal-protection/check" className="block pt-2">
              <Button variant="outline" className="w-full text-xs font-bold rounded-2xl border-slate-200">
                Buka Direktori Lengkap & Cek Nomor &rarr;
              </Button>
            </Link>
          </div>

          {/* Quick Fraud Report Box */}
          <div className="bg-sigap-darkest text-white rounded-3xl p-6 shadow-xl border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-2xl">
                <FileWarning className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Menemukan Pinjaman Ilegal?</h4>
                <p className="text-xs text-white/60">Bantu lindungi sesama pengusaha UMKM.</p>
              </div>
            </div>
            <Link href="/legal-protection/check" className="block">
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs py-2.5">
                Kirim Laporan Pengaduan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
