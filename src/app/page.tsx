"use client";

import { BentoShowcase } from "@/components/landing/BentoShowcase";
import { EcosystemMarquee } from "@/components/landing/EcosystemMarquee";
import { HeroInteractive } from "@/components/landing/HeroInteractive";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { PublicFooter } from "@/components/landing/PublicFooter";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { WelcomeScreen } from "@/components/landing/WelcomeScreen";
import { Button } from "@/components/ui/button";
import { publicDemoData } from "@/lib/public-demo-data";
import { cn } from "@/lib/utils";
import {
Activity,
ArrowRight,
BarChart3,
BookOpen,
CheckCircle2,
Crown,
Layers,
PieChart,
Plus,
ShieldCheck
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const { trustMetrics } = publicDemoData;

const modules = [
  {
    icon: BarChart3,
    title: "Pembukuan Otomatis",
    desc: "Tarik data transaksi dari QRIS dan e-wallet menjadi laporan laba-rugi terstandar secara instan.",
    href: "/fitur#pembukuan",
  },
  {
    icon: Activity,
    title: "Skor Kredit Alternatif",
    desc: "Evaluasi kesehatan kas yang menghasilkan indikator kelayakan kredit terpercaya bagi perbankan.",
    href: "/fitur#skor",
  },
  {
    icon: Layers,
    title: "Marketplace Pembiayaan",
    desc: "Bandingkan produk kredit mikro, modal kerja, dan invoice financing yang sesuai kemampuan usaha.",
    href: "/pembiayaan",
    featured: true,
  },
  {
    icon: BookOpen,
    title: "Literasi Finansial",
    desc: "Tingkatkan kecakapan lewat modul microlearning yang langsung menambah poin skor kredit Anda.",
    href: "/literasi",
  },
  {
    icon: ShieldCheck,
    title: "Legalitas & Proteksi",
    desc: "Verifikasi legalitas penawaran pinjaman dalam detik untuk mencegah jeratan pinjaman ilegal.",
    href: "/fitur#proteksi",
  },
  {
    icon: PieChart,
    title: "Ketahanan Usaha",
    desc: "Simulasikan proyeksi runway dan skenario risiko agar bisnis siap menghadapi kondisi kritis.",
    href: "/fitur#ketahanan",
  },
];

const steps = [
  {
    number: "01",
    title: "Integrasikan Transaksi",
    desc: "Hubungkan QRIS, merchant e-wallet, atau catat transaksi harian secara manual dengan cepat.",
  },
  {
    number: "02",
    title: "Analisis Arus Kas Otomatis",
    desc: "Sistem SIGAP mengolah catatan menjadi matriks kesehatan bisnis dan tren laba bersih.",
  },
  {
    number: "03",
    title: "Perkuat Skor Kredit",
    desc: "Tingkatkan konsistensi arus kas dan selesaikan modul edukasi untuk menaikkan skor kelayakan.",
  },
  {
    number: "04",
    title: "Dapatkan Pembiayaan Legal",
    desc: "Ajukan permohonan ke mitra perbankan terpercaya dengan dokumen kelayakan yang sudah siap.",
  },
];

const faqs = [
  {
    question: "Apakah data transaksi pada website ini asli?",
    answer: "Seluruh data transaksi dan metrik pada halaman ini merupakan data simulasi (demo). Daftarkan akun untuk mulai mengelola pembukuan dan memonitor data bisnis Anda yang sebenarnya secara privat dan aman.",
  },
  {
    question: "Bagaimana algoritma Skor SIGAP bekerja?",
    answer: "Skor dihitung berdasarkan lima faktor: stabilitas arus kas masuk harian, rasio pengeluaran terhadap pendapatan, kelengkapan legalitas profil, rekam jejak literasi finansial, dan kecukupan cadangan kas darurat.",
  },
  {
    question: "Apakah SIGAP merupakan lembaga pemberi pinjaman langsung?",
    answer: "SIGAP adalah platform gerbang integrasi dan agregator teknologi. Kami tidak menyalurkan pinjaman secara mandiri, melainkan menghubungkan UMKM yang memenuhi skor kelayakan dengan mitra perbankan dan fintech lending resmi yang diawasi OJK.",
  },
  {
    question: "Apa saja manfaat fitur SIGAP Premium?",
    answer: "Pengguna Premium mendapatkan analitik bisnis tingkat lanjut, simulator ketahanan usaha, prediksi arus kas 6 bulan ke depan, dan laporan keuangan berformat perbankan.",
  },
  {
    question: "Bagaimana cara memastikan tawaran pinjaman bukan pinjol ilegal?",
    answer: "Gunakan modul Legalitas & Proteksi pada dashboard SIGAP. Sistem kami memverifikasi izin entitas penawar terhadap database resmi lembaga keuangan berizin.",
  },
];

// Gallery images from user's provided URLs
const galleryImages = [
  {
    src: "https://asset.kompas.com/crops/uRKYJML3eW9xMGVKp9OpPk3Nqg8=/0x0:934x623/1200x675/data/photo/2021/02/15/602a97bd8cb68.jpg",
    alt: "Pelaku UMKM Indonesia",
    label: "UMKM Tumbuh Bersama",
  },
  {
    src: "https://cdn-jpr.jawapos.com/images/15/2026/06/30/foto-digitalisasi-google-hANPR.webp",
    alt: "Digitalisasi UMKM",
    label: "Digitalisasi Usaha",
  },
  {
    src: "https://i.pinimg.com/1200x/6d/f2/26/6df226e4f357891bbad4afa7a398cf27.jpg",
    alt: "Pelaku usaha muda",
    label: "Wirausaha Modern",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <WelcomeScreen />
      <PublicHeader />

      <main className="flex-1">
        {/* 1. Hero */}
        <HeroInteractive />

        {/* 2. Partner Marquee */}
        <EcosystemMarquee />

        {/* 3. Bento Showcase */}
        <BentoShowcase />

        {/* 4. Photo Gallery + Social Proof — Hostinger-style visual storytelling */}
        <section className="py-20 md:py-28 bg-white overflow-hidden">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12"
            >
              <div className="max-w-xl">
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                  Menjembatani Akses Finansial yang{" "}
                  <span className="text-sigap-primary">Adil &amp; Transparan</span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Statistik ekosistem SIGAP mencerminkan potensi perputaran dana dan kesiapan kredit UMKM Indonesia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 shrink-0">
                {[
                  { value: trustMetrics.umkm, label: "UMKM Simulasi" },
                  { value: trustMetrics.transactions, label: "Transaksi Tercatat" },
                  { value: trustMetrics.partners, label: "Mitra Lembaga" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center lg:text-left">
                    <p className="font-display text-4xl font-extrabold text-sigap-darkest">{value}</p>
                    <p className="text-sm text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Photo grid — 3 photos side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sigap-darkest/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-white/90">{img.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Core Modules Grid */}
        <section className="container py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
              Enam Solusi untuk{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-sigap-primary">Skalabilitas Usaha</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-sigap-light/50 -z-0" />
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
              Setiap modul bekerja sinkron untuk menyederhanakan operasional harian dan membangun profil kelayakan finansial.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={module.href}
                    className={cn(
                      "group flex flex-col h-full rounded-3xl border p-7 transition-all duration-300 hover:shadow-xl",
                      module.featured
                        ? "border-sigap-yellow/40 bg-gradient-to-br from-white via-amber-50/20 to-sigap-light/20 shadow-lg shadow-amber-500/5 hover:border-sigap-yellow"
                        : "border-slate-200/80 bg-white hover:border-sigap-primary/40"
                    )}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                        module.featured
                          ? "bg-sigap-darkest text-white"
                          : "bg-sigap-light/50 text-sigap-darkest border border-sigap-primary/15"
                      )}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      {module.featured && (
                        <span className="rounded-full bg-sigap-yellow/20 text-sigap-yellow-dark border border-sigap-yellow/30 px-3 py-1 text-xs font-bold">
                          Populer
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-sigap-darkest group-hover:text-sigap-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 flex-1">
                      {module.desc}
                    </p>
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-sigap-primary">
                      <span>Pelajari Selengkapnya</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sigap-light/40 text-sigap-darkest transition-all group-hover:translate-x-1 group-hover:bg-sigap-darkest group-hover:text-white">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 6. How It Works — with photo */}
        <section className="bg-slate-50/60 py-20 md:py-28">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              {/* Left: Steps */}
              <div className="lg:col-span-6 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55 }}
                  className="space-y-4"
                >
                  <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                    Empat Langkah Menuju{" "}
                    <span className="text-sigap-primary">Kesiapan Finansial</span>
                  </h2>
                  <p className="text-base text-slate-500 leading-relaxed">
                    Tidak ada proses rumit. Mulai dari catatan harian, sistem otomatis menyiapkan profil Anda hingga siap diakses perbankan.
                  </p>
                  <Link href="/cara-kerja">
                    <Button size="lg" className="mt-2 rounded-full bg-sigap-darkest hover:bg-sigap-dark text-white font-semibold px-8 shadow-md">
                      Panduan Lengkap <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>

                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="group flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:border-sigap-primary/40 hover:shadow-md transition-all"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sigap-light/50 font-display text-lg font-extrabold text-sigap-darkest group-hover:bg-sigap-darkest group-hover:text-white transition-colors">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-sigap-darkest group-hover:text-sigap-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Photo collage */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 grid grid-cols-2 gap-4"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] row-span-2">
                  <Image
                    src="https://i.pinimg.com/1200x/e2/79/86/e279866f0da688c5e6b9d25745a64a62.jpg"
                    alt="Pelaku UMKM menggunakan aplikasi"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square">
                  <Image
                    src="https://i.pinimg.com/736x/00/f8/55/00f8558393da6089f54819ddd6456c92.jpg"
                    alt="Transaksi digital UMKM"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square">
                  <Image
                    src="https://i.pinimg.com/736x/69/24/25/692425a623bca1325928bde585f0db93.jpg"
                    alt="Pengelolaan keuangan"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. Interactive Demo */}
        <section id="demo" className="container scroll-mt-20 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-sigap-darkest p-6 md:p-12 shadow-2xl border border-white/10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-[600px] rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 mx-auto mb-10 max-w-2xl text-center text-white">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Uji Coba Langsung Dashboard SIGAP
              </h2>
              <p className="mt-4 text-sm sm:text-base text-sigap-light/80 leading-relaxed">
                Ubah filter transaksi, lihat grafik arus kas, dan pelajari bagaimana rekomendasi pembiayaan terbentuk secara interaktif.
              </p>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
              <InteractiveDemo />
            </div>
          </motion.div>
        </section>

        {/* 8. Premium Teaser */}
        <section className="container pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl"
          >
            <div className="grid lg:grid-cols-2">
              {/* Left content */}
              <div className="p-8 md:p-14 bg-gradient-to-br from-white to-slate-50 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-sigap-yellow/10 text-sigap-yellow-dark px-3.5 py-1 text-xs font-bold uppercase tracking-wider border border-sigap-yellow/20 w-fit">
                  <Crown className="h-4 w-4" />
                  SIGAP Premium
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                  Visibilitas Bisnis ke Tingkat Maksimal
                </h2>
                <p className="text-base text-slate-500 leading-relaxed">
                  Analitik mendalam, proyeksi cashflow terotomasi, dan simulasi daya tahan bisnis terhadap krisis likuiditas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/premium">
                    <Button size="lg" className="rounded-full bg-sigap-darkest hover:bg-black text-white font-semibold px-8 shadow-md">
                      Pelajari Premium <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" size="lg" className="rounded-full border-slate-200 text-sigap-darkest hover:bg-slate-50">
                      Mulai Gratis
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: pricing cards */}
              <div className="bg-sigap-darkest p-8 md:p-14 flex items-center justify-center">
                <div className="grid sm:grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-sigap-light/60">Gratis</p>
                    <p className="font-display text-2xl font-bold text-white mt-1">Rp 0</p>
                    <ul className="mt-4 space-y-2.5 text-xs text-sigap-light/70">
                      {["Dashboard Harian", "Pembukuan Otomatis", "Skor SIGAP Dasar", "Cek Legalitas OJK"].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border-2 border-sigap-yellow bg-gradient-to-b from-amber-500/10 to-white/5 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-sigap-yellow text-sigap-darkest font-extrabold text-[9px] uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
                      Populer
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-sigap-yellow">Premium</p>
                    <p className="font-display text-2xl font-bold text-white mt-1">Full Akses</p>
                    <ul className="mt-4 space-y-2.5 text-xs text-sigap-light/80 font-semibold">
                      {["Prediksi Arus Kas Otomatis", "Simulator Ketahanan", "Laporan Finansial Bank", "Prioritas Pembiayaan"].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 9. FAQ */}
        <section className="container pb-20 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-5 space-y-4"
            >
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-base text-slate-500 leading-relaxed">
                Informasi penting mengenai cara kerja platform, keamanan data, dan legalitas pembiayaan.
              </p>
            </motion.div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="group py-5 transition-colors"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base sm:text-lg font-bold text-sigap-darkest hover:text-sigap-primary transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 pr-10">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="container pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-[#0d2040] px-8 py-16 text-white md:px-16 md:py-20 shadow-2xl text-center"
          >
            {/* Background photo blur */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="https://asset.kompas.com/crops/uRKYJML3eW9xMGVKp9OpPk3Nqg8=/0x0:934x623/1200x675/data/photo/2021/02/15/602a97bd8cb68.jpg"
                alt=""
                fill
                className="object-cover opacity-10 blur-sm scale-105"
                unoptimized
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-sigap-darkest/90 via-sigap-dark/85 to-sigap-primary/40" />

            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Siap Melangkah Menuju Pembiayaan Usaha Formal?
              </h2>
              <p className="text-base sm:text-lg text-sigap-light/90 leading-relaxed max-w-xl mx-auto">
                Daftarkan bisnis dalam hitungan menit, akses seluruh simulasi gratis, dan buktikan kemudahan integrasi finansial SIGAP UMKM.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="rounded-full bg-sigap-yellow text-sigap-darkest hover:bg-amber-400 font-bold px-9 h-13 shadow-xl transition-transform hover:scale-105 active:scale-95"
                  >
                    Daftar Sekarang — Gratis
                    <ArrowRight className="ml-2 h-4 w-4 text-sigap-darkest" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 h-13 px-8 font-semibold"
                  >
                    Coba Demo Interaktif
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-sigap-light/50 pt-2">
                Tanpa biaya pendaftaran • Pembukuan instan • Terproteksi keamanan berlapis
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
