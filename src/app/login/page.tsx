"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Building2, Store } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

type ActiveTab = 'umkm' | 'lender';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('umkm');
  const [email, setEmail] = useState('demo@sigap.test');
  const [password, setPassword] = useState('Demo123!');
  
  const router = useRouter();
  const { login, session } = useAuth();

  useEffect(() => {
    if (activeTab === 'umkm') {
      setEmail('demo@sigap.test');
      setPassword('Demo123!');
    } else {
      setEmail('');
      setPassword('');
    }
  }, [activeTab]);

  useEffect(() => {
    // If already logged in, redirect
    if (session?.authenticated) {
      if (session.role === 'umkm') {
        router.replace('/dashboard');
      } else if (session.role === 'lender') {
        router.replace('/lender/dashboard');
      }
    }
  }, [session, router]);

  const handleDemoLenderClick = () => {
    setActiveTab('lender');
    setEmail('lender@sigap.test');
    setPassword('Demo123!');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (activeTab === 'umkm') {
        login({
          id: 'USR-001',
          name: 'Budi Santoso',
          email: 'demo@sigap.test',
          role: 'umkm',
          authenticated: true
        });
        router.push('/dashboard');
      } else {
        login({
          id: 'LND-001',
          name: 'Bank Nusantara Demo',
          email: 'lender@sigap.test',
          role: 'lender',
          authenticated: true
        });
        router.push('/lender/dashboard');
      }
      setIsLoading(false);
    }, 1000);
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 sm:mb-6 leading-tight">Selamat Datang Kembali di Ekosistem Pembiayaan Cerdas.</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
            {activeTab === 'umkm' 
              ? "Masuk untuk melihat perkembangan bisnis Anda, cek skor kredit terbaru, dan akses peluang pembiayaan."
              : "Masuk ke Workspace Partner untuk mengelola pipeline pengajuan dan portofolio pembiayaan."
            }
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-sigap-darkest mb-6">Masuk ke Akun</h2>
          
          <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => setActiveTab('umkm')}
              className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'umkm' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Store className="w-4 h-4 mr-2" /> UMKM
            </button>
            <button
              onClick={() => setActiveTab('lender')}
              className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'lender' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" /> Lender / Mitra
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {activeTab === 'umkm' ? 'Email / NIB Demo' : 'Email Partner Demo'}
              </label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary focus:border-transparent outline-none transition-all" 
                placeholder="contoh@email.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sigap-primary focus:border-transparent outline-none transition-all" 
                placeholder="••••••••" 
              />
            </div>
            
            {activeTab === 'lender' && (
              <div className="flex justify-end">
                <button type="button" onClick={handleDemoLenderClick} className="text-xs text-sigap-primary font-medium hover:underline">
                  Gunakan Akun Demo Lender
                </button>
              </div>
            )}

            <Button variant="navy" type="submit" disabled={isLoading} className="w-full h-12 text-base mt-2">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Masuk...
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-600">
            Belum punya akun? <Link href="/register" className="text-sigap-primary font-medium hover:underline">Daftar sekarang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
