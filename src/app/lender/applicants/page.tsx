"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { 
  Database, Search, MapPin, CheckCircle2, Send, XCircle 
} from 'lucide-react';

export default function ApplicantsPage() {
  const { data } = useLenderDemo();
  const profiles = data.umkm_profiles;

  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('score-desc');
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [offerSentId, setOfferSentId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const cities = ['Semua', ...Array.from(new Set(profiles.map(p => p.city)))];

  const filteredAndSorted = useMemo(() => {
    let result = profiles.filter(p => {
      const matchSearch = p.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.business_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.business_type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = cityFilter === 'Semua' ? true : p.city === cityFilter;
      return matchSearch && matchCity;
    });

    result = result.sort((a, b) => {
      if (sortOrder === 'score-desc') return b.score - a.score;
      if (sortOrder === 'score-asc') return a.score - b.score;
      if (sortOrder === 'revenue-desc') return b.monthly_revenue_est - a.monthly_revenue_est;
      return 0;
    });

    return result;
  }, [profiles, searchQuery, cityFilter, sortOrder]);

  const handleSendPreApprovedOffer = (profileId: string) => {
    setOfferSentId(profileId);
    setTimeout(() => {
      setOfferSentId(null);
      setSelectedProfile(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 font-sans">
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10"
      >
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sigap-yellow text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
            <Database className="w-3.5 h-3.5" /> Direktori Calon Debitur Potensial
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Database Profil UMKM Terkurasi
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Eksplorasi ribuan pelaku usaha dengan histori transaksi sehat yang telah memberikan persetujuan berbagi data kredit (Open Finance).
          </p>
        </div>
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari ID usaha, nama merchant, atau kategori produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-slate-50 text-slate-700"
            >
              {cities.map(city => <option key={city} value={city}>{city === 'Semua' ? 'Semua Wilayah' : city}</option>)}
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-slate-200 rounded-2xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-slate-50 text-slate-700"
            >
              <option value="score-desc">Skor Tertinggi (A-Grade)</option>
              <option value="score-asc">Skor Terendah</option>
              <option value="revenue-desc">Estimasi Omzet Terbesar</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Ditemukan <strong className="text-sigap-darkest">{filteredAndSorted.length}</strong> profil usaha terverifikasi
        </div>
      </div>
      
      {/* Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID & Nama Usaha</th>
                <th className="px-6 py-4">Domisili Kota</th>
                <th className="px-6 py-4">Skor & Kategori</th>
                <th className="px-6 py-4">Omzet Bulanan (Est.)</th>
                <th className="px-6 py-4">Stabilitas Arus Kas</th>
                <th className="px-6 py-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSorted.map(profile => (
                <tr key={profile.business_id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sigap-primary to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {profile.business_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-display font-bold text-sigap-darkest text-sm">{profile.business_name}</div>
                        <div className="text-xs text-slate-400">{profile.business_id} • {profile.business_type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {profile.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-emerald-600 text-base">{profile.score}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] rounded-full font-bold">
                        Grade {profile.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-display font-extrabold text-sigap-darkest text-sm">
                      {formatCurrency(profile.monthly_revenue_est)}
                    </div>
                    <div className="text-[11px] text-slate-400">Operasi {profile.years_operating} Tahun</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                      profile.cashflow_status === 'Sehat' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      profile.cashflow_status === 'Stabil' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {profile.cashflow_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedProfile(profile)} 
                      className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold text-xs rounded-xl px-4 shadow-sm"
                    >
                      Lihat Profil
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredAndSorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <Database className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-600">Tidak ada profil UMKM yang cocok</p>
                    <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau reset filter wilayah.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden font-sans border border-slate-200 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 bg-sigap-darkest text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sigap-yellow font-display">
                    Profil Lengkap Calon Debitur
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white">{selectedProfile.business_name}</h3>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">{selectedProfile.business_id}</p>
                </div>
                <button 
                  onClick={() => setSelectedProfile(null)} 
                  className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                {/* 4 Metrics Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Skor SIGAP</div>
                    <div className="font-display font-extrabold text-emerald-600 text-2xl">{selectedProfile.score}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Kategori</div>
                    <div className="font-display font-extrabold text-sigap-primary text-2xl">Grade {selectedProfile.grade}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status Cashflow</div>
                    <div className="font-display font-bold text-sm text-emerald-600 mt-1">{selectedProfile.cashflow_status}</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Lama Usaha</div>
                    <div className="font-display font-bold text-sm text-slate-700 mt-1">{selectedProfile.years_operating} Tahun</div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Estimasi Finansial Bulanan (Berdasarkan Mutasi Digital)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                      <span className="text-[11px] text-slate-500 font-medium">Estimasi Omzet</span>
                      <div className="font-display font-extrabold text-lg text-sigap-darkest mt-0.5">
                        {formatCurrency(selectedProfile.monthly_revenue_est)}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                      <span className="text-[11px] text-slate-500 font-medium">Pengeluaran Operasional</span>
                      <div className="font-display font-extrabold text-lg text-rose-600 mt-0.5">
                        {formatCurrency(selectedProfile.monthly_expense_est)}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-[11px] text-slate-500 font-medium">Saldo Kas Rata-rata</span>
                      <div className="font-display font-extrabold text-lg text-emerald-600 mt-0.5">
                        {formatCurrency(selectedProfile.cash_balance_est)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance & Data Completeness */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Kelengkapan Dokumen & Legalitas Usaha
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Alamat & Lokasi Operasional:</span>
                      <span className="font-bold text-sigap-darkest">{selectedProfile.city}, {selectedProfile.province}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Kelengkapan Profil Bisnis:</span>
                      <span className="font-bold text-emerald-600">{selectedProfile.profile_completion_pct}% Terverifikasi</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Dokumen Prasyarat (NIB, KTP, NPWP):</span>
                      <span className="font-bold text-emerald-600">{selectedProfile.documents_completion_pct}% Lengkap</span>
                    </div>
                  </div>
                </div>

                {/* Offer Sent State Notice */}
                {offerSentId === selectedProfile.business_id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Penawaran Pre-approved berhasil dikirimkan langsung ke aplikasi SIGAP pelaku usaha!</span>
                  </motion.div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                <Button variant="ghost" onClick={() => setSelectedProfile(null)} className="text-xs font-semibold text-slate-500">
                  Kembali
                </Button>
                <Button 
                  onClick={() => handleSendPreApprovedOffer(selectedProfile.business_id)}
                  disabled={offerSentId === selectedProfile.business_id}
                  className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold text-xs rounded-2xl px-6 py-5 shadow-lg shadow-sigap-primary/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Penawaran Pre-Approved
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
