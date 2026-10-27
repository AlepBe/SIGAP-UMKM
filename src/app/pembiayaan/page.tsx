"use client";

import React, { useState } from 'react';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, ChevronDown, Building2, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';

const financingDemoData = [
  { id: 1, provider: "Bank Nusantara Demo", product: "Kredit Modal Usaha Demo", segment: "Pemerintah", plafonMin: 10, plafonMax: 100, tenorMin: 12, tenorMax: 24, cost: "0,5% / bulan", collateral: "Sesuai kebijakan", match: 95, requirements: ["KTP", "NPWP", "SKU", "Rekening Koran 6 Bulan"] },
  { id: 2, provider: "Bank Nusantara Demo", product: "Kredit Pengembangan Usaha Demo", segment: "Pemerintah", plafonMin: 50, plafonMax: 500, tenorMin: 24, tenorMax: 48, cost: "0,5% / bulan", collateral: "Agunan Tetap", match: 88, requirements: ["KTP", "NPWP", "NIB", "Rekening Koran 1 Tahun", "Laporan Keuangan"] },
  { id: 3, provider: "Fintech Nusantara Demo", product: "Invoice Financing Demo", segment: "B2B", plafonMin: 50, plafonMax: 2000, tenorMin: 1, tenorMax: 6, cost: "Mulai 1% / bulan", collateral: "Berbasis Invoice", match: 82, requirements: ["KTP", "NPWP", "Invoice Valid", "Kontrak Kerja Sama"] },
  { id: 4, provider: "Koperasi Maju Demo", product: "Modal Kerja Fleksibel Demo", segment: "UMKM", plafonMin: 5, plafonMax: 50, tenorMin: 6, tenorMax: 12, cost: "0,9% / bulan", collateral: "Tanpa Agunan Tambahan", match: 78, requirements: ["KTP", "Keanggotaan Koperasi", "SKU"] },
  { id: 5, provider: "Bank Arunika Demo", product: "KUR Mikro Demo", segment: "Pemerintah", plafonMin: 10, plafonMax: 50, tenorMin: 12, tenorMax: 36, cost: "0,5% / bulan (efektif)", collateral: "Tanpa Agunan Tambahan", match: 92, requirements: ["KTP", "KK", "Surat Keterangan Usaha"] },
  { id: 6, provider: "Artha Modal Demo", product: "Paylater Bisnis Demo", segment: "Digital", plafonMin: 2, plafonMax: 20, tenorMin: 1, tenorMax: 3, cost: "Mulai 1.5% / bulan", collateral: "Tanpa Agunan", match: 75, requirements: ["KTP", "Mutasi Rekening 3 Bulan"] },
];

export default function PembiayaanPage() {
  const [search, setSearch] = useState("");
  const [filterSegment, setFilterSegment] = useState("Semua");
  const [sortBy, setSortBy] = useState("match");
  const [selectedProduct, setSelectedProduct] = useState<typeof financingDemoData[0] | null>(null);

  let filtered = financingDemoData.filter(item => {
    if (filterSegment !== "Semua" && item.segment !== filterSegment) return false;
    if (search && !`${item.provider} ${item.product}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (sortBy === "match") filtered.sort((a, b) => b.match - a.match);
  if (sortBy === "plafon_min") filtered.sort((a, b) => a.plafonMin - b.plafonMin);
  if (sortBy === "plafon_max") filtered.sort((a, b) => b.plafonMax - a.plafonMax);
  if (sortBy === "tenor_min") filtered.sort((a, b) => a.tenorMin - b.tenorMin);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        <section className="pt-20 pb-12 bg-slate-50 border-b">
          <div className="container text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold mb-4 border border-amber-200">
              DATA DEMO
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-sigap-darkest mb-4 tracking-tight">Temukan Pembiayaan yang Sesuai</h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              Jelajahi contoh produk pembiayaan berdasarkan kebutuhan usaha Anda.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl border shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Cari produk atau lembaga..." 
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none focus:border-sigap-primary focus:ring-1 focus:ring-sigap-primary transition-all text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm bg-slate-50">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <select className="bg-transparent outline-none cursor-pointer" value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)}>
                    <option value="Semua">Semua Segmen</option>
                    <option value="Pemerintah">Pemerintah</option>
                    <option value="B2B">B2B</option>
                    <option value="UMKM">UMKM</option>
                    <option value="Digital">Digital</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm bg-slate-50">
                  <span className="text-muted-foreground">Urutkan:</span>
                  <select className="bg-transparent outline-none font-medium cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="match">Kecocokan Profil</option>
                    <option value="plafon_max">Plafon Tertinggi</option>
                    <option value="plafon_min">Plafon Terendah</option>
                    <option value="tenor_min">Tenor Terpendek</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products List */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed">
                <h3 className="text-lg font-semibold text-sigap-darkest mb-2">Data demo tidak ditemukan.</h3>
                <p className="text-muted-foreground text-sm mb-4">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
                <Button variant="outline" onClick={() => { setSearch(""); setFilterSegment("Semua"); }}>Reset Filter</Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2 text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        <Building2 className="w-3 h-3" /> {product.provider}
                      </div>
                      <div className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        {product.match}% Cocok
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-sigap-darkest mb-4">{product.product}</h3>
                    
                    <div className="space-y-3 mb-6 flex-1">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Plafon</p>
                        <p className="font-semibold text-sm">Rp {product.plafonMin} Juta - Rp {product.plafonMax} {product.plafonMax >= 1000 ? 'Miliar' : 'Juta'}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Tenor</p>
                          <p className="font-semibold text-sm">{product.tenorMin} - {product.tenorMax} bln</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Estimasi Biaya</p>
                          <p className="font-semibold text-sm">{product.cost}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full text-sigap-primary border-sigap-primary/30 hover:bg-sigap-primary/5" onClick={() => setSelectedProduct(product)}>
                      Lihat Detail
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-5 border-b bg-slate-50">
              <div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mb-2 inline-block tracking-wider">DATA DEMO</span>
                <h3 className="font-bold text-xl text-sigap-darkest">{selectedProduct.product}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Building2 className="w-4 h-4" /> {selectedProduct.provider}</p>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="text-muted-foreground hover:text-sigap-darkest p-2 bg-white rounded-full shadow-sm">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-sigap-darkest">Kecocokan Profil: {selectedProduct.match}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Berdasarkan profil usaha simulasi Anda, produk ini sangat relevan. Informasi pada halaman ini adalah simulasi.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Plafon Maksimal</p>
                  <p className="font-semibold text-sigap-darkest">Rp {selectedProduct.plafonMax} {selectedProduct.plafonMax >= 1000 ? 'Miliar' : 'Juta'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Tenor</p>
                  <p className="font-semibold text-sigap-darkest">{selectedProduct.tenorMin} - {selectedProduct.tenorMax} Bulan</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Estimasi Biaya</p>
                  <p className="font-semibold text-sigap-darkest">{selectedProduct.cost}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Agunan</p>
                  <p className="font-semibold text-sigap-darkest">{selectedProduct.collateral}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Segmen</p>
                  <p className="font-semibold text-sigap-darkest">{selectedProduct.segment}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Persyaratan Demo</p>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedProduct.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-sigap-darkest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-sigap-primary"></div> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-5 border-t bg-slate-50 flex gap-3">
              <Link href="/register" className="w-full flex">
                <Button className="w-full h-12 text-md font-bold shadow-md bg-sigap-primary">Sign Up untuk Mengajukan</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
