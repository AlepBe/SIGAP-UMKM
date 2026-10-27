"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Activity, 
  ArrowRight, 
  BarChart3, 
  BookOpen, 
  Crown, 
  Layers, 
  PieChart, 
  Plus, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { HeroInteractive } from "@/components/landing/HeroInteractive";
import { EcosystemMarquee } from "@/components/landing/EcosystemMarquee";
import { BentoShowcase } from "@/components/landing/BentoShowcase";
import { WelcomeScreen } from "@/components/landing/WelcomeScreen";
import { publicDemoData } from "@/lib/public-demo-data";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { PublicFooter } from "@/components/landing/PublicFooter";

const { trustMetrics } = publicDemoData;

const modules = [
  {
    icon: BarChart3,
    title: "Pembukuan Otomatis",
    badge: "Otomasi Transaksi",
    desc: "Tarik data transaksi dari QRIS dan e-wallet secara instan menjadi laporan laba-rugi terstandar.",
    href: "/fitur#pembukuan",
  },
  {
    icon: Activity,
    title: "Skor Kredit Alternatif",
    badge: "Analisis Kas Cerdas",
    desc: "Evaluasi kesehatan kas berkala yang menghasilkan indikator kelayakan kredit terpercaya bagi bank.",
    href: "/fitur#skor",
  },
  {
    icon: Layers,
    title: "Marketplace Pembiayaan",
    badge: "Peluang Modal Terbaik",
    desc: "Bandingkan produk kredit mikro, modal kerja, dan invoice financing resmi yang sesuai kemampuan usaha.",
    href: "/pembiayaan",
    featured: true,
  },
  {
    icon: BookOpen,
    title: "Literasi Finansial",
    badge: "Modul Edukasi",
    desc: "Tingkatkan kecakapan finansial praktis lewat modul microlearning yang langsung menambah poin skor Anda.",
    href: "/literasi",
  },
  {
    icon: ShieldCheck,
    title: "Legalitas & Proteksi",
    badge: "Verifikasi Izin",
    desc: "Verifikasi legalitas penawaran pinjaman dalam hitungan detik untuk mencegah jeratan pinjaman ilegal.",
    href: "/fitur#proteksi",
  },
  {
    icon: PieChart,
    title: "Ketahanan Usaha",
    badge: "Simulasi Runway",
    desc: "Simulasikan proyeksi runway dan skenario risiko ekonomi agar bisnis Anda selalu siap menghadapi krisis.",
    href: "/fitur#ketahanan",
  },
];

const steps = [
  {
    number: "01",
    title: "Integrasikan Transaksi",
    desc: "Hubungkan QRIS, merchant e-wallet, atau catat transaksi harian secara manual dan cepat.",
  },
  {
    number: "02",
    title: "Analisis Arus Kas Otomatis",
    desc: "Sistem SIGAP mengolah catatan keuangan menjadi matriks kesehatan bisnis dan tren laba bersih.",
  },
  {
    number: "03",
    title: "Perkuat Skor Kredit",
    desc: "Tingkatkan konsistensi arus kas dan selesaikan modul edukasi untuk menaikkan skor kelayakan.",
  },
  {
    number: "04",
    title: "Dapatkan Pembiayaan Legal",
    desc: "Ajukan permohonan modal ke mitra perbankan terpercaya dengan dokumen kelayakan yang sudah siap.",
  },
];

