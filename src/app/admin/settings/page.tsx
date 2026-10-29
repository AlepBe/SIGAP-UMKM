"use client";

import { Button } from '@/components/ui/button';
import {
CheckCircle2,
Server
} from 'lucide-react';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Konfigurasi Sistem Platform</h2>
        <p className="text-muted-foreground mt-1">Pengaturan gateway integrasi, koneksi database, dan manajemen lisensi API.</p>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2 border-b pb-3">
          <Server className="w-5 h-5 text-sigap-primary" /> Gateway & Lingkungan Server
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-semibold text-gray-900">Lingkungan Operasional</p>
              <p className="text-xs text-gray-500">Node Cluster ID-JKT-01 (Tier-3 Cloud)</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
              Production Active
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-t">
            <div>
              <p className="font-semibold text-gray-900">Database Core (PostgreSQL High Availability)</p>
              <p className="text-xs text-gray-500">Replikasi multi-zona aktif dengan backup harian terenkripsi</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => showToast('Backup database dimulai...')}>
              Backup Manual
            </Button>
          </div>

          <div className="flex justify-between items-center py-2 border-t">
            <div>
              <p className="font-semibold text-gray-900">Kunci API & Webhook OJK</p>
              <p className="text-xs text-gray-500">Masa berlaku token: 180 hari tersisa</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => showToast('Kunci API berhasil di-refresh.')}>
              Rotate API Key
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
