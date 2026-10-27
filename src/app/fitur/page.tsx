import React from 'react';
import Link from 'next/link';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { PublicFooter } from '@/components/landing/PublicFooter';
import { Button } from '@/components/ui/button';
import { BarChart3, ShieldCheck, PieChart, Activity, BookOpen, Layers, ArrowRight } from 'lucide-react';

export default function FiturPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 bg-slate-50 border-b">
          <div className="container text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-sigap-darkest mb-6 tracking-tight">Fitur SIGAP untuk Pertumbuhan Usaha</h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Kelola keuangan, pahami kondisi usaha, dan bangun kesiapan pembiayaan dalam satu ekosistem.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Pembukuan Otomatis</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Catat dan pantau pemasukan serta pengeluaran usaha secara lebih terstruktur.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-6 text-sm">
                  <div className="flex justify-between mb-2"><span className="text-muted-foreground">Pemasukan</span><span className="font-semibold text-green-600">+Rp18.250.000</span></div>
                  <div className="flex justify-between mb-2"><span className="text-muted-foreground">Pengeluaran</span><span className="font-semibold text-red-600">-Rp12.100.000</span></div>
                  <div className="flex justify-between pt-2 border-t"><span className="text-muted-foreground font-medium">Laba Bersih</span><span className="font-bold text-blue-600">Rp6.150.000</span></div>
                </div>
                <Link href="/register">
                  <Button variant="outline" className="w-full">Pelajari Pembukuan</Button>
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Skor Kredit Alternatif</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Bangun indikator kesehatan finansial berdasarkan histori transaksi dan profil usaha.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-6 flex flex-col items-center">
                  <div className="text-3xl font-extrabold text-sigap-darkest">782 <span className="text-sm font-medium text-muted-foreground">/ 850</span></div>
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold mt-1">Grade A</div>
                  <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">Skor Simulasi</div>
                </div>
                <Link href="/#demo">
                  <Button variant="outline" className="w-full">Lihat Skor Demo</Button>
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Marketplace Pembiayaan</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Bandingkan beberapa pilihan pembiayaan berdasarkan kebutuhan dan profil usaha.
                </p>
                <div className="bg-slate-50 p-3 rounded-lg mb-6 space-y-2">
                  <div className="bg-white border p-2 rounded text-xs flex justify-between items-center"><span className="font-semibold">Kredit Modal Usaha</span><span className="text-[10px] bg-blue-100 text-blue-700 px-1 rounded">Sangat Cocok</span></div>
                  <div className="bg-white border p-2 rounded text-xs flex justify-between items-center"><span className="font-semibold">Invoice Financing</span><span className="text-[10px] bg-blue-50 text-blue-600 px-1 rounded">Cocok</span></div>
                  <div className="bg-white border p-2 rounded text-xs flex justify-between items-center"><span className="font-semibold">Kredit Pengembangan</span><span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded">Cukup</span></div>
                </div>
                <Link href="/pembiayaan">
                  <Button variant="outline" className="w-full">Lihat Pembiayaan</Button>
                </Link>
              </div>

              {/* Feature 4 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Literasi Finansial</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Pelajari dasar pengelolaan keuangan dan pembiayaan melalui modul singkat.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-sigap-darkest">Progress Pembelajaran</span>
                    <span className="text-lg font-bold text-emerald-600">72%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[72%]"></div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-2 text-center uppercase tracking-wider">Data Demo</div>
                </div>
                <Link href="/literasi">
                  <Button variant="outline" className="w-full">Mulai Belajar</Button>
                </Link>
              </div>

              {/* Feature 5 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Legalitas & Proteksi</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Kenali penawaran pembiayaan dan gunakan simulasi verifikasi berbasis data demo.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-rose-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-sigap-darkest">Verifikasi Legalitas</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Cek apakah pemberi pinjaman terdaftar di OJK.</p>
                  </div>
                </div>
                <Link href="/register">
                  <Button variant="outline" className="w-full">Jelajahi Proteksi</Button>
                </Link>
              </div>

              {/* Feature 6 */}
              <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="h-14 w-14 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
                  <PieChart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-sigap-darkest mb-3">Ketahanan Usaha</h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1 mb-6">
                  Simulasikan dampak perubahan pendapatan dan biaya terhadap keberlangsungan usaha.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg mb-6 flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">Proyeksi Runway</div>
                  <div className="text-lg font-bold text-sigap-darkest bg-white px-3 py-1 rounded shadow-sm border border-slate-100">&gt; 6 Bulan</div>
                </div>
                <Link href="/register">
                  <Button variant="outline" className="w-full">Lihat Simulasi</Button>
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

      <PublicFooter />
    </div>
  );
}
