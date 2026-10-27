"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const channels = [
  { name: "QRIS Nasional", desc: "Standar Pembayaran BI" },
  { name: "GoPay Merchant", desc: "E-Wallet UMKM" },
  { name: "OVO Bisnis", desc: "Digital Payment" },
  { name: "DANA Bisnis", desc: "Dompet Digital" },
  { name: "ShopeePay", desc: "Merchant Partner" },
  { name: "Bank Mandiri", desc: "Kredit Usaha Rakyat" },
  { name: "Bank BRI", desc: "Pembiayaan Mikro" },
  { name: "Bank BCA", desc: "Cash Management" },
  { name: "Bank BNI", desc: "Sentra Kredit Bisnis" },
];

export function EcosystemMarquee() {
  // Multiply channels so it is truly continuous and seamless on all screen sizes
  const marqueeList = [...channels, ...channels, ...channels, ...channels];

  return (
    <section className="relative border-y border-slate-200/80 bg-white/70 py-6 backdrop-blur-md overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-sigap-yellow animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-sigap-darkest">
            Integrasi Multi-Saluran Transaksi
          </span>
        </div>
        <p className="text-slate-500 hidden sm:block">
          Sinkronisasi otomatis laporan keuangan dari berbagai platform perbankan &amp; e-wallet
        </p>
      </div>

      {/* Infinite Always-Running Seamless Marquee */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none">
        <motion.div
          className="flex shrink-0 items-center gap-5 pr-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 28,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {marqueeList.map((item, idx) => (
            <div 
              key={idx}
              className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-2.5 shadow-xs transition-colors hover:border-sigap-primary/50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sigap-light/50 text-sigap-darkest">
                <Check className="h-3.5 w-3.5 text-sigap-primary stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-bold text-sigap-darkest whitespace-nowrap">{item.name}</p>
                <p className="text-[10px] text-slate-500 whitespace-nowrap">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
