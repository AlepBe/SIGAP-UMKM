"use client";

import React from "react";
import { Check, ShieldCheck } from "lucide-react";

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
  return (
    <section className="relative border-y border-slate-200/80 bg-white/70 py-6 backdrop-blur-md overflow-hidden">
      <div className="container mb-3 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-sigap-yellow" />
          <span className="font-bold uppercase tracking-wider text-sigap-darkest">
            Integrasi Multi-Saluran Transaksi
          </span>
        </div>
        <p className="text-slate-500 hidden sm:block">
          Sinkronisasi otomatis laporan keuangan dari berbagai platform perbankan & e-wallet
        </p>
      </div>

      <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex min-w-full shrink-0 items-center justify-around gap-6 motion-reduce:animate-none">
          {channels.concat(channels).map((item, idx) => (
            <div 
              key={idx}
              className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-2.5 shadow-xs hover:border-sigap-primary/50 transition-colors"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sigap-light/50 text-sigap-darkest">
                <Check className="h-3.5 w-3.5 text-sigap-primary stroke-[2.5]" />
              </div>
              <div>
                <p className="text-xs font-bold text-sigap-darkest">{item.name}</p>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
