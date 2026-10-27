"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  TrendingUp, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Award,
  CheckCircle2,
  Building2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { publicDemoData } from "@/lib/public-demo-data";
import { formatJuta, formatIDR } from "@/lib/format";

export function BentoShowcase() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7 Hari" | "30 Hari" | "3 Bulan">("30 Hari");
  const [selectedAmount, setSelectedAmount] = useState<number>(200000000); // 200 Juta default

  const { cashflow, financingProducts, business } = publicDemoData;

  // Filter matched products based on simulated loan amount
  const matchedProduct = financingProducts.find(p => {
    if (selectedAmount > 500000000) return p.id === "FIN2";
    if (selectedAmount > 200000000) return p.id === "FIN3";
    return p.id === "FIN1";
  }) || financingProducts[0];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50/70">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sigap-light/25 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-sigap-soft/15 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section Header - Clean & Editorial without AI slop badge */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-[0.25em] text-sigap-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sigap-yellow" />
            <span>Kapabilitas Finansial Utama</span>
          </div>
          <h2 className="text-balance font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
            Satu Ekosistem Cerdas Untuk Seluruh{" "}
            <span className="text-sigap-primary underline decoration-sigap-soft/50 decoration-4 underline-offset-8">
              Kebutuhan Finansial
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Bukan sekadar pencatatan biasa. SIGAP memproses arus kas Anda menjadi indikator kelayakan pembiayaan formal yang dipercaya perbankan.
          </p>
        </div>

        {/* Bento Grid Layout with High Contrast and Depth */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Card 1: Interactive Growth & Cashflow Engine (Span 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-7 md:p-10 text-white shadow-xl shadow-sigap-darkest/10 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-sigap-light uppercase tracking-wider">Modul Arus Kas</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-white">
                    Monitor Tren Pertumbuhan Laba
                  </h3>
                </div>

                {/* Period Selector Toggle */}
                <div className="inline-flex rounded-xl bg-white/10 p-1 backdrop-blur-md">
                  {(["7 Hari", "30 Hari", "3 Bulan"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedPeriod === period
                          ? "bg-sigap-light text-sigap-darkest shadow-sm"
                          : "text-sigap-light/70 hover:text-white"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-sm text-sigap-light/80 leading-relaxed max-w-lg">
                Arus kas bersih {business.name} dianalisis secara berkala untuk memproyeksikan kapasitas angsuran tanpa risiko overleveraging.
              </p>
            </div>

            {/* Dynamic Visual Bars based on Selected Period */}
            <div className="mt-8 pt-4">
              <div className="flex h-44 items-end gap-2.5 sm:gap-4 pb-2 border-b border-white/15">
                {cashflow[selectedPeriod].map((item, idx) => {
                  const maxNet = Math.max(...cashflow[selectedPeriod].map((i) => i.net));
                  const heightPercent = Math.max(20, Math.round((item.net / maxNet) * 100));
                  return (
                    <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
                      {/* Tooltip on Hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md bg-white text-sigap-darkest text-[10px] font-bold px-2 py-1 shadow-md whitespace-nowrap pointer-events-none z-20">
                        {formatIDR(item.net)}
                      </div>
                      <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-sigap-primary to-sigap-light group-hover:from-sigap-soft group-hover:to-white transition-colors"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Labels below bars */}
              <div className="mt-3 flex justify-between gap-1 text-[11px] font-semibold text-sigap-light/75">
                {cashflow[selectedPeriod].map((item, idx) => (
                  <span key={idx} className="flex-1 text-center truncate">
                    {item.date}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Summary of Card 1 */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sigap-light">Rekomendasi Plafon Aman Terbuka Otomatis</span>
              </div>
              <Link href="/fitur#pembukuan" className="inline-flex items-center text-sigap-light hover:text-white font-semibold group">
                Eksplor Pembukuan
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Interactive Loan Matching Engine (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 md:p-8 shadow-xl shadow-slate-200/50">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-sigap-light/60 px-3 py-1 text-xs font-bold text-sigap-darkest">
                <Layers className="h-3.5 w-3.5 text-sigap-primary" />
                Simulasi Kebutuhan Modal
              </div>
              <h3 className="font-display text-2xl font-bold mt-2 text-sigap-darkest">
                Kalkulator Pembiayaan Cerdas
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pilih estimasi modal yang dibutuhkan untuk melihat kesiapan profil bisnis Anda secara instan.
              </p>

              {/* Amount Quick Picker Chips */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[50000000, 200000000, 500000000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`rounded-xl py-2 px-1 text-center font-display font-bold text-xs transition-all border ${
                      selectedAmount === amt
                        ? "bg-sigap-darkest text-white border-sigap-yellow ring-2 ring-sigap-yellow/40 shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-sigap-primary"
                    }`}
                  >
                    Rp {amt / 1000000} Jt
                  </button>
                ))}
              </div>

              {/* Matched Product Preview Box */}
              <div className="mt-5 rounded-2xl border border-sigap-primary/20 bg-sigap-light/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-sigap-primary uppercase tracking-wider">
                      Produk Rekomendasi
                    </span>
                    <h4 className="font-bold text-base text-sigap-darkest mt-0.5">
                      {matchedProduct.name}
                    </h4>
                  </div>
                  <span className="rounded-full bg-sigap-yellow text-sigap-darkest text-[11px] font-extrabold px-3 py-0.5 shadow-xs">
                    {matchedProduct.profileMatching}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-sigap-primary/15">
                  <div>
                    <span className="text-slate-500 text-[11px]">Estimasi Bunga</span>
                    <p className="font-bold text-sigap-darkest">{matchedProduct.cost}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Jangka Waktu</span>
                    <p className="font-bold text-sigap-darkest">{matchedProduct.tenor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Mitra Resmi Terdaftar OJK</span>
              <Link href="/pembiayaan">
                <Button size="sm" className="rounded-full bg-sigap-primary hover:bg-sigap-dark text-white font-semibold text-xs px-4">
                  Bandingkan Semua
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Anti-Pinjol Ilegal & Legal Protection (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200/90 bg-white p-7 md:p-8 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sigap-darkest text-white shadow-md">
                <ShieldCheck className="h-6 w-6 text-sigap-light" />
              </div>
              <div>
                <span className="text-xs font-bold text-sigap-primary uppercase tracking-wider">Fitur Keamanan</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-sigap-darkest mt-0.5">
                  Proteksi & Verifikasi Tawaran Finansial
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cek keaslian izin kreditur sebelum menandatangani perjanjian. Hindari ancaman bunga tersembunyi dan pinjol ilegal tanpa izin resmi.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-sigap-darkest">100% Lembaga Keuangan Resmi</span>
              </div>
              <Link href="/fitur#proteksi" className="font-bold text-sigap-primary hover:underline flex items-center gap-1">
                Cek Izin Pinjaman <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Card 4: Literacy & Point Reward (Span 6) */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200/90 bg-white p-7 md:p-8 shadow-lg shadow-slate-200/40 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sigap-primary text-white shadow-md">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold text-sigap-primary uppercase tracking-wider">Literasi Finansial</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-sigap-darkest mt-0.5">
                  Microlearning yang Menambah Nilai Skor
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Selesaikan modul singkat mengenai manajemen kas dan pembukuan praktis. Setiap sertifikat digital langsung meningkatkan poin skor kredit Anda.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-sigap-light/30 p-4 border border-sigap-primary/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-sigap-darkest">Level Literasi: Menengah</span>
                <div className="mt-1">
                  <span className="inline-block rounded-md bg-sigap-yellow/20 text-sigap-yellow-dark px-2 py-0.5 font-bold text-[10px] border border-sigap-yellow/30">
                    +50 Poin Skor Ditambahkan
                  </span>
                </div>
              </div>
              <Link href="/literasi">
                <Button variant="outline" size="sm" className="rounded-full border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white font-semibold text-xs">
                  Mulai Belajar
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
