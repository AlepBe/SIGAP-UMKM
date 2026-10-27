"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Lock, LogOut, Bell, Shield, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app we'd clear auth tokens. For demo, just redirect to login.
    router.push('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pengaturan</h2>
          <p className="text-muted-foreground mt-1">Kelola preferensi akun dan keamanan aplikasi.</p>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Shield className="w-5 h-5 text-sigap-primary" />
          <h3 className="font-semibold text-lg text-gray-900">Keamanan Akun</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h4 className="font-medium text-gray-900">Ubah Kata Sandi</h4>
              <p className="text-sm text-gray-500 mt-1">Perbarui kata sandi Anda secara berkala untuk keamanan.</p>
            </div>
            <Button variant="outline" onClick={() => alert('Simulasi: Modal ubah kata sandi.')}>Ubah Kata Sandi</Button>
          </div>
          
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                Autentikasi Dua Faktor (2FA) <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">AKTIF</span>
              </h4>
              <p className="text-sm text-gray-500 mt-1">Gunakan aplikasi authenticator atau SMS untuk keamanan ekstra.</p>
            </div>
            <Button variant="outline">Kelola 2FA</Button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <Bell className="w-5 h-5 text-sigap-primary" />
          <h3 className="font-semibold text-lg text-gray-900">Preferensi Notifikasi</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Notifikasi Transaksi Baru</h4>
              <p className="text-sm text-gray-500">Dapatkan peringatan saat ada transaksi tercatat.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sigap-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sigap-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <h4 className="font-medium text-gray-900">Update Skor Kredit</h4>
              <p className="text-sm text-gray-500">Pemberitahuan perubahan skor kelayakan Anda.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sigap-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sigap-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-semibold text-red-900">Keluar Aplikasi</h3>
          <p className="text-sm text-red-700 mt-1">Anda akan keluar dari sesi demo ini.</p>
        </div>
        <Button onClick={handleLogout} variant="destructive" className="w-full sm:w-auto">
          <LogOut className="w-4 h-4 mr-2" />
          Keluar
        </Button>
      </div>
    </div>
  );
}
