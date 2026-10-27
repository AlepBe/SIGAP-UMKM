"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';
import { Search, Filter, Eye, CheckCircle2, XCircle, ArrowUpRight, FileText, Check, AlertTriangle } from 'lucide-react';

export default function ApplicationsPage() {
  const { data, updateData } = useLenderDemo();
  const applications = data.applications;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    if (status.toLowerCase().includes('review')) return <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">Review</span>;
    if (status.toLowerCase().includes('baru')) return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Baru</span>;
    if (status.toLowerCase().includes('disetujui')) return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Disetujui</span>;
    if (status.toLowerCase().includes('ditolak')) return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Ditolak</span>;
    if (status.toLowerCase().includes('disalurkan')) return <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-semibold">Disalurkan</span>;
    if (status.toLowerCase().includes('dokumen')) return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold">Verifikasi Dokumen</span>;
    return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{status}</span>;
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchSearch = app.business_name.toLowerCase().includes(searchQuery.toLowerCase()) || app.id.toLowerCase().includes(searchQuery.toLowerCase());
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
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pipeline Pengajuan</h2>
          <p className="text-muted-foreground mt-1">Kelola dan evaluasi pengajuan pembiayaan dari UMKM (Demo).</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Cari ID atau nama usaha..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sigap-primary bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Baru">Baru</option>
            <option value="Review">Review</option>
            <option value="Verifikasi Dokumen">Verifikasi Dokumen</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Disalurkan">Disalurkan</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Nama Usaha</th>
                <th className="px-6 py-4 font-medium">Skor SIGAP</th>
                <th className="px-6 py-4 font-medium">Plafon Diajukan</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredApps.map(app => (
                <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{app.id}</td>
                  <td className="px-6 py-4 font-medium text-sigap-darkest">{app.business_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">{app.score}</span>
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded font-bold">{app.grade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(app.requested_amount)}</td>
                  <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedApp(app)} className="border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white">
                        Evaluasi
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApps.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada pengajuan yang sesuai dengan filter/pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-between items-center text-sm text-muted-foreground">
          <span>Menampilkan {filteredApps.length} data pengajuan (Demo).</span>
        </div>
      </div>

      {/* Evaluation Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 overflow-hidden">
          <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-6 border-b bg-sigap-darkest text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-bold text-lg">Evaluasi Pengajuan</h3>
                <p className="text-white/70 text-sm font-mono">{selectedApp.id}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-white/70 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 flex-1 space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-xl text-sigap-darkest">{selectedApp.business_name}</h4>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-y-2 mt-4">
                  <div><strong>Pemilik:</strong><br/>{selectedApp.owner_name}</div>
                  <div><strong>Lokasi:</strong><br/>{selectedApp.city}</div>
                  <div><strong>Jenis Usaha:</strong><br/>{selectedApp.business_type}</div>
                  <div><strong>Produk:</strong><br/>{selectedApp.product_id}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-semibold text-sm text-muted-foreground uppercase mb-3">Detail Pengajuan</h5>
                <div className="bg-gray-50 p-4 rounded-xl border grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Plafon Diajukan</div>
                    <div className="font-bold text-lg">{formatCurrency(selectedApp.requested_amount)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Tenor</div>
                    <div className="font-bold text-lg">{selectedApp.tenor_months} Bulan</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-semibold text-sm text-muted-foreground uppercase mb-3">Analisis Risiko (SIGAP)</h5>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Skor</div>
                    <div className="font-bold text-green-600 text-xl">{selectedApp.score}</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Grade</div>
                    <div className="font-bold text-green-600 text-xl">{selectedApp.grade}</div>
                  </div>
                  <div className="border rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Cashflow</div>
                    <div className={`font-bold text-sm mt-1 ${selectedApp.cashflow_status === 'Sehat' ? 'text-green-600' : 'text-amber-600'}`}>
                      {selectedApp.cashflow_status}
                    </div>
                  </div>
                </div>
                
                {selectedApp.risk_flags && selectedApp.risk_flags.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-amber-800 mb-1">Catatan Risiko</div>
                      <ul className="text-xs text-amber-700 list-disc pl-4 space-y-1">
                        {selectedApp.risk_flags.map((flag: string, i: number) => (
                          <li key={i}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {(!selectedApp.risk_flags || selectedApp.risk_flags.length === 0) && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    <span className="text-sm font-medium text-green-800">Tidak ada risiko signifikan yang terdeteksi.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex flex-wrap gap-2">
              <Button onClick={() => handleUpdateStatus(selectedApp.id, 'Review')} variant="outline" className="flex-1">
                Set Review
              </Button>
              <Button onClick={() => handleUpdateStatus(selectedApp.id, 'Verifikasi Dokumen')} variant="outline" className="flex-1">
                Req. Dokumen
              </Button>
              <Button onClick={() => handleUpdateStatus(selectedApp.id, 'Ditolak')} variant="destructive" className="flex-1">
                Tolak
              </Button>
              <Button onClick={() => handleUpdateStatus(selectedApp.id, 'Disetujui')} className="flex-1 bg-green-600 hover:bg-green-700">
                Setujui
              </Button>
              <Button onClick={() => handleUpdateStatus(selectedApp.id, 'Disalurkan')} className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
                Konfirmasi Pencairan (Disalurkan)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
