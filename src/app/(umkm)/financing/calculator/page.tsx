"use client";

import { Button } from '@/components/ui/button';
import { useDemo } from '@/lib/context/DemoContext';
import {
AlertCircle,
Calculator,
CheckCircle2,
DollarSign,
Percent,
TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useMemo,useState } from 'react';
import {
Bar,
BarChart,
CartesianGrid,Legend,
ResponsiveContainer,
Tooltip,
XAxis,YAxis
} from 'recharts';

export default function FinancingCalculatorPage() {
  const { data } = useDemo();
  const netProfitMonthly = data.dashboard.metrics.net_profit; // Rp 6.150.000

  // Calculator inputs
  const [amount, setAmount] = useState<number>(30000000); // 30 Juta
  const [tenorMonths, setTenorMonths] = useState<number>(24); // 24 Bulan
  const [interestRateYearly, setInterestRateYearly] = useState<number>(6.0); // 6% per tahun (KUR)
  const [calcType, setCalcType] = useState<'flat' | 'effective'>('effective');

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  // Calculations
  const calculations = useMemo(() => {
    const monthlyRate = (interestRateYearly / 100) / 12;
    let monthlyInstallment = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (calcType === 'flat') {
      const monthlyPrincipal = amount / tenorMonths;
      const monthlyInterest = amount * monthlyRate;
      monthlyInstallment = monthlyPrincipal + monthlyInterest;
      totalPayment = monthlyInstallment * tenorMonths;
      totalInterest = totalPayment - amount;
    } else {
      // Effective / Annuity
      monthlyInstallment = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenorMonths)) / (Math.pow(1 + monthlyRate, tenorMonths) - 1);
      totalPayment = monthlyInstallment * tenorMonths;
      totalInterest = totalPayment - amount;
    }

    // Debt Service Ratio (DSR) compared to business net profit
    const dsrRatio = (monthlyInstallment / netProfitMonthly) * 100;

    // Monthly breakdown data for first 12 months or full tenor
    const sampleMonths = Math.min(tenorMonths, 12);
    const chartData = [];
    let remainingPrincipal = amount;

    for (let m = 1; m <= sampleMonths; m++) {
      let interestForMonth = remainingPrincipal * monthlyRate;
      let principalForMonth = monthlyInstallment - interestForMonth;
      if (principalForMonth > remainingPrincipal) {
        principalForMonth = remainingPrincipal;
      }
      remainingPrincipal -= principalForMonth;

      chartData.push({
        month: `Bulan ${m}`,
        pokok: Math.round(principalForMonth),
        bunga: Math.round(interestForMonth),
        sisaPokok: Math.max(0, Math.round(remainingPrincipal))
      });
    }

    return {
      monthlyInstallment: Math.round(monthlyInstallment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      dsrRatio: dsrRatio.toFixed(1),
      isSafe: dsrRatio <= 35,
      chartData
    };
  }, [amount, tenorMonths, interestRateYearly, calcType, netProfitMonthly]);

  // Presets
  const applyPreset = (pAmount: number, pTenor: number, pRate: number) => {
    setAmount(pAmount);
    setTenorMonths(pTenor);
    setInterestRateYearly(pRate);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sigap-darkest via-slate-900 to-sigap-darkest text-white p-8 md:p-10 rounded-3xl shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sigap-yellow/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sigap-yellow text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" /> Simulasi Cicilan Finansial Cerdas
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">
              Kalkulator Pembiayaan UMKM
            </h1>
            <p className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed">
              Hitung estimasi angsuran bulanan, proyeksi bunga, dan ukur kapasitas bayar (DSR) aman sebelum Anda mengajukan pinjaman ke perbankan atau fintech resmi.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => applyPreset(25000000, 12, 6.0)}
              className="text-xs px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all"
            >
              Preset: KUR Mikro Rp 25 Jt
            </button>
            <button 
              onClick={() => applyPreset(50000000, 24, 6.0)}
              className="text-xs px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all"
            >
              Preset: Modal Kerja Rp 50 Jt
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-xl font-display font-bold text-sigap-darkest flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-sigap-primary" /> Parameter Pinjaman
          </h2>

          {/* Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Jumlah Plafon Pinjaman
              </label>
              <span className="text-xl font-display font-extrabold text-sigap-darkest">
                {formatCurrency(amount)}
              </span>
            </div>
            <input 
              type="range"
              min={5000000}
              max={250000000}
              step={5000000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full accent-sigap-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Min: Rp 5 Juta</span>
              <span>Rp 100 Juta</span>
              <span>Max: Rp 250 Juta</span>
            </div>
          </div>

          {/* Tenor Slider */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Jangka Waktu (Tenor)
              </label>
              <span className="text-xl font-display font-extrabold text-sigap-darkest">
                {tenorMonths} Bulan ({(tenorMonths / 12).toFixed(1)} Tahun)
              </span>
            </div>
            <input 
              type="range"
              min={6}
              max={60}
              step={6}
              value={tenorMonths}
              onChange={(e) => setTenorMonths(Number(e.target.value))}
              className="w-full accent-sigap-primary h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>6 Bulan</span>
              <span>24 Bulan</span>
              <span>60 Bulan</span>
            </div>
          </div>

          {/* Interest Rate & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Suku Bunga Tahunan (% p.a)
              </label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.5"
                  min="3"
                  max="30"
                  value={interestRateYearly}
                  onChange={(e) => setInterestRateYearly(Number(e.target.value))}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-sm font-bold text-sigap-darkest focus:ring-2 focus:ring-sigap-primary outline-none"
                />
                <Percent className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Contoh: KUR Pemerintah 6.0% p.a efektif.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Metode Perhitungan Bunga
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcType('effective')}
                  className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                    calcType === 'effective' 
                      ? 'bg-sigap-darkest text-white border-sigap-darkest shadow' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Efektif / Anuitas
                </button>
                <button
                  type="button"
                  onClick={() => setCalcType('flat')}
                  className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                    calcType === 'flat' 
                      ? 'bg-sigap-darkest text-white border-sigap-darkest shadow' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Flat Rate
                </button>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {calcType === 'effective' ? 'Bunga menurun seiring pelunasan pokok.' : 'Bunga dihitung rata dari pokok awal.'}
              </span>
            </div>
          </div>

          {/* Capacity Analysis Alert */}
          <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
            calculations.isSafe 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <div className={`p-2 rounded-xl shrink-0 ${calculations.isSafe ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {calculations.isSafe ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-sm">
                Analisis Kapasitas Bayar (DSR): {calculations.dsrRatio}%
              </h4>
              <p className="text-xs mt-1 leading-relaxed">
                {calculations.isSafe ? (
                  <>Cicilan ini setara <strong>{calculations.dsrRatio}%</strong> dari laba bersih bulanan Kedai Kopi Senja ({formatCurrency(netProfitMonthly)}). Batas aman perbankan adalah maksimal 35%.</>
                ) : (
                  <>Peringatan: Cicilan melebihi 35% laba bersih bulanan Anda. Disarankan memperpanjang tenor atau menurunkan plafon agar arus kas tidak tertekan.</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-sigap-darkest text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/10 flex flex-col justify-between flex-1">
            <div>
              <span className="text-xs font-bold text-sigap-yellow uppercase tracking-wider block mb-1">
                Estimasi Angsuran Bulanan
              </span>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-white">
                {formatCurrency(calculations.monthlyInstallment)}
                <span className="text-sm font-normal text-white/60 ml-2">/ bulan</span>
              </div>
              <p className="text-xs text-white/70 mt-2">
                Simulasi cicilan tetap selama {tenorMonths} bulan.
              </p>
            </div>

            <div className="border-t border-white/10 my-6 pt-6 space-y-3 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Pokok Pinjaman</span>
                <span className="font-bold text-white">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Total Estimasi Bunga</span>
                <span className="font-bold text-sigap-yellow">{formatCurrency(calculations.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-white/80 border-t border-white/10 pt-2 font-bold text-base">
                <span>Total Pengembalian</span>
                <span className="text-white">{formatCurrency(calculations.totalPayment)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/financing" className="block">
                <Button className="w-full bg-sigap-yellow text-sigap-darkest hover:bg-sigap-yellow/90 font-bold py-6 rounded-2xl shadow-lg shadow-sigap-yellow/20 text-sm">
                  Cari Produk Cocok di Marketplace &rarr;
                </Button>
              </Link>
              <p className="text-[11px] text-white/50 text-center">
                *Simulasi bukan penawaran kredit final. Keputusan akhir bergantung pada kebijakan mitra pemberi pinjaman.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Chart */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
        <h3 className="text-lg font-display font-bold text-sigap-darkest mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-sigap-primary" /> Komposisi Angsuran Bulanan (Pokok vs Bunga)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Visualisasi proporsi pelunasan pokok dan porsi bunga pinjaman untuk tahun pertama.
        </p>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calculations.chartData} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `Rp ${(val / 1000).toFixed(0)}rb`}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                  backgroundColor: '#0c1b33', 
                  color: '#fff',
                  padding: '12px 16px'
                }}
                formatter={(val: any, name: string) => [formatCurrency(Number(val)), name]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
              <Bar dataKey="pokok" name="Porsi Pokok Pinjaman" fill="#006699" stackId="a" radius={[0, 0, 4, 4]} />
              <Bar dataKey="bunga" name="Porsi Bunga Pinjaman" fill="#f59e0b" stackId="a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
