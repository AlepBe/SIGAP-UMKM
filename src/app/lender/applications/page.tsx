"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { 
  Search, CheckCircle2, XCircle, FileText, AlertTriangle 
} from 'lucide-react';

export default function ApplicationsPage() {
  const { data, updateData } = useLenderDemo();
  const applications = data.applications;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [actionSuccessNotice, setActionSuccessNotice] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    if (status.toLowerCase().includes('review')) return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Review</span>;
    if (status.toLowerCase().includes('baru')) return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Baru</span>;
    if (status.toLowerCase().includes('disetujui')) return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Disetujui</span>;
    if (status.toLowerCase().includes('ditolak')) return <span className="bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Ditolak</span>;
    if (status.toLowerCase().includes('disalurkan')) return <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Disalurkan</span>;
    if (status.toLowerCase().includes('dokumen')) return <span className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Verifikasi Dokumen</span>;
    return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchSearch = app.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'Semua' ? true : app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const handleUpdateStatus = (appId: string, newStatus: string) => {
    updateData(prev => ({
      ...prev,
      applications: prev.applications.map(app => 
        app.id === appId ? { ...app, status: newStatus, last_action: `Berubah ke ${newStatus}` } : app
      )
    }));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    setActionSuccessNotice(`Status pengajuan ${appId} berhasil diperbarui menjadi "${newStatus}".`);
    setTimeout(() => setActionSuccessNotice(null), 3500);
  };

  const filterOptions = ['Semua', 'Baru', 'Verifikasi Dokumen', 'Review', 'Disetujui', 'Disalurkan', 'Ditolak'];

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
            <FileText className="w-3.5 h-3.5" /> Pipeline Evaluasi Kredit Produktif
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
            Pipeline & Verifikasi Berkas Pengajuan
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Kelola, verifikasi data legalitas NIB, dan setujui plafon kredit UMKM binaan dengan audit trail real-time.
          </p>
        </div>
      </motion.div>

      {/* Action Notification Toast */}
      <AnimatePresence>
        {actionSuccessNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{actionSuccessNotice}</span>
            </div>
            <button onClick={() => setActionSuccessNotice(null)} className="text-white/80 hover:text-white">
              <XCircle className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama usaha, nama pemilik, kota, atau ID pengajuan..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sigap-primary focus:bg-white transition-all"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium shrink-0 self-center">
            Menampilkan <strong className="text-sigap-darkest">{filteredApps.length}</strong> dari {applications.length} berkas
          </div>
        </div>

        {/* Status Filter Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === opt
                  ? 'bg-sigap-primary text-white shadow-md shadow-sigap-primary/25 font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      
      {/* Applications Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID & Nama Usaha</th>
                <th className="px-6 py-4">Pemilik & Lokasi</th>
                <th className="px-6 py-4">Skor & Grade</th>
                <th className="px-6 py-4">Plafon Diajukan</th>
                <th className="px-6 py-4">Status Pengajuan</th>
                <th className="px-6 py-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sigap-primary to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {app.business_name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-display font-bold text-sigap-darkest text-sm">{app.business_name}</div>
                        <div className="font-mono text-[11px] text-slate-400">{app.id} • {app.business_type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700 text-xs">{app.owner_name}</div>
                    <div className="text-[11px] text-slate-400">{app.city}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-emerald-600 text-base">{app.score}</span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] rounded-full font-bold">
                        Grade {app.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="font-display font-extrabold text-sigap-darkest text-sm">{formatCurrency(app.requested_amount)}</div>
                    <div className="text-[11px] text-slate-400">{app.tenor_months} Bulan</div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedApp(app)} 
                      className="bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold text-xs rounded-xl px-4 shadow-sm"
                    >
                      Evaluasi
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                    <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-bold text-sm text-slate-600">Tidak ada pengajuan ditemukan</p>
                    <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status Anda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Drawer / Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm overflow-hidden"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-6 bg-sigap-darkest text-white flex justify-between items-center sticky top-0 z-10 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sigap-yellow font-display">
                    Panel Evaluasi & Persetujuan
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-white">{selectedApp.business_name}</h3>
                  <p className="text-slate-400 text-xs font-mono mt-0.5">{selectedApp.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)} 
                  className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 space-y-6">
                {/* Financial Summary Card */}
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Plafon Diajukan</span>
                    <span className="font-display font-extrabold text-xl text-sigap-darkest">
                      {formatCurrency(selectedApp.requested_amount)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Tenor</span>
                      <p className="font-display font-bold text-sigap-darkest text-sm mt-0.5">{selectedApp.tenor_months} Bulan</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Skor Kredit</span>
                      <p className="font-display font-extrabold text-emerald-600 text-sm mt-0.5">{selectedApp.score}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Arus Kas</span>
                      <p className="font-display font-bold text-blue-600 text-sm mt-0.5">{selectedApp.cashflow_status}</p>
                    </div>
                  </div>
                </div>

                {/* Identity & Legal Information */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Profil Badan Usaha & Pemilik
                  </h4>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pemilik Usaha:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.owner_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kota / Provinsi:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sektor Industri:</span>
                      <span className="font-bold text-sigap-darkest">{selectedApp.business_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Paket Pembiayaan:</span>
                      <span className="font-bold text-sigap-primary">{selectedApp.product_id}</span>
                    </div>
                  </div>
                </div>

                {/* Document Verification Checklist */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Checklist Dokumen Prasyarat (OJK)
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-700">KTP Direktur / Pemilik</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Terverifikasi Dukcapil</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-700">Nomor Induk Berusaha (NIB)</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Valid OSS RBA</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-slate-700">Laporan Keuangan & Mutasi QRIS</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Tersinkronisasi 100%</span>
                    </div>
                  </div>
                </div>

                {/* Risk Flags / Notes */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Evaluasi Profil Risiko (SIGAP Risk Engine)
                  </h4>
                  {selectedApp.risk_flags && selectedApp.risk_flags.length > 0 ? (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        Catatan Mitigasi Risiko
                      </div>
                      <ul className="text-xs text-amber-700 list-disc pl-5 space-y-1">
                        {selectedApp.risk_flags.map((flag: string, i: number) => (
                          <li key={i}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-emerald-800">
                        Profil risiko sangat aman. Rasio DSCR &gt; 2.2x dan rekam jejak pembayaran bersih.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Review')} 
                    variant="outline" 
                    className="rounded-2xl text-xs font-bold border-slate-300"
                  >
                    Set Review
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Verifikasi Dokumen')} 
                    variant="outline" 
                    className="rounded-2xl text-xs font-bold border-slate-300"
                  >
                    Req. Tambahan Berkas
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Ditolak')} 
                    className="bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-bold shadow-md"
                  >
                    Tolak Pengajuan
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Disetujui')} 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md"
                  >
                    Setujui Plafon
                  </Button>
                </div>
                <Button 
                  onClick={() => handleUpdateStatus(selectedApp.id, 'Disalurkan')} 
                  className="w-full bg-sigap-primary hover:bg-sigap-primary/90 text-white rounded-2xl text-xs font-bold py-5 shadow-lg shadow-sigap-primary/30"
                >
                  Konfirmasi Pencairan Dana (Disalurkan)
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
