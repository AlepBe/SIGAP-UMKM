"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Users, Copy, CheckCircle2 } from "lucide-react";

export default function LenderReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://sigap.id/ref/BANK-NUSANTARA-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const referralStats = [
    { label: "Total UMKM Terundang", val: "148 Usaha", trend: "+24 Bulan Ini" },
    { label: "Pengajuan Terverifikasi", val: "42 Aplikasi", trend: "Konversi 28.3%" },
    { label: "Total Dana Tersalurkan", val: "Rp 1.45 Miliar", trend: "Rasio NPL 0%" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Program Afiliasi & Referral Perbankan
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Program Referral Mitra Lembaga
          </h1>
          <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
            Undang ekosistem debitur binaan Anda untuk mencatat transaksi di SIGAP dan dapatkan profil risiko kredit yang transparan serta teruji.
          </p>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-display font-bold text-lg text-sigap-darkest">Tautan Referral Mitra Khusus Anda</h3>
        <p className="text-xs text-slate-500">Bagikan tautan ini kepada nasabah binaan untuk langsung mendapatkan scoring otomatis terhubung.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            readOnly 
            value={referralLink} 
            className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono font-semibold text-sigap-darkest select-all"
          />
          <Button 
            onClick={handleCopy}
            className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl px-6 py-3.5 text-xs shadow-md"
          >
            {copied ? (
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tersalin!</span>
            ) : (
              <span className="flex items-center gap-1.5"><Copy className="w-4 h-4" /> Salin Tautan</span>
            )}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {referralStats.map((st, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">{st.label}</span>
            <div className="text-2xl font-display font-extrabold text-sigap-darkest mt-1">{st.val}</div>
            <span className="text-xs font-bold text-emerald-600 mt-1 block">{st.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
