"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, ShieldAlert, AlertTriangle, FileWarning, ExternalLink, Loader2, XCircle } from "lucide-react";

export default function LegalProtectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'idle' | 'verified' | 'unverified'>('idle');

  const handleVerify = () => {
    if (!searchQuery.trim()) return;
    
    setIsVerifying(true);
    setVerificationResult('idle');

    setTimeout(() => {
      // Mock logic: if it contains "bank" or "mandiri" or "investree" it's verified. Otherwise fake unverified.
      const query = searchQuery.toLowerCase();
      if (query.includes('bank') || query.includes('mandiri') || query.includes('investree') || query.includes('amartha')) {
        setVerificationResult('verified');
      } else {
        setVerificationResult('unverified');
      }
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Legalitas & Proteksi</h2>
        <p className="text-muted-foreground">Verifikasi penawaran pinjaman dan lindungi usaha Anda dari entitas ilegal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification Check Tool */}
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <div className="w-12 h-12 bg-sigap-primary/10 text-sigap-primary rounded-xl flex items-center justify-center mb-6 relative">
            <Search className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 bg-amber-100 text-amber-800 text-[8px] font-bold px-1 rounded">DEMO</div>
          </div>
          <h3 className="text-xl font-bold text-sigap-darkest mb-2">Cek Penawaran Pinjaman (Simulasi)</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Pernah dihubungi melalui WhatsApp atau SMS oleh pihak yang menawarkan dana? Masukkan nama aplikasi atau nomor kontak mereka di sini sebelum merespons.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-sigap-darkest block mb-1.5">Nama Aplikasi / Perusahaan</label>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" 
                placeholder="Contoh: KSP Dana Cepat (Ketik 'Bank' untuk hasil valid)" 
              />
            </div>
            <div>
              <label className="text-sm font-medium text-sigap-darkest block mb-1.5">Nomor Telepon Pengirim (Opsional)</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="0812-XXXX-XXXX" />
            </div>
            <Button onClick={handleVerify} disabled={isVerifying || !searchQuery.trim()} className="w-full bg-sigap-dark text-white hover:bg-sigap-dark/90 h-11">
              {isVerifying ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
              Verifikasi Sekarang
            </Button>
          </div>

          {verificationResult === 'verified' && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3 text-sm text-green-800 animate-in fade-in">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-1">Terverifikasi (Demo)</strong>
                <p>Entitas ini terdaftar dalam database simulasi kami yang merepresentasikan OJK.</p>
              </div>
            </div>
          )}

          {verificationResult === 'unverified' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-sm text-red-800 animate-in fade-in">
              <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-1">Tidak Ditemukan (Demo)</strong>
                <p>Hati-hati! Entitas ini tidak terdaftar dalam database simulasi kami. Abaikan penawaran mereka.</p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg flex gap-3 text-sm text-amber-800">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              Jangan pernah memberikan foto KTP memegang wajah atau transfer biaya &quot;administrasi&quot; di awal kepada pihak yang tidak terverifikasi OJK.
            </p>
          </div>
        </div>

        {/* Legal Partners Directory */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg text-sigap-darkest">Direktori Mitra Terverifikasi (Data Demo)</h3>
          
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
              <span className="text-sm font-medium">Status API Koneksi (Mock)</span>
              <span className="flex items-center text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                Connected
              </span>
            </div>
            <div className="p-0">
              <VerifiedPartner name="Bank Mandiri" type="Bank Umum" license="OJK" />
              <VerifiedPartner name="PT Amartha Mikro Fintek" type="P2P Lending" license="KEP-46/D.05/2019" />
              <VerifiedPartner name="PT Investree Radhika Jaya" type="P2P Lending" license="KEP-45/D.05/2019" />
              <VerifiedPartner name="PT Pegadaian (Persero)" type="Gadai Dasar" license="OJK" />
            </div>
            <div className="p-3 border-t bg-muted/10 text-center">
              <Button variant="ghost" className="text-xs text-sigap-primary h-auto py-1">Lihat Semua Data (Simulasi) <ExternalLink className="w-3 h-3 ml-1"/></Button>
            </div>
          </div>

          {/* Report Feature */}
          <div className="bg-sigap-dark text-white rounded-xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-4 items-center w-full">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <FileWarning className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-0.5">Laporkan Pinjol Ilegal</h4>
                <p className="text-xs text-sigap-light/80">Laporkan temuan untuk membantu ekosistem UMKM.</p>
              </div>
            </div>
            <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 shrink-0 text-sm w-full sm:w-auto mt-4 sm:mt-0">
              Buat Laporan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VerifiedPartner({ name, type, license }: { name: string, type: string, license: string }) {
  return (
    <div className="p-4 border-b last:border-b-0 flex justify-between items-center hover:bg-muted/10 transition-colors">
      <div>
        <div className="font-semibold text-sm text-sigap-darkest flex items-center gap-1.5">
          {name}
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{type}</div>
      </div>
      <div className="text-[10px] text-right">
        <div className="text-muted-foreground">Lisensi/Izin</div>
        <div className="font-mono mt-0.5 font-medium">{license}</div>
      </div>
    </div>
  );
}
