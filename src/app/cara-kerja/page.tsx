import { PublicFooter } from '@/components/landing/PublicFooter';
import { PublicHeader } from '@/components/landing/PublicHeader';
import { Button } from '@/components/ui/button';
import { ArrowRight,CheckCircle2,DollarSign,ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CaraKerjaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      
      <main className="flex-1">
        <section className="pt-24 pb-16 bg-navy-gradient text-white">
          <div className="container text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Bagaimana SIGAP Bekerja?</h1>
            <p className="text-xl text-sigap-light/90 font-light leading-relaxed">
              Dari data transaksi hingga kesiapan pembiayaan dalam ekosistem terpadu.
            </p>
          </div>
        </section>

        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block -translate-x-1/2 z-0"></div>
          
          <div className="container relative z-10 max-w-5xl">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
              <div className="flex-1 lg:text-right">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sigap-primary text-white font-bold text-xl mb-6 lg:mb-4 lg:ml-auto shadow-lg">1</div>
                <h3 className="text-2xl font-bold text-sigap-darkest mb-4">Hubungkan Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Masukkan atau hubungkan data transaksi usaha untuk membangun gambaran kondisi keuangan.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white p-6 rounded-2xl border shadow-xl transform transition-transform hover:scale-105">
                  <div className="flex justify-between items-center mb-4 pb-4 border-b">
                    <span className="font-semibold text-sm">Sumber Transaksi Demo</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">TERHUBUNG</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center"><DollarSign className="w-4 h-4" /></div>
                      <div className="flex-1"><p className="text-sm font-medium">QRIS Demo</p></div>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded flex items-center justify-center"><DollarSign className="w-4 h-4" /></div>
                      <div className="flex-1"><p className="text-sm font-medium">E-Wallet Demo</p></div>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16 mb-24">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sigap-primary text-white font-bold text-xl mb-6 lg:mb-4 shadow-lg">2</div>
                <h3 className="text-2xl font-bold text-sigap-darkest mb-4">Pahami Kondisi Usaha</h3>
                <p className="text-muted-foreground leading-relaxed">
                  SIGAP merangkum arus kas, pemasukan, pengeluaran, dan indikator kesehatan finansial secara otomatis.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white p-6 rounded-2xl border shadow-xl transform transition-transform hover:scale-105">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-sm">Dashboard Demo</span>
                    <span className="text-xs text-muted-foreground">Bulan Ini</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded border border-green-100">
                      <p className="text-[10px] text-muted-foreground mb-1">Pemasukan</p>
                      <p className="font-bold text-green-700 text-sm">Rp 18.250.000</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded border border-red-100">
                      <p className="text-[10px] text-muted-foreground mb-1">Pengeluaran</p>
                      <p className="font-bold text-red-700 text-sm">Rp 12.100.000</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-100 col-span-2 flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">Laba Bersih</p>
                      <p className="font-bold text-blue-700">Rp 6.150.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-24">
              <div className="flex-1 lg:text-right">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sigap-primary text-white font-bold text-xl mb-6 lg:mb-4 lg:ml-auto shadow-lg">3</div>
                <h3 className="text-2xl font-bold text-sigap-darkest mb-4">Bangun Kesiapan Pembiayaan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Gunakan skor simulasi, kelengkapan profil, dan literasi untuk memahami kesiapan usaha di mata lembaga finansial.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white p-6 rounded-2xl border shadow-xl transform transition-transform hover:scale-105 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-6">
                    <span className="font-semibold text-sm">Skor Kesehatan Finansial</span>
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative mb-4">
                    <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="289" strokeDashoffset="25" strokeLinecap="round" />
                    </svg>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-sigap-darkest">782</span>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">GRADE A - SANGAT BAIK</div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sigap-primary text-white font-bold text-xl mb-6 lg:mb-4 shadow-lg">4</div>
                <h3 className="text-2xl font-bold text-sigap-darkest mb-4">Temukan Mitra Pembiayaan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bandingkan alternatif pembiayaan yang tersedia berdasarkan profil dan skor usaha Anda.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-white p-6 rounded-2xl border shadow-xl transform transition-transform hover:scale-105">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-sm">Rekomendasi Pembiayaan</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">DATA DEMO</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-blue-50/50">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sm text-sigap-darkest">Kredit Modal Usaha Demo</span>
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">95% Cocok</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Bank Nusantara Demo • Plafon s/d Rp50 Juta</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-slate-50">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sm text-sigap-darkest">Invoice Financing Demo</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">82% Cocok</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Fintech Nusantara Demo • Plafon s/d Rp2 Miliar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated CTA Section */}
        <section className="py-20 bg-white border-t border-slate-100 text-center relative z-10">
          <div className="container max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-extrabold text-sigap-darkest">
              Siap Memulai Transformasi Finansial Usaha Anda?
            </h2>
            <p className="text-slate-500 text-sm">
              Tingkatkan kelayakan kredit dan kelola pembukuan usaha Anda tanpa ribet mulai hari ini.
            </p>
            <div className="pt-2">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 text-base font-bold shadow-xl bg-sigap-primary text-white hover:bg-sigap-primary/90 rounded-2xl">
                  Mulai Gunakan SIGAP <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
