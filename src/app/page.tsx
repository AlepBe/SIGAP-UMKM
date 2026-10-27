import React from 'react';
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, PieChart, Activity, BookOpen, Layers, CheckCircle2, Crown, Zap, TrendingUp, Target } from "lucide-react";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { publicDemoData } from "@/lib/public-demo-data";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { PublicFooter } from "@/components/landing/PublicFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-navy-gradient pt-20 pb-28 md:pt-28 md:pb-32 text-white">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="container relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-sigap-soft/30 bg-sigap-soft/10 px-3 py-1 text-sm font-medium text-sigap-light mb-6 md:mb-8 hover:bg-sigap-soft/20 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-sigap-light mr-2 animate-pulse"></span>
              Gateway Ekosistem Pembiayaan Cerdas — Explore Demo
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
              Ubah Data Transaksi Menjadi <span className="text-gradient block sm:inline mt-2 sm:mt-0">Kekuatan Usaha.</span>
            </h1>
            <p className="text-base md:text-xl text-sigap-light/90 max-w-2xl mb-10 font-light leading-relaxed">
              SIGAP UMKM membantu pelaku usaha membangun pembukuan otomatis, memahami kesehatan finansial, meningkatkan kredensial pembiayaan, dan menemukan pembiayaan formal yang sesuai dalam satu ekosistem terpadu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-sigap-darkest hover:bg-gray-100 font-bold h-12 px-8 shadow-lg transition-transform hover:scale-105 active:scale-95">
                  Sign Up
                </Button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-sigap-primary hover:bg-sigap-primary/90 text-white font-bold h-12 px-8 shadow-lg transition-transform hover:scale-105 active:scale-95 border-none">
                  Coba Demo
                </Button>
              </Link>
              <Link href="/cara-kerja" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-sigap-soft/30 text-white hover:bg-sigap-soft/10 h-12 px-8 bg-transparent">
                  Lihat Cara Kerja <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Interactive Demo Dashboard */}
          <div id="demo" className="container mt-16 md:mt-24 relative z-10 scroll-mt-24">
            <div className="mx-auto max-w-6xl rounded-t-xl border border-white/10 bg-sigap-darkest/50 p-2 md:p-3 glassmorphism shadow-2xl">
              <InteractiveDemo />
            </div>
          </div>
        </section>

        {/* Trust Metrics */}
        <section className="py-12 border-b bg-slate-50">
          <div className="container">
            <p className="text-center text-xs md:text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
              Membangun Kepercayaan Ekosistem <span className="lowercase font-normal ml-2 bg-slate-200 px-2 py-0.5 rounded text-[10px]">(Data Demo)</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:divide-x md:divide-border">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest">{publicDemoData.trustMetrics.umkm}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">UMKM Simulasi</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest">{publicDemoData.trustMetrics.transactions}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Transaksi Simulasi</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest">{publicDemoData.trustMetrics.partners}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Mitra Simulasi</p>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-sigap-primary flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8" /> Aman
                </h3>
                <p className="text-sm font-medium text-muted-foreground mt-2">Data Protection</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Core Modules */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest mb-6">Kenali Cara SIGAP Membantu Usaha Anda</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Enam pilar utama yang menghubungkan data harian Anda dengan kesiapan pembiayaan institusional.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <ModuleCard 
                icon={<BarChart3 className="h-6 w-6 text-sigap-primary" />}
                title="Pembukuan Otomatis"
                desc="Tarik data transaksi dari QRIS dan e-wallet secara otomatis menjadi laporan laba-rugi."
                href="/fitur#pembukuan"
              />
              <ModuleCard 
                icon={<Activity className="h-6 w-6 text-sigap-primary" />}
                title="Skor Kredit Alternatif"
                desc="Indikator kelayakan pembiayaan real-time berdasarkan konsistensi arus kas Anda."
                href="/fitur#skor"
              />
              <ModuleCard 
                icon={<Layers className="h-6 w-6 text-sigap-primary" />}
                title="Marketplace Pembiayaan"
                desc="Bandingkan produk pembiayaan legal yang paling cocok dengan profil kesehatan usaha Anda."
                href="/pembiayaan"
              />
              <ModuleCard 
                icon={<BookOpen className="h-6 w-6 text-sigap-primary" />}
                title="Literasi Finansial"
                desc="Tingkatkan wawasan keuangan dengan microlearning dan bangun rekam jejak literasi."
                href="/literasi"
              />
              <ModuleCard 
                icon={<ShieldCheck className="h-6 w-6 text-sigap-primary" />}
                title="Legalitas & Proteksi"
                desc="Cek legalitas tawaran pinjaman dan hindari jebakan pinjol ilegal melalui sistem verifikasi."
                href="/fitur#proteksi"
              />
              <ModuleCard 
                icon={<PieChart className="h-6 w-6 text-sigap-primary" />}
                title="Ketahanan Usaha"
                desc="Simulasi skenario risiko untuk melihat proyeksi runway dan kebutuhan likuiditas masa depan."
                href="/fitur#ketahanan"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28 bg-slate-50 border-t">
          <div className="container">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest mb-6">Cara Kerja SIGAP</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Ekosistem terintegrasi untuk mengubah catatan harian menjadi modal pengembangan usaha.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <CheckCircle2 className="w-8 h-8 text-sigap-primary" />, title: "Hubungkan Data", desc: "Integrasikan e-wallet, QRIS, atau catat manual dengan mudah." },
                { icon: <Target className="w-8 h-8 text-sigap-primary" />, title: "Pahami Kondisi", desc: "Monitor kesehatan arus kas dan indikator bisnis Anda." },
                { icon: <TrendingUp className="w-8 h-8 text-sigap-primary" />, title: "Bangun Kesiapan", desc: "Tingkatkan skor SIGAP melalui konsistensi dan literasi." },
                { icon: <Zap className="w-8 h-8 text-sigap-primary" />, title: "Temukan Mitra", desc: "Dapatkan akses pembiayaan yang cocok dengan profil Anda." }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  {idx !== 3 && <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-200 -z-10 group-hover:bg-sigap-primary/30 transition-colors"></div>}
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-sigap-primary/50 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-sigap-primary text-white font-bold flex items-center justify-center -mt-10 mb-4 border-4 border-slate-50 shadow-sm text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-sigap-darkest mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/cara-kerja">
                <Button variant="outline" className="h-12 px-8 font-semibold">Pelajari Lebih Detail</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Teaser Section */}
        <section className="py-20 md:py-28 bg-white border-t relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Crown className="w-64 h-64 text-amber-500" />
          </div>
          <div className="container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-bold border border-amber-200">
                  <Crown className="w-4 h-4" /> SIGAP Premium
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-sigap-darkest leading-tight">
                  Sudah melihat gambaran SIGAP?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Naikkan pengelolaan usaha Anda ke level selanjutnya. Dapatkan insight yang lebih dalam tentang kondisi usaha, proyeksi cashflow, dan kesiapan pembiayaan Anda dengan SIGAP Premium.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sigap-darkest">Advanced Financial Analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sigap-darkest">Cashflow Forecast</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sigap-darkest">Business Resilience Simulator</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-sigap-darkest">Smart Financial Insights</span>
                  </div>
                </div>

                <div className="pt-6">
                  <Link href="/premium">
                    <Button className="bg-sigap-darkest hover:bg-black text-white h-12 px-8 font-bold shadow-lg">
                      Lihat Benefit Premium <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex-1 w-full max-w-md mx-auto md:max-w-none">
                <div className="bg-gradient-to-br from-slate-900 to-sigap-darkest rounded-2xl p-1 shadow-2xl relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-2xl blur opacity-30 animate-pulse"></div>
                  <div className="bg-background rounded-xl p-6 sm:p-8 relative z-10 flex flex-col h-full border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-sigap-darkest">Unlock Financial Intelligence</h3>
                      <Crown className="w-6 h-6 text-amber-500" />
                    </div>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                      "Dapatkan insight yang lebih dalam tentang kondisi usaha, proyeksi cashflow, dan kesiapan pembiayaan Anda."
                    </p>
                    
                    <div className="mt-auto grid grid-cols-2 gap-4 border-t pt-6 text-sm">
                      <div>
                        <div className="text-muted-foreground font-medium mb-3">FREE</div>
                        <ul className="space-y-2 text-slate-500 text-xs">
                          <li>Dashboard Dasar</li>
                          <li>Pembukuan</li>
                          <li>Basic Score</li>
                          <li>Basic Literacy</li>
                          <li>Basic Legal Check</li>
                        </ul>
                      </div>
                      <div>
                        <div className="text-amber-600 font-bold mb-3 flex items-center gap-1"><Crown className="w-3 h-3" /> PREMIUM</div>
                        <ul className="space-y-2 text-sigap-darkest font-medium text-xs">
                          <li>Advanced Analytics</li>
                          <li>Cashflow Forecast</li>
                          <li>Business Resilience</li>
                          <li>Smart Insights</li>
                          <li>Advanced Reports</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-sigap-dark text-white text-center px-4">
          <div className="container max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Siap Mengelola Usaha dengan Lebih Cerdas?</h2>
            <p className="text-sigap-light mb-10 text-lg md:text-xl font-light">
              Mulai dengan fitur inti SIGAP dan kembangkan pengelolaan usaha Anda sesuai kebutuhan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-sigap-darkest hover:bg-gray-100 font-bold h-14 px-10 text-lg shadow-xl transition-transform hover:scale-105 active:scale-95">
                  Sign Up
                </Button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-sigap-soft/30 text-white hover:bg-sigap-soft/10 h-14 px-10 text-lg bg-transparent">
                  Coba Demo
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-xs text-sigap-light/50">
              Data demo ini hanyalah simulasi. Buat akun untuk mengelola data usaha Anda sendiri.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}

function ModuleCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <div className="p-8 rounded-2xl border bg-white hover:shadow-xl hover:border-sigap-primary/30 transition-all duration-300 h-full flex flex-col">
        <div className="h-14 w-14 rounded-xl bg-sigap-primary/5 flex items-center justify-center mb-6 group-hover:bg-sigap-primary/10 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-sigap-darkest mb-3 group-hover:text-sigap-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm flex-1">
          {desc}
        </p>
        <div className="mt-6 flex items-center text-sigap-primary text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
}
