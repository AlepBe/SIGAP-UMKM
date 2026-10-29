"use client";

import { Button } from "@/components/ui/button";
import { useDemo } from "@/lib/context/DemoContext";
import {
ArrowRight,
Building2,
Calculator,
CheckCircle2,
FileText,
GitCompare,
Loader2,
Search,
ShieldCheck,
Sparkles,
X
} from "lucide-react";
import { AnimatePresence,motion } from 'motion/react';
import Link from 'next/link';
import React,{ useMemo,useState } from 'react';

export default function FinancingMarketplacePage() {
  const { data } = useDemo();
  const financingProducts = data.financing;
  const metrics = data.dashboard.metrics;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvider, setFilterProvider] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Calculator state in modal
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcAmount, setCalcAmount] = useState('');
  const [calcTenor, setCalcTenor] = useState('');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  // Application state
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredProducts = useMemo(() => {
    return financingProducts.filter(p => {
      const matchSearch = p.provider.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.segment.toLowerCase().includes(searchQuery.toLowerCase());
      const matchProvider = filterProvider === 'Semua' ? true : p.provider === filterProvider;
      return matchSearch && matchProvider;
    });
  }, [financingProducts, searchQuery, filterProvider]);

  const providers = ['Semua', ...Array.from(new Set(financingProducts.map(p => p.provider)))];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    const amount = parseFloat(calcAmount);
    const tenor = parseInt(calcTenor);
    
    // Effective demo calculation: ~0.5% - 1% per month
    const interestRate = 0.0075;
    const monthlyPayment = (amount * (1 + (interestRate * tenor))) / tenor;
    
    setCalcResult(Math.round(monthlyPayment));
  };

  const handleApplyDemo = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setIsCalcOpen(false);
        setSelectedProduct(null);
      }, 2500);
    }, 1200);
  };

  const resetCalc = () => {
    setCalcAmount('');
    setCalcTenor('');
    setCalcResult(null);
    setApplySuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Lembaga Keuangan Terdaftar OJK
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Marketplace Pembiayaan UMKM
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Jelajahi dan bandingkan fasilitas kredit legal yang terkurasi. Skor SIGAP Anda (782 - Grade A) memberi akses bunga prioritas pada produk pilihan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
              <span className="text-[11px] font-bold text-white/60 uppercase block">Kapasitas Plafon Ideal</span>
              <span className="text-xl font-display font-extrabold text-sigap-yellow">
                s/d {formatCurrency(metrics.income_this_month * 3)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subpage Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        <Link 
          href="/financing" 
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-sigap-darkest text-white shadow-md flex items-center gap-2"
        >
          <Building2 className="w-4 h-4" /> Katalog Pembiayaan
        </Link>
        <Link 
          href="/financing/calculator" 
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-2"
        >
          <Calculator className="w-4 h-4 text-sigap-primary" /> Kalkulator Cicilan
        </Link>
        <Link 
          href="/financing/compare" 
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-2"
        >
          <GitCompare className="w-4 h-4 text-sigap-yellow-dark" /> Bandingkan Produk
        </Link>
        <Link 
          href="/financing/applications" 
          className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-emerald-600" /> Status Pengajuan (2)
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama lembaga, jenis produk (KUR, Invoice...), atau segmen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary"
          />
        </div>
        
        <select 
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
          className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-sigap-primary"
        >
          {providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {p.provider}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3" /> {p.verification_badge}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-sigap-darkest mb-3">
                {p.product}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-xl font-medium">
                  {p.collateral}
                </span>
                <span className="text-[11px] bg-blue-50 text-sigap-primary px-2.5 py-1 rounded-xl font-medium">
                  {p.segment}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/70 border-t border-b border-slate-100 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Rentang Plafon:</span>
                <span className="font-extrabold text-sigap-darkest text-sm">
                  {formatCurrency(p.ceiling_min)} - {formatCurrency(p.ceiling_max)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Jangka Waktu:</span>
                <span className="font-bold text-slate-800">{p.tenor_min_months} - {p.tenor_max_months} Bulan</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Estimasi Bunga:</span>
                <span className="font-extrabold text-sigap-primary text-sm">{p.estimated_fee_text}</span>
              </div>

              {/* Match Score */}
              <div className="pt-2 border-t border-slate-200/50">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-sigap-yellow mr-1" />
                    Kecocokan Profil Anda
                  </span>
                  <span className="font-extrabold text-emerald-600">{p.profile_match}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${p.profile_match}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white flex items-center gap-2">
              <Button 
                onClick={() => { setSelectedProduct(p); setIsCalcOpen(false); resetCalc(); }}
                className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl py-2.5 text-xs shadow-md shadow-sigap-primary/10 group flex items-center justify-center gap-1.5"
              >
                Lihat Detail & Simulasi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white border rounded-3xl p-12 text-center text-slate-500 shadow-sm">
          Tidak ada produk pembiayaan yang cocok dengan kata kunci pencarian Anda.
        </div>
      )}

      {/* Detail / Simulation Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-100"
            >
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="font-display font-bold text-xl text-sigap-darkest">{selectedProduct.product}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedProduct.provider}</p>
                </div>
                <button 
                  onClick={() => { setSelectedProduct(null); setIsCalcOpen(false); resetCalc(); }} 
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                {!isCalcOpen ? (
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {selectedProduct.verification_badge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-sigap-primary">
                        Kecocokan {selectedProduct.profile_match}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase">Rentang Plafon</div>
                        <div className="font-extrabold text-sigap-darkest text-base">
                          {formatCurrency(selectedProduct.ceiling_min)} - {formatCurrency(selectedProduct.ceiling_max)}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase">Pilihan Tenor</div>
                        <div className="font-extrabold text-sigap-darkest text-base">
                          {selectedProduct.tenor_min_months} - {selectedProduct.tenor_max_months} Bulan
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase">Estimasi Biaya / Bunga</div>
                        <div className="font-extrabold text-sigap-primary text-base">
                          {selectedProduct.estimated_fee_text}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase">Syarat Agunan</div>
                        <div className="font-extrabold text-slate-800 text-base">
                          {selectedProduct.collateral}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-xs text-emerald-800 space-y-1">
                      <span className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profil UMKM Anda Memenuhi Kualifikasi
                      </span>
                      <p>Skor SIGAP 782 (Grade A) dan histori transaksi Anda memenuhi kriteria pengajuan program pembiayaan ini.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applySuccess ? (
                      <div className="py-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-2xl text-sigap-darkest mb-2">
                          Pengajuan Berhasil Dikirimkan
                        </h4>
                        <p className="text-slate-600 max-w-sm text-sm">
                          Berkas dan skor SIGAP Anda telah diteruskan ke tim verifikasi {selectedProduct.provider}. Pantau tahapannya di menu Status Pengajuan.
                        </p>
                      </div>
                    ) : (
                      <>
                        <form onSubmit={handleCalculate} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                              Jumlah Pinjaman Diajukan (Rp)
                            </label>
                            <input 
                              type="number" 
                              required 
                              min={selectedProduct.ceiling_min}
                              max={selectedProduct.ceiling_max}
                              value={calcAmount}
                              onChange={(e) => setCalcAmount(e.target.value)}
                              placeholder={`Contoh: ${selectedProduct.ceiling_min}`}
                              className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-sigap-primary text-sm font-semibold"
                            />
                            <p className="text-[11px] text-slate-400 mt-1">
                              Rentang: {formatCurrency(selectedProduct.ceiling_min)} s/d {formatCurrency(selectedProduct.ceiling_max)}
                            </p>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                              Pilihan Tenor (Bulan)
                            </label>
                            <input 
                              type="number" 
                              required 
                              min={selectedProduct.tenor_min_months}
                              max={selectedProduct.tenor_max_months}
                              value={calcTenor}
                              onChange={(e) => setCalcTenor(e.target.value)}
                              placeholder={`Contoh: ${selectedProduct.tenor_min_months}`}
                              className="w-full p-3 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-sigap-primary text-sm font-semibold"
                            />
                          </div>

                          <Button 
                            type="submit" 
                            variant="outline" 
                            className="w-full border-sigap-primary text-sigap-primary hover:bg-sigap-primary/5 rounded-2xl font-bold py-3 text-xs"
                          >
                            Hitung Estimasi Angsuran
                          </Button>
                        </form>

                        {calcResult !== null && (
                          <div className="bg-slate-50 p-6 rounded-3xl text-center mt-6 border border-slate-200 space-y-3">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                              Estimasi Angsuran per Bulan
                            </div>
                            <div className="text-3xl font-display font-extrabold text-sigap-darkest">
                              {formatCurrency(calcResult)}
                            </div>
                            
                            <Button 
                              onClick={handleApplyDemo} 
                              disabled={isApplying} 
                              className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl font-bold h-12 shadow-lg shadow-sigap-primary/20 text-sm"
                            >
                              {isApplying ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                              Kirim Pengajuan Langsung
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {!isCalcOpen && (
                <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                  <Button variant="outline" onClick={() => setSelectedProduct(null)} className="rounded-2xl">
                    Tutup
                  </Button>
                  <Button 
                    className="bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl font-bold" 
                    onClick={() => setIsCalcOpen(true)}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Simulasi Angsuran
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
