"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
AlertCircle,
CheckCircle2,
Clock,
Download,
Eye,
FileText,
Search,
ShieldCheck,
Upload,
X
} from 'lucide-react';
import { AnimatePresence,motion } from 'motion/react';
import React,{ useState } from 'react';

export default function DocumentsPage() {
  const { data } = useDemo();
  const documents = data.documents;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadToast, setUploadToast] = useState('');

  const filteredDocs = documents.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'Semua' ? true : doc.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return (
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
          </span>
        );
      case 'pending_review':
        return (
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
            <Clock className="w-3.5 h-3.5" /> Menunggu Validasi Bank
          </span>
        );
      default:
        return (
          <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit">
            <AlertCircle className="w-3.5 h-3.5" /> Belum Diunggah
          </span>
        );
    }
  };

  const showToast = (msg: string) => {
    setUploadToast(msg);
    setTimeout(() => setUploadToast(''), 3000);
  };

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadOpen(false);
    showToast('Dokumen baru berhasil diunggah & masuk antrean review!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Toast */}
      {uploadToast && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-6 right-6 z-50 bg-sigap-darkest text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{uploadToast}</span>
        </motion.div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-5 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Brankas Legalitas Digital
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Dokumen Usaha & Legalitas
            </h1>
            <p className="text-white/70 max-w-2xl text-xs sm:text-base leading-relaxed">
              Arsipkan berkas legalitas bisnis (NIB, KTP, NPWP, Rekening Koran) secara terenkripsi untuk mempermudah proses due diligence bank.
            </p>
          </div>

          <Button 
            onClick={() => setIsUploadOpen(true)}
            className="w-full sm:w-auto bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold px-6 py-2.5 rounded-2xl shadow-lg shadow-sigap-yellow/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Unggah Dokumen Baru
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Search & Filter Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-lg text-sigap-darkest">Daftar Dokumen Terdaftar</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
              {filteredDocs.length} Berkas
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari dokumen..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-white"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 border border-slate-200 rounded-2xl text-xs font-semibold outline-none bg-white text-slate-700 focus:ring-2 focus:ring-sigap-primary"
            >
              <option value="Semua">Semua Status</option>
              <option value="verified">Terverifikasi</option>
              <option value="pending_review">Menunggu Validasi</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/90 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nama Dokumen</th>
                <th className="px-6 py-4">Status Validasi OJK / Bank</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-semibold text-sigap-darkest flex items-center gap-3">
                    <div className="p-2.5 bg-sigap-soft/20 text-sigap-primary rounded-2xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span>{doc.name}</span>
                      <span className="block text-[11px] font-mono text-slate-400 font-normal">
                        ID: {doc.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(doc.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedDoc(doc)}
                      className="rounded-xl border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> Pratinjau
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredDocs.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada dokumen yang sesuai dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sigap-soft/20 text-sigap-primary rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-sigap-darkest">{selectedDoc.name}</h4>
                    <span className="text-xs text-slate-400 font-mono">ID: {selectedDoc.id}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-sigap-darkest">Dokumen Terenkripsi & Terverifikasi</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Salinan digital telah divalidasi dengan checksum hash SHA-256 untuk memastikan keaslian berkas.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setSelectedDoc(null)} className="rounded-2xl text-xs">
                  Tutup
                </Button>
                <Button 
                  onClick={() => { setSelectedDoc(null); showToast('Mengunduh salinan berkas terenkripsi...'); }}
                  className="bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl text-xs font-bold"
                >
                  <Download className="w-4 h-4 mr-1.5" /> Unduh Berkas
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 p-6 md:p-8 space-y-5"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-xl font-display font-bold text-sigap-darkest">Unggah Berkas Baru</h3>
                <button onClick={() => setIsUploadOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSimulateUpload} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Pilih Jenis Dokumen</label>
                  <select className="w-full p-3 rounded-2xl border text-sm outline-none bg-white">
                    <option>Surat Keterangan Usaha (SKU)</option>
                    <option>Rekening Koran 3 Bulan Terakhir</option>
                    <option>Laporan Keuangan Internal</option>
                    <option>Surat Izin Tempat Usaha (SITU)</option>
                  </select>
                </div>

                <div className="border-2 border-dashed border-slate-300 p-8 rounded-2xl text-center space-y-2 hover:border-sigap-primary cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">Tarik berkas PDF / JPG ke sini atau klik untuk memilih</p>
                  <p className="text-[11px] text-slate-400">Ukuran maksimal 10 MB per file</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)} className="rounded-2xl flex-1 text-xs">
                    Batal
                  </Button>
                  <Button type="submit" className="bg-sigap-primary text-white hover:bg-sigap-primary/90 font-bold rounded-2xl flex-1 text-xs">
                    Mulai Unggah Berkas
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
