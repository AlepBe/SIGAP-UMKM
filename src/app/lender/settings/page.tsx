"use client";

import React, { useState } from 'react';
import { Settings, Lock, RefreshCw, Activity, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenderDemo } from '@/lib/context/LenderContext';

export default function SettingsPage() {
  const { resetData } = useLenderDemo();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestAPI = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('Koneksi berhasil! Status: 200 OK. Waktu respons: 42ms');
    }, 1500);
  };

  const handleResetData = () => {
    if (confirm('Anda yakin ingin mereset semua data demo Partner Workspace ke kondisi awal?')) {
      resetData();
      alert('Data demo berhasil direset.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pengaturan API & Akun</h2>
          <p className="text-muted-foreground mt-1">Konfigurasi integrasi dengan sistem core banking Anda.</p>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Lock className="w-5 h-5 text-sigap-primary" />
          <h3 className="font-semibold text-lg text-gray-900">API Keys (Demo)</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Production API Key</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  value="sk_live_sigap_x8j92k1ld03m4n5b6v7c8x9z" 
                  readOnly 
                  className="flex-1 p-2 bg-gray-50 border rounded-md font-mono text-sm" 
                />
                <Button variant="outline">Salin</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
              <div className="flex gap-2">
                <input 
                  type="url" 
                  defaultValue="https://api.banknusantara.com/v1/webhooks/sigap" 
                  className="flex-1 p-2 border rounded-md text-sm" 
                />
                <Button variant="outline">Simpan</Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Uji Koneksi Webhook
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button 
                onClick={handleTestAPI} 
                disabled={isTesting}
                className="bg-sigap-primary w-full sm:w-auto"
              >
                {isTesting ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Menguji...</>
                ) : (
                  'Kirim Payload Uji Coba'
                )}
              </Button>
              
              {testResult && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                  {testResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-red-100">
          <h3 className="font-semibold text-lg text-red-800">Zona Bahaya (Demo)</h3>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-red-700">
            Fungsi ini akan menghapus semua perubahan (status pengajuan, produk) yang Anda lakukan selama sesi ini dan mengembalikan data ke kondisi awal.
          </p>
          <Button variant="destructive" onClick={handleResetData}>
            <RefreshCw className="w-4 h-4 mr-2" /> Reset Data Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
