"use client";

import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/format";
import { publicDemoData } from "@/lib/public-demo-data";
import {
ArrowRight,
Award,
Building2,
CheckCircle2,
ExternalLink,
Layers,
ShieldCheck
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function BentoShowcase() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7 Hari" | "30 Hari" | "3 Bulan">("30 Hari");
  const [selectedAmount, setSelectedAmount] = useState<number>(200000000);

  const { cashflow, financingProducts } = publicDemoData;

  const matchedProduct = financingProducts.find(p => {
    if (selectedAmount > 500000000) return p.id === "FIN2";
    if (selectedAmount > 200000000) return p.id === "FIN3";
    return p.id === "FIN1";
  }) || financingProducts[0];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50/60">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sigap-light/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-sigap-soft/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Section header — no AI slop badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="text-balance font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-sigap-darkest leading-tight">
            Satu Ekosistem untuk{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-sigap-primary">Seluruh Kebutuhan</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-sigap-light/50 -z-0" />
            </span>{" "}
            Finansial
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
            SIGAP mengolah data arus kas Anda menjadi indikator kelayakan yang diakui perbankan—bukan sekadar pencatatan biasa.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Card 1: Cashflow Chart (wide, dark) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-gradient-to-br from-sigap-darkest via-sigap-dark to-sigap-darkest p-7 md:p-10 text-white shadow-2xl shadow-sigap-darkest/20 relative overflow-hidden"
          >
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-sigap-primary/20 blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-sigap-light/70 uppercase tracking-wider">Arus Kas</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-white">
                    Monitor Tren Pertumbuhan Laba
                  </h3>
                </div>
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
              <p className="mt-3 text-sm text-sigap-light/70 leading-relaxed max-w-md">
                Arus kas bersih dianalisis berkala untuk proyeksikan kapasitas angsuran.
              </p>
            </div>

            {/* Bar chart */}
            <div className="mt-8 pt-4">
              <div className="flex h-44 items-end gap-2.5 sm:gap-4 pb-2 border-b border-white/10">
                {cashflow[selectedPeriod].map((item, idx) => {
                  const maxNet = Math.max(...cashflow[selectedPeriod].map((i) => i.net));
                  const heightPercent = Math.max(18, Math.round((item.net / maxNet) * 100));
                  return (
                    <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
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
              <div className="mt-3 flex justify-between gap-1 text-[11px] font-semibold text-sigap-light/60">
                {cashflow[selectedPeriod].map((item, idx) => (
                  <span key={idx} className="flex-1 text-center truncate">{item.date}</span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span className="text-sigap-light/80">Plafon aman terhitung otomatis</span>
              </div>
              <Link href="/fitur#pembukuan" className="inline-flex items-center text-sigap-light hover:text-white font-semibold group">
                Eksplor Pembukuan
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Financing Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 md:p-8 shadow-xl shadow-slate-200/40"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-sigap-light/60 px-3 py-1 text-xs font-bold text-sigap-darkest mb-3">
                <Layers className="h-3.5 w-3.5 text-sigap-primary" />
                Simulasi Modal
              </div>
              <h3 className="font-display text-2xl font-bold text-sigap-darkest">
                Kalkulator Pembiayaan
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Pilih kebutuhan modal untuk melihat kesiapan profil Anda secara instan.
              </p>

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

              <div className="mt-5 rounded-2xl border border-sigap-primary/20 bg-sigap-light/15 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-sigap-primary uppercase tracking-wider">Rekomendasi</span>
                    <h4 className="font-bold text-base text-sigap-darkest mt-0.5">{matchedProduct.name}</h4>
                  </div>
                  <span className="rounded-full bg-sigap-yellow text-sigap-darkest text-[11px] font-extrabold px-3 py-0.5 whitespace-nowrap">
                    {matchedProduct.profileMatching}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs pt-3 border-t border-sigap-primary/10">
                  <div>
                    <span className="text-slate-400 text-[11px]">Estimasi Bunga</span>
                    <p className="font-bold text-sigap-darkest">{matchedProduct.cost}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Jangka Waktu</span>
                    <p className="font-bold text-sigap-darkest">{matchedProduct.tenor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Mitra Resmi OJK</span>
              <Link href="/pembiayaan">
                <Button size="sm" className="rounded-full bg-sigap-primary hover:bg-sigap-dark text-white text-xs px-4">
                  Bandingkan Semua <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Photo + Security — split layout */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg relative group"
          >
            {/* Photo */}
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <Image
                src="https://pustaka.bca.co.id/Ocean/Business%20News/Digitalisasi%20UMKM.jpg"
                alt="UMKM Digital"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sigap-darkest/70 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <Building2 className="h-3 w-3" />
                  UMKM Terdigitalisasi
                </span>
              </div>
            </div>
            {/* Body */}
            <div className="bg-white p-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sigap-darkest text-white shadow-md">
                <ShieldCheck className="h-5 w-5 text-sigap-light" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-sigap-darkest">
                  Proteksi &amp; Verifikasi Finansial
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Cek keaslian izin kreditur sebelum menandatangani. Hindari jebakan bunga tersembunyi.
                </p>
                <Link href="/fitur#proteksi" className="mt-3 inline-flex items-center text-xs font-bold text-sigap-primary hover:underline">
                  Cek Izin Pinjaman <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Photo + Literacy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-6 rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg relative group"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <Image
                src="https://cdn.antaranews.com/cache/1200x800/2020/08/15/permudah-2.jpg"
                alt="Literasi Finansial UMKM"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sigap-darkest/70 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <Award className="h-3 w-3" />
                  Literasi &amp; Edukasi
                </span>
              </div>
            </div>
            <div className="bg-white p-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sigap-primary text-white shadow-md">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-sigap-darkest">
                  Microlearning yang Menaikkan Skor
                </h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                  Sertifikat digital dari modul literasi langsung berkontribusi pada poin skor kredit Anda.
                </p>
                <Link href="/literasi">
                  <Button variant="outline" size="sm" className="mt-3 rounded-full border-sigap-primary text-sigap-primary hover:bg-sigap-primary hover:text-white text-xs">
                    Mulai Belajar
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
