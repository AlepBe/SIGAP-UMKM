"use client";

import { Button } from '@/components/ui/button';
import {
CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLegalVerificationPage() {
  const [toast, setToast] = useState('');

  const reports = [
    { id: 'REP-001', entity: 'KSP Dana Cepat Online', sender: '0813-0000-5678', reportedBy: 'Kedai Kopi Senja', reason: 'Meminta transfer biaya provisi Rp 350.000 di awal', status: 'suspected' },
    { id: 'REP-002', entity: 'Easy Pinjam Kilat', sender: '0852-9999-1234', reportedBy: 'Warung Bu Siti', reason: 'Mengancam sebar kontak handphone', status: 'confirmed_illegal' },
    { id: 'REP-003', entity: 'Bank Mandiri Mitra', sender: '021-500-150', reportedBy: 'CV Maju Mandiri', reason: 'Verifikasi kontak resmi', status: 'verified_official' }
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Moderasi Legalitas & Laporan Pinjol Ilegal</h2>
          <p className="text-muted-foreground mt-1">Antrean investigasi laporan penipuan keuangan dari pengguna dan validasi izin OJK.</p>
        </div>
        <Button onClick={() => showToast('Sinkronisasi database Satgas Pasti OJK...')} variant="outline">
          Sinkronisasi Satgas OJK
        </Button>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left text-sm min-w-[650px]">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b">
            <tr>
              <th className="px-6 py-4">ID & Entitas Terlapor</th>
              <th className="px-6 py-4">Kontak / Pengirim</th>
              <th className="px-6 py-4">Pelapor</th>
              <th className="px-6 py-4">Indikasi Pelanggaran</th>
              <th className="px-6 py-4">Status Investigasi</th>
              <th className="px-6 py-4 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map(r => (
              <tr key={r.id} className="hover:bg-gray-50/70">
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {r.entity}
                  <span className="block text-xs font-mono text-gray-400">{r.id}</span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{r.sender}</td>
                <td className="px-6 py-4 text-gray-700">{r.reportedBy}</td>
                <td className="px-6 py-4 text-xs text-rose-700 font-medium">{r.reason}</td>
                <td className="px-6 py-4">
                  {r.status === 'confirmed_illegal' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                      Ilegal Terkonfirmasi
                    </span>
                  ) : r.status === 'verified_official' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Resmi Terverifikasi
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      Dalam Investigasi
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => showToast(`Status entitas ${r.entity} diperbarui ke Blacklist OJK.`)}
                    className="text-xs"
                  >
                    Blokir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
