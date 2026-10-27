import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Audit Log</h2>
          <p className="text-muted-foreground mt-1">Catatan aktivitas sistem</p>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-sigap-soft/20 text-sigap-primary rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Data Belum Tersedia</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">Modul Audit Log saat ini menggunakan mock data service yang terisolasi. Data real akan mengalir setelah integrasi API.</p>
      </div>
    </div>
  );
}
