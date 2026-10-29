"use client";

import {
ArrowRight,
ChevronRight
} from "lucide-react";
import { AnimatePresence,motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";

const avatars = [
  { src: "/images/avatar-1.jpg", alt: "Mitra UMKM 1", name: "Siti Rahma - Kuliner" },
  { src: "/images/avatar-2.jpg", alt: "Mitra UMKM 2", name: "Budi Santoso - Retail" },
  { src: "/images/avatar-3.jpg", alt: "Mitra UMKM 3", name: "Rina Wijaya - Fashion" },
  { src: "/images/avatar-4.jpg", alt: "Mitra UMKM 4", name: "Ahmad Fauzi - Kopi" },
];

const pillars = [
  {
    id: "pembukuan",
    title: "Pembukuan Digital",
    highlight: "Digitalisasi Finansial",
    subtitle: "Tarik otomatis data transaksi QRIS & merchant e-wallet menjadi laporan laba-rugi terstandar tanpa pencatatan manual yang melelahkan.",
    badge: "Otomatis & Real-Time",
  },
  {
    id: "skor",
    title: "Skor Kredit SIGAP",
    highlight: "Kelayakan Modal",
    subtitle: "Ubah rekam jejak kas harian menjadi indikator skor kredit alternatif yang diakui mitra perbankan untuk membuka plafon pinjaman usaha.",
    badge: "Grade A • Siap Bank",
  },
  {
    id: "pembiayaan",
    title: "Akses Modal Legal",
    highlight: "Pertumbuhan Usaha",
    subtitle: "Akses permodalan formal (KUR, modal kerja, invoice financing) yang terverifikasi legal OJK dengan simulasi transparan tanpa jebakan pinjol.",
    badge: "Terproteksi Resmi OJK",
  },
];

// All images requested by the user for the hero section
const heroSlides = [
  {
    id: 1,
    src: "/images/hero-umkm.jpg",
    label: "Digitalisasi Penjualan",
    tag: "GETI UMKM",
  },
  {
    id: 2,
    src: "/images/hero-umkm-workspace.png",
    label: "Ruang Tumbuh Usaha",
    tag: "Workspace",
  },
  {
    id: 3,
    src: "/images/hero-umkm-kompas.jpg",
    label: "Sentra Transaksi Pasar",
    tag: "Wirausaha",
  },
  {
    id: 4,
    src: "https://cdn-linkumkm.bri.co.id/uploads/library/1/8/2/0/6/5/182065.jpeg",
    fallbackSrc: "/images/hero-umkm.jpg",
    label: "Kemitraan Modal BRI",
    tag: "LinkUMKM",
  },
];

// Live transactions without the deleted 'Warung Bu Joko' item
const liveTransactions = [
  { text: "QRIS Masuk", merchant: "Kopi Nusantara", amount: "+Rp 185.000", time: "Baru saja" },
  { text: "Pencairan E-Wallet", merchant: "Toko Sembako Barokah", amount: "+Rp 1.450.000", time: "1 mnt lalu" },
  { text: "Pemasukan Kasir", merchant: "Batik Canting Solo", amount: "+Rp 420.000", time: "3 mnt lalu" },
];

const statsData = [
  { value: "30k+", label: "Pelaku UMKM terhubung dan berkembang bersama di seluruh Indonesia." },
  { value: "Rp 5.2 M", label: "Plafon pembiayaan resmi tersimulasikan secara transparan." },
  { value: "98.6%", label: "Tingkat akurasi kelayakan laporan keuangan pembukuan digital." },
];

export function HeroInteractive() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [txIndex, setTxIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Auto cycle hero background image slide
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(slideTimer);
  }, []);

  // Auto cycle live ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTxIndex((prev) => (prev + 1) % liveTransactions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto cycle stats
  useEffect(() => {
    const timer = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % statsData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentPillar = pillars[activePillar];
  const currentSlide = heroSlides[activeSlide];
  const currentTx = liveTransactions[txIndex];
  const currentStat = statsData[statIndex];

  return (
    <section className="relative w-full pt-1 pb-8 sm:pb-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === FRAMED HERO CARD (Execora Style) === */}
        <div className="relative min-h-[600px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/50 bg-sigap-darkest">
          
          {/* 1. BACKGROUND PHOTO WITH DYNAMIC CROSSFADE SLIDER */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={
                    imageError[currentSlide.id] && currentSlide.fallbackSrc
                      ? currentSlide.fallbackSrc
                      : currentSlide.src
                  }
                  alt={currentSlide.label}
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  className="object-cover object-right md:object-center select-none"
                  onError={() => setImageError((prev) => ({ ...prev, [currentSlide.id]: true }))}
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. CREATIVE OVERLAY (Thinner & Main Color Palette: SIGAP Navy & Slate Blue) */}
          <div className="absolute inset-0 z-10 hidden md:block bg-gradient-to-r from-sigap-darkest/75 via-sigap-dark/55 via-[42%] via-sigap-primary/20 via-[60%] to-transparent pointer-events-none" />
          
          {/* Soft Dynamic Organic Glows in Main Brand Colors */}
          <motion.div 
            animate={{ 
              scale: [1, 1.06, 1],
              opacity: [0.65, 0.8, 0.65]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 -top-24 w-[720px] h-[720px] rounded-full bg-gradient-to-br from-sigap-dark/60 via-sigap-primary/30 to-transparent blur-3xl pointer-events-none z-10 hidden md:block" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.55, 0.7, 0.55]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-10 -bottom-20 w-[550px] h-[450px] rounded-full bg-gradient-to-tr from-sigap-darkest/70 via-sigap-dark/40 to-transparent blur-2xl pointer-events-none z-10 hidden md:block" 
          />
          
          {/* Mobile Overlay: Gentle vertical gradient */}
          <div className="absolute inset-0 z-10 md:hidden bg-gradient-to-t from-sigap-darkest/85 via-sigap-dark/55 via-[55%] to-transparent pointer-events-none" />

          {/* Subtle vignette in bottom-right corner for stats card contrast */}
          <div className="absolute inset-y-0 right-0 w-full sm:w-[45%] bg-gradient-to-l from-sigap-darkest/30 via-transparent to-transparent pointer-events-none z-10" />

          {/* 3. HERO CONTENT CONTAINER */}
          <div className="relative z-20 flex flex-col justify-between h-full min-h-[600px] sm:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] p-6 sm:p-10 md:p-14 lg:p-18">
            
            {/* Top row: Interactive Pillar Selector + Live Ticker */}
            <div className="flex flex-wrap items-center justify-between gap-3 w-full">
              
              {/* Interactive Pillar Selector (Clickable Tabs) */}
              <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xs">
                {pillars.map((pillar, idx) => {
                  const isActive = activePillar === idx;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillar(idx)}
                      className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        isActive
                          ? "text-slate-900 shadow-md"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePillarTab"
                          className="absolute inset-0 rounded-full bg-white"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Floating Live Transaction Chip (Animative Ticker - without deleted item) */}
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs text-white shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTx.merchant}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="font-medium text-white/90">{currentTx.text}:</span>
                    <span className="font-bold text-white">{currentTx.amount}</span>
                    <span className="text-[11px] text-white/60">({currentTx.merchant})</span>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Middle: Headline, Subtitle, CTA Button (Execora Style with Dynamic Motion) */}
            <div className="my-auto py-6 sm:py-8 max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45 }}
                >
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,15,34,0.7)]">
                    {currentPillar.highlight}<br />
                    <span className="text-white">Pertumbuhan Nyata.</span>
                  </h1>

                  <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/95 font-normal leading-relaxed max-w-xl drop-shadow-[0_1px_6px_rgba(0,15,34,0.6)]">
                    {currentPillar.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
              >
                {/* White Pill Button (Execora "Book a Call ->") */}
                <Link href="/register">
                  <button className="group relative inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 sm:px-8 sm:py-4 text-base font-semibold text-slate-900 shadow-xl shadow-black/15 transition-all duration-300 hover:bg-slate-100 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]">
                    <span>Mulai Sekarang</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-slate-900" />
                  </button>
                </Link>

                <Link
                  href="#demo"
                  className="group inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>Lihat Demo Interaktif</span>
                  <ChevronRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Bottom Row: Interactive Image Slide Switcher Pills */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-medium text-white/60 mr-1 hidden sm:inline-block">
                Galeri Visual UMKM:
              </span>
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                {heroSlides.map((slide, idx) => {
                  const isCurrent = activeSlide === idx;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300 ${
                        isCurrent
                          ? "bg-white text-slate-950 font-semibold shadow-xs"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      title={slide.label}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isCurrent ? "bg-sigap-primary" : "bg-white/40"}`} />
                      <span className="hidden xs:inline">{slide.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 4. FLOATING STATS CARD (Execora Bottom-Right Card - Clickable & Animated) */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setStatIndex((prev) => (prev + 1) % statsData.length)}
            className="cursor-pointer group absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 max-w-[270px] sm:max-w-[310px] rounded-2xl sm:rounded-3xl bg-sigap-darkest/60 backdrop-blur-xl border border-white/20 p-4 sm:p-5 text-white shadow-2xl transition-all duration-300 hover:bg-sigap-darkest/75 hover:scale-[1.02] hover:border-white/30"
            title="Klik untuk melihat statistik lainnya"
          >
            {/* Overlapping Avatars + Interactive Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center -space-x-2.5">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-white/60 overflow-hidden bg-slate-200 transition-transform duration-200 group-hover:-translate-y-0.5"
                    title={avatar.name}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="40px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-sigap-primary ring-2 ring-white/60 text-white font-bold text-sm shadow-md transition-transform duration-200 group-hover:-translate-y-0.5">
                  +
                </div>
              </div>

              {/* Indicator dots for stats */}
              <div className="flex items-center gap-1 pl-2">
                {statsData.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === statIndex ? "w-4 bg-sigap-light" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bold Stats & Label with smooth animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStat.value}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-between">
                  <span>{currentStat.value}</span>
                  <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider group-hover:text-white/80 transition-colors">
                    Klik Ganti ↻
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/85 leading-snug">
                  {currentStat.label}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
