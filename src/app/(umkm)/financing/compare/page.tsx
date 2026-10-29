"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
Check,
GitCompare,ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FinancingComparePage() {
  const { data } = useDemo();
  const products = data.financing;

  // Selected products for comparison
  const [selectedIds, setSelectedIds] = useState<string[]>([products[0].id, products[1].id]);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) return; // Keep at least one
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        // Replace the oldest
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      } else {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  const comparedProducts = products.filter(p => selectedIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <GitCompare className="w-3.5 h-3.5" /> Matriks Komparasi Produk
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Bandingkan Produk Pembiayaan
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Bandingkan suku bunga, syarat agunan, tenor, dan plafon antar lembaga perbankan dan fintech legal terdaftar OJK secara objektif.
            </p>
          </div>

          <Link href="/financing">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl">
              Kembali ke Marketplace
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Selector Chips */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilih Produk untuk Dibandingkan (Maksimal 3):
          </label>
          <span className="text-xs font-bold text-sigap-primary">
            {selectedIds.length} Produk Dipilih
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {products.map(p => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected 
                    ? 'bg-sigap-darkest text-white border-sigap-darkest shadow-sm' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-sigap-yellow text-sigap-darkest' : 'border border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{p.product} ({p.provider})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[650px]">
            <thead className="bg-slate-50/90 text-slate-500 border-b border-slate-100">
              <tr>
                <th className="p-6 w-1/4 text-xs font-bold uppercase tracking-wider">
                  Kriteria Pembiayaan
                </th>
                {comparedProducts.map(p => (
                  <th key={p.id} className="p-6 w-1/4 align-top">
                    <span className="text-xs font-bold text-slate-400 block uppercase">{p.provider}</span>
                    <span className="text-lg font-display font-extrabold text-sigap-darkest block mt-0.5">{p.product}</span>
                    <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <ShieldCheck className="w-3 h-3" /> {p.verification_badge}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Kecocokan Profil */}
              <tr className="bg-amber-50/30">
                <td className="p-6 font-bold text-sigap-darkest">Kecocokan Profil Usaha</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[120px] bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-full rounded-full bg-emerald-500" 
                          style={{ width: `${p.profile_match}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-emerald-700 text-base">{p.profile_match}%</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Plafon */}
              <tr>
                <td className="p-6 font-bold text-sigap-darkest">Rentang Plafon</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6 font-semibold text-slate-700">
                    {formatCurrency(p.ceiling_min)} s/d {formatCurrency(p.ceiling_max)}
                  </td>
                ))}
              </tr>

              {/* Tenor */}
              <tr>
                <td className="p-6 font-bold text-sigap-darkest">Jangka Waktu (Tenor)</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6 font-semibold text-slate-700">
                    {p.tenor_min_months} - {p.tenor_max_months} Bulan
                  </td>
                ))}
              </tr>

              {/* Estimasi Biaya */}
              <tr>
                <td className="p-6 font-bold text-sigap-darkest">Suku Bunga / Biaya</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6 font-extrabold text-sigap-primary text-base">
                    {p.estimated_fee_text}
                  </td>
                ))}
              </tr>

              {/* Agunan */}
              <tr>
                <td className="p-6 font-bold text-sigap-darkest">Agunan / Jaminan</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6 font-medium text-slate-700">
                    {p.collateral}
                  </td>
                ))}
              </tr>

              {/* Segmentasi */}
              <tr>
                <td className="p-6 font-bold text-sigap-darkest">Segmentasi Debitur</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
                      {p.segment}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Aksi Ajukan */}
              <tr className="bg-slate-50/50">
                <td className="p-6 font-bold text-sigap-darkest">Langkah Pengajuan</td>
                {comparedProducts.map(p => (
                  <td key={p.id} className="p-6">
                    <Link href="/financing">
                      <Button className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl text-xs py-2.5 shadow-sm">
                        Ajukan Sekarang &rarr;
                      </Button>
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
