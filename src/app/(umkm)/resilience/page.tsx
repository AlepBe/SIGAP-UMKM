"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, AlertTriangle, Activity, CalendarDays } from "lucide-react";
import { useDemo } from "@/lib/context/DemoContext";
import Link from 'next/link';
import { PremiumFeatureLock } from "@/components/ui/PremiumFeatureLock";

export default function ResiliencePage() {
  const { data } = useDemo();
  const balance = data.dashboard.metrics.total_balance;
  const expense = data.dashboard.metrics.expense_this_month;
  
  const [activeScenario, setActiveScenario] = useState('base');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Runway calculation
  // Base scenario: Current balance / Current expense
  // Pessimistic A (Income drops 20%): Assume expense stays same, runway drops if income was subsidizing it. But typically runway = cash / burn rate.
  // We'll simulate burn rate changes:
  const baseBurnRate = expense || 1; 
  let scenarioBurnRate = baseBurnRate;
  
  if (activeScenario === 'pessimistic_a') {
    // 20% drop in income might mean we burn more cash. Let's just simulate higher burn for demo.
    scenarioBurnRate = baseBurnRate * 1.5;
  } else if (activeScenario === 'pessimistic_b') {
    // 15% increase in expenses
    scenarioBurnRate = baseBurnRate * 1.15;
  }

  const runwayMonths = Math.max(0, balance / scenarioBurnRate);
  
  let statusText = "SEHAT";
  let statusColor = "bg-green-500/20 text-green-300 border-green-500/30";
  let dotColor = "bg-green-400";
  if (runwayMonths < 3) {
    statusText = "KRITIS";
    statusColor = "bg-red-500/20 text-red-300 border-red-500/30";
    dotColor = "bg-red-400";
  } else if (runwayMonths < 6) {
    statusText = "WASPADA";
    statusColor = "bg-amber-500/20 text-amber-300 border-amber-500/30";
    dotColor = "bg-amber-400";
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Ketahanan Usaha</h2>
          <p className="text-muted-foreground">Proyeksi arus kas masa depan dan simulasi risiko untuk menjaga kelangsungan bisnis.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white text-sigap-darkest">
            <CalendarDays className="w-4 h-4 mr-2" />
            Horizon 6 Bulan
          </Button>
        </div>
      </div>

      <PremiumFeatureLock>
        <div className="space-y-8">
          {/* Main Health Indicator */}
          <div className="bg-sigap-darkest rounded-2xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity className="w-64 h-64" />
            </div>
            
            <div className="z-10 flex-1">
              <div className="flex gap-2 items-center mb-4">
                <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border ${statusColor}`}>
                  <div className={`w-2 h-2 rounded-full ${dotColor} mr-2 animate-pulse`}></div>
                  Status Resiliensi: {statusText}
                </div>
                <div className="inline-block px-2 py-1 bg-white/20 text-white text-[10px] font-bold rounded-full">
                  DATA DEMO
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-3">Runway Est: {runwayMonths > 12 ? '> 12 Bulan' : `${runwayMonths.toFixed(1)} Bulan`}</h3>
              <p className="text-sigap-light/80 text-lg max-w-xl">
                Berdasarkan tren pengeluaran saat ini ({formatCurrency(scenarioBurnRate)}/bln) dan cadangan kas ({formatCurrency(balance)}), usaha Anda {runwayMonths >= 6 ? 'memiliki likuiditas yang cukup' : 'membutuhkan perhatian ekstra'}.
              </p>
            </div>
            
            <div className="z-10 bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 w-full md:w-72 shrink-0 text-center">
              <div className="text-sm text-sigap-light mb-1">Rekomendasi Utama (Simulasi)</div>
              <div className="font-semibold text-lg mb-4">
                {runwayMonths >= 6 ? 'Pertahankan Cadangan Kas' : 'Pertimbangkan Fasilitas Kredit Siaga'}
              </div>
              {runwayMonths < 6 ? (
                <Link href="/financing" className="block w-full">
                  <Button className="w-full bg-sigap-primary text-white hover:bg-sigap-primary/90 font-medium">
                    Cari Pembiayaan
                  </Button>
                </Link>
              ) : (
                <Link href="/bookkeeping" className="block w-full">
                  <Button className="w-full bg-white text-sigap-darkest hover:bg-gray-100 font-medium">
                    Lihat Arus Kas
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scenario Simulator */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-lg text-sigap-darkest">Simulasi Skenario</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Apa yang terjadi jika kondisi pasar berubah? Pilih skenario untuk melihat dampaknya (Simulasi interaktif).
                </p>
                
                <div className="space-y-3">
                  <ScenarioCard 
                    title="Skenario Dasar (Normal)" 
                    desc="Tren pengeluaran saat ini berlanjut" 
                    active={activeScenario === 'base'}
                    onClick={() => setActiveScenario('base')}
                  />
                  <ScenarioCard 
                    title="Skenario Pesimis (A)" 
                    desc="Beban operasional naik drastis (x1.5)" 
                    active={activeScenario === 'pessimistic_a'}
                    onClick={() => setActiveScenario('pessimistic_a')}
                  />
                  <ScenarioCard 
                    title="Skenario Beban (B)" 
                    desc="Harga bahan baku naik 15%" 
                    active={activeScenario === 'pessimistic_b'}
                    onClick={() => setActiveScenario('pessimistic_b')}
                  />
                </div>
              </div>
              
              {runwayMonths < 4 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm animate-in slide-in-from-bottom-2">
                  <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4" /> Peringatan Dini
                  </h3>
                  <p className="text-sm text-amber-800 leading-relaxed mb-4">
                    Dalam skenario ini, cadangan kas akan menipis dalam waktu dekat. Pertimbangkan mengajukan fasilitas kredit siaga (standby loan).
                  </p>
                  <Link href="/financing" className="block">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white w-full">
                      Eksplorasi Fasilitas Kredit
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Chart Projection */}
            <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-lg text-sigap-darkest">Proyeksi Saldo Kas (6 Bulan)</h3>
                  <p className="text-sm text-muted-foreground">Berdasarkan Skenario Terpilih (Demo Data)</p>
                </div>
              </div>
              
              {/* Mock Projection Chart Area Based on Scenario */}
              <div className="relative h-72 w-full mt-4 flex items-end">
                <div className="absolute inset-0 border-b border-l border-muted-foreground/20 z-0"></div>
                
                {/* Grid Lines */}
                <div className="absolute top-0 w-full border-t border-muted-foreground/10 h-1/4"></div>
                <div className="absolute top-1/4 w-full border-t border-muted-foreground/10 h-1/4"></div>
                <div className="absolute top-2/4 w-full border-t border-muted-foreground/10 h-1/4"></div>
                <div className="absolute top-3/4 w-full border-t border-muted-foreground/10 h-1/4"></div>
                
                {/* Mock Path Dynamic */}
                <svg className="absolute inset-0 w-full h-full z-10 transition-all duration-500" preserveAspectRatio="none" viewBox="0 0 600 300">
                  <path 
                    d={
                      activeScenario === 'base' ? "M 0,100 L 100,110 L 200,90 L 300,105 L 400,95 L 500,80 L 600,85" :
                      activeScenario === 'pessimistic_a' ? "M 0,100 L 100,140 L 200,180 L 300,220 L 400,260 L 500,280 L 600,295" :
                      "M 0,100 L 100,120 L 200,135 L 300,160 L 400,180 L 500,210 L 600,230"
                    } 
                    fill="none" 
                    stroke={activeScenario === 'base' ? "#3F6593" : "#f59e0b"} 
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500"
                  />
                </svg>
                
                <div className="absolute bottom-0 w-full flex justify-between px-2 text-xs text-muted-foreground translate-y-6">
                  <span>Bln 1</span>
                  <span>Bln 2</span>
                  <span>Bln 3</span>
                  <span>Bln 4</span>
                  <span>Bln 5</span>
                  <span>Bln 6</span>
                </div>
              </div>
              
              <div className="flex gap-6 mt-12 justify-center">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-1 rounded-full bg-sigap-primary"></div>
                  <span className="font-medium text-muted-foreground">Proyeksi Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PremiumFeatureLock>
    </div>
  );
}

function ScenarioCard({ title, desc, active, onClick }: { title: string, desc: string, active: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} className={`p-4 rounded-lg border cursor-pointer transition-all ${active ? 'border-sigap-primary bg-sigap-primary/5 shadow-sm' : 'border-border bg-white hover:bg-muted/30'}`}>
      <div className="flex justify-between items-center mb-1">
        <h4 className={`font-semibold text-sm ${active ? 'text-sigap-primary' : 'text-sigap-darkest'}`}>{title}</h4>
        {active && <div className="w-2 h-2 rounded-full bg-sigap-primary"></div>}
      </div>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
