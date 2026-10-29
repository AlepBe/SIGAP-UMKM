"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    namaUsaha: '',
    jenisUsaha: '',
    kota: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <div className="w-full md:w-1/2 bg-sigap-darkest text-white p-6 sm:p-8 md:p-12 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 sm:mb-12 transition-colors text-sm font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
          </Link>
          <div className="mb-6 sm:mb-12">
            <Logo variant="white" height={36} />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 sm:mb-6 leading-tight">Mulai Perjalanan Pertumbuhan UMKM Anda.</h1>
          
          <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-8 text-sm sm:text-base">
            <li className="flex items-center"><CheckCircle2 className="text-sigap-yellow w-5 h-5 mr-3 shrink-0" /> Pencatatan keuangan otomatis</li>
            <li className="flex items-center"><CheckCircle2 className="text-sigap-yellow w-5 h-5 mr-3 shrink-0" /> Penilaian skor kredit berbasis pola transaksi</li>
            <li className="flex items-center"><CheckCircle2 className="text-sigap-yellow w-5 h-5 mr-3 shrink-0" /> Akses marketplace pembiayaan OJK</li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 md:py-12">
        <div className="w-full max-w-xl bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-sigap-darkest mb-6">Buat Akun Demo</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik *</label>
                <input required type="text" name="nama" value={formData.nama} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="0812..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="demo@sigap.test" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Usaha *</label>
                <input required type="text" name="namaUsaha" value={formData.namaUsaha} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="Kedai Kopi Senja" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Usaha *</label>
                <select required name="jenisUsaha" value={formData.jenisUsaha} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none bg-white">
                  <option value="">Pilih Kategori</option>
                  <option value="F&B">F&B / Kuliner</option>
                  <option value="Retail">Retail / Perdagangan</option>
                  <option value="Jasa">Jasa</option>
                  <option value="Manufaktur">Manufaktur / Kerajinan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kota *</label>
              <input required type="text" name="kota" value={formData.kota} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="Jakarta" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi *</label>
                <input required type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Sandi *</label>
                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full p-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary outline-none" placeholder="••••••••" />
              </div>
            </div>

            <div className="pt-4">
              <Button variant="navy" type="submit" disabled={isLoading} className="w-full h-12 text-base">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Lanjutkan Pendaftaran UMKM"
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            Sudah punya akun? <Link href="/login" className="text-sigap-primary font-medium hover:underline">Masuk</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
