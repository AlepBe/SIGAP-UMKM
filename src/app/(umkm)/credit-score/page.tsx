"use client";

import React, { useMemo } from "react";
import { Activity, TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { useDemo } from "@/lib/context/DemoContext";

export default function CreditScorePage() {
  const { data } = useDemo();
  
  // Calculate dynamic demo score based on other metrics
  const calculatedScore = useMemo(() => {
    let base = 700;
    
    // 1. Transaction volume/count factor
    const txCount = data.transactions.length;
    if (txCount > 10) base += 30;
    else if (txCount > 5) base += 15;

    // 2. Literacy completion factor
    const litCompleted = data.literacy_modules.filter(m => m.status === 'completed').length;
    base += (litCompleted * 10);

    // 3. Profitability factor
    const profit = data.dashboard.metrics.net_profit;
    if (profit > 10000000) base += 40;
    else if (profit > 5000000) base += 25;
    else if (profit > 0) base += 10;

    // Clamp score
    return Math.min(Math.max(base, 300), 850);
  }, [data.transactions, data.literacy_modules, data.dashboard.metrics.net_profit]);

  const scoreData = data.credit_score;

  // Determine grade based on calculated score
  let grade = "C";
  let label = "Cukup";
  if (calculatedScore >= 800) { grade = "A+"; label = "Sangat Baik Ekstra"; }
  else if (calculatedScore >= 750) { grade = "A"; label = "Sangat Baik"; }
  else if (calculatedScore >= 700) { grade = "B"; label = "Baik"; }
  else if (calculatedScore >= 600) { grade = "C"; label = "Cukup"; }
  else { grade = "D"; label = "Kurang"; }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-sigap-darkest">Skor Kredit Alternatif</h2>
        <p className="text-muted-foreground">Indikator kesehatan finansial usaha Anda berdasarkan data historis transaksi.</p>
      </div>

      <div className="bg-white border rounded-2xl p-8 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Activity className="w-48 h-48" />
        </div>
        
        <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-medium text-green-700 mb-6">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Data Terakhir Diperbarui: Hari Ini
        </div>

        <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-4">
          DATA DEMO
        </div>

        {/* Large Score Gauge */}
        <div className="relative mx-auto w-64 h-32 overflow-hidden mb-4">
          <div className="absolute w-full h-full border-[24px] border-muted rounded-t-full border-b-0 border-r-transparent border-l-transparent" style={{ transform: 'rotate(0deg)' }}></div>
          <div 
            className="absolute w-full h-full border-[24px] border-green-500 rounded-t-full border-b-0 border-r-transparent border-l-transparent transition-all duration-1000" 
            style={{ transform: `rotate(${((calculatedScore - 300) / 550) * 180}deg)` }}
          ></div>
          
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
            <span className="text-5xl font-extrabold text-sigap-darkest tracking-tighter">{calculatedScore}</span>
            <span className="text-sm font-medium text-muted-foreground">dari {scoreData.max_score}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-green-600 mb-2">{label} ({grade})</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Usaha Anda memiliki indikasi arus kas yang {calculatedScore >= 700 ? 'stabil' : 'perlu perhatian'} berdasarkan simulasi data demo.
        </p>

        <div className="flex justify-center p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground max-w-2xl mx-auto items-start">
          <ShieldAlert className="w-5 h-5 mr-3 text-sigap-primary shrink-0 mt-0.5" />
          <p className="text-left">
            <strong>Catatan Penting:</strong> Ini adalah <strong>Skor Simulasi SIGAP</strong> dan BUKAN jaminan persetujuan kredit. Keputusan pembiayaan nyata sepenuhnya berada pada institusi keuangan terkait.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-sigap-darkest mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Faktor Positif (Simulasi)
          </h3>
          <ul className="space-y-4">
            {scoreData.positive_factors.map(factor => (
              <FactorItem key={factor.id} title={factor.title} desc={factor.detail} status="good" />
            ))}
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-lg text-sigap-darkest mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
            Area Peningkatan (Simulasi)
          </h3>
          <ul className="space-y-4">
            {scoreData.improvement_areas.map(area => (
              <FactorItem key={area.id} title={area.title} desc={area.detail} status="warning" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FactorItem({ title, desc, status }: { title: string, desc: string, status: 'good' | 'warning' }) {
  return (
    <li className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${status === 'good' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
      <div>
        <h4 className="text-sm font-medium text-sigap-darkest">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </li>
  );
}
