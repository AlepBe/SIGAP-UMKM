"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Filter, ShieldCheck, ArrowRight, Info, X, Calculator, Loader2, CheckCircle2 } from "lucide-react";
import { useDemo } from "@/lib/context/DemoContext";

export default function FinancingMarketplacePage() {
  const { data } = useDemo();
  const financingProducts = data.financing;
  const metrics = data.dashboard.metrics;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvider, setFilterProvider] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Calculator state
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcAmount, setCalcAmount] = useState('');
  const [calcTenor, setCalcTenor] = useState('');
  const [calcResult, setCalcResult] = useState<number | null>(null);

  // Application state
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const filteredProducts = useMemo(() => {
    return financingProducts.filter(p => {
      const matchSearch = p.provider.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.product.toLowerCase().includes(searchQuery.toLowerCase());
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
    
    // Simple demo calculation: assuming 1% interest flat per month for simplicity of demo
    // In reality, it should parse the interest rate from the product
    const interestRate = 0.01;
    const totalInterest = amount * interestRate * tenor;
    const totalPayment = amount + totalInterest;
    const monthlyInstallment = totalPayment / tenor;
    
    setCalcResult(monthlyInstallment);
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
      }, 3000);
    }, 1500);
  };

  const resetCalc = () => {
    setCalcAmount('');
    setCalcTenor('');
    setCalcResult(null);
    setApplySuccess(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Marketplace Pembiayaan</h2>
          <p className="text-muted-foreground">Temukan dan bandingkan produk pembiayaan legal yang sesuai dengan profil usaha Anda.</p>
        </div>
        <div className="flex gap-2 text-sm bg-sigap-primary/5 text-sigap-primary border border-sigap-primary/20 px-3 py-1.5 rounded-full shadow-sm font-medium">
          Kapasitas Est: {formatCurrency(metrics.income_this_month * 3)}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama lembaga atau jenis pembiayaan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary shadow-sm"
          />
        </div>
        <select 
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
          className="px-4 py-2.5 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-sigap-primary shadow-sm"
        >
          {providers.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <Button variant="outline" className="bg-white border text-sigap-darkest h-[42px] shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          Filter Lainnya
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <FinancingCard 
            key={p.id}
            lender={p.provider}
            product={p.product}
            verifiedBadge={p.verification_badge}
            matchScore={p.profile_match}
            amountRange={`${formatCurrency(p.ceiling_min)} - ${formatCurrency(p.ceiling_max)}`}
            tenor={`${p.tenor_min_months} - ${p.tenor_max_months} Bulan`}
            interest={p.estimated_fee_text}
            tags={[p.collateral, p.segment]}
            onDetail={() => setSelectedProduct(p)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white border rounded-xl p-12 text-center text-muted-foreground shadow-sm">
          Tidak ada produk pembiayaan yang sesuai dengan pencarian Anda.
        </div>
      )}

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-semibold text-xl text-sigap-darkest">{selectedProduct.product}</h3>
                <p className="text-sm text-muted-foreground">{selectedProduct.provider}</p>
              </div>
              <button onClick={() => { setSelectedProduct(null); setIsCalcOpen(false); resetCalc(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {!isCalcOpen ? (
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-800 flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {selectedProduct.verification_badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-800">
                      DATA DEMO
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Plafon</div>
                      <div className="font-semibold">{formatCurrency(selectedProduct.ceiling_min)} - {formatCurrency(selectedProduct.ceiling_max)}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Tenor</div>
                      <div className="font-semibold">{selectedProduct.tenor_min_months} - {selectedProduct.tenor_max_months} Bulan</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Estimasi Biaya</div>
                      <div className="font-semibold">{selectedProduct.estimated_fee_text}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Agunan</div>
                      <div className="font-semibold">{selectedProduct.collateral}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sigap-darkest mb-2">Kecocokan Profil (Demo)</h4>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div className={`h-2 rounded-full ${selectedProduct.profile_match >= 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${selectedProduct.profile_match}%` }}></div>
                      </div>
                      <span className="font-bold">{selectedProduct.profile_match}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {applySuccess ? (
                    <div className="py-12 text-center flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-xl mb-2">Pengajuan Demo Berhasil</h4>
                      <p className="text-gray-500 max-w-sm">Aplikasi pembiayaan demo Anda telah dikirimkan ke {selectedProduct.provider}. Anda dapat melihat statusnya di dashboard (Demo).</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-sm mb-4">
                        <strong>Simulasi — bukan penawaran kredit final.</strong> Hasil perhitungan hanya perkiraan berdasarkan asumsi flat rate untuk keperluan demo.
                      </div>
                      
                      <form id="calcForm" onSubmit={handleCalculate} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pinjaman (Rp)</label>
                          <input 
                            type="number" 
                            required 
                            min={selectedProduct.ceiling_min}
                            max={selectedProduct.ceiling_max}
                            value={calcAmount}
                            onChange={(e) => setCalcAmount(e.target.value)}
                            placeholder={`Contoh: ${selectedProduct.ceiling_min}`}
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                          />
                          <p className="text-xs text-gray-500 mt-1">Min: {formatCurrency(selectedProduct.ceiling_min)} - Max: {formatCurrency(selectedProduct.ceiling_max)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tenor (Bulan)</label>
                          <input 
                            type="number" 
                            required 
                            min={selectedProduct.tenor_min_months}
                            max={selectedProduct.tenor_max_months}
                            value={calcTenor}
                            onChange={(e) => setCalcTenor(e.target.value)}
                            placeholder={`Contoh: ${selectedProduct.tenor_min_months}`}
                            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-sigap-primary"
                          />
                        </div>
                        <Button type="submit" variant="outline" className="w-full border-sigap-primary text-sigap-primary hover:bg-sigap-primary/5">
                          Hitung Simulasi Cicilan
                        </Button>
                      </form>

                      {calcResult !== null && (
                        <div className="bg-gray-50 p-6 rounded-lg text-center mt-6 border">
                          <div className="text-sm text-gray-500 mb-1">Estimasi Cicilan Bulanan</div>
                          <div className="text-3xl font-bold text-sigap-darkest mb-4">{formatCurrency(calcResult)}</div>
                          
                          <Button onClick={handleApplyDemo} disabled={isApplying} className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 h-12">
                            {isApplying ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                            Ajukan Pembiayaan (Demo)
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            {!isCalcOpen && (
              <div className="p-4 border-t flex justify-end gap-3 bg-white">
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>Tutup</Button>
                <Button className="bg-sigap-primary text-white hover:bg-sigap-primary/90" onClick={() => setIsCalcOpen(true)}>
                  <Calculator className="w-4 h-4 mr-2" />
                  Simulasi Cicilan
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface FinancingCardProps {
  lender: string;
  product: string;
  verifiedBadge: string;
  matchScore: number;
  amountRange: string;
  tenor: string;
  interest: string;
  tags: string[];
  onDetail: () => void;
}

function FinancingCard({ lender, product, verifiedBadge, matchScore, amountRange, tenor, interest, tags, onDetail }: FinancingCardProps) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow relative">
      <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold">
        DATA DEMO
      </div>
      
      <div className="p-6 pb-4 border-b pt-10">
        <div className="text-xs text-muted-foreground font-medium mb-1">{lender}</div>
        <h3 className="text-lg font-bold text-sigap-darkest mb-4">{product}</h3>
        
        <div className="flex gap-2 flex-wrap mb-2">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-muted/10 flex-1 space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Plafon:</span>
          <span className="font-semibold text-sigap-darkest">{amountRange}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Tenor:</span>
          <span className="font-medium text-sigap-darkest">{tenor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Estimasi Biaya:</span>
          <span className="font-medium text-sigap-darkest">{interest}</span>
        </div>
        
        {/* Match Score */}
        <div className="pt-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground flex items-center"><Info className="w-3 h-3 mr-1"/>Kecocokan Profil</span>
            <span className={matchScore >= 80 ? "text-green-600 font-bold" : "text-amber-600 font-bold"}>{matchScore}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className={`h-1.5 rounded-full ${matchScore >= 80 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${matchScore}%` }}></div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t bg-white">
        <Button onClick={onDetail} className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 group">
          Lihat Detail <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