const faqs = [
  {
    question: "Apakah data transaksi pada website ini asli?",
    answer: "Seluruh data transaksi dan metrik pada halaman ini merupakan data simulasi (demo). Anda dapat mendaftarkan akun untuk mulai mengelola pembukuan dan memonitor data bisnis Anda yang sebenarnya secara privat dan aman.",
  },
  {
    question: "Bagaimana algoritma Skor SIGAP bekerja?",
    answer: "Skor dihitung secara objektif berdasarkan lima faktor utama: stabilitas arus kas masuk harian, rasio pengeluaran terhadap pendapatan, kelengkapan legalitas profil, rekam jejak literasi finansial, dan kecukupan cadangan kas darurat.",
  },
  {
    question: "Apakah SIGAP merupakan lembaga pemberi pinjaman langsung?",
    answer: "SIGAP adalah platform gerbang integrasi dan agregator teknologi. Kami tidak menyalurkan pinjaman secara mandiri, melainkan menghubungkan UMKM yang telah memenuhi skor kelayakan dengan mitra perbankan dan fintech lending resmi yang diawasi OJK.",
  },
  {
    question: "Apa saja manfaat fitur SIGAP Premium?",
    answer: "Pengguna Premium mendapatkan akses analitik bisnis tingkat lanjut, simulator ketahanan usaha terhadap inflasi/krisis, prediksi arus kas 6 bulan ke depan, dan laporan keuangan komprehensif berformat perbankan.",
  },
  {
    question: "Bagaimana cara memastikan tawaran pinjaman bukan pinjol ilegal?",
    answer: "Gunakan modul Legalitas & Proteksi pada dashboard SIGAP. Sistem kami memverifikasi izin entitas penawar secara otomatis terhadap database resmi lembaga keuangan berizin.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* 0. Modern Minimalist Welcome Screen on First Load */}
      <WelcomeScreen />

      {/* Navigation Header */}
      <PublicHeader />

      <main className="flex-1">
        {/* 1. Interactive Animated Hero Section */}
        <HeroInteractive />

        {/* 2. Partner & Gateway Channels Marquee */}
        <EcosystemMarquee />

        {/* 3. Interactive Bento Showcase (Cashflow, Loan Matcher, Security) */}
        <BentoShowcase />

        {/* 4. Core Modules Grid with Staggered Motion */}
        <section className="container py-20 md:py-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sigap-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
              <span>Solusi Skalabilitas Usaha</span>
            </div>
            <h2 className="text-balance font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
              Enam Solusi Terintegrasi Untuk{" "}
              <span className="text-sigap-primary underline decoration-sigap-light decoration-4 underline-offset-8">
                Skalabilitas Usaha
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Setiap modul bekerja secara sinkron demi menyederhanakan operasional harian dan membangun profil kelayakan finansial bisnis Anda.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={module.href}
                    className={cn(
                      "group relative flex flex-col justify-between h-full rounded-3xl border p-8 transition-all duration-300 hover:shadow-xl",
                      module.featured
                        ? "border-sigap-yellow/40 bg-gradient-to-br from-white via-amber-50/25 to-sigap-light/30 shadow-lg shadow-amber-500/5 hover:border-sigap-yellow"
                        : "border-slate-200/90 bg-white hover:border-sigap-primary/40"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className={cn(
                          "grid h-13 w-13 place-items-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110",
                          module.featured 
                            ? "bg-sigap-darkest text-white ring-2 ring-sigap-yellow/30" 
                            : "bg-sigap-light/60 text-sigap-darkest border border-sigap-primary/20"
                        )}>
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className={cn(
                          "rounded-full px-3 py-1 text-xs font-bold border",
                          module.featured
                            ? "bg-sigap-yellow-light text-sigap-yellow-dark border-sigap-yellow/40"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        )}>
                          {module.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-sigap-darkest group-hover:text-sigap-primary transition-colors">
                        {module.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal">
                        {module.desc}
                      </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-sigap-primary">
                      <span>Pelajari Selengkapnya</span>
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-sigap-light/50 text-sigap-darkest transition-transform group-hover:translate-x-1 group-hover:bg-sigap-darkest group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Trust Metrics Banner with Rich Texture */}
        <section className="container pb-20 md:pb-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-8 text-white md:p-14 shadow-2xl border border-white/10"
          >
            {/* Visual ambient mesh */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-sigap-primary/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-sigap-yellow mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
                  <span>Dampak Nyata Ekosistem</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                  Menjembatani Akses Finansial yang Adil & Transparan
                </h2>
                <p className="text-sm sm:text-base text-sigap-light/80 leading-relaxed font-normal">
                  Statistik simulasi ekosistem SIGAP mencerminkan potensi perputaran dana dan kesiapan kredit UMKM di tanah air.
                </p>
              </div>

              <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-white">{trustMetrics.umkm}</p>
                  <p className="mt-2 text-xs font-medium text-sigap-light/80">UMKM Simulasi</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-amber-300">{trustMetrics.transactions}</p>
                  <p className="mt-2 text-xs font-medium text-sigap-light/80">Transaksi Simulasi</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-white">{trustMetrics.partners}</p>
                  <p className="mt-2 text-xs font-medium text-sigap-light/80">Mitra Lembaga</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 6. Step-by-Step Workflow (How It Works) */}
        <section className="container pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-sigap-primary mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
                <span>Alur Kerja Praktis</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                Empat Langkah Menuju Kesiapan Finansial
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Tidak ada proses rumit. Mulai dari catatan harian, sistem otomatis menyiapkan profil Anda hingga siap diakses perbankan.
              </p>
              <div>
                <Link href="/cara-kerja">
                  <Button size="lg" className="rounded-full bg-sigap-darkest hover:bg-sigap-dark text-white font-semibold px-8 shadow-md">
                    Panduan Lengkap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-7 space-y-4">
              {steps.map((step, idx) => (
                <motion.div 
                  key={step.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex gap-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm hover:border-sigap-primary/50 hover:shadow-md transition-all"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sigap-light/60 font-display text-lg font-bold text-sigap-darkest group-hover:bg-sigap-darkest group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-sigap-darkest group-hover:text-sigap-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Full Interactive Demo Preview Section */}
        <section id="demo" className="container scroll-mt-24 pb-20 md:pb-28">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-sigap-darkest p-6 md:p-12 shadow-2xl border border-white/10"
          >
            {/* Visual Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 mx-auto mb-10 max-w-3xl text-center text-white">
              <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sigap-yellow">
                <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
                <span>Eksplorasi Dashboard</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Uji Coba Langsung Dashboard SIGAP
              </h2>
              <p className="mt-4 text-sm sm:text-base text-sigap-light/80 leading-relaxed font-normal">
                Ubah filter transaksi, lihat grafik arus kas, dan pelajari bagaimana rekomendasi pembiayaan terbentuk secara interaktif di bawah ini.
              </p>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
              <InteractiveDemo />
            </div>
          </motion.div>
        </section>

        {/* 8. Premium Upgrade Teaser with Rich Gold/Amber Tone */}
        <section className="container pb-20 md:pb-28">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50 to-sigap-light/20 p-8 md:p-14 shadow-xl"
          >
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-lg bg-sigap-yellow-light text-sigap-yellow-dark px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-sigap-yellow/30">
                  <Crown className="h-4 w-4 text-sigap-yellow-dark" />
                  SIGAP Premium Edition
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                  Tingkatkan Visibilitas Bisnis ke Tingkat Maksimal
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  Akses analitik mendalam, proyeksi cashflow terotomasi, dan simulasi daya tahan bisnis terhadap krisis likuiditas.
                </p>
                <div className="pt-2">
                  <Link href="/premium">
                    <Button size="lg" className="rounded-full bg-sigap-darkest hover:bg-black text-white font-semibold px-8 shadow-md">
                      Pelajari Benefit Premium
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="font-bold text-xs uppercase tracking-wider text-slate-500">Paket Free</p>
                  <p className="font-display text-2xl font-bold text-sigap-darkest mt-1">Rp 0</p>
                  <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Dashboard Harian</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Pembukuan Otomatis</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Skor SIGAP Dasar</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Cek Legalitas OJK</li>
                  </ul>
                </div>

                <div className="rounded-2xl border-2 border-sigap-yellow bg-gradient-to-b from-amber-500/10 via-amber-50/20 to-white p-6 shadow-xl shadow-amber-500/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-sigap-yellow text-sigap-darkest font-extrabold text-[9px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg shadow-xs">
                    Populer
                  </div>
                  <p className="font-bold text-xs uppercase tracking-wider text-sigap-yellow-dark">Premium</p>
                  <p className="font-display text-2xl font-bold text-sigap-darkest mt-1">Full Akses</p>
                  <ul className="mt-4 space-y-2.5 text-xs font-semibold text-sigap-darkest">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Prediksi Arus Kas Otomatis</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Simulator Ketahanan</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Laporan Finansial Bank</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Prioritas Pembiayaan</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 9. Interactive FAQ Accordion */}
        <section className="container pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-sigap-primary mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
                <span>Informasi & Bantuan</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Informasi penting mengenai cara kerja platform, keamanan data nasabah, dan legalitas pembiayaan.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <details 
                  key={faq.question} 
                  open={index === 0} 
                  className="group py-5 transition-colors focus-within:bg-slate-50/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base sm:text-lg font-bold text-sigap-darkest hover:text-sigap-primary transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. High-Impact Call to Action Banner with Warm Gold Button */}
        <section className="container pb-20 md:pb-28">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sigap-darkest via-sigap-dark to-sigap-primary px-8 py-16 text-white md:px-16 md:py-20 shadow-2xl border border-white/15 text-center"
          >
            {/* Visual shine accents */}
            <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4 text-xs font-bold uppercase tracking-[0.25em] text-sigap-yellow">
                <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
                <span>Mulai Langkah Pertama</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Siap Melangkah Menuju Pembiayaan Usaha Formal?
              </h2>
              <p className="text-base sm:text-lg text-sigap-light/90 leading-relaxed font-normal max-w-xl mx-auto">
                Daftarkan bisnis Anda dalam hitungan menit, akses seluruh simulasi gratis, dan buktikan kemudahan integrasi finansial SIGAP UMKM.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full bg-sigap-yellow text-sigap-darkest hover:bg-amber-400 font-bold px-9 h-13 shadow-xl transition-transform hover:scale-105 active:scale-95">
                    Daftar Sekarang — Gratis
                    <ArrowRight className="ml-2 h-4 w-4 text-sigap-darkest" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/15 h-13 px-8 font-semibold">
                    Coba Demo Interaktif
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-sigap-light/60 pt-4">
                Tanpa biaya pendaftaran • Pembukuan instan • Terproteksi keamanan berlapis
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
